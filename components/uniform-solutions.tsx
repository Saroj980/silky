'use client'

import React from 'react'
import { ArrowRight, Briefcase, Hotel, Stethoscope, HardHat, GraduationCap, Shirt } from 'lucide-react'

const defaultUniforms = [
  {
    title: 'Corporate Executives',
    desc: 'Crisp white & sky blue formal shirts for boardrooms, banks, and DIFC firms.',
    image: '/homepage-image/Homepage (9).jpg',
    imageAlt: 'Corporate Executive Suit Uniforms Dubai',
    iconName: 'Briefcase',
  },
  {
    title: 'Luxury Hotel Front-Desk',
    desc: 'Elegant front-desk concierge and waiter shirts for 5-star Dubai resorts.',
    image: '/homepage-image/Homepage (11).jpg',
    imageAlt: 'Hotel & Restaurant Staff Uniforms Dubai',
    iconName: 'Hotel',
  },
  {
    title: 'Medical Scrubs & Wellness',
    desc: 'Antimicrobial doctor coats, nursing scrubs, lab gowns, and surgical headwear for UAE clinics.',
    image: '/homepage-image/Homepage (8).jpg',
    imageAlt: 'Medical Scrubs & Doctor Gowns Dubai',
    iconName: 'Stethoscope',
  },
  {
    title: 'Construction & Safety Workwear',
    desc: 'High-visibility safety jackets, heavy-duty coveralls, flame-retardant vests, and site trousers.',
    image: '/homepage-image/Homepage (6).jpg',
    imageAlt: 'Construction Safety Workwear Dubai',
    iconName: 'HardHat',
  },
]

