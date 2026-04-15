"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserAndProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      setUser(session.user);
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", session.user.id)
        .single();

      setProfile(profileData);
      setLoading(false);
    };

    getUserAndProfile();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#2A2A2A]">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#3F3F3F] overflow-hidden">
      {/* Sidebar */}
      <Sidebar user={user} profile={profile} />
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-white text-2xl font-semibold mb-8">Dashboard</h1>
        <p className="text-gray-400 text-sm">Stat cards coming next...</p>
      </main>
    </div>
  );
}
