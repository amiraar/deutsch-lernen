import { describe, expect, it } from "vitest";

import { gradeAnswer, scoreFromAnswers } from "@/lib/grading";

describe("gradeAnswer", () => {
	it("requires an exact match for multiple choice", () => {
		const exercise = { type: "MULTIPLE_CHOICE" as const, correctAnswer: "Selamat pagi" };
		expect(gradeAnswer(exercise, "Selamat pagi")).toBe(true);
		expect(gradeAnswer(exercise, "selamat pagi")).toBe(false);
	});

	it("ignores case and surrounding spaces for fill-in-the-blank", () => {
		const exercise = { type: "FILL_IN_BLANK" as const, correctAnswer: "Guten" };
		expect(gradeAnswer(exercise, "  guten ")).toBe(true);
		expect(gradeAnswer(exercise, "Gute")).toBe(false);
	});

	it("counts any non-empty translation or recording as participation", () => {
		for (const type of ["TRANSLATION", "PRONUNCIATION"] as const) {
			expect(gradeAnswer({ type, correctAnswer: "x" }, "irgendwas")).toBe(true);
			expect(gradeAnswer({ type, correctAnswer: "x" }, "   ")).toBe(false);
		}
	});
});

describe("scoreFromAnswers", () => {
	it("rounds to a percentage and never divides by zero", () => {
		expect(scoreFromAnswers(2, 3)).toBe(67);
		expect(scoreFromAnswers(5, 5)).toBe(100);
		expect(scoreFromAnswers(0, 0)).toBe(0);
	});
});
