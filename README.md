# LifePlanner SaaS Template

Template base para proyectos SaaS con Next.js + Supabase. Incluye autenticación, middleware de protección, timezone de México, error boundaries, y configuración de calidad lista para producción.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5** (strict)
- **Tailwind CSS 4**
- **Supabase** (Auth via @supabase/ssr + PostgreSQL)
- **Playwright** (tests e2e)

## Inicio rápido

```bash
# 1. Instalar dependencias
pnpm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Llenar NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Configurar Supabase Auth (en el dashboard de Supabase)
#   Site URL: http://localhost:3000
#   Redirect URL: http://localhost:3000/auth/callback

# 4. Iniciar servidor
pnpm dev
```

## Qué incluye

### Autenticación
- Login con contraseña y magic link (`/login`)
- Auth callback con `@supabase/ssr` (`/auth/callback`)
- Middleware de protección para rutas `/dashboard/*`
- Redirección automática de usuarios no autenticados

### Supabase (configuración correcta)
- `lib/supabase/server.ts` — cliente para server components (usa cookies)
- `lib/supabase/browser.ts` — cliente para client components
- Middleware con refresh de sesión automático

### Timezone (America/Mexico_City)
- `lib/dates.ts` con utilidades: `getTodayMX()`, `formatDateMX()`, `getCurrentHourMX()`, `getDateRangeMX()`, `localMXToUTC()`
- Todos los cálculos de fecha usan zona horaria de México

### Seguridad
- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- Middleware de auth que protege rutas automáticamente
- No hardcodea URLs (usa NEXT_PUBLIC_SITE_URL)

### Error handling
- `global-error.tsx` — error boundary global
- `error.tsx` — error boundary de la app
- `not-found.tsx` — página 404 personalizada
- `loading.tsx` — loading state global

### Testing
- Playwright configurado con Desktop Chrome + Mobile Chrome
- Configuración lista para agregar tests e2e

## Comandos

```bash
pnpm dev        # Servidor de desarrollo
pnpm build      # Build de producción
pnpm start      # Servidor de producción
pnpm lint       # ESLint
pnpm validate   # TypeScript + lint
pnpm preflight  # Validación completa (install + validate + build)
pnpm test       # Tests e2e (Playwright)
pnpm test:ui    # Tests en modo visual
```

## Estructura

```
app/
├── global-error.tsx      # Error boundary global
├── error.tsx             # Error boundary de la app
├── not-found.tsx         # Página 404
├── loading.tsx           # Loading state global
├── layout.tsx            # Root layout
├── page.tsx              # Home page
├── login/page.tsx        # Login (contraseña + magic link)
└── auth/callback/route.ts # Callback de Supabase Auth
lib/
├── dates.ts              # Utilidades de timezone (America/Mexico_City)
└── supabase/
    ├── server.ts         # Cliente para server components (@supabase/ssr)
    └── browser.ts        # Cliente para client components (@supabase/ssr)
middleware.ts             # Auth guard + session refresh
tests/                    # Tests e2e (Playwright)
playwright.config.ts      # Configuración de Playwright
```

## Variables de entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase | Si |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Llave pública de Supabase | Si |
| `NEXT_PUBLIC_SITE_URL` | URL de la app (para redirects) | Si |
| `E2E_USER_EMAIL` | Email para tests e2e | Solo tests |
| `E2E_USER_PASSWORD` | Contraseña para tests e2e | Solo tests |

## Quality gates

Antes de cada push, verificar:
1. `pnpm validate` pasa
2. `pnpm build` exitoso
3. `pnpm test` verde (si hay tests)
4. Error boundaries y loading states presentes
5. Sin `console.log` en código de producción
6. Sin URLs hardcodeadas

## Deploy

Configurado para **Vercel**. Push a `main` dispara deploy automático.
