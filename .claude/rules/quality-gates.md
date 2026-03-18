# Quality Gates

These are non-negotiable checks. Apply them automatically.

## Every new page or API route must have:
- Authentication check (unless explicitly public)
- Error handling (try/catch or error.tsx)
- Loading state (loading.tsx or useState)
- Proper TypeScript types (no `any`)

## Every database interaction must have:
- RLS policies on the table
- Input validation before the query
- Error handling for the query result
- Null/empty state handling in the UI

## Every form must have:
- Client-side validation before submit
- Loading state during submission
- Error message display on failure
- Success feedback to the user
- Disabled submit button while processing

## Every new component must:
- Use Tailwind (no inline styles)
- Handle its loading, error, and empty states
- Be a server component unless it needs interactivity
- Have TypeScript props interface if it accepts props

## Red flags — stop and ask the user before proceeding:
- Deleting a file that other files import
- Changing authentication logic
- Modifying middleware.ts
- Adding a new environment variable
- Installing a new dependency
- Changing database schema
