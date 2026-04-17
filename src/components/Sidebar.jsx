"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import { GoHomeFill } from "react-icons/go";
import {
  MdFormatListBulleted,
  MdChevronLeft,
  MdChevronRight,
  MdLogout,
} from "react-icons/md";

const STATUS_DOTS = [
  { label: "Applied", color: "#6AABED" },
  { label: "Interview", color: "#AD5FDA" },
  { label: "Challenge", color: "#DBC66A" },
  { label: "Offer", color: "#72D562" },
  { label: "Rejected", color: "#DA2C2C" },
];

export default function Sidebar({ user, profile }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <aside
      className={`relative flex flex-col h-full bg-[#1E1E1E] border-r border-gray-700 transition-all duration-300 ${isOpen ? "w-58" : "w-16"}`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6.75 z-10 w-6 h-6 rounded full bg-[#3A3A3A] border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      >
        {isOpen ? <MdChevronLeft size={14} /> : <MdChevronRight size={14} />}
      </button>
      {/* Logo */}
      <div
        className={`px-4 py-6 border-b border-gray-700 flex items-center gap-3 overflow-hidden`}
      >
        {/* Logo icon placeholder — replace src with your actual logo */}
        <div className="w-7 h-7 rounded bg-[#323371] shrink-0 flex items-center justify-center text-white text-xs font-bold">
          A
        </div>
        {isOpen && (
          <span className="text-white font-semibold text-sm tracking-tight whitespace-nowrap">
            APPLIED<span className="font-normal">HERE</span>
          </span>
        )}
      </div>
      {/* Nav */}
      <nav className="flex flex-col px-3 py-6 gap-1 flex-1 overflow-hidden">
        {/* Overview */}
        {isOpen && (
          <p className="text-gray-500 text-xs font-medium mb-2 px-2">
            Overview
          </p>
        )}
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 px-2.5 py-2 rounded-lg transition-colors ${
            pathname === "/dashboard"
              ? "bg-white/10 text-white"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <GoHomeFill size={18} className="shrink-0" />
          {isOpen && (
            <span className="text-sm font-medium whitespace-nowrap">
              Dashboard
            </span>
          )}
        </Link>

        <Link
          href="/dashboard/applications"
          className={`flex items-center gap-3 px-2.5 py-2 rounded-lg transition-colors ${
            pathname === "/dashboard/applications"
              ? "bg-white/10 text-white"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <MdFormatListBulleted size={18} className="shrink-0" />
          {isOpen && (
            <span className="text-sm whitespace-nowrap">All Applications</span>
          )}
        </Link>
        {/* By Status */}
        {isOpen && (
          <p className="text-gray-500 text-xs font-medium mt-6 mb-2 px-2">
            By Status
          </p>
        )}
        <div className={`flex flex-col gap-1 ${!isOpen ? "mt-4" : "}"}`}>
          {STATUS_DOTS.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2.5 px-3.5 py-1.5"
            >
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: s.color }}
              />
              {isOpen && (
                <span className="text-gray-300 text-sm whitespace-nowrap">
                  {s.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* User + logout */}
      <div className="px-3 py-4 border-t border-gray-700">
        <div
          className={`flex items-center ${
            isOpen ? "justify-between" : "justify-center"
          }`}
        >
          {/* LEFT: Avatar + user info */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#323371] flex items-center justify-center text-white text-xs font-medium shrink-0">
              {profile?.full_name?.[0]?.toUpperCase() ||
                user?.email?.[0]?.toUpperCase()}
            </div>

            {isOpen && (
              <div className="overflow-hidden">
                <p className="text-white text-xs font-medium truncate">
                  {profile?.full_name || "User"}
                </p>
                <p className="text-gray-500 text-xs truncate">{user?.email}</p>
              </div>
            )}
          </div>

          {/* RIGHT: Logout button */}
          <div className="relative group shrink-0">
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
            >
              <MdLogout size={16} />
            </button>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-[#1E1E1E] border border-gray-600 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Log out
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
