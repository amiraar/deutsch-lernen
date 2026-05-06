"use client";

import * as React from "react";

import type { Message } from "@/types";
import { trpc } from "@/lib/trpcClient";
import { Button, Card, Input, LoadingSpinner, Badge } from "@/components/ui";

type TutorWindowProps = {
	className?: string;
};

const LIMIT = 20;

function TypingIndicator() {
	return (
		<div className="flex items-center gap-1">
			{Array.from({ length: 3 }).map((_, index) => (
				<span
					key={index}
					className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
					style={{ animationDelay: `${index * 0.1}s` }}
				/>
			))}
		</div>
	);
}

/**
 * Chat window for the AI tutor.
 */
export function TutorWindow({ className }: TutorWindowProps) {
	const [messages, setMessages] = React.useState<Message[]>([]);
	const [input, setInput] = React.useState("");
	const [aiUsage, setAiUsage] = React.useState(0);

	const chatMutation = trpc.tutor.chat.useMutation();
	const providerQuery = trpc.tutor.getProviderStatus.useQuery(undefined, {
		enabled: false,
	});

	const providerName = providerQuery.data?.provider ?? "-";

	const handleSend = async () => {
		if (!input.trim() || chatMutation.isLoading) {
			return;
		}

		const nextMessage: Message = { role: "user", content: input.trim() };
		const nextMessages = [...messages, nextMessage];
		setMessages(nextMessages);
		setInput("");

		try {
			const response = await chatMutation.mutateAsync({
				messages: nextMessages,
			});

			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: response.response },
			]);
			setAiUsage((prev) => Math.min(LIMIT, prev + 1));
			await providerQuery.refetch();
		} catch (error) {
			const message = error instanceof Error ? error.message : "Unknown error";
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: `Gagal: ${message}` },
			]);
		}
	};

	return (
		<Card className={className}>
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold text-foreground">AI Tutor</h2>
				<span className="text-xs text-muted-foreground">
					AI limit: {aiUsage}/{LIMIT} used today
				</span>
			</div>

			<div className="mt-4 h-80 space-y-3 overflow-y-auto rounded-md border border-border bg-muted/30 p-3">
				{messages.length === 0 ? (
					<p className="text-sm text-muted-foreground">
						Mulai percakapan dengan tutor bahasa Jerman.
					</p>
				) : (
					messages.map((message, index) => (
						<div
							key={index}
							className={
								message.role === "user"
									? "flex justify-end"
									: "flex justify-start"
							}
						>
							<div
								className={
									message.role === "user"
										? "rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
										: "rounded-lg bg-card px-3 py-2 text-sm text-foreground"
								}
							>
								{message.content}
							</div>
						</div>
					))
				)}
				{chatMutation.isLoading ? (
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<TypingIndicator />
						Mengetik...
					</div>
				) : null}
			</div>

			<div className="mt-4 flex items-center gap-2">
				<Input
					value={input}
					onChange={(event) => setInput(event.target.value)}
					placeholder="Tulis pertanyaanmu"
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							event.preventDefault();
							void handleSend();
						}
					}}
				/>
				<Button onClick={handleSend} isLoading={chatMutation.isLoading}>
					Kirim
				</Button>
			</div>

			<div className="mt-4 flex items-center justify-end">
				<Badge variant="neutral">via {providerName}</Badge>
			</div>

			{chatMutation.isError ? (
				<div className="mt-2 flex items-center gap-2 text-xs text-destructive">
					<LoadingSpinner size="sm" />
					{chatMutation.error.message}
				</div>
			) : null}
		</Card>
	);
}
