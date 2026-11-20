---
layout: ../../layouts/Note.astro
title: "A Kubernetes lab that costs nothing"
description: "What actually runs locally, and which managed pieces are worth paying for once."
date: "2026-10-29"
tags: ["kubernetes", "local"]
---

I keep two clusters. One is at work and has an on-call rota. The other lives on
my laptop, gets destroyed roughly once a month, and costs nothing at all.

The second one is where nearly all of my infrastructure ideas get tested first,
because the feedback loop is seconds instead of minutes and because breaking it
has no consequences.

## What runs locally

OrbStack gives me a lightweight Docker and Kubernetes runtime on macOS without
the memory tax of a full VM. On top of that I keep a small cluster that is
close enough to EKS to be useful: the same manifests, the same ingress
annotations, the same resource limits.

The differences that matter are worth writing down, because they catch me
every time:

- Storage classes. `local-path` locally, `gp2` or similar in EKS. A PVC that
  works in one will hang in the other if the class is hardcoded.
- Load balancers. Locally, a service is reachable at a local port. In EKS it
  becomes an ELB with a DNS name that takes minutes to appear.
- Image pulls. Locally, an image is already in the runtime. In EKS, a private
  registry needs an image pull secret, and the failure mode is a very quiet
  `ErrImagePull`.
- Secrets. Locally I get away with a plain manifest. In EKS that is exactly the
  thing not to do.

## Where paying is the cheaper choice

Two things I stopped trying to do for free:

**The control plane.** A self-managed control plane is free in licence terms
and expensive in attention. If the goal is to learn workloads rather than to
learn etcd recovery, a managed control plane earns its money.

**DNS and certificates.** Free options exist, but the failure mode is a
certificate that expires on a Saturday. Automating it properly is a small,
one-time piece of work that removes a recurring worry.

Everything else — the manifests, the Helm charts, the CI that lints them — is
free and should stay that way, because it is the part that teaches you
something.
