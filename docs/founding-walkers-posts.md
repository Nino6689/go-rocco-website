# Founding Walkers — social posts (autumn 2026)

Page: https://go-rocco.com/walkers.html · Join: email support@go-rocco.com

## Facebook (dog-walker / pet-business groups)

Dog walkers — would you test something for us, for free Pro for a year?

We've built an app that runs a walker's day from your phone. See today's walks in order, tap Start, walk, tap Finish. The owner watches the route on a map and gets the update ("Biscuit walked 2.4 km in 52 minutes, 2 toilet breaks, 3 photos") without you typing a thing. The invoice goes with it, with a pay link. Regulars go in once ("Mon/Wed/Fri at 11") and four weeks land in your diary. Group walks share one GPS track and every owner still gets their own update.

It's early, and we want it to be right, so we're looking for around 20 UK dog walkers to run their real business on it for a couple of months and tell us what's wrong.

What you get:
• Go Rocco Business Pro free for 12 months (then the core stays free forever, no card, no contract)
• 0% on your own clients, always
• Your clients get the free Go Rocco app: live walk map, notifications, the report card
• A WhatsApp group straight to the people building it
• A 15-minute set-up call so you're not typing in your client list alone

What we need from you:
• Use it for your real walks for 8+ weeks
• Bring 3 or more of your own clients onto it (we help with the words)
• A 30-minute video call once a month with the other founding walkers
• Honest feedback. "This bit's confusing" is a complete bug report.

Everything's explained here, no sign-up needed to read it: https://go-rocco.com/walkers.html

To join, email support@go-rocco.com with your name, business, area and roughly how many dogs a day, or comment "walker" and I'll message you. Places are limited to 20.

(Admins, delete if this isn't allowed here — no hard feelings.)

## Facebook (shorter, for stricter groups)

Any dog walkers fancy testing a free app that runs your day? Start/Finish from your phone, the owner watches the walk on a map, the update and invoice write themselves. Free Pro for a year for ~20 UK walkers who use it for real and give us honest feedback on a monthly call. Details: https://go-rocco.com/walkers.html — or comment "walker" and I'll DM you.

## Instagram caption

Dog walkers: run your day from your phone. Free for a year. 🐾

Tap Start. Walk. Tap Finish. The owner watches the route on a map and gets the update — you don't type a word. The invoice goes with it.

We're looking for ~20 UK dog walkers to run their real business on Go Rocco this autumn and tell us what to fix on a monthly call.

You get: Pro free for 12 months, 0% on your own clients, a direct line to the founders, and your clients get the free app (live walk map, notifications, report cards).

We need: real walks for 8+ weeks, 3+ of your clients on it, 30 minutes a month, and honesty.

Link in bio → go-rocco.com/walkers · or DM "walker" 📩

#dogwalker #dogwalkeruk #dogwalking #dogwalkerlife #petbusiness #petsitter #dogwalkersofinstagram #smallbusinessuk #dogsofinstagram #gorocco

## Instagram story text (3 frames)

1. "Dog walkers: your whole day on your phone. Free for a year." (image)
2. "Tap Start → the owner watches the walk on a map → tap Finish → the update and invoice send themselves."
3. "20 places. Real walks, honest feedback, one call a month. Link → go-rocco.com/walkers"

## Reply template when someone comments "walker"

Hi [name]! Thanks — here's the page with everything on it: https://go-rocco.com/walkers.html. If you're up for it, email support@go-rocco.com (the button on the page fills the email in) or just reply here with your name, business, area and iPhone/Android and I'll get you set up. We do a 15-minute call to bring your clients over, then you're walking on it the same week. Once you have the app, Settings → Tester programme → code WALKERS opens your tester hub.

## Onboarding checklist (ours, per walker)

1. Reply within a day; book the 15-minute set-up call.
2. TestFlight: add their Apple ID to the external group (build 379+); Android: Play internal-test link.
3. Grant Pro: admin `POST /api/v1/admin/business/<businessId>/comp-pro {"days": 365, "reason": "founding walker"}`.
4. Add them to the Founding Walkers WhatsApp group.
5. On the call: create the business from the app (three steps), paste their client list, set up regulars, send the first client link together.
6. Cohort: they enter code WALKERS under Settings → Tester programme (cohort `founding-walkers`, 40 places, recruiting until 31 Mar 2027).
7. Monthly call: first Thursday, 30 minutes, video. Notes → the build list.
