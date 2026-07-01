import { X } from 'lucide-react';

export default function Modal({ title, onClose, children, wide }) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
    >
      <div className={`bg-white rounded-2xl shadow-xl w-full ${wide ? 'max-w-lg' : 'max-w-sm'} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="font-display font-bold text-base text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100">
            <X size={18} color="#616161" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
