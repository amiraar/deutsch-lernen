import { describe, expect, it } from "vitest";

import { getClientIp } from "@/lib/getClientIp";
import { sanitizeAiInput } from "@/lib/sanitizeAiInput";

describe("getClientIp", () => {
	const request = (headers: Record<string, string>) =>
		new Request("http://localhost/", { headers });

	it("uses the last x-forwarded-for hop, which the platform appends", () => {
		expect(getClientIp(request({ "x-forwarded-for": "1.1.1.1, 2.2.2.2" }))).toBe("2.2.2.2");
	});

	it("falls back to x-real-ip, then to a fixed key", () => {
		expect(getClientIp(request({ "x-real-ip": "3.3.3.3" }))).toBe("3.3.3.3");
		expect(getClientIp(request({}))).toBe("unknown");
	});
});

describe("sanitizeAiInput", () => {
	it("strips control characters but keeps newlines", () => {
		expect(sanitizeAiInput(" Hallo\u0000\u0007\nWelt ")).toBe("Hallo\nWelt");
	});

	it("caps the length at 2000 characters", () => {
		expect(sanitizeAiInput("a".repeat(5000))).toHaveLength(2000);
	});
});
