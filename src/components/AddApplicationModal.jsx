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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#2B2B2B] border border-gray-700 rounded-2xl p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-white text-base font-semibold">
            Add application
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/50"
          >
            <MdClose size={18} />
          </button>
        </div>
        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Role */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-400 text-xs font-medium">
              Role / Position
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Frontend Engineer"
              required
              className="bg-[#2A2A2A] border border-gray-700 text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#323371] transition-colors placeholder:text-gray-500"
            />
          </div>
          {/* Company */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-400 text-xs font-medium">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Stripe"
              required
              className="bg-[#2A2A2A] border border-gray-700 text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#323371] transition-colors placeholder:text-gray-500"
            />
          </div>
          {/* Location + Date row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs font-medium">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Remote or City"
                className="bg-[#2A2A2A] border border-gray-700 text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#323371] transition-colors placeholder:text-gray-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-400 text-xs font-medium">
                Date applied
              </label>
              <input
                type="date"
                value={dateApplied}
                onChange={(e) => setDateApplied(e.target.value)}
                className="bg-[#2A2A2A] border border-gray-700 text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#323371] transition-colors"
              />
            </div>
          </div>
          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-400 text-xs font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-[#2A2A2A] border border-gray-700 text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#323371] transition-colors"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-400 text-xs font-medium">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Recruiter name, job link, anything useful..."
              rows={3}
              className="bg-[#2A2A2A] border border-gray-700 text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#323371] transition-colors placeholder:text-gray-500 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-white text-sm transition-colors px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#323371] hover:bg-[#3d3d8a] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-6 rounded-xl transition-colors"
            >
              {loading ? "Saving..." : "Save application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
