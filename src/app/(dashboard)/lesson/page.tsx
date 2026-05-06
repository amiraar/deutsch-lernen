"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";

import { Badge, Card, LoadingSpinner, Toast } from "@/components/ui";
import { useToastMessage } from "@/hooks/useToastMessage";
import { trpc } from "@/lib/trpcClient";
import { cn } from "@/lib/utils";

const LEVELS = ["A1", "A2", "B1", "B2"] as const;

type Level = (typeof LEVELS)[number];

type LessonListItem = {
	id: string;
	title: string;
	level: Level;
	estimatedMinutes: number;
	isCompleted: boolean;
};

function FilterButton({
	label,
	active,
	onClick,
}: {
	label: string;
	active: boolean;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
				active
					? "border-primary bg-primary text-primary-foreground"
					: "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
			)}
		>
			{label}
		</button>
	);
}

export default function LessonListPage() {
	const [selectedLevel, setSelectedLevel] = React.useState<"all" | Level>("all");
	const lessonsQuery = trpc.lesson.getLessons.useQuery();
	const { toast, showToast, clearToast } = useToastMessage();

	const lessons = (lessonsQuery.data ?? []) as LessonListItem[];
	const grouped = LEVELS.map((level) => ({
		level,
		lessons: lessons.filter((lesson) => lesson.level === level),
	}));

	const visibleGroups =
		selectedLevel === "all"
			? grouped
			: grouped.filter((group) => group.level === selectedLevel);

	React.useEffect(() => {
		if (lessonsQuery.error) {
			showToast("Gagal memuat pelajaran. Coba lagi sebentar.", "error");
		} else {
			clearToast();
		}
	}, [clearToast, lessonsQuery.error, showToast]);

	if (lessonsQuery.isLoading) {
		return (
			<div className="flex items-center justify-center py-10">
				<LoadingSpinner label="Memuat pelajaran" />
			</div>
		);
	}

	if (lessonsQuery.error) {
		return (
			<div className="space-y-3">
				<Card className="text-sm text-destructive">
					Gagal memuat daftar pelajaran. Coba refresh halaman.
				</Card>
				{toast ? (
					<Toast message={toast.message} variant={toast.variant} />
				) : null}
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-foreground">Pelajaran</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Pilih level dan lanjutkan belajar sesuai kemampuanmu.
				</p>
			</div>

			<div className="flex flex-wrap gap-2">
				<FilterButton
					label="Semua"
					active={selectedLevel === "all"}
					onClick={() => setSelectedLevel("all")}
				/>
				{LEVELS.map((level) => (
					<FilterButton
						key={level}
						label={level}
						active={selectedLevel === level}
						onClick={() => setSelectedLevel(level)}
					/>
				))}
			</div>

			{visibleGroups.map((group) => {
				const completed = group.lessons.filter((lesson) => lesson.isCompleted)
					.length;
				const total = group.lessons.length;

				return (
					<div key={group.level} className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<h2 className="text-lg font-semibold text-foreground">
									Level {group.level}
								</h2>
								<Badge variant={group.level}>{group.level}</Badge>
							</div>
							<p className="text-xs text-muted-foreground">
								{completed} dari {total} pelajaran {group.level} selesai
							</p>
						</div>

						{total === 0 ? (
							<Card className="text-sm text-muted-foreground">
								Belum ada pelajaran untuk level ini.
							</Card>
						) : (
							<div className="grid gap-4 md:grid-cols-2">
								{group.lessons.map((lesson) => (
									<Link key={lesson.id} href={`/lesson/${lesson.id}`}>
										<Card
											variant="elevated"
											className="flex h-full items-center justify-between gap-4 p-4 transition hover:border-primary/40"
										>
											<div className="space-y-2">
												<div className="flex items-center gap-2">
													<Badge variant={lesson.level}>{lesson.level}</Badge>
													<p className="text-sm font-semibold text-foreground">
														{lesson.title}
													</p>
												</div>
												<div className="flex items-center gap-1 text-xs text-muted-foreground">
													<Clock size={12} />
													{lesson.estimatedMinutes} menit
												</div>
											</div>
											{lesson.isCompleted ? (
												<div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
													<CheckCircle2 size={16} />
													Selesai
												</div>
											) : null}
										</Card>
									</Link>
								))}
							</div>
						)}
					</div>
				);
			})}
			{toast ? (
				<Toast message={toast.message} variant={toast.variant} />
			) : null}
		</div>
	);
}
