# Prompt Guide: German Learning Platform
## Untuk GitHub Copilot / Cursor / Claude

Kirim prompt ini **berurutan**. Jangan loncat step. Tiap step membangun fondasi untuk step berikutnya.

---

## SEBELUM MULAI — Jalankan ini di terminal

```bash
npx create-next-app@latest deutsch-lernen \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd deutsch-lernen

npm install prisma @prisma/client
npm install next-auth@beta
npm install @auth/prisma-adapter
npm install trpc @trpc/server @trpc/client @trpc/next @trpc/react-query
npm install @tanstack/react-query
npm install zod
npm install ioredis
npm install @anthropic-ai/sdk
npm install @google/generative-ai
npm install openai
npm install bcryptjs
npm install @types/bcryptjs --save-dev
npm install rate-limiter-flexible
npm install framer-motion
npm install lucide-react

npx prisma init
```

---

## PROMPT 1 — Folder Structure & Config

> Kirim prompt ini pertama. Copilot akan memahami konteks seluruh project dari sini.

```
I am building a German language learning web app called "Deutsch Lernen" using:
- Next.js 14 App Router + TypeScript
- tRPC v11 for type-safe API
- Prisma ORM + PostgreSQL
- NextAuth v5
- Redis (ioredis) for caching and rate limiting
- Multi-provider AI layer: Gemini 1.5 Flash (primary) → Groq/Llama (fallback) → Claude Haiku (last resort)
- Tailwind CSS

Before writing any code, set up the complete folder structure inside /src:

/src
  /app
    /api
      /auth        — NextAuth route handler
      /trpc        — tRPC route handler
    /(auth)
      /login
      /register
    /(dashboard)
      /layout.tsx  — Protected layout with sidebar
      /dashboard
      /lesson/[id]
      /flashcards
      /tutor
      /profile
    layout.tsx     — Root layout
    page.tsx       — Landing page
  /components
    /ui            — Reusable primitives (Button, Input, Card, Badge, Modal)
    /lesson        — LessonCard, ExerciseBlock, ProgressBar
    /flashcard     — FlashcardDeck, FlashcardItem
    /tutor         — ChatBubble, ChatInput, TutorWindow
    /layout        — Navbar, Sidebar, Footer
  /server
    /routers       — tRPC routers (auth, lesson, flashcard, progress, tutor)
    /trpc.ts       — tRPC init and context
    /root.ts       — Root tRPC router
  /lib
    /prisma.ts     — Prisma singleton
    /redis.ts      — Redis singleton
    /auth.ts       — NextAuth config
    /ai.ts         — AI provider abstraction (primary entry point for all AI calls)
    /ai            — AI provider implementations
      /gemini.ts   — Google Gemini 1.5 Flash (primary, free tier)
      /groq.ts     — Groq Llama 3.3 (fallback, free tier)
      /claude.ts   — Claude Haiku (last resort, paid)
      /tts.ts      — Text-to-speech (Web Speech API + Google Cloud TTS fallback)
    /srs.ts        — SM-2 spaced repetition algorithm
    /rateLimit.ts  — Rate limiting helpers
    /cache.ts      — Cache helpers with TTL constants
    /validations   — Zod schemas (user.ts, lesson.ts, flashcard.ts)
  /types
    index.ts       — Shared TypeScript types and interfaces
  /constants
    index.ts       — App-wide constants (levels, XP values, etc.)
  /hooks
    useProgress.ts
    useFlashcard.ts
    useLocalStorage.ts
  /middleware.ts   — Auth middleware for protected routes

Create empty files for each of these with a one-line comment explaining what each file does.
Do NOT write any implementation yet. Structure only.
```

---

## PROMPT 2 — Prisma Schema (Database)

