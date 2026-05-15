import { TRPCError } from "@trpc/server";

import { LevelEnum } from "@/generated/prisma/client";
import { getCachedLesson, getCachedLessonMeta, invalidateUserStats, LESSON_TTL } from "@/lib/cache";
import { get, set, del } from "@/lib/redis";
import { toUserMessage } from "@/lib/toUserMessage";
import { completeLessonInput, getLessonByIdInput, getLessonsInput } from "@/lib/validations/lesson";
import { protectedProcedure, router } from "@/server/trpc";

function lessonListKey(userId: string, level?: LevelEnum): string {
	return `lessons:${userId}:${level ?? "all"}`;
}

async function invalidateLessonCache(userId: string): Promise<void> {
	const keys = [
		lessonListKey(userId),
		...Object.values(LevelEnum).map((lvl) => lessonListKey(userId, lvl)),
	];
	// ioredis DEL accepts multiple keys in a single command
	await Promise.all(keys.map((key) => del(key)));
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
		.input(getLessonsInput)
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
				if (error instanceof TRPCError) {
					throw error;
				}

				console.error("[lesson.getLessons]", error);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: toUserMessage(error, "Gagal mengambil daftar pelajaran."),
				});
			}
		}),

	getLessonMeta: protectedProcedure
		.input(getLessonByIdInput)
		.query(async ({ ctx, input }) => {
			const lesson = await getCachedLessonMeta(input.id);

			if (!lesson) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Pelajaran tidak ditemukan.",
				});
			}

			const completion = await ctx.prisma.lessonCompletion.findFirst({
				where: { lessonId: input.id, userId: ctx.userId },
				select: { id: true },
			});

			return { ...lesson, isCompleted: completion !== null };
		}),

	getLessonById: protectedProcedure
		.input(getLessonByIdInput)
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
		.input(completeLessonInput)
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

					const lessonVocab = await tx.lessonVocab.findMany({
						where: { lessonId: input.lessonId },
						select: { vocabWordId: true },
					});

					if (lessonVocab.length > 0) {
						await tx.flashcardReview.createMany({
							data: lessonVocab.map((entry) => ({
								userId: ctx.userId,
								vocabWordId: entry.vocabWordId,
								nextReviewAt: now,
							})),
							skipDuplicates: true,
						});
					}

					return { completion, updatedUser };
				});

				await invalidateUserStats(ctx.userId);
				// Invalidate lesson list caches so isCompleted updates immediately
				await invalidateLessonCache(ctx.userId);

				return {
					completion: result.completion,
					xp: result.updatedUser.xp,
					streakDays: result.updatedUser.streakDays,
				};
			} catch (error) {
				if (error instanceof TRPCError) {
					throw error;
				}

				console.error("[lesson.completeLesson]", error);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: toUserMessage(error, "Gagal menyelesaikan pelajaran."),
				});
			}
		}),
});
