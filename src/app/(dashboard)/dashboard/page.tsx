"use client";

import Link from "next/link";

import { Card, ProgressBar } from "@/components/ui";
import { trpc } from "@/lib/trpcClient";

export default function DashboardPage() {
	const statsQuery = trpc.progress.getUserStats.useQuery();
	const activityQuery = trpc.progress.getRecentActivity.useQuery();
	const lessonsQuery = trpc.lesson.getLessons.useQuery();
	const dueCardsQuery = trpc.flashcard.getDueCards.useQuery();

	const streakDays = statsQuery.data?.streakDays ?? 0;
	const completedToday = 1;
	const dailyGoal = 3;
	const nextLesson = lessonsQuery.data?.find((lesson) => !lesson.isCompleted);

	return (
		<div className="space-y-8">
			<section className="space-y-2">
				<h2 className="text-2xl font-semibold text-foreground">
					Selamat datang kembali!
				</h2>
				<p className="text-sm text-muted-foreground">
					Hari ke-{streakDays} berturut-turut 🔥
				</p>
			</section>

			<section className="grid gap-4 md:grid-cols-2">
				<Card>
					<h3 className="text-sm font-semibold text-foreground">
						Target harian
					</h3>
					<ProgressBar
						value={(completedToday / dailyGoal) * 100}
						label={`${completedToday}/${dailyGoal} pelajaran`}
						showPercent
					/>
				</Card>
				<Card>
					<h3 className="text-sm font-semibold text-foreground">SRS Due</h3>
					<p className="text-2xl font-semibold text-foreground">
						{dueCardsQuery.data?.length ?? 0}
					</p>
					<p className="text-xs text-muted-foreground">
						kata siap direview
					</p>
				</Card>
			</section>

			<section className="grid gap-4 md:grid-cols-2">
				<Card className="space-y-3">
					<h3 className="text-sm font-semibold text-foreground">Lanjutkan</h3>
					{nextLesson ? (
						<Link
							href={`/lesson/${nextLesson.id}`}
							className="text-base font-medium text-primary"
						>
							{nextLesson.title}
						</Link>
					) : (
						<p className="text-sm text-muted-foreground">
							Semua pelajaran selesai.
						</p>
					)}
				</Card>

				<Card className="space-y-3">
					<h3 className="text-sm font-semibold text-foreground">
						Aktivitas terbaru
					</h3>
					<ul className="space-y-2 text-sm text-muted-foreground">
						{activityQuery.data?.lessons?.slice(0, 5).map((item) => (
							<li key={item.id}>
								Skor {item.score} · XP {item.xpEarned}
							</li>
						))}
						{!activityQuery.data?.lessons?.length ? (
							<li>Belum ada aktivitas minggu ini.</li>
						) : null}
					</ul>
				</Card>
			</section>
		</div>
	);
}
