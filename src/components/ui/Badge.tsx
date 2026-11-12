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
	A1: "border-level-a1/20 bg-level-a1/10 text-level-a1",
	A2: "border-level-a2/20 bg-level-a2/10 text-level-a2",
	B1: "border-level-b1/20 bg-level-b1/10 text-level-b1",
	B2: "border-level-b2/20 bg-level-b2/10 text-level-b2",
	success: "border-success/20 bg-success/10 text-success",
	warning: "border-warning/20 bg-warning/10 text-warning",
	error: "border-destructive/20 bg-destructive/10 text-destructive",
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