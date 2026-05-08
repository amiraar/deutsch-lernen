import { RateLimiterMemory, RateLimiterRedis } from "rate-limiter-flexible";
import { TRPCError } from "@trpc/server";
import type Redis from "ioredis";
import type { RedisOptions } from "ioredis";

import { resolveRedisUrl } from "@/lib/redis";

type RedisConstructor = new (
	url: string,
	options?: RedisOptions
) => Redis;

type LimiterOptions = {
	points: number;
	duration: number;
	keyPrefix: string;
};

function isRedisConfigured(): boolean {
	return !!(
		process.env.REDIS_URL ||
		(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
	);
}

function warnNoRedis(context: string): void {
	console.warn(
		`[RateLimit] REDIS_URL not set — skipping rate limit check for "${context}". ` +
		"This is unsafe in production. Configure REDIS_URL to enable effective rate limiting."
	);
}

function createLimiter(opts: LimiterOptions) {
	const redisUrl = resolveRedisUrl();
	if (!redisUrl) {
		return new RateLimiterMemory(opts);
	}

	try {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const RedisModule = require("ioredis") as
		| { default?: RedisConstructor }
		| RedisConstructor;
		const RedisClient =
		"default" in RedisModule && RedisModule.default
			? RedisModule.default
			: (RedisModule as RedisConstructor);
		const client = new RedisClient(redisUrl, {
			maxRetriesPerRequest: 3,
			lazyConnect: true,
		});
		return new RateLimiterRedis({ storeClient: client, ...opts });
	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error";
		throw new Error(`[RateLimit] Failed to create Redis rate limiter: ${message}`);
	}
}

// Lazily initialized — defers createLimiter to first request rather than module load.
let _authLimiter: ReturnType<typeof createLimiter> | undefined;
let _apiLimiter: ReturnType<typeof createLimiter> | undefined;
let _aiLimiter: ReturnType<typeof createLimiter> | undefined;

function getAuthLimiter() {
	return (_authLimiter ??= createLimiter({ points: 5, duration: 15 * 60, keyPrefix: "dl:auth" }));
}
function getApiLimiter() {
	return (_apiLimiter ??= createLimiter({ points: 60, duration: 60, keyPrefix: "dl:api" }));
}
function getAiLimiter() {
	return (_aiLimiter ??= createLimiter({ points: 10, duration: 60 * 60, keyPrefix: "dl:ai" }));
}

type RateLimitResult = { msBeforeNext: number };

function isRateLimitResult(value: unknown): value is RateLimitResult {
	return (
		typeof value === "object" &&
		value !== null &&
		"msBeforeNext" in value
	);
}

function toMinutes(ms: number): number {
	return Math.max(1, Math.ceil(ms / 60000));
}

/**
 * Enforces login/register rate limiting by IP.
 */
export async function checkAuthLimit(ip: string): Promise<void> {
	if (!ip) {
		throw new Error("IP address is required for auth rate limiting");
	}

	if (!isRedisConfigured()) {
		warnNoRedis("auth");
		return;
	}

	try {
		await getAuthLimiter().consume(ip);
	} catch (error) {
		if (isRateLimitResult(error)) {
			const minutes = toMinutes(error.msBeforeNext);
			throw new Error(`Too many attempts. Try again in ${minutes} minutes.`);
		}

		const message = error instanceof Error ? error.message : "Unknown error";
		throw new Error(`Auth rate limit failed: ${message}`);
	}
}

/**
 * Enforces API rate limiting by userId.
 */
export async function checkApiLimit(userId: string): Promise<void> {
	if (!userId) {
		throw new Error("userId is required for API rate limiting");
	}

	if (!isRedisConfigured()) {
		warnNoRedis("api");
		return;
	}

	try {
		await getApiLimiter().consume(userId);
	} catch (error) {
		if (isRateLimitResult(error)) {
			throw new TRPCError({
				code: "TOO_MANY_REQUESTS",
				message: "Terlalu banyak permintaan. Coba lagi sebentar.",
			});
		}

		const message = error instanceof Error ? error.message : "Unknown error";
		throw new Error(`API rate limit failed: ${message}`);
	}
}

/**
 * Enforces AI rate limiting by userId.
 */
export async function checkAiLimit(userId: string): Promise<void> {
	if (!userId) {
		throw new Error("userId is required for AI rate limiting");
	}

	if (!isRedisConfigured()) {
		warnNoRedis("ai");
		return;
	}

	try {
		await getAiLimiter().consume(userId);
	} catch (error) {
		if (isRateLimitResult(error)) {
			const minutes = toMinutes(error.msBeforeNext);
			throw new TRPCError({
				code: "TOO_MANY_REQUESTS",
				message: `AI limit reached. Resets in ${minutes} minutes.`,
			});
		}

		const message = error instanceof Error ? error.message : "Unknown error";
		throw new Error(`AI rate limit failed: ${message}`);
	}
}
