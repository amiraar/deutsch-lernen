import { expect, test } from "./fixtures";

const PUBLIC_PAGES = [
	{ path: "/", heading: /Jerman/i },
	{ path: "/login", heading: "Masuk" },
	{ path: "/register", heading: "Buat akun" },
	{ path: "/forgot-password", heading: /password/i },
	{ path: "/privacy", heading: /privasi/i },
	{ path: "/terms", heading: /syarat|ketentuan/i },
];

for (const { path, heading } of PUBLIC_PAGES) {
	test(`public page ${path} renders without console errors`, async ({ page }) => {
		const errors: string[] = [];
		page.on("console", (message) => {
			if (message.type() === "error") errors.push(message.text());
		});
		page.on("pageerror", (error) => errors.push(error.message));

		const response = await page.goto(path);

		expect(response?.status()).toBe(200);
		await expect(page.getByRole("heading", { level: 1 }).first()).toContainText(heading);
		expect(errors).toEqual([]);
	});
}

const PROTECTED = ["/dashboard", "/lesson", "/flashcards", "/materials", "/tutor", "/profile", "/onboarding"];

for (const path of PROTECTED) {
	test(`anonymous visit to ${path} redirects to /login`, async ({ page }) => {
		await page.goto(path);
		await expect(page).toHaveURL(/\/login$/);
	});
}

test("responses carry a nonce CSP and security headers", async ({ request }) => {
	const response = await request.get("/login");
	const headers = response.headers();

	expect(headers["content-security-policy"]).toMatch(/script-src 'self' 'nonce-[a-f0-9]{32}' 'strict-dynamic'/);
	expect(headers["content-security-policy"]).not.toContain("unsafe-eval");
	expect(headers["x-frame-options"]).toBe("DENY");
	expect(headers["x-content-type-options"]).toBe("nosniff");
});

test("security.txt is public", async ({ request }) => {
	const response = await request.get("/.well-known/security.txt");
	expect(response.status()).toBe(200);
	expect(await response.text()).toContain("Contact:");
});

test("unauthenticated tRPC call is rejected", async ({ request }) => {
	const response = await request.get("/api/trpc/progress.getUserStats");
	expect(response.status()).toBe(401);
});
