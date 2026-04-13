"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-[#3F3F3F]/80 backdrop-blur-md border-b border-gray-900"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-white font-semibold text-lg tracking-tight"
        >
          APPLIED<span className="font-normal">HERE</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/about"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            ABOUT US
          </Link>
          <Link
            href="/contact"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            CONTACT
          </Link>
          <Link
            href="/login"
            className="text-sm px-4 py-2 rounded-lg bg-[#232470] text-gray-300 hover:bg-white hover:text-[#232470] transition-colors"
          >
            LOG IN
          </Link>
        </div>

        {/* Hamburger button */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div
            className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
          />
          <div
            className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`}
          />
          <div
            className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
          />
        </button>
      </div>

      {/* Mobile links */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 px-2 pb-4 border-t border-gray-800 pt-4">
          <Link
            href="/about"
            className="text-gray-400 hover:text-white text-sm"
          >
            ABOUT US
          </Link>
          <Link
            href="/contact"
            className="text-gray-400 hover:text-white text-sm"
          >
            CONTACT
          </Link>
          <Link
            href="/login"
            className="text-gray-300 hover:text-white text-sm"
          >
            LOG IN
          </Link>
        </div>
      )}
    </nav>
  );
}
