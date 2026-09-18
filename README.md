# Go Rocco Marketing Website

> **go-rocco.com** — the marketing site for Go Rocco, the free app for UK dog owners, and for
> **Go Rocco Business**, the free platform for the people who look after their dogs.

_Last refreshed: 18 September 2026._

---

## What the site says (keep this true)

| Fact | Value |
|---|---|
| The app | **Free for dog owners since 9 Sep 2026.** No subscription, no adverts. Alpha Pack is retired. |
| Optional purchases for owners | A lost-pet alert **boost** only (the alert itself is free). Ask Rocco has a daily allowance, not a paywall. |
| Go Rocco Business | Free core (unlimited bookings, clients, invoices, booking page, care records, books, tax-ready pack). **Pro £15/month or £144/year.** No trial. |
| Provider fees | **0% on own clients, forever.** Introduced clients: 15% on first bookings for 90 days / 10 bookings, capped at £50 per client. |
| Getting listed | Optional. Selfie + photo ID + basic DBS (<12 months) + £1m public liability; LA licence for boarding/daycare. Reviewed within 48 hours. |
| Makers (the shop) | Applications open. Product liability insurance certificate required; decision within 5 working days; 15% commission on item prices, not delivery; paid at dispatch. |
| Tax pack wording | "Tax-ready records, not tax advice." **Never** say "files your tax return", "HMRC-recognised" or "MTD-compatible". |
| App Store rating | 4.8 (checked 18 Sep 2026). Don't claim "Top 100". |
| Contact address | `support@go-rocco.com` (the app's support page uses it). `partners@go-rocco.com` for venues. |
| Platforms | iOS, Android (since 17 Apr 2026), web at app.go-rocco.com, Apple Watch. |

Product facts come from the main repo (`GoRoccoV5`): `provider-portal/`, `services/business-service`,
`services/store-service`, and the App Store listing script `scripts/update-app-store-listing.py`.

---

## Structure

```
Website/
├── index.html              # Home (uses index.css)
├── providers.html          # For Providers: Go Rocco Business, makers, venues, ethos
├── pricing.html            # Free for owners; Business Free/Pro; fees
├── about.html · roadmap.html · blog.html · careers.html · press.html
├── cookies.html · data-policy.html
├── thank-you.html          # Newsletter double opt-in landing
├── beta.html               # meta-refresh stub → index.html#download
├── 404.html
├── blog/*.html             # 19 posts (share one inline <style>)
├── styles.css              # Every page except index
├── index.css               # Home only
├── attribution.js          # Adds Apple ct= campaign token to App Store links
├── assets/                 # logo, store badges, screenshots, videos/ (films)
├── sitemap.xml · feed.xml · robots.txt · manifest.json
├── .well-known/security.txt
├── workers/gorocco-subscribe/   # Cloudflare Worker: newsletter (D1 + Resend)
└── docs/DEPLOYMENT.md
```

**There is no build step and no include system.** Header, nav, footer, cookie banner and the
consent script are copied into every file. A nav change is a change to every HTML file;
`docs/DEPLOYMENT.md` has the one-liner that does it safely.

### Pages you will NOT find here

`/privacy`, `/terms`, `/support`, `/delete-account`, `/child-safety`, `/join`, `/go`, `/download`,
`/claim/*`, `/walks/*`, `/p/*`, `/shelves/*` and `/.well-known/*` are served by the
**`gorocco-legal` Cloudflare Worker** in `GoRoccoV5/public-legal/` (`npx wrangler deploy`
from there). The Worker holds a `go-rocco.com/*` catch-all and passes everything else through
to this site. Do not add `privacy.html` or `terms.html` back here; they would be unreachable.

`/films/` is a password-protected preview of the twelve explainer films. It lives **only on the
host** (`public_html/films/`, with its own `.htaccess`/`.htpasswd`), not in this repo. Two of the
films are published on `providers.html` from `assets/videos/`.

---

## Hosting & deployment

| Service | Purpose |
|---|---|
| **Hostinger** | Static files in `public_html/` (domain `go-rocco.com`, LiteSpeed) |
| **Cloudflare** | DNS, CDN, SSL (Full Strict), and the two Workers |
| **GitHub** | `Nino6689/go-rocco-website`, branch `main` |

Deploying is a file copy. See `docs/DEPLOYMENT.md` for the three ways to do it and the one
rule that matters: **never wipe the docroot** (that would delete `/films/`).

---

## Local development

```bash
code gorocco.code-workspace      # Live Server on :5500, or:
python3 -m http.server 5500      # from this directory
```

Before committing: `grep -rn "Alpha Pack\|£2.99\|gorocco\.com" --include=*.html .` should
only hit the two historical blog notes.

---

## Design system

| Variable | Hex | Usage |
|---|---|---|
| `--rocco-blue` | `#7BCBEB` | Primary brand |
| `--rocco-blue-light` | `#A8DCF3` | Hover states |
| `--rocco-blue-dark` | `#5BB8E0` | CTAs, links |
| `--safe-green` | `#4CAF50` | Friendly / "own client" |
| `--warning-amber` | `#FF9800` | Cautious / reactive |
| `--rocco-coral` `--rocco-purple` `--rocco-red` `--rocco-amber` | see `index.css:1-17` | Section labels |
| `--cream` | `#FDF8F3` | Light bands |

Fonts: Nunito (headings) and Quicksand (body), loaded from Google Fonts in every `<head>`.
Breakpoints: 1024px (tablet), 768px (mobile). Icons are emoji; no icon library, no JS framework.

---

## Analytics & tracking

| Service | ID | Load |
|---|---|---|
| Google Analytics 4 | `G-XF5KB7S3WL` | Consent Mode v2, default denied |
| Microsoft Clarity | `vd24wvz3m1` | After consent only |
| Cloudflare Web Analytics | `644d34331b7b4af0beacf23a746bb948` | After consent only |
| Apple Smart App Banner | app id `6753819069` | `index.html` only |

Consent is stored in `localStorage` (`gorocco_cookie_consent`, 12-month expiry). `providers.html`
sends `provider_signup_click` and `film_play` events.

---

## Newsletter worker

`workers/gorocco-subscribe/` → `https://subscribe.go-rocco.com` (`POST /api/subscribe`,
`GET /confirm`, `GET /admin/stats`, `GET /admin/export`). Deploy with `npm run deploy` in that
directory. The form is on `blog.html`; `thank-you.html` is the confirmation landing.

---

## Support

- Website: https://go-rocco.com
- Email: support@go-rocco.com
- Security: security@go-rocco.com (see `.well-known/security.txt`)

_Made with 🐾 in the UK_
