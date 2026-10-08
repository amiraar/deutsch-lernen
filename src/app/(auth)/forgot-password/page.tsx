"use client";

import * as React from "react";
import Link from "next/link";

import { Button, Input } from "@/components/ui";
import { trpc } from "@/lib/trpcClient";

export default function ForgotPasswordPage() {
	const [email, setEmail] = React.useState("");
	const [isSent, setIsSent] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);
	const requestReset = trpc.auth.requestPasswordReset.useMutation();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setError(null);

		try {
			await requestReset.mutateAsync({ email });
			setIsSent(true);
		} catch (mutationError) {
			setError(
				mutationError instanceof Error
					? mutationError.message
					: "Gagal memproses permintaan."
			);
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background px-8 py-12">
			<div className="w-full max-w-sm space-y-8">
				<div>
					<h1 className="font-display text-3xl font-semibold text-foreground">
						Lupa password
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Masukkan email akunmu. Kami kirim tautan untuk membuat password baru.
					</p>
				</div>

				{error ? (
					<div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
						{error}
					</div>
				) : null}

				{isSent ? (
					<div className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground">
						Jika email tersebut terdaftar, tautan reset sudah dikirim. Tautan
						berlaku 30 menit. Cek juga folder spam.
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-5">
						<Input
							label="Email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoComplete="email"
							required
						/>
						<Button
							type="submit"
							className="w-full"
							isLoading={requestReset.isPending}
						>
							Kirim tautan reset
						</Button>
					</form>
				)}

				<p className="text-center text-sm text-muted-foreground">
					<Link href="/login" className="font-medium text-primary hover:underline">
						Kembali ke halaman masuk
					</Link>
				</p>
			</div>
		</div>
	);
}
