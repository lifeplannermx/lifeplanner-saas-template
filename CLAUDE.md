# SaaS Template — Claude Code Instructions

## Stack (non-negotiable)
- Next.js 16 (App Router) + React 19
- TypeScript 5 (strict mode)
- Tailwind CSS 4
- Supabase (auth via @supabase/ssr, database, storage)
- Vercel deployment
- pnpm package manager

## Commands
- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm lint` — ESLint
- `pnpm validate` — TypeScript check + lint (run after every change)
- `pnpm preflight` — full validation before handoff

## Architecture
- `app/` — Next.js App Router pages and API routes
- `app/(protected)/` — authenticated routes (guarded by middleware)
- `app/(public)/` — public routes (login, landing)
- `components/` — reusable UI components
- `lib/supabase/` — Supabase client utilities (server + browser)
- `types/` — shared TypeScript interfaces and types
- `middleware.ts` — auth session refresh + route protection

## Rules
- Use server components by default. Add "use client" only when needed
- All data types go in `types/` as TypeScript interfaces
- Use `lib/supabase/server.ts` in server components and API routes
- Use `lib/supabase/client.ts` only in client components
- Never import `@supabase/supabase-js` directly — use the lib wrappers
- Never commit secrets or .env files
- Never hardcode URLs — use env vars (NEXT_PUBLIC_SITE_URL)
- Run `pnpm validate` before committing
- After fixing a non-trivial bug, run `/learn-error` to log the lesson

## Env vars (documented in .env.example)
- NEXT_PUBLIC_SUPABASE_URL — Supabase project URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY — Supabase anon/public key
- NEXT_PUBLIC_SITE_URL — App URL (http://localhost:3000 in dev)

<!-- CUSTOMIZE: Add product-specific context below this line -->
## Product
- TBD — Define product, user, and core features before implementing
