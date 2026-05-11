import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			email: string;
			emailVerified?: Date | null;
			name: string;
			image?: string | null;
			level: string;
			xp: number;
		};
	}

	interface User {
		id?: string;
		level?: string;
		xp?: number;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id?: string;
		level?: string;
		xp?: number;
		syncedAt?: number;
		onboardingDone?: boolean;
	}
}
