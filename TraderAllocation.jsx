import { Store } from 'lucide-react';
import Badge from '../ui/Badge.jsx';
import { addMonths, daysBetween, money, todayStr } from '../../lib/db.js';

export default function TraderAllocation({ db, trader }) {
  const active = db.allocations.find((a) => a.traderId === trader.id && a.status === 'active');
  const history = db.allocations
    .filter((a) => a.traderId === trader.id && (a.status === 'expired' || a.status === 'terminated'))
    .map((a) => ({ ...a, stall: db.stalls.find((s) => s.id === a.stallId) }));

  if (!active) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <Store size={28} className="mx-auto mb-2" color="#9E9E9E" />
        <p className="text-sm text-gray-400">You don't have an active stall yet. Browse vacant stalls to apply.</p>
        {history.length > 0 && (
          <div className="mt-6 text-left">
            <p className="text-xs font-semibold mb-2 text-gray-400">Past allocations</p>
            {history.map((a) => (
              <div key={a.id} className="flex justify-between text-xs py-1.5 border-t border-gray-200">
                <span>{a.stall?.code}</span><span className="text-gray-400">{a.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const stall = db.stalls.find((s) => s.id === active.stallId);
  const market = db.markets.find((m) => m.id === stall?.marketId);
  const expiry = addMonths(active.startDate, active.durationMonths);
  const daysLeft = daysBetween(expiry, todayStr());

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold uppercase text-gray-400">{market?.name}</p>
          <p className="font-display font-extrabold text-3xl mt-1" style={{ color: '#1B5E20' }}>{stall?.code}</p>
          <p className="text-sm mt-1 text-gray-600">Section {stall?.section} · {stall?.sizeSqm} sqm</p>
        </div>
        <Badge tone="active">active</Badge>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-gray-200">
        <div><p className="text-xs text-gray-400">Started</p><p className="text-sm font-semibold mt-0.5">{active.startDate}</p></div>
        <div><p className="text-xs text-gray-400">Expires</p><p className="text-sm font-semibold mt-0.5">{expiry}</p></div>
        <div>
          <p className="text-xs text-gray-400">Days left</p>
          <p className="text-sm font-semibold mt-0.5" style={{ color: daysLeft <= 7 ? '#F44336' : '#212121' }}>{daysLeft}</p>
        </div>
      </div>
      <p className="text-sm font-semibold mt-4" style={{ color: '#1B5E20' }}>{money(stall?.monthlyRate)} / month</p>
    </div>
  );
}
