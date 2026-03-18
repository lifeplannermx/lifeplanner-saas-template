---
name: setup
description: Initial project setup after cloning the template
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, Edit, Write
argument-hint: "[project-name]"
---

# Project Setup

Set up a new project from this SaaS template.

## Steps

1. Read CLAUDE.md to understand the stack and rules
2. Verify `pnpm install` succeeds
3. Verify `.env.local` exists (copy from `.env.example` if not)
4. Run `pnpm validate` to confirm TypeScript and lint pass
5. Run `pnpm dev` briefly to confirm the app starts
6. Report any issues found

If a project name is provided as $ARGUMENTS, update:
- `package.json` name field
- `app/layout.tsx` metadata title and description
