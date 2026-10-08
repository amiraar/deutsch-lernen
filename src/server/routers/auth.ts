import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { z } from "zod";

import { getAppUrl, sendPasswordResetEmail } from "@/lib/email";
import { getClientIp } from "@/lib/getClientIp";
import { checkAuthAccountLimit, checkAuthLimit } from "@/lib/rateLimit";
import { LevelEnum } from "@/generated/prisma/client";
import { toUserMessage } from "@/lib/toUserMessage";
import { logSecurityEvent } from "@/lib/securityLog";
import {
	registerSchema,
	requestPasswordResetSchema,
	resetPasswordSchema,
} from "@/lib/validations/user";
import { protectedProcedure, publicProcedure, router } from "@/server/trpc";

const PASSWORD_RESET_TTL_MS = 30 * 60 * 1000;
const PASSWORD_RESET_PREFIX = "password-reset:";

/**
 * Only the hash of a reset token is stored, so a leaked database dump cannot be
 * replayed as a set of working reset links.
 */
function hashResetToken(token: string): string {
	return crypto.createHash("sha256").update(token).digest("hex");
}

export const authRouter = router({
	register: publicProcedure
		.input(registerSchema)
		.mutation(async ({ ctx, input }) => {
			const ip = getClientIp(ctx.req);
			await checkAuthLimit(ip);
			await checkAuthAccountLimit(input.email);

			try {
				const existing = await ctx.prisma.user.findUnique({
					where: { email: input.email },
					select: { id: true },
				});

				if (existing) {
					throw new TRPCError({
						code: "CONFLICT",
						message: "Email sudah terdaftar.",
					});
				}

				const passwordHash = await bcrypt.hash(input.password, 12);

				const created = await ctx.prisma.user.create({
					data: {
						email: input.email,
						passwordHash,
						name: input.name,
						level: LevelEnum.A1,
						xp: 0,
						streakDays: 0,
					},
					select: {
						id: true,
						email: true,
						name: true,
						level: true,
						xp: true,
						streakDays: true,
					},
				});

				logSecurityEvent("account_created", {
					userId: created.id,
					ip,
				});

				return created;
			} catch (error) {
				if (error instanceof TRPCError) {
					throw error;
				}

				console.error("[auth.register]", error);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: toUserMessage(error, "Gagal membuat akun."),
				});
			}
		}),

	me: protectedProcedure.query(async ({ ctx }) => {
		try {
			return await ctx.prisma.user.findUnique({
				where: { id: ctx.userId },
				select: {
					id: true,
					email: true,
					name: true,
					level: true,
					xp: true,
					streakDays: true,
					avatarUrl: true,
					lastStudiedAt: true,
				},
			});
		} catch (error) {
			if (error instanceof TRPCError) {
				throw error;
			}

			console.error("[auth.me]", error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: toUserMessage(error, "Gagal mengambil profil pengguna."),
			});
		}
	}),

	requestPasswordReset: publicProcedure
		.input(requestPasswordResetSchema)
		.mutation(async ({ ctx, input }) => {
			const ip = getClientIp(ctx.req);
			await checkAuthLimit(ip);
			await checkAuthAccountLimit(input.email);

			try {
				const user = await ctx.prisma.user.findUnique({
					where: { email: input.email },
					select: { id: true, email: true },
				});

				if (user) {
					const rawToken = crypto.randomBytes(32).toString("base64url");
					const identifier = PASSWORD_RESET_PREFIX + user.id;

					// One live link per account: requesting a new one kills the old.
					await ctx.prisma.verificationToken.deleteMany({ where: { identifier } });
					await ctx.prisma.verificationToken.create({
						data: {
							identifier,
							token: hashResetToken(rawToken),
							expires: new Date(Date.now() + PASSWORD_RESET_TTL_MS),
						},
					});

					const resetUrl =
						getAppUrl() + "/reset-password?token=" + encodeURIComponent(rawToken);

					try {
						await sendPasswordResetEmail({ to: user.email, resetUrl });
						logSecurityEvent("password_reset_requested", {
							userId: user.id,
							email: user.email,
							ip,
						});
					} catch (sendError) {
						// Swallowed on purpose: a delivery failure must not turn this
						// endpoint into an oracle for which emails have an account.
						console.error("[auth.requestPasswordReset] send failed", sendError);
					}
				}

				// Identical response whether or not the account exists.
				return { ok: true };
			} catch (error) {
				if (error instanceof TRPCError) {
					throw error;
				}

				console.error("[auth.requestPasswordReset]", error);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: toUserMessage(error, "Gagal memproses permintaan reset."),
				});
			}
		}),

	resetPassword: publicProcedure
		.input(resetPasswordSchema)
		.mutation(async ({ ctx, input }) => {
			const ip = getClientIp(ctx.req);
			await checkAuthLimit(ip);

			const invalidToken = new TRPCError({
				code: "BAD_REQUEST",
				message: "Tautan reset tidak valid atau sudah kedaluwarsa.",
			});

			try {
				const record = await ctx.prisma.verificationToken.findUnique({
					where: { token: hashResetToken(input.token) },
					select: { id: true, identifier: true, expires: true },
				});

				if (
					!record ||
					!record.identifier.startsWith(PASSWORD_RESET_PREFIX) ||
					record.expires.getTime() < Date.now()
				) {
					if (record) {
						await ctx.prisma.verificationToken.deleteMany({
							where: { id: record.id },
						});
					}

					throw invalidToken;
				}

				const userId = record.identifier.slice(PASSWORD_RESET_PREFIX.length);
				const user = await ctx.prisma.user.findUnique({
					where: { id: userId },
					select: { id: true },
				});

				if (!user) {
					await ctx.prisma.verificationToken.deleteMany({ where: { id: record.id } });
					throw invalidToken;
				}

				const passwordHash = await bcrypt.hash(input.password, 12);

				// passwordChangedAt is what invalidates sessions minted before the reset.
				await ctx.prisma.$transaction([
					ctx.prisma.user.update({
						where: { id: userId },
						data: { passwordHash, passwordChangedAt: new Date() },
					}),
					ctx.prisma.verificationToken.deleteMany({
						where: { identifier: record.identifier },
					}),
				]);

				logSecurityEvent("password_reset_completed", { userId, ip });

				return { ok: true };
			} catch (error) {
				if (error instanceof TRPCError) {
					throw error;
				}

				console.error("[auth.resetPassword]", error);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: toUserMessage(error, "Gagal mengatur ulang password."),
				});
			}
		}),

	updateLevel: protectedProcedure
		.input(z.object({ level: z.nativeEnum(LevelEnum) }))
		.mutation(async ({ ctx, input }) => {
			try {
				const updated = await ctx.prisma.user.update({
					where: { id: ctx.userId },
					data: { level: input.level },
					select: { level: true },
				});

				return { level: updated.level };
			} catch (error) {
				if (error instanceof TRPCError) {
					throw error;
				}

				console.error("[auth.updateLevel]", error);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: toUserMessage(error, "Gagal memperbarui level."),
				});
			}
		}),
});
