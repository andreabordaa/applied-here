export default function StatCards({ applications }) {
  const countByStatus = (status) =>
    applications.filter((app) => app.status === status).length;
  const total = applications.length;
  const offers = countByStatus("Offer");
  const offerRate = total > 0 ? Math.round((offers / total) * 100) : 0;

  const stats = [
    { label: "Applied", value: total, color: "var(--color-status-applied)" },
    {
      label: "Interviews",
      value: countByStatus("Interview"),
      color: "var(--color-status-interview)",
    },
    { label: "Offers", value: offers, color: "var(--color-status-offer)" },
    {
      label: "Offer Rate %",
      value: `${offerRate}%`,
      color: "var(--color-status-challenge)",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-bg-surface border border-border-default rounded-2xl px-5 py-4 flex flex-col gap-1"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: stat.color }}
            />
            <span className="text-text-secondary text-xs">{stat.label}</span>
          </div>
          <p className="text-text-primary text-3xl font-semibold mt-1">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
