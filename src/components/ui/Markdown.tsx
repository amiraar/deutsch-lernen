import * as React from "react";
import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";

type MarkdownProps = {
	content: string;
	className?: string;
};

/**
 * Safe Markdown renderer with chat-friendly defaults.
 */
export function Markdown({ content, className }: MarkdownProps) {
	return (
		<ReactMarkdown
			className={cn(
				"space-y-2 text-sm leading-relaxed text-foreground",
				className
			)}
			components={{
				p: ({ children }) => (
					<p className="whitespace-pre-wrap text-inherit">{children}</p>
				),
				ul: ({ children }) => (
					<ul className="list-disc space-y-1.5 pl-5 marker:text-muted-foreground">
						{children}
					</ul>
				),
				ol: ({ children }) => (
					<ol className="list-decimal space-y-1.5 pl-5 marker:text-muted-foreground">
						{children}
					</ol>
				),
				li: ({ children }) => <li className="leading-relaxed">{children}</li>,
				code: ({ inline, children }) =>
					inline ? (
						<code className="rounded border border-border/60 bg-muted/60 px-1 py-0.5 font-mono text-[0.85em]">
							{children}
						</code>
					) : (
						<code className="font-mono text-[0.85em]">{children}</code>
					),
				pre: ({ children }) => (
					<pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/50 px-3 py-2 text-[0.85em] leading-relaxed">
						{children}
					</pre>
				),
				a: ({ children, href }) => (
					<a
						href={href}
						className="text-primary underline underline-offset-4"
						target="_blank"
						rel="noreferrer"
					>
						{children}
					</a>
				),
			}}
		>
			{content}
		</ReactMarkdown>
	);
}
