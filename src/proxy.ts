import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

export function proxy(request: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";
  const nonce = crypto.randomUUID();
  const contentSecurityPolicy = buildCspHeader(nonce, isDev);
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", contentSecurityPolicy);

  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
