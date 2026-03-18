---
name: code-review
description: Review recent code changes for quality, security, and best practices. Use after completing a feature or before committing.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash
---

# Code Review

Review recent changes for quality and issues.

## Steps

1. Run `git diff --stat` to identify changed files
2. For each changed file, read the full file to understand context
3. Check against `.claude/rules/` conventions

## Checklist

- [ ] No `any` types in TypeScript
- [ ] No hardcoded URLs or secrets
- [ ] Server components used where possible (no unnecessary "use client")
- [ ] Supabase accessed via `lib/supabase/` wrappers (never direct import)
- [ ] `getUser()` used for auth checks (never `getSession()`)
- [ ] Error states handled in UI
- [ ] Loading states present where needed
- [ ] No console.log left in code
- [ ] Types defined in `types/` for shared data models
- [ ] Tailwind classes used (no inline styles)

## Output format

```
## Critical (must fix before commit)
- [file:line] Issue + suggested fix

## Warnings (should fix)
- [file:line] Issue + reasoning

## Good practices found
- Brief note on what's done well
```

## After review

Run `pnpm validate` to confirm no TypeScript or lint errors remain.
