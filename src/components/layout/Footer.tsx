import Link from "next/link";

/**
 * Footer for the landing page.
 */
export function Footer() {
	return (
		<footer className="border-t border-border bg-white">
			<div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
				<div className="flex items-center gap-2">
					<div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-[10px] font-bold text-primary-foreground">
						DL
					</div>
					<span className="text-sm font-medium text-foreground">Deutsch Lernen</span>
				</div>
				<p className="text-xs text-muted-foreground">
					&copy; {new Date().getFullYear()} Deutsch Lernen. Dibuat dengan ❤️ untuk pelajar bahasa.
				</p>
				<div className="flex gap-4 text-xs text-muted-foreground">
					<Link href="/login" className="hover:text-foreground transition-colors">Masuk</Link>
					<Link href="/register" className="hover:text-foreground transition-colors">Daftar</Link>
				</div>
			</div>
		</footer>
	);
}
