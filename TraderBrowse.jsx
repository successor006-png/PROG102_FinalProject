import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import Badge from '../ui/Badge.jsx';
import { genId, money, todayStr } from '../../lib/db.js';

export default function TraderBrowse({ db, trader, mutate, notify }) {
  const [marketFilter, setMarketFilter] = useState('all');
  const myActive = db.allocations.find((a) => a.traderId === trader.id && a.status === 'active');
  const myPending = db.allocations.find((a) => a.traderId === trader.id && a.status === 'pending');
  const blocked = !!myActive || !!myPending;

  const vacant = db.stalls.filter((s) => s.status === 'vacant' && (marketFilter === 'all' || s.marketId === marketFilter));

  function apply(stall) {
    if (blocked) { notify('You already have an active allocation or a pending application.', 'error'); return; }
    const allocation = {
      id: genId('al'), stallId: stall.id, traderId: trader.id, status: 'pending',
      appliedDate: todayStr(), decisionDate: null, startDate: null, durationMonths: null, notes: '',
    };
    mutate((d) => ({ ...d, allocations: [...d.allocations, allocation] }));
    notify(`Application sent for stall ${stall.code}. An administrator will review it.`);
  }

  return (
    <div className="space-y-4">
      {blocked && (
        <div className="rounded-lg p-3.5 text-sm flex items-center gap-2" style={{ backgroundColor: '#FFF8E1', color: '#8D6E00' }}>
          <AlertCircle size={16} />
          {myActive
            ? 'You already hold an active stall — release it before applying for another.'
            : 'You have a pending application — wait for a decision before applying again.'}
        </div>
      )}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setMarketFilter('all')}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border"
          style={marketFilter === 'all' ? { backgroundColor: '#1B5E20', color: 'white', borderColor: '#1B5E20' } : { borderColor: '#E0E0E0', color: '#616161' }}
        >
          All markets
        </button>
        {db.markets.map((m) => (
          <button
            key={m.id}
            onClick={() => setMarketFilter(m.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border"
            style={marketFilter === m.id ? { backgroundColor: '#1B5E20', color: 'white', borderColor: '#1B5E20' } : { borderColor: '#E0E0E0', color: '#616161' }}
          >
            {m.name}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vacant.length === 0 && (
          <p className="text-sm col-span-full text-center py-8 text-gray-400">No vacant stalls match this filter right now.</p>
        )}
        {vacant.map((s) => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex justify-between items-start mb-2">
              <p className="font-display font-bold text-sm text-gray-900">{s.code}</p>
              <Badge tone="vacant">vacant</Badge>
            </div>
            <p className="text-xs text-gray-400">{db.markets.find((m) => m.id === s.marketId)?.name} · Section {s.section}</p>
            <p className="text-xs mt-1 text-gray-400">{s.sizeSqm} sqm</p>
            <p className="text-sm font-semibold mt-2" style={{ color: '#1B5E20' }}>{money(s.monthlyRate)} / month</p>
            <button
              onClick={() => apply(s)}
              disabled={blocked}
              className="w-full mt-3 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-40"
              style={{ backgroundColor: '#1B5E20' }}
            >
              Apply for this stall
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
