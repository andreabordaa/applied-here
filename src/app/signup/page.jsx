"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";

export default function Signup() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
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
            "radial-gradient(ellipse at center, #323371 0%, #3F3F3F 100%)",
        }}
      >
        <div className="w-full max-w-sm">
          {/* Card */}
          <div className="bg-[#2A2A2A] border border-[#9C9C9C] rounded-2xl px-8 py-10 flex flex-col">
            {/* Header */}
            <h1 className="text-white text-2xl font-semibold text-center mb-2">
              Create your account
            </h1>
            <p className="text-gray-400 text-sm text-center mb-8">
              Start tracking your applications today
            </p>

            {/* Error message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-6">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 text-xs font-medium">
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="bg-[#1E1E1E] border border-gray-700 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#323371] transition-colors placeholder:text-gray-600"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 text-xs font-medium">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="bg-[#1E1E1E] border border-gray-700 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#323371] transition-colors placeholder:text-gray-600"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 text-xs font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-[#1E1E1E] border border-gray-700 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#323371] transition-colors placeholder:text-gray-600"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 text-xs font-medium">
                  Confirm password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-[#1E1E1E] border border-gray-700 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-[#323371] transition-colors placeholder:text-gray-600"
                />
              </div>

              {/* Button */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#323371] hover:bg-[#3d3d8a] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 px-10 rounded-xl transition-colors"
                >
                  {loading ? "Creating account..." : "Sign up"}
                </button>
              </div>
            </form>

            {/* Footer */}
            <p className="text-gray-400 text-sm text-center mt-10">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-white hover:text-[#6b6bc4] transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
