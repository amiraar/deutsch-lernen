import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { LevelEnum } from "@/generated/prisma";
import { getCachedLesson, invalidateUserStats, LESSON_TTL } from "@/lib/cache";
import { get, set } from "@/lib/redis";
import { protectedProcedure, router } from "@/server/trpc";

function lessonListKey(userId: string, level?: LevelEnum): string {
	return `lessons:${userId}:${level ?? "all"}`;
}

function calculateStreak(
	lastStudiedAt: Date | null,
	currentStreak: number,
	now: Date
): number {
	const todayStart = new Date(now);
	todayStart.setHours(0, 0, 0, 0);

	const yesterdayStart = new Date(todayStart);
	yesterdayStart.setDate(yesterdayStart.getDate() - 1);

	if (!lastStudiedAt || lastStudiedAt < yesterdayStart) {
		return 1;
	}

	if (lastStudiedAt < todayStart) {
		return currentStreak + 1;
	}

	return currentStreak;
}

export const lessonRouter = router({
	getLessons: protectedProcedure
		.input(
			z
				.object({
					level: z.nativeEnum(LevelEnum).optional(),
				})
				.optional()
		)
		.query(async ({ ctx, input }) => {
			const cacheKey = lessonListKey(ctx.userId, input?.level);
			const cached = await get<
				Array<{
					id: string;
					title: string;
					slug: string;
					description: string;
					level: LevelEnum;
					order: number;
					estimatedMinutes: number;
					isCompleted: boolean;
				}>
			>(cacheKey);

			if (cached) {
				return cached;
			}

			try {
				const lessons = await ctx.prisma.lesson.findMany({
					where: input?.level ? { level: input.level } : undefined,
					orderBy: { order: "asc" },
					include: {
						completions: {
							where: { userId: ctx.userId },
							select: { id: true },
						},
					},
				});

				const result = lessons.map((lesson) => ({
					id: lesson.id,
					title: lesson.title,
					slug: lesson.slug,
					description: lesson.description,
					level: lesson.level,
					order: lesson.order,
					estimatedMinutes: lesson.estimatedMinutes,
					isCompleted: lesson.completions.length > 0,
				}));

				await set(cacheKey, result, LESSON_TTL);
				return result;
			} catch (error) {
				const message = error instanceof Error ? error.message : "Unknown error";
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: `Gagal mengambil daftar pelajaran. ${message}`,
				});
			}
		}),

	getLessonById: protectedProcedure
		.input(z.object({ id: z.string().min(1) }))
		.query(async ({ input }) => {
			const lesson = await getCachedLesson(input.id);

			if (!lesson) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Pelajaran tidak ditemukan.",
				});
			}

			return lesson;
		}),

	completeLesson: protectedProcedure
		.input(
			z.object({
				lessonId: z.string().min(1),
				score: z.number().min(0).max(100),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const now = new Date();
			const xpEarned = Math.round(input.score / 10) * 10;

			try {
				const result = await ctx.prisma.$transaction(async (tx) => {
					const user = await tx.user.findUnique({
						where: { id: ctx.userId },
						select: { xp: true, streakDays: true, lastStudiedAt: true },
					});

					if (!user) {
						throw new TRPCError({
							code: "NOT_FOUND",
							message: "Pengguna tidak ditemukan.",
						});
					}

					const nextStreak = calculateStreak(
						user.lastStudiedAt,
						user.streakDays,
						now
					);

					const completion = await tx.lessonCompletion.create({
						data: {
							userId: ctx.userId,
							lessonId: input.lessonId,
							score: input.score,
							xpEarned,
							completedAt: now,
						},
						select: {
							id: true,
							score: true,
							xpEarned: true,
							completedAt: true,
						},
					});

					const updatedUser = await tx.user.update({
						where: { id: ctx.userId },
						data: {
							xp: user.xp + xpEarned,
							streakDays: nextStreak,
							lastStudiedAt: now,
						},
						select: { xp: true, streakDays: true },
					});

					return { completion, updatedUser };
				});

				await invalidateUserStats(ctx.userId);

				return {
					completion: result.completion,
					xp: result.updatedUser.xp,
					streakDays: result.updatedUser.streakDays,
				};
			} catch (error) {
				if (error instanceof TRPCError) {
					throw error;
				}

				const message = error instanceof Error ? error.message : "Unknown error";
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: `Gagal menyelesaikan pelajaran. ${message}`,
				});
			}
		}),
});
