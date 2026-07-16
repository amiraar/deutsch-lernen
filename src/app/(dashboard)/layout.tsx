"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Layers, Bot, User, Library } from "lucide-react";

import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

const MOBILE_NAV = [
	{ label: "Home", href: "/dashboard", icon: LayoutDashboard },
	{ label: "Pelajaran", href: "/lesson", icon: BookOpen },
	{ label: "Materi", href: "/materials", icon: Library },
	{ label: "Kartu", href: "/flashcards", icon: Layers },
	{ label: "Tutor", href: "/tutor", icon: Bot },
	{ label: "Profil", href: "/profile", icon: User },
];

function isNavActive(href: string, pathname: string): boolean {
	if (href === "/dashboard") return pathname === "/dashboard";
	return pathname === href || pathname.startsWith(`${href}/`);
}

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
				<div className="mx-auto w-full max-w-6xl flex-1 p-5 pb-24 md:p-8 md:pb-10">
					{children}
				</div>
			</main>

			{/* Mobile bottom nav */}
			<nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-around border-t border-border bg-card/95 px-1 py-2 backdrop-blur-sm md:hidden">
				{MOBILE_NAV.map(({ label, href, icon: Icon }) => {
					const isActive = isNavActive(href, pathname);
					return (
						<Link
							key={href}
							href={href}
							className={cn(
								"flex flex-col items-center gap-1 rounded-xl px-2.5 py-1 text-[10px] font-medium transition-colors",
								isActive ? "text-primary" : "text-muted-foreground"
							)}
						>
							<Icon size={20} className={isActive ? "text-primary" : undefined} />
							{label}
							<span
								className={cn(
									"h-1 w-1 rounded-full",
									isActive ? "bg-accent" : "bg-transparent"
								)}
							/>
						</Link>
					);
				})}
			</nav>
		</div>
	);
}

