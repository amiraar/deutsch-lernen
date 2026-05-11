"use client";

import * as React from "react";

import type { LessonContent } from "@/types/lesson-content";
import { CulturalNote } from "@/components/lesson/CulturalNote";
import { Card } from "@/components/ui";

type LessonContentProps = {
	content: LessonContent;
	title: string;
	description: string;
};

export function LessonContentView({ content, title, description }: LessonContentProps) {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-foreground">{title}</h1>
				<p className="mt-1 text-sm text-muted-foreground">{description}</p>
			</div>

			<Card className="p-4">
				<p className="text-sm text-foreground leading-relaxed">{content.introduction}</p>
			</Card>

			{content.sections.map((section, i) => (
				<div key={i} className="space-y-3">
					<h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
					<p className="text-sm text-muted-foreground leading-relaxed">{section.explanation}</p>

					<div className="overflow-x-auto rounded-lg border border-border">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-border bg-muted/50">
									<th className="px-4 py-2 text-left font-medium text-muted-foreground">
										Bahasa Jerman
									</th>
									<th className="px-4 py-2 text-left font-medium text-muted-foreground">
										Bahasa Indonesia
									</th>
									<th className="hidden px-4 py-2 text-left font-medium text-muted-foreground sm:table-cell">
										Catatan
									</th>
								</tr>
							</thead>
							<tbody>
								{section.examples.map((ex, j) => (
									<tr
										key={j}
										className="border-b border-border last:border-0 transition-colors hover:bg-muted/30"
									>
										<td className="px-4 py-2.5 font-medium text-foreground">{ex.german}</td>
										<td className="px-4 py-2.5 text-muted-foreground">{ex.indonesian}</td>
										<td className="hidden px-4 py-2.5 text-xs text-muted-foreground sm:table-cell">
											{ex.note ?? "—"}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{section.culturalNote ? (
						<CulturalNote
							title={section.culturalNote.title}
							content={section.culturalNote.content}
						/>
					) : null}

					{section.tip ? (
						<div className="rounded-lg border border-primary/20 bg-primary/10 px-4 py-3">
							<p className="text-sm font-medium text-primary">💡 {section.tip}</p>
						</div>
					) : null}
				</div>
			))}

			<Card className="bg-muted/30 p-4">
				<h3 className="mb-2 font-semibold text-foreground">Ringkasan</h3>
				<ul className="space-y-1.5">
					{content.summary.map((point, i) => (
						<li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
							<span className="mt-0.5 text-primary">✓</span>
							<span>{point}</span>
						</li>
					))}
				</ul>
			</Card>
		</div>
	);
}
