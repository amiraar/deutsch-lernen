import { MaterialsHeader } from "@/components/materials/MaterialsHeader";
import { Card } from "@/components/ui";
import { PHRASE_CATEGORIES } from "@/data/reference";

export default function FrasaPage() {
	return (
		<div className="space-y-10">
			<MaterialsHeader
				title="Buku Frasa"
				description="Kalimat siap pakai untuk situasi nyata. Frasa formal dan santai ditandai di kolom catatan."
			/>

			{/* Category index */}
			<nav className="flex flex-wrap gap-2">
				{PHRASE_CATEGORIES.map((category) => (
					<a
						key={category.id}
						href={`#${category.id}`}
						className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
					>
						{category.emoji} {category.title}
					</a>
				))}
			</nav>

			{PHRASE_CATEGORIES.map((category) => (
				<section key={category.id} id={category.id} className="scroll-mt-6 space-y-4">
					<div>
						<h2 className="font-display text-2xl font-semibold text-foreground">
							{category.emoji} {category.title}
						</h2>
						<p className="mt-1 text-sm text-muted-foreground">
							{category.description}
						</p>
					</div>

					<Card className="divide-y divide-border p-0">
						{category.phrases.map((phrase) => (
							<div
								key={phrase.german}
								className="flex flex-col gap-1 px-5 py-3.5 transition-colors hover:bg-muted/30 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
							>
								<div className="min-w-0">
									<p className="font-semibold text-primary">{phrase.german}</p>
									<p className="text-sm text-muted-foreground">
										{phrase.indonesian}
									</p>
								</div>
								{phrase.note ? (
									<span className="flex-shrink-0 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent-strong">
										{phrase.note}
									</span>
								) : null}
							</div>
						))}
					</Card>
				</section>
			))}
		</div>
	);
}
