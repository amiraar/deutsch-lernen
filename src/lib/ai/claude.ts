import Anthropic from "@anthropic-ai/sdk";

import type { Message } from "@/types";
import { AIRateLimitError, AIResponseParseError } from "@/lib/ai/errors";

let client: Anthropic | null = null;

function getClient(): Anthropic {
	const apiKey = process.env.ANTHROPIC_API_KEY;

	if (!apiKey) {
		throw new Error("ANTHROPIC_API_KEY is not set");
	}

	if (!client) {
		client = new Anthropic({ apiKey });
	}

	return client;
}
const MODEL = "claude-3-haiku-20240307";
const MAX_TOKENS = 1024;

function normalizeMessages(messages: Message[], systemPrompt: string) {
	const systemParts = [systemPrompt].filter((part) => part.trim().length > 0);
	const normalized: Array<{ role: "user" | "assistant"; content: string }> = [];

	for (const message of messages) {
		if (message.role === "system") {
			systemParts.push(message.content);
		} else {
			normalized.push({ role: message.role, content: message.content });
		}
	}

	return {
		system: systemParts.join("\n"),
		messages: normalized,
	};
}

function isRateLimitError(error: unknown): boolean {
	if (typeof error !== "object" || error === null) {
		return false;
	}

	const status = "status" in error ? error.status : undefined;
	const statusCode = "statusCode" in error ? error.statusCode : undefined;
	const message = error instanceof Error ? error.message : "";

	return status === 429 || statusCode === 429 || message.includes("429");
}

function ensureText(text: string | undefined, provider: string): string {
	if (!text) {
		throw new Error(`Empty response from ${provider}`);
	}

	return text;
}

/**
 * Generates a chat response from Claude Haiku.
 */
export async function generateChatResponse(
	messages: Message[],
	systemPrompt: string
): Promise<string> {
	console.info("[AI] claude-haiku");

	try {
		const normalized = normalizeMessages(messages, systemPrompt);
		const response = await getClient().messages.create({
			model: MODEL,
			max_tokens: MAX_TOKENS,
			system: normalized.system,
			messages: normalized.messages,
		});

		const textBlock = response.content.find(
			(block) => block.type === "text"
		);
		return ensureText(textBlock?.text, "claude-haiku");
	} catch (error) {
		if (isRateLimitError(error)) {
			throw new AIRateLimitError("Claude Haiku rate limit exceeded");
		}

		const message = error instanceof Error ? error.message : "Unknown error";
		throw new Error(`Claude request failed: ${message}`);
	}
}

/**
 * Generates structured JSON output from Claude Haiku.
 */
export async function generateStructuredOutput<T>(
	prompt: string,
	schema: string
): Promise<T> {
	console.info("[AI] claude-haiku");

	const toolName = "json_output";
	const toolDescription = `Return JSON matching: ${schema}`;

	try {
		const response = await getClient().messages.create({
			model: MODEL,
			max_tokens: MAX_TOKENS,
			system: "Return JSON only via the tool.",
			messages: [{ role: "user", content: prompt }],
			tools: [
				{
					name: toolName,
					description: toolDescription,
					input_schema: {
						type: "object",
						additionalProperties: true,
					},
				},
			],
			tool_choice: { type: "tool", name: toolName },
		});

		const toolBlock = response.content.find(
			(block) => block.type === "tool_use" && block.name === toolName
		);

		if (!toolBlock || !("input" in toolBlock)) {
			throw new AIResponseParseError("Claude JSON tool output missing");
		}

		return (toolBlock as { input: T }).input;
	} catch (error) {
		if (error instanceof AIResponseParseError) {
			throw error;
		}

		if (isRateLimitError(error)) {
			throw new AIRateLimitError("Claude Haiku rate limit exceeded");
		}

		const message = error instanceof Error ? error.message : "Unknown error";
		throw new Error(`Claude request failed: ${message}`);
	}
}
