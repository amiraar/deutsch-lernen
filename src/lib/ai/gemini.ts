import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Content, GenerateContentRequest } from "@google/generative-ai";

import type { Message } from "@/types";
import { AIRateLimitError, AIResponseParseError } from "@/lib/ai/errors";

const MODEL_CANDIDATES = [
	"gemini-1.5-flash",
	"gemini-1.5-flash-latest",
	"gemini-2.0-flash",
	"gemini-2.5-flash",
];

const REQUEST_TIMEOUT_MS = 30_000;

function getModel(name: string, systemInstruction?: string) {
	const apiKey = process.env.GEMINI_API_KEY;

	if (!apiKey) {
		throw new Error("GEMINI_API_KEY is not set");
	}

	const client = new GoogleGenerativeAI(apiKey);
	return client.getGenerativeModel({
		model: name,
		systemInstruction,
	});
}

function isModelNotFound(error: unknown): boolean {
	const message = error instanceof Error ? error.message : "";
	return message.includes("is not found") || message.includes("404");
}

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
	Promise.race([
		promise,
		new Promise<never>((_, reject) =>
			setTimeout(() => reject(new Error("Request timeout")), ms)
		),
	]);

async function generateWithFallback(
	prompt: string | GenerateContentRequest,
	systemInstruction?: string
) {
	let lastError: unknown = null;

	for (const candidate of MODEL_CANDIDATES) {
		try {
			const model = getModel(candidate, systemInstruction);
			return await withTimeout(
				model.generateContent(prompt),
				REQUEST_TIMEOUT_MS
			);
		} catch (error) {
			if (!isModelNotFound(error)) {
				throw error;
			}

			lastError = error;
		}
	}

	throw lastError ?? new Error("Gemini model not available");
}

function buildChatRequest(messages: Message[], systemPrompt: string) {
	const systemParts = [systemPrompt]
		.concat(messages.filter((message) => message.role === "system").map((message) => message.content))
		.filter(Boolean)
		.join("\n\n");

	const contents: Content[] = messages
		.filter((message) => message.role !== "system")
		.map((message) => ({
			role: message.role === "assistant" ? "model" : "user",
			parts: [{ text: message.content }],
		}));

	return {
		contents,
		systemInstruction: systemParts || undefined,
	};
}

function isRateLimitError(error: unknown): boolean {
	if (typeof error !== "object" || error === null) {
		return false;
	}

	const status = "status" in error ? error.status : undefined;
	const message = error instanceof Error ? error.message : "";

	return status === 429 || message.includes("429");
}

function ensureText(text: string | undefined, provider: string): string {
	if (!text) {
		throw new Error(`Empty response from ${provider}`);
	}

	return text;
}

/**
 * Generates a chat response from Gemini.
 */
export async function generateChatResponse(
	messages: Message[],
	systemPrompt: string
): Promise<string> {
	console.info("[AI] gemini");

	try {
		const { contents, systemInstruction } = buildChatRequest(
			messages,
			systemPrompt
		);
		const result = await generateWithFallback(
			{ contents },
			systemInstruction
		);
		const text = result.response.text();
		return ensureText(text, "gemini");
	} catch (error) {
		if (isRateLimitError(error)) {
			throw new AIRateLimitError("Gemini rate limit exceeded");
		}

		const message = error instanceof Error ? error.message : "Unknown error";
		throw new Error(`Gemini request failed: ${message}`);
	}
}

/**
 * Generates structured JSON output from Gemini.
 */
export async function generateStructuredOutput<T>(
	prompt: string,
	schema: string
): Promise<T> {
	console.info("[AI] gemini");

	const fullPrompt = `${prompt}\n\n${schema}\n\nReturn ONLY valid JSON.`;

	try {
		const result = await generateWithFallback(fullPrompt);
		const text = ensureText(result.response.text(), "gemini");

		try {
			return JSON.parse(text) as T;
		} catch (parseError) {
			const message =
				parseError instanceof Error ? parseError.message : "Unknown error";
			throw new AIResponseParseError(`Gemini JSON parse failed: ${message}`);
		}
	} catch (error) {
		if (error instanceof AIResponseParseError) {
			throw error;
		}

		if (isRateLimitError(error)) {
			throw new AIRateLimitError("Gemini rate limit exceeded");
		}

		const message = error instanceof Error ? error.message : "Unknown error";
		throw new Error(`Gemini request failed: ${message}`);
	}
}
