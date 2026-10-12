'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

const defaultSectors = [
  {
    id: 'corporate',
    title: 'Executive & Corporate Suiting',
    category: 'Corporate Identity',
    description:
      'Bespoke executive suits, blazers, dress shirts, and tailored corporate attire designed for boardrooms, luxury fleets, and financial institutions.',
    image: '/images/hero_luxury_uniforms.png',
    imageAlt: 'Corporate & Executive Uniforms Dubai',
    isFeatured: true,
    badge: 'Super 150s Wool',
    specs: ['Custom Monogramming', 'Made to Measure', '24h Express Fitting'],
  },
  {
    id: 'hospitality',
    title: 'Hospitality & 5-Star Hotel Wear',
    category: 'Luxury Hotels & Resorts',
    description:
      'Ergonomic chef coats, aprons, front-desk waistcoats, and housekeeping uniforms crafted for premier UAE hotels & fine dining.',
    image: '/images/category_hospitality.png',
    imageAlt: 'Hospitality & Culinary Uniforms Dubai',
    isFeatured: false,
    badge: 'Hot Sector',
    specs: ['Stain Resistant', 'Breathable Fabric'],
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Clinical Wear',
    category: 'Medical & Wellness',
    description:
      'Antimicrobial medical scrubs, lab coats, and clinic staff uniforms engineered for durability, comfort, and professional hygiene.',
    image: '/images/sector_healthcare.png',
    imageAlt: 'Healthcare & Medical Uniforms Dubai',
    isFeatured: false,
    badge: 'Antimicrobial',
    specs: ['Fluid Repellent', 'ISO Certified'],
  },
  {
    id: 'textiles',
    title: 'Fine Textiles & In-House Embroidery',
    category: 'Bespoke Fabric Sourcing',
    description:
      'Direct importer of Italian Super wool blends, 100% Egyptian cottons, linen blends, and 3D high-density brand logo embroidery.',
    image: '/images/hero_textile_sourcing.png',
    imageAlt: 'Custom Textiles & Fabrics Dubai',
    isFeatured: true,
    badge: 'Mill Direct',
    specs: ['100% Natural Fibers', 'Ready UAE Stock', 'Swatch Books Available'],
  },
]

export function CategoryShowcase({ data, onOpenQuoteModal }: { data?: any, onOpenQuoteModal?: () => void }) {
  const label = data?.label || 'SECTOR SOLUTIONS'
  const title = data?.title || 'Tailored Apparel & Textile Collections'
  const sectors = data?.categories?.length > 0 ? data.categories : defaultSectors

  const ease = [0.16, 1, 0.3, 1] as const

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease },
    },
  }

  return (
    <section id="services" className="bg-[#FAF9F6] py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden select-none">
      
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 lg:mb-14 gap-6 sm:gap-8"
        >
          <div className="space-y-2.5 sm:space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2">
              <span className="text-xs font-sans font-extrabold uppercase tracking-[0.25em] text-[#D97A42]">
                {label}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-slate-900 font-black leading-[1.15]">
              {title}
            </h2>
          </div>

          <div className="max-w-md border-l-2 border-[#D97A42] pl-5 sm:pl-6 space-y-2 md:mb-1">
            <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              Delivering precision pattern making, custom embroidery, and high-performance textiles tailored for UAE's leading commercial enterprises.
            </p>
            <span className="text-[11px] font-bold text-[#1C7A4C] uppercase tracking-widest block font-sans">
              ISO 9001:2015 Master Atelier • Direct UAE Supply
            </span>
          </div>
        </motion.div>

        {/* Bento Grid Sector Showcase */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {sectors.map((sector: any, idx: number) => {
            const isWide = idx === 0 || idx === 3

            return (
              <motion.div
                key={sector.id || idx}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className={`group bg-white/95 backdrop-blur-xs border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#D97A42]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                {/* Clean Photo Container */}
                <div className={`w-full overflow-hidden relative bg-slate-100 ${isWide ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
                  <img
                    src={sector.image}
                    alt={sector.imageAlt || sector.title}
                    className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-[0.98] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Pill Top Left (Silky Logo Forest Green #1C7A4C) */}
                  <div className="absolute top-4 left-4 bg-[#1C7A4C] text-white text-[10px] uppercase font-sans font-bold tracking-wider px-3 py-1.5 rounded-md shadow-md">
                    {sector.subtitle || sector.category || 'Specialized Sector'}
                  </div>

                  {/* Badge Top Right (Silky Logo Terracotta #D97A42) */}
                  {sector.badge && (
                    <div className="absolute top-4 right-4 bg-[#D97A42] text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-md shadow-md">
                      {sector.badge}
                    </div>
                  )}
                </div>

                {/* Card Body - Crisp 100% Readable Titles & Descriptions */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1C7A4C] block font-sans">
                        {sector.subtitle || sector.category || (isWide ? 'FEATURED COLLECTION' : 'SPECIALIZED SECTOR')}
                      </span>
                      <span className="text-[11px] font-bold text-[#D97A42] uppercase tracking-wider font-sans">
                        DUBAI DIRECT
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 font-extrabold leading-snug group-hover:text-[#D97A42] transition-colors">
                      {sector.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {sector.description}
                    </p>

                    {/* Specs Pills */}
                    {sector.specs && sector.specs.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        {sector.specs.map((spec: string) => (
                          <span
                            key={spec}
                            className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1C7A4C]" />
                            <span>{spec}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    {sector.btnHref || sector.link ? (
                      <a
                        href={sector.btnHref || sector.link}
                        className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest font-sans text-slate-900 group-hover:text-[#D97A42] transition-colors cursor-pointer"
                      >
                        <span>{sector.btnText || 'Request Sector Quote'}</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#D97A42]" />
                      </a>
                    ) : (
                      <button
                        onClick={onOpenQuoteModal}
                        className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest font-sans text-slate-900 group-hover:text-[#D97A42] transition-colors cursor-pointer"
                      >
                        <span>{sector.btnText || 'Request Sector Quote'}</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#D97A42]" />
                      </button>
                    )}
                  </div>
                </div>

              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}

export default CategoryShowcase
