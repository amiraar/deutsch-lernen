"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpcClient";
import { speak } from "@/lib/ai/tts";
import { Button, Card, Input } from "@/components/ui";

export type SerializedExercise = {
	id: string;
	lessonId: string;
	type: "MULTIPLE_CHOICE" | "FILL_IN_BLANK" | "TRANSLATION" | "PRONUNCIATION";
	prompt: string;
	correctAnswer: string;
	options: string[];
	explanation: string;
	createdAt: string;
	updatedAt: string;
};

type ExerciseBlockProps = {
	exercise: SerializedExercise;
	onComplete: (correct: boolean) => void;
};

const XP_PER_EXERCISE = 10;

function normalizeAnswer(value: string): string {
	return value.trim().toLowerCase();
}

function AnswerFooter({
	isCorrect,
	correctAnswer,
	explanation,
}: {
	isCorrect: boolean;
	correctAnswer: string;
	explanation: string;
}) {
	return (
		<div className="mt-4 space-y-2 text-sm">
			<p className="font-medium text-foreground">
				{isCorrect ? "Jawaban benar" : "Jawaban kurang tepat"} · XP +
				{isCorrect ? XP_PER_EXERCISE : 0}
			</p>
			{!isCorrect ? (
				<p className="text-muted-foreground">Jawaban benar: {correctAnswer}</p>
			) : null}
			<p className="text-muted-foreground">{explanation}</p>
		</div>
	);
}

function MultipleChoice({ exercise, onComplete }: ExerciseBlockProps) {
	const [selected, setSelected] = React.useState<string | null>(null);
	const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
	const [shakeKey, setShakeKey] = React.useState(0);

	const handleSelect = (option: string) => {
		if (isCorrect !== null) {
			return;
		}

		const correct = option === exercise.correctAnswer;
		setSelected(option);
		setIsCorrect(correct);
		if (!correct) {
			setShakeKey((value) => value + 1);
		}
		onComplete(correct);
	};

	return (
		<div className="space-y-4">
			<p className="text-base font-medium text-foreground">{exercise.prompt}</p>
			<div className="grid gap-3 sm:grid-cols-2">
				{(exercise.options as string[]).map((option) => {
					const isSelected = selected === option;
					const isAnswer = option === exercise.correctAnswer;
					const shouldShake = isSelected && isCorrect === false;
					const stateClass =
						isCorrect === null
							? "border-border"
							: isAnswer
								? "border-emerald-500 bg-emerald-50"
								: isSelected
									? "border-rose-500 bg-rose-50"
									: "border-border";

					return (
						<Button
							key={shouldShake ? `${option}-${shakeKey}` : option}
							variant="secondary"
							className={cn(
								"justify-start border",
								stateClass,
								shouldShake ? "animate-shake" : ""
							)}
							onClick={() => handleSelect(option)}
						>
							{option}
						</Button>
					);
				})}
			</div>
			{isCorrect !== null ? (
				<AnswerFooter
					isCorrect={isCorrect}
					correctAnswer={exercise.correctAnswer}
					explanation={exercise.explanation}
				/>
			) : null}
		</div>
	);
}

function FillInBlank({ exercise, onComplete }: ExerciseBlockProps) {
	const [value, setValue] = React.useState("");
	const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
	const shouldShake = isCorrect === false;

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (isCorrect !== null) {
			return;
		}

		const correct =
			normalizeAnswer(value) === normalizeAnswer(exercise.correctAnswer);
		setIsCorrect(correct);
		onComplete(correct);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<p className="text-base font-medium text-foreground">{exercise.prompt}</p>
			<Input
				value={value}
				onChange={(event) => setValue(event.target.value)}
				placeholder="Tulis jawabanmu"
				disabled={isCorrect !== null}
				className={cn(shouldShake ? "animate-shake border-destructive" : "")}
			/>
			<Button type="submit" disabled={isCorrect !== null}>
				Periksa
			</Button>
			{isCorrect !== null ? (
				<AnswerFooter
					isCorrect={isCorrect}
					correctAnswer={exercise.correctAnswer}
					explanation={exercise.explanation}
				/>
			) : null}
		</form>
	);
}

function Translation({ exercise, onComplete }: ExerciseBlockProps) {
	const [value, setValue] = React.useState("");
	const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
	const [feedback, setFeedback] = React.useState<string | null>(null);

	const evaluateMutation = trpc.tutor.evaluateWriting.useMutation();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (isCorrect !== null) {
			return;
		}

		try {
			const result = await evaluateMutation.mutateAsync({
				german: value,
				expectedMeaning: exercise.prompt,
			});
			setIsCorrect(result.isCorrect);
			setFeedback(result.feedback);
			onComplete(result.isCorrect);
		} catch (error) {
			const message = error instanceof Error ? error.message : "Unknown error";
			setFeedback(`Gagal mengevaluasi tulisan. ${message}`);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<p className="text-base font-medium text-foreground">{exercise.prompt}</p>
			<textarea
				className="h-28 w-full rounded-md border border-input bg-background p-3 text-sm text-foreground"
				placeholder="Tulis terjemahan bahasa Jerman"
				value={value}
				onChange={(event) => setValue(event.target.value)}
				disabled={isCorrect !== null}
			/>
			<Button type="submit" isLoading={evaluateMutation.isPending}>
				Kirim
			</Button>
			{feedback ? (
				<Card variant="colored" className="text-sm text-muted-foreground">
					{feedback}
				</Card>
			) : null}
			{isCorrect !== null ? (
				<AnswerFooter
					isCorrect={isCorrect}
					correctAnswer={exercise.correctAnswer}
					explanation={exercise.explanation}
				/>
			) : null}
		</form>
	);
}

