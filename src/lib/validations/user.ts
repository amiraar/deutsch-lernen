import { z } from "zod";

// 72 bytes is bcrypt's own limit; anything longer is silently truncated.
const passwordSchema = z
	.string()
	.min(8, "Password minimal 8 karakter.")
	.max(72, "Password maksimal 72 karakter.");

export const registerSchema = z.object({
	email: z.string().email("Format email tidak valid."),
	password: passwordSchema,
	name: z
		.string()
		.min(1, "Nama tidak boleh kosong.")
		.max(100, "Nama maksimal 100 karakter."),
});

export const loginSchema = z.object({
	email: z.string().email("Format email tidak valid."),
	password: z.string().min(1, "Password tidak boleh kosong."),
});

export const requestPasswordResetSchema = z.object({
	email: z.string().email("Format email tidak valid."),
});

export const resetPasswordSchema = z.object({
	token: z.string().min(1, "Token tidak valid.").max(200, "Token tidak valid."),
	password: passwordSchema,
});

export const deleteAccountSchema = z.object({
	password: z.string().min(1, "Password tidak boleh kosong."),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type RequestPasswordResetInput = z.infer<typeof requestPasswordResetSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
