# LinkPulse — Frontend

React + Vite + Tailwind frontend for LinkPulse, a URL shortener with built-in click analytics.

## Screens

- `/` — Marketing landing page (hero, features, workflow, recent links preview, CTA)
- `/login` — Login / Register (toggle between modes)
- `/app/shorten` — Logged-in home: shorten a link or generate a QR code, recent links list
- `/app/links` — My Links table: search, filter, sort, export, per-row actions
- `/app/analytics/:code` — Per-link analytics: clicks over time, top referrers, top countries, device split
- `/app/integrations` — Where the API base URL is documented

## Getting started

```bash
npm install
cp .env.example .env   # then edit VITE_API_BASE_URL
npm run dev
```

## Wiring up your backend

Everything backend-related lives in **`src/config/api.js`**:

- `BASE_URL` — reads `VITE_API_BASE_URL` from your `.env` file.
- `ENDPOINTS` — a map of route paths. Edit these strings to match your real API routes.
- `authApi.login / register / logout / me`
- `linksApi.create / list / get / update / remove / qrCode`
- `analyticsApi.forLink(idOrCode, range)`

Auth token handling defaults to storing a bearer token in `localStorage` (see `tokenStore`) and
also sends `credentials: 'include'`, so cookie/session-based auth works too — just drop the
`Authorization` header logic if you don't need it.

Every page currently seeds itself with demo data from `src/config/mockData.js` and falls back to
it if a request throws, so the UI keeps working even before your backend responds. Once your API
is live, remove the `catch` fallbacks in `ShortenCard.jsx` and `Login.jsx` and load real data in
`Dashboard.jsx`, `MyLinks.jsx`, and `Analytics.jsx` via the `linksApi` / `analyticsApi` functions
(e.g. inside a `useEffect`).

## Design tokens

Colors, radii and shadows are defined in `tailwind.config.js` under `theme.extend` — `navy-*` is
the dark primary palette, `accent` is the teal/green CTA color, and `ink-*` is the neutral text
scale.
