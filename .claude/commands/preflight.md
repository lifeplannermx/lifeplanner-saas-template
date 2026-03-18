---
name: preflight
description: Full validation before handoff or deployment
user-invocable: true
allowed-tools: Bash, Read, Grep, Glob
---

# Preflight Check

Run all validations before handoff.

## Steps

1. Run `pnpm install` to ensure deps are current
2. Run `pnpm validate` (TypeScript + lint)
3. Run `pnpm build` to verify production build
4. Check that `.env.example` documents all env vars used in the codebase:
   - Search for `process.env.` across all `.ts` and `.tsx` files
   - Compare with `.env.example`
   - Report any missing vars
5. Check for hardcoded URLs (search for `http://localhost` or `https://` in app code)
6. Check for `any` types in TypeScript files
7. Report results as a checklist
