"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

export type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	className?: string;
};

function getFocusableElements(container: HTMLElement): HTMLElement[] {
	const selector =
		"a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])";
	return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

/**
 * Accessible modal with focus trap and backdrop dismiss.
 */
export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
	const dialogRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		if (!isOpen || !dialogRef.current) {
			return;
		}

		const focusable = getFocusableElements(dialogRef.current);
		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		first?.focus();

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				event.preventDefault();
				onClose();
			}

			if (event.key === "Tab" && focusable.length > 0) {
				if (event.shiftKey && document.activeElement === first) {
					event.preventDefault();
					last?.focus();
				} else if (!event.shiftKey && document.activeElement === last) {
					event.preventDefault();
					first?.focus();
				}
			}
		}

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<button
				type="button"
				className="absolute inset-0 bg-foreground/40"
				aria-label="Close modal"
				onClick={onClose}
			/>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-label={title ?? "Dialog"}
				className={cn(
					"relative z-10 w-full max-w-lg rounded-lg bg-card p-6 text-card-foreground shadow-lg",
					className
				)}
			>
				<button
					type="button"
					aria-label="Tutup dialog"
					className="absolute right-4 top-4 rounded-sm p-1 text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
					onClick={onClose}
				>
					<X size={18} />
				</button>
				{title ? <h2 className="pr-6 text-lg font-semibold">{title}</h2> : null}
				<div className="mt-4">{children}</div>
			</div>
		</div>
	);
}
