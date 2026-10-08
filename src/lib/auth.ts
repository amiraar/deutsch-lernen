import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import prisma from "@/lib/prisma";
import { checkAuthAccountLimit, checkAuthLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/getClientIp";
import { logSecurityEvent } from "@/lib/securityLog";

const credentialsSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
	// 7 days instead of the 30-day default; every request refreshes it, so an
	// idle session expires after a week. Shorter life limits a stolen cookie,
	// which matters because a JWT session cannot be revoked server-side.
	session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60, updateAge: 24 * 60 * 60 },
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
				await checkAuthAccountLimit(parsed.data.email);

				const user = await prisma.user.findUnique({
					where: { email: parsed.data.email },
				});

				if (!user || !user.passwordHash) {
					logSecurityEvent("login_failed", {
						email: parsed.data.email,
						ip,
						reason: "unknown_account",
					});
					return null;
				}

				const isValid = await bcrypt.compare(
					parsed.data.password,
					user.passwordHash
				);

				if (!isValid) {
					logSecurityEvent("login_failed", {
						email: parsed.data.email,
						ip,
						userId: user.id,
						reason: "bad_password",
					});
					return null;
				}

				logSecurityEvent("login_succeeded", { userId: user.id, ip });

				return {
					id: user.id,
					email: user.email,
					emailVerified: null,
					name: user.name,
					image: user.avatarUrl ?? undefined,
					level: user.level,
					xp: user.xp,
				} as {
					id: string;
					email: string;
					emailVerified: null;
					name: string;
					image?: string;
					level: string;
					xp: number;
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
			const SYNC_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

			if (token.id) {
				const now = Date.now();
				const lastSync = typeof token.syncedAt === "number" ? token.syncedAt : 0;
				const needsSync = now - lastSync > SYNC_INTERVAL_MS;

				if (needsSync) {
					let fresh: {
						level: string;
						xp: number;
						lastStudiedAt: Date | null;
						passwordChangedAt: Date | null;
					} | null = null;
					let lookupFailed = false;

					try {
						fresh = await prisma.user.findUnique({
							where: { id: token.id as string },
							select: {
								level: true,
								xp: true,
								lastStudiedAt: true,
								passwordChangedAt: true,
							},
						});
					} catch {
						// Non-fatal: a database blip must not log everyone out, so the
						// stale token is kept and revocation is retried on the next sync.
						lookupFailed = true;
					}

					if (!lookupFailed && !fresh) {
						// The row is gone (account deleted): drop the session.
						logSecurityEvent("session_revoked", {
							userId: token.id as string,
							reason: "account_deleted",
						});
						return null;
					}

					if (fresh) {
						const changedAt = fresh.passwordChangedAt?.getTime() ?? 0;

						if (typeof token.pwdAt !== "number") {
							token.pwdAt = changedAt;
						} else if (changedAt > token.pwdAt) {
							// Password changed elsewhere; a JWT cannot be revoked server-side,
							// so returning null here is what clears the cookie.
							logSecurityEvent("session_revoked", {
								userId: token.id as string,
								reason: "password_changed",
							});
							return null;
						}

						token.level = fresh.level;
						token.xp = fresh.xp;
						token.onboardingDone = fresh.lastStudiedAt !== null;
						token.syncedAt = now;
					}
				}
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
