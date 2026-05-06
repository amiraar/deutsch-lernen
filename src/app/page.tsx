import Link from "next/link";

import { Badge, Button, Card } from "@/components/ui";

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
			<header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
				<div>
					<p className="text-xs uppercase tracking-[0.3em] text-slate-500">
						Deutsch Lernen
					</p>
				</div>
				<div className="flex items-center gap-3">
					<Link href="/login">
						<Button variant="ghost">Masuk</Button>
					</Link>
					<Link href="/register">
						<Button>Daftar</Button>
					</Link>
				</div>
			</header>

			<main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 pb-20">
				<section className="grid items-center gap-10 md:grid-cols-2">
					<div className="space-y-6">
						<Badge variant="A1">Belajar dari nol</Badge>
						<h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">
							Belajar Bahasa Jerman dengan AI
						</h1>
						<p className="text-lg text-slate-600">
							Kurikulum terstruktur, flashcards berbasis sains memori, dan tutor
							AI yang responsif.
						</p>
						<div className="flex flex-wrap gap-3">
							<Link href="/register">
								<Button size="lg">Mulai Belajar</Button>
							</Link>
							<Link href="/login">
								<Button variant="secondary" size="lg">
									Saya sudah punya akun
								</Button>
							</Link>
						</div>
					</div>
					<div className="grid gap-4">
						<Card className="bg-white">
							<h3 className="text-sm font-semibold text-foreground">AI Tutor</h3>
							<p className="text-sm text-muted-foreground">
								Tanyakan grammar, kosakata, dan latihan personal.
							</p>
						</Card>
						<Card className="bg-white">
							<h3 className="text-sm font-semibold text-foreground">
								Spaced Repetition
							</h3>
							<p className="text-sm text-muted-foreground">
								Review kata-kata penting tepat sebelum lupa.
							</p>
						</Card>
						<Card className="bg-white">
							<h3 className="text-sm font-semibold text-foreground">
								Pronunciation Check
							</h3>
							<p className="text-sm text-muted-foreground">
								Latihan pelafalan dengan umpan balik instan.
							</p>
						</Card>
					</div>
				</section>

				<section className="grid gap-6 md:grid-cols-3">
					<Card className="space-y-2">
						<h3 className="text-sm font-semibold text-foreground">
							Flashcards SRS
						</h3>
						<p className="text-sm text-muted-foreground">
							Sistem SM-2 menjaga ingatan tetap tajam.
						</p>
					</Card>
					<Card className="space-y-2">
						<h3 className="text-sm font-semibold text-foreground">AI Tutor</h3>
						<p className="text-sm text-muted-foreground">
							Jelaskan grammar dengan bahasa Indonesia.
						</p>
					</Card>
					<Card className="space-y-2">
						<h3 className="text-sm font-semibold text-foreground">
							Pronunciation
						</h3>
						<p className="text-sm text-muted-foreground">
							Latihan berbicara dengan latihan suara.
						</p>
					</Card>
				</section>

				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-foreground">
						Level A1 sampai B2
					</h2>
					<div className="flex flex-wrap gap-3">
						{(["A1", "A2", "B1", "B2"] as const).map((level) => (
							<Badge key={level} variant={level}>
								{level}
							</Badge>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}
