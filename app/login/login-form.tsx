"use client";

import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/browser";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createSupabaseBrowser();

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  };

  const handleMagicLink = async () => {
    setLoading(true);
    setMsg("");
    setError("");

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${siteUrl}/auth/callback` },
    });

    if (error) setError(error.message);
    else setMsg("Revisa tu correo para el enlace de acceso");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
            Iniciar sesión
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ingresa tus credenciales
          </p>
        </div>

        <form
          onSubmit={handlePasswordLogin}
          className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 space-y-5"
        >
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-1.5">
              Correo electrónico
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              autoComplete="email"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          {mode === "password" && (
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Contraseña
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5">
              {error}
            </p>
          )}

          {msg && (
            <p className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-3.5 py-2.5">
              {msg}
            </p>
          )}

          {mode === "password" ? (
            <button
              type="submit"
              disabled={loading || !email}
              className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleMagicLink}
              disabled={loading || !email}
              className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Enviando..." : "Enviar enlace mágico"}
            </button>
          )}

          <button
            type="button"
            onClick={() => setMode(mode === "password" ? "magic" : "password")}
            className="w-full text-xs text-slate-500 hover:text-slate-700 transition-colors"
          >
            {mode === "password" ? "Usar enlace mágico" : "Usar contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}
