'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'

const primaryServices = [
  {
    id: 'tailoring',
    title: 'Tailoring',
    subtitle: '24 Hours Express Tailoring & Made to Measure Suits',
    description:
      'Bespoke 2-piece & 3-piece suits, tuxedos, ladies suits, safari suits, and 24-hour express alterations by master Dubai tailors.',
    image: '/homepage-image/Homepage (5).jpg',
    imageAlt: 'Master Tailoring & Bespoke Suits Dubai',
    link: '#contact',
  },
  {
    id: 'textiles',
    title: 'Textiles',
    subtitle: 'High Quality Suiting & Shirting Fabric Sourcing',
    description:
      'Premium Italian Super wools, pure cottons, linens, kandura fabrics, and industrial flame-retardant enterprise textiles.',
    image: '/homepage-image/Homepage (4).jpg',
    imageAlt: 'Suiting & Shirting Fabrics Dubai',
    link: '#contact',
  },
  {
    id: 'garments',
    title: 'Garments',
    subtitle: '100% Cotton Ready Made & Custom Corporate Attire',
    description:
      'Corporate polo shirts, executive shirts, coveralls, chef coats, and custom embroidered corporate identity wear.',
    image: '/homepage-image/Homepage.jpg',
    imageAlt: '100% Cotton Ready Made Garments Dubai',
    link: '#contact',
  },
]

export function CategoryShowcase({ data }: { data?: any }) {
  // Use CMS data if available, fallback to static defaults
  const label = data?.label || 'CORE BUSINESS CAPABILITIES'
  const title = data?.title || 'Our Primary Services & Sourcing Solutions'
  const categories = data?.categories?.length > 0 ? data.categories : primaryServices

  return (
    <section id="services" className="bg-[#F7F5F2] py-20 border-b border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="mb-14 text-left space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] font-inter font-bold text-[#DE7B3D] block">
            {label}
          </span>
          <h2 className="font-playfair text-[34px] text-[#1F2A37] font-normal leading-tight">
            {title}
          </h2>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {categories.map((service: any, idx: number) => (
            <div
              key={service.id || idx}
              className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xs overflow-hidden shadow-xs hover:-translate-y-0.5 transition-all duration-180 flex flex-col justify-between"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#F7F5F2]">
                <img
                  src={service.image}
                  alt={service.imageAlt || service.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-playfair text-2xl text-[#1F2A37] font-normal">
                    {service.title}
                  </h3>
                  <p className="font-inter text-xs font-semibold text-[#DE7B3D] uppercase tracking-wider">
                    {service.subtitle}
                  </p>
                  <p className="font-inter text-sm text-[#6B7280] leading-relaxed pt-1">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB]">
                  <a
                    href={service.link || '#contact'}
                    className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-inter font-bold text-[#1F2A37] hover:text-[#DE7B3D] transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

