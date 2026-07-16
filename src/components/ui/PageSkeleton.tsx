"use client";

import * as React from "react";

type PageSkeletonProps = {
	rows?: number;
};

export function PageSkeleton({ rows = 3 }: PageSkeletonProps) {
	return (
		<div className="space-y-4">
			<div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
			<div className="grid gap-4">
				{Array.from({ length: rows }).map((_, index) => (
					<div
						key={index}
						className="h-24 animate-pulse rounded-2xl border border-border bg-muted"
					/>
				))}
			</div>
		</div>
	);
}
