"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Layers, Bot, User } from "lucide-react";

import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

const MOBILE_NAV = [
	{ label: "Home", href: "/dashboard", icon: LayoutDashboard },
	{ label: "Pelajaran", href: "/lesson", icon: BookOpen },
	{ label: "Kartu", href: "/flashcards", icon: Layers },
	{ label: "Tutor", href: "/tutor", icon: Bot },
	{ label: "Profil", href: "/profile", icon: User },
];

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<div className="flex min-h-screen bg-background">
			<Sidebar />

			<main className="flex flex-1 flex-col">
				<div className="flex-1 p-6 pb-24 md:p-8 md:pb-8">{children}</div>
			</main>

			{/* Mobile bottom nav */}
			<nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-around border-t border-border bg-white px-2 py-2 md:hidden">
				{MOBILE_NAV.map(({ label, href, icon: Icon }) => {
					const isActive = pathname === href;
					return (
						<Link
							key={href}
							href={href}
							className={cn(
								"flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-medium transition-colors",
								isActive ? "text-primary" : "text-muted-foreground"
							)}
						>
							<Icon size={20} />
							{label}
							{isActive ? (
								<span className="h-1 w-1 rounded-full bg-primary" />
							) : null}
						</Link>
					);
				})}
			</nav>
		</div>
	);
}