```
In /prisma/schema.prisma, write the complete Prisma schema for the German learning platform.

Requirements:
- Use PostgreSQL provider
- Every model must have: id (cuid), createdAt, updatedAt

Models needed:

User
- id, email (unique), passwordHash, name, avatarUrl
- level: Enum (A1, A2, B1, B2)
- xp: Int (default 0)
- streakDays: Int (default 0)
- lastStudiedAt: DateTime?
- relation: sessions, progress, flashcardReviews, lessonCompletions

Session (NextAuth)
- Standard NextAuth session fields

Lesson
- id, title, slug (unique), description
- level: Enum (A1, A2, B1, B2)
- order: Int
- content: Json  — stores structured lesson data
- estimatedMinutes: Int
- relation: exercises, completions

Exercise
- id, lessonId (FK)
- type: Enum (MULTIPLE_CHOICE, FILL_IN_BLANK, TRANSLATION, PRONUNCIATION)
- prompt: String
- correctAnswer: String
- options: String[]  — for multiple choice
- explanation: String  — shown after answering

VocabWord
- id, german, indonesian, example, exampleTranslation
- audioUrl: String?
- level: Enum (A1, A2, B1, B2)
- tags: String[]

FlashcardReview (SRS state per user per word)
- id, userId (FK), vocabWordId (FK)
- easeFactor: Float (default 2.5)  — SM-2
- interval: Int (default 1)  — days until next review
- repetitions: Int (default 0)
- nextReviewAt: DateTime
- lastReviewedAt: DateTime?

LessonCompletion
- id, userId (FK), lessonId (FK)
- score: Int  — 0-100
- xpEarned: Int
- completedAt: DateTime

Add appropriate indexes on: userId, lessonId, nextReviewAt, slug, level.
Add unique constraints where needed (e.g. one FlashcardReview per user per word).
```

---

## PROMPT 3 — Singletons & Core Lib

