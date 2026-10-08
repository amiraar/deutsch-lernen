/**
 * Answer grading shared by the client UI and the server.
 *
 * The server is the only authority for XP: it re-grades every answer against
 * the correct answer stored in the database, so a tampered payload cannot
 * claim a score the answers do not support. The client imports the same
 * functions purely for immediate feedback.
 */

export type GradableExerciseType =
	| "MULTIPLE_CHOICE"
	| "FILL_IN_BLANK"
	| "TRANSLATION"
	| "PRONUNCIATION";

export type GradableExercise = {
	type: GradableExerciseType;
	correctAnswer: string;
};

export const XP_PER_CORRECT_ANSWER = 10;

export function normalizeAnswer(value: string): string {
	return value.trim().toLowerCase();
}

/**
 * MULTIPLE_CHOICE and FILL_IN_BLANK are checked against the stored answer.
 *
 * TRANSLATION is judged by the AI tutor and PRONUNCIATION by the recorder, so
 * the server cannot re-check them without a second model call per answer; a
 * non-empty submission counts as participation. Those two still cannot be
 * farmed, because XP is awarded only on the first completion of a lesson.
 */
export function gradeAnswer(exercise: GradableExercise, answer: string): boolean {
	switch (exercise.type) {
		case "MULTIPLE_CHOICE":
			return answer === exercise.correctAnswer;
		case "FILL_IN_BLANK":
			return normalizeAnswer(answer) === normalizeAnswer(exercise.correctAnswer);
		case "TRANSLATION":
		case "PRONUNCIATION":
			return answer.trim().length > 0;
	}
}

export function scoreFromAnswers(correctCount: number, totalExercises: number): number {
	if (totalExercises <= 0) {
		return 0;
	}

	return Math.round((correctCount / totalExercises) * 100);
}
