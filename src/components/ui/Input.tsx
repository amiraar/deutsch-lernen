"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	error?: string;
	hint?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
};

/**
 * Text input with label, hint, and error display.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({
		className,
		label,
		error,
		hint,
		leftIcon,
		rightIcon,
		id,
		disabled,
		...props
	}, ref) => {
		const generatedId = React.useId();
		const inputId = id ?? generatedId;
		const hintId = hint ? `${inputId}-hint` : undefined;
		const errorId = error ? `${inputId}-error` : undefined;
		const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

		return (
			<div className="flex flex-col gap-1">
				{label ? (
					<label
						htmlFor={inputId}
						className="text-sm font-medium text-foreground"
					>
						{label}
					</label>
				) : null}
				<div
					className={cn(
						"flex items-center gap-2 rounded-md border bg-background px-3",
						"focus-within:ring-2 focus-within:ring-ring",
						error ? "border-destructive" : "border-input",
						disabled ? "opacity-60" : "",
						className
					)}
				>
					{leftIcon ? <span className="text-muted-foreground">{leftIcon}</span> : null}
					<input
						ref={ref}
						id={inputId}
						className={cn(
							"h-10 w-full bg-transparent text-sm text-foreground",
							"placeholder:text-muted-foreground focus:outline-none"
						)}
						aria-invalid={!!error}
						aria-describedby={describedBy}
						disabled={disabled}
						{...props}
					/>
					{rightIcon ? (
						<span className="text-muted-foreground">{rightIcon}</span>
					) : null}
				</div>
				{hint ? (
					<p id={hintId} className="text-xs text-muted-foreground">
						{hint}
					</p>
				) : null}
				{error ? (
					<p id={errorId} className="text-xs text-destructive">
						{error}
					</p>
				) : null}
			</div>
		);
	}
);

Input.displayName = "Input";
