import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import prisma from "@/lib/prisma";
import { checkAuthLimit } from "@/lib/rateLimit";

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
	session: { strategy: "jwt" },
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
		jwt: async ({ token, user }) => {
			if (user) {
				token.id = user.id;
				token.level = user.level;
				token.xp = user.xp;
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (session.user) {
				session.user.id = token.id ?? session.user.id;
				session.user.level = token.level ?? session.user.level;
				session.user.xp = token.xp ?? session.user.xp;
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
		error: "/login",
	},
});
