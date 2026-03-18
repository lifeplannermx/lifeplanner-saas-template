---
name: learn-error
description: Log a lesson learned from an error so it is never repeated. Use this after fixing a non-trivial bug or encountering a surprising behavior.
user-invocable: true
allowed-tools: Read, Edit, Bash
argument-hint: "[short description of what happened]"
---

# Learn from Error

Log a lesson learned to `.claude/rules/errors.md` so it persists across sessions.

## When to use this

- After fixing a bug that took more than one attempt
- When you discover a framework gotcha or non-obvious behavior
- When a build/lint/type error had a surprising root cause
- When an approach that seemed correct turned out to be wrong

## Steps

1. Read `.claude/rules/errors.md` to see existing lessons
2. Append a new entry at the end of the file (before any closing comments), using this format:

```markdown
### [Short title] — [date]
- **Error**: What went wrong (exact error message if applicable)
- **Root cause**: Why it happened
- **Fix**: What solved it
- **Rule**: The reusable takeaway (write as a constraint Claude can follow)
```

3. Verify the file is valid markdown
4. Do NOT remove or modify existing entries

## Example entry

```markdown
### Supabase getSession vs getUser — 2025-01-15
- **Error**: Auth check passed but user was not actually authenticated
- **Root cause**: `getSession()` reads from cookies without server validation, can be spoofed
- **Fix**: Replaced with `getUser()` which validates the token server-side
- **Rule**: Always use `supabase.auth.getUser()` for auth checks, never `getSession()`
```

## Context

$ARGUMENTS
