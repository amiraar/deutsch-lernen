"use client";

import * as React from "react";
import { signOut } from "next-auth/react";

import { useToastMessage } from "@/hooks/useToastMessage";

type LogoutOptions = {
	callbackUrl?: string;
	confirmMessage?: string;
	successMessage?: string;
	errorMessage?: string;
	delayMs?: number;
};

const DEFAULTS: Required<LogoutOptions> = {
	callbackUrl: "/login",
	confirmMessage: "Yakin ingin keluar?",
	successMessage: "Berhasil keluar. Mengalihkan...",
	errorMessage: "Gagal keluar. Coba lagi.",
	delayMs: 800,
};

export function useLogoutWithToast(options: LogoutOptions = {}) {
	const settings = { ...DEFAULTS, ...options };
	const [isSigningOut, setIsSigningOut] = React.useState(false);
	const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
	const { toast, showToast, clearToast } = useToastMessage({ durationMs: 2500 });

	const requestSignOut = React.useCallback(() => {
		setIsConfirmOpen(true);
	}, []);

	const cancelSignOut = React.useCallback(() => {
		setIsConfirmOpen(false);
	}, []);

	const handleSignOut = React.useCallback(async () => {
		if (isSigningOut) {
			return;
		}

		try {
			setIsConfirmOpen(false);
			setIsSigningOut(true);
			clearToast();
			const result = await signOut({
				callbackUrl: settings.callbackUrl,
				redirect: false,
			});
			showToast(settings.successMessage, "success");
			const targetUrl = result?.url ?? settings.callbackUrl;
			window.setTimeout(() => {
				window.location.href = targetUrl;
			}, settings.delayMs);
		} catch {
			showToast(settings.errorMessage, "error");
		} finally {
			setIsSigningOut(false);
		}
	}, [clearToast, isSigningOut, settings, showToast]);

	return { isSigningOut, isConfirmOpen, toast, requestSignOut, handleSignOut, cancelSignOut };
}
