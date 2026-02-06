# Go Rocco Marketing Website

> **"Know Before You Meet"** — A dog safety app helping owners see nearby dogs' temperaments before they get close.

---

## 🐕 Project Overview

This is the marketing landing page for **Go Rocco**, a mobile app launching in the UK in 2026. The site promotes the app's core features:

- **Real-time dog temperament visibility** — See if nearby dogs are friendly, nervous, reactive, or in training
- **Walk check-in** — Optional safety feature for solo walkers
- **Dog-friendly places** — Discover venues verified by real dog owners
- **Pet Passport** — Digital health records for your dog

---

## 📁 Project Structure

```
Website/
├── index.html              # Main landing page (single-page site)
├── gorocco-app-icon.png    # App icon / favicon
├── assets/
│   ├── gorocco-logo.png    # Logo image
│   ├── Download_on_the_App_Store_Badge_*.svg  # iOS App Store badges
│   └── GetItOnGooglePlay_Badge_*.svg          # Google Play badge
├── .vscode/                # VS Code configuration
│   ├── settings.json       # Editor settings
│   └── extensions.json     # Recommended extensions
├── gorocco.code-workspace  # VS Code workspace file
└── .github/
    └── copilot-instructions.md  # AI assistant context
```

---

## 🚀 Getting Started

### 1. Open the Workspace

```bash
# Open VS Code with the workspace
code gorocco.code-workspace
```

### 2. Install Recommended Extensions

When prompted, install the recommended extensions or run:

- `Cmd+Shift+P` → "Extensions: Show Recommended Extensions"

### 3. Start Local Development

- Right-click `index.html` → **Open with Live Server**
- Or use `Cmd+Shift+P` → "Live Server: Open with Live Server"

---

## 🎨 Design System

### Brand Colors (CSS Variables)

| Variable             | Hex       | Usage                    |
| -------------------- | --------- | ------------------------ |
| `--rocco-blue`       | `#7BCBEB` | Primary brand color      |
| `--rocco-blue-light` | `#A8DCF3` | Hover states, highlights |
| `--rocco-blue-dark`  | `#5BB8E0` | CTA buttons, links       |
| `--safe-green`       | `#4CAF50` | Friendly status, safety  |
| `--warning-amber`    | `#FF9800` | Nervous/reactive status  |
| `--cream`            | `#FDF8F3` | Light backgrounds        |

### Typography

- **Headings**: Nunito (Google Fonts) — weights 400–900
- **Body**: Quicksand (Google Fonts) — weights 400–700

### Key Sections

1. **Hero** — Rotating slides showcasing main features
2. **Problem** — The challenge of unexpected dog encounters
3. **Solution** — Temperament visibility system (Green/Amber/Blue/Purple)
4. **How It Works** — 3-step onboarding
5. **Features** — Full feature grid
6. **Safety** — Responsible ownership messaging
7. **CTA/Download** — App store badges

---

## 🌐 Hosting & DNS

### Hostinger

- **Host**: Hostinger (hPanel)
- **Type**: Static HTML hosting
- **Deployment**: Upload via File Manager or FTP

### Cloudflare DNS

- **DNS Provider**: Cloudflare
- **Features**: CDN, SSL, DDoS protection
- **Records**: Point A/CNAME records to Hostinger IP

### Deployment Steps

1. **Hostinger hPanel** → File Manager → `public_html/`
2. Upload all files (index.html, assets/, gorocco-app-icon.png)
3. In **Cloudflare**, ensure DNS records point to Hostinger
4. Enable "Full (Strict)" SSL mode in Cloudflare

---

## 🔧 Development Workflow

### Making Changes

1. Edit files locally with Live Server running
2. Test responsive design (mobile breakpoints at 768px and 1024px)
3. Validate accessibility (skip links, ARIA labels, focus states)
4. Deploy to Hostinger

### CSS is Inline

All styles are in `<style>` tags within `index.html`. For larger changes, consider extracting to a separate `styles.css`.

---

## 📱 Responsive Breakpoints

| Breakpoint   | Devices |
| ------------ | ------- |
| > 1024px     | Desktop |
| 768px–1024px | Tablet  |
| < 768px      | Mobile  |

---

## ✅ Pre-Deployment Checklist

- [ ] Test all navigation links
- [ ] Verify hero slider works on mobile
- [ ] Check App Store/Play Store badge links (update when live)
- [ ] Test scroll animations with reduced motion
- [ ] Validate meta tags for SEO
- [ ] Confirm favicon displays correctly
- [ ] Test across browsers (Chrome, Safari, Firefox)

---

## 📞 Support

For questions about Go Rocco, visit the main app or contact the team through the footer social links.

---

_Made with 🐾 in the UK_
