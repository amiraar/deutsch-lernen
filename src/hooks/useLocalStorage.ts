"use client";

import * as React from "react";

/**
 * SSR-safe hook to persist state in localStorage.
 * Returns [value, setValue, removeValue].
 */
export function useLocalStorage<T>(
	key: string,
	initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
	const [storedValue, setStoredValue] = React.useState<T>(() => {
		if (typeof window === "undefined") return initialValue;
		try {
			const item = window.localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : initialValue;
		} catch {
			return initialValue;
		}
	});

	const setValue = React.useCallback(
		(value: T | ((prev: T) => T)) => {
			try {
				const valueToStore =
					value instanceof Function ? value(storedValue) : value;
				setStoredValue(valueToStore);
				if (typeof window !== "undefined") {
					window.localStorage.setItem(key, JSON.stringify(valueToStore));
				}
			} catch (error) {
				console.error(`[useLocalStorage] Failed to set key "${key}":`, error);
			}
		},
		[key, storedValue]
	);

	const removeValue = React.useCallback(() => {
		try {
			setStoredValue(initialValue);
			if (typeof window !== "undefined") {
				window.localStorage.removeItem(key);
			}
		} catch (error) {
			console.error(`[useLocalStorage] Failed to remove key "${key}":`, error);
		}
	}, [key, initialValue]);

	return [storedValue, setValue, removeValue];
}
