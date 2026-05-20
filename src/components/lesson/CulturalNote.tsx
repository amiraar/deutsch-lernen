import { Globe } from "lucide-react";

import { Card, Markdown } from "@/components/ui";

type CulturalNoteProps = {
	title: string;
	content: string;
};

export function CulturalNote({ title, content }: CulturalNoteProps) {
	return (
		<Card className="flex gap-3 border-l-4 border-amber-400 bg-amber-50">
			<div className="mt-0.5 text-amber-700">
				<Globe size={18} />
			</div>
			<div className="space-y-1">
				<p className="font-bold text-amber-900">{title}</p>
				<Markdown content={content} className="text-amber-800 text-sm space-y-1" />
			</div>
		</Card>
	);
}
