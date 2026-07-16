import Link from "next/link";

import { Button } from "@/components/ui";

/**
 * Top navigation bar for landing and auth pages.
 */
export function Navbar() {
	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
				<Link href="/" className="flex items-center gap-2.5">
					<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-sm font-bold text-accent">
						DL
					</div>
					<span className="font-display text-base font-semibold tracking-tight text-foreground">
						Deutsch Lernen
					</span>
				</Link>
				<div className="flex items-center gap-2">
					<Link href="/login">
						<Button variant="ghost" size="sm">Masuk</Button>
					</Link>
					<Link href="/register">
						<Button size="sm">Daftar Gratis</Button>
					</Link>
				</div>
			</div>
		</header>
	);
}
