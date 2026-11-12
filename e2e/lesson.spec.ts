import type { Page } from "@playwright/test";

import { createUser, expect, loginAndWaitForDashboard, query, test } from "./fixtures";

type ExerciseRow = {
	id: string;
	type: "MULTIPLE_CHOICE" | "FILL_IN_BLANK" | "TRANSLATION" | "PRONUNCIATION";
	prompt: string;
	correctAnswer: string;
};

// Pronunciation exercises record from the microphone; Chromium's fake device
// stands in for a real one.
test.use({
	permissions: ["microphone"],
	launchOptions: {
		args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"],
	},
});

async function firstLesson(): Promise<{ id: string; title: string; exercises: ExerciseRow[] }> {
	const [lesson] = await query<{ id: string; title: string }>(
		'SELECT id, title FROM "Lesson" ORDER BY "order" ASC LIMIT 1'
	);
	const exercises = await query<ExerciseRow>(
		'SELECT id, type, prompt, "correctAnswer" FROM "Exercise" WHERE "lessonId" = $1',
		[lesson.id]
	);
	return { ...lesson, exercises };
}

async function answerCurrentExercise(page: Page, exercises: ExerciseRow[]): Promise<ExerciseRow> {
	// The progress header only exists in the exercise phase, not the content phase.
	await expect(page.getByText(/^\d+\/\d+ latihan$/)).toBeVisible();

	let exercise: ExerciseRow | undefined;
	await expect
		.poll(async () => {
			for (const row of exercises) {
				if (await page.getByText(row.prompt, { exact: true }).isVisible()) {
					exercise = row;
					return true;
				}
			}
			return false;
		})
		.toBe(true);

	if (!exercise) throw new Error("No exercise prompt visible");

	switch (exercise.type) {
		case "MULTIPLE_CHOICE":
			await page.getByRole("button", { name: exercise.correctAnswer, exact: true }).click();
			break;
		case "FILL_IN_BLANK":
			await page.getByPlaceholder("Tulis jawabanmu").fill(exercise.correctAnswer);
			await page.getByRole("button", { name: "Periksa" }).click();
			break;
		case "TRANSLATION":
			await page.getByPlaceholder("Tulis terjemahan bahasa Jerman").fill(exercise.correctAnswer);
			await page.getByRole("button", { name: "Kirim" }).click();
			break;
		case "PRONUNCIATION":
			await page.getByRole("button", { name: /Rekam/ }).click();
			await page.getByRole("button", { name: /Stop/ }).click();
			break;
	}

	return exercise;
}

/** Moves on after reading the feedback, like a learner would. */
async function continueToNext(page: Page): Promise<void> {
	await page.getByRole("button", { name: /^(Lanjut|Selesaikan pelajaran)/ }).click();
}

test("a lesson can be completed end to end and pays XP once", async ({ page }) => {
	const user = await createUser();
	const lesson = await firstLesson();
	await loginAndWaitForDashboard(page, user.email);

	await page.goto("/lesson");
	await page.getByRole("link", { name: new RegExp(lesson.title) }).first().click();
	await expect(page).toHaveURL(new RegExp(`/lesson/${lesson.id}$`));
	await page.getByRole("button", { name: /Mulai Latihan/ }).click();

	for (let index = 0; index < lesson.exercises.length; index++) {
		const exercise = await answerCurrentExercise(page, lesson.exercises);
		// Every exercise type must let the learner move on, AI available or not.
		await continueToNext(page);
		if (index < lesson.exercises.length - 1) {
			await expect(page.getByText(exercise.prompt, { exact: true })).toBeHidden({
				timeout: 15_000,
			});
		}
	}

	const dialog = page.getByRole("dialog");
	await expect(dialog).toContainText("Pelajaran selesai!", { timeout: 15_000 });
	await expect(dialog).toContainText("100");

	const [row] = await query<{ xp: number }>('SELECT xp FROM "User" WHERE id = $1', [user.id]);
	expect(row.xp).toBe(lesson.exercises.length * 10);

	await page.goto("/lesson");
	await expect(
		page.getByRole("link", { name: new RegExp(lesson.title) }).first()
	).toContainText("Selesai");
});

test("multiple-choice feedback stays visible after answering", async ({ page }) => {
	const user = await createUser();
	const lesson = await firstLesson();
	await loginAndWaitForDashboard(page, user.email);

	await page.goto(`/lesson/${lesson.id}`);
	await page.getByRole("button", { name: /Mulai Latihan/ }).click();
	await answerCurrentExercise(page, lesson.exercises);

	await expect(page.getByText(/Jawaban (benar|kurang tepat)/).first()).toBeVisible();
});

test("server grades answers and replays award no extra XP", async ({ page }) => {
	const user = await createUser();
	const lesson = await firstLesson();
	await loginAndWaitForDashboard(page, user.email);

	const complete = (answers: Array<{ exerciseId: string; answer: string }>) =>
		page.request.post("/api/trpc/lesson.completeLesson", {
			data: { lessonId: lesson.id, answers },
		});

	// All wrong answers on the gradable types → partial score only.
	const wrong = lesson.exercises.map((exercise) => ({
		exerciseId: exercise.id,
		answer:
			exercise.type === "MULTIPLE_CHOICE" || exercise.type === "FILL_IN_BLANK"
				? "jawaban-salah"
				: exercise.correctAnswer,
	}));
	const first = await complete(wrong);
	expect(first.status()).toBe(200);
	const firstData = (await first.json()).result.data;
	const participationOnly = lesson.exercises.filter(
		(exercise) => exercise.type === "TRANSLATION" || exercise.type === "PRONUNCIATION"
	).length;
	expect(firstData.xpAwarded).toBe(participationOnly * 10);

	// A perfect replay raises the score but never pays out again.
	const right = lesson.exercises.map((exercise) => ({
		exerciseId: exercise.id,
		answer: exercise.correctAnswer,
	}));
	const second = (await (await complete(right)).json()).result.data;
	expect(second.alreadyCompleted).toBe(true);
	expect(second.xpAwarded).toBe(0);
	expect(second.score).toBe(100);

	const [row] = await query<{ xp: number }>('SELECT xp FROM "User" WHERE id = $1', [user.id]);
	expect(row.xp).toBe(participationOnly * 10);
});
