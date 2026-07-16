import * as React from "react";

import { cn } from "@/lib/utils";

export type BadgeVariant =
	| "A1"
	| "A2"
	| "B1"
	| "B2"
	| "success"
	| "warning"
	| "error"
	| "neutral";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
	variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
	A1: "border-emerald-600/20 bg-emerald-600/10 text-emerald-800",
	A2: "border-cyan-700/20 bg-cyan-700/10 text-cyan-900",
	B1: "border-violet-600/20 bg-violet-600/10 text-violet-800",
	B2: "border-amber-600/25 bg-amber-600/10 text-amber-800",
	success: "border-emerald-600/20 bg-emerald-600/10 text-emerald-800",
	warning: "border-amber-600/25 bg-amber-600/10 text-amber-800",
	error: "border-rose-600/20 bg-rose-600/10 text-rose-800",
	neutral: "border-border bg-muted text-muted-foreground",
};

/**
 * Small label for status or level.
 */
export function Badge({
	variant = "neutral",
	className,
	...props
}: BadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide",
				variantClasses[variant],
				className
			)}
			{...props}
		/>
	);
}