/**
 * Gets the client IP from common proxy headers.
 */
export function getClientIp(req: Request): string {
	const forwardedFor = req.headers.get("x-forwarded-for");
	if (forwardedFor) {
		const ips = forwardedFor
			.split(",")
			.map((ip) => ip.trim())
			.filter(Boolean);
		return ips[ips.length - 1] ?? "unknown";
	}
	return req.headers.get("x-real-ip") ?? "unknown";
}
