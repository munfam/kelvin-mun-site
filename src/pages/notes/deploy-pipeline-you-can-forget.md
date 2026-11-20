---
layout: ../../layouts/Note.astro
title: "A deploy pipeline you can afford to forget"
description: "Push to main, get a preview URL, stop thinking about deployment."
date: "2026-11-11"
tags: ["astro", "cloudflare"]
---

The deploy pipeline I want is the one I never have to open. Push to `main`, a
build runs, a preview URL appears on the pull request, and production catches up
a minute later. No SSH, no server to patch, no certificate to renew.

That is roughly what Astro plus Cloudflare Pages gives you, and the whole
configuration fits in one short workflow file.

## The shape of it

Astro builds to plain HTML. Cloudflare Pages serves that directory from its
edge, which means the only thing the pipeline has to do is run `astro build`
and hand over `dist/`.

```yaml
- run: npm ci
- run: npm run build
- uses: cloudflare/wrangler-action@v3
  with:
    apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
    command: pages deploy dist --project-name=kelvin-site
```

Two secrets, one workflow, and every push produces a deployment. Pull requests
get their own preview URL, which is the part that actually changes how you work:
you review the real page, not a screenshot in a chat window.

## Where the money would come from

Nowhere, for this shape of site. Static builds are free, bandwidth is free
within any reasonable bound, and the build minutes on a public repository are
free too. The first thing that could cost money is a custom domain, and that is
a deliberate purchase rather than a surprise.

## The parts worth doing properly

- Keep the build output directory in one place, and make sure the workflow and
  the hosting configuration agree on it.
- Commit the lockfile. `npm ci` is stricter than `npm install` and will fail
  loudly when the lockfile and the manifest disagree, which is what you want.
- Add a `_headers` file early. Security headers are easier to add on day one
  than to retrofit after something breaks.
- Do not put secrets in the build. Anything compiled into a static page is
  public, no matter how it is named.

That is most of the discipline involved. The rest is writing.
