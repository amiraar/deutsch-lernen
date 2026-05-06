import Link from "next/link";
import { Brain, Layers, Mic, ArrowRight, Zap, Target, Award } from "lucide-react";

import { Badge, Button, Card } from "@/components/ui";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const FEATURES = [
	{
		icon: Brain,
		title: "AI Tutor Pribadi",
		description:
			"Tanyakan grammar, kosakata, dan latihan personal kapan saja. Dijawab dalam bahasa Indonesia.",
		color: "bg-violet-50 text-violet-600",
	},
	{
		icon: Layers,
		title: "Spaced Repetition",
		description:
			"Algoritma SM-2 memastikan kamu review kata tepat sebelum lupa — efisien dan berbasis sains.",
		color: "bg-emerald-50 text-emerald-600",
	},
	{
		icon: Mic,
		title: "Latihan Pelafalan",
		description:
			"Rekam suaramu, dengarkan contoh pelafalan asli, dan latih pengucapan bahasa Jerman.",
		color: "bg-amber-50 text-amber-600",
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

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-background">
			<Navbar />

			<main className="mx-auto max-w-5xl px-6">
				{/* Hero */}
				<section className="py-20 text-center">
					<Badge variant="A1" className="mb-6 inline-flex">
						Mulai belajar gratis
					</Badge>
					<h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground md:text-6xl">
						Belajar Bahasa Jerman{" "}
						<span className="text-primary">dengan AI</span>
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

					{/* Stats strip */}
					<div className="mt-16 grid grid-cols-3 gap-6 rounded-2xl border border-border bg-card p-6">
						{STATS.map(({ icon: Icon, value, label }) => (
							<div key={value} className="flex flex-col items-center gap-1">
								<Icon size={20} className="text-primary" />
								<p className="text-sm font-semibold text-foreground">{value}</p>
								<p className="text-xs text-muted-foreground">{label}</p>
							</div>
						))}
					</div>
				</section>

				{/* Features */}
				<section className="py-16">
					<h2 className="mb-10 text-center text-2xl font-bold text-foreground">
						Kenapa Deutsch Lernen?
					</h2>
					<div className="grid gap-6 md:grid-cols-3">
						{FEATURES.map(({ icon: Icon, title, description, color }) => (
							<Card key={title} variant="elevated" className="space-y-4">
								<div className={`inline-flex rounded-xl p-3 ${color}`}>
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
				<section className="py-16">
					<h2 className="mb-3 text-center text-2xl font-bold text-foreground">
						Level A1 sampai B2
					</h2>
					<p className="mb-10 text-center text-sm text-muted-foreground">
						Mulai dari nol, kembangkan kemampuan hingga percakapan profesional.
					</p>
					<div className="grid gap-4 md:grid-cols-2">
						{LEVELS.map(({ level, label, description, topics }) => (
							<Card key={level} className="space-y-3">
								<div className="flex items-center gap-3">
									<Badge variant={level}>{level}</Badge>
									<span className="text-sm font-semibold text-foreground">{label}</span>
								</div>
								<p className="text-sm text-muted-foreground">{description}</p>
								<div className="flex flex-wrap gap-2">
									{topics.map((topic) => (
										<span
											key={topic}
											className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
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
				<section className="py-16 text-center">
					<div className="rounded-2xl bg-primary px-8 py-12">
						<h2 className="mb-3 text-2xl font-bold text-primary-foreground">
							Siap mulai belajar?
						</h2>
						<p className="mb-8 text-sm text-primary-foreground/80">
							Daftar gratis dan mulai pelajaran pertamamu hari ini.
						</p>
						<Link href="/register">
							<Button
								variant="secondary"
								size="lg"
								rightIcon={<ArrowRight size={18} />}
							>
								Mulai Sekarang
							</Button>
						</Link>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
