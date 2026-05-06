import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";

import { LevelEnum } from "@/generated/prisma";
import { registerSchema } from "@/lib/validations/user";
import { protectedProcedure, publicProcedure, router } from "@/server/trpc";

export const authRouter = router({
	register: publicProcedure
		.input(registerSchema)
		.mutation(async ({ ctx, input }) => {
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

				const message = error instanceof Error ? error.message : "Unknown error";
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: `Gagal membuat akun. ${message}`,
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
			const message = error instanceof Error ? error.message : "Unknown error";
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: `Gagal mengambil profil pengguna. ${message}`,
			});
		}
	}),
});
