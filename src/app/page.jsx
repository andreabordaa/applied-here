import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";

export default function Home() {
  return (
    <PublicLayout>
      <main>
        {/* HERO SECTION */}
        <section
          className="min-h-screen flex flex-col items-center justify-center text-center px-6"
          style={{
            background:
              "radial-gradient(ellipse at center, #323371 0%, #3F3F3F 50%)",
          }}
        >
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Your job search, finally organized.
            </h1>
            {/* Subheadline */}
            <p className="text-lg max-w-xl mb-10 leading-relaxed">
              Add every application in seconds. See your entire hiring pipeline
              — interviews, challenges, offers, and rejections — all in one
              place.
            </p>
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <Link
                href="/signup"
                className="px-4 py-3 border border-gray-500 hover:bg-[#232470] hover:border-[#232470] hover:text-white rounded-lg text-md font-semibold transition-colors"
              >
                Get started free
              </Link>
              <Link
                href="/signup"
                className="px-4 py-3 border border-gray-500 hover:bg-[#232470] hover:border-[#232470] hover:text-white rounded-lg text-md font-semibold transition-colors"
              >
                See how it works
              </Link>
            </div>
          </div>
        </section>

        {/* DASHBOARD PREVIEW SECTION */}
        <section
          className="flex flex-col items-center justify-center px-6 py-24"
          style={{ background: "#3F3F3F" }}
        >
          <div className="w-full max-w-4xl border border-[#9C9C9C] rounded-2xl overflow-hidden">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1E1E1E]">
              <div className="w-3 h-3 rounded-full bg-[#555]" />
              <div className="w-3 h-3 rounded-full bg-[#555]" />
              <div className="w-3 h-3 rounded-full bg-[#555]" />
            </div>

            {/* Dashboard inner */}
            <div className="bg-[#3F3F3F] p-8">
              {/* Title */}
              <h2 className="text-white text-2xl font-semibold text-center mb-8">
                My Applications
              </h2>

              {/* Stat cards — shorter height with less padding */}
              <div className="grid grid-cols-4 gap-4 mb-10">
                {[
                  { label: "Applied", value: "24" },
                  { label: "Interviews", value: "6" },
                  { label: "Offers", value: "2" },
                  { label: "Offer Rate %", value: "8%" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[#2A2A2A] rounded-2xl py-3 px-4 flex flex-col items-center justify-center"
                  >
                    <div className="text-white text-lg font-semibold">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-xs mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* How It's Going */}
              <h3 className="text-white text-lg font-semibold text-center mb-6">
                {"How It's Going"}
              </h3>

              <div className="space-y-3 mb-10">
                {[
                  {
                    label: "Applied",
                    count: 24,
                    width: "100%",
                    color: "#6AABED",
                  },
                  {
                    label: "Interview",
                    count: 12,
                    width: "50%",
                    color: "#AD5FDA",
                  },
                  {
                    label: "Challenge",
                    count: 6,
                    width: "25%",
                    color: "#DBC66A",
                  },
                  { label: "Offer", count: 2, width: "8%", color: "#72D562" },
                  {
                    label: "Rejected",
                    count: 13,
                    width: "54%",
                    color: "#DA2C2C",
                  },
                ].map((bar) => (
                  <div key={bar.label} className="flex items-center gap-3">
                    {/* Label */}
                    <span className="text-white text-sm font-medium w-20 shrink-0">
                      {bar.label}
                    </span>

                    {/* Bar track */}
                    <div className="flex-1 bg-[#2A2A2A] rounded-full h-5">
                      <div
                        className="h-5 rounded-full"
                        style={{
                          width: bar.width,
                          backgroundColor: bar.color,
                          opacity: 0.75,
                        }}
                      />
                    </div>

                    {/* Count beside the bar */}
                    <span className="text-white text-xs font-semibold w-6 text-right shrink-0">
                      {bar.count}
                    </span>
                  </div>
                ))}
              </div>

              {/* Recent Applications */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white text-lg font-semibold">
                  Recent Applications
                </h3>
                <button className="text-sm px-4 py-2 rounded-xl border border-gray-500 text-white hover:bg-white/10 transition-colors">
                  + Add new
                </button>
              </div>

              <div className="border-t border-gray-600 pt-4 space-y-2">
                {[
                  {
                    role: "Frontend Engineer",
                    company: "Stripe",
                    status: "Interview",
                    color: "text-[#AD5FDA] bg-[#AD5FDA]/10",
                  },
                  {
                    role: "Software Engineer",
                    company: "Linear",
                    status: "Offer",
                    color: "text-green-400 bg-green-400/10",
                  },
                  {
                    role: "Product Designer",
                    company: "Notion",
                    status: "Challenge",
                    color: "text-amber-400 bg-amber-400/10",
                  },
                ].map((app) => (
                  <div
                    key={app.role}
                    className="flex items-center justify-between bg-[#2A2A2A] rounded-xl px-4 py-3"
                  >
                    <div>
                      <div className="text-sm font-medium text-white">
                        {app.role}
                      </div>
                      <div className="text-xs text-gray-400">{app.company}</div>
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
      </main>
    </PublicLayout>
  );
}
