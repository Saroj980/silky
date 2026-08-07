import { BadgeCheck, Boxes, Factory, Store, Truck } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const items = [
  { icon: BadgeCheck, label: '1963 Established' },
  { icon: Store, label: 'Dubai Showroom' },
  { icon: Truck, label: 'GCC Delivery' },
  { icon: Factory, label: 'Custom Manufacturing' },
  { icon: Boxes, label: 'Bulk Orders' },
]

export function TrustStrip() {
  return (
    <section aria-label="Company credentials" className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ul className="grid grid-cols-2 divide-y divide-primary-foreground/12 sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
          {items.map((item, i) => (
            <Reveal
              as="li"
              key={item.label}
              delay={i * 80}
              className="flex items-center gap-3 py-6 lg:justify-center lg:border-l lg:border-primary-foreground/12 lg:first:border-l-0"
            >
              <item.icon className="size-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-[11px] font-medium uppercase tracking-caps text-primary-foreground/85">
                {item.label}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
