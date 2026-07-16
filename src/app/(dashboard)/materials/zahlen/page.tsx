import { MaterialsHeader } from "@/components/materials/MaterialsHeader";
import { ReferenceTable } from "@/components/materials/ReferenceTable";
import { NUMBER_TABLES } from "@/data/reference";

export default function ZahlenPage() {
	return (
		<div className="space-y-8">
			<MaterialsHeader
				title="Angka & Waktu"
				description="Cara membaca angka, tanggal, dan jam dalam bahasa Jerman — termasuk pola 'terbalik' yang khas."
			/>

			{NUMBER_TABLES.map((table) => (
				<ReferenceTable key={table.title} table={table} />
			))}
		</div>
	);
}
