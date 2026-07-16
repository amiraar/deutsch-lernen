import { MaterialsHeader } from "@/components/materials/MaterialsHeader";
import { IRREGULAR_VERBS } from "@/data/reference";

export default function VerbenPage() {
	return (
		<div className="space-y-8">
			<MaterialsHeader
				title="Kata Kerja Tak Beraturan"
				description="Verba kuat terpenting dengan tiga bentuk utamanya. Verba dengan 'ist' di kolom Perfekt memakai kata bantu sein."
			/>

			<div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-border bg-muted/60">
							{["Infinitif", "Arti", "Präsens (er/sie/es)", "Präteritum", "Perfekt"].map(
								(header) => (
									<th
										key={header}
										className="whitespace-nowrap px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
									>
										{header}
									</th>
								)
							)}
						</tr>
					</thead>
					<tbody>
						{IRREGULAR_VERBS.map((verb) => (
							<tr
								key={verb.infinitive}
								className="border-b border-border transition-colors last:border-0 hover:bg-muted/30"
							>
								<td className="px-4 py-2.5 font-semibold text-primary">
									{verb.infinitive}
								</td>
								<td className="px-4 py-2.5 text-muted-foreground">
									{verb.indonesian}
								</td>
								<td className="px-4 py-2.5 text-foreground">{verb.praesens}</td>
								<td className="px-4 py-2.5 text-foreground">{verb.praeteritum}</td>
								<td className="px-4 py-2.5 text-foreground">{verb.perfekt}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="rounded-xl border border-accent/25 bg-accent/5 px-4 py-3 text-sm text-foreground/80">
				💡 Verba gerakan (gehen, fahren, kommen, fliegen...) dan perubahan keadaan
				(werden, bleiben) memakai <span className="font-semibold">sein</span> di
				Perfekt. Sisanya memakai <span className="font-semibold">haben</span>.
			</div>
		</div>
	);
}
