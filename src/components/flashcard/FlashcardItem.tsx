"use client";

import * as React from "react";

import type { VocabWord } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui";

export type FlashcardItemProps = {
	word: VocabWord;
	onRate: (quality: 0 | 1 | 3 | 5) => void;
};

const RATING_BUTTONS: {
	quality: 0 | 1 | 3 | 5;
	label: string;
	className: string;
}[] = [
	{
		quality: 0,
		label: "Lagi",
		className:
			"border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100",
	},
	{
		quality: 1,
		label: "Sulit",
		className:
			"border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100",
	},
	{
		quality: 3,
		label: "Oke",
		className:
			"border-sky-200 bg-sky-50 text-sky-600 hover:bg-sky-100",
	},
	{
		quality: 5,
		label: "Mudah",
		className:
			"border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
	},
];

/**
 * Flashcard with 3D flip animation and color-coded SM-2 rating buttons.
 */
export function FlashcardItem({ word, onRate }: FlashcardItemProps) {
	const [isFlipped, setIsFlipped] = React.useState(false);

	return (
		<div className="w-full space-y-4">
			{/* Card */}
			<div className="relative h-72 w-full [perspective:1200px]">
				<div
					className={cn(
						"absolute inset-0 h-full w-full transition-transform duration-500",
						"[transform-style:preserve-3d]",
						isFlipped ? "[transform:rotateY(180deg)]" : ""
					)}
				>
					{/* Front */}
					<div
						className={cn(
							"absolute inset-0 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4",
							"rounded-2xl border border-border bg-card shadow-sm [backface-visibility:hidden]"
						)}
						onClick={() => setIsFlipped(true)}
					>
						<Badge variant={word.level as "A1" | "A2" | "B1" | "B2"}>
							{word.level}
						</Badge>
						<p className="text-3xl font-bold text-foreground">{word.german}</p>
						<p className="text-xs text-muted-foreground">Ketuk untuk melihat arti</p>
					</div>

					{/* Back */}
					<div
						className={cn(
							"absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-3",
							"rounded-2xl border border-border bg-card shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]"
						)}
					>
						<p className="text-2xl font-bold text-foreground">{word.indonesian}</p>
						{word.example ? (
							<div className="space-y-1 text-center">
								<p className="text-sm italic text-muted-foreground">{word.example}</p>
								{word.exampleTranslation ? (
									<p className="text-xs text-muted-foreground/70">
										{word.exampleTranslation}
									</p>
								) : null}
							</div>
						) : null}
					</div>
				</div>
			</div>

			{/* Rating buttons — only shown when flipped */}
			{isFlipped ? (
				<div className="grid grid-cols-4 gap-2">
					{RATING_BUTTONS.map(({ quality, label, className }) => (
						<button
							key={quality}
							onClick={() => onRate(quality)}
							className={cn(
								"rounded-xl border py-3 text-sm font-semibold transition-colors",
								className
							)}
						>
							{label}
						</button>
					))}
				</div>
			) : null}
		</div>
	);
}