export function UniformSolutions({ data }: { data?: any }) {
  const label = data?.label || 'ENTERPRISE & INSTITUTIONAL SUPPLY'
  const title = data?.title || 'Uniform Solutions for Every Industry'
  const description = data?.description || 'Silky Textiles manufactures and supplies bespoke commercial uniform collections for corporate enterprises, 5-star hotel fleets, medical centers, construction sites, and schools across the UAE.'
  
  const rawList = (data?.uniforms && Array.isArray(data.uniforms) && data.uniforms.length > 0)
    ? data.uniforms
    : (data?.items && Array.isArray(data.items) && data.items.length > 0)
    ? data.items
    : null

  const uniforms = rawList || defaultUniforms

  const resolveIcon = (name: string, fallback: any) => {
    if (!name) return fallback
    const key = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    const icons: any = {
      Briefcase, Hotel, Stethoscope, HardHat, GraduationCap, Shirt
    }
    return icons[key] || fallback
  }

  const ease = [0.16, 1, 0.3, 1] as const

  // Dynamic cards per screen layout calculation
  const rawColumns = data?.columns || data?.cardsPerRow || 'auto'
  let activeCols = 4

  if (rawColumns === '3' || rawColumns === 3) {
    activeCols = 3
  } else if (rawColumns === '4' || rawColumns === 4) {
    activeCols = 4
  } else if (rawColumns === '5' || rawColumns === 5) {
    activeCols = 5
  } else {
    // Smart Auto Layout based on item count
    if (uniforms.length === 3 || uniforms.length === 6) {
      activeCols = 3
    } else if (uniforms.length === 5 || uniforms.length === 10) {
      activeCols = 5
    } else if (uniforms.length <= 2) {
      activeCols = 2
    } else {
      activeCols = 4
    }
  }

  // Adaptive styling configurations based on columns
  let gridClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'
  let cardPaddingClass = 'p-6 sm:p-7'
  let cardTitleClass = 'font-serif text-xl sm:text-2xl text-slate-900 font-extrabold group-hover:text-[#D97A42] transition-colors pt-1'
  let cardDescClass = 'font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-medium'
  let cardAspectClass = 'aspect-[16/10]'
  let cardIconContainerClass = 'w-9 h-9 rounded-lg'
  let cardIconClass = 'w-4.5 h-4.5'

  if (activeCols === 3) {
    // 3 Cards Layout: spacious, full-width, luxurious
    gridClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
    cardPaddingClass = 'p-7 sm:p-8'
    cardTitleClass = 'font-serif text-2xl sm:text-[26px] text-slate-900 font-extrabold group-hover:text-[#D97A42] transition-colors pt-1'
    cardDescClass = 'font-sans text-sm sm:text-base text-slate-600 leading-relaxed font-medium'
    cardAspectClass = 'aspect-[16/10]'
    cardIconContainerClass = 'w-11 h-11 rounded-xl'
    cardIconClass = 'w-5 h-5'
  } else if (activeCols === 5) {
    // 5 Cards Layout: streamlined, fits 5 in one row seamlessly
    gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5'
    cardPaddingClass = 'p-4 sm:p-5'
    cardTitleClass = 'font-serif text-lg sm:text-xl text-slate-900 font-extrabold group-hover:text-[#D97A42] transition-colors pt-0.5'
    cardDescClass = 'font-sans text-xs text-slate-600 leading-normal line-clamp-3'
    cardAspectClass = 'aspect-[4/3] sm:aspect-[16/11]'
    cardIconContainerClass = 'w-8 h-8 rounded-lg'
    cardIconClass = 'w-4 h-4'
  } else if (activeCols === 2) {
    gridClass = 'grid-cols-1 md:grid-cols-2 gap-8'
    cardPaddingClass = 'p-8'
    cardTitleClass = 'font-serif text-2xl sm:text-3xl text-slate-900 font-extrabold group-hover:text-[#D97A42] transition-colors pt-1'
    cardDescClass = 'font-sans text-base text-slate-600 leading-relaxed font-medium'
    cardAspectClass = 'aspect-[16/9]'
    cardIconContainerClass = 'w-11 h-11 rounded-xl'
    cardIconClass = 'w-5 h-5'
  }

  return (
    <section id="uniforms" className="bg-[#FFFFFF] py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden select-none">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 lg:mb-14 gap-6 sm:gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-sans font-extrabold uppercase tracking-[0.25em] text-[#D97A42] block">
              {label}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-slate-900 font-black leading-[1.15]">
              {title}
            </h2>
            {description && (
              <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed font-medium pt-2">
                {description}
              </p>
            )}
          </div>

          <a
            href={data?.btnHref || '#contact'}
            className="h-[48px] px-8 bg-[#D97A42] hover:bg-[#c46833] text-white font-sans font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 inline-flex items-center gap-2.5 shadow-lg self-start md:self-auto hover:scale-105"
          >
            <span>{data?.btnText || 'Request Bulk Pricing'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Dynamic Responsive Grid Items */}
        <div className={`grid ${gridClass}`}>
          {uniforms.map((cat: any, idx: number) => {
            const IconComponent = resolveIcon(cat.iconName, cat.icon || Briefcase)
            const cardHref = cat.link || cat.btnHref || cat.href
            const CardWrapper = cardHref ? 'a' : 'div'
            const wrapperProps = cardHref ? { href: cardHref } : {}

            return (
              <CardWrapper
                key={idx}
                {...wrapperProps}
                className="bg-[#FAF9F6] border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:bg-white hover:shadow-2xl hover:border-[#D97A42]/50 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className={`${cardAspectClass} w-full overflow-hidden bg-slate-100 relative`}>
                  <img
                    src={cat.image}
                    alt={cat.imageAlt || cat.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className={`${cardPaddingClass} space-y-4 flex-1 flex flex-col justify-between`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`${cardIconContainerClass} bg-[#D97A42]/10 border border-[#D97A42]/30 text-[#D97A42] flex items-center justify-center group-hover:bg-[#D97A42] group-hover:text-white transition-all`}>
                        {cat.iconImage ? (
                          <img src={cat.iconImage} alt={cat.title} className="w-4.5 h-4.5 object-contain" />
                        ) : (
                          <IconComponent className={cardIconClass} />
                        )}
                      </div>
                      <span className="text-[11px] font-sans font-extrabold text-[#1C7A4C] tracking-widest">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className={cardTitleClass}>
                      {cat.title}
                    </h3>
                    <p className={cardDescClass}>
                      {cat.desc}
                    </p>
                  </div>

                  {cardHref && (
                    <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#D97A42] group-hover:translate-x-1 transition-transform">
                      <span>View Category</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </CardWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
