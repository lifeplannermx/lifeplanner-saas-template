# Development Workflow

Every time you make a code change, follow this process:

## Before writing code
- Read the existing code in the file you're about to change
- Understand what it does before modifying it
- If creating a new file, check if a similar file already exists

## After every change
- Run `pnpm validate` to catch type and lint errors immediately
- If validate fails, fix the errors before moving on
- Never leave the codebase in a broken state

## Before committing
- Review your own changes: `git diff`
- Check for:
  - Leftover `console.log` statements
  - Hardcoded values that should be env vars
  - `any` types that should be properly typed
  - Missing error handling
  - Unused imports or variables

## When you encounter an error
- Do not guess. Read the error message carefully.
- Trace the root cause. Do not apply random fixes hoping something works.
- If the fix was non-trivial, run `/learn-error` to log the lesson.

## Communication with the user
- Explain what you're about to do BEFORE doing it
- After making changes, summarize what changed and why
- If you find a problem, explain it in simple terms
- If you have to make a decision, explain the options and your recommendation
- Never silently skip an error or warning
