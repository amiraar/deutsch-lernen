import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
	evaluateWriting,
	generateTutorResponse,
	getActiveProvider,
} from "@/lib/ai";
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
				const response = await generateTutorResponse(
					input.messages,
					ctx.session?.user?.level ?? "A1"
				);

				return { response };
			} catch (error) {
				const message = error instanceof Error ? error.message : "Unknown error";
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: `Gagal mendapatkan jawaban tutor. ${message}`,
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
				const result = await evaluateWriting(
					input.german,
					input.expectedMeaning,
					ctx.session?.user?.level ?? "A1"
				);

				return result;
			} catch (error) {
				const message = error instanceof Error ? error.message : "Unknown error";
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: `Gagal mengevaluasi tulisan. ${message}`,
				});
			}
		}),

	getProviderStatus: aiProcedure.query(() => ({ provider: getActiveProvider() })),
});
