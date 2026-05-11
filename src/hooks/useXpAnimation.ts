"use client";

import * as React from "react";

type UseXpAnimationResult = {
	displayXp: number;
	isAnimating: boolean;
};

export function useXpAnimation(targetXp: number): UseXpAnimationResult {
	const [displayXp, setDisplayXp] = React.useState(targetXp);
	const [isAnimating, setIsAnimating] = React.useState(false);
	const animationFrameRef = React.useRef<number | null>(null);
	const displayXpRef = React.useRef(targetXp);

	React.useEffect(() => {
		displayXpRef.current = displayXp;
	}, [displayXp]);

	React.useEffect(() => {
		const startValue = displayXpRef.current;
		const delta = targetXp - startValue;

		if (delta === 0) {
			setIsAnimating(false);
			return undefined;
		}

		const durationMs = 1000;
		const startTime = performance.now();
		setIsAnimating(true);

		const step = (timestamp: number) => {
			const elapsed = timestamp - startTime;
			const progress = Math.min(elapsed / durationMs, 1);
			const nextValue = Math.round(startValue + delta * progress);

			setDisplayXp(nextValue);
			displayXpRef.current = nextValue;

			if (progress < 1) {
				animationFrameRef.current = requestAnimationFrame(step);
			} else {
				animationFrameRef.current = null;
				setIsAnimating(false);
			}
		};

		animationFrameRef.current = requestAnimationFrame(step);

		return () => {
			if (animationFrameRef.current !== null) {
				cancelAnimationFrame(animationFrameRef.current);
				animationFrameRef.current = null;
			}
		};
	}, [targetXp]);

	return { displayXp, isAnimating };
}
