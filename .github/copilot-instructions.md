# Go Rocco Marketing Site — AI Assistant Instructions

## Project Context

You are working on the **Go Rocco marketing website** — a landing page for a dog safety mobile app launching in the UK in 2026. The app helps dog owners see nearby dogs' temperaments before encountering them.

---

## Project Summary

**Product**: Go Rocco — "Know Before You Meet"
**Type**: Static HTML marketing site
**Target**: UK dog owners
**Launch**: 2026

### Core Value Proposition

- See if nearby dogs are friendly, nervous, reactive, or in training
- Walk check-in feature for solo walker safety
- Discover dog-friendly venues
- Digital pet passport for health records

---

## Tech Stack

| Technology  | Details                                           |
| ----------- | ------------------------------------------------- |
| **HTML**    | Single `index.html` with inline CSS and JS        |
| **CSS**     | CSS custom properties, Flexbox, Grid, animations  |
| **Fonts**   | Google Fonts: Nunito (headings), Quicksand (body) |
| **Icons**   | Emoji-based (no icon library)                     |
| **Hosting** | Hostinger (static files)                          |
| **DNS/CDN** | Cloudflare                                        |

---

## Brand Guidelines

### Colors (use CSS variables)

```css
--rocco-blue: #7BCBEB       /* Primary brand */
--rocco-blue-dark: #5BB8E0  /* CTAs, links */
--safe-green: #4CAF50       /* Friendly dogs */
--warning-amber: #FF9800    /* Nervous/reactive dogs */
--gray-900: #111827         /* Dark text */
--cream: #FDF8F3            /* Light backgrounds */
```

### Tone of Voice

- **Friendly** and approachable — talk like a fellow dog owner
- **Reassuring** — safety without fear-mongering
- **Inclusive** — all dogs welcome, no judgment for reactive/nervous dogs
- Use 🐾 🐕 emojis sparingly for warmth

### Key Phrases

- "Know before you meet"
- "Safer walks start here"
- "Made for dog people, by dog people"
- "No judgment — nervous dogs aren't bad dogs"

---

## File Structure

```
Website/
├── index.html              # All content (styles + scripts inline)
├── gorocco-app-icon.png    # Favicon and OG image
├── assets/
│   ├── gorocco-logo.png    # Header/footer logo
│   └── *.svg               # App store badges
```

---

## Important Patterns

### CSS Architecture

- All styles are inline in `<style>` tags
- Uses CSS custom properties (`:root` variables)
- Responsive breakpoints: 1024px (tablet), 768px (mobile)
- Supports `prefers-reduced-motion` for accessibility

### JavaScript Features

- Hero slider with dot navigation
- Scroll-triggered reveal animations
- Sticky nav with blur effect
- Smooth scroll (respects reduced motion)

### Accessibility

- Skip link to main content
- ARIA labels on interactive elements
- Focus-visible outlines
- aria-hidden for inactive slides

---

## Common Tasks

### Add a New Section

1. Create a `<section>` with a unique ID
2. Add `.reveal` class for scroll animation
3. Use existing CSS patterns (`.section-header`, grids)
4. Add navigation link if needed

### Update App Store Links

Replace `href="#"` in the CTA section with actual store URLs:

```html
<a href="https://apps.apple.com/app/gorocco/..." class="store-badge-link">
  <a href="https://play.google.com/store/apps/..." class="store-badge-link"></a
></a>
```

### Add a New Feature Card

```html
<div class="feature-card">
  <div class="feature-icon">🆕</div>
  <h3>Feature Name</h3>
  <p>Feature description here.</p>
</div>
```

---

## Deployment

### Hostinger

1. Access hPanel → File Manager
2. Navigate to `public_html/`
3. Upload all files maintaining structure
4. Clear Cloudflare cache if needed

### Cloudflare

- DNS records point to Hostinger IP
- SSL: Full (Strict) mode
- Cache: Enabled with appropriate TTL

---

## Do's and Don'ts

### ✅ Do

- Maintain the warm, friendly tone
- Keep accessibility features intact
- Test on mobile after changes
- Use existing CSS variables for colors
- Preserve the reduced-motion support

### ❌ Don't

- Add heavy JavaScript frameworks (keep it vanilla)
- Remove ARIA labels or skip links
- Use colors outside the brand palette
- Break the responsive breakpoints
- Add external dependencies without consideration

---

## Questions to Ask Before Changes

1. Does this change work on mobile (< 768px)?
2. Does it respect reduced-motion preferences?
3. Does it match the brand voice and colors?
4. Is it accessible (keyboard navigable, screen-reader friendly)?
5. Will it affect page load performance?

---

## Useful Commands

```bash
# Start local server (VS Code Live Server)
# Right-click index.html → Open with Live Server

# Validate HTML
npx html-validate index.html

# Check for broken links
npx broken-link-checker http://localhost:5500
```

---

_This file helps AI assistants understand the project context. Update it when making significant architectural changes._
