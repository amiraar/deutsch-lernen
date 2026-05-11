import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { LevelEnum } from "@/generated/prisma/client";
import { invalidateUserStats } from "@/lib/cache";
import { calculateNextReview } from "@/lib/srs";
import { toUserMessage } from "@/lib/toUserMessage";
import { addWordInput, reviewCardInput } from "@/lib/validations/flashcard";
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
			if (error instanceof TRPCError) {
				throw error;
			}

			console.error("[flashcard.getDueCards]", error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: toUserMessage(error, "Gagal mengambil kartu review."),
			});
		}
	}),

	searchVocab: protectedProcedure
		.input(
			z.object({
				query: z.string().min(0).max(100),
				level: z.nativeEnum(LevelEnum).optional(),
			})
		)
		.query(async ({ ctx, input }) => {
			try {
				const query = input.query.trim();
				if (!query) {
					return [];
				}

				return await ctx.prisma.vocabWord.findMany({
					where: {
						OR: [
							{ german: { contains: query, mode: "insensitive" } },
							{ indonesian: { contains: query, mode: "insensitive" } },
						],
						...(input.level ? { level: input.level } : {}),
					},
					take: 20,
				});
			} catch (error) {
				if (error instanceof TRPCError) {
					throw error;
				}

				console.error("[flashcard.searchVocab]", error);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: toUserMessage(error, "Gagal mencari kosakata."),
				});
			}
		}),

	reviewCard: protectedProcedure
		.input(reviewCardInput)
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

				const updated = await ctx.prisma.flashcardReview.update({
					where: { id: card.id },
					data: {
						easeFactor: next.easeFactor,
						interval: next.interval,
						repetitions: next.repetitions,
						nextReviewAt: next.nextReviewAt,
						lastReviewedAt: new Date(),
					},
				});
				await invalidateUserStats(ctx.userId);
				return updated;
			} catch (error) {
				if (error instanceof TRPCError) {
					throw error;
				}

				console.error("[flashcard.reviewCard]", error);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: toUserMessage(error, "Gagal menyimpan review."),
				});
			}
		}),

	addWordToReview: protectedProcedure
		.input(addWordInput)
		.mutation(async ({ ctx, input }) => {
			try {
				const wordExists = await ctx.prisma.vocabWord.findUnique({
					where: { id: input.vocabWordId },
					select: { id: true },
				});
				if (!wordExists) {
					throw new TRPCError({
						code: "NOT_FOUND",
						message: "Kata tidak ditemukan.",
					});
				}
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

				console.error("[flashcard.addWordToReview]", error);
				const errorMessage = error instanceof Error ? error.message : "";
				if (errorMessage.includes("Unique constraint")) {
					throw new TRPCError({
						code: "CONFLICT",
						message: "Kata ini sudah ada di review.",
					});
				}

				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: toUserMessage(error, "Gagal menambahkan kata."),
				});
			}
		}),
});
