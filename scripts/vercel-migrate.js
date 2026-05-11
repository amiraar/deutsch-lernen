const { execSync } = require("child_process");

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	console.error("[vercel-migrate] Missing DATABASE_URL. Aborting migrations.");
	process.exit(1);
}

console.log("[vercel-migrate] Running prisma migrate deploy...");

try {
	execSync("npx prisma migrate deploy", { stdio: "inherit" });
	console.log("[vercel-migrate] Migrations completed.");
} catch (error) {
	console.error("[vercel-migrate] Migrations failed.");
	process.exit(1);
}
