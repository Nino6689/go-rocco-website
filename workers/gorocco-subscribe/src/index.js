/**
 * Go Rocco Early Adopter Subscription Worker
 *
 * Endpoints:
 * - POST /api/subscribe    - Submit email for waitlist (double opt-in)
 * - GET  /confirm?token=x  - Confirm email subscription
 * - GET  /admin/export     - Download confirmed subscribers as CSV (Basic Auth)
 */

// Allowed origins for CORS
const allowedOrigins = [
  'https://go-rocco.com',
  'https://www.go-rocco.com',
  'http://localhost:8080',
  'http://localhost:5500',
  'http://127.0.0.1:8080',
  'http://127.0.0.1:5500',
]

// Get CORS headers based on request origin
function getCorsHeaders(request) {
  const origin = request.headers.get('Origin')
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : 'https://go-rocco.com'

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

// Handle CORS preflight
function handleOptions(request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(request) })
}

// Generate a secure random token
function generateToken() {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

// Check Basic Auth for admin endpoints
function checkBasicAuth(request, env) {
  const auth = request.headers.get('Authorization')
  if (!auth || !auth.startsWith('Basic ')) {
    return false
  }

  const base64 = auth.substring(6)
  const decoded = atob(base64)
  const [username, password] = decoded.split(':')

  return username === env.ADMIN_USERNAME && password === env.ADMIN_PASSWORD
}

// Request Basic Auth
function requestAuth() {
  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Go Rocco Admin"',
      'Content-Type': 'text/plain',
    },
  })
}

// Send confirmation email via Resend
async function sendConfirmationEmail(env, email, dogName, confirmToken) {
  // Use custom domain for email link matching (improves deliverability)
  const workerUrl = env.WORKER_URL || 'https://subscribe.go-rocco.com'
  const confirmUrl = `${workerUrl}/confirm?token=${confirmToken}`

  // Personalised greeting
  const greeting = dogName ? `You and ${dogName} are nearly in the pack! 🐾` : `You're nearly in the pack! 🐾`

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirm your Go Rocco signup</title>
  <!--[if mso]>
  <style type="text/css">
    table, td {border-collapse: collapse;}
    .button-link {padding: 16px 40px !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FDF8F3; -webkit-font-smoothing: antialiased;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #FDF8F3;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <img src="https://go-rocco.com/assets/gorocco-logo.png" alt="Go Rocco" style="max-width: 150px; height: auto;" width="150">
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <h1 style="color: #111827; font-size: 24px; font-weight: 800; margin: 0 0 16px; text-align: center;">
                ${greeting}
              </h1>
              <p style="color: #4B5563; font-size: 16px; line-height: 1.7; margin: 0 0 24px; text-align: center;">
                One quick tap to confirm your spot as an early adopter. You'll be among the first to try Go Rocco when we launch — and help shape the app that makes walks safer for everyone.
              </p>
            </td>
          </tr>
          
          <!-- CTA Button - iOS compatible -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td style="background: linear-gradient(135deg, #7BCBEB 0%, #5BB8E0 100%); background-color: #7BCBEB; border-radius: 50px; text-align: center;">
                    <a href="${confirmUrl}" style="display: inline-block; padding: 16px 40px; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                      Confirm My Spot 🐾
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Fallback link for email clients that block buttons -->
          <tr>
            <td style="padding: 0 40px 20px; text-align: center;">
              <p style="color: #9CA3AF; font-size: 12px; margin: 0;">
                Button not working? Copy this link:<br>
                <a href="${confirmUrl}" style="color: #7BCBEB; word-break: break-all;">${confirmUrl}</a>
              </p>
            </td>
          </tr>
          
          <!-- What's Next -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #F3F4F6; border-radius: 16px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="color: #111827; font-weight: 700; margin: 0 0 12px; font-size: 14px;">What happens next?</p>
                    <p style="color: #4B5563; font-size: 14px; line-height: 1.7; margin: 0;">
                      • We'll keep you updated on our launch progress<br>
                      • You'll get early access when we launch in 2026<br>
                      • Founding member badge on your profile — forever
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 40px; text-align: center; border-top: 1px solid #E5E7EB;">
              <p style="color: #9CA3AF; font-size: 12px; line-height: 1.6; margin: 0;">
                You're receiving this because you signed up at go-rocco.com.<br>
                If this wasn't you, just ignore this email — no action needed.
              </p>
              <p style="color: #9CA3AF; font-size: 12px; margin: 16px 0 0;">
                <a href="https://go-rocco.com/privacy.html" style="color: #7BCBEB; text-decoration: none;">Privacy Policy</a>
              </p>
              <p style="color: #9CA3AF; font-size: 12px; margin: 16px 0 0;">
                Made with 🐾 in the UK
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `

  const textContent = `
${greeting}

One quick tap to confirm your spot as an early adopter.

Confirm your email: ${confirmUrl}

What happens next?
- We'll keep you updated on our launch progress
- You'll get early access when we launch in 2026
- Founding member badge on your profile — forever

---
You're receiving this because you signed up at go-rocco.com.
If this wasn't you, just ignore this email.

Privacy Policy: https://go-rocco.com/privacy.html
Made with 🐾 in the UK
  `

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${env.FROM_NAME} <${env.FROM_EMAIL}>`,
      to: [email],
      subject: dogName ? `${dogName}'s pack invite is waiting 🐾` : 'One tap to join the pack 🐾',
      html: htmlContent,
      text: textContent,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('Resend API error:', error)
    throw new Error('Failed to send confirmation email')
  }

  return response.json()
}

