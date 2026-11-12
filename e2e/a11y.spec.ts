import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

import { createUser, expect, loginAndWaitForDashboard, query, test } from "./fixtures";

async function seriousViolations(page: Page) {
	const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();

	return results.violations
		.filter((violation) => violation.impact === "serious" || violation.impact === "critical")
		.map((violation) => ({
			rule: violation.id,
			impact: violation.impact,
			nodes: violation.nodes.slice(0, 3).map((node) => node.target.join(" ")),
		}));
}

for (const route of ["/", "/login", "/register"]) {
	test(`public page ${route} has no serious accessibility violations`, async ({ page }) => {
		await page.goto(route);
		await page.waitForLoadState("networkidle");
		expect(await seriousViolations(page)).toEqual([]);
	});
}

test("app pages have no serious accessibility violations", async ({ page }) => {
	const user = await createUser();
	await loginAndWaitForDashboard(page, user.email);

	for (const route of ["/dashboard", "/lesson", "/flashcards", "/materials", "/tutor", "/profile"]) {
		await page.goto(route);
		await page.waitForLoadState("networkidle");
		expect.soft(await seriousViolations(page), route).toEqual([]);
	}
});

test("flashcard and exercise feedback states have no serious violations", async ({ page }) => {
	const user = await createUser();
	await loginAndWaitForDashboard(page, user.email);

	const [lesson] = await query<{ id: string }>(
		'SELECT id FROM "Lesson" ORDER BY "order" ASC LIMIT 1'
	);
	// Completing the lesson queues its vocabulary as due flashcards.
	await page.request.post("/api/trpc/lesson.completeLesson", {
		data: { lessonId: lesson.id, answers: [] },
	});

	await page.goto("/flashcards");
	await page.getByRole("button", { name: "Lihat Arti" }).click();
	await expect(page.getByRole("button", { name: /^Mudah/ })).toBeVisible();
	expect.soft(await seriousViolations(page), "flipped flashcard").toEqual([]);

	await page.goto(`/lesson/${lesson.id}`);
	await page.getByRole("button", { name: /Mulai Latihan/ }).click();
	// A wrong pick shows both the red (chosen) and green (correct) states.
	const options = page.locator("main").getByRole("button").filter({ hasNotText: /Lanjut/ });
	const [exercise] = await query<{ correctAnswer: string }>(
		`SELECT "correctAnswer" FROM "Exercise" WHERE "lessonId" = $1 AND type = 'MULTIPLE_CHOICE' LIMIT 1`,
		[lesson.id]
	);
	await expect(page.getByText(/^\d+\/\d+ latihan$/)).toBeVisible();
	await options.filter({ hasNotText: exercise.correctAnswer }).first().click();
	await expect(page.getByText("Jawaban kurang tepat", { exact: false })).toBeVisible();
	expect.soft(await seriousViolations(page), "answered exercise").toEqual([]);
});
