# Supabase Rules

- Always use `@supabase/ssr` — never use `@supabase/supabase-js` directly
- Server components and API routes: `import { createClient } from '@/lib/supabase/server'`
- Client components: `import { createClient } from '@/lib/supabase/client'`
- Always call `createClient()` per-request — do not cache or share instances
- Use `supabase.auth.getUser()` to verify auth (not `getSession()` — it reads from cookies without server validation)
- Row Level Security (RLS) must be enabled on all tables
- Never expose service_role key to the client
- Database types should be generated with `supabase gen types typescript`
