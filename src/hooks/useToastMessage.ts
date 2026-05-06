"use client";

import * as React from "react";

type ToastVariant = "success" | "error";

type ToastState = {
	message: string;
	variant?: ToastVariant;
} | null;

type ToastOptions = {
	durationMs?: number;
};

export function useToastMessage(options: ToastOptions = {}) {
	const { durationMs = 3000 } = options;
	const [toast, setToast] = React.useState<ToastState>(null);
	const timerRef = React.useRef<number | null>(null);

	const clearToast = React.useCallback(() => {
		if (timerRef.current) {
			window.clearTimeout(timerRef.current);
			timerRef.current = null;
		}
		setToast(null);
	}, []);

	const showToast = React.useCallback(
		(message: string, variant: ToastVariant = "success") => {
			if (timerRef.current) {
				window.clearTimeout(timerRef.current);
				timerRef.current = null;
			}
			setToast({ message, variant });
			timerRef.current = window.setTimeout(() => {
				setToast(null);
				timerRef.current = null;
			}, durationMs);
		},
		[durationMs]
	);

	React.useEffect(() => () => clearToast(), [clearToast]);

	return { toast, showToast, clearToast };
}
