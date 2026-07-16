import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export type AuthBrandPanelProps = {
	heading: string;
	subheading: string;
	germanPhrase: string;
	phraseTranslation: string;
	items: { icon: LucideIcon; text: string }[];
};

/**
 * Dark brand panel shared by the login and register pages.
 */
export function AuthBrandPanel({
	heading,
	subheading,
	germanPhrase,
	phraseTranslation,
	items,
}: AuthBrandPanelProps) {
	return (
		<div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-ink p-12 md:flex">
			<div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
			<div className="absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

			<Link href="/" className="relative flex items-center gap-2.5">
				<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-accent-foreground">
					DL
				</div>
				<span className="font-display text-base font-semibold text-white">
					Deutsch Lernen
				</span>
			</Link>

			<div className="relative space-y-10">
				<div>
					<p className="mb-4 font-display text-5xl font-semibold italic text-accent">
						{germanPhrase}
					</p>
					<p className="text-sm text-ink-muted">— {phraseTranslation}</p>
				</div>
				<div>
					<h2 className="font-display text-3xl font-semibold text-white">
						{heading}
					</h2>
					<p className="mt-2 text-ink-muted">{subheading}</p>
				</div>
				<ul className="space-y-4">
					{items.map(({ icon: Icon, text }) => (
						<li
							key={text}
							className="flex items-center gap-3 text-sm text-ink-foreground/90"
						>
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
								<Icon size={15} className="text-accent" />
							</div>
							{text}
						</li>
					))}
				</ul>
			</div>

			<p className="relative text-xs text-ink-muted/70">
				&copy; {new Date().getFullYear()} Deutsch Lernen
			</p>
		</div>
	);
}
