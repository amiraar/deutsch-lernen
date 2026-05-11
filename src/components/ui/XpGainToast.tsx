"use client";

import * as React from "react";
import { Zap } from "lucide-react";

import { cn } from "@/lib/utils";

type XpGainToastProps = {
	amount: number;
	onDone: () => void;
};

export function XpGainToast({ amount, onDone }: XpGainToastProps) {
	const [isVisible, setIsVisible] = React.useState(false);

	React.useEffect(() => {
		setIsVisible(true);

		const hideTimer = window.setTimeout(() => {
			setIsVisible(false);
		}, 2000);

		const doneTimer = window.setTimeout(() => {
			onDone();
		}, 2400);

		return () => {
			window.clearTimeout(hideTimer);
			window.clearTimeout(doneTimer);
		};
	}, [amount, onDone]);

	return (
		<div
			className={cn(
				"fixed bottom-20 right-4 z-50 flex items-center gap-2 rounded-md",
				"bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-lg",
				"transition-all duration-300",
				isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
			)}
			role="status"
			aria-live="polite"
		>
			<Zap className="h-4 w-4" aria-hidden />
			<span>+{amount} XP</span>
		</div>
	);
}
