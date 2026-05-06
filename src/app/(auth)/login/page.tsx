"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button, Card, Input } from "@/components/ui";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState<string | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setError(null);
		setIsLoading(true);

		const result = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		setIsLoading(false);

		if (result?.error) {
			setError("Email atau password salah.");
			return;
		}

		router.push("/dashboard");
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
			<Card className="w-full max-w-md space-y-6">
				<div>
					<h1 className="text-xl font-semibold text-foreground">Masuk</h1>
					<p className="text-sm text-muted-foreground">
						Selamat datang kembali di Deutsch Lernen
					</p>
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
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
					<Button type="submit" isLoading={isLoading}>
						Masuk
					</Button>
				</form>
			</Card>
		</div>
	);
}
