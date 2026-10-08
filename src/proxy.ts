import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/register"];

function isPublic(pathname: string): boolean {
  return (
    PUBLIC_PATHS.includes(pathname) ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/trpc") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  );
}

/**
 * Per-request CSP with a nonce, so script-src needs no 'unsafe-inline'.
 *
 * Next.js reads the nonce from this header during SSR and attaches it to every
 * script tag it emits. 'strict-dynamic' then lets those scripts load their own
 * chunks. 'unsafe-eval' is only needed by the dev server (React Refresh).
 *
 * style-src keeps 'unsafe-inline': React writes `style` attributes, and a
 * nonce cannot cover those.
 */
function buildCsp(nonce: string): string {
  const isDev = process.env.NODE_ENV !== "production";

  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://avatars.githubusercontent.com",
    "media-src 'self' blob:",
    "connect-src 'self'",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const nonce = crypto.randomUUID().replace(/-/g, "");
  const csp = buildCsp(nonce);

  if (!isPublic(pathname)) {
    const session = await auth();
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const token = (session as { token?: { onboardingDone?: boolean } }).token;
    const shouldRedirectToOnboarding =
      token?.onboardingDone === false &&
      pathname !== "/onboarding" &&
      !pathname.startsWith("/api");

    if (shouldRedirectToOnboarding) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  // The renderer reads the nonce from the request headers, not the response.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // Remaining security headers are set in next.config.ts, which also covers
  // responses this proxy does not run on.
  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
