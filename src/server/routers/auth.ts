import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { getClientIp } from "@/lib/getClientIp";
import { checkAuthLimit } from "@/lib/rateLimit";
import { LevelEnum } from "@/generated/prisma/client";
import { toUserMessage } from "@/lib/toUserMessage";
import { registerSchema } from "@/lib/validations/user";
import { protectedProcedure, publicProcedure, router } from "@/server/trpc";

export const authRouter = router({
	register: publicProcedure
		.input(registerSchema)
		.mutation(async ({ ctx, input }) => {
			const ip = getClientIp(ctx.req);
			await checkAuthLimit(ip);

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

				return await ctx.prisma.user.create({
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
