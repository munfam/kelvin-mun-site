---
layout: ../../layouts/Note.astro
title: "Free tiers that actually stay free"
description: "A working shortlist of free cloud services that do not expire, pause or surprise you with a bill."
date: "2026-11-18"
tags: ["cloud", "cost"]
---

The easy part of building on free tiers is signing up. The hard part is noticing
which of them quietly stop being free — not with an invoice, but with a
suspension notice, a paused database, or a bandwidth bill you did not budget for.

After a few years of moving projects between providers, I keep coming back to
the same shortlist. Everything on it satisfies two conditions: it is free
indefinitely rather than as a trial, and the thing that costs money is
predictable and visible in advance.

## What stays free

**Static hosting.** Cloudflare Pages and GitHub Pages both serve static files
with no bandwidth charge worth worrying about. For a site that is mostly
writing, this is the whole hosting layer, and it stays at zero.

**Serverless functions.** Cloudflare Workers gives a generous daily request
allowance on the free plan. It is enough for a contact form, a webhook receiver,
or a small JSON API. Cold starts are not a problem here, which is the main
reason I prefer it to the container-based free tiers.

**Object storage.** The trap with object storage is not storage, it is egress.
Cloudflare R2 does not charge for reads, which makes it materially different
from the S3-style pricing that punishes a popular page.

**Postgres.** Supabase's free tier is a real Postgres instance with auth and
storage attached. It is excellent, and it comes with one caveat that has bitten
me twice: a project with no traffic for about a week gets paused. Fine for
something you use daily, awkward for a demo you show twice a year.

## What only looks free

- **Container hosts.** Free instances sleep after inactivity. Wake-up latency
  makes a blog feel broken and makes webhooks unreliable.
- **Managed databases with row or connection caps.** You will hit the
  connection limit long before the storage limit.
- **Anything with per-seat pricing**, including "free for small teams" plans
  whose definition of small quietly changes.

## A rule that has worked

Put the irreducible part of the site on the static layer, and add a paid
dependency only when a specific feature demands it. A personal site with notes,
an about page and a contact form needs exactly zero server-side state. Every
service I have added ahead of that need has eventually become the thing I had
to migrate.
