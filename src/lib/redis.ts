import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
	throw new Error("REDIS_URL is not set");
}

const globalForRedis = globalThis as unknown as {
	redis?: Redis;
};

const redis = globalForRedis.redis ?? new Redis(redisUrl);

if (process.env.NODE_ENV !== "production") {
	globalForRedis.redis = redis;
}

function toKey(key: string): string {
	return key.startsWith("dl:") ? key : `dl:${key}`;
}

/**
 * Reads a JSON value from Redis by key.
 */
export async function get<T>(key: string): Promise<T | null> {
	const finalKey = toKey(key);

	try {
		const rawValue = await redis.get(finalKey);

		if (rawValue === null) {
			return null;
		}

		return JSON.parse(rawValue) as T;
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		throw new Error(`Failed to read Redis key ${finalKey}: ${message}`);
	}
}

/**
 * Writes a JSON value to Redis with a TTL in seconds.
 */
export async function set(
	key: string,
	value: unknown,
	ttlSeconds: number
): Promise<void> {
	const finalKey = toKey(key);

	try {
		const payload = JSON.stringify(value);
		await redis.set(finalKey, payload, "EX", ttlSeconds);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		throw new Error(`Failed to write Redis key ${finalKey}: ${message}`);
	}
}

/**
 * Deletes a key from Redis.
 */
export async function del(key: string): Promise<void> {
	const finalKey = toKey(key);

	try {
		await redis.del(finalKey);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		throw new Error(`Failed to delete Redis key ${finalKey}: ${message}`);
	}
}

/**
 * Checks whether a key exists in Redis.
 */
export async function exists(key: string): Promise<boolean> {
	const finalKey = toKey(key);

	try {
		const result = await redis.exists(finalKey);
		return result > 0;
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		throw new Error(`Failed to check Redis key ${finalKey}: ${message}`);
	}
}

export default redis;
