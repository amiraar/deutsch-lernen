import Link from "next/link";
import {
	Brain,
	Layers,
	Mic,
	ArrowRight,
	Zap,
	Target,
	Award,
	Library,
	CheckCircle2,
} from "lucide-react";

import { Badge, Button, Card } from "@/components/ui";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const FEATURES = [
	{
		icon: Brain,
		title: "AI Tutor Pribadi",
		description:
			"Tanyakan grammar, kosakata, dan latihan personal kapan saja. Dijawab dalam bahasa Indonesia.",
		color: "bg-violet-600/10 text-violet-700",
	},
	{
		icon: Layers,
		title: "Spaced Repetition",
		description:
			"Algoritma SM-2 memastikan kamu review kata tepat sebelum lupa — efisien dan berbasis sains.",
		color: "bg-emerald-600/10 text-emerald-700",
	},
	{
		icon: Mic,
		title: "Latihan Pelafalan",
		description:
			"Rekam suaramu, dengarkan contoh pelafalan asli, dan latih pengucapan bahasa Jerman.",
		color: "bg-amber-600/10 text-amber-700",
	},
	{
		icon: Library,
		title: "Perpustakaan Materi",
		description:
			"Tabel grammar, buku frasa per situasi, kata kerja tak beraturan, dan referensi lengkap lainnya.",
		color: "bg-cyan-700/10 text-cyan-800",
	},
];

const LEVELS = [
	{
		level: "A1" as const,
		label: "Pemula",
		description: "Salam, angka, warna, dan percakapan dasar sehari-hari.",
		topics: ["Hallo & Tschüss", "Zahlen 1–100", "Farben", "Familie"],
	},
	{
		level: "A2" as const,
		label: "Dasar",
		description: "Tata bahasa dasar, kata kerja beraturan, dan kalimat sederhana.",
		topics: ["Verben", "Präsens", "Akkusativ", "Wohnen"],
	},
	{
		level: "B1" as const,
		label: "Menengah",
		description: "Percakapan sehari-hari, opini, dan cerita masa lalu.",
		topics: ["Perfekt", "Modalverben", "Konjunktionen", "Reisen"],
	},
	{
		level: "B2" as const,
		label: "Mahir",
		description: "Diskusi kompleks, teks formal, dan nuansa bahasa.",
		topics: ["Konjunktiv II", "Passiv", "Nebensätze", "Beruf"],
	},
];

const STATS = [
	{ icon: Zap, value: "3 Provider AI", label: "Gemini · Groq · Claude" },
	{ icon: Target, value: "SM-2 SRS", label: "Algoritma hafalan terbukti" },
	{ icon: Award, value: "A1 → B2", label: "Kurikulum lengkap" },
];

