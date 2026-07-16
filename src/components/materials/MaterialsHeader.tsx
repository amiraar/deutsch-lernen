import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Page header with back-link for Materi sub-pages.
 */
export function MaterialsHeader({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<div className="space-y-3">
			<Link
				href="/materials"
				className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			>
				<ArrowLeft size={15} />
				Semua materi
			</Link>
			<div>
				<h1 className="font-display text-3xl font-semibold text-foreground">
					{title}
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">{description}</p>
			</div>
		</div>
	);
}
