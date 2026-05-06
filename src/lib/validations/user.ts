import { z } from "zod";

export const registerSchema = z.object({
	email: z.string().email("Format email tidak valid."),
	password: z.string().min(8, "Password minimal 8 karakter."),
	name: z.string().min(1, "Nama tidak boleh kosong."),
});

export const loginSchema = z.object({
	email: z.string().email("Format email tidak valid."),
	password: z.string().min(1, "Password tidak boleh kosong."),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
