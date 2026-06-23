"use client";

import { useEffect, useState, Suspense } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import AddApplicationModal from "@/components/AddApplicationModal";

const STATUS_STYLES = {
  Applied:
    "text-[var(--color-status-applied)] bg-[var(--color-status-applied)]/15",
  Interview:
    "text-[var(--color-status-interview)] bg-[var(--color-status-interview)]/15",
  Challenge:
    "text-[var(--color-status-challenge)] bg-[var(--color-status-challenge)]/15",
  Offer: "text-[var(--color-status-offer)] bg-[var(--color-status-offer)]/15",
  Rejected:
    "text-[var(--color-status-rejected)] bg-[var(--color-status-rejected)]/15",
};

const FILTERS = [
  "All",
  "Applied",
  "Interview",
  "Challenge",
  "Offer",
  "Rejected",
];

function AllApplicationsInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const statusParam = searchParams.get("status");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveFilter(statusParam || "All");
  }, [searchParams]);

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
        .maybeSingle();

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
          <div>
            <h1 className="text-text-primary text-2xl font-semibold">
              All Applications
            </h1>
            <p className="text-text-muted text-sm mt-1">
              {applications.length} total · {filtered.length} showing
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-accent hover:bg-accent-hover text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            + Add application
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by role, company, or location..."
            className="flex-1 bg-bg-surface border border-border-default text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none focus:border-accent transition-colors placeholder:text-text-muted"
          />

          <div className="flex items-center gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs px-3 py-2 rounded-xl border transition-colors ${
                  activeFilter === f
                    ? "bg-accent border-accent text-white"
                    : "border-border-default text-text-secondary hover:text-text-primary hover:border-border-hover"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-bg-surface border border-border-default rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 gap-3 px-6 py-3 border-b border-border-default bg-bg-sidebar">
            <span className="col-span-3 text-text-muted text-sm font-medium">
              Role
            </span>
            <span className="col-span-3 text-text-muted text-xs font-medium">
              Company
            </span>
            <span className="col-span-2 text-text-muted text-xs font-medium">
              Location
            </span>
            <span className="col-span-2 text-text-muted text-xs font-medium">
              Date applied
            </span>
            <span className="col-span-2 text-text-muted text-xs font-medium">
              Status
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2">
              <p className="text-text-secondary text-sm">
                {search || activeFilter !== "All"
                  ? "No applications match your search"
                  : "No applications yet"}
              </p>
              <p className="text-text-muted text-xs">
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
                  className={`grid grid-cols-12 gap-3 px-6 py-4 items-center hover:bg-bg-page transition-colors ${
                    index !== filtered.length - 1
                      ? "border-b border-border-default/50"
                      : ""
                  }`}
                >
                  <span className="col-span-3 text-text-primary text-sm truncate">
                    {app.role}
                  </span>
                  <span className="col-span-3 text-text-secondary text-sm truncate">
                    {app.company}
                  </span>
                  <span className="col-span-2 text-text-secondary text-sm truncate">
                    {app.location || "—"}
                  </span>
                  <span className="col-span-2 text-text-secondary text-sm">
                    {app.date_applied
                      ? new Date(app.date_applied).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </span>
                  <span className="col-span-2">
                    <span
                      className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${STATUS_STYLES[app.status] || ""}`}
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

export default function AllApplications() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-bg-page">
          <p className="text-text-secondary text-sm">Loading...</p>
        </div>
      }
    >
      <AllApplicationsInner />
    </Suspense>
  );
}
