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

type SessionData = {
ratedIds: string[];
ratingCounts: Record<number, number>;
};

const SESSION_KEY = "fc-session";

function loadSession(): SessionData | null {
try {
const raw = localStorage.getItem(SESSION_KEY);
return raw ? (JSON.parse(raw) as SessionData) : null;
} catch {
return null;
}
}

function saveSession(ratedIds: string[], ratingCounts: Record<number, number>) {
try {
localStorage.setItem(SESSION_KEY, JSON.stringify({ ratedIds, ratingCounts }));
} catch {
// ignore storage errors
}
}

function clearSession() {
try {
localStorage.removeItem(SESSION_KEY);
} catch {
// ignore storage errors
}
}

/**
 * Manages a queue of flashcards due for review, with session persistence.
 */
export function FlashcardDeck() {
const { data, isLoading, error, refetch } = trpc.flashcard.getDueCards.useQuery();
const reviewMutation = trpc.flashcard.reviewCard.useMutation();
const router = useRouter();

const [queue, setQueue] = React.useState<DueCard[]>([]);
const [completedCount, setCompletedCount] = React.useState(0);
const ratedIdsRef = React.useRef<Set<string>>(new Set());
// State, not a ref: the session summary renders these counts. Restored
// from a saved session on first render (loadSession returns null on the server).
const [ratingCounts, setRatingCounts] = React.useState<Record<number, number>>(
() => loadSession()?.ratingCounts ?? { 0: 0, 1: 0, 3: 0, 5: 0 }
);

React.useEffect(() => {
if (!data) return;

const session = loadSession();
if (session && session.ratedIds.length > 0) {
ratedIdsRef.current = new Set(session.ratedIds);
const remaining = data.filter((card) => !ratedIdsRef.current.has(card.id));
setQueue(remaining);
setCompletedCount(session.ratedIds.length);
} else {
ratedIdsRef.current = new Set();
setQueue(data);
setCompletedCount(0);
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

const nextCounts = { ...ratingCounts, [quality]: (ratingCounts[quality] ?? 0) + 1 };
setRatingCounts(nextCounts);
ratedIdsRef.current.add(current.id);

const newQueue = queue.slice(1);
setQueue(newQueue);
setCompletedCount((prev) => prev + 1);

if (newQueue.length > 0) {
saveSession([...ratedIdsRef.current], nextCounts);
} else {
clearSession();
}
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
<div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm">
<span className="flex-1 text-destructive">
{error.message || "Gagal memuat flashcard."}
</span>
<Button size="sm" variant="danger" onClick={() => void refetch()}>
Coba Lagi
</Button>
</div>
);
}

if (!queue.length && completedCount > 0) {
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
<ProgressBar value={progress} ariaLabel="Progres sesi review" />
{/* Keyed per card: each card must start face-down, not inherit the flip. */}
<FlashcardItem
key={queue[0]!.id}
word={queue[0]!.vocabWord}
onRate={handleRate}
/>
</div>
);
}
