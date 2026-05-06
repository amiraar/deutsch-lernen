"use client";

import * as React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Brain, Layers, Mic } from "lucide-react";

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
			<div className="hidden w-1/2 flex-col justify-between bg-primary p-12 md:flex">
				<Link href="/" className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-xs font-bold text-white">
						DL
					</div>
					<span className="text-sm font-semibold text-white">Deutsch Lernen</span>
				</Link>
				<div className="space-y-8">
					<div>
						<h2 className="text-3xl font-bold text-white">
							Selamat datang kembali!
						</h2>
						<p className="mt-2 text-primary-foreground/70">
							Lanjutkan perjalanan belajarmu hari ini.
						</p>
					</div>
					<ul className="space-y-4">
						{[
							{ icon: Brain, text: "AI Tutor siap membantu kapan saja" },
							{ icon: Layers, text: "Review kartu dengan sistem SM-2" },
							{ icon: Mic, text: "Latihan pelafalan dengan rekaman suara" },
						].map(({ icon: Icon, text }) => (
							<li key={text} className="flex items-center gap-3 text-sm text-white/80">
								<div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
									<Icon size={14} />
								</div>
								{text}
							</li>
						))}
					</ul>
				</div>
				<p className="text-xs text-white/40">&copy; {new Date().getFullYear()} Deutsch Lernen</p>
			</div>

			{/* Right form panel */}
			<div className="flex flex-1 flex-col items-center justify-center bg-background px-8 py-12">
				<div className="w-full max-w-sm space-y-8">
					<div>
						<h1 className="text-2xl font-bold text-foreground">Masuk</h1>
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

