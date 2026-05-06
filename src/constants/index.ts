import type { Level } from "@/types";

export const XP_PER_LESSON_PERFECT = 100;
export const XP_PER_LESSON_BASE = 50;
export const STREAK_BONUS_MULTIPLIER = 1.5;
export const DAILY_LESSON_GOAL = 3;
export const LEVELS = ["A1", "A2", "B1", "B2"] as const;
export const LEVEL_LABELS: Record<Level, string> = {
	A1: "Pemula",
	A2: "Dasar",
	B1: "Menengah",
	B2: "Mahir",
};
export const XP_THRESHOLDS: Record<Level, number> = {
	A1: 0,
	A2: 500,
	B1: 2000,
	B2: 5000,
};
export const SRS_NEW_CARD_DEFAULTS = {
	easeFactor: 2.5,
	interval: 1,
	repetitions: 0,
};
