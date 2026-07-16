"use client";

import * as React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Brain, Layers, Mic } from "lucide-react";

import { AuthBrandPanel } from "@/components/layout/AuthBrandPanel";
import { Button, Input } from "@/components/ui";

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
		<div className="flex min-h-screen">
			{/* Left brand panel */}
			<AuthBrandPanel
				germanPhrase="Willkommen zurück!"
				phraseTranslation="Selamat datang kembali!"
				heading="Lanjutkan perjalananmu"
				subheading="Streak dan kartu review-mu sudah menunggu."
				items={[
					{ icon: Brain, text: "AI Tutor siap membantu kapan saja" },
					{ icon: Layers, text: "Review kartu dengan sistem SM-2" },
					{ icon: Mic, text: "Latihan pelafalan dengan rekaman suara" },
				]}
			/>

			{/* Right form panel */}
			<div className="flex flex-1 flex-col items-center justify-center bg-background px-8 py-12">
				<div className="w-full max-w-sm space-y-8">
					<div>
						<h1 className="font-display text-3xl font-semibold text-foreground">Masuk</h1>
						<p className="mt-1 text-sm text-muted-foreground">
							Masukkan email dan password untuk melanjutkan.
						</p>
					</div>

					{error ? (
						<div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
							{error}
						</div>
					) : null}

					<form onSubmit={handleSubmit} className="space-y-5">
						<Input
							label="Email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoComplete="email"
							required
						/>
						<Input
							label="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							showPasswordToggle
							autoComplete="current-password"
							required
						/>
						<Button type="submit" className="w-full" isLoading={isLoading}>
							Masuk
						</Button>
					</form>

					<p className="text-center text-sm text-muted-foreground">
						Belum punya akun?{" "}
						<Link href="/register" className="font-medium text-primary hover:underline">
							Daftar gratis
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

