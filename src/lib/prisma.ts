import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
	prisma?: PrismaClient;
};

function createPrismaClient(): PrismaClient {
	try {
		const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
		return new PrismaClient({ adapter });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		throw new Error(`Failed to create PrismaClient: ${message}`);
	}
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}

export default prisma;
export { prisma };
