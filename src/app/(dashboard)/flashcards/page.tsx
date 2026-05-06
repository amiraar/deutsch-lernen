"use client";

import { Card } from "@/components/ui";
import { FlashcardDeck } from "@/components/flashcard/FlashcardDeck";
import { trpc } from "@/lib/trpcClient";

export default function FlashcardsPage() {
	const dueQuery = trpc.flashcard.getDueCards.useQuery();

	if (dueQuery.data && dueQuery.data.length === 0) {
		return (
			<Card className="text-center">
				<p className="text-lg font-semibold text-foreground">
					Tidak ada kartu untuk direview hari ini.
				</p>
				<p className="text-sm text-muted-foreground">Kembali besok!</p>
			</Card>
		);
	}

	return <FlashcardDeck />;
}
