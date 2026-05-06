import type {
	ExerciseType as PrismaExerciseType,
	LevelEnum,
} from "@/generated/prisma";

export type Level = LevelEnum;
export type ExerciseType = PrismaExerciseType;

export type MessageRole = "user" | "assistant" | "system";

export type Message = {
	id?: string;
	role: MessageRole;
	content: string;
};

export type Correction = {
	original: string;
	corrected: string;
	explanation: string;
};

export type EvaluationResult = {
	isCorrect: boolean;
	score: number;
	feedback: string;
	corrections: Correction[];
};

export type SRSCard = {
	easeFactor: number;
	interval: number;
	repetitions: number;
};

export type SRSResult = {
	easeFactor: number;
	interval: number;
	repetitions: number;
	nextReviewAt: Date;
};

export type UserStats = {
	xp: number;
	level: Level;
	streakDays: number;
	lessonsCompleted: number;
	wordsLearned: number;
};

export type SRSCard = {
	easeFactor: number;
	interval: number;
	repetitions: number;
};

export type SRSResult = {
	easeFactor: number;
	interval: number;
	repetitions: number;
	nextReviewAt: Date;
};
