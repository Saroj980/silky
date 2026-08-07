import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const services = [
  {
    index: 'Service 01',
    title: 'Bespoke Tailoring',
    copy: 'Measured, cut and finished in our own Dubai workshop. Individual patterns, hand-finished detailing and fittings scheduled at your office or our showroom.',
    points: ['Personal pattern archive', 'Three-stage fittings', 'House and travel service'],
    image: '/images/service-bespoke.png',
    alt: 'Tailoring atelier with scissors, thread and an unfinished charcoal jacket on a mannequin',
  },
  {
    index: 'Service 02',
    title: 'Corporate Uniforms',
    copy: 'End-to-end uniform programmes: design consultation, fabric selection, sizing sets, production and scheduled replenishment for teams of ten to ten thousand.',
    points: ['Design and sizing sets', 'Managed replenishment', 'Consistent colour matching'],
    image: '/images/service-corporate.png',
    alt: 'Row of matching tailored navy corporate blazers on wooden hangers in a showroom',
  },
  {
    index: 'Service 03',
    title: 'Textile Supply',
    copy: 'Direct mill relationships across Italy, Japan and India give you wool suiting, poly-cotton blends and technical performance fabrics in wholesale volumes.',
    points: ['Mill-direct sourcing', 'Wholesale quantities', 'Certified fabric testing'],
    image: '/images/service-textile.png',
    alt: 'Warehouse shelves stacked with folded premium textiles and fabric bolts',
  },
  {
    index: 'Service 04',
    title: 'Embroidery & Branding',
    copy: 'In-house embroidery, screen printing, woven labels and heat transfer, colour-matched to your brand guidelines and approved on sample before production.',
    points: ['Digitised logo setup', 'Woven and printed labels', 'Pre-production sampling'],
    image: '/images/service-embroidery.png',
    alt: 'Industrial embroidery machine stitching a gold thread emblem into navy fabric',
  },
]

export function Services() {
  return (
    <section id="services" className="bg-muted py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-accent" />
            <p className="text-[10px] font-semibold uppercase tracking-caps text-muted-foreground">
              What we do
            </p>
          </div>
          <h2 className="mt-6 font-serif text-3xl leading-tight text-primary text-balance sm:text-4xl lg:text-[2.75rem]">
            Four disciplines, one workshop under a single roof
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-16 lg:gap-24">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden bg-background ${
                  i % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <Image
                  src={service.image || '/placeholder.svg'}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
                />
              </div>

              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <p className="text-[10px] font-semibold uppercase tracking-caps text-accent">
                  {service.index}
                </p>
                <h3 className="mt-5 font-serif text-3xl text-primary lg:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground text-pretty">
                  {service.copy}
                </p>
                <ul className="mt-7 flex flex-col gap-3">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm text-foreground/80">
                      <span aria-hidden="true" className="size-1.5 shrink-0 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href="#quote"
                  className="group mt-9 inline-flex items-center gap-2 border-b border-primary/25 pb-1.5 text-[11px] font-semibold uppercase tracking-caps text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  Learn More
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
