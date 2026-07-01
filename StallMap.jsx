export default function StallMap({ stalls, markets, onSelect }) {
  return (
    <div className="space-y-6">
      {markets.map((m) => {
        const marketStalls = stalls.filter((s) => s.marketId === m.id);
        const sections = [...new Set(marketStalls.map((s) => s.section))].sort();
        return (
          <div key={m.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-display font-bold text-sm text-gray-900">{m.name}</p>
                <p className="text-xs text-gray-400">{m.location}</p>
              </div>
              <div className="flex gap-3 text-[11px] text-gray-600">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#4CAF50' }} />
                  Vacant
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#F44336' }} />
                  Occupied
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#F9A825' }} />
                  Maintenance
                </span>
              </div>
            </div>
            {sections.map((sec) => (
              <div key={sec} className="mb-3 last:mb-0">
                <p className="text-[11px] font-semibold mb-1.5 text-gray-400">SECTION {sec}</p>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                  {marketStalls
                    .filter((s) => s.section === sec)
                    .map((s) => {
                      const color =
                        s.status === 'vacant' ? '#4CAF50' : s.status === 'occupied' ? '#F44336' : '#F9A825';
                      return (
                        <button
                          key={s.id}
                          onClick={() => onSelect && onSelect(s)}
                          className="aspect-square rounded-lg flex items-center justify-center text-[11px] font-bold text-white hover:opacity-80 transition-opacity"
                          style={{ backgroundColor: color }}
                          title={`${s.code} — ${s.status}`}
                        >
                          {s.code.split('-')[1]}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
