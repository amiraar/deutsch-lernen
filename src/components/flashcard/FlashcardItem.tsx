"use client";

import * as React from "react";

import type { VocabWord } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { Button, Card } from "@/components/ui";

export type FlashcardItemProps = {
	word: VocabWord;
	onRate: (quality: 0 | 1 | 3 | 5) => void;
};

/**
 * Flashcard with flip animation and SM-2 rating buttons.
 */
export function FlashcardItem({ word, onRate }: FlashcardItemProps) {
	const [isFlipped, setIsFlipped] = React.useState(false);

	return (
		<div className="w-full">
			<div className="relative h-72 w-full [perspective:1200px]">
				<div
					className={cn(
						"absolute inset-0 h-full w-full transition-transform duration-500",
						"[transform-style:preserve-3d]",
						isFlipped ? "[transform:rotateY(180deg)]" : ""
					)}
				>
					<Card
						className={cn(
							"absolute inset-0 flex h-full w-full items-center justify-center",
							"[backface-visibility:hidden]"
						)}
					>
						<div className="space-y-3 text-center">
							<p className="text-2xl font-semibold text-foreground">{word.german}</p>
							<Button variant="ghost" onClick={() => setIsFlipped(true)}>
								Lihat arti
							</Button>
						</div>
					</Card>
					<Card
						className={cn(
							"absolute inset-0 flex h-full w-full items-center justify-center",
							"[backface-visibility:hidden] [transform:rotateY(180deg)]"
						)}
					>
						<div className="space-y-4 text-center">
							<div>
								<p className="text-xl font-semibold text-foreground">
									{word.indonesian}
								</p>
								<p className="text-sm text-muted-foreground">{word.example}</p>
								<p className="text-sm text-muted-foreground">
									{word.exampleTranslation}
								</p>
							</div>
							<div className="flex flex-wrap justify-center gap-2">
								<Button variant="ghost" onClick={() => onRate(0)}>
									Lagi
								</Button>
								<Button variant="secondary" onClick={() => onRate(1)}>
									Sulit
								</Button>
								<Button variant="primary" onClick={() => onRate(3)}>
									Oke
								</Button>
								<Button variant="secondary" onClick={() => onRate(5)}>
									Mudah
								</Button>
							</div>
						</div>
					</Card>
				</div>
			</div>
			{isFlipped ? null : (
				<p className="mt-3 text-center text-xs text-muted-foreground">
					Klik untuk membalik kartu
				</p>
			)}
		</div>
	);
}
