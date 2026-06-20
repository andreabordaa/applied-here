"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-bg-page/80 backdrop-blur-md morder-b border-border-default"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Website name */}
        <Link
          href="/"
          className="text-text-primary font-semibold text-lg tracking-tight"
        >
          APPLIED<span className="font-normal">HERE</span>
        </Link>
        {/* Full view tabs */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/about"
            className="text-text-secondary hover:text-text-primary text-sm transition-colors"
          >
            ABOUT US
          </Link>
          <Link
            href="/contact"
            className="text-text-secondary hover:text-text-primary text-sm transition-colors"
          >
            CONTACT
          </Link>
          <Link
            href="/login"
            className="text-sm px-4 py-2 rounded-lg border border-border-default text-text-secondary hover:border-accent hover:text-text-primary transition-colors"
          >
            LOG IN
          </Link>
        </div>
        {/* Mobile view tabs */}
        <button
          className="md:hidden text-text-secondary hover:text-text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div
            className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
          />
          <div
            className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`}
          />
          <div
            className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 px-2 pb-4 border-t border-border-default pt-4">
          <Link
            href="/about"
            className="text-text-secondary hover:text-text-primary text-sm"
          >
            ABOUT US
          </Link>
          <Link
            href="/contact"
            className="text-text-secondary hover:text-text-primary text-sm"
          >
            CONTACT
          </Link>
          <Link
            href="/login"
            className="text-text-secondary hover:text-text-primary text-sm"
          >
            LOG IN
          </Link>
        </div>
      )}
    </nav>
  );
}
