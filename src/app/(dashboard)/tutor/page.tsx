"use client";

import * as React from "react";

import { TutorWindow } from "@/components/tutor/TutorWindow";
import { Button } from "@/components/ui";

const SUGGESTIONS = [
	"Koreksi kalimat saya",
	"Jelaskan perbedaan der/die/das",
	"Buat soal latihan untuk saya",
];

export default function TutorPage() {
	const [seed, setSeed] = React.useState(0);

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap gap-2">
				{SUGGESTIONS.map((text) => (
					<Button
						key={text}
						variant="secondary"
						size="sm"
						onClick={() => setSeed((prev) => prev + 1)}
					>
						{text}
					</Button>
				))}
			</div>
			<TutorWindow key={seed} />
		</div>
	);
}
