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

export const completeLessonInput = z.object({
	lessonId: z.string().min(1, "ID pelajaran tidak valid."),
	score: z.number().min(0).max(100),
});

export type GetLessonsInput = z.infer<typeof getLessonsInput>;
export type GetLessonByIdInput = z.infer<typeof getLessonByIdInput>;
export type CompleteLessonInput = z.infer<typeof completeLessonInput>;
