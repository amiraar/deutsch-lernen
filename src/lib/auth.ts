import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import prisma from "@/lib/prisma";
import { checkAuthLimit } from "@/lib/rateLimit";

type SessionUser = DefaultSession["user"] & {
	id: string;
	level?: string;
	xp?: number;
};

declare module "next-auth" {
	interface Session {
		user: SessionUser;
	}
	interface User {
		emailVerified?: Date | null;
		level?: string;
		xp?: number;
	}
}

declare module "@auth/core/adapters" {
	interface AdapterUser {
		level?: string;
		xp?: number;
	}
}

const credentialsSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});

function getClientIp(request: Request): string {
	const forwardedFor = request.headers.get("x-forwarded-for");
	if (forwardedFor) {
		return forwardedFor.split(",")[0]?.trim() ?? "unknown";
	}

	return request.headers.get("x-real-ip") ?? "unknown";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: "database" },
	providers: [
		Credentials({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials, request) => {
				const parsed = credentialsSchema.safeParse(credentials);

				if (!parsed.success) {
					return null;
				}

				const ip = getClientIp(request);
				await checkAuthLimit(ip);

				const user = await prisma.user.findUnique({
					where: { email: parsed.data.email },
				});

				if (!user || !user.passwordHash) {
					return null;
				}

				const isValid = await bcrypt.compare(
					parsed.data.password,
					user.passwordHash
				);

				if (!isValid) {
					return null;
				}

				return {
					id: user.id,
					email: user.email,
					emailVerified: null,
					name: user.name,
					image: user.avatarUrl ?? undefined,
					level: user.level,
					xp: user.xp,
				};
			},
		}),
	],
	callbacks: {
		session: async ({ session, user }) => {
			const u = user as { id: string; name?: string | null; email?: string | null; level?: string; xp?: number };
			const sessionUser = session.user as SessionUser;
			sessionUser.id = u.id;
			sessionUser.level = u.level;
			sessionUser.xp = u.xp;
			sessionUser.name = u.name;
			sessionUser.email = u.email;

			return session;
		},
	},
});
