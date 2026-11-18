# Go Rocco Marketing Site — AI Assistant Instructions

_Updated 18 September 2026. The earlier version of this file described a single-page pre-launch
site with an Alpha Pack subscription; none of that is true any more._

## What this is

The static marketing site for **go-rocco.com**. Two audiences, two products:

1. **Dog owners** — the Go Rocco app (iOS, Android, web at app.go-rocco.com, Apple Watch).
   **Free since 9 September 2026: no subscription, no adverts.** The only optional purchase is a
   lost-pet alert boost.
2. **Dog businesses** — **Go Rocco Business** at provider.go-rocco.com (booking pages at
   book.go-rocco.com): free calendar, client book, booking page, invoices with a pay link, care
   records, books and a tax-ready pack. **Pro is £15/month or £144/year.** 0% commission on a
   provider's own clients, forever; 15% on a client Go Rocco introduces, for 90 days or 10 bookings,
   capped at £50. Independent makers sell in the shop at 15% commission on item prices.

Launched March 2026 (iOS) and April 2026 (Android). Do not write "launching".

## Hard rules on copy

- Never mention Alpha Pack, Premium, "Pro" for owners, £2.99, free trials or "ad-free" as
  current features. The two dated blog posts carry an "Update, September 2026" note; leave it.
- Tax: say "tax-ready records, not tax advice". **Never** "files your tax return",
  "HMRC-recognised", "MTD-compatible" or "submits to HMRC".
- Provider review is "within 48 hours"; maker review is "within 5 working days". Don't mix them.
- Rating: 4.8 on the App Store (18 Sep 2026). No "Top 100".
- Contact: `support@go-rocco.com`. The old `info@gorocco.com` was a typo'd domain.
- The partner rewards programme is not public yet; describe it only as "coming".

## Structure

Static HTML, no build step, no framework, no include system. Every page carries its own nav,
footer, cookie banner and consent script. `index.html` uses `index.css`; every other page and
all `blog/*.html` use `styles.css` plus a small inline `<style>`.

Key pages: `index.html`, `providers.html` (Business, makers, venues, ethos, FAQ),
`pricing.html`, `about.html`, `roadmap.html`, `blog.html` + `blog/`, `press.html`, `careers.html`,
`cookies.html`, `data-policy.html`, `thank-you.html`, `404.html`.

**Not here:** `/privacy`, `/terms`, `/support`, `/delete-account`, `/join`, `/go`, `/download`,
`/claim/*` and other deep links are served by the `gorocco-legal` Cloudflare Worker in
`GoRoccoV5/public-legal/`. Link to `/privacy` and `/terms`, never to `privacy.html`.

Nav (all pages): Features · For Providers · Pricing · Our Story · Blog, plus a CTA.

## Brand

```css
--ink: #101828        /* Text, primary buttons */
--ink-deep: #0B1220   /* Dark sections, footer */
--paper: #FAF8F5      /* Page background */
--line: #E7E2DA       /* Borders */
--amber: #F38F47      /* Accent on dark; --amber-ink #B4541A on light */
--blue: #7BCBEB       /* Heritage blue: small accent only, never a section or button fill */
```

Fonts: Inter Tight (headings), Inter (body) via Google Fonts. No emoji as decoration. Breakpoints 1024/900/768. Tokens and rules: README "Design system".

### Tone

Plain, confident, adult British English. Lead with what it does. Talk to a provider like
someone who has run a small business. Reassuring without fear-mongering. Inclusive: nervous dogs
aren't bad dogs. No exclamation marks, no "furry friend" or "pawsome", no emoji as decoration,
sentence-case headings. No em-dashes in copy (use a hyphen with spaces, as the site does).

Key lines: "Know before you meet" · "Made for dog people, and the people they pay" ·
"Your clients are yours" · "Free is the product" · "Tax-ready, not tax advice".

## Common tasks

- **Change a nav/footer link everywhere:** scripted replace across `*.html blog/*.html`, then
  check `index.html` separately (its nav markup differs).
- **New blog post:** copy `blog/go-rocco-is-now-free.html`, update head/meta/JSON-LD, add a card
  at the top of `blog.html`, an `<item>` to `feed.xml`, a `<url>` to `sitemap.xml`.
- **New page:** copy `pricing.html` for the chrome; add to sitemap and footer.
- **Validate:** `npx html-validate providers.html`; a local server + `curl` for links.

## Do / Don't

- Do keep the skip link, ARIA labels, focus-visible outlines and reduced-motion support.
- Do keep analytics behind consent; the consent script must stay identical on every page.
- Don't add frameworks or external dependencies.
- Don't add `privacy.html` / `terms.html` back.
- Don't deploy by wiping the Hostinger docroot: `public_html/films/` exists only on the host.
