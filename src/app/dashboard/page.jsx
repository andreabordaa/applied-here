"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import StatCards from "@/components/StatCards";
import FunnelChart from "@/components/FunnelChart";
import PipelineView from "@/components/PipelineView";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
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

      const { data: appsData } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      setApplications(appsData || []);
      setLoading(false);
    };

    getData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#2A2A2A]">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#2B2B2B] overflow-hidden">
      {/* Sidebar */}
      <Sidebar user={user} profile={profile} />
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-white text-2xl font-semibold mb-8">Dashboard</h1>
        <StatCards applications={applications} />
        <FunnelChart applications={applications} />
        <PipelineView applications={applications} />
        <p className="text-gray-400 text-sm">Pipeline view coming next...</p>
      </main>
    </div>
  );
}
