"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "./Button";

export type EmptyStateAction = {
	label: string;
	href?: string;
	onClick?: () => void;
};

export type EmptyStateProps = {
	icon: React.ReactNode;
	title: string;
	description: string;
	action?: EmptyStateAction;
};

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
	const actionButton = action ? (
		<Button variant="secondary" onClick={action.onClick}>
			{action.label}
		</Button>
	) : null;

	return (
		<div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
			<div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
				{icon}
			</div>
			<div className="space-y-1">
				<h3 className="text-lg font-semibold text-foreground">{title}</h3>
				<p className="mx-auto max-w-xs text-sm text-muted-foreground">
					{description}
				</p>
			</div>
			{action?.href ? <Link href={action.href}>{actionButton}</Link> : actionButton}
		</div>
	);
}
