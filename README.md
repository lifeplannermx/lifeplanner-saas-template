# SaaS Template (Next.js + Supabase)

## Quick start

1) Install deps
pnpm install

2) Create .env.local from .env.example
cp .env.example .env.local

Fill:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

3) Supabase Auth dashboard
- Site URL: http://localhost:3000
- Redirect URL: http://localhost:3000/auth/callback

4) Run
pnpm dev --port 3000

## Included
- Next.js App Router + TypeScript + Tailwind
- Supabase client
- Magic link auth (/login + /auth/callback)
