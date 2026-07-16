import "./globals.css";

import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

import { Providers } from "@/app/providers";

const jakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-jakarta",
	display: "swap",
});

const fraunces = Fraunces({
	subsets: ["latin"],
	variable: "--font-fraunces",
	display: "swap",
	axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
	title: "Deutsch Lernen",
	description: "Belajar Bahasa Jerman dengan AI",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="id" className={`${jakarta.variable} ${fraunces.variable}`}>
			<body className="min-h-screen bg-background text-foreground antialiased">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
