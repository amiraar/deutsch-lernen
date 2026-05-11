import { TRPCError } from "@trpc/server";

export function toUserMessage(error: unknown, fallback: string): string {
	if (error instanceof TRPCError) {
		throw error;
	}

	return fallback;
}
