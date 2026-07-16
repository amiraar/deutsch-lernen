import * as React from "react";

import { cn } from "@/lib/utils";

export type ProgressBarProps = {
	value: number;
	label?: string;
	showPercent?: boolean;
	className?: string;
};

/**
 * Progress bar with optional label and percentage.
 */
export function ProgressBar({
	value,
	label,
	showPercent = false,
	className,
}: ProgressBarProps) {
	const clampedValue = Math.min(100, Math.max(0, value));

	return (
		<div className={cn("flex flex-col gap-2", className)}>
			{label ? (
				<div className="flex items-center justify-between text-sm">
					<span className="text-foreground">{label}</span>
					{showPercent ? (
						<span className="text-muted-foreground">{clampedValue}%</span>
					) : null}
				</div>
			) : null}
			<div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
				<div
					className="h-full rounded-full bg-gradient-to-r from-primary to-primary-strong transition-all duration-500"
					style={{ width: `${clampedValue}%` }}
					role="progressbar"
					aria-valuenow={clampedValue}
					aria-valuemin={0}
					aria-valuemax={100}
				/>
			</div>
		</div>
	);
}
