import * as React from "react";

import { cn } from "@/lib/utils";

export type ChatBubbleProps = React.HTMLAttributes<HTMLDivElement> & {
	isUser?: boolean;
};

/**
 * Small bubble for chat messages.
 */
export function ChatBubble({ isUser, className, ...props }: ChatBubbleProps) {
	return (
		<div
			className={cn(
				"rounded-lg px-3 py-2 text-sm",
				isUser ? "bg-primary text-primary-foreground" : "bg-card text-foreground",
				className
			)}
			{...props}
		/>
	);
}
