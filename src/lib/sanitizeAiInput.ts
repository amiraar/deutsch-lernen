export function sanitizeAiInput(text: string): string {
	const trimmed = text.trim();
	const withoutControls = trimmed.replace(/[\x00-\x09\x0B-\x1F\x7F]/g, "");
	return withoutControls.slice(0, 2000);
}
