import * as React from "react";

import { cn } from "@/lib/utils";

export type ToastProps = React.HTMLAttributes<HTMLDivElement> & {
	message: string;
	variant?: "success" | "error";
};

/**
 * Small floating toast for short status messages.
 */
export function Toast({
	message,
	variant = "success",
	className,
	...props
}: ToastProps) {
	const variantClasses =
		variant === "error"
			? "bg-destructive text-destructive-foreground"
			: "bg-foreground text-background";

	return (
		<div
			className={cn(
				"fixed bottom-6 right-6 z-50 rounded-md px-4 py-2 text-sm shadow-lg",
				variantClasses,
				className
			)}
			role="status"
			aria-live="polite"
			{...props}
		>
			{message}
		</div>
	);
}
