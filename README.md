# Deutsch Lernen

Platform belajar bahasa Jerman berbasis AI dengan tRPC, Prisma, NextAuth, dan Redis.

## Setup Lokal

1. Salin env:

```bash
copy .env.example .env
```

2. Isi variabel penting: `DATABASE_URL`, `REDIS_URL`, `NEXTAUTH_SECRET`, dan API key AI.

3. Jalankan migrasi dan seed:

```bash
npx prisma migrate dev
npm run seed
```

4. Jalankan server:

```bash
npm run dev
```

## Ringkasan Struktur Folder

- `src/app` - route App Router, layout, dan halaman
- `src/components` - UI primitives, lesson, flashcard, tutor
- `src/server` - tRPC router dan context
- `src/lib` - Prisma, Redis, AI abstraction, rate limit, cache
- `prisma` - schema dan seed

## Keputusan Arsitektur

- **tRPC**: type-safe API end-to-end.
- **SM-2**: algoritma SRS untuk jadwal review optimal.
- **Redis**: caching cepat dan rate limiting.
- **Multi-provider AI**: fallback otomatis untuk menjaga ketersediaan.

## AI Provider Setup

- Gratis: Gemini (AI Studio) dan Groq (console.groq.com).
- Opsional berbayar: Claude.
- Urutan fallback diatur lewat `AI_PROVIDER_ORDER`, contoh `gemini,groq,claude`.

## Menambah Pelajaran Baru

1. Tambah data lesson dan exercises di database (seed atau admin UI).
2. Pastikan level dan urutan (`order`) sesuai.

## Menambah Provider AI

1. Implementasikan provider di `src/lib/ai/`.
2. Daftarkan di `src/lib/ai.ts` dan tambahkan ke `AI_PROVIDER_ORDER`.
