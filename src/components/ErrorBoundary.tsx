"use client";

import * as React from "react";

type ErrorBoundaryProps = {
	children: React.ReactNode;
	fallback?: React.ReactNode;
};

type ErrorBoundaryState = {
	hasError: boolean;
};

export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	state: ErrorBoundaryState = {
		hasError: false,
	};

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: React.ErrorInfo) {
		console.error("[ErrorBoundary]", error, info);
	}

	handleReload = () => {
		window.location.reload();
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="rounded-lg border border-border bg-card p-6 text-center">
					<h2 className="text-lg font-semibold text-foreground">
						Terjadi kesalahan.
					</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						Maaf, ada masalah saat memuat bagian ini.
					</p>
					<button
						type="button"
						onClick={this.handleReload}
						className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
					>
						Coba lagi
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}