```
In /src/lib/, implement these files. Follow these rules for ALL files:
- Export a single instance, not a class
- Add JSDoc comments on every exported function
- Handle errors explicitly — never let errors go silently

FILE 1: prisma.ts
- Create a Prisma client singleton that reuses the connection in development (prevent hot-reload from creating multiple connections)
- Use globalThis pattern

FILE 2: redis.ts
- Create an ioredis singleton
- Read REDIS_URL from process.env (throw clear error if missing)
- Export typed helper functions:
  - get<T>(key: string): Promise<T | null>
  - set(key: string, value: unknown, ttlSeconds: number): Promise<void>
  - del(key: string): Promise<void>
  - exists(key: string): Promise<boolean>
- All keys must be prefixed with "dl:" (deutsch-lernen)

FILE 3: /src/lib/ai/gemini.ts
- Google Gemini 1.5 Flash provider using @google/generative-ai SDK
- Read GEMINI_API_KEY from process.env
- Export:
  - generateChatResponse(messages: Message[], systemPrompt: string): Promise<string>
  - generateStructuredOutput<T>(prompt: string, schema: string): Promise<T>
    — instructs model to return JSON only, parses and returns typed result
- On rate limit error (HTTP 429): throw AIRateLimitError (custom error class)
- Log provider name on each call: console.info('[AI] gemini')

FILE 4: /src/lib/ai/groq.ts
- Groq provider using openai SDK (Groq is OpenAI-compatible)
- Base URL: https://api.groq.com/openai/v1
- Model: llama-3.3-70b-versatile
- Read GROQ_API_KEY from process.env
- Export same interface as gemini.ts:
  - generateChatResponse(messages: Message[], systemPrompt: string): Promise<string>
  - generateStructuredOutput<T>(prompt: string, schema: string): Promise<T>
- On rate limit error: throw AIRateLimitError
- Log provider name on each call: console.info('[AI] groq')

FILE 5: /src/lib/ai/claude.ts
- Claude Haiku provider using @anthropic-ai/sdk
- Read ANTHROPIC_API_KEY from process.env
- Export same interface as gemini.ts:
  - generateChatResponse(messages: Message[], systemPrompt: string): Promise<string>
  - generateStructuredOutput<T>(prompt: string, schema: string): Promise<T>
    — use Anthropic's native JSON mode
- Log provider name on each call: console.info('[AI] claude-haiku')

FILE 6: /src/lib/ai.ts  ← THE ONLY FILE THE REST OF THE APP IMPORTS
- This is the unified AI abstraction. All tRPC routers import ONLY this file, never the provider files directly.
- Read AI_PROVIDER_ORDER from process.env (default: "gemini,groq,claude")
  — comma-separated, determines fallback order at runtime
- Import all three providers
- Export these two functions that all routers will use:

  /**
   * Calls AI providers in priority order. Falls back automatically on rate limit.
   * Never call provider files directly — always use this.
   */
  async function generateTutorResponse(
    messages: Message[],
    userLevel: string
  ): Promise<string>
  — System prompt: "You are a German language tutor. The student speaks Indonesian.
     Current level: {level}. Explain grammar in Indonesian. Use German for examples. Be concise."
  — Try providers in order from AI_PROVIDER_ORDER
  — On AIRateLimitError: log warning and try next provider
  — On all providers exhausted: throw Error("AI sementara tidak tersedia. Coba lagi nanti.")

  /**
   * Evaluates a German sentence. Falls back automatically on rate limit.
   */
  async function evaluateWriting(
    german: string,
    expectedMeaning: string,
    level: string
  ): Promise<EvaluationResult>
  — Build prompt asking for JSON: { isCorrect, score, feedback, corrections[] }
  — Schema to include in prompt:
    "Return ONLY valid JSON matching: { isCorrect: boolean, score: number (0-100),
     feedback: string (in Indonesian), corrections: Array<{ original: string,
     corrected: string, explanation: string }> }"
  — Try providers in order using generateStructuredOutput<EvaluationResult>
  — On AIRateLimitError: try next provider
  — On parse failure: retry once with more explicit prompt before falling back

- Also export:
  - getActiveProvider(): string  — returns which provider is currently responding (for debug UI)
  - AIRateLimitError class — so other files can catch it specifically if needed

FILE 7: srs.ts
- Implement the SM-2 spaced repetition algorithm
- Export one function: calculateNextReview(card: SRSCard, quality: number): SRSResult
  - quality: 0-5 (0-2 = wrong, 3-5 = correct with varying ease)
  - Returns: { easeFactor, interval, repetitions, nextReviewAt }
- Add unit-testable pure functions only — no database calls
- Add detailed comments explaining each step of SM-2
```

---

## PROMPT 4 — Security & Rate Limiting

```
In /src/lib/rateLimit.ts, implement rate limiting using rate-limiter-flexible with Redis as the store.

Create these rate limiters:

1. authLimiter
   - 5 attempts per 15 minutes per IP
   - Used on: login, register endpoints
   - On exceed: throw error with message "Too many attempts. Try again in X minutes."

2. apiLimiter  
   - 100 requests per minute per userId
   - Used on: all tRPC procedures
   - On exceed: throw TRPCError with code TOO_MANY_REQUESTS

3. aiLimiter
   - 20 requests per hour per userId
   - Used on: AI tutor and writing evaluation endpoints only
   - On exceed: throw TRPCError with code TOO_MANY_REQUESTS and message "AI limit reached. Resets in X minutes."

Export helper functions:
- checkAuthLimit(ip: string): Promise<void>
- checkApiLimit(userId: string): Promise<void>
- checkAiLimit(userId: string): Promise<void>

Also create /src/middleware.ts:
- Use NextAuth middleware to protect all routes under /(dashboard)
- Allow public access to: /, /login, /register, /api/auth/*
- Redirect unauthenticated users to /login
- Add security headers using Next.js headers config:
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: strict-origin-when-cross-origin
  - Content-Security-Policy: (restrict to self + generativelanguage.googleapis.com + api.groq.com + api.anthropic.com)

In /src/lib/cache.ts, implement a caching layer:
- Export TTL constants:
  LESSON_TTL = 3600 (1 hour)
  VOCAB_TTL = 86400 (24 hours)  
  USER_STATS_TTL = 300 (5 minutes)
  SRS_QUEUE_TTL = 60 (1 minute)

- Export cached fetch helpers:
  getCachedLesson(id: string)
  getCachedVocabList(level: string)
  getCachedUserStats(userId: string)
  invalidateUserStats(userId: string)

Each function must check Redis first, fall back to Prisma query, then write to Redis.
```

