"use client";

import { trpc } from "@/lib/trpcClient";

/**
 * Convenience wrapper around flashcard tRPC procedures.
 * Provides due cards, review mutation, and add-word mutation in one place.
 */
export function useFlashcard() {
	const dueCards = trpc.flashcard.getDueCards.useQuery();
	const reviewMutation = trpc.flashcard.reviewCard.useMutation({
		onSuccess: () => dueCards.refetch(),
	});
	const addWordMutation = trpc.flashcard.addWordToReview.useMutation();

	return {
		/** Cards currently due for review */
		dueCards: dueCards.data ?? [],
		isLoading: dueCards.isLoading,
		error: dueCards.error,
		/** Submit a quality rating (0–5) for the current card */
		reviewCard: reviewMutation.mutateAsync,
		isReviewing: reviewMutation.isPending,
		/** Add a vocab word to the user's review queue */
		addWord: addWordMutation.mutateAsync,
		isAdding: addWordMutation.isPending,
	};
}
