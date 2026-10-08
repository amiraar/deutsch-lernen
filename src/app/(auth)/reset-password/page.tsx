"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Button, Input, LoadingSpinner } from "@/components/ui";
import { trpc } from "@/lib/trpcClient";

function ResetPasswordForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token") ?? "";

	const [password, setPassword] = React.useState("");
	const [confirmation, setConfirmation] = React.useState("");
	const [error, setError] = React.useState<string | null>(null);
	const [isDone, setIsDone] = React.useState(false);
	const resetPassword = trpc.auth.resetPassword.useMutation();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setError(null);

		if (password !== confirmation) {
			setError("Konfirmasi password tidak sama.");
			return;
		}

		try {
			await resetPassword.mutateAsync({ token, password });
			setIsDone(true);
			// Every other session was signed out by the reset, so send them to login.
			window.setTimeout(() => router.push("/login"), 2000);
		} catch (mutationError) {
			setError(
				mutationError instanceof Error
					? mutationError.message
					: "Gagal mengatur ulang password."
			);
		}
	};

	if (!token) {
		return (
			<div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
				Tautan reset tidak lengkap. Minta tautan baru dari halaman lupa password.
			</div>
		);
	}

	if (isDone) {
		return (
			<div className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground">
				Password berhasil diubah. Mengarahkan ke halaman masuk...
			</div>
		);
	}

	return (
		<>
			{error ? (
				<div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
					{error}
				</div>
			) : null}

			<form onSubmit={handleSubmit} className="space-y-5">
				<Input
					label="Password baru"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					showPasswordToggle
					autoComplete="new-password"
					hint="Minimal 8 karakter."
					required
				/>
				<Input
					label="Ulangi password baru"
					type="password"
					value={confirmation}
					onChange={(e) => setConfirmation(e.target.value)}
					showPasswordToggle
					autoComplete="new-password"
					required
				/>
				<Button type="submit" className="w-full" isLoading={resetPassword.isPending}>
					Simpan password baru
				</Button>
			</form>
		</>
	);
}

export default function ResetPasswordPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background px-8 py-12">
			<div className="w-full max-w-sm space-y-8">
				<div>
					<h1 className="font-display text-3xl font-semibold text-foreground">
						Password baru
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Buat password baru untuk akunmu.
					</p>
				</div>

				<React.Suspense fallback={<LoadingSpinner label="Memuat" />}>
					<ResetPasswordForm />
				</React.Suspense>

				<p className="text-center text-sm text-muted-foreground">
					<Link href="/login" className="font-medium text-primary hover:underline">
						Kembali ke halaman masuk
					</Link>
				</p>
			</div>
		</div>
	);
}
