"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const getData = async () => {
      console.log("1. Starting getData");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log("2. session:", session);

      if (!session) {
        router.push("/login");
        return;
      }

      console.log("3. session.user:", session.user);
      setUser(session.user);

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", session.user.id)
        .maybeSingle();

      console.log(
        "4. profileData:",
        profileData,
        "profileError:",
        profileError,
      );

      setProfile(profileData);
      setFullName(profileData?.full_name || "");
      setLoading(false);

      console.log("5. Finished getData");
    };

    getData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("handleSave called but user is null");
      setStatus("error");
      return;
    }

    setSaving(true);
    setStatus("idle");

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName })
      .eq("id", user.id);

    if (error) {
      setStatus("error");
    } else {
      setProfile((prev) => ({ ...prev, full_name: fullName }));
      setStatus("success");
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-bg-page">
        <p className="text-text-secondary text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-bg-page overflow-hidden">
      <Sidebar user={user} profile={profile} />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-lg">
          <h1 className="text-text-primary text-2xl font-semibold mb-8">
            Account settings
          </h1>

          <div className="bg-bg-surface border border-border-default rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white text-xl font-medium shrink-0">
                {fullName?.[0]?.toUpperCase() ||
                  user?.email?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-text-primary font-medium">
                  {fullName || "User"}
                </p>
                <p className="text-text-muted text-sm">{user?.email}</p>
              </div>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-text-secondary text-xs font-medium">
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  className="bg-bg-page border border-border-default text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors placeholder:text-text-muted"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-text-secondary text-xs font-medium">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-bg-page border border-border-default text-text-muted text-sm rounded-xl px-4 py-3 outline-none cursor-not-allowed"
                />
                <p className="text-text-muted text-xs">
                  Email can&apos;t be changed here yet
                </p>
              </div>

              {status === "success" && (
                <p className="text-[var(--color-status-offer)] text-sm">
                  Saved successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-[var(--color-status-rejected)] text-sm">
                  Something went wrong — try again.
                </p>
              )}

              <button
                type="submit"
                disabled={saving}
                className="bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 px-6 rounded-xl transition-colors mt-2 self-start"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
