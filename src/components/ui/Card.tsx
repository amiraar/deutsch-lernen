import * as React from "react";

import { cn } from "@/lib/utils";

export type CardVariant = "default" | "elevated" | "colored";

export type CardProps<T extends React.ElementType = "div"> = {
	as?: T;
	variant?: CardVariant;
	className?: string;
	children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const variantClasses: Record<CardVariant, string> = {
	default: "border border-border bg-card text-card-foreground",
	elevated: "border border-border bg-card text-card-foreground shadow-sm",
	colored: "bg-muted text-foreground",
};

/**
 * Surface container with variant styling.
 */
export function Card<T extends React.ElementType = "div">({
	as,
	variant = "default",
	className,
	children,
	...props
}: CardProps<T>) {
	const Component = as ?? "div";

	return (
		<Component
			className={cn("rounded-lg p-4", variantClasses[variant], className)}
			{...props}
		>
			{children}
		</Component>
	);
}
