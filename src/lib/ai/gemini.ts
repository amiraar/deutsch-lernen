import { GoogleGenerativeAI } from "@google/generative-ai";

import type { Message } from "@/types";
import { AIRateLimitError, AIResponseParseError } from "@/lib/ai/errors";

const MODEL_CANDIDATES = [
	"gemini-2.5-flash",
	"gemini-2.0-flash",
	"gemini-2.0-flash-001",
	"gemini-flash-latest",
];

let model:
	| ReturnType<GoogleGenerativeAI["getGenerativeModel"]>
	| null = null;
let modelName = MODEL_CANDIDATES[0];

function getModel(name: string = modelName) {
	const apiKey = process.env.GEMINI_API_KEY;

	if (!apiKey) {
		throw new Error("GEMINI_API_KEY is not set");
	}

	if (!model || modelName !== name) {
		const client = new GoogleGenerativeAI(apiKey);
		modelName = name;
		model = client.getGenerativeModel({ model: name });
	}

	return model;
}

function isModelNotFound(error: unknown): boolean {
	const message = error instanceof Error ? error.message : "";
	return message.includes("is not found") || message.includes("404");
}

async function generateWithFallback(prompt: string) {
	let lastError: unknown = null;

	for (const candidate of MODEL_CANDIDATES) {
		try {
			return await getModel(candidate).generateContent(prompt);
		} catch (error) {
			if (!isModelNotFound(error)) {
				throw error;
			}

			lastError = error;
		}
	}

	throw lastError ?? new Error("Gemini model not available");
}

function buildChatPrompt(messages: Message[], systemPrompt: string): string {
	const conversation = messages
		.map((message) => `${message.role.toUpperCase()}: ${message.content}`)
		.join("\n");

	return `${systemPrompt}\n\n${conversation}`.trim();
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
		const prompt = buildChatPrompt(messages, systemPrompt);
		const result = await generateWithFallback(prompt);
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
