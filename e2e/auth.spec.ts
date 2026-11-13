import { createHash, randomBytes } from "node:crypto";

import {
	createUser,
	expect,
	login,
	loginAndWaitForDashboard,
	PASSWORD,
	query,
	test,
	uniqueEmail,
} from "./fixtures";

async function fillRegister(
	page: import("@playwright/test").Page,
	email: string,
	password = PASSWORD
) {
	await page.goto("/register");
	await page.getByLabel("Nama").fill("Tester");
	await page.getByLabel("Email").fill(email);
	await page.getByLabel("Password", { exact: true }).fill(password);
	await page.getByRole("button", { name: "Buat Akun" }).click();
}

test("register creates an account and signs the user in", async ({ page }) => {
	const email = uniqueEmail("reg");
	await fillRegister(page, email);

	await expect(page).not.toHaveURL(/\/(register|login)$/);
	const rows = await query("SELECT id FROM \"User\" WHERE email = $1", [email]);
	expect(rows).toHaveLength(1);
});

test("register rejects an email that already has an account", async ({ page }) => {
	const user = await createUser();
	await fillRegister(page, user.email);

	await expect(page.getByText("Email sudah terdaftar.")).toBeVisible();
});

test("email addresses are case-insensitive", async ({ page }) => {
	const user = await createUser();
	const shouted = user.email.toUpperCase();

	await fillRegister(page, shouted);
	await expect(page.getByText("Email sudah terdaftar.")).toBeVisible();

	const rows = await query("SELECT email FROM \"User\" WHERE lower(email) = lower($1)", [
		user.email,
	]);
	expect(rows).toHaveLength(1);
});

test("login works with a differently-cased email", async ({ page }) => {
	const user = await createUser();
	await login(page, user.email.toUpperCase());

	await expect(page).toHaveURL(/\/dashboard$/);
});

test("accounts stored with mixed case before normalisation can still log in", async ({ page }) => {
	const legacy = await createUser({ email: uniqueEmail("Legacy").replace("@example", "@Example") });
	await login(page, legacy.email.toLowerCase());

	await expect(page).toHaveURL(/\/dashboard$/);
});

test("wrong password shows an error and stays on login", async ({ page }) => {
	const user = await createUser();
	await login(page, user.email, "salah-sekali");

	await expect(page.getByText("Email atau password salah.")).toBeVisible();
	await expect(page).toHaveURL(/\/login$/);
});

test("login is blocked after 5 attempts and the user is told to wait", async ({ page }) => {
	const user = await createUser();

	for (let attempt = 0; attempt < 5; attempt++) {
		await login(page, user.email, `wrong-${attempt}`);
		await expect(page.getByText("Email atau password salah.")).toBeVisible();
	}

	// The 6th attempt uses the correct password and must still be refused.
	await login(page, user.email);
	await expect(page).toHaveURL(/\/login$/);
	await expect(page.getByText(/terlalu banyak percobaan/i)).toBeVisible();
});

test("logout ends the session", async ({ page }) => {
	const user = await createUser();
	await loginAndWaitForDashboard(page, user.email);

	await page.goto("/profile");
	await page.getByRole("button", { name: "Keluar", exact: true }).last().click();
	await page.getByRole("dialog").getByRole("button", { name: "Keluar" }).click();
	await expect(page).not.toHaveURL(/\/profile$/);

	await page.goto("/dashboard");
	await expect(page).toHaveURL(/\/login$/);
});

test("forgot-password answers the same for unknown and known emails", async ({ page }) => {
	const user = await createUser();
	const sent = "Jika email tersebut terdaftar";

	for (const email of [uniqueEmail("nobody"), user.email]) {
		await page.goto("/forgot-password");
		await page.getByLabel("Email").fill(email);
		await page.getByRole("button", { name: "Kirim tautan reset" }).click();
		await expect(page.getByText(sent)).toBeVisible();
	}
});

test("reset-password rejects an invalid token", async ({ page }) => {
	await page.goto("/reset-password?token=bukan-token-asli");
	await page.getByLabel("Password baru", { exact: true }).fill("PasswordBaru123");
	await page.getByLabel("Ulangi password baru").fill("PasswordBaru123");
	await page.getByRole("button", { name: "Simpan password baru" }).click();

	await expect(page.getByText(/tidak valid atau sudah kedaluwarsa/i)).toBeVisible();
});

test("password reset replaces the old password", async ({ page }) => {
	const user = await createUser();
	const rawToken = randomBytes(32).toString("base64url");
	const hashed = createHash("sha256").update(rawToken).digest("hex");
	await query(
		`INSERT INTO "VerificationToken" (id, identifier, token, expires, "createdAt", "updatedAt")
		 VALUES ($1, $2, $3, now() + interval '30 minutes', now(), now())`,
		[`vt${rawToken.slice(0, 20)}`, `password-reset:${user.id}`, hashed]
	);

	await page.goto(`/reset-password?token=${encodeURIComponent(rawToken)}`);
	await page.getByLabel("Password baru", { exact: true }).fill("PasswordBaru123");
	await page.getByLabel("Ulangi password baru").fill("PasswordBaru123");
	await page.getByRole("button", { name: "Simpan password baru" }).click();
	await expect(page).toHaveURL(/\/login$/);

	await login(page, user.email);
	await expect(page.getByText("Email atau password salah.")).toBeVisible();

	await login(page, user.email, "PasswordBaru123");
	await expect(page).toHaveURL(/\/dashboard$/);
});
