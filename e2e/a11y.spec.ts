import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

import { createUser, expect, loginAndWaitForDashboard, test } from "./fixtures";

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
