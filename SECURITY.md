# Security Policy

Fill the placeholders in square brackets before launch. `public/.well-known/security.txt`
must point at the same contact address as this file.

## Reporting a vulnerability

Email `[EMAIL KEAMANAN]`. Include the affected URL, the steps to reproduce, and
the impact you observed. Expect an acknowledgement within 3 working days.

Allowed while testing: your own account, your own data, read-only probing.
Not allowed: automated scanning that degrades the service, accessing other
users' data, social engineering, physical attacks, and public disclosure before
a fix is deployed.

## Supported scope

| In scope | Out of scope |
| --- | --- |
| The deployed web application and its tRPC API | Vercel, Neon, Upstash, Resend infrastructure (report to those vendors) |
| Authentication, authorization, rate limiting | Findings that only apply with a compromised device |
| Data export and account deletion flows | Missing hardening with no demonstrated impact |

## Current security posture

- Passwords: bcrypt, cost 12, maximum 72 bytes (the bcrypt limit).
- Sessions: Auth.js JWT in an httpOnly, secure, SameSite=Lax cookie; 7-day
  lifetime counted from sign-in. A password change or account deletion revokes
  every other session within 5 minutes (the token sync interval), including
  sessions issued before this control existed.
- Rate limiting: login and register are limited per IP (5 / 15 min) and per
  account (10 / 15 min); the API is limited per user (60 / min) and AI calls
  per user (10 / hour). Redis-backed, with an in-memory insurance limiter.
- Transport: HTTPS enforced by the host, HSTS for two years including
  subdomains, `sslmode=require` on the database connection.
- Content-Security-Policy: per-request nonce with `strict-dynamic`, no
  `unsafe-inline` in `script-src`. `style-src` keeps `unsafe-inline` because
  React writes inline `style` attributes.
- Authorization: every tRPC query and mutation scopes database access to the
  session user id; there are no admin roles and no cross-user endpoints.
- Supply chain: CI runs `npm audit --omit=dev --audit-level=critical`, gitleaks
  scans the full history, Dependabot opens weekly update PRs.
- Logging: security events are emitted as single-line JSON (`{"type":"security"}`)
  with masked email addresses. No credentials, tokens or hashes are logged.

## Accepted gaps

These are known, deliberate, and recorded rather than silently ignored.

- **No MFA/TOTP.** There is no admin role, no payment data, and no personal data
  beyond email, name and learning progress. Revisit if any of that changes.
- **Four high npm advisories in Prisma CLI tooling** (`deepmerge-ts`, `mysql2`
  via `@prisma/config`). They are build-time only and not reachable at runtime;
  the only fix offered is a breaking downgrade to `prisma@6`.
- **Translation and pronunciation exercises are graded as participation.**
  Multiple-choice and fill-in-the-blank answers are re-graded server-side; the
  other two would need an AI call per answer. XP is awarded once per lesson, so
  neither can be farmed.
- **Rate limiting fails open** when the limiter itself errors. A `rate_limit_error`
  security event is logged. Failing closed would lock every user out during a
  Redis incident.

## Incident response

See `docs/security-runbook.md` for severity levels, containment steps, secret
rotation, and the 3x24-hour notification duty under UU No. 27 Tahun 2022.
