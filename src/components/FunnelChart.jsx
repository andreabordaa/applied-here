const STATUSES = [
  { label: "Applied", color: "#6AABED" },
  { label: "Interview", color: "#AD5FDA" },
  { label: "Challenge", color: "#DBC66A" },
  { label: "Offer", color: "#72D562" },
  { label: "Rejected", color: "#DA2C2C" },
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
    <div className="bg-[#3F3F3F] border border-gray-700 rounded-2xl p-6 mb-6">
      <h2 className="text-white text-base font-semibold text-center mb-6">
        {"How It's Going"}
      </h2>

      {/* Bars */}
      <div className="flex flex-col gap-3">
        {STATUSES.map((s) => {
          const count = getCount(s.label);
          const width = getWidth(count);

          return (
            <div key={s.label} className="flex items-center gap-4">
              {/* Label */}
              <span className="text-gray-300 text-sm w-20 shrink-0">
                {s.label}
              </span>
              {/* Bar track */}
              <div className="flex-1 bg-[#2B2B2B] rounded-full h-5 overflow-hidden">
                <div
                  className="h-5 rounded-full transition-all duration-500"
                  style={{
                    width: total === 0 ? "0%" : width,
                    backgroundColor: s.color,
                    opacity: total === 0 ? 0.15 : 0.8,
                  }}
                />
              </div>
              {/* Count */}
              <span className="text-gray-400 text-xs w-5 text-right shrink-0">
                {count}
              </span>
            </div>
          );
        })}
      </div>
      {total === 0 && (
        <p className="text-gray-400 text-sm text-center mt-5">
          No applications yet — add one to see your funnel
        </p>
      )}
    </div>
  );
}
