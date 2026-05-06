"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button, Card, Input } from "@/components/ui";
import { trpc } from "@/lib/trpcClient";

export default function RegisterPage() {
	const router = useRouter();
	const registerMutation = trpc.auth.register.useMutation();

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [name, setName] = React.useState("");
	const [error, setError] = React.useState<string | null>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setError(null);

		try {
			await registerMutation.mutateAsync({ email, password, name });
			router.push("/login");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Unknown error";
			setError(message);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
			<Card className="w-full max-w-md space-y-6">
				<div>
					<h1 className="text-xl font-semibold text-foreground">Daftar</h1>
					<p className="text-sm text-muted-foreground">
						Buat akun untuk mulai belajar
					</p>
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						label="Nama"
						value={name}
						onChange={(event) => setName(event.target.value)}
						error={error ?? undefined}
					/>
					<Input
						label="Email"
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						error={error ?? undefined}
					/>
					<Input
						label="Password"
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						error={error ?? undefined}
					/>
					<Button type="submit" isLoading={registerMutation.isLoading}>
						Daftar
					</Button>
				</form>
			</Card>
		</div>
	);
}
