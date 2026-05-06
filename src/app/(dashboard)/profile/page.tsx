"use client";

import { Card, LoadingSpinner } from "@/components/ui";
import { trpc } from "@/lib/trpcClient";

export default function ProfilePage() {
	const meQuery = trpc.auth.me.useQuery();

	if (meQuery.isLoading) {
		return (
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<LoadingSpinner size="sm" /> Memuat profil...
			</div>
		);
	}

	if (meQuery.error || !meQuery.data) {
		return (
			<Card className="text-sm text-destructive">
				{meQuery.error?.message ?? "Profil tidak ditemukan."}
			</Card>
		);
	}

	return (
		<Card className="space-y-2">
			<h2 className="text-lg font-semibold text-foreground">Profil</h2>
			<p className="text-sm text-muted-foreground">Nama: {meQuery.data.name}</p>
			<p className="text-sm text-muted-foreground">Email: {meQuery.data.email}</p>
			<p className="text-sm text-muted-foreground">Level: {meQuery.data.level}</p>
			<p className="text-sm text-muted-foreground">XP: {meQuery.data.xp}</p>
		</Card>
	);
}
