import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
	prisma?: PrismaClient;
};

function createPrismaClient(): PrismaClient {
	try {
		return new PrismaClient();
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
