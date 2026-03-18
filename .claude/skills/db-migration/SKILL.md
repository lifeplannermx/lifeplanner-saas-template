---
name: db-migration
description: Create a Supabase database migration with SQL and matching TypeScript types
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
argument-hint: "[table-name or description]"
---

# Database Migration

Create a new Supabase migration for: $ARGUMENTS

## Steps

1. Check if `supabase/migrations/` directory exists. If not, create it.
2. Generate a migration file named: `supabase/migrations/[timestamp]_[description].sql`
   - Use format: `YYYYMMDDHHMMSS_description.sql`
3. Write the SQL migration with:
   - `CREATE TABLE` with appropriate columns and types
   - `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`
   - Basic RLS policies (at minimum: users can read/write their own data)
   - Indexes on foreign keys and commonly queried columns
   - `created_at` and `updated_at` timestamps on every table

4. Create or update the matching TypeScript interface in `types/`
   - The interface must match the table schema exactly
   - Export it from `types/index.ts`

5. If there are existing tables that relate to this migration, update their types too

## SQL conventions

- Table names: plural, snake_case (`user_profiles`, `project_tasks`)
- Column names: snake_case
- Always include `id uuid DEFAULT gen_random_uuid() PRIMARY KEY`
- Always include `created_at timestamptz DEFAULT now() NOT NULL`
- Foreign keys reference `auth.users(id)` for user ownership
- Use `ON DELETE CASCADE` for child records

## RLS policy template

```sql
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data"
  ON table_name FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data"
  ON table_name FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own data"
  ON table_name FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own data"
  ON table_name FOR DELETE
  USING (auth.uid() = user_id);
```

## After creating the migration

Run `pnpm validate` to ensure the TypeScript types compile.
