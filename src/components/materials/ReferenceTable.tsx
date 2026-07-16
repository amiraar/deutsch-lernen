import { Lightbulb } from "lucide-react";

import type { GrammarTable } from "@/data/reference";

/**
 * Renders one reference table (grammar, numbers, etc.) with optional tip.
 */
export function ReferenceTable({ table }: { table: GrammarTable }) {
	return (
		<section className="space-y-3">
			<div>
				<h3 className="font-display text-lg font-semibold text-foreground">
					{table.title}
				</h3>
				<p className="text-sm text-muted-foreground">{table.description}</p>
			</div>

			<div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-border bg-muted/60">
							{table.headers.map((header) => (
								<th
									key={header}
									className="whitespace-nowrap px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
								>
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{table.rows.map((row, i) => (
							<tr
								key={i}
								className="border-b border-border transition-colors last:border-0 hover:bg-muted/30"
							>
								{row.map((cell, j) => (
									<td
										key={j}
										className={
											j === 0
												? "px-4 py-2.5 font-medium text-foreground"
												: "px-4 py-2.5 text-muted-foreground"
										}
									>
										{cell}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{table.tip ? (
				<div className="flex items-start gap-2.5 rounded-xl border border-accent/25 bg-accent/5 px-4 py-3">
					<Lightbulb size={16} className="mt-0.5 flex-shrink-0 text-accent-strong" />
					<p className="text-sm text-foreground/80">{table.tip}</p>
				</div>
			) : null}
		</section>
	);
}
