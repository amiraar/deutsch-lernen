"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	error?: string;
	hint?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	showPasswordToggle?: boolean;
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
		showPasswordToggle,
		id,
		disabled,
		type,
		...props
	}, ref) => {
		const generatedId = React.useId();
		const inputId = id ?? generatedId;
		const hintId = hint ? `${inputId}-hint` : undefined;
		const errorId = error ? `${inputId}-error` : undefined;
		const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

		const [showPassword, setShowPassword] = React.useState(false);

		const isPasswordField = type === "password";
		const resolvedType = isPasswordField && showPasswordToggle
			? (showPassword ? "text" : "password")
			: type;

		const toggleIcon = isPasswordField && showPasswordToggle ? (
			<button
				type="button"
				tabIndex={-1}
				aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
				onClick={() => setShowPassword((v) => !v)}
				className="text-muted-foreground hover:text-foreground focus:outline-none"
			>
				{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
			</button>
		) : null;

		const effectiveRightIcon = toggleIcon ?? (rightIcon ? <span className="text-muted-foreground">{rightIcon}</span> : null);

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
						"flex items-center gap-2 overflow-hidden rounded-md border bg-background px-3",
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
						type={resolvedType}
						className={cn(
							"h-10 w-full appearance-none border-0 bg-transparent text-sm text-foreground",
							"placeholder:text-muted-foreground outline-none focus:outline-none focus:ring-0"
						)}
						aria-invalid={!!error}
						aria-describedby={describedBy}
						disabled={disabled}
						{...props}
					/>
					{effectiveRightIcon}
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
