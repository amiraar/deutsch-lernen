// Runs Vitest from the canonical path of the project directory.
//
// On Windows a terminal may report the drive as "c:" while Node resolves
// modules under "C:". Vitest then loads itself twice and every suite fails with
// "Cannot read properties of undefined (reading 'config')". realpath fixes the
// casing; on other platforms this is a no-op.
import { spawnSync } from "node:child_process";
import { realpathSync } from "node:fs";

process.chdir(realpathSync.native(process.cwd()));

const result = spawnSync("npx", ["vitest", "run", ...process.argv.slice(2)], {
	stdio: "inherit",
	shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
