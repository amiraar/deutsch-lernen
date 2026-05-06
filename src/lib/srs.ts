import type { SRSCard, SRSResult } from "@/types";

const MIN_EASE_FACTOR = 1.3;

function clampEaseFactor(value: number): number {
	return Math.max(MIN_EASE_FACTOR, value);
}

function addDays(date: Date, days: number): Date {
	const next = new Date(date);
	next.setDate(next.getDate() + days);
	return next;
}

/**
 * Calculates the next SM-2 review state based on recall quality.
 */
export function calculateNextReview(
	card: SRSCard,
	quality: number
): SRSResult {
	if (quality < 0 || quality > 5) {
		throw new Error("Quality must be between 0 and 5");
	}

	// Step 1: Update ease factor based on recall quality.
	const q = quality;
	const easeDelta = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02);
	const nextEaseFactor = clampEaseFactor(card.easeFactor + easeDelta);

	// Step 2: Determine repetitions and interval rules.
	let nextRepetitions = card.repetitions;
	let nextInterval = card.interval;

	if (q < 3) {
		// Incorrect recall resets repetitions and sets interval to 1 day.
		nextRepetitions = 0;
		nextInterval = 1;
	} else {
		// Correct recall increases repetitions and expands interval.
		nextRepetitions = card.repetitions + 1;

		if (nextRepetitions === 1) {
			nextInterval = 1;
		} else if (nextRepetitions === 2) {
			nextInterval = 6;
		} else {
			nextInterval = Math.round(card.interval * nextEaseFactor);
		}
	}

	// Step 3: Compute the next review date.
	const nextReviewAt = addDays(new Date(), nextInterval);

	return {
		easeFactor: nextEaseFactor,
		interval: nextInterval,
		repetitions: nextRepetitions,
		nextReviewAt,
	};
}
