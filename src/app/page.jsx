import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";

export default function Home() {
  return (
    <PublicLayout>
      <main>
        {/* Hero Section */}
        <section
          className="min-h-screen flex flex-col items-center justify-center text-center px-6"
          style={{
            background:
              "radial-gradient(ellipse at center, #2A2D5C 0%, #1C1F26 100%)",
          }}
        >
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-text-primary">
              Your job search, finally organized.
            </h1>
            <p className="text-lg max-w-xl mb-10 leading-relaxed text-text-secondary">
              Add every application in seconds. See your entire hiring pipeling
              — interviews, challenges, offers, and rejections - all in one
              place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <Link
                href="/signup"
                className="px-4 py-3 border border-border-hover hover:border-accent hover:text-white text-text-primary rounded-lg text-md font-semibold transition-colors"
              >
                Get started free
              </Link>
              <Link
                href="/about"
                className="px-4 py-3 border border-border-hover hover:bg-accent hover:border-accent hover:text-white text-text-primary rounded-lg text-md font-semibold transition-colors"
              >
                See how it works
              </Link>
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section className="flex flex-col items-center justify-center px-6 py-24 bg-bg-page">
          <div className="w-full max-w-4xl border border-border-default rounded-2xl overflow-hidden">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-bg-sidebar">
              <div className="w-3 h-3 rounded-full bg-border-hover" />
              <div className="w-3 h-3 rounded-full bg-border-hover" />
              <div className="w-3 h-3 rounded-full bg-border-hover" />
            </div>

            <div className="bg-bg-page p-8">
              <h2 className="text-text-primary text-2xl font-semibold text-center mb-8">
                My Applications
              </h2>
              {/* Stat cards */}
              <div className="grid grid-cols-4 gap-4 mb-10">
                {[
                  { label: "Applied", value: "24" },
                  { label: "Interviews", value: "6" },
                  { label: "Offers", value: "2" },
                  { label: "Offer Rate %", value: "8%" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-bg-surface rounded-2xl py-3 px-4 flex flex-col items-center justify-center"
                  >
                    <div className="text-text-primary text-lg font-semibold">
                      {stat.value}
                    </div>
                    <div className="text-text-secondary text-xs mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              {/* Status bar */}
              <h3 className="text-text-primary text-lg font-semibold text-center mb-6">
                {"How It's Going"}
              </h3>

              <div className="space-y-3 mb-10">
                {[
                  {
                    label: "Applied",
                    count: 24,
                    width: "100%",
                    color: "var(--color-status-applied)",
                  },
                  {
                    label: "Interview",
                    count: 12,
                    width: "50%",
                    color: "var(--color-status-interview)",
                  },
                  {
                    label: "Challenge",
                    count: 6,
                    width: "25%",
                    color: "var(--color-status-challenge)",
                  },
                  {
                    label: "Offer",
                    count: 2,
                    width: "8%",
                    color: "var(--color-status-offer)",
                  },
                  {
                    label: "Rejected",
                    count: 13,
                    width: "54%",
                    color: "var(--color-status-rejected)",
                  },
                ].map((bar) => (
                  <div key={bar.label} className="flex items-center gap-3">
                    <span className="text-text-primary text-sm font-medium w-20 shrink-0">
                      {bar.label}
                    </span>
                    <div className="flex-1 bg-bg-surface rounded-full h-5">
                      <div
                        className="h-5 rounded-full"
                        style={{
                          width: bar.width,
                          backgroundColor: bar.color,
                          opacity: 0.85,
                        }}
                      />
                    </div>
                    <span className="text-text-primary text-xs font-medium w-6 text-right shrink-0">
                      {bar.count}
                    </span>
                  </div>
                ))}
              </div>
              {/* Recent applications */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-text-primary text-lg font-semibold">
                  Recent Applications
                </h3>
                <button className="text-sm px-4 py-2 rounded-xl border border-border-default text-text-primary hover:bg-white/10 transition-colors">
                  + Add new
                </button>
              </div>

              <div className="border-t border-border-default pt-4 space-y-2">
                {[
                  {
                    role: "Frontend Engineer",
                    company: "Stripe",
                    status: "Interview",
                    color:
                      "text-[var(--color-status-interview)] bg-[var(--color-status-interview)]/10",
                  },
                  {
                    role: "Software Engineer",
                    company: "Linear",
                    status: "Offer",
                    color:
                      "text-[var(--color-status-offer)] bg-[var(--color-status-offer)]/10",
                  },
                  {
                    role: "Product Designer",
                    company: "Notion",
                    status: "Challenge",
                    color:
                      "text-[var(--color-status-challenge)] bg-[var(--color-status-challenge)]/10",
                  },
                ].map((app) => (
                  <div
                    key={app.role}
                    className="flex items-center justify-between bg-bg-surface rounded-xl px-4 py-3"
                  >
                    <div>
                      <div className="text-sm font-medium text-text-primary">
                        {app.role}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {app.company}
                      </div>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${app.color}`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="flex flex-col items-center justify-center px-6 py-24 text-center bg-bg-surface">
          <h2 className="text-text-primary text-3xl font-bold mb-4">
            Ready to take control?
          </h2>
          <p className="text-text-secondary mb-8 max-w-md">
            Join job seekers who stay organized and never lose track of an
            application again.
          </p>
          <Link
            href="/signup"
            className="px-8 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
          >
            Get started free
          </Link>
        </section>
      </main>
    </PublicLayout>
  );
}
