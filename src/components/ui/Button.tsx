"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant;
	size?: ButtonSize;
	isLoading?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		"bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring",
	secondary:
		"bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:ring-ring",
	ghost:
		"bg-transparent text-foreground hover:bg-muted focus-visible:ring-ring",
	danger:
		"bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-ring",
};

const sizeClasses: Record<ButtonSize, string> = {
	sm: "h-9 px-3 text-sm",
	md: "h-10 px-4 text-sm",
	lg: "h-12 px-6 text-base",
};

/**
 * Reusable button with variants, sizes, and loading state.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant = "primary",
			size = "md",
			isLoading = false,
			leftIcon,
			rightIcon,
			disabled,
			children,
			type,
			...props
		},
		ref
	) => {
		const isDisabled = disabled || isLoading;

		return (
			<button
				ref={ref}
				type={type ?? "button"}
				className={cn(
					"inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
					"disabled:pointer-events-none disabled:opacity-60",
					variantClasses[variant],
					sizeClasses[size],
					className
				)}
				disabled={isDisabled}
				aria-busy={isLoading}
				{...props}
			>
				{isLoading ? (
					<span
						className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
						aria-hidden
					/>
				) : (
					leftIcon
				)}
				<span>{children}</span>
				{!isLoading && rightIcon ? rightIcon : null}
			</button>
		);
	}
);

Button.displayName = "Button";