---

## PROMPT 5 — tRPC Setup & Routers

```
Set up tRPC v11 in /src/server/.

FILE: trpc.ts
- Initialize tRPC with context: { session, prisma, redis, req }
- Create base procedure (publicProcedure)
- Create protected procedure (protectedProcedure) that:
  - Throws UNAUTHORIZED if no session
  - Calls checkApiLimit(userId) on every request
  - Adds userId to context
- Create AI procedure (aiProcedure) that extends protectedProcedure and also calls checkAiLimit(userId)

FILE: routers/lesson.ts
Implement these procedures:
- getLessons(level?: LevelEnum) — returns lessons with completion status for current user. Cache results.
- getLessonById(id: string) — returns full lesson with exercises. Cache result.
- completeLesson(lessonId, score) — marks complete, calculates XP (score/10 * 10), updates user XP and streak, invalidates user stats cache. Protected.

FILE: routers/flashcard.ts  
- getDueCards() — returns cards where nextReviewAt <= now, limit 20. Protected.
- reviewCard(cardId, quality: 0-5) — calls srs.calculateNextReview(), updates DB, returns next state. Protected.
- addWordToReview(vocabWordId) — creates FlashcardReview with default SM-2 values. Protected.

FILE: routers/progress.ts
- getUserStats() — returns xp, level, streakDays, lessonsCompleted count, wordsLearned count. Use cache.
- getRecentActivity() — last 7 days of lesson completions and reviews.

FILE: routers/tutor.ts (uses aiProcedure)
- Import ONLY from '@/lib/ai' — never import provider files directly
- chat(messages: Message[]) — calls ai.generateTutorResponse(), returns string response.
- evaluateWriting(german: string, expectedMeaning: string) — calls ai.evaluateWriting(), returns EvaluationResult.
- getProviderStatus() — calls ai.getActiveProvider(), returns current provider name for debug display.

FILE: root.ts
- Merge all routers into appRouter
- Export type AppRouter for client usage

Rules for ALL routers:
- Input validation with Zod on every procedure
- No raw SQL — use Prisma query builder only
- Error messages must be user-friendly (Indonesian)
- Sensitive fields (passwordHash) must never be returned in any query output — use Prisma select explicitly
```

---

## PROMPT 6 — Auth Setup

```
Configure NextAuth v5 in /src/lib/auth.ts.

Requirements:
- Use Credentials provider (email + password)
- Use PrismaAdapter for session persistence
- On signIn:
  1. Call checkAuthLimit(req.ip) first — throw if rate limited
  2. Find user by email
  3. Compare password with bcryptjs.compare()
  4. Return null if invalid (NextAuth will handle error)
- On register (separate tRPC mutation in auth router):
  1. Validate with Zod: email format, password min 8 chars
  2. Check if email already exists
  3. Hash password with bcryptjs.hash(password, 12)
  4. Create user with default level A1
  5. Never return passwordHash in response

Session strategy: database
Include in session token: id, email, name, level, xp

Create /src/app/api/auth/[...nextauth]/route.ts that exports the NextAuth handler.

Create /src/server/routers/auth.ts with:
- register(email, password, name): publicProcedure
- me(): protectedProcedure — returns current user profile without passwordHash
```

---

## PROMPT 7 — UI Components (Primitives)

