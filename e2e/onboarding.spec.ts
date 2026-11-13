import { expect, PASSWORD, query, test, uniqueEmail } from "./fixtures";

test("a newly registered user is taken to level selection", async ({ page }) => {
	const email = uniqueEmail("onb");

	await page.goto("/register");
	await page.getByLabel("Nama").fill("Neu");
	await page.getByLabel("Email").fill(email);
	await page.getByLabel("Password", { exact: true }).fill(PASSWORD);
	await page.getByRole("button", { name: "Buat Akun" }).click();

	await expect(page).toHaveURL(/\/onboarding$/);

	await page.getByRole("button", { name: /Mulai/ }).click();
	await page.getByRole("button", { name: /Sudah tahu dasar-dasarnya/ }).click();
	await page.getByRole("button", { name: "Simpan dan lanjut" }).click();
	await expect(page).toHaveURL(/\/dashboard$/);

	const [user] = await query<{ level: string }>(
		'SELECT level FROM "User" WHERE email = $1',
		[email]
	);
	expect(user.level).toBe("A2");

	// Finishing onboarding must not trap the user there.
	await page.goto("/lesson");
	await expect(page).toHaveURL(/\/lesson$/);
});
