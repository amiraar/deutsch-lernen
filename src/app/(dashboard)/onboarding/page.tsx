"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Layers, Sparkles } from "lucide-react";

import { Button, Card } from "@/components/ui";
import { trpc } from "@/lib/trpcClient";
import type { Level } from "@/types";

type Step = 1 | 2 | 3;

type Feature = {
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string; size?: number }>;
};

type LevelOption = {
	label: string;
	value: string;
};

const FEATURES: Feature[] = [
	{
		title: "Lesson",
		description: "Belajar materi terstruktur dari dasar.",
		icon: BookOpen,
	},
	{
		title: "Flashcard",
		description: "Ingat kosa kata dengan latihan harian.",
		icon: Layers,
	},
	{
		title: "AI Tutor",
		description: "Tanya jawab cepat kapan saja.",
		icon: Sparkles,
	},
];

const LEVEL_OPTIONS: LevelOption[] = [
	{ label: "Belum pernah belajar", value: "A1" },
	{ label: "Sudah tahu dasar-dasarnya", value: "A2" },
	{ label: "Sudah belajar beberapa waktu", value: "B1" },
];

export default function OnboardingPage() {
	const router = useRouter();
	const [step, setStep] = React.useState<Step>(1);
	const [selectedLevel, setSelectedLevel] = React.useState("");

	const updateLevel = trpc.auth.updateLevel.useMutation();

	const handleSelectLevel = (level: string) => {
		setSelectedLevel(level);
		setStep(3);
	};

	const handleFinish = async () => {
		if (!selectedLevel) return;
		await updateLevel.mutateAsync({ level: selectedLevel as Level });
		router.push("/dashboard");
	};

	return (
		<div className="flex min-h-[70vh] items-center justify-center px-4">
			<Card variant="elevated" className="w-full max-w-md space-y-6">
				{step === 1 ? (
					<div className="space-y-4">
						<div>
							<h1 className="text-2xl font-bold text-foreground">
								Selamat datang di Deutsch Lernen! 🎉
							</h1>
							<p className="mt-2 text-sm text-muted-foreground">
								Semua yang kamu butuhkan untuk belajar bahasa Jerman ada di sini.
							</p>
						</div>
						<div className="space-y-3">
							{FEATURES.map((feature) => {
								const Icon = feature.icon;
								return (
									<div
										key={feature.title}
										className="flex items-start gap-3 rounded-md border border-border p-3"
									>
										<Icon className="mt-0.5 text-primary" size={18} />
										<div>
											<p className="text-sm font-semibold text-foreground">
												{feature.title}
											</p>
											<p className="text-xs text-muted-foreground">
												{feature.description}
											</p>
										</div>
									</div>
								);
							})}
						</div>
						<Button className="w-full" size="lg" onClick={() => setStep(2)}>
							Mulai →
						</Button>
					</div>
				) : null}

				{step === 2 ? (
					<div className="space-y-4">
						<div>
							<h2 className="text-xl font-semibold text-foreground">
								Seberapa familiar kamu dengan bahasa Jerman?
							</h2>
							<p className="mt-2 text-sm text-muted-foreground">
								Pilih salah satu agar kami menyesuaikan level awalmu.
							</p>
						</div>
						<div className="space-y-3">
							{LEVEL_OPTIONS.map((option) => {
								const isSelected = selectedLevel === option.value;
								return (
									<Button
										key={option.value}
										variant="secondary"
										className={`w-full justify-between border ${
											isSelected
												? "border-primary bg-primary/10 text-primary"
												: "border-border"
										}`}
										onClick={() => handleSelectLevel(option.value)}
									>
										<span>{option.label}</span>
										<span className="text-xs font-semibold">{option.value}</span>
									</Button>
								);
							})}
						</div>
					</div>
				) : null}

				{step === 3 ? (
					<div className="space-y-4">
						<div>
							<h2 className="text-xl font-semibold text-foreground">
								Konfirmasi level awalmu
							</h2>
							<p className="mt-2 text-sm text-muted-foreground">
								Level yang dipilih: {selectedLevel || "-"}
							</p>
						</div>
						<div className="rounded-md border border-border bg-muted/40 px-4 py-3">
							<p className="text-sm text-muted-foreground">
								Kamu bisa mengubah level ini kapan saja di profil.
							</p>
						</div>
						<Button
							className="w-full"
							size="lg"
							isLoading={updateLevel.isPending}
							disabled={!selectedLevel}
							onClick={handleFinish}
						>
							Simpan dan lanjut
						</Button>
					</div>
				) : null}
			</Card>
		</div>
	);
}
