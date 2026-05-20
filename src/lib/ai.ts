import type { EvaluationResult, Message } from "@/types";
import { AIRateLimitError, AIResponseParseError } from "@/lib/ai/errors";
import * as claude from "@/lib/ai/claude";
import * as gemini from "@/lib/ai/gemini";
import * as groq from "@/lib/ai/groq";

type ProviderName = "gemini" | "groq" | "claude";

const providerMap: Record<ProviderName, typeof gemini> = {
	gemini,
	groq,
	claude,
};

let activeProvider: ProviderName | null = null;

function isProviderName(value: string): value is ProviderName {
	return value === "gemini" || value === "groq" || value === "claude";
}

function getProviderOrder(): ProviderName[] {
	const raw = process.env.AI_PROVIDER_ORDER ?? "gemini,groq,claude";
	const order = raw
		.split(",")
		.map((value) => value.trim())
		.filter((value) => value.length > 0 && isProviderName(value)) as
		| ProviderName[]
		| [];

	if (order.length === 0) {
		return ["gemini", "groq", "claude"];
	}

	return order;
}

function setActiveProvider(provider: ProviderName | null) {
	activeProvider = provider;
}

function buildTutorSystemPrompt(userLevel: string): string {
	return (
		"You are a German language tutor. The student speaks Indonesian. " +
		`Current level: ${userLevel}. ` +
		"Explain grammar in Indonesian. Use German for examples. Be concise. " +
		"Format responses in basic Markdown (paragraphs, lists, bold). " +
		"Do not use HTML."
	);
}

function buildWritingPrompt(
	german: string,
	expectedMeaning: string,
	level: string
): string {
	return (
		"Evaluate this German sentence and compare it to the expected meaning. " +
		"Return feedback in Indonesian. " +
		`Student level: ${level}.\n\n` +
		`German: ${german}\n` +
		`Expected meaning: ${expectedMeaning}`
	);
}

function buildWritingSchema(): string {
	return (
		"Return ONLY valid JSON matching: { isCorrect: boolean, score: number (0-100), " +
		"feedback: string (in Indonesian), corrections: Array<{ original: string, " +
		"corrected: string, explanation: string }> }"
	);
}

async function runStructuredWithRetry(
	provider: typeof gemini,
	prompt: string,
	schema: string
): Promise<EvaluationResult> {
	try {
		return await provider.generateStructuredOutput<EvaluationResult>(
			prompt,
			schema
		);
	} catch (error) {
		if (error instanceof AIResponseParseError) {
			const retryPrompt =
				`${prompt}\n\n` +
				"IMPORTANT: Return ONLY valid JSON. Do not include markdown, code fences, or extra text.";

			return await provider.generateStructuredOutput<EvaluationResult>(
				retryPrompt,
				schema
			);
		}

		throw error;
	}
}

/**
 * Calls AI providers in priority order. Falls back automatically on rate limit.
 * Never call provider files directly — always use this.
 */
export async function generateTutorResponse(
	messages: Message[],
	userLevel: string
): Promise<string> {
	const systemPrompt = buildTutorSystemPrompt(userLevel);

	for (const providerName of getProviderOrder()) {
		const provider = providerMap[providerName];

		try {
			const response = await provider.generateChatResponse(
				messages,
				systemPrompt
			);
			setActiveProvider(providerName);
			return response;
		} catch (error) {
			if (error instanceof AIRateLimitError) {
				console.warn(`AI rate limit hit on ${providerName}`);
				setActiveProvider(null);
				continue;
			}

			throw error;
		}
	}

	throw new Error("AI sementara tidak tersedia. Coba lagi nanti.");
}

/**
 * Evaluates a German sentence. Falls back automatically on rate limit.
 */
export async function evaluateWriting(
	german: string,
	expectedMeaning: string,
	level: string
): Promise<EvaluationResult> {
	const prompt = buildWritingPrompt(german, expectedMeaning, level);
	const schema = buildWritingSchema();

	for (const providerName of getProviderOrder()) {
		const provider = providerMap[providerName];

		try {
			const result = await runStructuredWithRetry(provider, prompt, schema);
			setActiveProvider(providerName);
			return result;
		} catch (error) {
			if (error instanceof AIRateLimitError) {
				console.warn(`AI rate limit hit on ${providerName}`);
				setActiveProvider(null);
				continue;
			}

			if (error instanceof AIResponseParseError) {
				console.warn(`AI parse failure on ${providerName}`);
				setActiveProvider(null);
				continue;
			}

			throw error;
		}
	}

	throw new Error("AI sementara tidak tersedia. Coba lagi nanti.");
}

/**
 * Returns which provider is currently responding.
 */
export function getActiveProvider(): string {
	return activeProvider ?? "none";
}

export { AIRateLimitError };
