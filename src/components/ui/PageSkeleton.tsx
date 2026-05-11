"use client";

import * as React from "react";

type PageSkeletonProps = {
	rows?: number;
};

export function PageSkeleton({ rows = 3 }: PageSkeletonProps) {
	return (
		<div className="space-y-4">
			<div className="h-8 w-48 animate-pulse rounded bg-slate-100" />
			<div className="grid gap-4">
				{Array.from({ length: rows }).map((_, index) => (
					<div
						key={index}
						className="h-24 rounded-lg border animate-pulse bg-slate-100"
					/>
				))}
			</div>
		</div>
	);
}
