import Link from "next/link";

import { Button } from "@/components/ui";

/**
 * Top navigation bar for landing and auth pages.
 */
export function Navbar() {
	return (
		<header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-sm">
			<div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
				<Link href="/" className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
						DL
					</div>
					<span className="text-sm font-semibold tracking-wide text-foreground">
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
