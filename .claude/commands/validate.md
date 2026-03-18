---
name: validate
description: Run TypeScript and lint checks
user-invocable: true
allowed-tools: Bash
---

# Validate

Run the project validation pipeline.

```bash
pnpm validate
```

If there are errors:
1. Read the error output carefully
2. Fix each issue
3. Re-run `pnpm validate` until clean
