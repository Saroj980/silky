import { Building2, GraduationCap, Hotel, Plane, Stethoscope, UtensilsCrossed } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const industries = [
  {
    icon: Hotel,
    title: 'Hospitality',
    copy: 'Front-of-house, housekeeping and F&B wear for five-star hotels and resorts.',
  },
  {
    icon: Stethoscope,
    title: 'Healthcare',
    copy: 'Scrubs, lab coats and patient wear in antimicrobial, easy-care fabrics.',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    copy: 'Complete school programmes from blazers and ties to sportswear.',
  },
  {
    icon: Building2,
    title: 'Corporate',
    copy: 'Executive suiting and branded office wear that reflects your identity.',
  },
  {
    icon: Plane,
    title: 'Aviation',
    copy: 'Cabin crew and ground staff uniforms built for long shifts and long haul.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurants',
    copy: 'Chef whites, aprons and service wear in durable, breathable weaves.',
  },
]

export function Industries() {
  return (
    <section id="industries" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-accent" />
            <p className="text-[10px] font-semibold uppercase tracking-caps text-muted-foreground">
              Industries we dress
            </p>
          </div>
          <h2 className="mt-6 font-serif text-3xl leading-tight text-primary text-balance sm:text-4xl lg:text-[2.75rem]">
            Uniform programmes tailored to how your teams actually work
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <Reveal as="li" key={industry.title} delay={(i % 3) * 100}>
              <article className="group relative h-full bg-background p-8 transition-colors duration-500 hover:bg-primary lg:p-10">
                <industry.icon
                  className="size-7 text-accent transition-transform duration-500 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
                <h3 className="mt-8 font-serif text-2xl text-primary transition-colors duration-500 group-hover:text-primary-foreground">
                  {industry.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-primary-foreground/70">
                  {industry.copy}
                </p>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full"
                />
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
