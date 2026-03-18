---
name: new-feature
description: Scaffold a new feature following project conventions
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, Edit, Write
argument-hint: "[feature-name]"
---

# New Feature Scaffold

Create the structure for a new feature called $ARGUMENTS.

## Steps

1. Read CLAUDE.md and `.claude/rules/` to understand conventions
2. Create a TypeScript interface in `types/` for the feature's data model
3. If the feature needs a page, create it under `app/(protected)/` or `app/(public)/`
4. If the feature needs an API, create route handlers in `app/api/`
5. If the feature needs reusable UI, create components in `components/`
6. Use `lib/supabase/server.ts` for server-side data access
7. Run `pnpm validate` after creating files

## Conventions

- Server components by default
- Types in `types/`
- Use Tailwind for styling
- Follow existing patterns in the codebase
