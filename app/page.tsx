"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type State =
  | { status: "loading" }
  | { status: "logged_out" }
  | { status: "logged_in"; email: string };

export default function Home() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const run = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setState({ status: "logged_out" });
        return;
      }
      const email = data.session?.user?.email;
      setState(email ? { status: "logged_in", email } : { status: "logged_out" });
    };

    run();

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      run();
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Lifeplanner SaaS</h1>

      {state.status === "loading" && <p>Checking session...</p>}

      {state.status === "logged_out" && (
        <>
          <p>Not logged in ❌</p>
          <a href="/login">Go to login</a>
        </>
      )}

      {state.status === "logged_in" && (
        <>
          <p>Logged in ✅</p>
          <p>Email: {state.email}</p>
          <button style={{ marginTop: 12, padding: 10 }} onClick={logout}>
            Logout
          </button>
        </>
      )}
    </main>
  );
}
