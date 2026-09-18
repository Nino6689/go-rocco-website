# Deployment Guide — Hostinger + Cloudflare

_Last updated: 18 September 2026._

## How a request reaches this site

```
browser → Cloudflare (DNS, CDN, SSL) → gorocco-legal Worker (catch-all go-rocco.com/*)
        → matched route?  yes → Worker answers (privacy, terms, support, /join, /go, /download,
                                  /claim/*, /walks/*, /p/*, /shelves/*, /.well-known/*, …)
                            no  → passes through to Hostinger public_html/ (this repo)
```

The Worker lives in the main repo at `GoRoccoV5/public-legal/` (`worker.js`, `wrangler.toml`).
`wrangler.toml` is not the truth about which routes are live; check the zone:
`GET https://api.cloudflare.com/client/v4/zones/8a0e6d66c95887d42485d075793d914c/workers/routes`.

Consequences for this repo:

- `privacy.html` and `terms.html` were removed on 18 Sep 2026: the Worker serves those URLs and
  the copies here were unreachable. Footer links point at `/privacy` and `/terms`.
- `.well-known/security.txt` here is also shadowed by the Worker.

## What is on the host but NOT in git

`public_html/films/` — twelve explainer films (~50 MB), posters, `index.html`, and a Basic Auth
gate (`.htaccess` + `.htpasswd`). Built from `GoRoccoV5/films/`. **A whole-docroot deploy or a
"deploy from archive" deletes it.** Deploy changed files only, or include `films/` in the archive.

## Hostinger

- hPanel: https://hpanel.hostinger.com — domain `go-rocco.com`, user `u629312178`,
  docroot `/home/u629312178/domains/go-rocco.com/public_html`.
- FTP: `ftp.go-rocco.com`, port 21, user and password in hPanel → Files → FTP Accounts.

### Deploy method 1 — File Manager (safe, manual)

1. hPanel → Files → File Manager → `public_html/`
2. Drag in the changed files, keeping the folder structure. Overwrite when asked.
3. Purge Cloudflare cache (Caching → Configuration → Purge Everything) and hard-refresh.

### Deploy method 2 — FTP mirror of changed files (safe, scriptable)

```bash
# from the repo root; never pass --delete
lftp -u "$FTP_USER","$FTP_PASS" ftp.go-rocco.com -e "
  set ftp:ssl-force true; set ssl:verify-certificate no;
  mirror -R --only-newer --exclude-glob .git* --exclude-glob node_modules/ \
         --exclude-glob .playwright-mcp/ --exclude-glob .venv/ --exclude-glob .wrangler/ \
         --exclude-glob docs/ --exclude-glob workers/ --exclude-glob films/ \
         . /public_html; quit"
```

### Deploy method 3 — Hostinger "deploy static site from archive" (DANGEROUS)

The Hostinger API / MCP tool `hosting_deployStaticWebsite` extracts an archive over the docroot
and **removes what is not in the archive**. Only use it with an archive that contains everything
that should exist afterwards, including `films/` and its `.htaccess`/`.htpasswd`.

## After deploying

- [ ] `curl -s https://go-rocco.com/providers.html | grep -c "Go Rocco Business"` → non-zero
- [ ] `curl -s https://go-rocco.com/pricing.html | grep -c "Alpha Pack"` → `0`
- [ ] `https://go-rocco.com/films/` still asks for a password
- [ ] `https://go-rocco.com/privacy` shows "Last Updated: 15 September 2026" (Worker, unchanged)
- [ ] Purge Cloudflare cache; hard refresh (Cmd+Shift+R); check on a phone
- [ ] Re-submit `sitemap.xml` in Search Console if pages were added

## Cloudflare settings (unchanged)

SSL Full (Strict) · Always Use HTTPS · Brotli · Auto Minify · browser cache TTL 1 month.
Zone id `8a0e6d66c95887d42485d075793d914c`.

## Editing the shared chrome

Every HTML file carries its own copy of the nav, footer and consent script. To change a nav
link everywhere, edit with a scripted replace over `*.html blog/*.html` (see
`refresh.py` in the 18 Sep 2026 commit message for the pattern), then eyeball `index.html`,
which has its own nav markup and `index.css`.

## Troubleshooting

- **Changes not appearing** → purge Cloudflare, hard refresh, check you uploaded to
  `public_html/` (not a subfolder), file permissions 644/755.
- **A page 404s but the file is there** → the Worker owns that path; check its routes.
- **A page shows old legal text** → it is the Worker's; edit `public-legal/worker.js` and
  `npx wrangler deploy` from `GoRoccoV5/public-legal/`.
- **Site offline** → Hostinger status, Cloudflare DNS, try with the proxy off (grey cloud).
