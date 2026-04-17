const COLUMNS = [
  { label: "Applied", color: "#6AABED" },
  { label: "Interview", color: "#AD5FDA" },
  { label: "Challenge", color: "#DBC66A" },
  { label: "Offer", color: "#72D562" },
  { label: "Rejected", color: "#DA2C2C" },
];

export default function PipelineView({ applications }) {
  const getByStatus = (status) =>
    applications.filter((app) => app.status === status).slice(0, 5);

  return (
    <div className="bg-[#3F3F3F] border border-gray-700 rounded-2xl p-6 mb-6">
      <h2 className="text-white text-base font-semibold mb-6">Pipeline View</h2>

      {/* Columns */}
      <div className="grid grid-cols-5 gap-2">
        {COLUMNS.map((col) => {
          const cards = getByStatus(col.label);

          return (
            <div
              key={col.label}
              className="flex flex-col gap-3 bg-[#2B2B2B]/50 p-4 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: col.color }}
                />
                <span className="text-gray-200 text-xs font-medium">
                  {col.label}
                </span>
                <span className="ml-auto text-gray-400 text-xs">
                  {cards.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2">
                {cards.length === 0 ? (
                  <div className="border border-dashed border-gray-700 rounded-xl h-16 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Empty</span>
                  </div>
                ) : (
                  cards.map((app) => (
                    <div
                      key={app.id}
                      className="bg-[#2B2B2B] border border-gray-700 rounded-xl px-3 py-3 flex flex-col gap-1 hover:border-gray-500 transition-colors cursor-pointer"
                    >
                      {/* Role */}
                      <p className="text-white text-xs font-medium leading-snug">
                        {app.role}
                      </p>
                      {/* Company */}
                      <p className="text-gray-400 text-xs">{app.company}</p>
                      {/* Location + date */}
                      <div className="flex items-center justify-between mt-1">
                        {app.location && (
                          <span className="text-gray-500 text-xs truncate">
                            {app.location}
                          </span>
                        )}
                        {app.date_applied && (
                          <span className="text-gray-500 text-xs ml-auto shrink-0">
                            {new Date(app.date_applied).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
