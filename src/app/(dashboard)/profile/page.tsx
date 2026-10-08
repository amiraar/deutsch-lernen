"use client";

import * as React from "react";
import { signOut } from "next-auth/react";
import { User, Mail, Award, Zap } from "lucide-react";

import {
	Badge,
	Button,
	Card,
	ConfirmDialog,
	Input,
	Modal,
	PageSkeleton,
	Toast,
} from "@/components/ui";
import { useLogoutWithToast } from "@/hooks/useLogoutWithToast";
import { useToastMessage } from "@/hooks/useToastMessage";
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

	const {
		toast: dataToast,
		showToast: showDataToast,
	} = useToastMessage({ durationMs: 4000 });
	const exportQuery = trpc.auth.exportMyData.useQuery(undefined, { enabled: false });
	const deleteAccount = trpc.auth.deleteAccount.useMutation();
	const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
	const [deletePassword, setDeletePassword] = React.useState("");
	const [deleteError, setDeleteError] = React.useState<string | null>(null);

	const handleExport = async () => {
		const result = await exportQuery.refetch();

		if (result.error || !result.data) {
			showDataToast("Gagal mengunduh data. Coba lagi.", "error");
			return;
		}

		// Built in the browser: the export never passes through a third party.
		const blob = new Blob([JSON.stringify(result.data, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "deutsch-lernen-data.json";
		link.click();
		URL.revokeObjectURL(url);
		showDataToast("Data berhasil diunduh.", "success");
	};

	const handleDeleteAccount = async () => {
		setDeleteError(null);

		try {
			await deleteAccount.mutateAsync({ password: deletePassword });
			setIsDeleteOpen(false);
			setDeletePassword("");
			await signOut({ callbackUrl: "/", redirect: false });
			window.location.href = "/";
		} catch (error) {
			setDeleteError(
				error instanceof Error ? error.message : "Gagal menghapus akun."
			);
		}
	};

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

			{/* Data rights: export and permanent deletion (UU PDP). */}
			<Card className="space-y-4">
				<div>
					<h2 className="text-base font-semibold text-foreground">Data & privasi</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Unduh salinan datamu atau hapus akun beserta seluruh riwayat belajar.
					</p>
				</div>
				<div className="flex flex-wrap gap-3">
					<Button
						variant="secondary"
						isLoading={exportQuery.isFetching}
						onClick={handleExport}
					>
						Unduh data saya
					</Button>
					<Button
						variant="danger"
						onClick={() => {
							setDeleteError(null);
							setDeletePassword("");
							setIsDeleteOpen(true);
						}}
					>
						Hapus akun
					</Button>
				</div>
				<p className="text-xs text-muted-foreground">
					Penghapusan bersifat permanen dan tidak bisa dibatalkan.
				</p>
			</Card>

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
			{dataToast ? (
				<Toast message={dataToast.message} variant={dataToast.variant} />
			) : null}
			<Modal
				isOpen={isDeleteOpen}
				onClose={() => setIsDeleteOpen(false)}
				title="Hapus akun"
			>
				<div className="space-y-4">
					<p className="text-sm text-muted-foreground">
						Semua progres, riwayat pelajaran, dan kartu review akan dihapus
						permanen. Masukkan password untuk mengonfirmasi.
					</p>
					{deleteError ? (
						<div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
							{deleteError}
						</div>
					) : null}
					<Input
						label="Password"
						type="password"
						value={deletePassword}
						onChange={(e) => setDeletePassword(e.target.value)}
						showPasswordToggle
						autoComplete="current-password"
					/>
					<div className="flex justify-end gap-3">
						<Button variant="secondary" onClick={() => setIsDeleteOpen(false)}>
							Batal
						</Button>
						<Button
							variant="danger"
							isLoading={deleteAccount.isPending}
							onClick={handleDeleteAccount}
						>
							Hapus permanen
						</Button>
					</div>
				</div>
			</Modal>
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

