import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  // If there's no code, just go home.
  if (!code) return NextResponse.redirect(new URL("/", url));

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Exchanges the one-time code for a session cookie in the browser client
  // (for App Router, simplest is to just verify it doesn't error and redirect)
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL("/login?error=auth", url));
  }

  return NextResponse.redirect(new URL("/", url));
}
