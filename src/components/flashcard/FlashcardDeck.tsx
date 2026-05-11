"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import type { AppRouter } from "@/server/root";
import type { inferRouterOutputs } from "@trpc/server";
import { trpc } from "@/lib/trpcClient";
import { ProgressBar, Card, Button, LoadingSpinner } from "@/components/ui";
import { FlashcardItem } from "@/components/flashcard/FlashcardItem";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type DueCard = RouterOutputs["flashcard"]["getDueCards"][number];

/**
 * Manages a queue of flashcards due for review.
 */
export function FlashcardDeck() {
	const { data, isLoading, error } = trpc.flashcard.getDueCards.useQuery();
	const reviewMutation = trpc.flashcard.reviewCard.useMutation();
	const router = useRouter();

	const [queue, setQueue] = React.useState<DueCard[]>([]);
	const [completedCount, setCompletedCount] = React.useState(0);
	const ratingCountsRef = React.useRef<Record<number, number>>({
		0: 0,
		1: 0,
		3: 0,
		5: 0,
	});

	React.useEffect(() => {
		if (data) {
			setQueue(data);
			setCompletedCount(0);
			ratingCountsRef.current = { 0: 0, 1: 0, 3: 0, 5: 0 };
		}
	}, [data]);

	const handleRate = async (quality: 0 | 1 | 3 | 5) => {
		const current = queue[0];
		if (!current) {
			return;
		}

		try {
			await reviewMutation.mutateAsync({
				cardId: current.id,
				quality,
			});

			ratingCountsRef.current[quality] = (ratingCountsRef.current[quality] ?? 0) + 1;
			setQueue((prev) => prev.slice(1));
			setCompletedCount((prev) => prev + 1);
		} catch (err) {
			console.error(err);
		}
	};

	if (isLoading) {
		return (
			<Card className="flex items-center justify-center py-10">
				<LoadingSpinner label="Memuat kartu" />
			</Card>
		);
	}

	if (error) {
		return (
			<Card className="py-6 text-center text-sm text-destructive">
				{error.message}
			</Card>
		);
	}

	if (!queue.length && completedCount > 0) {
		const ratingCounts = ratingCountsRef.current;
		return (
			<Card className="space-y-4 text-center">
				<p className="text-lg font-semibold text-foreground">Sesi selesai!</p>
				<p className="text-sm text-muted-foreground">
					Kamu telah mereview {completedCount} kartu.
				</p>
				<div className="space-y-1 text-sm text-muted-foreground">
					<p>Lagi: {ratingCounts[0] ?? 0} kartu</p>
					<p>Sulit: {ratingCounts[1] ?? 0} kartu</p>
					<p>Oke: {ratingCounts[3] ?? 0} kartu</p>
					<p>Mudah: {ratingCounts[5] ?? 0} kartu</p>
				</div>
				<Button onClick={() => router.push("/dashboard")}>Selesai</Button>
			</Card>
		);
	}

	if (!queue.length) {
		return (
			<Card className="space-y-3 text-center">
				<p className="text-lg font-semibold text-foreground">Selesai!</p>
				<p className="text-sm text-muted-foreground">
					Kamu telah mereview {completedCount} kartu.
				</p>
			</Card>
		);
	}

	const total = queue.length + completedCount;
	const progress = total > 0 ? (completedCount / total) * 100 : 0;

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between text-sm text-muted-foreground">
				<span>{queue.length} kartu tersisa</span>
				<span>{completedCount} selesai</span>
			</div>
			<ProgressBar value={progress} />
			<FlashcardItem word={queue[0].vocabWord} onRate={handleRate} />
		</div>
	);
}
