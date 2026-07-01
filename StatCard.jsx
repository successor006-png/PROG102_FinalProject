export default function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
        <p className="text-2xl font-bold mt-1 font-display text-gray-900">{value}</p>
        {sub && <p className="text-xs mt-1 text-gray-400">{sub}</p>}
      </div>
      <div className="p-2.5 rounded-lg bg-green-50">
        <Icon size={20} color="#1B5E20" />
      </div>
    </div>
  );
}
