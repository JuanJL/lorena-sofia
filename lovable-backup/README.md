# lovable-backup

Snapshot of what was reachable at https://lorenasofia.com **before** we
re-pointed the domain at the birthday site (April 29, 2026).

## What's here

- `index.html` — the live HTML at the root. Title: *Para Ti | Lorena Sofia*.
  Description: *For the prettiest girlfriend in the world.*
- `social-image.jpg` — the OG / Twitter share image referenced from
  `storage.googleapis.com` (1.4 MB).

## What's NOT here

The site is a Lovable / GPT-Engineer Vite SPA. The `index.html` referenced
`/assets/index-vi52OrAz.js` and `/assets/index-yNWupdpb.css`, but at the
time of this backup those URLs returned 404 from the live host — i.e. the
hosted production bundle was already out of sync with the HTML shell. So
this folder only contains the static shell, not a working clone of the
app.

## Where the real source lives

The full project source is on **Lovable.dev** (gpt-engineer). The backup
strategy after the party is therefore:

1. Open the Lovable project for *Para Ti | Lorena Sofia*.
2. In Lovable, point the custom domain `lorenasofia.com` back at that
   project (or republish if the deploy was paused).
3. Update the GoDaddy DNS records for `lorenasofia.com` to whatever
   Lovable dictates (likely the same CNAME / A records used originally —
   if you saved them, paste them back; otherwise Lovable's "Add custom
   domain" wizard will tell you).

## DNS at the time of this backup

```
NS:   ns69.domaincontrol.com.
NS:   ns70.domaincontrol.com.   (GoDaddy)
A:    15.197.225.128
A:    3.33.251.168              (AWS Global Accelerator — Lovable host)
```

When the party is over and you're ready to revert, replace those A/CNAME
records with whatever is currently on the new birthday-site Vercel
project's DNS panel — restoring the originals if you have them noted.
