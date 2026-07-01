import { useState } from 'react';
import { Store, Check, ArrowRight, Loader2 } from 'lucide-react';
import Field, { inputClass } from './ui/Field.jsx';
import { genId, todayStr } from '../lib/db.js';

export default function AuthScreen({ db, onLogin }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', password: '' });
  const [regForm, setRegForm] = useState({
    fullName: '', phone: '', businessType: '', nationalId: '',
    username: '', password: '', confirm: '',
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setError('');
    const user = db.users.find((u) => u.username === form.username.trim() && u.password === form.password);
    if (!user) { setError('Username or password is incorrect.'); return; }
    onLogin(user);
  }

  function handleRegister(e) {
    e.preventDefault();
    setError('');
    const { fullName, phone, businessType, username, password, confirm } = regForm;
    if (!fullName || !phone || !businessType || !username || !password) {
      setError('Please fill in every required field.'); return;
    }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (db.users.some((u) => u.username === username.trim())) { setError('That username is already taken.'); return; }
    setBusy(true);
    const traderId = genId('tr');
    const trader = {
      id: traderId,
      fullName, phone, businessType,
      nationalId: regForm.nationalId || '',
      dateRegistered: todayStr(),
    };
    const user = { id: genId('u'), username: username.trim(), password, role: 'trader', traderId, name: fullName };
    onLogin(user, { trader, user });
    setBusy(false);
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="hidden md:flex flex-col justify-between w-[42%] p-10 text-white bg-brand-primary" style={{ backgroundColor: '#1B5E20' }}>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
            <Store size={18} />
          </div>
          <span className="font-display font-bold text-lg">Wi Stall</span>
        </div>
        <div>
          <h1 className="font-display font-extrabold text-4xl leading-tight mb-4">
            Fair stalls,<br />for every trader.
          </h1>
          <p className="font-body text-sm text-white/80 max-w-sm leading-relaxed">
            A transparent way for Freetown's markets to register traders, allocate stalls,
            and keep an honest record — replacing the paper register with one every
            trader and administrator can trust.
          </p>
          <div className="flex gap-6 mt-8">
            <div>
              <p className="font-display font-bold text-2xl">{db.markets.length}</p>
              <p className="text-xs text-white/70">Markets live</p>
            </div>
            <div>
              <p className="font-display font-bold text-2xl">{db.stalls.length}</p>
              <p className="text-xs text-white/70">Stalls tracked</p>
            </div>
            <div>
              <p className="font-display font-bold text-2xl">{db.traders.length}</p>
              <p className="text-xs text-white/70">Traders registered</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-white/50 font-body">SDG 8 · Decent Work and Economic Growth</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="flex gap-1 mb-6 p-1 rounded-lg bg-white border border-gray-200">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className="flex-1 py-2 rounded-md text-sm font-semibold transition-colors"
              style={mode === 'login' ? { backgroundColor: '#1B5E20', color: 'white' } : { color: '#616161' }}
            >
              Log in
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className="flex-1 py-2 rounded-md text-sm font-semibold transition-colors"
              style={mode === 'register' ? { backgroundColor: '#1B5E20', color: 'white' } : { color: '#616161' }}
            >
              Register as trader
            </button>
          </div>

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <h2 className="font-display font-bold text-xl text-gray-900">Welcome back</h2>
              <Field label="Username">
                <input className={inputClass} value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="e.g. admin" />
              </Field>
              <Field label="Password">
                <input type="password" className={inputClass} value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
              </Field>
              {error && <p className="text-xs font-medium text-red-500">{error}</p>}
              <button type="submit" className="w-full py-2.5 rounded-lg text-white font-semibold text-sm flex items-center justify-center gap-1.5" style={{ backgroundColor: '#1B5E20' }}>
                Log in <ArrowRight size={15} />
              </button>
              <p className="text-xs text-center pt-2 text-gray-400">
                Demo admin — username <b>admin</b>, password <b>admin123</b>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <h2 className="font-display font-bold text-xl mb-1 text-gray-900">Register as a trader</h2>
              <Field label="Full name *">
                <input className={inputClass} value={regForm.fullName}
                  onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })} placeholder="Aminata Kamara" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Phone *">
                  <input className={inputClass} value={regForm.phone}
                    onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })} placeholder="076 000000" />
                </Field>
                <Field label="National ID">
                  <input className={inputClass} value={regForm.nationalId}
                    onChange={(e) => setRegForm({ ...regForm, nationalId: e.target.value })} placeholder="Optional" />
                </Field>
              </div>
              <Field label="Type of business *">
                <input className={inputClass} value={regForm.businessType}
                  onChange={(e) => setRegForm({ ...regForm, businessType: e.target.value })} placeholder="e.g. Vegetable seller" />
              </Field>
              <Field label="Choose a username *">
                <input className={inputClass} value={regForm.username}
                  onChange={(e) => setRegForm({ ...regForm, username: e.target.value })} placeholder="aminatak" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Password *">
                  <input type="password" className={inputClass} value={regForm.password}
                    onChange={(e) => setRegForm({ ...regForm, password: e.target.value })} placeholder="••••••••" />
                </Field>
                <Field label="Confirm *">
                  <input type="password" className={inputClass} value={regForm.confirm}
                    onChange={(e) => setRegForm({ ...regForm, confirm: e.target.value })} placeholder="••••••••" />
                </Field>
              </div>
              {error && <p className="text-xs font-medium text-red-500">{error}</p>}
              <button type="submit" disabled={busy} className="w-full py-2.5 rounded-lg text-white font-semibold text-sm flex items-center justify-center gap-1.5 disabled:opacity-60" style={{ backgroundColor: '#1B5E20' }}>
                {busy ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                Create my account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
