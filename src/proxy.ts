import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/register"];

function isPublic(pathname: string): boolean {
  return (
    PUBLIC_PATHS.includes(pathname) ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  );
}

function buildCspHeader(nonce: string, isDev: boolean): string {
  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""};
    style-src 'self' 'nonce-${nonce}'${isDev ? " 'unsafe-inline'" : ""};
    style-src-elem 'self' 'nonce-${nonce}'${isDev ? " 'unsafe-inline'" : ""};
    style-src-attr${isDev ? " 'unsafe-inline'" : " 'none'"};
    img-src 'self' blob: data:;
    font-src 'self';
    connect-src 'self' https://generativelanguage.googleapis.com https://api.groq.com https://api.anthropic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;

  return csp.replace(/\s{2,}/g, " ").trim();
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDev = process.env.NODE_ENV === "development";
  const nonce = crypto.randomUUID();
  const contentSecurityPolicy = buildCspHeader(nonce, isDev);
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);

  if (!isPublic(pathname)) {
    const session = await auth();
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", contentSecurityPolicy);

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
