# Component & Tailwind Patterns

## Component structure
- One component per file. File name matches component name in kebab-case
- Server components by default. Only add "use client" for interactivity
- Props interface defined above the component in the same file
- Shared/reused types go in `types/`

## Tailwind usage
- Use Tailwind utility classes exclusively. No inline styles, no CSS modules
- Use `className` — never `style` prop
- Responsive: mobile-first (`sm:`, `md:`, `lg:`)
- Dark mode: use `dark:` variant when needed
- Spacing: use consistent scale (p-2, p-4, p-6, p-8)
- Use semantic color tokens from globals.css (bg-background, text-foreground)

## Forms
- Use controlled components with `useState`
- Show loading state during async operations
- Display error messages near the relevant field
- Disable submit button while loading or when form is invalid

## Data fetching patterns
- Server components: fetch data directly with `await`
- Client components: fetch via API routes or React hooks
- Always handle loading, error, and empty states
- Use Suspense boundaries with `loading.tsx` for page-level loading
