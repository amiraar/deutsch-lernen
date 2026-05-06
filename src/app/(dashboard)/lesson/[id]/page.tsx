"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { ExerciseBlock } from "@/components/lesson/ExerciseBlock";
import { LessonProgress } from "@/components/lesson/LessonProgress";
import { Button, Card, LoadingSpinner, Modal } from "@/components/ui";
import { trpc } from "@/lib/trpcClient";

export default function LessonPage() {
	const params = useParams();
	const lessonId = params?.id as string;

	const lessonQuery = trpc.lesson.getLessonById.useQuery({ id: lessonId });
	const completeMutation = trpc.lesson.completeLesson.useMutation();

	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [correctCount, setCorrectCount] = React.useState(0);
	const [elapsedSeconds, setElapsedSeconds] = React.useState(0);
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setElapsedSeconds((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const exercises = lessonQuery.data?.exercises ?? [];
	const current = exercises[currentIndex];

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
			<Card className="text-sm text-destructive">
				{lessonQuery.error?.message ?? "Pelajaran tidak ditemukan."}
			</Card>
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

			<Card>
				{current ? (
					<ExerciseBlock exercise={current} onComplete={handleComplete} />
				) : (
					<p className="text-sm text-muted-foreground">Tidak ada latihan.</p>
				)}
			</Card>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Pelajaran selesai"
			>
				<div className="space-y-4">
					<p className="text-sm text-muted-foreground">
						Skor kamu: {Math.round((correctCount / exercises.length) * 100)}
					</p>
					<Button onClick={() => (window.location.href = "/dashboard")}>
						Lanjutkan ke pelajaran berikutnya
					</Button>
				</div>
			</Modal>
		</div>
	);
}
