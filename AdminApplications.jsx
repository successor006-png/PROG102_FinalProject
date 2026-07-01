import { useState } from 'react';
import { ClipboardCheck, CheckCircle2, XCircle } from 'lucide-react';
import Modal from '../ui/Modal.jsx';
import Field, { inputClass } from '../ui/Field.jsx';
import { money, todayStr, addMonths } from '../../lib/db.js';

export default function AdminApplications({ db, mutate, notify }) {
  const [reviewing, setReviewing] = useState(null);
  const [startDate, setStartDate] = useState(todayStr());
  const [duration, setDuration] = useState(1);
  const [rejectReason, setRejectReason] = useState('');
  const [rejecting, setRejecting] = useState(null);

  const pendingList = db.allocations
    .filter((a) => a.status === 'pending')
    .map((a) => ({
      ...a,
      trader: db.traders.find((t) => t.id === a.traderId),
      stall: db.stalls.find((s) => s.id === a.stallId),
    }));

  function approve(a) {
    mutate((d) => ({
      ...d,
      allocations: d.allocations.map((x) =>
        x.id === a.id ? { ...x, status: 'active', decisionDate: todayStr(), startDate, durationMonths: Number(duration) } : x
      ),
      stalls: d.stalls.map((s) => (s.id === a.stallId ? { ...s, status: 'occupied' } : s)),
    }));
    notify(`Stall ${a.stall.code} allocated to ${a.trader.fullName}.`);
    setReviewing(null);
  }

  function reject(a) {
    mutate((d) => ({
      ...d,
      allocations: d.allocations.map((x) =>
        x.id === a.id ? { ...x, status: 'rejected', decisionDate: todayStr(), notes: rejectReason } : x
      ),
    }));
    notify('Application rejected.');
    setRejecting(null);
    setRejectReason('');
  }

  return (
    <div className="space-y-3">
      {pendingList.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <ClipboardCheck size={28} className="mx-auto mb-2" color="#9E9E9E" />
          <p className="text-sm text-gray-400">No applications waiting for review.</p>
        </div>
      )}
      {pendingList.map((a) => (
        <div key={a.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {a.trader?.fullName} <span className="font-normal text-gray-400">wants stall</span> {a.stall?.code}
            </p>
            <p className="text-xs mt-0.5 text-gray-400">
              {db.markets.find((m) => m.id === a.stall?.marketId)?.name} · {money(a.stall?.monthlyRate)}/mo · Applied {a.appliedDate}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => { setReviewing(a); setStartDate(todayStr()); setDuration(1); }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-semibold"
              style={{ backgroundColor: '#1B5E20' }}
            >
              <CheckCircle2 size={13} /> Approve
            </button>
            <button
              onClick={() => setRejecting(a)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-500 text-red-500"
            >
              <XCircle size={13} /> Reject
            </button>
          </div>
        </div>
      ))}

      {reviewing && (
        <Modal title={`Allocate ${reviewing.stall?.code} to ${reviewing.trader?.fullName}`} onClose={() => setReviewing(null)}>
          <div className="space-y-3">
            <Field label="Allocation start date">
              <input type="date" className={inputClass} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </Field>
            <Field label="Duration (months)">
              <select className={inputClass} value={duration} onChange={(e) => setDuration(e.target.value)}>
                {[1, 3, 6, 12].map((n) => <option key={n} value={n}>{n} month{n > 1 ? 's' : ''}</option>)}
              </select>
            </Field>
            <p className="text-xs text-gray-400">Expires on {addMonths(startDate, duration)}</p>
            <button onClick={() => approve(reviewing)} className="w-full py-2.5 rounded-lg text-white font-semibold text-sm" style={{ backgroundColor: '#1B5E20' }}>
              Confirm allocation
            </button>
          </div>
        </Modal>
      )}

      {rejecting && (
        <Modal title={`Reject application from ${rejecting.trader?.fullName}`} onClose={() => setRejecting(null)}>
          <div className="space-y-3">
            <Field label="Reason (shown to the trader)">
              <textarea className={inputClass} rows={3} value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="e.g. Stall already reserved for relocation" />
            </Field>
            <button onClick={() => reject(rejecting)} className="w-full py-2.5 rounded-lg text-white font-semibold text-sm bg-red-500">
              Confirm rejection
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
