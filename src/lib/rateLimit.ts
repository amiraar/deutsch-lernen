import { RateLimiterMemory, RateLimiterRedis } from "rate-limiter-flexible";
import { TRPCError } from "@trpc/server";
import Redis from "ioredis";

import { resolveRedisUrl } from "@/lib/redis";

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
		const client = new Redis(redisUrl, {
			maxRetriesPerRequest: 1,
			lazyConnect: true,
			enableOfflineQueue: false,
		});
		// Without a listener, ioredis connection failures surface as
		// unhandled error events that spam the logs.
		client.on("error", (err: Error) => {
			console.warn(`[RateLimit] Redis connection error: ${err.message}`);
		});
		return new RateLimiterRedis({
			storeClient: client,
			// Falls back to per-instance memory limiting when Redis is
			// unreachable, so auth/API keep working during a Redis outage.
			insuranceLimiter: new RateLimiterMemory(opts),
			...opts,
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error";
		console.error(`[RateLimit] Failed to create Redis rate limiter, using memory fallback: ${message}`);
		return new RateLimiterMemory(opts);
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

		// Infrastructure failure (e.g. Redis unreachable) — fail open so a
		// rate-limiter outage never locks every user out of login.
		const message = error instanceof Error ? error.message : "Unknown error";
		console.error(`[RateLimit] auth check failed open: ${message}`);
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
		console.error(`[RateLimit] api check failed open: ${message}`);
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
		console.error(`[RateLimit] ai check failed open: ${message}`);
	}
}
