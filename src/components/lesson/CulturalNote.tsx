import { Globe } from "lucide-react";

import { Card, Markdown } from "@/components/ui";

type CulturalNoteProps = {
	title: string;
	content: string;
};

export function CulturalNote({ title, content }: CulturalNoteProps) {
	return (
		<Card className="flex gap-3 rounded-l-none border-l-4 border-l-accent bg-accent/5">
			<div className="mt-0.5 text-accent-strong">
				<Globe size={18} />
			</div>
			<div className="space-y-1">
				<p className="font-semibold text-accent-strong">{title}</p>
				<Markdown content={content} className="text-foreground/80 text-sm space-y-1" />
			</div>
		</Card>
	);
}
