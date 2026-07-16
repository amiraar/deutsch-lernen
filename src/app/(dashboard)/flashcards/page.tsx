"use client";

import * as React from "react";
import { CalendarCheck } from "lucide-react";

import type { Level } from "@/types";
import { Card, EmptyState, PageSkeleton, Toast, Button, Input } from "@/components/ui";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { FlashcardDeck } from "@/components/flashcard/FlashcardDeck";
import { useDebounce } from "@/hooks/useDebounce";
import { useToastMessage } from "@/hooks/useToastMessage";
import { trpc } from "@/lib/trpcClient";

const LEVEL_OPTIONS: { label: string; value: "ALL" | Level }[] = [
	{ label: "All", value: "ALL" },
	{ label: "A1", value: "A1" },
	{ label: "A2", value: "A2" },
	{ label: "B1", value: "B1" },
	{ label: "B2", value: "B2" },
];

export default function FlashcardsPage() {
	const dueQuery = trpc.flashcard.getDueCards.useQuery();
	const { toast, showToast } = useToastMessage();
	const [query, setQuery] = React.useState("");
	const [level, setLevel] = React.useState<"ALL" | Level>("ALL");
	const debouncedQuery = useDebounce(query, 300);
	const vocabQuery = trpc.flashcard.searchVocab.useQuery({
		query: debouncedQuery,
		level: level === "ALL" ? undefined : level,
	});
	const addWordMutation = trpc.flashcard.addWordToReview.useMutation({
		onSuccess: () => {
			showToast("Kata ditambahkan ke review.");
		},
		onError: (error) => {
			showToast(error.message || "Gagal menambahkan kata.", "error");
		},
	});

	React.useEffect(() => {
		if (dueQuery.error) {
			showToast("Gagal memuat flashcard. Coba lagi.", "error");
		}
	}, [dueQuery.error, showToast]);

	const handleAddWord = (vocabWordId: string) => {
		addWordMutation.mutate({ vocabWordId });
	};

	if (dueQuery.isLoading) {
		return <PageSkeleton />;
	}

	if (dueQuery.error) {
		return (
			<div className="space-y-3">
				<Card className="text-sm text-destructive">
					Gagal memuat flashcard. Coba refresh halaman.
				</Card>
				{toast ? (
					<Toast message={toast.message} variant={toast.variant} />
				) : null}
			</div>
		);
	}

	const showEmptyState = dueQuery.data && dueQuery.data.length === 0;
	const vocabResults = vocabQuery.data ?? [];

	return (
		<div className="space-y-6">
			<div>
				<h1 className="font-display text-3xl font-semibold text-foreground">Flashcard Review</h1>
				<p className="mt-1 text-sm text-muted-foreground">Review kartu-kartumu sebelum terlupakan.</p>
			</div>
			{showEmptyState ? (
				<EmptyState
					icon={<CalendarCheck size={24} className="text-emerald-500" />}
					title="Semua kartu sudah direview!"
					description="Tidak ada kartu yang perlu direview hari ini. Kembali besok."
					action={{ label: "Kembali ke Dashboard", href: "/dashboard" }}
				/>
			) : (
				<ErrorBoundary>
					<FlashcardDeck />
				</ErrorBoundary>
			)}

			<section className="space-y-4">
				<div>
					<h2 className="font-display text-xl font-semibold text-foreground">Jelajahi Kosakata</h2>
					<p className="text-sm text-muted-foreground">
						Cari kosakata baru dan tambahkan ke antrian review-mu.
					</p>
				</div>
				<div className="grid gap-3 sm:grid-cols-2">
					<Input
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Cari kata..."
					/>
					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium text-foreground" htmlFor="level-filter">
							Level
						</label>
						<select
							id="level-filter"
							value={level}
							onChange={(event) =>
								setLevel(event.target.value as "ALL" | Level)
							}
							className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
						>
							{LEVEL_OPTIONS.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{vocabResults.map((word) => (
						<Card key={word.id} className="p-3">
							<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
								<div>
									<p className="font-semibold text-foreground">{word.german}</p>
									<p className="text-sm text-muted-foreground">{word.indonesian}</p>
								</div>
								<Button
									size="sm"
									variant="secondary"
									onClick={() => handleAddWord(word.id)}
									disabled={addWordMutation.isPending}
								>
									+ Tambah ke Review
								</Button>
							</div>
						</Card>
					))}
				</div>
			</section>
			{toast ? (
				<Toast message={toast.message} variant={toast.variant} />
			) : null}
		</div>
	);
}

