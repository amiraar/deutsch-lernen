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
	A1: "bg-indigo-100 text-indigo-700",
	A2: "bg-sky-100 text-sky-700",
	B1: "bg-violet-100 text-violet-700",
	B2: "bg-emerald-100 text-emerald-700",
	success: "bg-emerald-100 text-emerald-700",
	warning: "bg-amber-100 text-amber-700",
	error: "bg-rose-100 text-rose-700",
	neutral: "bg-slate-100 text-slate-600",
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