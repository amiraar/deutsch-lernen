/**
 * Structured security event logging.
 *
 * Emits one JSON line per event so a log drain (Vercel Log Drains, Datadog,
 * Better Stack) can alert on them. Never log credentials, tokens or password
 * hashes — identifiers only, and emails are masked.
 */

export type SecurityEvent =
	| "login_failed"
	| "login_succeeded"
	| "account_created"
	| "password_reset_requested"
	| "password_reset_completed"
	| "session_revoked"
	| "rate_limit_blocked"
	/** The limiter itself failed (e.g. Redis unreachable) and the request was let through. */
	| "rate_limit_error";

type SecurityEventDetail = {
	/** Masked by maskEmail before it reaches the log. */
	email?: string;
	userId?: string;
	ip?: string;
	reason?: string;
	scope?: string;
};

/** a***l@example.com — enough to correlate attempts without storing the address. */
function maskEmail(email: string): string {
	const [local, domain] = email.split("@");
	if (!domain) {
		return "invalid";
	}
	const head = local.slice(0, 1);
	const tail = local.length > 1 ? local.slice(-1) : "";
	return `${head}***${tail}@${domain}`;
}

export function logSecurityEvent(
	event: SecurityEvent,
	detail: SecurityEventDetail = {}
): void {
	const payload: Record<string, string> = {
		type: "security",
		event,
		at: new Date().toISOString(),
	};

	if (detail.email) payload.email = maskEmail(detail.email);
	if (detail.userId) payload.userId = detail.userId;
	if (detail.ip) payload.ip = detail.ip;
	if (detail.reason) payload.reason = detail.reason;
	if (detail.scope) payload.scope = detail.scope;

	console.warn(JSON.stringify(payload));
}
