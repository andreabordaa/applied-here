"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { MdClose } from "react-icons/md";

const STATUSES = ["Applied", "Interview", "Challenge", "Offer", "Rejected"];

export default function AddApplicationModal({
  user,
  onClose,
  onApplicationAdded,
}) {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase
      .from("applications")
      .insert([
        {
          user_id: user.id,
          role,
          company,
          location,
          date_applied: dateApplied || null,
          status,
          notes,
        },
      ])
      .select()
      .single();

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      onApplicationAdded(data);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-bg-sidebar border border-border-default rounded-2xl p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-text-primary text-base font-semibold">
            Add application
          </h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors p-1 rounded-lg hover:bg-bg-surface"
          >
            <MdClose size={18} />
          </button>
        </div>

        {error && (
          <div className="bg-status-rejected/10 border border-status-rejected/30 text-status-rejected text-xs rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-text-secondary text-xs font-medium">
              Role / Position
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Frontend Engineer"
              required
              className="bg-bg-surface border border-border-default text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none focus:border-accent transition-colors placeholder:text-text-muted"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-text-secondary text-xs font-medium">
              Company
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Stripe"
              required
              className="bg-bg-surface border border-border-default text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none focus:border-accent transition-colors placeholder:text-text-muted"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-text-secondary text-xs font-medium">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Remote or City"
                className="bg-bg-surface border border-border-default text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none focus:border-accent transition-colors placeholder:text-text-muted"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-text-secondary text-xs font-medium">
                Date applied
              </label>
              <input
                type="date"
                value={dateApplied}
                onChange={(e) => setDateApplied(e.target.value)}
                className="bg-bg-surface border border-border-default text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-text-secondary text-xs font-medium">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-bg-surface border border-border-default text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none focus:border-accent transition-colors"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-text-secondary text-xs font-medium">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Recruiter name, job link, anything useful..."
              rows={3}
              className="bg-bg-surface border border-border-default text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none focus:border-accent transition-colors placeholder:text-text-muted resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary text-sm transition-colors px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-6 rounded-xl transition-colors"
            >
              {loading ? "Saving..." : "Save application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
