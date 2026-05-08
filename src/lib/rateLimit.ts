import { RateLimiterMemory, RateLimiterRedis } from "rate-limiter-flexible";
import { TRPCError } from "@trpc/server";
import type Redis from "ioredis";
import type { RedisOptions } from "ioredis";

type RedisConstructor = new (
	url: string,
	options?: RedisOptions
) => Redis;

type LimiterOptions = {
	points: number;
	duration: number;
	keyPrefix: string;
};

function createLimiter(opts: LimiterOptions) {
	const redisUrl = process.env.REDIS_URL;
	if (!redisUrl) {
		if (process.env.NODE_ENV === "production") {
			throw new Error(`[RateLimit] REDIS_URL is required in production for "${opts.keyPrefix}". ` + "In-memory rate limiting is ineffective on serverless platforms.");
		}
		console.warn(`[RateLimit] Redis unavailable, using in-memory limiter for "${opts.keyPrefix}". ` + "This is only acceptable in development.");
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

// Lazily initialized — defers createLimiter (and any production throw) to
// first request rather than module load / build time.
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
