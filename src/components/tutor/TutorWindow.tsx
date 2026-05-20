"use client";

import * as React from "react";
import { BookOpen } from "lucide-react";

import type { Message } from "@/types";
import { trpc } from "@/lib/trpcClient";
import { Button, Badge, Input, Markdown } from "@/components/ui";

type TutorWindowProps = {
	className?: string;
	initialMessage?: string;
	contextNote?: string;
};

function TypingIndicator() {
	return (
		<div className="flex items-end gap-1 px-1">
			{Array.from({ length: 3 }).map((_, index) => (
				<span
					key={index}
					className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
					style={{ animationDelay: `${index * 0.15}s` }}
				/>
			))}
		</div>
	);
}

/**
 * Chat window for the AI tutor.
 */
export function TutorWindow({ className, initialMessage, contextNote }: TutorWindowProps) {
	const [messages, setMessages] = React.useState<Message[]>([]);
	const [input, setInput] = React.useState("");
	const bottomRef = React.useRef<HTMLDivElement>(null);

	const chatMutation = trpc.tutor.chat.useMutation();
	const providerQuery = trpc.tutor.getProviderStatus.useQuery(undefined, {
		enabled: false,
	});

	const providerName = providerQuery.data?.provider ?? "-";

	const sendMessage = React.useCallback(
		async (text: string) => {
			if (!text.trim() || chatMutation.isPending) return;

			const nextMessage: Message = { role: "user", content: text.trim() };
			const nextMessages = [...messages, nextMessage];
			setMessages(nextMessages);
			setInput("");

			try {
				const response = await chatMutation.mutateAsync({ messages: nextMessages });
				setMessages((prev) => [
					...prev,
					{ role: "assistant", content: response.response },
				]);
				await providerQuery.refetch();
			} catch (error) {
				const message = error instanceof Error ? error.message : "Unknown error";
				setMessages((prev) => [
					...prev,
					{ role: "assistant", content: `Gagal: ${message}` },
				]);
			}
		},
		[messages, chatMutation, providerQuery]
	);

	// Auto-send initial message when provided
	React.useEffect(() => {
		if (initialMessage) {
			void sendMessage(initialMessage);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Scroll to bottom on new messages
	React.useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, chatMutation.isPending]);

	return (
		<div className={`flex flex-col rounded-xl border border-border bg-card ${className ?? ""}`}>
			{/* Header */}
			<div className="flex items-center justify-between border-b border-border px-4 py-3">
				<h2 className="text-sm font-semibold text-foreground">AI Tutor</h2>
				<div className="flex items-center gap-2">
					{providerName !== "-" ? (
						<Badge variant="neutral" className="text-[10px]">via {providerName}</Badge>
					) : null}
				</div>
			</div>
			{contextNote ? (
				<div className="px-4 pt-3">
					<span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 text-xs text-primary">
						<BookOpen className="h-3.5 w-3.5" aria-hidden />
						Konteks: {contextNote}
					</span>
				</div>
			) : null}

			{/* Messages */}
			<div className="flex-1 space-y-4 overflow-y-auto p-4" style={{ minHeight: "320px", maxHeight: "420px" }}>
				{messages.length === 0 ? (
					<p className="text-center text-sm text-muted-foreground">
						Mulai percakapan dengan tutor bahasa Jerman. 👋
					</p>
				) : (
					messages.map((message, index) => (
						<div
							key={index}
							className={message.role === "user" ? "flex justify-end" : "flex justify-start"}
						>
							<div
								className={
									message.role === "user"
										? "max-w-[75%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
										: "max-w-[75%] rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-2.5 text-sm text-foreground"
								}
							>
								{message.role === "assistant" ? (
									<Markdown content={message.content} />
								) : (
									message.content
								)}
							</div>
						</div>
					))
				)}
				{chatMutation.isPending ? (
					<div className="flex justify-start">
						<div className="rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-3">
							<TypingIndicator />
						</div>
					</div>
				) : null}
				<div ref={bottomRef} />
			</div>

			{/* Input */}
			<div className="border-t border-border p-3">
				<div className="flex items-center gap-2">
					<Input
						value={input}
						onChange={(event) => setInput(event.target.value)}
						placeholder="Tulis pertanyaanmu..."
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								event.preventDefault();
								void sendMessage(input);
							}
						}}
					/>
					<Button
						onClick={() => sendMessage(input)}
						isLoading={chatMutation.isPending}
						disabled={!input.trim()}
					>
						Kirim
					</Button>
				</div>
			</div>
		</div>
	);
}
