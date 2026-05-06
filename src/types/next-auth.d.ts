import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			email: string;
			name: string;
			image?: string;
			level: string;
			xp: number;
		};
	}

	interface User {
		level?: string;
		xp?: number;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id?: string;
		level?: string;
		xp?: number;
	}
}
