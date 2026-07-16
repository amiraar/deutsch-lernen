"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	LayoutDashboard,
	BookOpen,
	Layers,
	Bot,
	User,
	Library,
	LogOut,
	Flame,
} from "lucide-react";
import { signOut } from "next-auth/react";

import { ConfirmDialog, LoadingSpinner, Toast } from "@/components/ui";
import { useLogoutWithToast } from "@/hooks/useLogoutWithToast";
import { trpc } from "@/lib/trpcClient";
import { cn } from "@/lib/utils";

const NAV_SECTIONS = [
	{
		title: "Belajar",
		items: [
			{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
			{ label: "Pelajaran", href: "/lesson", icon: BookOpen },
			{ label: "Flashcards", href: "/flashcards", icon: Layers },
		],
	},
	{
		title: "Perkaya",
		items: [
			{ label: "Materi", href: "/materials", icon: Library },
			{ label: "AI Tutor", href: "/tutor", icon: Bot },
		],
	},
	{
		title: "Akun",
		items: [{ label: "Profil", href: "/profile", icon: User }],
	},
];

const NAV_ITEMS = NAV_SECTIONS.flatMap((section) => section.items);

function isNavActive(href: string, pathname: string): boolean {
	if (href === "/dashboard") return pathname === "/dashboard";
	return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Sidebar navigation for the dashboard layout.
 */
export function Sidebar() {
	const pathname = usePathname();
	const { data, isLoading, error } = trpc.progress.getUserStats.useQuery();
	const {
		isSigningOut,
		isConfirmOpen,
		toast,
		requestSignOut,
		handleSignOut,
		cancelSignOut,
	} = useLogoutWithToast();

	React.useEffect(() => {
		if (error?.data?.code === "UNAUTHORIZED") {
			void signOut({ callbackUrl: "/login" });
		}
	}, [error]);

	return (
		<aside className="hidden w-64 flex-col bg-ink text-ink-foreground md:flex">
			<div className="flex flex-1 flex-col overflow-y-auto">
				{/* Logo */}
				<div className="px-6 pb-4 pt-6">
					<Link href="/dashboard" className="flex items-center gap-2.5">
						<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-accent-foreground">
							DL
						</div>
						<div className="leading-tight">
							<span className="block font-display text-base font-semibold text-white">
								Deutsch Lernen
							</span>
							<span className="block text-[11px] text-ink-muted">
								Belajar Jerman, santai tapi serius
							</span>
						</div>
					</Link>
				</div>

				{/* Nav */}
				<nav className="flex flex-col gap-5 px-3 py-4">
					{NAV_SECTIONS.map((section) => (
						<div key={section.title}>
							<p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
								{section.title}
							</p>
							<div className="space-y-0.5">
								{section.items.map(({ label, href, icon: Icon }) => {
									const isActive = isNavActive(href, pathname);
									return (
										<Link
											key={href}
											href={href}
											className={cn(
												"group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
												isActive
													? "bg-white/10 text-white"
													: "text-ink-muted hover:bg-white/5 hover:text-white"
											)}
										>
											{isActive ? (
												<span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-accent" />
											) : null}
											<Icon
												size={18}
												className={cn(
													"transition-colors",
													isActive ? "text-accent" : "text-ink-muted group-hover:text-white"
												)}
											/>
											{label}
										</Link>
									);
								})}
							</div>
						</div>
					))}
				</nav>
			</div>

			{/* User footer */}
			<div className="border-t border-white/10 p-4">
				{isLoading ? (
					<div className="flex items-center gap-2 text-sm text-ink-muted">
						<LoadingSpinner size="sm" />
						Memuat...
					</div>
				) : (
					<div className="space-y-3 rounded-2xl bg-white/5 p-3">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
								{data?.level ?? "A1"}
							</div>
							<div className="min-w-0 flex-1">
								<p className="truncate text-sm font-medium text-white">
									Pelajar Jerman
								</p>
								<p className="text-xs text-ink-muted">{data?.xp ?? 0} XP</p>
							</div>
							<button
								type="button"
								onClick={requestSignOut}
								disabled={isSigningOut}
								aria-label="Keluar"
								title="Keluar"
								className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-white/10 hover:text-white disabled:opacity-60"
							>
								<LogOut size={16} />
							</button>
						</div>
						{(data?.streakDays ?? 0) > 0 ? (
							<div className="flex items-center gap-1.5 rounded-lg bg-accent/10 px-2.5 py-1.5 text-xs font-medium text-accent">
								<Flame size={13} />
								{data?.streakDays} hari streak
							</div>
						) : null}
					</div>
				)}
			</div>
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
		</aside>
	);
}

export { NAV_ITEMS, NAV_SECTIONS };
