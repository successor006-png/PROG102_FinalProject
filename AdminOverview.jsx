import { Users, Building2, ClipboardCheck, FileWarning } from 'lucide-react';
import StatCard from '../ui/StatCard.jsx';
import StallMap from '../StallMap.jsx';

export default function AdminOverview({ db }) {
  const totalStalls = db.stalls.length;
  const occupied = db.stalls.filter((s) => s.status === 'occupied').length;
  const pending = db.allocations.filter((a) => a.status === 'pending').length;
  const occRate = totalStalls ? Math.round((occupied / totalStalls) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Traders" value={db.traders.length} />
        <StatCard icon={Building2} label="Stalls" value={totalStalls} />
        <StatCard icon={ClipboardCheck} label="Occupancy" value={occRate + '%'} sub={`${occupied} of ${totalStalls} occupied`} />
        <StatCard icon={FileWarning} label="Pending applications" value={pending} />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="font-display font-bold text-sm mb-4 text-gray-900">Occupancy by market</p>
        <div className="space-y-3">
          {db.markets.map((m) => {
            const ms = db.stalls.filter((s) => s.marketId === m.id);
            const occ = ms.filter((s) => s.status === 'occupied').length;
            const pct = ms.length ? Math.round((occ / ms.length) * 100) : 0;
            return (
              <div key={m.id}>
                <div className="flex justify-between text-xs font-medium mb-1 text-gray-700">
                  <span>{m.name}</span>
                  <span>{occ}/{ms.length} stalls · {pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200">
                  <div className="h-2 rounded-full" style={{ width: pct + '%', backgroundColor: '#1B5E20' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <p className="font-display font-bold text-sm mb-3 text-gray-900">Market floor plan</p>
        <StallMap stalls={db.stalls} markets={db.markets} />
      </div>
    </div>
  );
}
