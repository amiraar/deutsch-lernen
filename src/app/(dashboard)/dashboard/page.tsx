"use client";

import Link from "next/link";
import { Flame, Trophy, BookOpen, Layers, ArrowRight, Clock } from "lucide-react";

import { Badge, Button, Card, ProgressBar } from "@/components/ui";
import { trpc } from "@/lib/trpcClient";
import { DAILY_LESSON_GOAL, XP_THRESHOLDS, LEVEL_LABELS } from "@/constants";

function getGreeting(): string {
	const hour = new Date().getHours();
	if (hour < 12) return "Selamat pagi";
	if (hour < 17) return "Selamat siang";
	return "Selamat malam";
}

export default function DashboardPage() {
	const statsQuery = trpc.progress.getUserStats.useQuery();
	const activityQuery = trpc.progress.getRecentActivity.useQuery();
	const lessonsQuery = trpc.lesson.getLessons.useQuery();
	const dueCardsQuery = trpc.flashcard.getDueCards.useQuery();

	const stats = statsQuery.data;
	const streakDays = stats?.streakDays ?? 0;
	const xp = stats?.xp ?? 0;
	const level = stats?.level ?? "A1";
	const nextLevelXp = XP_THRESHOLDS[level === "B2" ? "B2" : level] ?? 0;
	const prevLevelXp = level === "A1" ? 0 : (XP_THRESHOLDS[level] ?? 0);
	const xpProgress =
		nextLevelXp > prevLevelXp
			? Math.round(((xp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100)
			: 100;

	const completedToday = activityQuery.data?.lessons?.filter((l: { completedAt: string }) => {
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
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{/* Streak */}
				<Card variant="elevated" className="flex items-center gap-4">
					<div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100">
						<Flame size={22} className="text-amber-500" />
					</div>
					<div>
						<p className="text-2xl font-bold text-foreground">{streakDays}</p>
						<p className="text-xs text-muted-foreground">Hari Streak</p>
					</div>
				</Card>

				{/* XP */}
				<Card variant="elevated" className="flex items-center gap-4">
					<div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-violet-100">
						<Trophy size={22} className="text-violet-500" />
					</div>
					<div>
						<p className="text-2xl font-bold text-foreground">{xp}</p>
						<p className="text-xs text-muted-foreground">Total XP</p>
					</div>
				</Card>

				{/* Lessons */}
				<Card variant="elevated" className="flex items-center gap-4">
					<div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100">
						<BookOpen size={22} className="text-emerald-500" />
					</div>
					<div>
						<p className="text-2xl font-bold text-foreground">{stats?.lessonsCompleted ?? 0}</p>
						<p className="text-xs text-muted-foreground">Pelajaran Selesai</p>
					</div>
				</Card>

				{/* Cards due */}
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

			{/* Main content grid */}
			<div className="grid gap-6 lg:grid-cols-3">
				{/* Left col: progress + next lesson + flashcards CTA */}
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
						{nextLesson ? (
							<div className="flex items-center justify-between gap-4">
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										<Badge variant={nextLesson.level}>{nextLesson.level}</Badge>
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

					{/* Flashcards CTA */}
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

				{/* Right col: recent activity */}
				<Card variant="elevated" className="h-fit space-y-4">
					<h3 className="text-sm font-semibold text-foreground">Aktivitas Terbaru</h3>
					<ul className="space-y-3">
						{activityQuery.data?.lessons?.slice(0, 6).map((item: { id: string; title: string; completedAt: string; xpEarned: number }) => (
							<li key={item.id} className="flex items-center justify-between gap-2">
								<div className="flex items-center gap-2">
									<div className="h-2 w-2 flex-shrink-0 rounded-full bg-primary/40" />
									<span className="text-xs text-muted-foreground">
										Pelajaran selesai
									</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-xs font-medium text-foreground">
										Skor {item.score}
									</span>
									<span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
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
		</div>
	);
}
