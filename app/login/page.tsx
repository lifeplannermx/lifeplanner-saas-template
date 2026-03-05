"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string>("");

  const sendLink = async () => {
    setMsg("Sending magic link...");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });
    if (error) setMsg(`Error: ${error.message}`);
    else setMsg("Check your email for the magic link ✅");
  };

  return (
    <main style={{ padding: 24, maxWidth: 520 }}>
      <h1>Login</h1>
      <p>Enter your email and we’ll send you a magic link.</p>

      <input
        style={{ width: "100%", padding: 12, marginTop: 12 }}
        placeholder="you@domain.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button style={{ marginTop: 12, padding: 12 }} onClick={sendLink} disabled={!email}>
        Send magic link
      </button>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </main>
  );
}
