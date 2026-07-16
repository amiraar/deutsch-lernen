import { MaterialsHeader } from "@/components/materials/MaterialsHeader";
import { Card } from "@/components/ui";
import { VOCAB_THEMES } from "@/data/reference";

export default function KosakataPage() {
	return (
		<div className="space-y-10">
			<MaterialsHeader
				title="Kosakata Tematik"
				description="Kumpulan kata per tema untuk memperluas perbendaharaan katamu. Kata benda selalu dicantumkan dengan artikelnya — hafalkan bersama!"
			/>

			{/* Theme index */}
			<nav className="flex flex-wrap gap-2">
				{VOCAB_THEMES.map((theme) => (
					<a
						key={theme.id}
						href={`#${theme.id}`}
						className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
					>
						{theme.emoji} {theme.title}
					</a>
				))}
			</nav>

			{VOCAB_THEMES.map((theme) => (
				<section key={theme.id} id={theme.id} className="scroll-mt-6 space-y-4">
					<div>
						<h2 className="font-display text-2xl font-semibold text-foreground">
							{theme.emoji} {theme.title}
						</h2>
						<p className="mt-1 text-sm text-muted-foreground">{theme.description}</p>
					</div>

					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{theme.entries.map((entry) => (
							<Card key={entry.german} className="space-y-1 p-4">
								<p className="font-semibold text-primary">{entry.german}</p>
								<p className="text-sm text-muted-foreground">{entry.indonesian}</p>
								{entry.note ? (
									<p className="text-xs text-accent-strong">{entry.note}</p>
								) : null}
							</Card>
						))}
					</div>
				</section>
			))}
		</div>
	);
}
