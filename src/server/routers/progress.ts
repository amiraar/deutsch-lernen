import { TRPCError } from "@trpc/server";

import { getCachedUserStats } from "@/lib/cache";
import { protectedProcedure, router } from "@/server/trpc";

export const progressRouter = router({
	getUserStats: protectedProcedure.query(async ({ ctx }) => {
		try {
			return await getCachedUserStats(ctx.userId);
		} catch (error) {
			const message = error instanceof Error ? error.message : "Unknown error";
			if (message === "User not found") {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "Sesi tidak valid. Silakan login kembali.",
				});
			}
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: `Gagal mengambil statistik pengguna. ${message}`,
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
			const message = error instanceof Error ? error.message : "Unknown error";
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: `Gagal mengambil aktivitas terbaru. ${message}`,
			});
		}
	}),
});
