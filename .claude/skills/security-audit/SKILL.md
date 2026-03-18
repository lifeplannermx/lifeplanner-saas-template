---
name: security-audit
description: Full security audit of the codebase. Checks for common vulnerabilities, exposed secrets, missing auth, and unsafe patterns.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash
---

# Security Audit

Perform a comprehensive security review of the entire codebase.

## Check 1 — Exposed secrets

Search for patterns that indicate leaked secrets:
- `grep -r "sk_live\|sk_test\|password\s*=\|secret\s*=\|api_key\s*=" --include="*.ts" --include="*.tsx" --include="*.js"`
- Check that `.env*` files (except `.env.example`) are in `.gitignore`
- Verify `.env.example` has no real values (only placeholders)
- Check git history: `git log --all --diff-filter=A -- "*.env*"`

## Check 2 — Authentication

For every file in `app/api/`:
- Verify it calls `supabase.auth.getUser()` before processing data
- Flag any API route that does NOT check authentication

For every file in `app/(protected)/`:
- Verify middleware covers these routes

Check that:
- `getUser()` is used (NOT `getSession()`)
- Auth tokens are never logged or exposed in responses

## Check 3 — Database security

For every Supabase query in the codebase:
- Check that user input is never concatenated into queries
- Verify RLS is mentioned in migration files
- Flag any use of `.rpc()` without input validation
- Flag any use of `service_role` key outside of server-only code

## Check 4 — Input validation

For every form or API that accepts user input:
- Check that input is validated before use
- Check for potential XSS (user content rendered with `dangerouslySetInnerHTML`)
- Check for potential injection in dynamic routes

## Check 5 — Environment and configuration

- Verify only safe vars use `NEXT_PUBLIC_` prefix
- Check that `SUPABASE_SERVICE_ROLE_KEY` is never in client code
- Verify redirect URLs use env vars (not hardcoded)

## Check 6 — Dependencies

- Run `pnpm audit` if available
- Check for known vulnerable packages

## Output format

```
# Security Audit Report

## CRITICAL (fix immediately)
- [file:line] Description + how to fix

## HIGH (fix before deploy)
- [file:line] Description + how to fix

## MEDIUM (fix soon)
- [file:line] Description + recommendation

## LOW (improve when possible)
- [file:line] Description

## Passed checks
- List of things that are correctly implemented

## Summary
- Total issues: X critical, X high, X medium, X low
- Overall risk level: LOW / MEDIUM / HIGH / CRITICAL
```