function Pronunciation({ exercise, onComplete }: ExerciseBlockProps) {
	const [isRecording, setIsRecording] = React.useState(false);
	const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
	const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
	const [isSpeaking, setIsSpeaking] = React.useState(false);
	const [tips, setTips] = React.useState<string[]>([]);
	const [isEvaluating, setIsEvaluating] = React.useState(false);
	const recorderRef = React.useRef<MediaRecorder | null>(null);

	const evaluateMutation = trpc.tutor.evaluatePronunciation.useMutation();

	const blobToBase64 = React.useCallback(async (blob: Blob) => {
		return new Promise<string>((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (typeof reader.result === "string") {
					const base64 = reader.result.split(",")[1] ?? "";
					resolve(base64);
					return;
				}
				resolve("");
			};
			reader.onerror = () => {
				reject(reader.error ?? new Error("Failed to read audio"));
			};
			reader.readAsDataURL(blob);
		});
	}, []);

	const handleListen = async () => {
		setIsSpeaking(true);
		try {
			await speak(exercise.prompt, { rate: 0.85 });
		} finally {
			setIsSpeaking(false);
		}
	};

	const handleRecordToggle = async () => {
		if (isRecording) {
			recorderRef.current?.stop();
			setIsRecording(false);
			return;
		}

		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const recorder = new MediaRecorder(stream);
			recorderRef.current = recorder;
			setTips([]);
			setIsCorrect(null);

			const chunks: BlobPart[] = [];
			recorder.ondataavailable = (event) => chunks.push(event.data);
			recorder.onstop = async () => {
				const blob = new Blob(chunks, { type: "audio/webm" });
				const url = URL.createObjectURL(blob);
				setAudioUrl(url);
				setIsEvaluating(true);

				try {
					const audioBase64 = await blobToBase64(blob);
					const result = await evaluateMutation.mutateAsync({
						audioBase64,
						expectedText: exercise.prompt,
					});
					setTips(result.tips);
				} catch (error) {
					const message = error instanceof Error ? error.message : "Unknown error";
					setTips([`Gagal mendapatkan tips pelafalan. ${message}`]);
				} finally {
					setIsEvaluating(false);
					setIsCorrect(true);
					onComplete(true);
				}
			};

			recorder.start();
			setIsRecording(true);
		} catch (error) {
			const message = error instanceof Error ? error.message : "Unknown error";
			setIsCorrect(false);
			setAudioUrl(null);
			console.error(`Failed to start recording: ${message}`);
		}
	};

	return (
		<div className="space-y-4">
			<p className="text-base font-medium text-foreground">{exercise.prompt}</p>
			<div className="flex gap-2">
				<Button
					variant="secondary"
					onClick={handleListen}
					isLoading={isSpeaking}
					disabled={isRecording}
				>
					{isSpeaking ? "Memutar…" : "🔊 Dengarkan"}
				</Button>
				<Button
					variant="secondary"
					onClick={handleRecordToggle}
					disabled={isSpeaking || isEvaluating}
				>
					{isRecording ? "⏹ Stop" : "🎙 Rekam"}
				</Button>
			</div>
			{audioUrl ? (
				<audio controls className="w-full">
					<source src={audioUrl} type="audio/webm" />
				</audio>
			) : null}
			{tips.length > 0 ? (
				<div className="space-y-2 text-sm">
					<p className="font-medium text-foreground">Tips Pelafalan:</p>
					<ul className="list-disc space-y-1 pl-5 text-muted-foreground">
						{tips.map((tip, index) => (
							<li key={`${tip}-${index}`}>{tip}</li>
						))}
					</ul>
				</div>
			) : null}
			{isCorrect !== null ? (
				<AnswerFooter
					isCorrect={isCorrect}
					correctAnswer={exercise.correctAnswer}
					explanation={
						exercise.explanation ||
						"Rekaman tersimpan. Penilaian otomatis belum tersedia."
					}
				/>
			) : null}
		</div>
	);
}

/**
 * Renders a single lesson exercise based on its type.
 */
export function ExerciseBlock({ exercise, onComplete }: ExerciseBlockProps) {
	switch (exercise.type) {
		case "MULTIPLE_CHOICE":
			return <MultipleChoice exercise={exercise} onComplete={onComplete} />;
		case "FILL_IN_BLANK":
			return <FillInBlank exercise={exercise} onComplete={onComplete} />;
		case "TRANSLATION":
			return <Translation exercise={exercise} onComplete={onComplete} />;
		case "PRONUNCIATION":
			return <Pronunciation exercise={exercise} onComplete={onComplete} />;
		default:
			return null;
	}
}
