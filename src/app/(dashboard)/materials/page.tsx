import Link from "next/link";
import {
	BookMarked,
	MessageSquareQuote,
	Repeat,
	Hash,
	Shapes,
	ArrowRight,
} from "lucide-react";

import { Card } from "@/components/ui";
import {
	GRAMMAR_TOPICS,
	IRREGULAR_VERBS,
	NUMBER_TABLES,
	PHRASE_CATEGORIES,
	VOCAB_THEMES,
} from "@/data/reference";

const SECTIONS = [
	{
		href: "/materials/grammatik",
		icon: BookMarked,
		title: "Grammatik",
		description:
			"Tabel artikel, kasus, konjugasi, preposisi, dan struktur kalimat — semua di satu tempat.",
		meta: `${GRAMMAR_TOPICS.length} topik`,
		color: "bg-violet-600/10 text-violet-700",
	},
	{
		href: "/materials/frasa",
		icon: MessageSquareQuote,
		title: "Buku Frasa",
		description:
			"Kalimat siap pakai untuk restoran, belanja, perjalanan, darurat, dan situasi formal.",
		meta: `${PHRASE_CATEGORIES.reduce((n, c) => n + c.phrases.length, 0)} frasa`,
		color: "bg-emerald-600/10 text-emerald-700",
	},
	{
		href: "/materials/verben",
		icon: Repeat,
		title: "Kata Kerja Tak Beraturan",
		description:
			"Daftar verba kuat terpenting dengan Präsens, Präteritum, dan Perfekt.",
		meta: `${IRREGULAR_VERBS.length} verba`,
		color: "bg-cyan-700/10 text-cyan-800",
	},
	{
		href: "/materials/zahlen",
		icon: Hash,
		title: "Angka & Waktu",
		description:
			"Cara membaca angka, tanggal, hari, bulan, dan jam — termasuk jebakan 'halb zehn'.",
		meta: `${NUMBER_TABLES.length} tabel`,
		color: "bg-amber-600/10 text-amber-700",
	},
	{
		href: "/materials/kosakata",
		icon: Shapes,
		title: "Kosakata Tematik",
		description:
			"Kumpulan kata per tema: keluarga, warna, tubuh, cuaca, dan lainnya.",
		meta: `${VOCAB_THEMES.length} tema`,
		color: "bg-rose-600/10 text-rose-700",
	},
];

export default function MaterialsPage() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="font-display text-3xl font-semibold text-foreground">
					Materi
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Perpustakaan referensi untuk memperkaya belajarmu — buka kapan saja,
					tanpa harus menyelesaikan pelajaran dulu.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				{SECTIONS.map(({ href, icon: Icon, title, description, meta, color }) => (
					<Link key={href} href={href}>
						<Card
							variant="elevated"
							className="group flex h-full flex-col gap-4 transition hover:-translate-y-0.5 hover:border-primary/40"
						>
							<div className="flex items-start justify-between">
								<div className={`inline-flex rounded-2xl p-3 ${color}`}>
									<Icon size={22} />
								</div>
								<span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
									{meta}
								</span>
							</div>
							<div className="flex-1 space-y-1.5">
								<h2 className="font-display text-lg font-semibold text-foreground">
									{title}
								</h2>
								<p className="text-sm leading-relaxed text-muted-foreground">
									{description}
								</p>
							</div>
							<span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
								Buka
								<ArrowRight
									size={15}
									className="transition-transform group-hover:translate-x-0.5"
								/>
							</span>
						</Card>
					</Link>
				))}
			</div>

			<Card className="border-primary/20 bg-primary/5">
				<p className="text-sm text-foreground/80">
					💬 Menemukan sesuatu yang membingungkan? Tanyakan langsung ke{" "}
					<Link href="/tutor" className="font-semibold text-primary hover:underline">
						AI Tutor
					</Link>{" "}
					— dia bisa menjelaskan semua materi di sini dalam bahasa Indonesia.
				</p>
			</Card>
		</div>
	);
}
