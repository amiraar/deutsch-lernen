import { TRPCError } from "@trpc/server";

import { getCachedUserStats } from "@/lib/cache";
import { toUserMessage } from "@/lib/toUserMessage";
import { protectedProcedure, router } from "@/server/trpc";

export const progressRouter = router({
	getUserStats: protectedProcedure.query(async ({ ctx }) => {
		try {
			return await getCachedUserStats(ctx.userId);
		} catch (error) {
			if (error instanceof TRPCError) {
				throw error;
			}

			console.error("[progress.getUserStats]", error);
			const errorMessage = error instanceof Error ? error.message : "";
			if (errorMessage === "User not found") {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "Sesi tidak valid. Silakan login kembali.",
				});
			}
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: toUserMessage(error, "Gagal mengambil statistik pengguna."),
			});
		}
	}),

	getRecentActivity: protectedProcedure.query(async ({ ctx }) => {
		try {
			const since = new Date();
			since.setDate(since.getDate() - 7);

			const [lessons, reviews] = await Promise.all([
				ctx.prisma.lessonCompletion.findMany({
					where: { userId: ctx.userId, completedAt: { gte: since } },
					orderBy: { completedAt: "desc" },
					take: 7,
					select: {
						id: true,
						lessonId: true,
						score: true,
						xpEarned: true,
						completedAt: true,
					},
				}),
				ctx.prisma.flashcardReview.findMany({
					where: { userId: ctx.userId, lastReviewedAt: { gte: since } },
					orderBy: { lastReviewedAt: "desc" },
					take: 7,
					select: {
						id: true,
						vocabWordId: true,
						lastReviewedAt: true,
						repetitions: true,
					},
				}),
			]);

			return { lessons, reviews };
		} catch (error) {
			if (error instanceof TRPCError) {
				throw error;
			}

			console.error("[progress.getRecentActivity]", error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: toUserMessage(error, "Gagal mengambil aktivitas terbaru."),
			});
		}
	}),
});
