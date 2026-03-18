# Next.js Rules

- Use App Router exclusively. No pages/ directory
- Server components by default. "use client" only when using hooks, event handlers, or browser APIs
- Use `redirect()` from `next/navigation` for server-side redirects
- Use `useRouter()` from `next/navigation` for client-side navigation
- API routes go in `app/api/` using route handlers (route.ts)
- Loading states: use `loading.tsx` files
- Error handling: use `error.tsx` files
- Metadata: use `export const metadata` or `generateMetadata()` in pages
- Images: use `next/image` component
- Environment variables: prefix with `NEXT_PUBLIC_` only if needed in the browser
