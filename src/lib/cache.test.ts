import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const del = vi.fn(async () => undefined);

vi.mock("@/lib/redis", async (importOriginal) => ({
	...(await importOriginal<typeof import("@/lib/redis")>()),
	get: vi.fn(async () => null),
	set: vi.fn(async () => undefined),
	del,
}));
vi.mock("@/lib/prisma", () => ({ default: {} }));

const REDIS_VARS = ["REDIS_URL", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"];

describe("cache invalidation", () => {
	let saved: Record<string, string | undefined>;

	beforeEach(() => {
		saved = Object.fromEntries(REDIS_VARS.map((name) => [name, process.env[name]]));
		for (const name of REDIS_VARS) delete process.env[name];
		del.mockClear();
	});

	afterEach(() => {
		for (const [name, value] of Object.entries(saved)) {
			if (value === undefined) delete process.env[name];
			else process.env[name] = value;
		}
	});

	// The lesson list is cached through redis.set, which honours Upstash-only
	// configuration (the recommended Vercel setup). Invalidation must reach the
	// same store, or completed lessons keep showing as not completed.
	it("clears lesson lists when only Upstash is configured", async () => {
		process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
		process.env.UPSTASH_REDIS_REST_TOKEN = "token";
		const { invalidateLessonCache, invalidateUserStats } = await import("@/lib/cache");

		await invalidateLessonCache("user-1");
		await invalidateUserStats("user-1");

		expect(del).toHaveBeenCalledWith("lessons:user-1:all");
		expect(del).toHaveBeenCalledWith("user-stats:user-1");
	});

	it("clears lesson lists when REDIS_URL is configured", async () => {
		process.env.REDIS_URL = "redis://localhost:6379";
		const { invalidateLessonCache } = await import("@/lib/cache");

		await invalidateLessonCache("user-1");

		expect(del).toHaveBeenCalledWith("lessons:user-1:all");
	});

	it("does nothing without any Redis configuration", async () => {
		const { invalidateLessonCache } = await import("@/lib/cache");

		await invalidateLessonCache("user-1");

		expect(del).not.toHaveBeenCalled();
	});
});
