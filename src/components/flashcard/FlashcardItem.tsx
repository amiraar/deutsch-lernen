"use client";

import * as React from "react";
import { Eye } from "lucide-react";

import type { AppRouter } from "@/server/root";
import type { inferRouterOutputs } from "@trpc/server";
import { cn } from "@/lib/utils";
import { Badge, Button } from "@/components/ui";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type VocabWordSerialized =
	RouterOutputs["flashcard"]["getDueCards"][number]["vocabWord"];

export type FlashcardItemProps = {
	word: VocabWordSerialized;
	onRate: (quality: 0 | 1 | 3 | 5) => void;
};

const RATING_BUTTONS: {
	quality: 0 | 1 | 3 | 5;
	label: string;
	key: string;
	ariaLabel: string;
	className: string;
}[] = [
	{
		quality: 0,
		label: "Lagi",
		key: "1",
		ariaLabel: "Tidak ingat – ulangi secepatnya (tekan 1)",
		className:
			"border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/15",
	},
	{
		quality: 1,
		label: "Sulit",
		key: "2",
		ariaLabel: "Sulit – sedikit ingat (tekan 2)",
		className:
			"border-warning/20 bg-warning/10 text-warning hover:bg-warning/15",
	},
	{
		quality: 3,
		label: "Oke",
		key: "3",
		ariaLabel: "Oke – ingat dengan usaha (tekan 3)",
		className:
			"border-primary/20 bg-primary/10 text-primary hover:bg-primary/15",
	},
	{
		quality: 5,
		label: "Mudah",
		key: "4",
		ariaLabel: "Mudah – ingat dengan jelas (tekan 4)",
		className:
			"border-success/20 bg-success/10 text-success hover:bg-success/15",
	},
];

/**
 * Flashcard with 3D flip animation and color-coded SM-2 rating buttons.
 */
export function FlashcardItem({ word, onRate }: FlashcardItemProps) {
	const [isFlipped, setIsFlipped] = React.useState(false);
	const flipButtonRef = React.useRef<HTMLButtonElement | null>(null);

	const handleFlip = () => {
		setIsFlipped(true);
	};

	// Auto-focus flip button on new card so Space/Enter works immediately
	React.useEffect(() => {
		flipButtonRef.current?.focus();
	}, [word.id]);

	// Keyboard shortcuts: 1-4 to rate when flipped
	React.useEffect(() => {
		if (!isFlipped) return;
		const map: Record<string, 0 | 1 | 3 | 5> = {
			"1": 0,
			"2": 1,
			"3": 3,
			"4": 5,
		};
		const handleKeyDown = (e: KeyboardEvent) => {
			const quality = map[e.key];
			if (quality !== undefined) {
				e.preventDefault();
				onRate(quality);
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isFlipped, onRate]);

	// Flipping is one-way per card (the deck keys each card), so pulse until flipped.
	const shouldPulse = !isFlipped;

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
						onClick={handleFlip}
					>
						<Badge variant={word.level as "A1" | "A2" | "B1" | "B2"}>
							{word.level}
						</Badge>
						<p className="text-3xl font-bold text-foreground">{word.german}</p>
						<div className={cn(shouldPulse ? "animate-pulse" : "")}>
							<Button
								ref={flipButtonRef}
								variant="secondary"
								size="sm"
								leftIcon={<Eye size={16} />}
								onClick={handleFlip}
							>
								Lihat Arti
							</Button>
						</div>
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
									<p className="text-xs text-muted-foreground">
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
					{RATING_BUTTONS.map(({ quality, label, ariaLabel, className }) => (
						<button
							key={quality}
							aria-label={ariaLabel}
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
