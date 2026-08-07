'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const categories = [
  {
    id: 'mens',
    title: "Men’s Couture",
    subtitle: 'Bespoke Suiting & Linen Coats',
    itemCount: '142 Designs',
    image:
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop',
    size: 'col-span-12 md:col-span-6 lg:col-span-6 h-[460px]',
    accent: 'Tailored Suiting & Velvet Blazers',
  },
  {
    id: 'womens',
    title: "Women’s Collection",
    subtitle: 'Pure Silk Gowns & Resortwear',
    itemCount: '188 Creations',
    image:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop',
    size: 'col-span-12 md:col-span-6 lg:col-span-6 h-[460px]',
    accent: 'Hand-Embroidered Mulberry Silk',
  },
  {
    id: 'uniforms',
    title: 'Corporate & Hospitality',
    subtitle: 'Aviation, Hotels & Luxury Enterprise',
    itemCount: '60+ Hotel & Airline Brands',
    image:
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
    size: 'col-span-12 md:col-span-6 lg:col-span-6 h-[460px]',
    accent: 'Executive Apparel & Concierge Wear',
  },
  {
    id: 'bespoke',
    title: 'Bespoke Atelier',
    subtitle: 'Master Tailoring & Custom Fittings',
    itemCount: 'By Appointment Only',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop',
    size: 'col-span-12 md:col-span-6 lg:col-span-6 h-[460px]',
    accent: '3D Laser Measurement & Hand Stitching',
  },
]

export function CategoryShowcase() {
  return (
    <section id="categories" className="py-24 sm:py-32 bg-[#FAFAF8] relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="text-[#00A758] text-xs uppercase tracking-[0.3em] font-semibold">
              THE CURATED REALMS
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A]">
              Explore Our <span className="text-[#DE7B3D] italic font-serif">Signature Collections</span>
            </h2>
          </div>
          <p className="text-sm text-[#4B5563] font-sans max-w-md leading-relaxed">
            From imperial ready-to-wear lines to corporate identity wear for Dubai's premiere palaces and airlines, discover uncompromising elegance.
          </p>
        </div>

        {/* 4 Large Editorial Cards Grid */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`${cat.size} group relative overflow-hidden rounded-sm cursor-pointer border border-[#E5E7EB] hover:border-[#DE7B3D] transition-all duration-500 shadow-sm hover:shadow-xl`}
            >
              {/* Background Image with Hover Scale */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110 filter brightness-[0.82]"
                />
              </div>

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/40 to-transparent z-10 transition-opacity duration-500 group-hover:via-[#111827]/60" />

              {/* Top Details: Secondary Green #00A758 Badge */}
              <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center">
                <span className="text-[11px] uppercase tracking-[0.25em] text-white font-medium bg-[#00A758] px-3 py-1 rounded-full shadow-sm">
                  {cat.itemCount}
                </span>
                <div className="w-10 h-10 rounded-full bg-[#DE7B3D] text-white flex items-center justify-center transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-45 shadow-md">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Text Content */}
              <div className="absolute bottom-8 left-6 right-6 z-20 space-y-2 transform transition-transform duration-500 group-hover:-translate-y-1">
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#DE7B3D] font-medium block">
                  {cat.accent}
                </span>
                <h3 className="font-cormorant text-3xl sm:text-4xl text-white font-light">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 font-sans font-light leading-relaxed">
                  {cat.subtitle}
                </p>

                {/* Bottom Line Indicator */}
                <div className="pt-2">
                  <div className="h-[2px] w-12 bg-[#DE7B3D] group-hover:w-full transition-all duration-700 ease-out" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
