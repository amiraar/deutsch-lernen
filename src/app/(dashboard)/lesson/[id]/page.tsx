"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ExerciseBlock } from "@/components/lesson/ExerciseBlock";
import type { SerializedExercise } from "@/components/lesson/ExerciseBlock";
import { LessonContentView } from "@/components/lesson/LessonContent";
import { LessonProgress } from "@/components/lesson/LessonProgress";
import { Button, Card, LoadingSpinner, Modal, Toast } from "@/components/ui";
import { useToastMessage } from "@/hooks/useToastMessage";
import { trpc } from "@/lib/trpcClient";
import type { LessonContent } from "@/../lesson-content";

type LessonData = {
	id: string;
	title: string;
	description: string;
	content: LessonContent | null;
	exercises?: SerializedExercise[];
};

export default function LessonPage() {
	const params = useParams();
	const lessonId = params?.id as string;

	const lessonQuery = trpc.lesson.getLessonById.useQuery({ id: lessonId });
	const completeMutation = trpc.lesson.completeLesson.useMutation();

	const [phase, setPhase] = React.useState<"content" | "exercises">("content");
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [correctCount, setCorrectCount] = React.useState(0);
	const [elapsedSeconds, setElapsedSeconds] = React.useState(0);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const { toast, showToast, clearToast } = useToastMessage();

	React.useEffect(() => {
		if (phase !== "exercises") return;
		const timer = setInterval(() => {
			setElapsedSeconds((prev) => prev + 1);
		}, 1000);
		return () => clearInterval(timer);
	}, [phase]);

	React.useEffect(() => {
		if (lessonQuery.error) {
			showToast("Gagal memuat pelajaran. Coba lagi.", "error");
		} else {
			clearToast();
		}
	}, [clearToast, lessonQuery.error, showToast]);

	const lesson = lessonQuery.data as LessonData | undefined;
	const exercises = lesson?.exercises ?? [];
	const current = exercises[currentIndex];

	const handleStartExercises = () => {
		setPhase("exercises");
	};

	const handleComplete = async (correct: boolean) => {
		setCorrectCount((prev) => prev + (correct ? 1 : 0));

		if (currentIndex < exercises.length - 1) {
			setCurrentIndex((prev) => prev + 1);
		} else {
			const score = Math.round((correctCount + (correct ? 1 : 0)) / exercises.length * 100);
			await completeMutation.mutateAsync({
				lessonId,
				score,
			});
			setIsModalOpen(true);
		}
	};

	if (lessonQuery.isLoading) {
		return (
			<div className="flex items-center justify-center py-10">
				<LoadingSpinner label="Memuat pelajaran" />
			</div>
		);
	}

	if (lessonQuery.error || !lessonQuery.data) {
		return (
			<div className="space-y-3">
				<Card className="text-sm text-destructive">
					{lessonQuery.error?.message ?? "Pelajaran tidak ditemukan."}
				</Card>
				{toast ? (
					<Toast message={toast.message} variant={toast.variant} />
				) : null}
			</div>
		);
	}

	const hasContent = lesson?.content && typeof lesson.content === "object" && "introduction" in lesson.content;

	if (phase === "content" && hasContent) {
		return (
			<div className="space-y-6">
				<LessonContentView
					content={lesson!.content as LessonContent}
					title={lesson!.title}
					description={lesson!.description}
				/>
				<div className="sticky bottom-4">
					<Button className="w-full" size="lg" onClick={handleStartExercises}>
						Mulai Latihan →
					</Button>
				</div>
				{toast ? (
					<Toast message={toast.message} variant={toast.variant} />
				) : null}
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<LessonProgress
				current={currentIndex + 1}
				total={exercises.length}
				xpEarned={correctCount * 10}
				elapsedSeconds={elapsedSeconds}
			/>

			<Card variant="elevated" className="min-h-[280px]">
				{current ? (
					<ErrorBoundary>
						<ExerciseBlock exercise={current} onComplete={handleComplete} />
					</ErrorBoundary>
				) : (
					<p className="text-sm text-muted-foreground">Tidak ada latihan.</p>
				)}
			</Card>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Pelajaran selesai! 🎉"
			>
				<div className="space-y-6 text-center">
					<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
						<span className="text-4xl">🏆</span>
					</div>
					<div>
						<p className="text-4xl font-bold text-foreground">
							{Math.round((correctCount / Math.max(exercises.length, 1)) * 100)}
							<span className="text-xl text-muted-foreground">/100</span>
						</p>
						<p className="mt-1 text-sm text-muted-foreground">Skor kamu</p>
					</div>
					<div className="rounded-lg bg-primary/5 px-4 py-3">
						<p className="text-sm font-semibold text-primary">
							+{correctCount * 10} XP diperoleh
						</p>
					</div>
					<Button className="w-full" onClick={() => (window.location.href = "/dashboard")}>
						Kembali ke Dashboard
					</Button>
				</div>
			</Modal>
			{toast ? (
				<Toast message={toast.message} variant={toast.variant} />
			) : null}
		</div>
	);
}

