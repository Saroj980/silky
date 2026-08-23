---
name: framer-motion-sections
description: Use when building or animating landing page / marketing sections with Framer Motion — scroll reveals, staggered grids, hero entrances, hover interactions, marquees.
---

# Framer Motion Section Patterns

## Scroll reveal (use for every major section)
\`\`\`tsx
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeUp}
>
\`\`\`

## Staggered grid (cards, feature lists)
\`\`\`tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={container}>
  {items.map(i => <motion.div key={i.id} variants={item}>...</motion.div>)}
</motion.div>
\`\`\`

## Hover lift (cards, buttons)
\`\`\`tsx
<motion.div whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)" }} transition={{ duration: 0.2 }}>
\`\`\`

## Count-up stat
Use a small hook with `useInView` + `useEffect` interval, or the `framer-motion` `useMotionValue` + `animate()` combo — trigger only once `isInView` is true.

## Marquee (client logos)
Duplicate the logo array once, animate `x` from 0 to -50% linearly, `repeat: Infinity`, pause on hover via `whileHover={{ animationPlayState: "paused" }}` or state-driven pause.

## Sticky/parallax accents (use sparingly, 1 per page max)
`useScroll` + `useTransform` on a container ref for a subtle background shift — not on text.

## Anti-patterns to avoid
- Animating opacity only with no movement (feels flat)
- Same fade-up on literally every element (make hero entrance different from card grid stagger)
- Duration > 0.8s for anything not a hero (feels slow)
- Animating on every render instead of `viewport={{ once: true }}`