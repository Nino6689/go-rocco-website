# Go Rocco Email Subscription Worker

This Cloudflare Worker handles early adopter email collection with GDPR-compliant double opt-in.

## Features

- ✅ Double opt-in confirmation
- ✅ GDPR consent tracking with timestamp
- ✅ Honeypot spam protection
- ✅ Branded confirmation emails via Resend
- ✅ Basic Auth protected admin CSV export
- ✅ Personalisation with dog's name (optional)

## Setup Instructions

### 1. Prerequisites

- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed
- Cloudflare account with Workers enabled
- [Resend](https://resend.com) account for sending emails

### 2. Install Dependencies

```bash
cd workers/gorocco-subscribe
npm install
```

### 3. Create D1 Database

```bash
# Create the database
npx wrangler d1 create gorocco-subscribers

# Note the database_id from the output and add it to wrangler.toml:
# [[d1_databases]]
# binding = "DB"
# database_name = "gorocco-subscribers"
# database_id = "YOUR_DATABASE_ID"

# Initialize the schema
npx wrangler d1 execute gorocco-subscribers --remote --file=schema.sql
```

### 4. Set Up Resend

1. Sign up at [resend.com](https://resend.com)
2. Add domain: `go-rocco.com`
3. Add the DNS records Resend provides to Cloudflare
4. Generate an API key

### 5. Configure Secrets

```bash
# Resend API key
npx wrangler secret put RESEND_API_KEY

# Admin credentials for CSV export
npx wrangler secret put ADMIN_USERNAME
npx wrangler secret put ADMIN_PASSWORD
```

### 6. Deploy

```bash
npx wrangler deploy
```

### 7. Set Up Routes (Optional)

If you want the Worker on your main domain instead of `*.workers.dev`:

1. Go to Cloudflare Dashboard > Workers > your worker
2. Add routes:
   - `go-rocco.com/api/*`
   - `go-rocco.com/confirm`
   - `go-rocco.com/admin/*`

## API Endpoints

### POST /api/subscribe

Submit an email for the waitlist.

**Request:**

```json
{
  "email": "user@example.com",
  "dogName": "Bella",
  "consent": true,
  "source": "website",
  "honeypot": ""
}
```

**Response:**

```json
{
  "success": true,
  "message": "Check your inbox! We've sent a confirmation email."
}
```

### GET /confirm?token=xxx

Confirms the email subscription. Redirects to `/thank-you.html?status=success|already|invalid|error`.

### GET /admin/export

Downloads confirmed subscribers as CSV. Requires Basic Authentication.

```bash
curl -u username:password https://your-worker.workers.dev/admin/export
```

### GET /admin/stats

Returns subscriber statistics.

```json
{
  "pending": 15,
  "confirmed": 142,
  "confirmedToday": 3
}
```

## Local Development

```bash
# Start local dev server
npx wrangler dev

# Test with local D1
npx wrangler d1 execute gorocco-subscribers --local --file=schema.sql
```

## Troubleshooting

### Emails not sending

- Check Resend API key is correct
- Verify domain DNS records are properly configured
- Check Resend dashboard for delivery logs

### Database errors

- Ensure D1 binding is configured in `wrangler.toml`
- Run schema.sql to initialise tables

### CORS errors

- The Worker only accepts requests from `https://go-rocco.com`
- For local testing, temporarily update `corsHeaders` in the code
