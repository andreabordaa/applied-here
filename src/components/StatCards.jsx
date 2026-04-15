const STAT_CONFIG = [
  { label: "Applied", status: "Applied", color: "#6AABED" },
  { label: "Interviews", status: "Interview", color: "#AD5FDA" },
  { label: "Offers", status: "Offer", color: "#72D562" },
  { label: "Offer Rate %", status: null, color: "#DBC66A" },
];

export default function StatCards({ applications }) {
  const countByStatus = (status) =>
    applications.filter((app) => app.status === status).length;
  const total = applications.length;
  const offers = countByStatus("Offer");
  const offerRate = total > 0 ? Math.round((offers / total) * 100) : 0;

  const stats = [
    { label: "Applied", value: total, color: "#6AABED" },
    {
      label: "Interviews",
      value: countByStatus("Interview"),
      color: "#AD5FDA",
    },
    { label: "Offers", value: offers, color: "#72D562" },
    { label: "Offer Rate %", value: `${offerRate}%`, color: "#DBC66A" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-[#3F3F3F] border border-gray-700 rounded-2xl px-5 py-4 flex flex-col gap-1"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: stat.color }}
            />
            <span className="text-gray-400 text-xs">{stat.label}</span>
          </div>

          {/* Value */}
          <p className="text-white text-3xl font-semibold mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
