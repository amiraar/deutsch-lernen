"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { TutorWindow } from "@/components/tutor/TutorWindow";

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

	const handleSuggestion = (text: string) => {
		setInitialMessage(text);
		setKey((k) => k + 1);
	};

	return (
		<div className="space-y-6">
			<div>
				<div className="flex items-center gap-2">
					<Sparkles size={20} className="text-primary" />
					<h1 className="text-xl font-bold text-foreground">AI Tutor</h1>
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
				<TutorWindow key={key} initialMessage={initialMessage} />
			</ErrorBoundary>
		</div>
	);
}

