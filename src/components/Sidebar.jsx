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
  { label: "Applied", color: "var(--color-status-applied)" },
  { label: "Interview", color: "var(--color-status-interview)" },
  { label: "Challenge", color: "var(--color-status-challenge)" },
  { label: "Offer", color: "var(--color-status-offer)" },
  { label: "Rejected", color: "var(--color-status-rejected)" },
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
      className={`relative flex flex-col h-full bg-bg-sidebar border-r border-border-default transition-all duration-300 ${
        isOpen ? "w-52" : "w-16"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6.75 z-10 w-6 h-6 rounded-full bg-bg-surface border border-border-default flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
      >
        {isOpen ? <MdChevronLeft size={14} /> : <MdChevronRight size={14} />}
      </button>

      <div className="px-4 py-6 border-b border-border-default flex items-center gap-3 overflow-hidden">
        <div className="w-7 h-7 rounded bg-accent shrink-0 flex items-center justify-center text-white text-xs font-bold">
          A
        </div>
        {isOpen && (
          <span className="text-text-primary font-semibold text-sm tracking-tight whitespace-nowrap">
            APPLIED<span className="font-normal">HERE</span>
          </span>
        )}
      </div>

      <nav className="flex flex-col px-3 py-6 gap-1 flex-1 overflow-hidden">
        {isOpen && (
          <p className="text-text-muted text-xs font-medium mb-2 px-2">
            Overview
          </p>
        )}

        <Link
          href="/dashboard"
          className={`flex items-center gap-3 px-2.5 py-2 rounded-lg transition-colors ${
            pathname === "/dashboard"
              ? "bg-bg-surface text-text-primary"
              : "text-text-secondary hover:text-text-primary hover:bg-bg-surface/50"
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
              ? "bg-bg-surface text-text-primary"
              : "text-text-secondary hover:text-text-primary hover:bg-bg-surface/50"
          }`}
        >
          <MdFormatListBulleted size={18} className="shrink-0" />
          {isOpen && (
            <span className="text-sm whitespace-nowrap">All Applications</span>
          )}
        </Link>

        {isOpen && (
          <p className="text-text-muted text-xs font-medium mt-6 mb-2 px-2">
            By Status
          </p>
        )}

        <div className={`flex flex-col gap-1 ${!isOpen ? "mt-4" : ""}`}>
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
                <span className="text-text-secondary text-sm whitespace-nowrap">
                  {s.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </nav>

      <div className="px-3 py-4 border-t border-border-default">
        {isOpen ? (
          // Expanded — avatar + name/email on left, logout on right
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium shrink-0">
                {profile?.full_name?.[0]?.toUpperCase() ||
                  user?.email?.[0]?.toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-text-primary text-xs font-medium truncate">
                  {profile?.full_name || "User"}
                </p>
                <p className="text-text-muted text-xs truncate">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="relative group shrink-0">
              <button
                onClick={handleLogout}
                className="text-text-muted hover:text-text-primary transition-colors p-1.5 rounded-lg hover:bg-bg-surface"
              >
                <MdLogout size={16} />
              </button>
              <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-bg-sidebar border border-border-default text-text-primary text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Log out
              </div>
            </div>
          </div>
        ) : (
          // Collapsed — avatar on top, logout icon below, both centered
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium shrink-0">
              {profile?.full_name?.[0]?.toUpperCase() ||
                user?.email?.[0]?.toUpperCase()}
            </div>

            <div className="relative group">
              <button
                onClick={handleLogout}
                className="text-text-muted hover:text-text-primary transition-colors p-1.5 rounded-lg hover:bg-bg-surface"
              >
                <MdLogout size={16} />
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-bg-sidebar border border-border-default text-text-primary text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Log out
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
