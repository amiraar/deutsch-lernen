"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge, Card, LoadingSpinner } from "@/components/ui";
import { trpc } from "@/lib/trpcClient";

const NAV_ITEMS = [
	{ label: "Dashboard", href: "/dashboard" },
	{ label: "Pelajaran", href: "/lesson/1" },
	{ label: "Flashcards", href: "/flashcards" },
	{ label: "AI Tutor", href: "/tutor" },
	{ label: "Profil", href: "/profile" },
];

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const { data, isLoading } = trpc.progress.getUserStats.useQuery();

	return (
		<div className="flex min-h-screen">
			<aside className="hidden w-64 border-r border-border bg-white p-6 md:flex md:flex-col md:justify-between">
				<div className="space-y-6">
					<div>
						<p className="text-xs uppercase tracking-widest text-muted-foreground">
							Deutsch Lernen
						</p>
						<h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
					</div>
					<nav className="space-y-2">
						{NAV_ITEMS.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
									pathname === item.href
										? "bg-primary text-primary-foreground"
										: "text-muted-foreground hover:bg-muted"
								}`}
							>
								{item.label}
							</Link>
						))}
					</nav>
				</div>
				<Card className="space-y-2">
					{isLoading ? (
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<LoadingSpinner size="sm" /> Memuat profil...
						</div>
					) : (
						<>
							<p className="text-sm font-semibold text-foreground">
								{data ? "Halo, pembelajar" : "Pengguna"}
							</p>
							<div className="flex items-center gap-2">
								<Badge variant={data?.level ?? "neutral"}>
									{data?.level ?? "A1"}
								</Badge>
								<span className="text-xs text-muted-foreground">
									XP {data?.xp ?? 0}
								</span>
							</div>
						</>
					)}
				</Card>
			</aside>

			<main className="flex flex-1 flex-col bg-slate-50">
				<div className="flex-1 p-6 md:p-10">{children}</div>
				<nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-around border-t border-border bg-white py-2 md:hidden">
					{NAV_ITEMS.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={`text-xs font-medium ${
								pathname === item.href
									? "text-primary"
									: "text-muted-foreground"
							}`}
						>
							{item.label}
						</Link>
					))}
				</nav>
			</main>
		</div>
	);
}
