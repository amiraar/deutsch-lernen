"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	LayoutDashboard,
	BookOpen,
	Layers,
	Bot,
	User,
} from "lucide-react";

import { Badge, Button, Card, LoadingSpinner, Toast } from "@/components/ui";
import { useLogoutWithToast } from "@/hooks/useLogoutWithToast";
import { trpc } from "@/lib/trpcClient";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
	{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ label: "Pelajaran", href: "/lesson", icon: BookOpen },
	{ label: "Flashcards", href: "/flashcards", icon: Layers },
	{ label: "AI Tutor", href: "/tutor", icon: Bot },
	{ label: "Profil", href: "/profile", icon: User },
];

/**
 * Sidebar navigation for the dashboard layout.
 */
export function Sidebar() {
	const pathname = usePathname();
	const { data, isLoading } = trpc.progress.getUserStats.useQuery();
	const { isSigningOut, toast, handleSignOut } = useLogoutWithToast();

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
						const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href.split("/")[1] ? `/${href.split("/")[1]}` : href));
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
						<Badge variant={data?.level ?? "neutral"}>
							{data?.level ?? "A1"}
						</Badge>
							<Button
								variant="danger"
								size="sm"
								isLoading={isSigningOut}
								onClick={handleSignOut}
							>
								Keluar
							</Button>
					</Card>
				)}
			</div>
			{toast ? (
				<Toast message={toast.message} variant={toast.variant} />
			) : null}
		</aside>
	);
}

export { NAV_ITEMS };
