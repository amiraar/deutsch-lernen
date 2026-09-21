import { TRPCError, initTRPC } from "@trpc/server";
import type { Session } from "next-auth";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { checkAiLimit, checkApiLimit } from "@/lib/rateLimit";

type CreateContextOptions = {
	req: Request;
};

export async function createContext({ req }: CreateContextOptions) {
	const session = await auth();

	return {
		session,
		prisma,
		req,
	};
}

export type Context = {
	session: Session | null;
	prisma: typeof prisma;
	req: Request;
};

const t = initTRPC.context<Context>().create({
	errorFormatter: ({ shape, error }) => {
		// Unknown errors (Prisma, network, etc.) are wrapped with a `cause` and keep
		// its raw message — replace it so internals never reach the client.
		if (error.code === "INTERNAL_SERVER_ERROR" && error.cause) {
			return { ...shape, message: "Terjadi kesalahan pada server." };
		}
		return shape;
	},
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
	const userId = ctx.session?.user?.id;

	if (!userId) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "Login diperlukan.",
		});
	}

	await checkApiLimit(userId);

	return next({
		ctx: {
			...ctx,
			userId,
		},
	});
});

export const aiProcedure = t.procedure.use(async ({ ctx, next }) => {
	const userId = ctx.session?.user?.id;

	if (!userId) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "Login diperlukan.",
		});
	}

	await checkApiLimit(userId);
	await checkAiLimit(userId);

	return next({
		ctx: {
			...ctx,
			userId,
		},
	});
});