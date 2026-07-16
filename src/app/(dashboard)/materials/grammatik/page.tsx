import { MaterialsHeader } from "@/components/materials/MaterialsHeader";
import { ReferenceTable } from "@/components/materials/ReferenceTable";
import { GRAMMAR_TOPICS } from "@/data/reference";

export default function GrammatikPage() {
	return (
		<div className="space-y-10">
			<MaterialsHeader
				title="Grammatik"
				description="Referensi tata bahasa inti A1–B2. Gunakan sebagai contekan — tidak perlu dihafal sekaligus."
			/>

			{/* Topic index */}
			<nav className="flex flex-wrap gap-2">
				{GRAMMAR_TOPICS.map((topic) => (
					<a
						key={topic.id}
						href={`#${topic.id}`}
						className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
					>
						{topic.title}
					</a>
				))}
			</nav>

			{GRAMMAR_TOPICS.map((topic) => (
				<section key={topic.id} id={topic.id} className="scroll-mt-6 space-y-6">
					<div className="border-l-4 border-accent pl-4">
						<h2 className="font-display text-2xl font-semibold text-foreground">
							{topic.title}
						</h2>
						<p className="mt-1 max-w-2xl text-sm text-muted-foreground">
							{topic.intro}
						</p>
					</div>
					{topic.tables.map((table) => (
						<ReferenceTable key={table.title} table={table} />
					))}
				</section>
			))}
		</div>
	);
}
