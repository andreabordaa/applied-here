const COLUMNS = [
  { label: "Applied", color: "var(--color-status-applied)" },
  { label: "Interview", color: "var(--color-status-interview)" },
  { label: "Challenge", color: "var(--color-status-challenge)" },
  { label: "Offer", color: "var(--color-status-offer)" },
];

export default function PipelineView({ applications }) {
  const getByStatus = (status) =>
    applications.filter((app) => app.status === status).slice(0, 5);

  return (
    <div className="bg-bg-surface border border-border-default rounded-2xl p-6 mb-6">
      <h2 className="text-text-primary text-base font-semibold mb-6">
        Pipeline View
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const cards = getByStatus(col.label);

          return (
            <div key={col.label} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: col.color }}
                />
                <span className="text-text-secondary text-xs font-medium">
                  {col.label}
                </span>
                <span className="ml-auto text-text-muted text-xs">
                  {cards.length}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {cards.length === 0 ? (
                  <div className="border border-dashed border-border-default rounded-xl h-16 flex items-center justify-center">
                    <span className="text-text-muted text-xs">Empty</span>
                  </div>
                ) : (
                  cards.map((app) => (
                    <div
                      key={app.id}
                      className="bg-bg-page border border-border-default rounded-xl px-3 py-3 flex flex-col gap-1 hover:border-border-hover transition-colors cursor-pointer"
                    >
                      <p className="text-text-primary text-xs font-medium leading-snug">
                        {app.role}
                      </p>
                      <p className="text-text-secondary text-xs">
                        {app.company}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        {app.location && (
                          <span className="text-text-muted text-xs truncate">
                            {app.location}
                          </span>
                        )}
                        {app.date_applied && (
                          <span className="text-text-muted text-xs ml-auto shrink-0">
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
