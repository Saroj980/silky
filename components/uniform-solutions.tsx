'use client'

import React from 'react'
import { ArrowRight, Briefcase, Hotel, Stethoscope, HardHat, GraduationCap, Shirt } from 'lucide-react'

const uniformCategories = [
  {
    title: 'Corporate Uniforms',
    desc: 'Executive corporate suits, blazers, office shirts, ties, and custom branded lapel embroidery.',
    icon: Briefcase,
    image: '/homepage-image/Homepage (9).jpg',
    imageAlt: 'Corporate Executive Suit Uniforms Dubai',
  },
  {
    title: 'Hotel & Restaurant Uniforms',
    desc: 'Chef coats, front-desk concierge suits, waitstaff vests, apron sets, and housekeeping wear.',
    icon: Hotel,
    image: '/homepage-image/Homepage (11).jpg',
    imageAlt: 'Hotel & Restaurant Staff Uniforms Dubai',
  },
  {
    title: 'Medical Scrubs',
    desc: 'Antimicrobial doctor coats, nursing scrubs, lab gowns, and surgical headwear for UAE clinics.',
    icon: Stethoscope,
    image: '/homepage-image/Homepage (8).jpg',
    imageAlt: 'Medical Scrubs & Doctor Gowns Dubai',
  },
  {
    title: 'Construction Workwear',
    desc: 'High-visibility safety jackets, heavy-duty coveralls, flame-retardant vests, and site trousers.',
    icon: HardHat,
    image: '/homepage-image/Homepage (6).jpg',
    imageAlt: 'Construction Safety Workwear Dubai',
  },
  {
    title: 'School Uniforms',
    desc: 'Custom polo shirts, blazer sets, sports jerseys, and trousers for Dubai schools and academies.',
    icon: GraduationCap,
    image: '/homepage-image/Homepage (611).png',
    imageAlt: 'School Uniform Polos & Shirts Dubai',
  },
  {
    title: 'Promotional T-Shirts',
    desc: '100% combed cotton round-neck T-shirts, polo shirts, silk-screen printing, and sublimation.',
    icon: Shirt,
    image: '/homepage-image/Homepage (7).jpg',
    imageAlt: 'Promotional T-Shirts & Screen Printing Dubai',
  },
]

export function UniformSolutions({ data }: { data?: any }) {
  const label = data?.label || 'ENTERPRISE & INSTITUTIONAL SUPPLY'
  const title = data?.title || 'Uniform Solutions for Every Industry'
  const uniforms = data?.uniforms?.length > 0 ? data.uniforms : uniformCategories

  const resolveIcon = (name: string, fallback: any) => {
    if (!name) return fallback
    const key = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    const icons: any = {
      Briefcase, Hotel, Stethoscope, HardHat, GraduationCap, Shirt
    }
    return icons[key] || fallback
  }

  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <section id="uniforms" className="bg-[#FFFFFF] py-28 lg:py-36 border-b border-slate-200/80 relative overflow-hidden select-none">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-sans font-extrabold uppercase tracking-[0.25em] text-[#D97A42] block">
              {label}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-slate-900 font-black leading-[1.15]">
              {title}
            </h2>
          </div>

          <a
            href="#contact"
            className="h-[48px] px-8 bg-[#D97A42] hover:bg-[#c46833] text-white font-sans font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 inline-flex items-center gap-2.5 shadow-lg self-start md:self-auto hover:scale-105"
          >
            <span>Request Bulk Pricing</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Grid Items */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${uniforms.length === 3 ? 'lg:grid-cols-3' : uniforms.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-2'} gap-8 sm:gap-10`}>
          {uniforms.map((cat: any, idx: number) => {
            const IconComponent = resolveIcon(cat.iconName, cat.icon || Briefcase)
            return (
              <div
                key={idx}
                className="bg-[#FAF9F6] border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:bg-white hover:shadow-2xl hover:border-[#D97A42]/50 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={cat.image}
                    alt={cat.imageAlt || cat.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-[#D97A42]/10 border border-[#D97A42]/30 text-[#D97A42] flex items-center justify-center group-hover:bg-[#D97A42] group-hover:text-white transition-all">
                        <IconComponent className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-[11px] font-sans font-extrabold text-[#1C7A4C] tracking-widest">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl text-slate-900 font-extrabold group-hover:text-[#D97A42] transition-colors pt-1">
                      {cat.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {cat.desc}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
