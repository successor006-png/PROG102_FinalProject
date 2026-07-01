export default function Toast({ msg, tone }) {
  if (!msg) return null;
  return (
    <div
      className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white"
      style={{ backgroundColor: tone === 'error' ? '#F44336' : '#1B5E20' }}
    >
      {msg}
    </div>
  );
}
