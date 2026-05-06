import "./globals.css";

import type { Metadata } from "next";

import { Providers } from "@/app/providers";

export const metadata: Metadata = {
	title: "Deutsch Lernen",
	description: "Belajar Bahasa Jerman dengan AI",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="id">
			<body className="min-h-screen bg-slate-50 text-slate-900">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
