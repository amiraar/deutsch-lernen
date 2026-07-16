"use client";

import { User, Mail, Award, Zap } from "lucide-react";

import { Badge, Button, Card, ConfirmDialog, PageSkeleton, Toast } from "@/components/ui";
import { useLogoutWithToast } from "@/hooks/useLogoutWithToast";
import { trpc } from "@/lib/trpcClient";
import { LEVEL_LABELS } from "@/constants";

export default function ProfilePage() {
	const meQuery = trpc.auth.me.useQuery();
	const statsQuery = trpc.progress.getUserStats.useQuery();
	const {
		isSigningOut,
		isConfirmOpen,
		toast,
		requestSignOut,
		handleSignOut,
		cancelSignOut,
	} = useLogoutWithToast();

	if (meQuery.isLoading) {
		return <PageSkeleton />;
	}

	if (meQuery.error || !meQuery.data) {
		return (
			<Card className="text-sm text-destructive">
				{meQuery.error?.message ?? "Profil tidak ditemukan."}
			</Card>
		);
	}

	const { name, email, level, xp } = meQuery.data;
	const initials = name
		.split(" ")
		.map((w: string) => w[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);


	return (
		<div className="space-y-6">
			<h1 className="font-display text-3xl font-semibold text-foreground">Profil</h1>

			{/* Avatar + name card */}
			<Card variant="elevated" className="flex items-center gap-5">
				<div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-ink font-display text-xl font-semibold text-accent">
					{initials}
				</div>
				<div className="space-y-1">
					<h2 className="text-lg font-semibold text-foreground">{name}</h2>
					<div className="flex items-center gap-2">
						<Badge variant={level as "A1" | "A2" | "B1" | "B2"}>{level}</Badge>
						<span className="text-xs text-muted-foreground">
							{LEVEL_LABELS[level as keyof typeof LEVEL_LABELS]}
						</span>
					</div>
				</div>
			</Card>

			{/* Info grid */}
			<div className="grid gap-4 sm:grid-cols-2">
				<Card className="flex items-center gap-4">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
						<User size={18} className="text-muted-foreground" />
					</div>
					<div>
						<p className="text-xs text-muted-foreground">Nama</p>
						<p className="text-sm font-medium text-foreground">{name}</p>
					</div>
				</Card>
				<Card className="flex items-center gap-4">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
						<Mail size={18} className="text-muted-foreground" />
					</div>
					<div>
						<p className="text-xs text-muted-foreground">Email</p>
						<p className="text-sm font-medium text-foreground">{email}</p>
					</div>
				</Card>
				<Card className="flex items-center gap-4">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/10">
						<Award size={18} className="text-violet-600" />
					</div>
					<div>
						<p className="text-xs text-muted-foreground">Pelajaran Selesai</p>
						<p className="text-sm font-medium text-foreground">
							{statsQuery.data?.lessonsCompleted ?? 0}
						</p>
					</div>
				</Card>
				<Card className="flex items-center gap-4">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600/10">
						<Zap size={18} className="text-amber-600" />
					</div>
					<div>
						<p className="text-xs text-muted-foreground">Total XP</p>
						<p className="text-sm font-medium text-foreground">{xp}</p>
					</div>
				</Card>
			</div>

			<Button
				variant="danger"
				isLoading={isSigningOut}
				onClick={requestSignOut}
			>
				Keluar
			</Button>
			{toast ? (
				<Toast message={toast.message} variant={toast.variant} />
			) : null}
			<ConfirmDialog
				isOpen={isConfirmOpen}
				title="Keluar"
				description="Yakin ingin keluar?"
				confirmLabel="Keluar"
				cancelLabel="Batal"
				variant="danger"
				onConfirm={handleSignOut}
				onCancel={cancelSignOut}
			/>
		</div>
	);
}

