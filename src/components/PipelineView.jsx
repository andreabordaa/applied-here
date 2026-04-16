const STAGES = [
  { label: "Applied", color: "#6AABED" },
  { label: "Interview", color: "#AD5FDA" },
  { label: "Challenge", color: "#DBC66A" },
  { label: "Offer", color: "#72D562" },
  { label: "Rejected", color: "#DA2C2C" },
];

export default function PipelineView({ applications }) {
  const total = applications.length;
  const getCount = (status) =>
    applications.filter((app) => app.status === status).length;

  return (
    <div className="bg-[#3F3F3F] border border-gray-700 rounded-2xl p-6 mb-6">
      <h2 className="text-white text-base font-semibold text-start mb-6">
        Pipeline View
      </h2>
      {/* Cards */}
    </div>
  );
}
