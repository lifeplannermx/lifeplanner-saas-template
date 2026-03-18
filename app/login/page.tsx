"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string>("");

  const sendLink = async () => {
    setMsg("Sending magic link...");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
    if (error) setMsg(`Error: ${error.message}`);
    else setMsg("Check your email for the magic link.");
  };

  return (
    <main className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <p className="mb-4">Enter your email and we&apos;ll send you a magic link.</p>

      <input
        className="w-full p-3 border rounded"
        placeholder="you@domain.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        className="mt-3 px-4 py-3 bg-foreground text-background rounded disabled:opacity-50"
        onClick={sendLink}
        disabled={!email}
      >
        Send magic link
      </button>

      {msg && <p className="mt-3">{msg}</p>}
    </main>
  );
}
