# SaaS Template

Reusable template for building SaaS applications with Claude Code. Includes authentication, route protection, and a complete Claude Code intelligence system with skills, rules, hooks, and subagents.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript 5** (strict mode)
- **Tailwind CSS 4**
- **Supabase** (auth via `@supabase/ssr`, database, storage)
- **Vercel** deployment
- **pnpm** package manager

## Quick start

```bash
# 1. Install dependencies
pnpm install

# 2. Create environment file
cp .env.example .env.local
# Fill in your Supabase credentials and site URL

# 3. Configure Supabase Auth (in Supabase dashboard)
# Site URL: http://localhost:3000
# Redirect URL: http://localhost:3000/auth/callback

# 4. Run dev server
pnpm dev

# 5. Validate the project compiles
pnpm validate
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm lint` | Run ESLint |
| `pnpm validate` | TypeScript check + lint |
| `pnpm preflight` | Full validation (install + validate + build) |

## Project structure

```
app/
├── layout.tsx                 # Root layout (fonts, Tailwind)
├── page.tsx                   # Home (server component, auth-gated)
├── login/page.tsx             # Login page (magic link)
├── auth/callback/route.ts     # OAuth callback handler
├── (protected)/               # Authenticated routes (add pages here)
└── (public)/                  # Public routes (add pages here)

components/
└── logout-button.tsx          # Client component example

lib/supabase/
├── client.ts                  # Browser client (use in "use client" components)
├── server.ts                  # Server client (use in server components + API routes)
└── middleware.ts               # Session refresh logic for middleware

types/
└── index.ts                   # Shared TypeScript interfaces

middleware.ts                  # Route protection + session refresh
```

## What's included

### Authentication
- Magic link login via Supabase
- Server-side auth with `@supabase/ssr` (not the basic JS client)
- `getUser()` for auth verification (not `getSession()`)
- Middleware for automatic session refresh and route protection
- Configurable redirect URL via `NEXT_PUBLIC_SITE_URL`

### Claude Code intelligence system

The template includes a complete `.claude/` directory that makes Claude Code follow best practices automatically.

**Rules** (auto-loaded every session):

| Rule | What it enforces |
|------|-----------------|
| `code-style.md` | TypeScript/React conventions, no `any` types |
| `nextjs.md` | App Router patterns, server vs client components |
| `supabase.md` | Always use wrappers, `getUser()` not `getSession()`, RLS |
| `components.md` | Tailwind usage, form patterns, data fetching |
| `security.md` | Auth checks, input validation, secrets management |
| `quality-gates.md` | Required: auth, error handling, loading states, types |
| `workflow.md` | Explain before acting, never skip errors, validate after changes |
| `errors.md` | Lessons learned (grows over time via `/learn-error`) |

**Skills** (invoke with `/command`):

| Skill | Description |
|-------|-------------|
| `/setup [name]` | Initial project setup after cloning |
| `/new-feature [name]` | Scaffold a feature following conventions |
| `/debug [error]` | Structured debugging with root cause analysis |
| `/explain [file]` | Explain code in simple terms, no jargon |
| `/code-review` | Quality review of recent changes |
| `/security-audit` | Full security scan of the codebase |
| `/db-migration [table]` | Create Supabase migration + TypeScript types |
| `/learn-error [desc]` | Log a lesson learned so it's never repeated |
| `/validate` | Run TypeScript + lint checks |
| `/preflight` | Full validation before handoff |

**Subagents** (auto-delegated or invoked with `@name`):

| Agent | Model | Role |
|-------|-------|------|
| `code-reviewer` | Sonnet | Read-only code quality review |
| `security-scanner` | Sonnet | Security analysis on auth/API/DB code |

**Hooks** (run automatically):

| Hook | Trigger | Action |
|------|---------|--------|
| Auto-validate | After every `.ts`/`.tsx` edit | Runs `tsc --noEmit` |
| Protect secrets | Before any file edit | Blocks edits to `.env*` and secrets files |

**Permissions** (auto-approved, no prompts):

All read-only operations (Read, Glob, Grep, search), git read commands, validation scripts, and `ls`/`find`/`mkdir` are pre-approved. Edits to code still require user approval.

## Environment variables

Documented in `.env.example`:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `NEXT_PUBLIC_SITE_URL` | App URL (`http://localhost:3000` in dev) |

## How to use this template

1. Clone or fork this repo
2. Run `/setup [your-project-name]` in Claude Code
3. Define your product in the `<!-- CUSTOMIZE -->` section of `CLAUDE.md`
4. Use `/new-feature` and `/db-migration` to build features
5. Use `/code-review` and `/security-audit` before delivering
6. Use `/preflight` for final validation
