import { describe, expect, it } from "vitest";

import { calculateNextReview } from "@/lib/srs";

const NEW_CARD = { easeFactor: 2.5, interval: 1, repetitions: 0 };

describe("calculateNextReview (SM-2)", () => {
	it("follows the 1 → 6 → interval × ease progression on good recall", () => {
		const first = calculateNextReview(NEW_CARD, 5);
		expect(first.interval).toBe(1);
		expect(first.repetitions).toBe(1);

		const second = calculateNextReview(first, 5);
		expect(second.interval).toBe(6);

		const third = calculateNextReview(second, 5);
		expect(third.interval).toBe(Math.round(6 * third.easeFactor));
	});

	it("resets the card after a failed recall", () => {
		const learned = { easeFactor: 2.5, interval: 15, repetitions: 4 };
		const result = calculateNextReview(learned, 1);
		expect(result.repetitions).toBe(0);
		expect(result.interval).toBe(1);
	});

	it("never lets the ease factor drop below 1.3", () => {
		let card = NEW_CARD;
		for (let i = 0; i < 10; i++) card = calculateNextReview(card, 0);
		expect(card.easeFactor).toBe(1.3);
	});

	it("rejects out-of-range quality", () => {
		expect(() => calculateNextReview(NEW_CARD, 6)).toThrow();
		expect(() => calculateNextReview(NEW_CARD, -1)).toThrow();
	});
});
