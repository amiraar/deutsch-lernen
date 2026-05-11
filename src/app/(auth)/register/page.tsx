"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Brain, Layers, Mic } from "lucide-react";

import { Button, Input } from "@/components/ui";
import { trpc } from "@/lib/trpcClient";

export default function RegisterPage() {
	const router = useRouter();
	const registerMutation = trpc.auth.register.useMutation();

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [name, setName] = React.useState("");
	const [error, setError] = React.useState<string | null>(null);
	const [isLoggingIn, setIsLoggingIn] = React.useState(false);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setError(null);

		try {
			await registerMutation.mutateAsync({ email, password, name });
			setIsLoggingIn(true);
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});
			if (result?.error) {
				router.push("/login");
			} else {
				router.push("/dashboard");
			}
		} catch (err) {
			const raw = err instanceof Error ? err.message : "Unknown error";
			// tRPC wraps Zod validation errors as a JSON array string
			try {
				const parsed = JSON.parse(raw) as Array<{ message: string }>;
				if (Array.isArray(parsed) && parsed[0]?.message) {
					setError(parsed[0].message);
					return;
				}
			} catch {
				// not JSON, fall through
			}
			setError(raw);
		} finally {
			setIsLoggingIn(false);
		}
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
						<h2 className="text-3xl font-bold text-white">Mulai perjalananmu!</h2>
						<p className="mt-2 text-primary-foreground/70">
							Daftar gratis dan belajar bahasa Jerman hari ini.
						</p>
					</div>
					<ul className="space-y-4">
						{[
							{ icon: Brain, text: "AI Tutor dalam bahasa Indonesia" },
							{ icon: Layers, text: "Flashcards dengan sistem memori SM-2" },
							{ icon: Mic, text: "Latihan pelafalan bahasa Jerman" },
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
						<h1 className="text-2xl font-bold text-foreground">Buat akun</h1>
						<p className="mt-1 text-sm text-muted-foreground">
							Gratis selamanya. Tidak perlu kartu kredit.
						</p>
					</div>

					{error ? (
						<div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
							{error}
						</div>
					) : null}

					<form onSubmit={handleSubmit} className="space-y-5">
						<Input
							label="Nama"
							value={name}
							onChange={(e) => setName(e.target.value)}
							autoComplete="name"
							required
						/>
						<Input
							label="Email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoComplete="email"
							required
						/>
						<div className="flex flex-col gap-1">
							<Input
								label="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								showPasswordToggle
								autoComplete="new-password"
								required
							/>
							{password.length > 0 && (
								<ul className="mt-1 space-y-1">
									{[
										{ label: "Minimal 8 karakter", ok: password.length >= 8 },
										{ label: "Mengandung huruf kapital (A–Z)", ok: /[A-Z]/.test(password) },
										{ label: "Mengandung angka atau simbol", ok: /[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password) },
									].map(({ label, ok }) => (
										<li key={label} className={`flex items-center gap-2 text-xs ${ok ? "text-green-600" : "text-destructive"}`}>
											<span className={`inline-block h-1.5 w-1.5 rounded-full ${ok ? "bg-green-500" : "bg-destructive"}`} />
											{label}
										</li>
									))}
								</ul>
							)}
						</div>
						<Button
							type="submit"
							className="w-full"
							isLoading={registerMutation.isPending || isLoggingIn}
						>
							Buat Akun
						</Button>
					</form>

					<p className="text-center text-sm text-muted-foreground">
						Sudah punya akun?{" "}
						<Link href="/login" className="font-medium text-primary hover:underline">
							Masuk
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

