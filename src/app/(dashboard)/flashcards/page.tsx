"use client";

import Link from "next/link";
import { CalendarCheck } from "lucide-react";

import { Button, Card } from "@/components/ui";
import { FlashcardDeck } from "@/components/flashcard/FlashcardDeck";
import { trpc } from "@/lib/trpcClient";

export default function FlashcardsPage() {
	const dueQuery = trpc.flashcard.getDueCards.useQuery();

	if (dueQuery.isLoading) {
		return <FlashcardDeck />;
	}

	if (dueQuery.data && dueQuery.data.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
				<div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
					<CalendarCheck size={36} className="text-emerald-500" />
				</div>
				<div>
					<h2 className="text-xl font-bold text-foreground">Semua kartu sudah direview!</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						Tidak ada kartu yang perlu direview hari ini. Kembali besok.
					</p>
				</div>
				<Link href="/dashboard">
					<Button variant="secondary">Kembali ke Dashboard</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-xl font-bold text-foreground">Flashcard Review</h1>
				<p className="text-sm text-muted-foreground">Review kartu-kartumu sebelum terlupakan.</p>
			</div>
			<FlashcardDeck />
		</div>
	);
}

