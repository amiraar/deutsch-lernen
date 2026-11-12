/**
 * Environment for the E2E server and setup scripts.
 *
 * Next.js and Prisma both load `.env`, which may point at real services. A
 * variable that is already present in the process environment — even as an
 * empty string — is never overwritten from `.env`, so every external service
 * is listed here: local containers for the database and Redis, blanks for the
 * rest (no AI calls, no email, no Upstash).
 */
export const E2E_PORT = 3100;
export const E2E_BASE_URL = `http://localhost:${E2E_PORT}`;

const DATABASE_URL =
	process.env.E2E_DATABASE_URL ??
	"postgresql://test:test@localhost:54329/deutsch_lernen_test";
const REDIS_URL = process.env.E2E_REDIS_URL ?? "redis://localhost:63799";

export const E2E_ENV: Record<string, string> = {
	DATABASE_URL,
	DIRECT_URL: DATABASE_URL,
	REDIS_URL,
	UPSTASH_REDIS_REST_URL: "",
	UPSTASH_REDIS_REST_TOKEN: "",
	AUTH_SECRET: "e2e-only-secret-not-used-anywhere-else-0123456789",
	NEXTAUTH_SECRET: "",
	AUTH_URL: E2E_BASE_URL,
	NEXTAUTH_URL: E2E_BASE_URL,
	AUTH_TRUST_HOST: "true",
	GEMINI_API_KEY: "",
	GROQ_API_KEY: "",
	ANTHROPIC_API_KEY: "",
	RESEND_API_KEY: "",
	EMAIL_FROM: "",
	SEED_DEMO_USERS: "",
};

/**
 * Refuses to run against anything but a local database: the suite registers
 * and deletes accounts, which must never happen on a shared database.
 */
export function assertLocalDatabase(url: string = DATABASE_URL): void {
	const host = new URL(url).hostname;

	if (host !== "localhost" && host !== "127.0.0.1") {
		throw new Error(
			`E2E refused to run: DATABASE_URL host is "${host}", expected localhost.`
		);
	}
}
