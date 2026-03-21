# LifePlanner SaaS Template — Claude Code Instructions

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
- `pnpm test` — Playwright e2e tests
- `pnpm test:ui` — Playwright in visual mode

## Architecture
- `app/` — Next.js App Router pages
- `app/(protected)/` or `app/dashboard/` — authenticated routes (guarded by middleware)
- `app/(public)/` or `app/login/` — public routes
- `lib/supabase/server.ts` — Supabase client for server components (uses @supabase/ssr)
- `lib/supabase/browser.ts` — Supabase client for client components (uses @supabase/ssr)
- `lib/dates.ts` — timezone utilities (America/Mexico_City)
- `lib/actions/` — server actions for data mutations
- `lib/validators/` — Zod schemas for input validation
- `lib/types/` — shared TypeScript interfaces
- `middleware.ts` — auth session refresh + route protection
- `tests/` — Playwright e2e tests

## Rules

### Code style
- Use server components by default. Add "use client" only when needed
- Use `lib/supabase/server.ts` in server components — NEVER import `@supabase/supabase-js` directly
- Use `lib/supabase/browser.ts` in client components
- All data types go in `lib/types/` as TypeScript interfaces
- Never commit secrets or .env files
- Never hardcode URLs — use env vars (NEXT_PUBLIC_SITE_URL)
- Run `pnpm validate` before committing

### Dates & Timezone
- ALWAYS use `lib/dates.ts` for date calculations — NEVER use `new Date().toISOString().split('T')[0]`
- Use `getTodayMX()` for today's date
- Use `formatDateMX(date)` to format a Date object
- Use `getDateRangeMX(date)` to filter timestamptz columns by local date
- Use `getCurrentHourMX()` for time-of-day logic (greetings, etc.)
- Frontend date defaults: use `new Date().toLocaleDateString("en-CA", { timeZone: "America/Mexico_City" })`
- Display dates with `toLocaleDateString("es-MX", { timeZone: "America/Mexico_City" })`

### Security
- Never trust client-side auth — always verify with `supabase.auth.getUser()` on the server
- All database tables MUST have Row Level Security (RLS) enabled
- All server actions MUST check authentication and permissions before proceeding
- Validate and sanitize all user input with Zod on the server side
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to client code
- File uploads: validate MIME type, extension, and size (max 2-5MB)

### Error handling
- Every project must have: `global-error.tsx`, `error.tsx`, `not-found.tsx`, `loading.tsx`
- Every dashboard module should have its own `loading.tsx`
- Server actions must return `{ success: true, data }` or `{ success: false, error: string }`
- Always handle error states from server actions in pages
- Never silently swallow errors — log them and return user-friendly messages

### Accessibility
- All interactive elements must have visible labels or aria-labels
- Forms: use `htmlFor` and `id` to associate labels with inputs
- Icon-only buttons must have `aria-label`
- Logout buttons must be accessible on mobile (not hidden behind `hidden sm:inline` without aria-label)

### Testing
- Every project should have e2e tests for: auth flow, main CRUD operations, responsive behavior
- Use Playwright with `@playwright/test`
- Store test credentials in `.env.local` (E2E_USER_EMAIL, E2E_USER_PASSWORD)
- Use 1 worker to avoid Supabase auth rate limits
- Tests must pass before pushing to main

## Quality gates (before every push)
1. `pnpm validate` passes (TypeScript + lint)
2. `pnpm build` succeeds (all pages compile)
3. `pnpm test` passes (all e2e tests green)
4. No `console.log` left in production code
5. No hardcoded values that should be env vars
6. No `any` types unless absolutely necessary
7. Error boundaries and loading states present

## Env vars (documented in .env.example)
- NEXT_PUBLIC_SUPABASE_URL — Supabase project URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY — Supabase anon/public key
- NEXT_PUBLIC_SITE_URL — App URL (http://localhost:3000 in dev)
- E2E_USER_EMAIL — Test user email (tests only)
- E2E_USER_PASSWORD — Test user password (tests only)
