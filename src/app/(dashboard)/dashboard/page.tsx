"use client";

import * as React from "react";
import Link from "next/link";
import { Flame, Trophy, BookOpen, Layers, ArrowRight, Clock } from "lucide-react";

import { Badge, Button, Card, ProgressBar, Toast } from "@/components/ui";
import { useToastMessage } from "@/hooks/useToastMessage";
import { trpc } from "@/lib/trpcClient";
import { DAILY_LESSON_GOAL, XP_THRESHOLDS, LEVEL_LABELS } from "@/constants";
import type { Level } from "@/types";
import type { AppRouter } from "@/server/root";
import type { inferRouterOutputs } from "@trpc/server";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type RecentLesson = RouterOutputs["progress"]["getRecentActivity"]["lessons"][number];

const LEVEL_ORDER: Level[] = ["A1", "A2", "B1", "B2"];

function getXpProgressToNextLevel(xp: number, level: Level): number {
	const levelIndex = LEVEL_ORDER.indexOf(level);

	// B2 is max level
	if (levelIndex === LEVEL_ORDER.length - 1) {
		return 100;
	}

	const currentFloor = XP_THRESHOLDS[level];
	const nextLevel = LEVEL_ORDER[levelIndex + 1] as Level;
	const nextFloor = XP_THRESHOLDS[nextLevel];
	const range = nextFloor - currentFloor;

	if (range <= 0) return 100;

	return Math.min(100, Math.round(((xp - currentFloor) / range) * 100));
}

function getNextLevelXp(level: Level): number {
	const levelIndex = LEVEL_ORDER.indexOf(level);
	if (levelIndex === LEVEL_ORDER.length - 1) return XP_THRESHOLDS[level];
	const nextLevel = LEVEL_ORDER[levelIndex + 1] as Level;
	return XP_THRESHOLDS[nextLevel];
}

function getGreeting(): string {
	const hour = new Date().getHours();
	if (hour < 12) return "Selamat pagi";
	if (hour < 17) return "Selamat siang";
	return "Selamat malam";
}

function StatCardSkeleton() {
	return (
		<Card variant="elevated" className="flex items-center gap-4">
			<div className="h-11 w-11 animate-pulse rounded-xl bg-slate-200" />
			<div className="space-y-2">
				<div className="h-6 w-16 animate-pulse rounded bg-slate-200" />
				<div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
			</div>
		</Card>
	);
}

