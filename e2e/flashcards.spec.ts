import { createUser, expect, loginAndWaitForDashboard, query, test } from "./fixtures";

test("cards from a completed lesson can be reviewed to the end", async ({ page }) => {
	const user = await createUser();
	await loginAndWaitForDashboard(page, user.email);

	// Completing a lesson queues its vocabulary for review.
	const [lesson] = await query<{ id: string }>(
		'SELECT id FROM "Lesson" ORDER BY "order" ASC LIMIT 1'
	);
	const response = await page.request.post("/api/trpc/lesson.completeLesson", {
		data: { lessonId: lesson.id, answers: [] },
	});
	expect(response.status()).toBe(200);

	const due = await query<{ id: string }>(
		'SELECT id FROM "FlashcardReview" WHERE "userId" = $1',
		[user.id]
	);
	expect(due.length).toBeGreaterThan(0);

	await page.goto("/flashcards");

	for (let index = 0; index < due.length; index++) {
		await page.getByRole("button", { name: "Lihat Arti" }).click();
		await page.getByRole("button", { name: /^Mudah/ }).click();
	}

	await expect(page.getByText("Sesi selesai!")).toBeVisible();
	await expect(page.getByText(`Mudah: ${due.length} kartu`)).toBeVisible();

	const reviewed = await query<{ count: string }>(
		'SELECT count(*) FROM "FlashcardReview" WHERE "userId" = $1 AND "lastReviewedAt" IS NOT NULL AND "nextReviewAt" > now()',
		[user.id]
	);
	expect(Number(reviewed[0].count)).toBe(due.length);
});

test("flashcards page shows an empty state when nothing is due", async ({ page }) => {
	const user = await createUser();
	await loginAndWaitForDashboard(page, user.email);
	await page.goto("/flashcards");

	await expect(page.getByRole("button", { name: "Lihat Arti" })).toHaveCount(0);
	await expect(page.locator("main")).not.toContainText(/error|gagal/i);
});
