import Image from 'next/image'
import { Reveal } from '@/components/reveal'

const projects = [
  {
    label: 'Hotel Uniforms',
    meta: 'Palm Jumeirah resort · 620 pieces',
    image: '/images/work-hotel.png',
    alt: 'Hotel concierge and housekeeping staff in tailored navy uniforms with gold buttons',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    label: 'Executive Suits',
    meta: 'DIFC financial group · bespoke',
    image: '/images/work-executive.png',
    alt: 'Executive wearing a sharply tailored navy three-piece suit in a modern Dubai office',
    span: '',
  },
  {
    label: 'School Uniforms',
    meta: 'Al Barsha academy · 1,400 students',
    image: '/images/work-school.png',
    alt: 'Pressed school blazers, shirts and ties displayed on hangers in a uniform showroom',
    span: '',
  },
  {
    label: 'Healthcare Apparel',
    meta: 'Private hospital group · scrubs',
    image: '/images/work-healthcare.png',
    alt: 'Medical professionals wearing crisp tailored scrubs and lab coats in a bright clinic',
    span: '',
  },
  {
    label: 'Aviation Crew',
    meta: 'Regional carrier · cabin crew',
    image: '/images/work-aviation.png',
    alt: 'Airline cabin crew in tailored navy uniforms with gold trim walking through a terminal',
    span: '',
  },
]

export function Showcase() {
  return (
    <section id="work" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-accent" />
              <p className="text-[10px] font-semibold uppercase tracking-caps text-muted-foreground">
                Selected work
              </p>
            </div>
            <h2 className="mt-6 font-serif text-3xl leading-tight text-primary text-balance sm:text-4xl lg:text-[2.75rem]">
              Recent programmes delivered across the Emirates
            </h2>
          </div>
          <a
            href="#quote"
            className="shrink-0 border-b border-primary/25 pb-1.5 text-[11px] font-semibold uppercase tracking-caps text-primary transition-colors hover:border-accent hover:text-accent"
          >
            Discuss your project
          </a>
        </Reveal>

        <ul className="mt-14 grid auto-rows-[240px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[260px]">
          {projects.map((project, i) => (
            <Reveal
              as="li"
              key={project.label}
              delay={i * 90}
              className={`group relative overflow-hidden ${project.span}`}
            >
              <Image
                src={project.image || '/placeholder.svg'}
                alt={project.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-serif text-xl text-primary-foreground">{project.label}</h3>
                <p className="mt-1 max-h-0 overflow-hidden text-[11px] uppercase tracking-caps text-accent opacity-0 transition-all duration-500 group-hover:max-h-10 group-hover:opacity-100">
                  {project.meta}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