```
In /src/components/ui/, create reusable primitive components with Tailwind CSS.

Design direction: Clean, modern, slightly academic. Think Duolingo meets a serious dictionary app.
Color palette:
- Primary: Indigo (#4F46E5)
- Success: Emerald (#10B981)
- Warning: Amber (#F59E0B)
- Error: Rose (#F43F5E)
- Background: Slate-50
- Text: Slate-900

Rules for ALL components:
- Full TypeScript with explicit prop types and JSDoc
- Forward refs where appropriate (Input, Button)
- Support className prop for overrides (use cn() utility)
- Accessible: proper aria attributes, focus rings
- No hardcoded colors — use Tailwind semantic classes

Create cn() utility in /src/lib/utils.ts using clsx + tailwind-merge.

Components to create:

Button.tsx
- Variants: primary, secondary, ghost, danger
- Sizes: sm, md, lg
- States: loading (spinner), disabled
- Props: variant, size, isLoading, leftIcon, rightIcon

Input.tsx
- Props: label, error, hint, leftIcon, rightIcon
- Show error state with red border + error message below

Card.tsx
- Variants: default (white bg, border), elevated (white bg, shadow), colored
- Props: children, className, as (for semantic HTML)

Badge.tsx
- Variants: A1, A2, B1, B2 levels — each with distinct color
- General purpose: success, warning, error, neutral

ProgressBar.tsx
- Props: value (0-100), label, showPercent
- Smooth CSS transition on value change

Modal.tsx
- Focus trap inside modal
- Close on Escape or backdrop click
- Props: isOpen, onClose, title, children

LoadingSpinner.tsx
- Sizes: sm, md, lg
- Accessible with aria-label

All components must be exported from /src/components/ui/index.ts
```

---

## PROMPT 8 — Lesson & Flashcard Components

```
Create the core learning components.

FILE: /src/components/lesson/ExerciseBlock.tsx
A component that renders one exercise based on its type.
- MULTIPLE_CHOICE: show prompt + 4 buttons, highlight correct/wrong on answer
- FILL_IN_BLANK: show sentence with input field, validate on submit
- TRANSLATION: textarea for writing German, submit button, show AI feedback after submit
- PRONUNCIATION: microphone button, record audio, send to evaluation endpoint
Each type is a separate sub-component inside the same file.
After answering, always show: explanation, correct answer if wrong, XP earned.
Props: exercise: Exercise, onComplete: (correct: boolean) => void

FILE: /src/components/lesson/LessonProgress.tsx
Shows: current exercise number / total, XP earned so far, time elapsed.
Use ProgressBar component.

FILE: /src/components/flashcard/FlashcardItem.tsx
- Shows German word on front, Indonesian + example on back
- Flip animation with CSS transform (no external lib)
- After flip: show 4 buttons: Lagi (0), Sulit (1), Oke (3), Mudah (5)
  — numbers map to SM-2 quality score
- Props: word: VocabWord, onRate: (quality: 0|1|3|5) => void

FILE: /src/components/flashcard/FlashcardDeck.tsx
- Manages a queue of FlashcardItem
- Shows: X cards remaining, progress bar
- When queue empty: show completion screen with cards reviewed count
- Fetches due cards from tRPC: trpc.flashcard.getDueCards

FILE: /src/components/tutor/TutorWindow.tsx
- Chat interface: message history, input box, send button
- User messages right-aligned, AI messages left-aligned
- Show typing indicator (animated dots) while waiting for response
- Calls trpc.tutor.chat
- Persists message history in component state (not DB — keep simple)
- Show "AI limit: X/20 used today" in corner
- Show active provider badge (kecil, di footer): "via Gemini" / "via Groq" / "via Claude"
  — fetch from trpc.tutor.getProviderStatus setiap kali response diterima

Rules:
- All components use tRPC hooks for data fetching
- Loading and error states must be handled in every component
- No prop drilling deeper than 2 levels — use composition instead
```

---

## PROMPT 9 — Pages & Layout

