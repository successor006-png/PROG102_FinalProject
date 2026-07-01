import Badge from '../ui/Badge.jsx';

export default function TraderApplications({ db, trader, mutate, notify }) {
  const mine = db.allocations
    .filter((a) => a.traderId === trader.id && (a.status === 'pending' || a.status === 'rejected'))
    .map((a) => ({ ...a, stall: db.stalls.find((s) => s.id === a.stallId) }))
    .sort((a, b) => (a.appliedDate < b.appliedDate ? 1 : -1));

  function cancel(a) {
    mutate((d) => ({ ...d, allocations: d.allocations.filter((x) => x.id !== a.id) }));
    notify('Application withdrawn.');
  }

  return (
    <div className="space-y-3">
      {mine.length === 0 && <p className="text-sm text-center py-8 text-gray-400">You have no applications on record.</p>}
      {mine.map((a) => (
        <div key={a.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">Stall {a.stall?.code}</p>
            <p className="text-xs mt-0.5 text-gray-400">Applied {a.appliedDate}</p>
            {a.status === 'rejected' && a.notes && <p className="text-xs mt-1 text-red-500">Reason: {a.notes}</p>}
          </div>
          <div className="flex items-center gap-2">
            <Badge tone={a.status}>{a.status}</Badge>
            {a.status === 'pending' && (
              <button onClick={() => cancel(a)} className="text-xs font-semibold text-red-500">Withdraw</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
