import { useState } from 'react';
import { Plus } from 'lucide-react';
import Badge from '../ui/Badge.jsx';
import Modal from '../ui/Modal.jsx';
import Field, { inputClass } from '../ui/Field.jsx';
import { genId, money } from '../../lib/db.js';

export default function AdminStalls({ db, mutate, notify }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ marketId: db.markets[0]?.id, section: '', code: '', sizeSqm: 6, monthlyRate: 150000 });

  function addStall(e) {
    e.preventDefault();
    if (!form.code || !form.section) { notify('Fill in section and stall code.', 'error'); return; }
    const stall = { id: genId('st'), status: 'vacant', ...form, sizeSqm: Number(form.sizeSqm), monthlyRate: Number(form.monthlyRate) };
    mutate((d) => ({ ...d, stalls: [...d.stalls, stall] }));
    notify('Stall added.');
    setShowAdd(false);
    setForm({ marketId: db.markets[0]?.id, section: '', code: '', sizeSqm: 6, monthlyRate: 150000 });
  }

  function setMaintenance(stall, toMaintenance) {
    mutate((d) => ({
      ...d,
      stalls: d.stalls.map((s) => (s.id === stall.id ? { ...s, status: toMaintenance ? 'maintenance' : 'vacant' } : s)),
    }));
    notify(toMaintenance ? 'Stall marked for maintenance.' : 'Stall returned to vacant.');
  }

  function removeStall(stall) {
    if (stall.status === 'occupied') { notify('Cannot remove an occupied stall.', 'error'); return; }
    mutate((d) => ({ ...d, stalls: d.stalls.filter((s) => s.id !== stall.id) }));
    notify('Stall removed.');
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white text-sm font-semibold" style={{ backgroundColor: '#1B5E20' }}>
          <Plus size={15} /> Add stall
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-gray-200 bg-gray-50">
              {['Code', 'Market', 'Section', 'Size', 'Rate / month', 'Status', ''].map((h) => (
                <th key={h} className="px-4 py-2.5 font-semibold text-xs text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {db.stalls.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-2.5 font-semibold text-gray-900">{s.code}</td>
                <td className="px-4 py-2.5">{db.markets.find((m) => m.id === s.marketId)?.name}</td>
                <td className="px-4 py-2.5">{s.section}</td>
                <td className="px-4 py-2.5">{s.sizeSqm} sqm</td>
                <td className="px-4 py-2.5">{money(s.monthlyRate)}</td>
                <td className="px-4 py-2.5"><Badge tone={s.status}>{s.status}</Badge></td>
                <td className="px-4 py-2.5 text-right whitespace-nowrap">
                  {s.status !== 'occupied' && (
                    <button onClick={() => setMaintenance(s, s.status !== 'maintenance')} className="text-xs font-semibold mr-3" style={{ color: '#1B5E20' }}>
                      {s.status === 'maintenance' ? 'Reopen' : 'Maintenance'}
                    </button>
                  )}
                  {s.status !== 'occupied' && (
                    <button onClick={() => removeStall(s)} className="text-xs font-semibold text-red-500">Remove</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <Modal title="Add a new stall" onClose={() => setShowAdd(false)}>
          <form onSubmit={addStall} className="space-y-3">
            <Field label="Market">
              <select className={inputClass} value={form.marketId} onChange={(e) => setForm({ ...form, marketId: e.target.value })}>
                {db.markets.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Section"><input className={inputClass} value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} placeholder="A" /></Field>
              <Field label="Stall code"><input className={inputClass} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="BM-A5" /></Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Size (sqm)"><input type="number" className={inputClass} value={form.sizeSqm} onChange={(e) => setForm({ ...form, sizeSqm: e.target.value })} /></Field>
              <Field label="Monthly rate (Le)"><input type="number" className={inputClass} value={form.monthlyRate} onChange={(e) => setForm({ ...form, monthlyRate: e.target.value })} /></Field>
            </div>
            <button type="submit" className="w-full py-2.5 rounded-lg text-white font-semibold text-sm" style={{ backgroundColor: '#1B5E20' }}>Add stall</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
