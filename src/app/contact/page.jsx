"use client";

import { useState } from "react";
import PublicLayout from "@/components/PublicLayout";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <PublicLayout>
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <h1 className="text-text-primary text-4xl font-bold mb-3">
            Get in touch
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-10">
            Questions, feedback, or just want to say hi? Send a message below.
          </p>

          {/* Success state */}
          {status === "success" ? (
            <div className="bg-status-offer/10 border border-status-offer/30 rounded-2xl p-6 text-center">
              <p className="text-status-offer font-medium mb-1">
                Message sent!
              </p>
              <p className="text-text-secondary text-sm">
                Thanks for reaching out — I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-text-secondary text-xs font-medium">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="bg-bg-surface border border-border-default text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors placeholder:text-text-muted"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-text-secondary text-xs font-medium">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="bg-bg-surface border border-border-default text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors placeholder:text-text-muted"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-text-secondary text-xs font-medium">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={5}
                  required
                  className="bg-bg-surface border border-border-default text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors placeholder:text-text-muted resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-status-rejected text-sm">
                  Something went wrong — please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-3 rounded-xl transition-colors mt-2"
              >
                {status === "loading" ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>
      </main>
    </PublicLayout>
  );
}
