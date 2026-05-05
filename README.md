# SLO Drone Spray — slodronespray.com

Drone ag services website for San Luis Obispo County. React + Express monorepo deployed on Railway.

---

## Current Status (as of May 5, 2026)

| Thing | Status |
|-------|--------|
| Site (Railway) | ✅ Live at `slodronespray.com` |
| Email receiving | ⚠️ Cloudflare Email Routing disabled — MX records deleted to make room for Workspace |
| Google Workspace | 🔄 In progress — account created, DNS verification pending, wizard 502ing |
| Email sending | ⏳ Blocked on Workspace setup |
| Apollo.io campaign | ⏳ Ready to set up once Workspace email is working |

---

## Where We Left Off

### Email / Workspace fight
Trying to get a real `brian@slodronespray.com` inbox via Google Workspace so Apollo.io can send the ag outreach campaign from it. Chain of events:

1. Cloudflare Email Routing was forwarding `brian@slodronespray.com` → `brian.danilo@gmail.com`
2. Workspace couldn't verify the domain because Cloudflare's MX records were locked
3. Deleted the Cloudflare MX records to free up the domain
4. Workspace verification started working but the setup wizard is 502ing
5. Considering Microsoft 365 as alternative (~$6/mo) — search "Microsoft 365 Business Basic"

**To resume:** Either fix Workspace (try admin.google.com) or sign up for Microsoft 365. Once you have a real inbox at `brian@slodronespray.com`, connect it to Apollo and ping me — I'll load the campaign.

### Apollo.io campaign
Ready to go once email is sorted. Plan:
- Use Apollo to find SLO County contacts (vineyards, farms, orchards, ag consultants, crop advisers)
- Draft segmented email copy per audience type
- Load as draft via Apollo API for Brian to review and send

---

## Site Changes Made This Session

- **Services section** — replaced 3 generic services with 9 SLO County-specific ones (vineyards, strawberries, avocados, veg row crops, rangeland, cover crop seeding + 3 catch-alls). Emoji icons per card.
- **Pricing** — merged table + calculator into one card. Two tiers only: $14/acre under 100 acres, $10/acre at 100+. No service type multipliers.
- **Pricing moved** — now sits immediately below hero, above services.
- **Stats band removed** (500+ acres, 2 aircraft, etc.)
- **FarmerPromo images fixed** — all 3 tabs now use real drone data imagery:
  - Crop Health → NIR false-color field scan (user-supplied)
  - Irrigation & Planning → RGB vs NDVI side-by-side (user-supplied)
  - Water Stress Detection → thermal stress scan (user-supplied)
- **Free Survey page (/free-survey)** — removed Gallery component, made deliverables section interactive (click each deliverable → image appears beside it)
- **Services section subtitle** updated to reflect SLO County focus

---

## Pending To-Dos

- [ ] Fix Google Workspace or set up Microsoft 365 for `brian@slodronespray.com`
- [ ] Re-add Cloudflare email forwarding OR switch to Workspace/M365 MX records
- [ ] Connect email to Apollo.io
- [ ] Run Apollo contact search for SLO County ag contacts
- [ ] Load and review outreach email campaign in Apollo

---

## Stack

```
drone/
├── client/          React + Vite (frontend)
├── server/          Express + Node (backend, serves built client in prod)
├── railway.toml     Railway deploy config
└── package.json     npm workspaces root
```

- **Frontend:** React 18, Vite 5, vanilla CSS
- **Backend:** Express, Resend (email), no database
- **Deploy:** Railway (single service — server builds and serves client)
- **DNS/CDN:** Cloudflare
- **Email:** Resend (transactional/form submissions) — inbox TBD (Workspace or M365)

---

## Local Development

Requires Node 20. Your shell defaults to Node 16, so use nvm:

```bash
nvm use 20
```

Start everything:

```bash
# Terminal 1 — server
cd /Users/briandanilo/drone/server
node src/index.js

# Terminal 2 — client (Vite dev server)
cd /Users/briandanilo/drone/client
/Users/briandanilo/.nvm/versions/node/v20.20.2/bin/node \
  /Users/briandanilo/drone/node_modules/.bin/vite
```

Or from repo root with Node 20 active:
```bash
npm run dev
```

Site runs at: http://localhost:5173  
API runs at: http://localhost:3001  
Vite proxies `/api` → `3001` automatically.

---

## Deployment

**Platform:** Railway  
**Service:** `drone-ag-server` in project `drones`  
**Public URL:** `https://drone-ag-server-production.up.railway.app`  
**Custom domain:** `slodronespray.com` (Cloudflare CNAME → Railway URL)

### Deploy process
Push to `main` → Railway auto-deploys.

```bash
git add .
git commit -m "your message"
git push origin main
```

### Railway environment variables
Set in Railway → Variables tab:
- `RESEND_API_KEY` — Resend API key (see Resend dashboard)
- `NODE_ENV` — `production`
- `PORT` — `3001`

---

## Services & Accounts

| Service | Purpose | Login |
|---------|---------|-------|
| Railway | Hosting | github.com/briandanilo |
| Cloudflare | DNS | brian.danilo@gmail.com |
| Resend | Transactional email (form submissions) | brian.danilo@gmail.com |
| GitHub | Source control | github.com/briandanilo — repo: `drone-ag` |
| Apollo.io | Email outreach campaign | TBD |
| Google Workspace | Business inbox (in progress) | brian@slodronespray.com |

---

## Key Files

| File | What it does |
|------|-------------|
| `client/src/App.jsx` | Page layout / component order |
| `client/src/components/Hero.jsx` | Hero section |
| `client/src/components/FarmerPromo.jsx` | Free survey promo tabs with drone imagery |
| `client/src/components/Services.jsx` | 9-service grid (SLO County focused) |
| `client/src/components/Pricing.jsx` | Pricing section wrapper |
| `client/src/components/QuoteCalculator.jsx` | Interactive cost estimator |
| `client/src/components/Contact.jsx` | Contact form → Resend email |
| `client/src/lib/useContent.js` | Content defaults + API merge logic |
| `client/src/pages/PromoLanding.jsx` | /free-survey landing page |
| `client/src/index.css` | All styles |
| `server/src/data/content.json` | Live content (overrides defaults — edit this, not useContent.js) |
| `server/src/routes/quotes.js` | Form submission → Resend email |
| `client/public/gallery/` | Drone imagery (crop-health.jpg, irrigation-planning.jpg, water-stress.png) |

---

## Cloudflare DNS Records (current — MX deleted for Workspace)

| Type | Name | Target | Proxy |
|------|------|--------|-------|
| CNAME | `@` | `drone-ag-server-production.up.railway.app` | ON |
| CNAME | `www` | `drone-ag-server-production.up.railway.app` | ON |
| TXT | `@` | Google site verification token | — |

**Note:** MX records were deleted. Once Workspace or M365 is set up, add their MX records here. Email forwarding is currently broken until then.