export default function DashboardPage() {
	const statsQuery = trpc.progress.getUserStats.useQuery();
	const activityQuery = trpc.progress.getRecentActivity.useQuery();
	const lessonsQuery = trpc.lesson.getLessons.useQuery();
	const dueCardsQuery = trpc.flashcard.getDueCards.useQuery();
	const { toast, showToast, clearToast } = useToastMessage();

	React.useEffect(() => {
		if (statsQuery.error) {
			showToast("Gagal memuat statistik. Coba lagi sebentar.", "error");
			return;
		}
		if (lessonsQuery.error) {
			showToast("Gagal memuat daftar pelajaran. Coba lagi sebentar.", "error");
			return;
		}
		clearToast();
	}, [clearToast, lessonsQuery.error, showToast, statsQuery.error]);

	const stats = statsQuery.data;
	const streakDays = stats?.streakDays ?? 0;
	const xp = stats?.xp ?? 0;
	const level = (stats?.level ?? "A1") as Level;
	const xpProgress = getXpProgressToNextLevel(xp, level);
	const nextLevelXp = getNextLevelXp(level);

	const completedToday = activityQuery.data?.lessons?.filter((l: RecentLesson) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return new Date(l.completedAt) >= today;
	}).length ?? 0;

	const nextLesson = lessonsQuery.data?.find((l: { isCompleted: boolean }) => !l.isCompleted);
	const dueCount = dueCardsQuery.data?.length ?? 0;

	return (
		<div className="space-y-8">
			{/* Greeting */}
			<div>
				<h1 className="text-2xl font-bold text-foreground">
					{getGreeting()}! 👋
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					{streakDays > 0
						? `Kamu sudah belajar ${streakDays} hari berturut-turut. Pertahankan!`
						: "Mulai belajar hari ini untuk membangun streak-mu!"}
				</p>
			</div>

			{/* Stats cards */}
			{statsQuery.error ? (
				<Card variant="elevated" className="border-rose-200 text-rose-600">
					Gagal memuat statistik. Coba refresh halaman.
				</Card>
			) : statsQuery.isLoading ? (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<StatCardSkeleton />
					<StatCardSkeleton />
					<StatCardSkeleton />
					<StatCardSkeleton />
				</div>
			) : (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<Card variant="elevated" className="flex items-center gap-4">
						<div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100">
							<Flame size={22} className="text-amber-500" />
						</div>
						<div>
							<p className="text-2xl font-bold text-foreground">{streakDays}</p>
							<p className="text-xs text-muted-foreground">Hari Streak</p>
						</div>
					</Card>

					<Card variant="elevated" className="flex items-center gap-4">
						<div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-violet-100">
							<Trophy size={22} className="text-violet-500" />
						</div>
						<div>
							<p className="text-2xl font-bold text-foreground">{xp}</p>
							<p className="text-xs text-muted-foreground">Total XP</p>
						</div>
					</Card>

					<Card variant="elevated" className="flex items-center gap-4">
						<div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100">
							<BookOpen size={22} className="text-emerald-500" />
						</div>
						<div>
							<p className="text-2xl font-bold text-foreground">{stats?.lessonsCompleted ?? 0}</p>
							<p className="text-xs text-muted-foreground">Pelajaran Selesai</p>
						</div>
					</Card>

					<Card variant="elevated" className="flex items-center gap-4">
						<div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sky-100">
							<Layers size={22} className="text-sky-500" />
						</div>
						<div>
							<p className="text-2xl font-bold text-foreground">{dueCount}</p>
							<p className="text-xs text-muted-foreground">Kartu Siap Review</p>
						</div>
					</Card>
				</div>
			)}

			{/* Main content grid */}
			<div className="grid gap-6 lg:grid-cols-3">
				<div className="space-y-6 lg:col-span-2">
					{/* Daily goal */}
					<Card variant="elevated">
						<div className="mb-3 flex items-center justify-between">
							<h3 className="text-sm font-semibold text-foreground">Target Harian</h3>
							<span className="text-xs text-muted-foreground">
								{completedToday}/{DAILY_LESSON_GOAL} pelajaran
							</span>
						</div>
						<ProgressBar
							value={(completedToday / DAILY_LESSON_GOAL) * 100}
							showPercent
						/>
					</Card>

					{/* Level XP progress */}
					<Card variant="elevated">
						<div className="mb-3 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<h3 className="text-sm font-semibold text-foreground">Level Saat Ini</h3>
								<Badge variant={level}>{level}</Badge>
							</div>
							<span className="text-xs text-muted-foreground">
								{LEVEL_LABELS[level]}
							</span>
						</div>
						<ProgressBar
							value={xpProgress}
							label={`${xp} / ${nextLevelXp} XP`}
							showPercent
						/>
					</Card>

					{/* Continue lesson */}
					<Card variant="elevated" className="space-y-4">
						<h3 className="text-sm font-semibold text-foreground">Lanjutkan Belajar</h3>
						{lessonsQuery.isLoading ? (
							<div className="space-y-3">
								<div className="h-5 w-48 animate-pulse rounded bg-slate-200" />
								<div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
							</div>
						) : nextLesson ? (
							<div className="flex items-center justify-between gap-4">
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										<Badge variant={nextLesson.level as Level}>{nextLesson.level}</Badge>
										<span className="text-sm font-medium text-foreground">
											{nextLesson.title}
										</span>
									</div>
									<div className="flex items-center gap-1 text-xs text-muted-foreground">
										<Clock size={12} />
										{nextLesson.estimatedMinutes} menit
									</div>
								</div>
								<Link href={`/lesson/${nextLesson.id}`}>
									<Button size="sm" rightIcon={<ArrowRight size={14} />}>
										Mulai
									</Button>
								</Link>
							</div>
						) : (
							<p className="text-sm text-muted-foreground">Semua pelajaran selesai! 🎉</p>
						)}
					</Card>

					{dueCount > 0 ? (
						<Card className="border-sky-200 bg-sky-50">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-semibold text-sky-800">
										{dueCount} kartu siap direview
									</p>
									<p className="text-xs text-sky-600">Jangan biarkan kata-kata terlupakan!</p>
								</div>
								<Link href="/flashcards">
									<Button size="sm" variant="secondary" rightIcon={<ArrowRight size={14} />}>
										Review
									</Button>
								</Link>
							</div>
						</Card>
					) : null}
				</div>

				{/* Recent activity */}
				<Card variant="elevated" className="h-fit space-y-4">
					<h3 className="text-sm font-semibold text-foreground">Aktivitas Terbaru</h3>
					<ul className="space-y-3">
						{activityQuery.data?.lessons?.slice(0, 6).map((item, index) => (
							<li key={item.id ?? index} className="flex items-center justify-between gap-2">
								<div className="flex items-center gap-2">
									<div className="h-2 w-2 flex-shrink-0 rounded-full bg-indigo-400" />
									<span className="text-xs text-muted-foreground">Pelajaran selesai</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-xs font-medium text-foreground">Skor {item.score}</span>
									<span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">
										+{item.xpEarned} XP
									</span>
								</div>
							</li>
						))}
						{!activityQuery.data?.lessons?.length ? (
							<li className="text-xs text-muted-foreground">Belum ada aktivitas minggu ini.</li>
						) : null}
					</ul>
				</Card>
			</div>
			{toast ? (
				<Toast message={toast.message} variant={toast.variant} />
			) : null}
		</div>
	);
}