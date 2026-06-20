const STATUS_STYLES = {
  Applied: "text-color-status-applied bg-color-status-applied/15",
  Interview: "text-color-status-interview bg-color-status-interview/15",
  Challenge: "text-color-status-challenge bg-color-status-challenge/15",
  Offer: "text-color-status-offer bg-color-status-offer/15",
  Rejected: "text-color-status-rejected bg-color-status-rejected/15",
};

export default function ApplicationTable({ applications, onAddNew }) {
  const recent = [...applications]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <div className="bg-bg-surface border border-border-default rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-text-primary text-base font-semibold">
          Recent Applications
        </h2>
        <button
          onClick={onAddNew}
          className="text-sm px-4 py-2 rounded-xl border border-border-default text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors"
        >
          + Add new
        </button>
      </div>

      <div className="border-t border-border-default pt-4">
        {applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <p className="text-text-secondary text-sm">No applications yet</p>
            <p className="text-text-muted text-xs">
              Click &quot;+ Add new&quot; to log your first application
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-3 px-3 pb-2">
              <span className="col-span-3 text-text-muted text-xs font-medium">
                Role
              </span>
              <span className="col-span-3 text-text-muted text-xs font-medium">
                Company
              </span>
              <span className="col-span-2 text-text-muted text-xs font-medium">
                Location
              </span>
              <span className="col-span-2 text-text-muted text-xs font-medium">
                Date
              </span>
              <span className="col-span-2 text-text-muted text-xs font-medium">
                Status
              </span>
            </div>

            {/* Rows */}
            {recent.map((app) => (
              <div
                key={app.id}
                className="bg-bg-sidebar/20 grid grid-cols-12 gap-3 px-3 py-3 rounded-xl hover:bg-bg-page transition-colors items-center"
              >
                <span className="col-span-3 text-text-primary text-sm truncate">
                  {app.role}
                </span>
                <span className="col-span-3 text-text-secondary text-sm truncate">
                  {app.company}
                </span>
                <span className="col-span-2 text-text-secondary text-sm truncate">
                  {app.location || "—"}
                </span>
                <span className="col-span-2 text-text-secondary text-sm">
                  {app.date_applied
                    ? new Date(app.date_applied).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "—"}
                </span>
                <span className="col-span-2">
                  <span
                    className={`inline-block text-xs py-1 rounded-full font-medium whitespace-nowrap ${STATUS_STYLES[app.status] || ""}`}
                  >
                    {app.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
