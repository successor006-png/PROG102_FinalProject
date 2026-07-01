import { addMonths, daysBetween, todayStr } from '../../lib/db.js';

export default function AdminAllocations({ db, mutate, notify }) {
  const active = db.allocations
    .filter((a) => a.status === 'active')
    .map((a) => ({
      ...a,
      trader: db.traders.find((t) => t.id === a.traderId),
      stall: db.stalls.find((s) => s.id === a.stallId),
    }));

  function terminate(a) {
    mutate((d) => ({
      ...d,
      allocations: d.allocations.map((x) => (x.id === a.id ? { ...x, status: 'terminated', decisionDate: todayStr() } : x)),
      stalls: d.stalls.map((s) => (s.id === a.stallId ? { ...s, status: 'vacant' } : s)),
    }));
    notify(`Stall ${a.stall.code} freed up.`);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-gray-200 bg-gray-50">
            {['Trader', 'Stall', 'Started', 'Expires', 'Days left', ''].map((h) => (
              <th key={h} className="px-4 py-2.5 font-semibold text-xs text-gray-400">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {active.length === 0 && (
            <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-400">No active allocations yet.</td></tr>
          )}
          {active.map((a) => {
            const expiry = addMonths(a.startDate, a.durationMonths);
            const daysLeft = daysBetween(expiry, todayStr());
            return (
              <tr key={a.id}>
                <td className="px-4 py-2.5 font-medium text-gray-900">{a.trader?.fullName}</td>
                <td className="px-4 py-2.5">{a.stall?.code}</td>
                <td className="px-4 py-2.5">{a.startDate}</td>
                <td className="px-4 py-2.5">{expiry}</td>
                <td className="px-4 py-2.5">
                  <span style={{ color: daysLeft <= 7 ? '#F44336' : '#424242' }}>
                    {daysLeft <= 0 ? 'Overdue' : `${daysLeft} days`}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <button onClick={() => terminate(a)} className="text-xs font-semibold text-red-500">End allocation</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
