'use client'

import React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowUpRight, Ruler, Scissors } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'

/* Brand: orange #D97A42 · teal-green #1C7A4C · ink #2B241E · cream #FBF7F2 */

interface Stat {
  value: string
  label: string
  sub: string
}

const STATS: Stat[] = [
  { value: '60+', label: 'Years of Heritage', sub: 'Serving Dubai since 1963' },
  { value: '500+', label: 'B2B Clients', sub: 'Hotels, clinics & corporates' },
  { value: '1M+', label: 'Garments Made', sub: 'Tailored & manufactured' },
  { value: '7', label: 'Emirates Covered', sub: 'Doorstep delivery across UAE' },
]

export function AboutSilky({
  data,
  onOpenQuoteModal,
}: {
  data?: any
  onOpenQuoteModal?: () => void
}) {
  const reduce = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as const

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 } },
  }
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
      }

  const label = data?.label || 'Built On Craftsmanship'
  const title = data?.title || 'Master Tailors & Uniform Manufacturers in Dubai'

  return (
    <section id="about" className="relative overflow-hidden bg-[#FBF7F2] py-20 lg:py-28">
      {/* faint warm accent wash, top-right — subtle, not a gradient blob */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(217,122,66,0.10) 0%, transparent 70%)' }}
      />

      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* LEFT — editorial copy + stats + CTAs */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.span
            variants={item}
            className="mb-4 block font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#C46A34]"
          >
            {label}
          </motion.span>

          <motion.h2
            variants={item}
            className="max-w-xl font-sans text-3xl font-extrabold leading-[1.12] tracking-tight text-[#2B241E] sm:text-4xl lg:text-[42px]"
          >
            Master Tailors &{' '}
            <span className="text-[#D97A42]">Uniform Manufacturers</span> in Dubai, UAE
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl font-sans text-[15px] leading-relaxed text-[#5C5449]"
          >
            Since 1963, Silky Textiles has paired old-world master tailoring with modern
            manufacturing capacity — supplying bespoke suits, corporate uniforms, and fine textiles
            to hotels, healthcare, and enterprise across the UAE.
          </motion.p>
          <motion.p
            variants={item}
            className="mt-4 max-w-xl font-sans text-[15px] leading-relaxed text-[#5C5449]"
          >
            From a single fitting to a fleet-wide rollout, we handle design, precision pattern
            cutting, in-house embroidery, and doorstep delivery — all under one roof in Deira Creek.
          </motion.p>

          {/* Stat cards 2×2 */}
          <motion.div variants={item} className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="border border-[#E7DECF] bg-white px-5 py-4 transition-colors duration-300 hover:border-[#D97A42]/50"
              >
                <div className="font-sans text-3xl font-extrabold tracking-tight text-[#D97A42] sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 font-sans text-sm font-bold text-[#2B241E]">{s.label}</div>
                <div className="mt-0.5 font-sans text-xs text-[#8A8072]">{s.sub}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenQuoteModal}
              className="group inline-flex items-center gap-2.5 bg-[#2B241E] px-7 py-4 font-sans text-xs font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-[#D97A42]"
            >
              Get a Free Quote
              <Scissors className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            </button>
            <a
              href="https://wa.me/97142261050"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 border border-[#1C7A4C] px-7 py-4 font-sans text-xs font-bold uppercase tracking-widest text-[#1C7A4C] transition-colors duration-300 hover:bg-[#1C7A4C] hover:text-white"
            >
              <FaWhatsapp className="h-4 w-4" />
              Enquire on WhatsApp
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — asymmetric bento: 2 image tiles + 2 dark caption cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 gap-3 sm:gap-4"
        >
          {/* Image tile — tall */}
          <motion.div
            variants={item}
            className="group relative row-span-2 min-h-[300px] overflow-hidden sm:min-h-[420px]"
          >
            <img
              src="/images/craftsmanship_tailoring.png"
              alt="Silky master tailor at work in the Dubai atelier"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B241E]/85 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 font-sans text-base font-bold text-white">
              In-House Tailoring
            </span>
          </motion.div>

          {/* Dark caption card */}
          <motion.div
            variants={item}
            className="flex min-h-[145px] flex-col justify-center bg-[#2B241E] p-5"
          >
            <Ruler className="mb-3 h-6 w-6 text-[#D97A42]" />
            <h3 className="font-sans text-base font-bold text-[#E9A46B]">Free On-Site Measurement</h3>
            <p className="mt-1.5 font-sans text-xs leading-relaxed text-[#C9C1B6]">
              Our team visits your premises to measure every employee individually.
            </p>
          </motion.div>

          {/* Dark caption card */}
          <motion.div
            variants={item}
            className="flex min-h-[145px] flex-col justify-center border-l-2 border-[#1C7A4C] bg-[#241D18] p-5"
          >
            <Scissors className="mb-3 h-6 w-6 text-[#1C7A4C]" />
            <h3 className="font-sans text-base font-bold text-[#5FBE8E]">In-House Embroidery</h3>
            <p className="mt-1.5 font-sans text-xs leading-relaxed text-[#C9C1B6]">
              Sharp, durable logo embroidery & screen printing on every uniform.
            </p>
          </motion.div>

          {/* Image tile — wide (spans both columns) */}
          <motion.div
            variants={item}
            className="group relative col-span-2 min-h-[200px] overflow-hidden"
          >
            <img
              src="/images/hero_luxury_uniforms.png"
              alt="Corporate and hospitality uniforms manufactured by Silky"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B241E]/85 via-[#2B241E]/30 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-6">
              <span className="font-sans text-lg font-bold text-white">Premium Fabric Sourcing</span>
              <span className="mt-1 max-w-[240px] font-sans text-xs text-[#D9D2C7]">
                Italian Super wools, Egyptian cottons & performance textiles, stocked in Dubai.
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSilky
