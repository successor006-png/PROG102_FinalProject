import { Store, LogOut } from 'lucide-react';

export default function Shell({ user, tabs, active, setActive, onLogout, children }) {
  return (
    <div className="min-h-screen font-body bg-gray-100">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1B5E20' }}>
              <Store size={16} color="white" />
            </div>
            <div>
              <p className="font-display font-bold text-sm leading-none text-gray-900">Wi Stall</p>
              <p className="text-[11px] leading-none mt-1 text-gray-400">Freetown Market System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold leading-none text-gray-900">{user.name}</p>
              <p className="text-[11px] mt-1 capitalize text-gray-400">{user.role}</p>
            </div>
            <button onClick={onLogout} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50" title="Log out">
              <LogOut size={15} color="#616161" />
            </button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-5 flex gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors"
              style={active === t.key ? { borderColor: '#1B5E20', color: '#1B5E20' } : { borderColor: 'transparent', color: '#757575' }}
            >
              <t.icon size={15} /> {t.label}
              {!!t.badge && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: '#F44336' }}>
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-5 py-6">{children}</main>
    </div>
  );
}
