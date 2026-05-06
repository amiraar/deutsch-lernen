import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// NOTE: Do NOT import from @/lib/auth or @/lib/prisma here.
// This file runs in the Edge runtime, which cannot use Node.js-only modules
// (like the Prisma client). Session presence is checked via cookie only;
// full authentication is enforced in each route/server action.

const PUBLIC_PATHS = ["/", "/login", "/register"];
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/lesson",
  "/flashcards",
  "/tutor",
  "/profile",
];

// NextAuth stores the session token in one of these cookies.
const SESSION_COOKIE_NAMES = [
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
];

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy":
    "default-src 'self'; connect-src 'self' https://generativelanguage.googleapis.com https://api.groq.com https://api.anthropic.com",
};

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_PATHS.includes(pathname)) {
    return true;
  }

  return pathname.startsWith("/api/auth");
}

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function hasSessionCookie(request: NextRequest): boolean {
  return SESSION_COOKIE_NAMES.some((name) => request.cookies.has(name));
}

function applySecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return applySecurityHeaders(NextResponse.next());
  }

  if (isProtectedPath(pathname)) {
    if (!hasSessionCookie(request)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/login";
      redirectUrl.searchParams.set("from", pathname);
      return applySecurityHeaders(NextResponse.redirect(redirectUrl));
    }
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
