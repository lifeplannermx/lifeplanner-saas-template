# SaaS Factory OS (Template)

This template follows a PRP-driven, MCP-first, agentic loop workflow.

## Golden Path
- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Supabase (Auth + Postgres + RLS)
- Zod, Zustand, Playwright
- GitHub + Vercel

## Mandatory Loop (Assembly Line)
DELIMIT -> MAP (PRP) -> EXECUTE -> VALIDATE -> AUTO-BLINDAJE
Stop only when acceptance criteria + quality gates pass.

## Quality Gates (DoD)
- App runs locally with no runtime errors
- TypeScript + lint clean
- Critical flows validated (Playwright when available)
- RLS-safe DB changes verified
- No secrets committed (.env.local ignored; .env.example used)
- Docs updated (PRP/README/CLAUDE.md)

## Factory assets
- See .claude/ for PRPs, commands, prompts, agents.
- Reference: CLAUDE_FACTORY.md (upstream factory OS)
