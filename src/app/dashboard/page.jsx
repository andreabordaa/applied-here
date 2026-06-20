"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import StatCards from "@/components/StatCards";
import FunnelChart from "@/components/FunnelChart";
import PipelineView from "@/components/PipelineView";
import ApplicationTable from "@/components/ApplicationTable";
import AddApplicationModal from "@/components/AddApplicationModal";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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

  const handleApplicationAdded = (newApp) => {
    setApplications((prev) => [newApp, ...prev]);
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-text-primary text-2xl font-semibold">
            Dashboard
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-accent hover:bg-accent-hover text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            + Add application
          </button>
        </div>

        <StatCards applications={applications} />
        <FunnelChart applications={applications} />
        <PipelineView applications={applications} />
        <ApplicationTable
          applications={applications}
          onAddNew={() => setShowModal(true)}
        />
      </main>

      {showModal && (
        <AddApplicationModal
          user={user}
          onClose={() => setShowModal(false)}
          onApplicationAdded={handleApplicationAdded}
        />
      )}
    </div>
  );
}
