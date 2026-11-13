import type { Page } from "@playwright/test";

import { createUser, expect, loginAndWaitForDashboard, query, test } from "./fixtures";

const PUBLIC_ROUTES = ["/", "/login", "/register", "/forgot-password", "/privacy", "/terms"];
const APP_ROUTES = [
	"/dashboard",
	"/lesson",
	"/flashcards",
	"/materials",
	"/materials/grammatik",
	"/materials/kosakata",
	"/materials/verben",
	"/materials/frasa",
	"/materials/zahlen",
	"/tutor",
	"/profile",
	"/onboarding",
];
// 360px is the narrowest common Android width; the project viewport is the other.
const NARROW = { width: 360, height: 780 };

/** Elements sticking out past the right edge, for a readable failure message. */
async function horizontalOverflow(page: Page): Promise<string[]> {
	return page.evaluate(() => {
		const limit = document.documentElement.clientWidth;
		if (document.documentElement.scrollWidth <= limit) return [];

		return Array.from(document.querySelectorAll("body *"))
			.filter((element) => {
				const rect = element.getBoundingClientRect();
				// Scrollable regions (tables) are allowed to be wider than the screen.
				const scrollableParent = element.closest(".overflow-x-auto");
				return rect.width > 0 && rect.right > limit + 1 && !scrollableParent;
			})
			.slice(0, 5)
			.map((element) => {
				const rect = element.getBoundingClientRect();
				const text = (element.textContent ?? "").trim().slice(0, 30);
				return `<${element.tagName.toLowerCase()} class="${element.className}"> right=${Math.round(rect.right)} "${text}"`;
			});
	});
}

async function checkRoutes(page: Page, routes: string[], label: string) {
	const sizes = [page.viewportSize()!, NARROW];

	for (const size of sizes) {
		await page.setViewportSize(size);
		for (const route of routes) {
			await page.goto(route);
			await page.waitForLoadState("networkidle");
			await page.screenshot({
				path: `test-results/screens/${label}-${size.width}${route.replace(/\//g, "_") || "_home"}.png`,
				fullPage: true,
			});
			expect.soft(await horizontalOverflow(page), `${route} @ ${size.width}px`).toEqual([]);
		}
	}
}

test("public pages fit the screen without horizontal scroll", async ({ page }, testInfo) => {
	await checkRoutes(page, PUBLIC_ROUTES, `${testInfo.project.name}-public`);
});

test("app pages fit the screen without horizontal scroll", async ({ page }, testInfo) => {
	const user = await createUser();
	await loginAndWaitForDashboard(page, user.email);

	const [lesson] = await query<{ id: string }>(
		'SELECT id FROM "Lesson" ORDER BY "order" ASC LIMIT 1'
	);
	await checkRoutes(page, [...APP_ROUTES, `/lesson/${lesson.id}`], `${testInfo.project.name}-app`);
});

test("mobile bottom navigation does not cover page content", async ({ page }, testInfo) => {
	test.skip(testInfo.project.name !== "mobile", "bottom nav is mobile-only");

	const user = await createUser();
	await loginAndWaitForDashboard(page, user.email);
	await page.goto("/profile");

	const nav = page.locator("nav.fixed");
	await expect(nav).toBeVisible();
	const navHeight = (await nav.boundingBox())!.height;

	// "Keluar" is the last control on the profile page; it must be reachable
	// above the nav bar once scrolled to the bottom. Waiting for it also skips
	// the loading skeleton.
	const last = page.locator("main").getByRole("button", { name: "Keluar", exact: true });
	await expect(last).toBeVisible();
	await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
	const box = (await last.boundingBox())!;
	const viewport = page.viewportSize()!;
	expect(box.y + box.height).toBeLessThanOrEqual(viewport.height - navHeight);
});

test("landing navbar buttons stay on one line at 360px", async ({ page }) => {
	await page.setViewportSize(NARROW);
	await page.goto("/");

	for (const name of ["Masuk", "Daftar Gratis"]) {
		const button = page.getByRole("banner").getByRole("button", { name });
		const height = await button.evaluate((element) => element.scrollHeight);
		// One line of text fits in the 36px button; wrapping overflows it.
		expect(height, name).toBeLessThanOrEqual(36);
	}
});
