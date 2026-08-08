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

export function UniformSolutions() {
  return (
    <section id="uniforms" className="bg-[#FFFFFF] py-20 border-b border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-inter font-bold text-[#DE7B3D] block">
              ENTERPRISE & INSTITUTIONAL SUPPLY
            </span>
            <h2 className="font-playfair text-[34px] text-[#1F2A37] font-normal leading-tight">
              Uniform Solutions for Every Industry
            </h2>
          </div>

          <a
            href="#contact"
            className="h-[44px] px-6 bg-[#DE7B3D] hover:bg-[#C96A30] text-white font-inter font-semibold text-xs uppercase tracking-widest rounded-xs transition-colors duration-180 inline-flex items-center gap-2 shadow-xs self-start md:self-auto"
          >
            <span>Request Bulk Pricing</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 6 Grid Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniformCategories.map((cat, idx) => {
            const IconComponent = cat.icon
            return (
              <div
                key={idx}
                className="bg-[#F7F5F2] border border-[#E5E7EB] rounded-xs overflow-hidden shadow-xs hover:bg-white hover:shadow-md transition-all duration-180 group flex flex-col justify-between"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-[#E5E7EB]">
                  <img
                    src={cat.image}
                    alt={cat.imageAlt}
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-200"
                  />
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xs bg-[#FDF6F0] border border-[#DE7B3D]/25 text-[#DE7B3D] flex items-center justify-center group-hover:bg-[#DE7B3D] group-hover:text-white transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-inter font-bold text-[#6B7280]">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-playfair text-xl text-[#1F2A37] font-normal group-hover:text-[#DE7B3D] transition-colors pt-1">
                      {cat.title}
                    </h3>
                    <p className="font-inter text-xs text-[#6B7280] leading-relaxed">
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
