"use client";

import * as React from "react";

import { Button, Modal } from "@/components/ui";

type ConfirmDialogProps = {
	isOpen: boolean;
	title: string;
	description: string;
	confirmLabel?: string;
	cancelLabel?: string;
	variant?: "default" | "danger";
	onConfirm: () => void;
	onCancel: () => void;
};

export function ConfirmDialog({
	isOpen,
	title,
	description,
	confirmLabel = "Ya",
	cancelLabel = "Batal",
	variant = "default",
	onConfirm,
	onCancel,
}: ConfirmDialogProps) {
	const confirmVariant = variant === "danger" ? "danger" : "primary";

	return (
		<Modal isOpen={isOpen} onClose={onCancel} title={title}>
			<p className="text-sm text-muted-foreground">{description}</p>
			<div className="mt-6 flex justify-end gap-3">
				<Button variant="secondary" onClick={onCancel}>
					{cancelLabel}
				</Button>
				<Button variant={confirmVariant} onClick={onConfirm}>
					{confirmLabel}
				</Button>
			</div>
		</Modal>
	);
}
