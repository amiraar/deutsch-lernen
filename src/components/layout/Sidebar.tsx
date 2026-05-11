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
} from "lucide-react";
import { signOut } from "next-auth/react";

import { Badge, Button, Card, ConfirmDialog, LoadingSpinner, Toast } from "@/components/ui";
import type { BadgeVariant } from "@/components/ui/Badge";
import { useLogoutWithToast } from "@/hooks/useLogoutWithToast";
import { trpc } from "@/lib/trpcClient";
import { cn } from "@/lib/utils";

function toValidBadgeVariant(level: string | undefined): BadgeVariant {
	const valid: BadgeVariant[] = ["A1", "A2", "B1", "B2", "success", "warning", "error", "neutral"];
	return valid.includes(level as BadgeVariant) ? (level as BadgeVariant) : "neutral";
}

const NAV_ITEMS = [
	{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ label: "Pelajaran", href: "/lesson", icon: BookOpen },
	{ label: "Flashcards", href: "/flashcards", icon: Layers },
	{ label: "AI Tutor", href: "/tutor", icon: Bot },
	{ label: "Profil", href: "/profile", icon: User },
];

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
		<aside className="hidden w-64 flex-col justify-between border-r border-border bg-white md:flex">
			<div>
				{/* Logo */}
				<div className="border-b border-border px-6 py-5">
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
							DL
						</div>
						<span className="text-sm font-semibold text-foreground">Deutsch Lernen</span>
					</div>
				</div>

				{/* Nav */}
				<nav className="p-3">
					{NAV_ITEMS.map(({ label, href, icon: Icon }) => {
						const isActive = isNavActive(href, pathname);
						return (
							<Link
								key={href}
								href={href}
								className={cn(
									"flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
									isActive
										? "bg-primary/10 text-primary"
										: "text-muted-foreground hover:bg-muted hover:text-foreground"
								)}
							>
								<Icon size={18} />
								{label}
							</Link>
						);
					})}
				</nav>
			</div>

			{/* User footer */}
			<div className="border-t border-border p-4">
				{isLoading ? (
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<LoadingSpinner size="sm" />
						Memuat...
					</div>
				) : (
					<Card className="space-y-2 p-3">
						<div className="flex items-center gap-3">
							<div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
									{data?.level ?? "A1"}
								</div>
								<div className="min-w-0">
									<p className="truncate text-sm font-medium text-foreground">
										Pelajar Bahasa Jerman
								</p>
								<p className="text-xs text-muted-foreground">
									{data?.xp ?? 0} XP
								</p>
							</div>
						</div>
						<Badge variant={toValidBadgeVariant(data?.level)}>
							{data?.level ?? "A1"}
						</Badge>
							<Button
								variant="danger"
								size="sm"
								isLoading={isSigningOut}
								onClick={requestSignOut}
							>
								Keluar
							</Button>
					</Card>
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

export { NAV_ITEMS };