```
Create the app pages and layout.

FILE: /src/app/(dashboard)/layout.tsx
- Sidebar navigation: Dashboard, Pelajaran, Flashcards, AI Tutor, Profil
- Show user name, level badge, XP in sidebar footer
- Active route highlighted
- Responsive: sidebar collapses to bottom nav on mobile
- Fetch user data from trpc.progress.getUserStats on load

FILE: /src/app/(dashboard)/dashboard/page.tsx
- Server component where possible
Sections:
1. Greeting + streak (e.g. "Selamat pagi! Hari ke-7 berturut-turut 🔥")
2. Daily goal progress bar (e.g. 2/3 pelajaran hari ini)
3. "Lanjutkan" card — next lesson to complete
4. SRS due count — "X kata siap direview"
5. Recent activity list — last 5 completions with score and XP

FILE: /src/app/(dashboard)/lesson/[id]/page.tsx
- Fetch lesson by id (server-side with cache)
- Render exercises sequentially using ExerciseBlock
- Track score (correct answers / total)
- On completion: call trpc.lesson.completeLesson, show score modal with XP earned
- "Lanjutkan ke pelajaran berikutnya" button in modal

FILE: /src/app/(dashboard)/flashcards/page.tsx
- Render FlashcardDeck
- If no cards due: show "Tidak ada kartu untuk direview hari ini. Kembali besok!" with next review time

FILE: /src/app/(dashboard)/tutor/page.tsx
- Render TutorWindow
- Starter suggestions: "Koreksi kalimat saya", "Jelaskan perbedaan der/die/das", "Buat soal latihan untuk saya"

FILE: /src/app/(auth)/login/page.tsx and register/page.tsx
- Simple centered form
- Use Input and Button components
- Show validation errors inline
- On success: redirect to /dashboard
- Login calls NextAuth signIn(), register calls trpc.auth.register

FILE: /src/app/page.tsx (Landing)
- Hero: "Belajar Bahasa Jerman dengan AI" + CTA buttons
- Feature cards: SRS flashcards, AI tutor, pronunciation check
- Levels overview A1-B2
- Link to login/register
```

---

## PROMPT 10 — Environment, Config & Final Checks

```
Create the following config files:

FILE: .env.example (never .env — only the example)
DATABASE_URL=postgresql://user:password@localhost:5432/deutsch_lernen
REDIS_URL=redis://localhost:6379
NEXTAUTH_SECRET=your-secret-here-min-32-chars
NEXTAUTH_URL=http://localhost:3000

# AI Providers — urutan fallback dikontrol oleh AI_PROVIDER_ORDER
# Untuk personal use: cukup isi GEMINI_API_KEY dan GROQ_API_KEY (keduanya gratis)
# ANTHROPIC_API_KEY opsional — hanya dipakai jika provider sebelumnya gagal
AI_PROVIDER_ORDER=gemini,groq,claude

GEMINI_API_KEY=AIza...          # Gratis: aistudio.google.com
GROQ_API_KEY=gsk_...            # Gratis: console.groq.com
ANTHROPIC_API_KEY=sk-ant-...    # Opsional, berbayar: console.anthropic.com

# TTS — opsional, fallback ke Web Speech API browser jika tidak diisi
GOOGLE_TTS_API_KEY=AIza...      # Gratis 1jt karakter/bulan: cloud.google.com

FILE: /src/constants/index.ts
export const XP_PER_LESSON_PERFECT = 100
export const XP_PER_LESSON_BASE = 50
export const STREAK_BONUS_MULTIPLIER = 1.5
export const DAILY_LESSON_GOAL = 3
export const LEVELS = ['A1', 'A2', 'B1', 'B2'] as const
export const LEVEL_LABELS: Record<Level, string> = { A1: 'Pemula', A2: 'Dasar', B1: 'Menengah', B2: 'Mahir' }
export const XP_THRESHOLDS: Record<Level, number> = { A1: 0, A2: 500, B1: 2000, B2: 5000 }
export const SRS_NEW_CARD_DEFAULTS = { easeFactor: 2.5, interval: 1, repetitions: 0 }

FILE: /src/types/index.ts
Define and export all shared TypeScript types:
- Level, ExerciseType enums
- Message (for chat: role, content, id)
- EvaluationResult (isCorrect, score, feedback, corrections)
- Correction (original, corrected, explanation)
- SRSCard, SRSResult
- UserStats
Import and re-export Prisma-generated types where needed

FILE: next.config.ts
- Enable React strict mode
- Add security headers (same as middleware but for static routes):
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Permissions-Policy: camera=(), microphone=(self)
- Image domains: only allow your own domain + avatar CDN

Final: write a /README.md that explains:
1. How to set up locally (env vars, db migration, seed command)
2. Folder structure summary
3. Key architecture decisions (why tRPC, why SM-2, why Redis for rate limiting, why multi-provider AI)
4. AI provider setup: mana yang gratis, cara ganti urutan fallback lewat AI_PROVIDER_ORDER
5. How to add a new lesson (which files to touch)
6. How to add a new AI provider (implement interface di /src/lib/ai/, register di ai.ts)
```

