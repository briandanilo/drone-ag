# SLO Drone Spray — slodronespray.com

Drone ag services website for San Luis Obispo County. React + Express monorepo deployed on Railway.

---

## Current Status

| Thing | Status |
|-------|--------|
| Site (Railway) | ✅ Live at `drone-ag-server-production.up.railway.app` |
| Domain | ⏳ DNS propagating — `slodronespray.com` should resolve within ~30 min of last session |
| Email receiving | ✅ `brian@slodronespray.com` forwards to `brian.danilo@gmail.com` via Cloudflare Email Routing |
| Email sending | ⏳ Gmail Send As pending — verification email hasn't landed yet (MX records just propagated) |
| Resend domain | ✅ `slodronespray.com` verified in Resend |

---

## Pending To-Dos

- [ ] Confirm `slodronespray.com` loads in browser
- [ ] Complete Gmail Send As verification for `brian@slodronespray.com`
  - Gmail → Settings → Accounts and Import → Send mail as → Send verification
  - SMTP: `smtp.resend.com`, Port: `587`, Username: `resend`, Password: Resend API key
- [ ] Add `www` CNAME record in Cloudflare DNS (same target as `@`)
- [ ] Add custom domain in Railway (Settings → Networking → Custom Domain → `slodronespray.com`)
- [ ] Update placeholder phone/email in `Nav.jsx` (currently updated to real values)

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
- **Email:** Resend (sending) + Cloudflare Email Routing (receiving)

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

### Server `.env` (local only, not committed)
```
RESEND_API_KEY=your_key_here
```

---

## Services & Accounts

| Service | Purpose | Login |
|---------|---------|-------|
| Railway | Hosting | github.com/briandanilo |
| Cloudflare | DNS + Email Routing | brian.danilo@gmail.com |
| Resend | Transactional email | brian.danilo@gmail.com |
| GitHub | Source control | github.com/briandanilo — repo: `drone-ag` |

---

## Key Files

| File | What it does |
|------|-------------|
| `client/src/App.jsx` | Page layout / component order |
| `client/src/components/Hero.jsx` | Hero section (promo takeover) |
| `client/src/components/FarmerPromo.jsx` | Free survey promo section |
| `client/src/components/Gallery.jsx` | Image gallery with lightbox |
| `client/src/components/Contact.jsx` | Contact form → Resend email |
| `client/src/components/PromoBar.jsx` | Top announcement bar |
| `client/src/components/Nav.jsx` | Navigation |
| `client/src/index.css` | All styles |
| `server/src/index.js` | Express app entry |
| `server/src/routes/quotes.js` | Form submission → Resend email |
| `client/public/gallery/` | Gallery images (converted from GeoTIFF) |
| `railway.toml` | Railway build/start/healthcheck config |

---

## Email Setup

### Receiving (`brian@slodronespray.com` → Gmail)
Cloudflare Email Routing: `slodronespray.com` → Email → Email Routing  
Route: `brian@slodronespray.com` → `brian.danilo@gmail.com`

### Sending (reply as `brian@slodronespray.com` from Gmail)
Gmail → Settings → Accounts and Import → Send mail as  
SMTP server: `smtp.resend.com` | Port: `587` | Username: `resend` | Password: Resend API key  
Status: pending verification email

### Form submissions
When a farmer submits the contact form, Resend emails `brian@slodronespray.com` with lead details.  
The email has a "Reply to [Name] →" button — just hit reply to respond from your Gmail.

---

## Cloudflare DNS Records

| Type | Name | Target | Proxy |
|------|------|--------|-------|
| CNAME | `@` | `drone-ag-server-production.up.railway.app` | ON |
| CNAME | `www` | `drone-ag-server-production.up.railway.app` | ON |
| MX | (auto) | Cloudflare Email Routing records | — |
| TXT/CNAME | (auto) | Resend DKIM/SPF records | — |
