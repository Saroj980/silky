---
trigger: always_on
---

# Design & Animation Standards

## Non-negotiable
- Use Framer Motion (`motion` from "framer-motion") for ALL animation. Never plain CSS @keyframes for entrance/scroll effects — use `whileInView`, `initial`/`animate` variants.
- NEVER produce a "default AI website": no centered hero with generic gradient blob, no Bootstrap-card grid with identical icon+title+text cards, no stock Unsplash-feeling stock layout copied verbatim from a template.
- Every homepage needs at least 3 DISTINCT section layouts (not the same card grid repeated) — e.g. an asymmetric hero, an alternating left/right process, a bento-style feature grid, a marquee, a split comparison layout.
- One consistent type scale and ONE accent color used deliberately — not rainbow gradients.
- Real easing, not default: use `ease: [0.16, 1, 0.3, 1]` (easeOutExpo-ish) or spring transitions, never linear.
- Stagger children in any grid/list reveal (`staggerChildren: 0.08` in a parent variant).
- Respect `prefers-reduced-motion` — wrap animation values behind a check.
- Always use next/image (or equivalent) with explicit width/height to avoid layout shift.

## Before writing code
When asked to build a section or page, first state in 2-3 bullets: what makes THIS layout distinct from a generic template, and which specific Framer Motion technique you'll use where. Then implement.

## Stack defaults
- Next.js App Router + TypeScript + Tailwind CSS + Framer Motion
- Component per section in /components/home/