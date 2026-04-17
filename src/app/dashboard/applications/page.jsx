"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import AddApplicationModal from "@/components/AddApplicationModal";

const STATUS_STYLES = {
  Applied: "text-[#6AABED] bg-[#6AABED]/10",
  Interview: "text-[#AD5FDA] bg-[#AD5FDA]/10",
  Challenge: "text-[#DBC66A] bg-[#DBC66A]/10",
  Offer: "text-[#72D562] bg-[#72D562]/10",
  Rejected: "text-[#DA2C2C] bg-[#DA2C2C]/10",
};

const FILTERS = [
  "All",
  "Applied",
  "Interview",
  "Challenge",
  "Offer",
  "Rejected",
];

export default function AllApplications() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

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

  const filtered = applications
    .filter((app) => activeFilter === "All" || app.status === activeFilter)
    .filter((app) => {
      const q = search.toLowerCase();
      return (
        app.role.toLowerCase().includes(q) ||
        app.company.toLowerCase().includes(q) ||
        (app.location && app.location.toLowerCase().includes(q))
      );
    });

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#2A2A2A]">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#2B2B2B] overflow-hidden">
      <Sidebar user={user} profile={profile} />
      <main className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-2xl font-semibold">
              All Applications
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {applications.length} total · {filtered.length} showing
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#323371] hover:bg-[#3d3d8a] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            + Add application
          </button>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search bar!! */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by role, company, or location..."
            className="flex-1 bg-[#1E1E1E] border border-gray-700 text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#323371] transition-colors placeholder:text-gray-600"
          />
          {/* Filter chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs px-3 py-2 rounded-xl border transition-colors ${
                  activeFilter === f
                    ? "bg-[#323371] border-[#323371] text-white"
                    : "border-gray-700 text-gray-400 hover:text-white hover:border-gray-500"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#1E11E1E] border border-gray-700 rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-700 bg-[#1A1A1A]">
            <span className="col-span-4 text-gray-400 text-xs font-medium">
              Role
            </span>
            <span className="col-span-3 text-gray-400 text-xs font-medium">
              Company
            </span>
            <span className="col-span-2 text-gray-400 text-xs font-medium">
              Location
            </span>
            <span className="col-span-2 text-gray-400 text-xs font-medium">
              Date applied
            </span>
            <span className="col-span-1 text-gray-400 text-xs font-medium">
              Status
            </span>
          </div>
          {/* Empty state */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2">
              <p className="text-gray-400 text-sm">
                {search || activeFilter !== "All"
                  ? "No applications match your search"
                  : "No applications yet"}
              </p>
              <p className="text-gray-600 text-xs">
                {search || activeFilter !== "All"
                  ? "Try adjusting your filters"
                  : 'Click "+ Add application" to get started'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {filtered.map((app, index) => (
                <div
                  key={app.id}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-colors ${
                    index !== filtered.length - 1
                      ? "border-b border-gray-700/50"
                      : ""
                  }`}
                >
                  <span className="col-span-4 text-white text-sm truncate">
                    {app.role}
                  </span>
                  <span className="col-span-3 text-gray-400 text-sm truncate">
                    {app.company}
                  </span>
                  <span className="col-span-2 text-gray-400 text-sm truncate">
                    {app.location || "—"}
                  </span>
                  <span className="col-span-2 text-gray-400 text-sm">
                    {app.date_applied
                      ? new Date(app.date_applied).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </span>
                  <span className="col-span-1">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${STATUS_STYLES[app.status] || ""}`}
                    >
                      {app.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      {/* Modal */}
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
