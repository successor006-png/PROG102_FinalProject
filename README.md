# Wi Stall — Market Stall Allocation System

A working software system for allocating market stalls to traders, built for
the PROG102 Principles of Software Engineering final project (Limkokwing
University, Sierra Leone). Aligned with UN SDG 8 — Decent Work and Economic
Growth.

## What it does

- **Trader registration & login** — traders create their own account (name,
  phone, business type, national ID).
- **Admin login** — manage the whole system (default: `admin` / `admin123`).
- **Browse & apply for stalls** — traders see only vacant stalls, filtered by
  market, and apply. A trader with an active stall or a pending application
  cannot apply again, enforcing fairness.
- **Application review** — admin approves (choosing start date and duration,
  which auto-calculates the expiry date) or rejects with a visible reason.
- **Allocation tracking** — active allocations show days remaining; admin can
  end an allocation to free the stall.
- **Stall management** — admin adds/removes stalls and puts them into
  maintenance.
- **Live reporting dashboard** — occupancy rate per market, trader counts,
  pending applications, and a color-coded visual floor plan of every market.

## Tech stack

- React 18 + Vite
- Tailwind CSS for styling
- lucide-react for icons
- Browser `localStorage` as the data store (no backend needed to run/demo it)

## Running it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Building for deployment

```bash
npm run build
```

This outputs a static site to `dist/` that can be hosted anywhere (Netlify,
Vercel, GitHub Pages, or a simple static file host).

## Project structure

```
wi-stall/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx              # Top-level routing between admin/trader views
    ├── index.css            # Tailwind + global styles
    ├── lib/
    │   └── db.js             # localStorage data layer, seed data, helpers
    └── components/
        ├── AuthScreen.jsx    # Login / trader registration
        ├── Shell.jsx         # Header + tab navigation
        ├── StallMap.jsx      # Visual floor plan
        ├── ui/                # Badge, Modal, Toast, StatCard, Field
        ├── admin/             # Overview, Traders, Stalls, Applications, Allocations
        └── trader/            # Browse, Applications, Allocation, Profile
```

## Data model

The system currently ships with 3 seeded markets (Big Market, Lumley Market,
Congo Market) and 12 stalls each. All data — markets, stalls, traders,
allocations, and user accounts — lives in `localStorage` under the key
`wistall_db_v1`, so it persists across page reloads on the same browser/device.

To reset all data, open the browser console and run:
```js
localStorage.removeItem('wistall_db_v1')
```
then refresh the page.

## Known limitations (documented for the report)

- Passwords are stored in plain text in this prototype — a production version
  would need hashing (e.g. bcrypt) and a real backend/database.
- Data is local to one browser only; it is not shared across devices. A
  production deployment would move `src/lib/db.js` to call a real API backed
  by a database (e.g. PostgreSQL) instead of `localStorage`.
- No payment tracking is included in this version by design.
