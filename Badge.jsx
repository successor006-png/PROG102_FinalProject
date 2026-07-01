const TONES = {
  default: { bg: '#EEEEEE', color: '#616161' },
  vacant: { bg: '#E8F5E9', color: '#1B5E20' },
  occupied: { bg: '#FFEBEE', color: '#F44336' },
  maintenance: { bg: '#FFF8E1', color: '#8D6E00' },
  pending: { bg: '#FFF8E1', color: '#8D6E00' },
  active: { bg: '#E8F5E9', color: '#1B5E20' },
  rejected: { bg: '#FFEBEE', color: '#F44336' },
  expired: { bg: '#EEEEEE', color: '#616161' },
  terminated: { bg: '#EEEEEE', color: '#616161' },
};

export default function Badge({ children, tone = 'default' }) {
  const t = TONES[tone] || TONES.default;
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
      style={{ backgroundColor: t.bg, color: t.color }}
    >
      {children}
    </span>
  );
}
