export default function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold mb-1.5 text-gray-700">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  'w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none transition-shadow';
