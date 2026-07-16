import Link from "next/link";

/**
 * Footer for the landing page.
 */
export function Footer() {
	return (
		<footer className="bg-ink text-ink-foreground">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
				<div className="flex items-center gap-2.5">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-foreground">
						DL
					</div>
					<span className="font-display text-sm font-semibold text-white">
						Deutsch Lernen
					</span>
				</div>
				<p className="text-xs text-ink-muted">
					&copy; {new Date().getFullYear()} Deutsch Lernen. Dibuat dengan ❤️ untuk pelajar bahasa.
				</p>
				<div className="flex gap-5 text-xs text-ink-muted">
					<Link href="/login" className="transition-colors hover:text-white">Masuk</Link>
					<Link href="/register" className="transition-colors hover:text-white">Daftar</Link>
				</div>
			</div>
		</footer>
	);
}
