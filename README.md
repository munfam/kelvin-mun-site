# munfam

A static personal site and notes archive. Astro builds it to plain HTML;
Cloudflare Pages serves it from the edge for free.

- **Framework**: Astro (static output, no runtime server)
- **Hosting**: Cloudflare Pages — unlimited static requests, free TLS
- **Serverless**: one Pages Function at `/api/health` for anything you later
  need to compute at request time
- **CI/CD**: GitHub Actions — every push to `main` deploys to production, every
  pull request gets its own preview URL

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # serve the built output locally
```

## Adding a note

Create a Markdown file in `src/pages/notes/`:

```md
---
layout: ../../layouts/Note.astro
title: "Title of the note"
description: "One sentence that shows up in the list."
date: "2026-11-20"
tags: ["cloud"]
---

Body text.
```

The notes index picks it up automatically and sorts by date.

## Deploying (one-time setup, about 5 minutes)

1. **The repo is already on GitHub** at
   `github.com/munfam/kelvin-mun-site`. Clone it anywhere with
   `git clone https://github.com/munfam/kelvin-mun-site.git`.

2. **Create the Cloudflare Pages project** (the name must match
   `wrangler.toml` and `.github/workflows/deploy.yml`):

   ```bash
   npx wrangler login
   npx wrangler pages project create munfam --production-branch main
   ```

3. **Create an API token** in the Cloudflare dashboard: *My Profile → API
   Tokens → Create Token → “Edit Cloudflare Workers” template*. Copy the token
   and note your Account ID (shown on the right-hand side of the dashboard, or
   in the token creation screen).

4. **Add both as GitHub repository secrets**: *Settings → Secrets and variables
   → Actions → New repository secret*.

   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

5. **Push to `main`.** The workflow builds and deploys; the run log prints the
   live URL (`https://munfam.pages.dev`).

6. **Custom domain (optional)**: *Cloudflare Pages → your project → Custom
   domains*. Point your domain at Cloudflare and TLS is issued automatically.

## What is free, and what is not

| Thing | Free tier |
|---|---|
| Static requests and bandwidth | Unlimited |
| Builds | 500 per month (this site needs one per push) |
| Pages Functions | 100,000 requests per day |
| Custom domain + TLS | Free, the domain itself is not |

Nothing in this repo bills by usage beyond those caps, and none of the caps
expire. If you later add a database for comments or auth, that is the point
where a subscription enters the picture — see the note on free tiers in
`src/pages/notes/free-tiers-that-stay-free.md`.

## Files worth knowing

```
astro.config.mjs        site URL and build settings
src/layouts/Base.astro  header, nav, footer, metadata
src/styles/global.css   all design tokens and layout
src/pages/              routes (index, about, notes/, each note)
functions/api/health.js request-time endpoint (Pages Functions)
public/_headers         security and cache headers
wrangler.toml           Pages project config
.github/workflows/      the deploy pipeline
```

## Editing the site's identity

- Name, bio and links: `src/pages/index.astro`, `src/pages/about.astro`
- Colours and type scale: `src/styles/global.css` (`:root` block)
- Canonical domain: `site:` in `astro.config.mjs`
