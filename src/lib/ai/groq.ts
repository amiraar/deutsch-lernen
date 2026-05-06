import OpenAI from "openai";

import type { Message } from "@/types";
import { AIRateLimitError, AIResponseParseError } from "@/lib/ai/errors";

let client: OpenAI | null = null;

function getClient(): OpenAI {
	const apiKey = process.env.GROQ_API_KEY;

	if (!apiKey) {
		throw new Error("GROQ_API_KEY is not set");
	}

	if (!client) {
		client = new OpenAI({
			apiKey,
			baseURL: "https://api.groq.com/openai/v1",
		});
	}

	return client;
}

const MODEL = "llama-3.3-70b-versatile";

function isRateLimitError(error: unknown): boolean {
	if (typeof error !== "object" || error === null) {
		return false;
	}

	const status = "status" in error ? error.status : undefined;
	const message = error instanceof Error ? error.message : "";

	return status === 429 || message.includes("429");
}

function ensureText(text: string | null | undefined, provider: string): string {
	if (!text) {
		throw new Error(`Empty response from ${provider}`);
	}

	return text;
}

/**
 * Generates a chat response from Groq.
 */
export async function generateChatResponse(
	messages: Message[],
	systemPrompt: string
): Promise<string> {
	console.info("[AI] groq");

	try {
		const completion = await getClient().chat.completions.create({
			model: MODEL,
			messages: [
				{ role: "system", content: systemPrompt },
				...messages.map((message) => ({
					role: message.role,
					content: message.content,
				})),
			],
		});

		const text = completion.choices[0]?.message?.content?.trim() ?? null;
		return ensureText(text, "groq");
	} catch (error) {
		if (isRateLimitError(error)) {
			throw new AIRateLimitError("Groq rate limit exceeded");
		}

		const message = error instanceof Error ? error.message : "Unknown error";
		throw new Error(`Groq request failed: ${message}`);
	}
}

/**
 * Generates structured JSON output from Groq.
 */
export async function generateStructuredOutput<T>(
	prompt: string,
	schema: string
): Promise<T> {
	console.info("[AI] groq");

	const fullPrompt = `${prompt}\n\n${schema}\n\nReturn ONLY valid JSON.`;

	try {
		const completion = await getClient().chat.completions.create({
			model: MODEL,
			messages: [{ role: "user", content: fullPrompt }],
		});

		const text = completion.choices[0]?.message?.content?.trim() ?? null;
		const payload = ensureText(text, "groq");

		try {
			return JSON.parse(payload) as T;
		} catch (parseError) {
			const message =
				parseError instanceof Error ? parseError.message : "Unknown error";
			throw new AIResponseParseError(`Groq JSON parse failed: ${message}`);
		}
	} catch (error) {
		if (error instanceof AIResponseParseError) {
			throw error;
		}

		if (isRateLimitError(error)) {
			throw new AIRateLimitError("Groq rate limit exceeded");
		}

		const message = error instanceof Error ? error.message : "Unknown error";
		throw new Error(`Groq request failed: ${message}`);
	}
}
