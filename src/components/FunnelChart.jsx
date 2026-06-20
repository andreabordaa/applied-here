const STATUSES = [
  { label: "Applied", color: "var(--color-status-applied)" },
  { label: "Interview", color: "var(--color-status-interview)" },
  { label: "Challenge", color: "var(--color-status-challenge)" },
  { label: "Offer", color: "var(--color-status-offer)" },
  { label: "Rejected", color: "var(--color-status-rejected)" },
];

export default function FunnelChart({ applications }) {
  const total = applications.length;

  const getCount = (status) =>
    applications.filter((app) => app.status === status).length;

  const getWidth = (count) => {
    if (total === 0) return "0%";
    return `${Math.round((count / total) * 100)}%`;
  };

  return (
    <div className="bg-bg-surface border border-border-default rounded-2xl p-6 mb-6">
      <h2 className="text-text-primary text-base font-semibold text-center mb-6">
        {"How It's Going"}
      </h2>

      <div className="flex flex-col gap-3">
        {STATUSES.map((s) => {
          const count = getCount(s.label);
          const width = getWidth(count);

          return (
            <div key={s.label} className="flex items-center gap-4">
              <span className="text-text-secondary text-sm w-20 shrink-0">
                {s.label}
              </span>
              <div className="flex-1 bg-bg-page rounded-full h-5 overflow-hidden">
                <div
                  className="h-5 rounded-full transition-all duration-500"
                  style={{
                    width: total === 0 ? "100%" : width,
                    backgroundColor: s.color,
                    opacity: total === 0 ? 0.15 : 0.85,
                  }}
                />
              </div>
              <span className="text-text-secondary text-xs w-5 text-right shrink-0">
                {count}
              </span>
            </div>
          );
        })}
      </div>

      {total === 0 && (
        <p className="text-text-muted text-xs text-center mt-5">
          No applications yet — add one to see your funnel
        </p>
      )}
    </div>
  );
}
