# Security Rules

- Never trust client-side auth. Always verify with `supabase.auth.getUser()` on the server
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to client code
- All database tables must have Row Level Security (RLS) enabled
- Validate and sanitize all user input on the server side
- Use parameterized queries — never concatenate user input into SQL
- API routes must check authentication before processing requests
- Never log sensitive data (tokens, passwords, keys)
- Set `httpOnly`, `secure`, and `sameSite` on sensitive cookies
- Use `NEXT_PUBLIC_` prefix only for env vars that are safe to expose to the browser