---

## URUTAN BUILD — Checklist

Centang satu per satu sebelum lanjut:

- [ ] Step 0 — Install dependencies, buat struktur folder
- [ ] Step 1 — Prisma schema, jalankan `npx prisma migrate dev`
- [ ] Step 2 — Lib singletons: prisma.ts, redis.ts, srs.ts
- [ ] Step 3 — AI layer: gemini.ts → groq.ts → claude.ts → ai.ts (abstraksi utama)
- [ ] Step 4 — Rate limiting + middleware + cache
- [ ] Step 5 — tRPC routers (semua router import dari @/lib/ai, bukan provider langsung)
- [ ] Step 6 — Auth (NextAuth + register)
- [ ] Step 7 — UI primitives
- [ ] Step 8 — Learning components (exercises, flashcards, tutor)
- [ ] Step 9 — Pages dan layout
- [ ] Step 10 — Config, constants, types, README

**Verifikasi AI layer sebelum lanjut ke Step 5:**
Jalankan test kecil ini di terminal setelah Step 3 selesai:
```bash
# Buat file sementara test-ai.ts
npx ts-node -e "
  import { generateTutorResponse } from './src/lib/ai';
  generateTutorResponse([{ role: 'user', content: 'Apa itu der?' }], 'A1')
    .then(r => console.log('OK:', r.slice(0, 80)))
    .catch(e => console.error('FAIL:', e.message))
"
```
Harus muncul response dari Gemini. Kalau gagal, cek GEMINI_API_KEY di .env.

---

## ATURAN TAMBAHAN UNTUK COPILOT

Tambahkan ini di awal SETIAP prompt jika Copilot mulai menyimpang:

```
Rules that must be followed in all generated code:
1. TypeScript strict mode — no `any` types
2. Every async function must have try/catch or propagate errors explicitly
3. No hardcoded strings — use constants from /src/constants/index.ts
4. No direct Prisma calls in components — only through tRPC
5. No sensitive data in client-side code — no API keys, no internal IDs exposed
6. Every function longer than 20 lines must have a JSDoc comment
7. DRY: if you write the same logic twice, extract it to a helper in /src/lib/
8. Do not install new packages without noting them explicitly
9. AI calls: ALWAYS import from '@/lib/ai', NEVER from '@/lib/ai/gemini', '@/lib/ai/groq', or '@/lib/ai/claude' directly
```

---

## SEED DATA — Jalankan setelah schema selesai

Buat file `/prisma/seed.ts` dengan prompt ini:

```
Create a Prisma seed file at /prisma/seed.ts.

Seed the database with:
1. 2 sample users (hashed passwords, different levels)
2. 10 lessons across A1 and A2 levels, each with:
   - 5 exercises of mixed types
   - Realistic German learning content (greetings, numbers, gender, basic verbs)
3. 50 vocab words A1 level with German, Indonesian, example sentences
4. FlashcardReview entries for user 1 with varied nextReviewAt dates (some due today)

Use realistic data — actual German words and exercises, not lorem ipsum.
Add a script to package.json: "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
```
