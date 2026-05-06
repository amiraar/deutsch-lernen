"use client";

import * as React from "react";

import { Button, Input } from "@/components/ui";

export type ChatInputProps = {
	value: string;
	onChange: (value: string) => void;
	onSend: () => void;
	isLoading?: boolean;
};

/**
 * Input row for chat composer.
 */
export function ChatInput({
	value,
	onChange,
	onSend,
	isLoading = false,
}: ChatInputProps) {
	return (
		<div className="flex items-center gap-2">
			<Input
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder="Tulis pertanyaanmu"
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						event.preventDefault();
						onSend();
					}
				}}
			/>
			<Button onClick={onSend} isLoading={isLoading}>
				Kirim
			</Button>
		</div>
	);
}
