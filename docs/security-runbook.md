# Security runbook

Operational procedures that cannot live in code. Owner: `[NAMA PENANGGUNG JAWAB]`.
Fill every placeholder in square brackets before launch.

## 1. Severity levels

| Level | Example | Response time |
| --- | --- | --- |
| S1 | Personal data exposed, database credentials leaked, admin-level access by a third party | Start containment immediately, notify within 3x24 hours |
| S2 | Account takeover of a single user, authentication or authorization bypass | Same working day |
| S3 | Rate-limit bypass, denial of service, information disclosure without personal data | Within 3 working days |
| S4 | Missing hardening with no demonstrated impact | Next release |

Decision maker for declaring an incident and for taking the service offline:
`[NAMA PENANGGUNG JAWAB]`.

## 2. Containment steps

1. **Capture evidence first.** Export the relevant Vercel logs and note the
   deployment id; containment destroys state.
2. **Revoke all sessions:** rotate `AUTH_SECRET` in the Vercel project and
   redeploy. Every JWT signed with the old secret stops validating, so every
   user is logged out.
3. **Cut database access:** rotate the Neon role password, update `DATABASE_URL`
   and `DIRECT_URL`, redeploy.
4. **Stop the bleeding if needed:** in Vercel, roll back to the last known good
   deployment, or disable the production deployment entirely.
5. **Rotate AI and infrastructure keys** if logs or environment variables may
   have leaked (see section 3).
6. **Reset affected accounts:** set `passwordChangedAt` to now for the affected
   users, which revokes their other sessions within 5 minutes:
   `UPDATE "User" SET "passwordChangedAt" = NOW() WHERE "email" = '...';`
7. **Write the timeline** while details are fresh: what was seen, when, what was
   changed, what is still unknown.

## 3. Secret rotation

Rotate quarterly, and immediately after any suspected exposure or when someone
with access leaves.

| Secret | Where | Note |
| --- | --- | --- |
| `AUTH_SECRET` | Vercel env | Rotation logs out every user |
| `DATABASE_URL`, `DIRECT_URL` | Neon + Vercel env | Rotate the role password, then both variables |
| `GEMINI_API_KEY` | Google AI Studio | |
| `GROQ_API_KEY` | Groq console | |
| `ANTHROPIC_API_KEY` | Anthropic console | Optional provider |
| `REDIS_URL` / `UPSTASH_REDIS_REST_TOKEN` | Upstash or Redis provider | Rate limits fall back to in-memory while rotating |
| `RESEND_API_KEY` | Resend dashboard | Password reset emails stop until updated |
| `EMAIL_FROM` | Vercel env | Not secret, but must match a verified Resend domain |

Record each rotation date in `[LOKASI CATATAN ROTASI]`.

## 4. Backup and restore drill

Neon keeps point-in-time history; an untested restore is not a backup. Run this
drill quarterly and after any schema migration that drops or rewrites data.

1. In the Neon console, create a branch from a timestamp roughly one hour old.
2. Point a local `.env` at the branch connection string.
3. Run `npx prisma migrate status` and a read query, for example
   `SELECT COUNT(*) FROM "User";` and `SELECT COUNT(*) FROM "LessonCompletion";`.
4. Record the wall-clock time from step 1 to a verified read: that is the real
   RTO. Target: `[TARGET RTO]`.
5. Delete the branch.

## 5. Log drain and alerts

Security events are written as single-line JSON by `src/lib/securityLog.ts`
with the field `"type":"security"`. Without a drain they live only in the Vercel
runtime log view and expire.

1. Vercel project → Observability → Log Drains → add the destination
   (`[TUJUAN LOG DRAIN]`).
2. Filter on `type:security` and alert on:

| Condition | Meaning | Action |
| --- | --- | --- |
| More than 20 `login_failed` from one IP in 10 minutes | Credential stuffing | Block the IP at the WAF, check for successes from it |
| Any `rate_limit_blocked` with `scope:auth_account` | Distributed attack on one account | Contact the account owner, consider a forced reset |
| Any `rate_limit_error` | The limiter failed and requests were let through | Check Redis availability |
| Any `session_revoked` with `reason:password_changed` not matching a reset request | Possible account takeover | Investigate that user id |
| `account_deleted` spikes | Mass deletion, possibly automated | Verify against registration rate |

Retention: 90 days, matching the privacy policy.

## 6. Email authentication DNS

Required for the Resend sending domain before password reset emails are
trustworthy. Without them, reset emails land in spam and the domain is easy to
spoof.

- SPF: `v=spf1 include:_spf.resend.com ~all` (merge with existing records, one
  SPF record per domain).
- DKIM: the CNAME records Resend generates for the domain.
- DMARC: start at `v=DMARC1; p=quarantine; rua=mailto:[EMAIL LAPORAN DMARC]`,
  move to `p=reject` once reports are clean.

Verify with `dig TXT [DOMAIN]` and `dig TXT _dmarc.[DOMAIN]`.

## 7. Manual authorization test (run before each launch)

Automated scanners do not find authorization bugs. Use two real accounts, A and
B, both created on a non-production database.

1. Log in as A, open DevTools, and capture the tRPC request for
   `lesson.getLessonMeta`.
2. Replay it with B's lesson completion ids and with B's user id injected in
   every field you can find. Expect no B data in any response.
3. As A, call `flashcard.review` with a card id belonging to B. Expect a
   rejection, not a silent success.
4. As A, call `progress.getUserStats` and `auth.exportMyData`. Confirm every row
   returned belongs to A.
5. Complete a lesson as A, then replay the same `lesson.completeLesson` payload
   five times. Expect `xpAwarded: 0` after the first call and no change in
   `User.xp`.
6. Submit a `lesson.completeLesson` payload with deliberately wrong answers but
   a full set of exercise ids. Expect the returned score to reflect the wrong
   answers.
7. Request a password reset for B from A's browser, then try B's old password.
   Expect the old password to keep working until the reset link is used.

Record the date, who ran it, and the outcome in `[LOKASI CATATAN UJI]`.

## 8. Notification duty (UU No. 27 Tahun 2022)

If personal data is exposed, written notification must reach the affected data
subjects and the supervisory authority within 3x24 hours. Template:

> Pada [TANGGAL DAN WAKTU] kami mendeteksi [JENIS INSIDEN] yang memengaruhi
> [JUMLAH] akun. Data yang terdampak: [DAFTAR DATA]. Penyebab: [PENYEBAB].
> Tindakan yang sudah diambil: [TINDAKAN]. Langkah yang kami sarankan:
> [SARAN UNTUK PENGGUNA]. Kontak: [EMAIL KONTAK].

Keep the sent notification, the recipient list, and the timeline for audit.

## 9. Pre-launch checklist

- [ ] All placeholders in `SECURITY.md`, `public/.well-known/security.txt`,
      `/privacy` and `/terms` replaced.
- [ ] `SEED_DEMO_USERS` is unset in production, and no `user1@example.com` /
      `user2@example.com` row exists in the production database.
- [ ] `AUTH_SECRET` is at least 32 bytes and was never committed.
- [ ] `AUTH_URL` (or `NEXTAUTH_URL`) points at the production domain, so reset
      links are not built from a request header.
- [ ] `RESEND_API_KEY` and `EMAIL_FROM` set, sending domain verified, SPF/DKIM/
      DMARC in place.
- [ ] Redis configured, so rate limits are shared across instances.
- [ ] Log drain active with the alerts in section 5.
- [ ] Restore drill done at least once, RTO recorded.
- [ ] Manual authorization test (section 7) passed on this release.
