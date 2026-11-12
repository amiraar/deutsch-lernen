import { defineConfig, devices } from "@playwright/test";

import { assertLocalDatabase, E2E_BASE_URL, E2E_ENV, E2E_PORT } from "./e2e/env";

// Checked here as well as in global setup: the web server starts first.
assertLocalDatabase(E2E_ENV.DATABASE_URL);

export default defineConfig({
	testDir: "./e2e",
	globalSetup: "./e2e/global-setup.ts",
	// One worker keeps shared state (rate-limit keys, seeded data) predictable.
	workers: 1,
	fullyParallel: false,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	timeout: 60_000,
	expect: { timeout: 10_000 },
	reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
	use: {
		baseURL: E2E_BASE_URL,
		trace: "retain-on-failure",
		screenshot: "only-on-failure",
		locale: "id-ID",
	},
	projects: [
		{
			name: "desktop",
			use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
		},
		{
			name: "mobile",
			use: { ...devices["Pixel 7"] },
			// Mobile runs the layout-sensitive specs only; flows are covered on desktop.
			testMatch: /(responsive|a11y|public)\.spec\.ts/,
		},
	],
	webServer: {
		// Production build, like Vercel: the nonce CSP and NODE_ENV=production
		// code paths only exist there.
		command: `npm run build && npx next start -p ${E2E_PORT}`,
		url: E2E_BASE_URL,
		env: E2E_ENV,
		timeout: 300_000,
		reuseExistingServer: !process.env.CI,
	},
});
