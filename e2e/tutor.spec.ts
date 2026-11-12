import { createUser, expect, loginAndWaitForDashboard, test } from "./fixtures";

// The E2E server has no AI keys, which is the same situation as every
// provider being down: the tutor must fail politely.
test("tutor reports an unavailable AI without crashing", async ({ page }) => {
	const errors: string[] = [];
	page.on("pageerror", (error) => errors.push(error.message));

	const user = await createUser();
	await loginAndWaitForDashboard(page, user.email);
	await page.goto("/tutor");

	await page.getByPlaceholder(/Tulis pertanyaanmu/).first().fill("Apa arti Hallo?");
	await page.getByRole("button", { name: "Kirim" }).first().click();

	await expect(page.locator("main")).toContainText("Gagal");
	// Internal provider details (key names, vendor errors) must not leak to the UI.
	await expect(page.locator("main")).not.toContainText(/API_KEY|Gemini|Groq|Anthropic/i);
	expect(errors).toEqual([]);
});
