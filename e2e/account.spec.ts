import { readFile } from "node:fs/promises";

import {
	createUser,
	expect,
	login,
	loginAndWaitForDashboard,
	PASSWORD,
	query,
	test,
} from "./fixtures";

test("profile exports the user's data as JSON", async ({ page }) => {
	const user = await createUser();
	await loginAndWaitForDashboard(page, user.email);
	await page.goto("/profile");

	const downloadPromise = page.waitForEvent("download");
	await page.getByRole("button", { name: "Unduh data saya" }).click();
	const download = await downloadPromise;

	expect(download.suggestedFilename()).toBe("deutsch-lernen-data.json");
	const data = JSON.parse(await readFile((await download.path())!, "utf8"));
	expect(data.profile.email).toBe(user.email);
	expect(data.profile).not.toHaveProperty("passwordHash");
});

test("account deletion requires the right password", async ({ page }) => {
	const user = await createUser();
	await loginAndWaitForDashboard(page, user.email);
	await page.goto("/profile");

	await page.getByRole("button", { name: "Hapus akun" }).click();
	const dialog = page.getByRole("dialog");
	await dialog.getByLabel("Password", { exact: true }).fill("bukan-password");
	await dialog.getByRole("button", { name: "Hapus permanen" }).click();

	await expect(dialog.getByText("Password salah.")).toBeVisible();
	expect(await query('SELECT id FROM "User" WHERE id = $1', [user.id])).toHaveLength(1);
});

test("account deletion removes the user and ends the session", async ({ page }) => {
	const user = await createUser();
	await loginAndWaitForDashboard(page, user.email);
	await page.goto("/profile");

	await page.getByRole("button", { name: "Hapus akun" }).click();
	const dialog = page.getByRole("dialog");
	await dialog.getByLabel("Password", { exact: true }).fill(PASSWORD);
	await dialog.getByRole("button", { name: "Hapus permanen" }).click();

	await expect(page).toHaveURL(/localhost:\d+\/$/);
	expect(await query('SELECT id FROM "User" WHERE id = $1', [user.id])).toHaveLength(0);

	await page.goto("/dashboard");
	await expect(page).toHaveURL(/\/login$/);

	await login(page, user.email);
	await expect(page.getByText("Email atau password salah.")).toBeVisible();
});
