import { Resend } from "resend";

/**
 * Transactional email, used only for password reset.
 *
 * Without RESEND_API_KEY the reset link is logged instead of sent, which keeps
 * local development usable. In production a missing key throws: a silent no-op
 * would leave users locked out with no error anywhere.
 */

let client: Resend | undefined;

function isProduction(): boolean {
	return process.env.NODE_ENV === "production";
}

function getClient(): Resend {
	const apiKey = process.env.RESEND_API_KEY;

	if (!apiKey) {
		throw new Error("RESEND_API_KEY is not set");
	}

	return (client ??= new Resend(apiKey));
}

function getSender(): string {
	const from = process.env.EMAIL_FROM;

	if (!from) {
		throw new Error("EMAIL_FROM is not set");
	}

	return from;
}

/**
 * Absolute base URL used to build links inside emails. Never taken from the
 * request: a Host header under the attacker's control would turn a reset link
 * into a token-harvesting link.
 */
export function getAppUrl(): string {
	const configured = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;

	if (configured) {
		return configured.replace(/\/+$/, "");
	}

	const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

	if (vercelUrl) {
		return `https://${vercelUrl}`;
	}

	if (isProduction()) {
		throw new Error("AUTH_URL (or NEXTAUTH_URL) must be set in production");
	}

	return "http://localhost:3000";
}

export async function sendPasswordResetEmail(params: {
	to: string;
	resetUrl: string;
}): Promise<void> {
	const { to, resetUrl } = params;

	if (!process.env.RESEND_API_KEY && !isProduction()) {
		console.warn(`[Email] RESEND_API_KEY not set. Reset link for ${to}: ${resetUrl}`);
		return;
	}

	const { error } = await getClient().emails.send({
		from: getSender(),
		to,
		subject: "Reset password Deutsch Lernen",
		text: [
			"Kami menerima permintaan reset password untuk akun ini.",
			"",
			`Buka tautan berikut untuk membuat password baru: ${resetUrl}`,
			"",
			"Tautan berlaku 30 menit dan hanya bisa dipakai satu kali.",
			"Jika bukan kamu yang meminta, abaikan email ini. Password lama tetap aktif.",
		].join("\n"),
	});

	if (error) {
		// Message only: the Resend error object can echo the recipient address.
		throw new Error(`Failed to send password reset email: ${error.message}`);
	}
}
