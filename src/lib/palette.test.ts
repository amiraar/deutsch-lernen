import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * Guardrail for the design tokens in src/app/globals.css: components must use
 * theme colours (bg-primary, text-success, bg-level-a1, …), not raw Tailwind
 * palette shades, so the palette stays consistent and contrast-checked.
 */
const RAW_PALETTE =
	/\b(?:bg|text|border|ring|from|to|via|fill|stroke|outline|divide|placeholder)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g;
const HEX_COLOR = /#[0-9a-fA-F]{6}\b/g;

const SRC = join(process.cwd(), "src");

function componentFiles(dir: string): string[] {
	return readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) {
			return name === "generated" ? [] : componentFiles(path);
		}
		return path.endsWith(".tsx") ? [path] : [];
	});
}

describe("colour palette", () => {
	it("components only use theme colour tokens", () => {
		const offenders = componentFiles(SRC).flatMap((file) => {
			const source = readFileSync(file, "utf8");
			const matches = [...(source.match(RAW_PALETTE) ?? []), ...(source.match(HEX_COLOR) ?? [])];
			return matches.map((match) => `${relative(SRC, file)}: ${match}`);
		});

		expect(offenders).toEqual([]);
	});
});
