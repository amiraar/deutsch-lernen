import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { calculateNextReview } from "@/lib/srs";
import { protectedProcedure, router } from "@/server/trpc";

export const flashcardRouter = router({
	getDueCards: protectedProcedure.query(async ({ ctx }) => {
		try {
			return await ctx.prisma.flashcardReview.findMany({
				where: {
					userId: ctx.userId,
					nextReviewAt: { lte: new Date() },
				},
				include: { vocabWord: true },
				orderBy: { nextReviewAt: "asc" },
				take: 20,
			});
		} catch (error) {
			const message = error instanceof Error ? error.message : "Unknown error";
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: `Gagal mengambil kartu review. ${message}`,
			});
		}
	}),

	reviewCard: protectedProcedure
		.input(
			z.object({
				cardId: z.string().min(1),
				quality: z.number().min(0).max(5),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const card = await ctx.prisma.flashcardReview.findFirst({
					where: { id: input.cardId, userId: ctx.userId },
				});

				if (!card) {
					throw new TRPCError({
						code: "NOT_FOUND",
						message: "Kartu tidak ditemukan.",
					});
				}

				const next = calculateNextReview(
					{
						easeFactor: card.easeFactor,
						interval: card.interval,
						repetitions: card.repetitions,
					},
					input.quality
				);

				return await ctx.prisma.flashcardReview.update({
					where: { id: card.id },
					data: {
						easeFactor: next.easeFactor,
						interval: next.interval,
						repetitions: next.repetitions,
						nextReviewAt: next.nextReviewAt,
						lastReviewedAt: new Date(),
					},
				});
			} catch (error) {
				if (error instanceof TRPCError) {
					throw error;
				}

				const message = error instanceof Error ? error.message : "Unknown error";
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: `Gagal menyimpan review. ${message}`,
				});
			}
		}),

	addWordToReview: protectedProcedure
		.input(z.object({ vocabWordId: z.string().min(1) }))
		.mutation(async ({ ctx, input }) => {
			try {
				return await ctx.prisma.flashcardReview.create({
					data: {
						userId: ctx.userId,
						vocabWordId: input.vocabWordId,
						easeFactor: 2.5,
						interval: 1,
						repetitions: 0,
						nextReviewAt: new Date(),
					},
				});
			} catch (error) {
				if (error instanceof TRPCError) {
					throw error;
				}

				const message = error instanceof Error ? error.message : "Unknown error";
				if (message.includes("Unique constraint")) {
					throw new TRPCError({
						code: "CONFLICT",
						message: "Kata ini sudah ada di review.",
					});
				}

				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: `Gagal menambahkan kata. ${message}`,
				});
			}
		}),
});
