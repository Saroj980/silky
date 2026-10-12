'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'

const projects = [
  {
    client: 'Sharaf DG',
    title: 'Retail Staff Uniforms',
    category: 'Corporate Uniforms',
    image: '/homepage-image/Homepage.jpg',
    aspect: 'aspect-[16/10]',
    caption: 'Custom embroidered polo & trousers for Sharaf DG UAE outlets.',
  },
  {
    client: 'ENOC',
    title: 'Station & Service Attire',
    category: 'Workwear & Polo Shirts',
    image: '/homepage-image/Homepage (3).jpg',
    aspect: 'aspect-[16/10]',
    caption: 'Flame-retardant uniforms & high-visibility vests.',
  },
  {
    client: 'Coca-Cola',
    title: 'Promotional & Event Apparel',
    category: 'Screen Printing & Polos',
    image: '/homepage-image/Homepage (1).jpg',
    aspect: 'aspect-[16/10]',
    caption: '100% Cotton branded promotional T-shirts.',
  },
  {
    client: 'Medical Uniform Projects',
    title: 'Dubai Healthcare Facilities',
    category: 'Clinical Scrubs & Gowns',
    image: '/homepage-image/Homepage (2).jpg',
    aspect: 'aspect-[16/10]',
    caption: 'Antimicrobial surgical gowns & hospital scrubs.',
  },
]

export function OurWork({ data }: { data?: any }) {
  const label = data?.label || 'PORTFOLIO & CLIENT PROJECTS'
  const title = data?.title || 'Our Completed Tailoring & Uniform Projects'
  const workProjects = data?.projects?.length > 0 ? data.projects : projects

  const rawColumns = data?.columns || data?.cardsPerRow || 'auto'
  let gridClass = 'grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'
  if (rawColumns === '3' || rawColumns === 3 || (rawColumns === 'auto' && workProjects.length === 3)) {
    gridClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
  } else if (rawColumns === '4' || rawColumns === 4) {
    gridClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'
  }

  return (
    <section id="work" className="bg-[#FAF9F6] py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden select-none">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 space-y-10 sm:space-y-12 lg:space-y-14">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] font-sans font-extrabold text-[#D97A42] block">
              {label}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-slate-900 font-black leading-[1.15]">
              {title}
            </h2>
          </div>

          <a
            href={data?.btnHref || '#contact'}
            className="h-[48px] px-8 bg-transparent border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-sans font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 inline-flex items-center gap-2.5 self-start sm:self-auto hover:scale-105"
          >
            <span>{data?.btnText || 'View All Projects'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Clean Portfolio Grid */}
        <div className={`grid ${gridClass} items-start`}>
          {workProjects.map((proj: any, idx: number) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#D97A42]/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="w-full aspect-[16/10] overflow-hidden bg-slate-100 relative">
                <img
                  src={proj.image}
                  alt={`${proj.client} - ${proj.title}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="p-6 sm:p-7 space-y-3">
                <div className="flex justify-between items-center text-xs font-sans font-extrabold text-[#D97A42]">
                  <span className="uppercase tracking-widest">{proj.client}</span>
                  <span className="text-[#1C7A4C] font-bold">{proj.category}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 font-extrabold group-hover:text-[#D97A42] transition-colors">
                  {proj.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {proj.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
