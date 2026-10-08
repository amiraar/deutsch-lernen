import { z } from "zod";

import { LevelEnum } from "@/generated/prisma/client";

export const getLessonsInput = z
	.object({
		level: z.nativeEnum(LevelEnum).optional(),
	})
	.optional();

export const getLessonByIdInput = z.object({
	id: z.string().min(1, "ID pelajaran tidak valid."),
});

export const lessonAnswerSchema = z.object({
	exerciseId: z.string().min(1, "ID latihan tidak valid."),
	answer: z.string().max(500, "Jawaban terlalu panjang."),
});

// The score is no longer accepted from the client: the server grades every
// answer against the stored correct answer and derives the score itself.
export const completeLessonInput = z.object({
	lessonId: z.string().min(1, "ID pelajaran tidak valid."),
	answers: z.array(lessonAnswerSchema).max(50, "Terlalu banyak jawaban."),
});

export type GetLessonsInput = z.infer<typeof getLessonsInput>;
export type GetLessonByIdInput = z.infer<typeof getLessonByIdInput>;
export type LessonAnswer = z.infer<typeof lessonAnswerSchema>;
export type CompleteLessonInput = z.infer<typeof completeLessonInput>;
