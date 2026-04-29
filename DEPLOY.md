# Deploying lorenasofia.com

The site is a Next.js 15 app. Static parts pre-render; the RSVP API needs
a serverless runtime + persistent storage. This guide walks through the
exact steps for shipping to **Vercel** with **Vercel KV** for the RSVP
list, and pointing **lorenasofia.com** at it via GoDaddy DNS.

---

## 1. Vercel project (one-time setup)

1. Go to https://vercel.com/new and **Import** the GitHub repo
   `JuanJL/lorena-sofia`.
2. Framework: Vercel auto-detects **Next.js**. Leave build/output
   defaults as-is.
3. Click **Deploy**. The first build will succeed and you'll get a URL
   like `https://lorena-sofia-<hash>.vercel.app`. The site loads, but
   the RSVP form will throw 500s because the storage isn't connected
   yet — that's fine, we wire it next.

## 2. RSVP storage — Vercel KV (Marketplace)

1. In the Vercel dashboard, open the project → **Storage** tab.
2. Click **Create** → choose **Marketplace Database** → pick **Upstash
   for Redis** (this is what Vercel rebranded "KV" to). Free tier is
   fine; the workload is tiny.
3. Region: pick the closest to most guests (Frankfurt for EU).
4. Click **Connect to Project** → tick the production environment.
5. Vercel automatically injects four env vars into the project:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

   The code in `src/lib/rsvp-store.ts` checks for `KV_REST_API_URL` +
   `KV_REST_API_TOKEN` to decide between KV and the local JSON file, so
   the production deploy will start writing to KV automatically.

## 3. Admin password env var

By default the admin page accepts `lorena2026`. To set a stronger
password in production:

- Vercel dashboard → project → **Settings** → **Environment Variables**
- Add `ADMIN_PASSWORD` = `<your-password>` (Production scope)
- Redeploy (or just trigger a re-deploy from the **Deployments** tab)

## 4. Trigger a fresh deploy

After adding KV + the admin env var, click **Redeploy** on the latest
deployment in the Vercel dashboard, or push any small commit. Once the
deploy is green:

```
https://lorena-sofia-<hash>.vercel.app
```

You should be able to submit the RSVP form and see it appear in
`/admin` (with the new password).

## 5. Custom domain — point lorenasofia.com at Vercel

### a) In Vercel

1. Project → **Settings** → **Domains**.
2. Add `lorenasofia.com` and `www.lorenasofia.com` (you can do both at
   once — Vercel will redirect www → root by default).
3. Vercel shows two records to add at your DNS provider. They look like:
   - `A` record on `@` → `76.76.21.21`
   - `CNAME` on `www` → `cname.vercel-dns.com`

   (The exact values are shown right there in the UI. Copy them, don't
   trust this README.)

### b) In GoDaddy

1. Sign in to https://dcc.godaddy.com.
2. Find `lorenasofia.com` → click **DNS**.
3. **Save the existing records first** in the `lovable-backup/` folder
   of this repo so you can revert after the party. The relevant ones at
   the time we cut over were:
   - `A @ 15.197.225.128`
   - `A @ 3.33.251.168`
4. Delete those two A records.
5. Add the records Vercel gave you (A @ → Vercel IP, CNAME www →
   `cname.vercel-dns.com`).
6. Wait 1–10 minutes for DNS to propagate. `dig +short lorenasofia.com`
   should return Vercel's IP.

### c) HTTPS

Vercel auto-issues a Let's Encrypt cert as soon as DNS resolves. No
action needed.

## 6. Post-party rollback

After the party, to put the original *Para Ti* site back at
`lorenasofia.com`:

1. Open Lovable → publish or re-deploy the original project.
2. Lovable will give you the DNS records again (likely the same `A`
   records as before).
3. In GoDaddy DNS, swap the Vercel records for the Lovable ones.
4. The Vercel deploy stays alive at the auto-generated `*.vercel.app`
   URL forever — you can keep it as an archive.

---

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # 32 tests, vitest
npm run build        # production build
```

In dev, RSVPs are written to `data/rsvps.json`. That file is committed
empty so the repo works out of the box. It's safe to delete; the API
will recreate it.

## Admin page

`/admin` — password is whatever `ADMIN_PASSWORD` is set to (defaults to
`lorena2026` if the env var is missing).
