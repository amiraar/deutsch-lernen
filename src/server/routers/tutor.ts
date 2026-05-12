import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
	evaluateWriting,
	generateTutorResponse,
	getActiveProvider,
} from "@/lib/ai";
import { sanitizeAiInput } from "@/lib/sanitizeAiInput";
import { toUserMessage } from "@/lib/toUserMessage";
import { aiProcedure, router } from "@/server/trpc";

const messageSchema = z.object({
	id: z.string().optional(),
	role: z.enum(["user", "assistant", "system"]),
	content: z.string().min(1),
});

export const tutorRouter = router({
	chat: aiProcedure
		.input(z.object({ messages: z.array(messageSchema) }))
		.mutation(async ({ ctx, input }) => {
			try {
				const sanitizedMessages = input.messages.map((message) => ({
					...message,
					content: sanitizeAiInput(message.content),
				}));

				const response = await generateTutorResponse(
					sanitizedMessages,
					ctx.session?.user?.level ?? "A1"
				);

				return { response };
			} catch (error) {
				if (error instanceof TRPCError) {
					throw error;
				}

				console.error("[tutor.chat]", error);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: toUserMessage(error, "Gagal mendapatkan jawaban tutor."),
				});
			}
		}),

	evaluateWriting: aiProcedure
		.input(
			z.object({
				german: z.string().min(1),
				expectedMeaning: z.string().min(1),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const german = sanitizeAiInput(input.german);
				const expectedMeaning = sanitizeAiInput(input.expectedMeaning);

				const result = await evaluateWriting(
					german,
					expectedMeaning,
					ctx.session?.user?.level ?? "A1"
				);

				return result;
			} catch (error) {
				if (error instanceof TRPCError) {
					throw error;
				}

				console.error("[tutor.evaluateWriting]", error);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: toUserMessage(error, "Gagal mengevaluasi tulisan."),
				});
			}
		}),

	evaluatePronunciation: aiProcedure
		.input(
			z.object({
				audioBase64: z.string().min(1).max(5_000_000),
				expectedText: z.string().min(1),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const expectedText = sanitizeAiInput(input.expectedText);
				void input.audioBase64;

				const prompt =
					"Buat checklist pelafalan singkat dalam bahasa Indonesia untuk teks berikut: " +
					`"${expectedText}". ` +
					"Berikan 3-5 poin, masing-masing satu kalimat pendek. Tanpa pembuka atau penutup.";

				const response = await generateTutorResponse(
					[{ role: "user", content: prompt }],
					ctx.session?.user?.level ?? "A1"
				);

				const tips = response
					.split("\n")
					.map((line) => line.replace(/^[-*\d.).\s]+/, "").trim())
					.filter(Boolean);

				return {
					tips:
						tips.length > 0
							? tips
							: ["Ucapkan perlahan dan jelas, fokus pada tiap suku kata."],
						isAccepted: true,
				};
			} catch (error) {
				if (error instanceof TRPCError) {
					throw error;
				}

				console.error("[tutor.evaluatePronunciation]", error);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: toUserMessage(error, "Gagal mengevaluasi pelafalan."),
				});
			}
		}),

	getProviderStatus: aiProcedure.query(() => ({ provider: getActiveProvider() })),
});
