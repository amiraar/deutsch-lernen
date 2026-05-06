"use client";

import { trpc } from "@/lib/trpcClient";

/**
 * Convenience wrapper around progress tRPC procedures.
 * Provides user stats and recent activity.
 */
export function useProgress() {
	const statsQuery = trpc.progress.getUserStats.useQuery();
	const activityQuery = trpc.progress.getRecentActivity.useQuery();

	return {
		/** XP, level, streakDays, lessonsCompleted, wordsLearned */
		stats: statsQuery.data ?? null,
		isLoadingStats: statsQuery.isLoading,
		statsError: statsQuery.error,
		/** Last 7 days of lesson completions and reviews */
		activity: activityQuery.data ?? null,
		isLoadingActivity: activityQuery.isLoading,
		activityError: activityQuery.error,
		refresh: () => {
			void statsQuery.refetch();
			void activityQuery.refetch();
		},
	};
}
