# Deployment Guide — Hostinger + Cloudflare

## Overview

The Go Rocco marketing site is hosted on **Hostinger** with **Cloudflare** managing DNS and CDN.

---

## Hostinger Setup

### Access

1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com)
2. Select your hosting plan
3. Navigate to **File Manager** or **FTP Accounts**

### File Structure on Server

```
public_html/
├── index.html
├── gorocco-app-icon.png
└── assets/
    ├── gorocco-logo.png
    ├── Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg
    ├── Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg
    └── GetItOnGooglePlay_Badge_Web_color_English.svg
```

### Deployment Methods

#### Option 1: File Manager (Recommended for small updates)

1. hPanel → **Files** → **File Manager**
2. Navigate to `public_html/`
3. Upload files directly (drag & drop)
4. Overwrite existing files when prompted

#### Option 2: FTP Client

1. hPanel → **Files** → **FTP Accounts**
2. Create or use existing FTP account
3. Connect with FileZilla or Cyberduck:
   - **Host**: Your domain or Hostinger FTP hostname
   - **Port**: 21
   - **Protocol**: FTP or FTPS
4. Upload to `public_html/`

#### Option 3: Git (Advanced)

1. hPanel → **Advanced** → **Git**
2. Set up repository and auto-deploy

---

## Cloudflare Configuration

### DNS Records

Set these in your Cloudflare dashboard:

| Type  | Name | Content        | Proxy      |
| ----- | ---- | -------------- | ---------- |
| A     | @    | Hostinger IP   | ✅ Proxied |
| A     | www  | Hostinger IP   | ✅ Proxied |
| CNAME | www  | yourdomain.com | ✅ Proxied |

> Get your Hostinger IP from hPanel → **Hosting** → **Plan Details**

### SSL/TLS Settings

1. **Cloudflare Dashboard** → **SSL/TLS**
2. Set encryption mode to **Full (Strict)**
3. Enable **Always Use HTTPS**
4. Enable **Automatic HTTPS Rewrites**

### Performance Settings

1. **Speed** → **Optimization**
   - Enable Auto Minify (HTML, CSS, JS)
   - Enable Brotli compression
2. **Caching** → **Configuration**
   - Browser Cache TTL: 1 month
   - Enable "Always Online"

### Page Rules (Optional)

Create a rule for caching static assets:

- **URL**: `yourdomain.com/assets/*`
- **Cache Level**: Cache Everything
- **Edge Cache TTL**: 1 month

---

## Deployment Checklist

### Before Deploying

- [ ] Test locally with Live Server
- [ ] Check all links work
- [ ] Verify images load correctly
- [ ] Test responsive design
- [ ] Validate HTML (no errors)

### After Deploying

- [ ] Hard refresh the live site (Cmd+Shift+R)
- [ ] Purge Cloudflare cache if changes don't appear
- [ ] Test on mobile device
- [ ] Check SSL certificate is active
- [ ] Verify meta tags appear correctly (share on social)

### Purge Cloudflare Cache

1. Cloudflare Dashboard → **Caching** → **Configuration**
2. Click **Purge Everything** (or specific URLs)
3. Wait 30 seconds, then test

---

## Troubleshooting

### Changes not appearing?

1. Hard refresh: `Cmd+Shift+R`
2. Purge Cloudflare cache
3. Check you uploaded to correct folder (`public_html/`)
4. Verify file permissions (should be 644 for files, 755 for folders)

### SSL certificate errors?

1. Ensure Cloudflare SSL mode is "Full (Strict)"
2. Check Hostinger has SSL enabled (hPanel → SSL)
3. Wait up to 24 hours for propagation

### Site offline?

1. Check Hostinger server status
2. Verify DNS records in Cloudflare
3. Test with Cloudflare proxy disabled (grey cloud)

---

## Contact

- **Hostinger Support**: hPanel → Help → Live Chat
- **Cloudflare Support**: Dashboard → Support

---

_Last updated: January 2026_
