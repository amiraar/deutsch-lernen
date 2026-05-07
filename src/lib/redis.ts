import Redis from "ioredis";

const globalForRedis = globalThis as unknown as {
	redis?: Redis;
};

export function getRedisClient(): Redis {
	const redisUrl = process.env.REDIS_URL;
	if (!redisUrl) {
		throw new Error(
			"REDIS_URL is not set. Add it to your environment variables."
		);
	}

	if (!globalForRedis.redis) {
		globalForRedis.redis = new Redis(redisUrl, {
			maxRetriesPerRequest: 3,
			lazyConnect: true,
		});
	}

	return globalForRedis.redis;
}

function getRedisClientOrNull(): Redis | null {
	try {
		return getRedisClient();
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		console.warn(`Redis disabled: ${message}`);
		return null;
	}
}

function toKey(key: string): string {
	return key.startsWith("dl:") ? key : `dl:${key}`;
}

/**
 * Reads a JSON value from Redis by key.
 */
export async function get<T>(key: string): Promise<T | null> {
	const finalKey = toKey(key);
	const client = getRedisClientOrNull();
	if (!client) {
		return null;
	}

	try {
		const rawValue = await client.get(finalKey);

		if (rawValue === null) {
			return null;
		}

		return JSON.parse(rawValue) as T;
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		console.warn(`Failed to read Redis key ${finalKey}: ${message}`);
		return null;
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
	const client = getRedisClientOrNull();
	if (!client) {
		return;
	}

	try {
		const payload = JSON.stringify(value);
		await client.set(finalKey, payload, "EX", ttlSeconds);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		console.warn(`Failed to write Redis key ${finalKey}: ${message}`);
	}
}

/**
 * Deletes a key from Redis.
 */
export async function del(key: string): Promise<void> {
	const finalKey = toKey(key);
	const client = getRedisClientOrNull();
	if (!client) {
		return;
	}

	try {
		await client.del(finalKey);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		console.warn(`Failed to delete Redis key ${finalKey}: ${message}`);
	}
}

/**
 * Checks whether a key exists in Redis.
 */
export async function exists(key: string): Promise<boolean> {
	const finalKey = toKey(key);
	const client = getRedisClientOrNull();
	if (!client) {
		return false;
	}

	try {
		const result = await client.exists(finalKey);
		return result > 0;
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		console.warn(`Failed to check Redis key ${finalKey}: ${message}`);
		return false;
	}
}