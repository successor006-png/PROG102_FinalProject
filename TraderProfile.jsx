import { useState } from 'react';
import Field, { inputClass } from '../ui/Field.jsx';

export default function TraderProfile({ trader, mutate, notify }) {
  const [form, setForm] = useState({ phone: trader.phone, businessType: trader.businessType });

  function save(e) {
    e.preventDefault();
    mutate((d) => ({ ...d, traders: d.traders.map((t) => (t.id === trader.id ? { ...t, ...form } : t)) }));
    notify('Profile updated.');
  }

  return (
    <div className="max-w-sm bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-white" style={{ backgroundColor: '#1B5E20' }}>
          {trader.fullName.slice(0, 1)}
        </div>
        <div>
          <p className="font-semibold text-sm text-gray-900">{trader.fullName}</p>
          <p className="text-xs text-gray-400">Trader since {trader.dateRegistered}</p>
        </div>
      </div>
      <form onSubmit={save} className="space-y-3">
        <Field label="Phone">
          <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </Field>
        <Field label="Business type">
          <input className={inputClass} value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })} />
        </Field>
        <Field label="National ID">
          <input className={inputClass} style={{ color: '#9E9E9E' }} value={trader.nationalId || '—'} disabled />
        </Field>
        <button type="submit" className="w-full py-2.5 rounded-lg text-white font-semibold text-sm" style={{ backgroundColor: '#1B5E20' }}>
          Save changes
        </button>
      </form>
    </div>
  );
}
