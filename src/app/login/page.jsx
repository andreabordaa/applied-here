"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <PublicLayout>
      <main
        className="h-screen flex items-center justify-center px-6 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at center, #2A2D5C 0%, #1C1F26 100%)",
        }}
      >
        <div className="w-full max-w-sm">
          <div className="bg-bg-surface shadow-2xl border border-border-default rounded-2xl px-8 py-12 flex flex-col">
            <h1 className="text-text-primary text-2xl font-semibold text-center mb-2">
              Welcome back
            </h1>
            <p className="text-text-secondary text-sm text-center mb-8">
              Log in to your Applied Here account
            </p>

            {error && (
              <div className="bg-status-rejected/10 border border-status-rejected/30 text-status-rejected text-sm rounded-xl px-4 py-3 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-text-secondary text-xs font-medium">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="bg-bg-page border border-border-default text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors placeholder:text-text-muted"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-text-secondary text-xs font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-bg-page border border-border-default text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors placeholder:text-text-muted"
                />
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 px-10 rounded-xl transition-colors"
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </div>
            </form>

            <p className="text-text-secondary text-sm text-center mt-12">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-text-primary hover:text-accent transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
