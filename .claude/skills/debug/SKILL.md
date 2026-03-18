---
name: debug
description: Structured debugging when something is broken. Use when there's an error, unexpected behavior, or something isn't working.
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, Edit, Write
argument-hint: "[error message or description of what's wrong]"
---

# Debug

Something is broken: $ARGUMENTS

## Step 1 — Reproduce and understand

- If an error message was provided, read it carefully. Identify the file and line number.
- If it's a runtime error, check the browser console or terminal output.
- If it's a build error, run `pnpm validate` and read the output.
- **Say out loud what you think the error means in plain language.**

## Step 2 — Trace the root cause

- Read the file where the error occurs.
- Trace the data flow backwards: where does the problematic value come from?
- Check imports — is the right module being imported?
- Check types — does the data shape match what the code expects?
- Check async/await — is there a missing `await`?
- Check environment — are all required env vars set?

## Step 3 — Check common causes

For **TypeScript errors**:
- Missing or wrong type assertion
- Nullable value not handled (`x` could be `undefined`)
- Import from wrong path

For **Supabase errors**:
- RLS policy blocking the query (check if policies exist)
- Missing `await` on `createClient()`
- Using `getSession()` instead of `getUser()`
- Table or column name typo

For **Next.js errors**:
- Using hooks in a server component (needs "use client")
- Importing server-only code in client component
- Missing `async` on server component that uses `await`
- Wrong import path for `next/navigation` vs `next/router`

For **Runtime errors**:
- Check network tab for failed API calls
- Check if the Supabase URL and key are correct
- Check CORS if calling external APIs

## Step 4 — Fix and verify

1. Apply the minimal fix. Explain what you changed and why.
2. Run `pnpm validate` to check for type/lint errors.
3. If the fix involved a non-obvious cause, run `/learn-error` to log it.

## Step 5 — Explain to the user

After fixing, explain:
- **What was broken** (in simple terms)
- **Why it happened** (the root cause)
- **What you did to fix it**
- **How to avoid it in the future**
