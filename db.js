// Local, persistent "database" for Wi Stall.
// Uses the browser's localStorage so data survives refreshes and restarts,
// with no backend required. Swap loadDB/saveDB for real API calls later
// if this grows into a hosted, multi-device system.

const STORAGE_KEY = 'wistall_db_v1';

export const MARKET_SEED = [
  { id: 'm1', name: 'Big Market', location: 'Wallace Johnson St, Freetown' },
  { id: 'm2', name: 'Lumley Market', location: 'Lumley, Freetown' },
  { id: 'm3', name: 'Congo Market', location: 'Congo Town, Freetown' },
];

export function genId(prefix) {
  return prefix + '_' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
}

function seedStalls() {
  const sections = ['A', 'B', 'C'];
  const stalls = [];
  MARKET_SEED.forEach((m) => {
    sections.forEach((sec, si) => {
      for (let i = 1; i <= 4; i++) {
        stalls.push({
          id: genId('st'),
          marketId: m.id,
          code: `${m.name.split(' ')[0].slice(0, 2).toUpperCase()}-${sec}${i}`,
          section: sec,
          sizeSqm: [4, 6, 9][i % 3],
          monthlyRate: 150000 + si * 20000 + i * 10000,
          status: 'vacant',
        });
      }
    });
  });
  return stalls;
}

export function defaultDB() {
  return {
    markets: MARKET_SEED,
    stalls: seedStalls(),
    traders: [],
    allocations: [],
    users: [
      { id: 'u_admin', username: 'admin', password: 'admin123', role: 'admin', name: 'Market Administrator' },
    ],
  };
}

export function loadDB() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Could not read local storage, starting fresh.', e);
  }
  const fresh = defaultDB();
  saveDB(fresh);
  return fresh;
}

export function saveDB(db) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (e) {
    console.error('Could not save to local storage', e);
  }
}

export function resetDB() {
  const fresh = defaultDB();
  saveDB(fresh);
  return fresh;
}

/* ---- small formatting / date helpers used across the app ---- */

export function money(n) {
  return 'Le ' + Number(n || 0).toLocaleString('en-US');
}

export function addMonths(dateStr, months) {
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + Number(months));
  return d.toISOString().slice(0, 10);
}

export function daysBetween(a, b) {
  return Math.ceil((new Date(a) - new Date(b)) / (1000 * 60 * 60 * 24));
}

export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}