const HERO_WORDS = [
	{ word: "Guten Tag!", translation: "selamat siang" },
	{ word: "der Apfel", translation: "apel" },
	{ word: "lernen", translation: "belajar" },
	{ word: "die Reise", translation: "perjalanan" },
];

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-background">
			<Navbar />

			<main>
				{/* Hero */}
				<section className="relative overflow-hidden">
					<div className="bg-paper-dots absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
					<div className="relative mx-auto max-w-6xl px-6 py-24 text-center">
						<Badge variant="B2" className="mb-6 inline-flex">
							Gratis · Untuk penutur bahasa Indonesia
						</Badge>
						<h1 className="mx-auto mb-6 max-w-3xl font-display text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
							Hallo! Belajar bahasa Jerman{" "}
							<span className="italic text-primary">dengan AI</span>
						</h1>
						<p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
							Kurikulum terstruktur A1–B2, flashcards berbasis sains memori, dan
							tutor AI yang siap menjawab pertanyaanmu dalam bahasa Indonesia.
						</p>
						<div className="flex flex-wrap justify-center gap-3">
							<Link href="/register">
								<Button size="lg" rightIcon={<ArrowRight size={18} />}>
									Mulai Belajar
								</Button>
							</Link>
							<Link href="/login">
								<Button variant="secondary" size="lg">
									Saya sudah punya akun
								</Button>
							</Link>
						</div>

						{/* Floating vocabulary chips */}
						<div className="mt-12 flex flex-wrap items-center justify-center gap-3">
							{HERO_WORDS.map(({ word, translation }) => (
								<span
									key={word}
									className="rounded-full border border-border bg-card px-4 py-1.5 text-sm shadow-sm"
								>
									<span className="font-semibold text-primary">{word}</span>
									<span className="text-muted-foreground"> · {translation}</span>
								</span>
							))}
						</div>

						{/* Stats strip */}
						<div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-6 rounded-3xl border border-border bg-card p-6 shadow-sm">
							{STATS.map(({ icon: Icon, value, label }) => (
								<div key={value} className="flex flex-col items-center gap-1">
									<Icon size={20} className="text-accent" />
									<p className="text-sm font-semibold text-foreground">{value}</p>
									<p className="text-xs text-muted-foreground">{label}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Features */}
				<section className="mx-auto max-w-6xl px-6 py-20">
					<h2 className="mb-3 text-center font-display text-3xl font-semibold text-foreground">
						Kenapa Deutsch Lernen?
					</h2>
					<p className="mb-12 text-center text-sm text-muted-foreground">
						Semua yang kamu butuhkan untuk konsisten belajar, di satu tempat.
					</p>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{FEATURES.map(({ icon: Icon, title, description, color }) => (
							<Card key={title} variant="elevated" className="space-y-4">
								<div className={`inline-flex rounded-2xl p-3 ${color}`}>
									<Icon size={24} />
								</div>
								<h3 className="text-base font-semibold text-foreground">{title}</h3>
								<p className="text-sm leading-relaxed text-muted-foreground">
									{description}
								</p>
							</Card>
						))}
					</div>
				</section>

				{/* Levels */}
				<section className="mx-auto max-w-6xl px-6 py-20">
					<h2 className="mb-3 text-center font-display text-3xl font-semibold text-foreground">
						Jalur belajar A1 sampai B2
					</h2>
					<p className="mb-12 text-center text-sm text-muted-foreground">
						Mulai dari nol, kembangkan kemampuan hingga percakapan profesional.
					</p>
					<div className="grid gap-4 md:grid-cols-2">
						{LEVELS.map(({ level, label, description, topics }, index) => (
							<Card key={level} variant="elevated" className="space-y-3">
								<div className="flex items-center gap-3">
									<span className="font-display text-2xl font-semibold text-border">
										0{index + 1}
									</span>
									<Badge variant={level}>{level}</Badge>
									<span className="text-sm font-semibold text-foreground">{label}</span>
								</div>
								<p className="text-sm text-muted-foreground">{description}</p>
								<div className="flex flex-wrap gap-2">
									{topics.map((topic) => (
										<span
											key={topic}
											className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
										>
											{topic}
										</span>
									))}
								</div>
							</Card>
						))}
					</div>
				</section>

				{/* CTA */}
				<section className="mx-auto max-w-6xl px-6 py-20">
					<div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 text-center">
						<div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
						<div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-primary/40 blur-3xl" />
						<div className="relative">
							<h2 className="mb-3 font-display text-3xl font-semibold text-white">
								Siap mulai belajar?
							</h2>
							<p className="mb-8 text-sm text-ink-muted">
								Daftar gratis dan mulai pelajaran pertamamu hari ini.
							</p>
							<div className="mb-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-ink-muted">
								{["Tanpa kartu kredit", "Kurikulum A1–B2", "AI Tutor bahasa Indonesia"].map(
									(item) => (
										<span key={item} className="inline-flex items-center gap-1.5">
											<CheckCircle2 size={14} className="text-accent" />
											{item}
										</span>
									)
								)}
							</div>
							<Link href="/register">
								<Button
									variant="accent"
									size="lg"
									rightIcon={<ArrowRight size={18} />}
								>
									Mulai Sekarang
								</Button>
							</Link>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
