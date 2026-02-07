# Go Rocco Marketing Website

> **"Know Before You Meet"** — A dog safety app helping owners see nearby dogs' temperaments before they get close.

---

## Project Overview

This is the marketing landing page for **Go Rocco**, a mobile app launching in the UK in 2026. The site promotes the app's core features:

- **Real-time dog temperament visibility** — See if nearby dogs are friendly, nervous, reactive, or in training
- **Walk check-in** — Optional safety feature for solo walkers
- **Dog-friendly places** — Discover venues verified by real dog owners
- **Pet Passport** — Digital health records for your dog

---

## Project Structure

```
Website/
├── index.html              # Main landing page
├── about.html              # About Go Rocco
├── pricing.html            # Pricing plans
├── roadmap.html            # Product roadmap
├── blog.html               # Blog/news
├── careers.html            # Job listings
├── press.html              # Press kit
├── beta.html               # Beta signup
├── thank-you.html          # Post-signup confirmation
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── cookies.html            # Cookie policy
├── data-policy.html        # Data protection policy
├── sitemap.xml             # XML sitemap for search engines
├── robots.txt              # Crawler instructions
├── .well-known/
│   └── security.txt        # Security contact info
├── assets/
│   ├── gorocco-logo.png    # Logo image
│   ├── *.svg               # App store badges
│   └── ...                 # Other images
├── styles.css              # Shared styles
├── workers/                # Cloudflare Workers
└── upload/                 # Staging/temp files (blocked from crawlers)
```

---

## Hosting & Deployment

### Infrastructure

| Service | Purpose |
|---------|---------|
| **Hostinger** | Web hosting (LiteSpeed) |
| **Cloudflare** | DNS, CDN, SSL, DDoS protection |
| **GitHub** | Version control |
| **Cloudflare Workers** | Serverless functions (subscribe API) |

### Quick Deployment (via GitHub)

```bash
# 1. Make your changes locally
# 2. Commit changes
git add .
git commit -m "Your commit message"

# 3. Push to GitHub
git push origin main

# 4. Deploy to Hostinger (manual sync required)
# Option A: Use Hostinger Git integration (if configured)
# Option B: Upload via FTP/File Manager
```

### Manual Deployment to Hostinger

1. **Login to Hostinger hPanel**: https://hpanel.hostinger.com
2. **Go to**: Files → File Manager → `public_html/`
3. **Upload** all changed files (maintain folder structure)
4. **Clear Cloudflare cache** (optional but recommended):
   - Cloudflare Dashboard → Caching → Purge Everything

### FTP Details (if needed)

| Setting | Value |
|---------|-------|
| Host | ftp.go-rocco.com |
| Port | 21 |
| Username | (see Hostinger hPanel) |
| Directory | /public_html/ |

### Cloudflare Settings

| Setting | Value |
|---------|-------|
| SSL Mode | Full (Strict) |
| Always HTTPS | On |
| Auto Minify | HTML, CSS, JS |
| Brotli | On |

---

## Development Workflow

### Local Development

```bash
# 1. Open VS Code workspace
code gorocco.code-workspace

# 2. Start Live Server
# Right-click index.html → "Open with Live Server"
# Or: Cmd+Shift+P → "Live Server: Open with Live Server"

# 3. Make changes and test
# Live Server auto-refreshes on save
```

### Testing Checklist

- [ ] Test all navigation links
- [ ] Verify responsive design (mobile, tablet, desktop)
- [ ] Check hero slider on mobile
- [ ] Test cookie consent banner
- [ ] Verify analytics only load after consent
- [ ] Test form submissions
- [ ] Check across browsers (Chrome, Safari, Firefox)

---

## Design System

### Brand Colors

| Variable | Hex | Usage |
|----------|-----|-------|
| `--rocco-blue` | `#7BCBEB` | Primary brand color |
| `--rocco-blue-light` | `#A8DCF3` | Hover states |
| `--rocco-blue-dark` | `#5BB8E0` | CTA buttons |
| `--safe-green` | `#4CAF50` | Friendly status |
| `--warning-amber` | `#FF9800` | Reactive status |
| `--cream` | `#FDF8F3` | Light backgrounds |

### Typography

- **Headings**: Nunito (Google Fonts)
- **Body**: Quicksand (Google Fonts)

### Responsive Breakpoints

| Breakpoint | Devices |
|------------|---------|
| > 1024px | Desktop |
| 768px–1024px | Tablet |
| < 768px | Mobile |

---

## Analytics & Tracking

### Configured Services

| Service | ID | Status |
|---------|-----|--------|
| Google Analytics 4 | `G-XF5KB7S3WL` | Active (consent-gated) |
| Microsoft Clarity | `vd24wvz3m1` | Active (consent-gated) |
| Cloudflare Analytics | `644d34331b7b4af0beacf23a746bb948` | Active |

### GDPR Compliance

- Cookie consent banner on all pages
- Analytics only load after user consent
- 12-month consent expiry (UK GDPR requirement)
- Users can manage preferences on cookies.html

---

## Cloudflare Workers

### Subscribe Worker

- **URL**: https://subscribe.go-rocco.com
- **Endpoints**:
  - `POST /api/subscribe` — New signup
  - `GET /api/count` — Get confirmed subscriber count
  - `GET /confirm?token=xxx` — Email confirmation
  - `GET /admin/stats` — Admin stats (auth required)
  - `GET /admin/export` — Export CSV (auth required)

---

## SEO

### Configured

- [x] XML Sitemap (`sitemap.xml`)
- [x] robots.txt
- [x] security.txt
- [x] Meta descriptions on all pages
- [x] Open Graph tags
- [x] Canonical URLs

### Google Search Console

Submit sitemap at: https://search.google.com/search-console

---

## Useful Commands

```bash
# Check git status
git status

# View recent commits
git log --oneline -5

# Discard local changes
git checkout -- filename.html

# Pull latest from GitHub
git pull origin main
```

---

## Support

For questions about Go Rocco:
- Website: https://go-rocco.com
- Email: hello@go-rocco.com
- Security: security@go-rocco.com

---

_Made with paw in the UK_
