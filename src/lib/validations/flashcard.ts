import { z } from "zod";

export const reviewCardInput = z.object({
	cardId: z.string().min(1, "ID kartu tidak valid."),
	quality: z.number().int().min(0).max(5),
});

export const addWordInput = z.object({
	vocabWordId: z.string().min(1, "ID kata tidak valid."),
});

export type ReviewCardInput = z.infer<typeof reviewCardInput>;
export type AddWordInput = z.infer<typeof addWordInput>;