// POST /api/subscribe - Handle new subscription
async function handleSubscribe(request, env) {
  try {
    const body = await request.json()
    const { email, dogName, consent, source, honeypot } = body

    // Honeypot check - if filled, it's a bot
    if (honeypot) {
      // Return success to not reveal the honeypot
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...getCorsHeaders(request), 'Content-Type': 'application/json' },
      })
    }

    // Validate required fields
    if (!email || !consent) {
      return new Response(
        JSON.stringify({
          error: 'Email and consent are required',
        }),
        {
          status: 400,
          headers: { ...getCorsHeaders(request), 'Content-Type': 'application/json' },
        }
      )
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({
          error: 'Please enter a valid email address',
        }),
        {
          status: 400,
          headers: { ...getCorsHeaders(request), 'Content-Type': 'application/json' },
        }
      )
    }

    // Sanitize inputs
    const cleanEmail = email.toLowerCase().trim()
    const cleanDogName = dogName ? dogName.trim().substring(0, 50) : null
    const subscriptionSource = source === 'beta' ? 'beta' : 'website'

    // Generate confirmation token
    const confirmToken = generateToken()

    // Get client IP for audit trail
    const ipAddress = request.headers.get('CF-Connecting-IP') || 'unknown'

    // Consent text that was agreed to
    const consentText =
      'I agree to receive email updates about Go Rocco, including launch news and product updates. I can unsubscribe at any time.'

    // Check if email already exists
    const existing = await env.DB.prepare('SELECT id, status FROM subscribers WHERE email = ?').bind(cleanEmail).first()

    if (existing) {
      if (existing.status === 'confirmed') {
        return new Response(
          JSON.stringify({
            error:
              'This email is already on our list! Check your inbox (or the spam folder where our emails like to hide 🙈) for updates.',
          }),
          {
            status: 409,
            headers: { ...getCorsHeaders(request), 'Content-Type': 'application/json' },
          }
        )
      } else {
        // Re-send confirmation for pending subscribers
        await env.DB.prepare('UPDATE subscribers SET confirm_token = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
          .bind(confirmToken, existing.id)
          .run()

        await sendConfirmationEmail(env, cleanEmail, cleanDogName, confirmToken)

        return new Response(
          JSON.stringify({
            success: true,
            message:
              "We've sent another confirmation email. Check your inbox — and if it's not there, our email might be having a nap in your spam folder 😴",
          }),
          {
            status: 200,
            headers: { ...getCorsHeaders(request), 'Content-Type': 'application/json' },
          }
        )
      }
    }

    // Insert new subscriber
    await env.DB.prepare(
      `
      INSERT INTO subscribers (email, dog_name, confirm_token, consent_timestamp, consent_text, ip_address, source)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?)
    `
    )
      .bind(cleanEmail, cleanDogName, confirmToken, consentText, ipAddress, subscriptionSource)
      .run()

    // Send confirmation email
    await sendConfirmationEmail(env, cleanEmail, cleanDogName, confirmToken)

    return new Response(
      JSON.stringify({
        success: true,
        message:
          'Woof! Check your inbox for a confirmation email. Not there? It might be playing hide & seek in your spam folder 🐕',
      }),
      {
        status: 200,
        headers: { ...getCorsHeaders(request), 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Subscribe error:', error)
    return new Response(
      JSON.stringify({
        error: 'Something went wrong. Please try again.',
      }),
      {
        status: 500,
        headers: { ...getCorsHeaders(request), 'Content-Type': 'application/json' },
      }
    )
  }
}

// GET /confirm?token=x - Confirm subscription
async function handleConfirm(request, env) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')
  const siteUrl = env.SITE_URL // https://go-rocco.com

  if (!token) {
    return Response.redirect(`${siteUrl}/thank-you.html?status=invalid`, 302)
  }

  try {
    // Find subscriber by token
    const subscriber = await env.DB.prepare('SELECT id, email, status FROM subscribers WHERE confirm_token = ?')
      .bind(token)
      .first()

    if (!subscriber) {
      return Response.redirect(`${siteUrl}/thank-you.html?status=invalid`, 302)
    }

    if (subscriber.status === 'confirmed') {
      return Response.redirect(`${siteUrl}/thank-you.html?status=already`, 302)
    }

    // Update status to confirmed
    await env.DB.prepare(
      `
      UPDATE subscribers 
      SET status = 'confirmed', confirmed_at = CURRENT_TIMESTAMP, confirm_token = NULL, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    )
      .bind(subscriber.id)
      .run()

    return Response.redirect(`${siteUrl}/thank-you.html?status=success`, 302)
  } catch (error) {
    console.error('Confirm error:', error)
    return Response.redirect(`${siteUrl}/thank-you.html?status=error`, 302)
  }
}

// GET /admin/export - Export confirmed subscribers as CSV (protected)
async function handleExport(request, env) {
  // Check Basic Auth
  if (!checkBasicAuth(request, env)) {
    return requestAuth()
  }

  try {
    const { results } = await env.DB.prepare(
      `
      SELECT email, dog_name, source, consent_timestamp, confirmed_at 
      FROM subscribers 
      WHERE status = 'confirmed' 
      ORDER BY confirmed_at DESC
    `
    ).all()

    // Build CSV
    const headers = ['Email', 'Dog Name', 'Source', 'Consent Date', 'Confirmed Date']
    const csvRows = [headers.join(',')]

    for (const row of results) {
      csvRows.push(
        [
          `"${row.email}"`,
          `"${row.dog_name || ''}"`,
          `"${row.source}"`,
          `"${row.consent_timestamp}"`,
          `"${row.confirmed_at}"`,
        ].join(',')
      )
    }

    const csv = csvRows.join('\n')
    const filename = `gorocco-subscribers-${new Date().toISOString().split('T')[0]}.csv`

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Export error:', error)
    return new Response('Export failed', { status: 500 })
  }
}

// GET /admin/stats - Get subscriber stats (protected)
async function handleStats(request, env) {
  if (!checkBasicAuth(request, env)) {
    return requestAuth()
  }

  try {
    const pending = await env.DB.prepare('SELECT COUNT(*) as count FROM subscribers WHERE status = ?')
      .bind('pending')
      .first()

    const confirmed = await env.DB.prepare('SELECT COUNT(*) as count FROM subscribers WHERE status = ?')
      .bind('confirmed')
      .first()

    const today = await env.DB.prepare(
      `
      SELECT COUNT(*) as count FROM subscribers 
      WHERE confirmed_at >= date('now')
    `
    ).first()

    return new Response(
      JSON.stringify({
        pending: pending?.count || 0,
        confirmed: confirmed?.count || 0,
        confirmedToday: today?.count || 0,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Stats error:', error)
    return new Response('Stats failed', { status: 500 })
  }
}

// Main request handler
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const { pathname } = url
    const method = request.method

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return handleOptions(request)
    }

    // Route requests
    if (pathname === '/api/subscribe' && method === 'POST') {
      return handleSubscribe(request, env)
    }

    if (pathname === '/confirm' && method === 'GET') {
      return handleConfirm(request, env)
    }

    if (pathname === '/admin/export' && method === 'GET') {
      return handleExport(request, env)
    }

    if (pathname === '/admin/stats' && method === 'GET') {
      return handleStats(request, env)
    }

    // Health check
    if (pathname === '/health') {
      return new Response('OK', { status: 200 })
    }

    // 404 for unknown routes
    return new Response('Not Found', { status: 404 })
  },
}
