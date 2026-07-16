"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { TutorWindow } from "@/components/tutor/TutorWindow";
import { trpc } from "@/lib/trpcClient";

const SUGGESTIONS = [
	"Koreksi kalimat saya",
	"Jelaskan perbedaan der/die/das",
	"Buat soal latihan untuk saya",
	"Apa arti 'Entschuldigung'?",
	"Bagaimana cara menggunakan Perfekt?",
];

export default function TutorPage() {
	const [initialMessage, setInitialMessage] = React.useState("");
	const [key, setKey] = React.useState(0);
	const searchParams = useSearchParams();
	const lessonId = searchParams.get("lessonId");

	const lessonQuery = trpc.lesson.getLessonById.useQuery(
		{ id: lessonId ?? "" },
		{
			enabled: Boolean(lessonId),
			refetchOnWindowFocus: false,
			staleTime: 5 * 60 * 1000,
		}
	);

	const lessonTitle = lessonQuery.data?.title;
	const contextPrefix = lessonTitle
		? `Saya sedang belajar lesson '${lessonTitle}'. `
		: "";

	const handleSuggestion = (text: string) => {
		const message = contextPrefix ? `${contextPrefix}${text}` : text;
		setInitialMessage(message);
		setKey((k) => k + 1);
	};

	return (
		<div className="space-y-6">
			<div>
				<div className="flex items-center gap-2">
					<Sparkles size={22} className="text-accent" />
					<h1 className="font-display text-3xl font-semibold text-foreground">AI Tutor</h1>
				</div>
				<p className="mt-1 text-sm text-muted-foreground">
					Tanyakan apa saja tentang bahasa Jerman — dijawab dalam bahasa Indonesia.
				</p>
			</div>

			{/* Suggestion chips */}
			<div className="flex flex-wrap gap-2">
				{SUGGESTIONS.map((text) => (
					<button
						key={text}
						onClick={() => handleSuggestion(text)}
						className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
					>
						{text}
					</button>
				))}
			</div>

			<ErrorBoundary>
				<TutorWindow
					key={key}
					initialMessage={initialMessage}
					contextNote={lessonTitle}
				/>
			</ErrorBoundary>
		</div>
	);
}

