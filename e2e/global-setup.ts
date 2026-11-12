import { execSync } from "node:child_process";

import { assertLocalDatabase, E2E_ENV } from "./env";

/**
 * Migrates and seeds the test database before any test runs.
 */
export default function globalSetup(): void {
	assertLocalDatabase(E2E_ENV.DATABASE_URL);

	const env = { ...process.env, ...E2E_ENV };
	execSync("npx prisma migrate deploy", { stdio: "inherit", env });
	execSync("npx tsx prisma/seed.ts", { stdio: "inherit", env });
}
