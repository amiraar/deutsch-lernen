import * as React from "react";

import { cn } from "@/lib/utils";

export type LoadingSpinnerSize = "sm" | "md" | "lg";

export type LoadingSpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
	size?: LoadingSpinnerSize;
	label?: string;
};

const sizeClasses: Record<LoadingSpinnerSize, string> = {
	sm: "h-4 w-4",
	md: "h-6 w-6",
	lg: "h-8 w-8",
};

/**
 * Animated loading spinner.
 */
export function LoadingSpinner({
	size = "md",
	label = "Loading",
	className,
	...props
}: LoadingSpinnerProps) {
	return (
		<div
			role="status"
			aria-label={label}
			className={cn("inline-flex items-center", className)}
			{...props}
		>
			<span
				className={cn(
					"animate-spin rounded-full border-2 border-current border-t-transparent",
					sizeClasses[size]
				)}
			/>
		</div>
	);
}
