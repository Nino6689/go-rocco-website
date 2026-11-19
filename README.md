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
| Provider fees | **0% on own clients, forever.** Introduced clients: 15% on first bookings for 90 days / 10 bookings, capped at £50 per client; 12% after 100 completed bookings, 10% after 500 (`platformFees.ts` `TIERS`). |
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
├── blog/*.html             # 19 posts (styled from styles.css)
├── styles.css              # Every page except index
├── index.css               # Home only
├── attribution.js          # Adds Apple ct= campaign token to App Store links
├── assets/                 # logo, store badges, screenshots, videos/ (films, brand/ hero footage)
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

_Restyled November 2026 (branch `redesign/grown-up-2026-11`). Tokens are defined once in the
`:root` of `styles.css` and again in `index.css`; keep the two in step._

| Variable | Hex | Usage |
|---|---|---|
| `--ink` | `#101828` | Text, primary buttons |
| `--ink-deep` | `#0B1220` | Dark sections, footer, hero fallback |
| `--ink-soft` | `#475467` | Secondary text |
| `--paper` | `#FAF8F5` | Page background |
| `--surface` | `#FFFFFF` | Cards, alternate bands |
| `--line` | `#E7E2DA` | 1px borders and rules |
| `--amber` / `--amber-ink` | `#F38F47` / `#B4541A` | Accent on dark / amber text on light (AA) |
| `--blue` / `--blue-ink` | `#7BCBEB` / `#0E6B8C` | Heritage blue, **accent only** (logo tile, thin rule, focus ring) / links on light |
| `--green` `--red` | `#1F7A4D` `#B42318` | Success and error only |

Fonts: Inter Tight 600/700 (headings, -0.02em, sentence case) and Inter 400/500/600 (body), loaded
from Google Fonts in every `<head>`. Radii 10-14px; pills only for small chips. Primary button is ink
with white text (white with ink text on dark sections); secondary is a 1px outline.
Breakpoints: 1024px, 900px (nav collapses), 768px (mobile). No emoji as decoration, no icon
library, no JS framework: ticks and crosses are drawn in CSS. The blue must never be a section
background or a button fill.

Hero footage lives in `assets/videos/brand/` (home: `owner-woodland`, providers: `walker-sunrise`,
plus the `go-rocco-business-film`). It is decorative, muted and `aria-hidden`; visitors with
`prefers-reduced-motion` get the poster still. Blog posts no longer carry an inline `<style>`:
their rules are in `styles.css` under "Blog posts".

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

_Made in the UK_
