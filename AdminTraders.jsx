import { useState } from 'react';
import { Search } from 'lucide-react';
import Badge from '../ui/Badge.jsx';

export default function AdminTraders({ db }) {
  const [q, setQ] = useState('');
  const filtered = db.traders.filter(
    (t) => t.fullName.toLowerCase().includes(q.toLowerCase()) || t.phone.includes(q)
  );

  function activeStallFor(traderId) {
    const a = db.allocations.find((a) => a.traderId === traderId && a.status === 'active');
    if (!a) return null;
    return db.stalls.find((s) => s.id === a.stallId);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center gap-2">
        <Search size={15} color="#9E9E9E" />
        <input
          className="flex-1 text-sm outline-none"
          placeholder="Search traders by name or phone"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <div className="divide-y divide-gray-200">
        {filtered.length === 0 && (
          <p className="p-6 text-sm text-center text-gray-400">No traders registered yet.</p>
        )}
        {filtered.map((t) => {
          const stall = activeStallFor(t.id);
          return (
            <div key={t.id} className="p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">{t.fullName}</p>
                <p className="text-xs mt-0.5 text-gray-400">
                  {t.businessType} · {t.phone} · Joined {t.dateRegistered}
                </p>
              </div>
              {stall ? <Badge tone="active">Stall {stall.code}</Badge> : <Badge>No active stall</Badge>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
