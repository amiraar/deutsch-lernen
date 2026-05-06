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
	A1: "bg-primary/10 text-primary",
	A2: "bg-secondary/10 text-secondary-foreground",
	B1: "bg-muted text-foreground",
	B2: "bg-accent/10 text-accent-foreground",
	success: "bg-success/10 text-success",
	warning: "bg-warning/10 text-warning",
	error: "bg-destructive/10 text-destructive",
	neutral: "bg-muted text-muted-foreground",
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
				"inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
				variantClasses[variant],
				className
			)}
			{...props}
		/>
	);
}
