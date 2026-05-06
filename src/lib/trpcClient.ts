import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@/server/root";

/**
 * Client-side tRPC hooks.
 */
export const trpc = createTRPCReact<AppRouter>();
