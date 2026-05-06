import type { Level, UserStats } from "@/types";
import prisma from "@/lib/prisma";
import { del, get, set } from "@/lib/redis";

export const LESSON_TTL = 60 * 60;
export const VOCAB_TTL = 60 * 60 * 24;
export const USER_STATS_TTL = 60 * 5;
export const SRS_QUEUE_TTL = 60;

function lessonKey(id: string): string {
	return `lesson:${id}`;
}

function vocabKey(level: string): string {
	return `vocab:${level}`;
}

function userStatsKey(userId: string): string {
	return `user-stats:${userId}`;
}

/**
 * Reads a lesson with exercises from cache, then falls back to Prisma.
 */
export async function getCachedLesson(id: string) {
	if (!id) {
		throw new Error("Lesson id is required");
	}

	const cached = await get<
		Awaited<ReturnType<typeof prisma.lesson.findUnique>>
	>(lessonKey(id));

	if (cached) {
		return cached;
	}

	const lesson = await prisma.lesson.findUnique({
		where: { id },
		include: { exercises: true },
	});

	if (lesson) {
		await set(lessonKey(id), lesson, LESSON_TTL);
	}

	return lesson;
}

/**
 * Reads vocab list from cache, then falls back to Prisma.
 */
export async function getCachedVocabList(level: Level) {
	const cached = await get<
		Awaited<ReturnType<typeof prisma.vocabWord.findMany>>
	>(vocabKey(level));

	if (cached) {
		return cached;
	}

	const vocab = await prisma.vocabWord.findMany({
		where: { level },
		orderBy: { german: "asc" },
	});

	await set(vocabKey(level), vocab, VOCAB_TTL);
	return vocab;
}

/**
 * Reads user stats from cache, then falls back to Prisma.
 */
export async function getCachedUserStats(userId: string): Promise<UserStats> {
	if (!userId) {
		throw new Error("userId is required");
	}

	const cached = await get<UserStats>(userStatsKey(userId));
	if (cached) {
		return cached;
	}

	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { xp: true, level: true, streakDays: true },
	});

	if (!user) {
		throw new Error("User not found");
	}

	const [lessonsCompleted, wordsLearned] = await Promise.all([
		prisma.lessonCompletion.count({ where: { userId } }),
		prisma.flashcardReview.count({ where: { userId } }),
	]);

	const stats: UserStats = {
		xp: user.xp,
		level: user.level,
		streakDays: user.streakDays,
		lessonsCompleted,
		wordsLearned,
	};

	await set(userStatsKey(userId), stats, USER_STATS_TTL);
	return stats;
}

/**
 * Clears cached user stats after updates.
 */
export async function invalidateUserStats(userId: string): Promise<void> {
	if (!userId) {
		throw new Error("userId is required");
	}

	await del(userStatsKey(userId));
}
