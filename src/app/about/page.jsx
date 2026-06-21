import PublicLayout from "@/components/PublicLayout";
import Link from "next/link";

export default function About() {
  return (
    <PublicLayout>
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <h1 className="text-text-primary text-4xl font-bold mb-4">
            Why we built Applied Here
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-12">
            Job searching is hard enough without losing track of where you
            actually stand.
          </p>

          {/* Story section */}
          <div className="flex flex-col gap-6 mb-12">
            <p className="text-text-secondary leading-relaxed">
              Applied Here was inspired by my own job search. I found myself
              keeping track of applications through flagged emails,
              spreadsheets, and LinkedIn&apos;s job tracker, but none of them
              gave me a complete picture of where I stood.
            </p>

            <p className="text-text-secondary leading-relaxed">
              It was easy to lose track of application statuses, interview
              progress, and follow-up opportunities. I wanted a simpler way to
              organize everything in one place and better understand how my job
              search was progressing.
            </p>

            <p className="text-text-secondary leading-relaxed">
              I built Applied Here to do exactly that — a centralized dashboard
              where users can track applications, monitor their progress through
              each stage of the hiring process, and view insights that help make
              the job search more manageable.
            </p>
          </div>

          {/* Values grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                emoji: "🔍",
                title: "Built for clarity",
                desc: "No clutter, no spreadsheets. Just a clean view of your applications and where each one stands.",
              },
              {
                emoji: "📊",
                title: "Visual by default",
                desc: "See your pipeline as a funnel, not a wall of text. Understand your search at a glance.",
              },
              {
                emoji: "💼",
                title: "Made for job seekers",
                desc: "Built by someone who went through the exact same search — and wanted something better.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-base">
                  {item.emoji}
                </div>
                <h3 className="text-text-primary font-medium">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="border-t border-border-default pt-10 text-center">
            <h2 className="text-text-primary text-2xl font-semibold mb-3">
              Ready to get organized?
            </h2>
            <p className="text-text-secondary mb-6">
              Start tracking your applications in seconds.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
            >
              Get started free
            </Link>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
