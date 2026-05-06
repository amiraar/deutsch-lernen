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
	const { toast, showToast, clearToast } = useToastMessage({ durationMs: 2500 });

	const handleSignOut = React.useCallback(async () => {
		if (isSigningOut) {
			return;
		}

		const confirmed = window.confirm(settings.confirmMessage);
		if (!confirmed) {
			return;
		}

		try {
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

	return { isSigningOut, toast, handleSignOut };
}
