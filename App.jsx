import { useState, useEffect, useCallback } from 'react';
import {
  Users, ClipboardCheck, BarChart3, Search, Store, User, LayoutGrid, MapPin,
} from 'lucide-react';
import { loadDB, saveDB } from './lib/db.js';
import AuthScreen from './components/AuthScreen.jsx';
import Shell from './components/Shell.jsx';
import Toast from './components/ui/Toast.jsx';

import AdminOverview from './components/admin/AdminOverview.jsx';
import AdminTraders from './components/admin/AdminTraders.jsx';
import AdminStalls from './components/admin/AdminStalls.jsx';
import AdminApplications from './components/admin/AdminApplications.jsx';
import AdminAllocations from './components/admin/AdminAllocations.jsx';

import TraderBrowse from './components/trader/TraderBrowse.jsx';
import TraderApplications from './components/trader/TraderApplications.jsx';
import TraderAllocation from './components/trader/TraderAllocation.jsx';
import TraderProfile from './components/trader/TraderProfile.jsx';

export default function App() {
  const [db, setDb] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [active, setActive] = useState('overview');
  const [toast, setToast] = useState({ msg: '', tone: 'ok' });

  useEffect(() => {
    setDb(loadDB());
  }, []);

  const notify = useCallback((msg, tone = 'ok') => {
    setToast({ msg, tone });
    setTimeout(() => setToast({ msg: '', tone: 'ok' }), 2600);
  }, []);

  const mutate = useCallback((updater) => {
    setDb((prev) => {
      const next = updater(prev);
      saveDB(next);
      return next;
    });
  }, []);

  function handleLogin(user, newRecords) {
    if (newRecords) {
      setDb((prev) => {
        const next = {
          ...prev,
          traders: [...prev.traders, newRecords.trader],
          users: [...prev.users, newRecords.user],
        };
        saveDB(next);
        return next;
      });
    }
    setCurrentUser(user);
    setActive(user.role === 'admin' ? 'overview' : 'browse');
  }

  function handleLogout() {
    setCurrentUser(null);
  }

  if (!db) return null;

  if (!currentUser) {
    return <AuthScreen db={db} onLogin={handleLogin} />;
  }

  if (currentUser.role === 'admin') {
    const tabs = [
      { key: 'overview', label: 'Overview', icon: BarChart3 },
      { key: 'traders', label: 'Traders', icon: Users },
      { key: 'stalls', label: 'Stalls', icon: LayoutGrid },
      {
        key: 'applications', label: 'Applications', icon: ClipboardCheck,
        badge: db.allocations.filter((a) => a.status === 'pending').length,
      },
      { key: 'allocations', label: 'Allocations', icon: MapPin },
    ];
    return (
      <Shell user={currentUser} tabs={tabs} active={active} setActive={setActive} onLogout={handleLogout}>
        {active === 'overview' && <AdminOverview db={db} />}
        {active === 'traders' && <AdminTraders db={db} />}
        {active === 'stalls' && <AdminStalls db={db} mutate={mutate} notify={notify} />}
        {active === 'applications' && <AdminApplications db={db} mutate={mutate} notify={notify} />}
        {active === 'allocations' && <AdminAllocations db={db} mutate={mutate} notify={notify} />}
        <Toast msg={toast.msg} tone={toast.tone} />
      </Shell>
    );
  }

  const trader = db.traders.find((t) => t.id === currentUser.traderId);
  const tabs = [
    { key: 'browse', label: 'Browse stalls', icon: Search },
    { key: 'applications', label: 'My applications', icon: ClipboardCheck },
    { key: 'allocation', label: 'My stall', icon: Store },
    { key: 'profile', label: 'Profile', icon: User },
  ];
  return (
    <Shell user={currentUser} tabs={tabs} active={active} setActive={setActive} onLogout={handleLogout}>
      {active === 'browse' && <TraderBrowse db={db} trader={trader} mutate={mutate} notify={notify} />}
      {active === 'applications' && <TraderApplications db={db} trader={trader} mutate={mutate} notify={notify} />}
      {active === 'allocation' && <TraderAllocation db={db} trader={trader} />}
      {active === 'profile' && <TraderProfile trader={trader} mutate={mutate} notify={notify} />}
      <Toast msg={toast.msg} tone={toast.tone} />
    </Shell>
  );
}
