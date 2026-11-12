import { randomUUID } from "node:crypto";

import { test as base, expect, type Page } from "@playwright/test";
import bcrypt from "bcryptjs";
import Redis from "ioredis";
import { Pool } from "pg";

import { E2E_ENV } from "./env";

export const PASSWORD = "Rahasia123!";

const pool = new Pool({ connectionString: E2E_ENV.DATABASE_URL });
const redis = new Redis(E2E_ENV.REDIS_URL, { lazyConnect: true });

export function uniqueEmail(prefix = "e2e"): string {
	return `${prefix}-${randomUUID().slice(0, 8)}@example.test`;
}

export async function query<T = Record<string, unknown>>(
	sql: string,
	params: unknown[] = []
): Promise<T[]> {
	const result = await pool.query(sql, params);
	return result.rows as T[];
}

/**
 * Inserts a user directly, so tests that are not about registration do not
 * spend the per-IP auth rate limit. `onboarded` sets lastStudiedAt, which is
 * what the app treats as "has started learning".
 */
export async function createUser(
	options: { email?: string; name?: string; onboarded?: boolean } = {}
): Promise<{ id: string; email: string; name: string }> {
	const email = options.email ?? uniqueEmail();
	const name = options.name ?? "Tester";
	const id = `e2e${randomUUID().replace(/-/g, "").slice(0, 21)}`;
	const passwordHash = await bcrypt.hash(PASSWORD, 4);

	await query(
		`INSERT INTO "User" (id, email, "passwordHash", name, level, xp, "streakDays", "lastStudiedAt", "createdAt", "updatedAt")
		 VALUES ($1, $2, $3, $4, 'A1', 0, 0, $5, now(), now())`,
		[id, email, passwordHash, name, options.onboarded === false ? null : new Date()]
	);

	return { id, email, name };
}

export async function login(page: Page, email: string, password = PASSWORD): Promise<void> {
	await page.goto("/login");
	await page.getByLabel("Email").fill(email);
	await page.getByLabel("Password", { exact: true }).fill(password);
	await page.getByRole("button", { name: "Masuk", exact: true }).click();
}

export async function loginAndWaitForDashboard(page: Page, email: string): Promise<void> {
	await login(page, email);
	await expect(page).toHaveURL(/\/dashboard$/);
}

/** Clears auth rate-limit counters so earlier tests cannot block this one. */
async function resetAuthRateLimits(): Promise<void> {
	if (redis.status === "wait") {
		await redis.connect();
	}

	const keys = await redis.keys("dl:auth*");

	if (keys.length > 0) {
		await redis.del(...keys);
	}
}

export const test = base.extend<{ cleanRateLimits: void }>({
	cleanRateLimits: [
		async ({}, use) => {
			await resetAuthRateLimits();
			await use();
		},
		{ auto: true },
	],
});

export { expect };
