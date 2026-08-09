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

  return (
    <section id="work" className="bg-[#F7F5F2] py-20 border-b border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-inter font-bold text-[#DE7B3D] block">
              {label}
            </span>
            <h2 className="font-playfair text-[34px] text-[#1F2A37] font-normal leading-tight">
              {title}
            </h2>
          </div>

          <a
            href="#contact"
            className="h-[44px] px-6 bg-transparent border border-[#1F2A37] hover:bg-[#1F2A37] hover:text-white text-[#1F2A37] font-inter font-semibold text-xs uppercase tracking-widest rounded-xs transition-colors duration-180 inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Clean Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {workProjects.map((proj: any, idx: number) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xs overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 group"
            >
              <div className={`w-full ${proj.aspect} overflow-hidden bg-[#F7F5F2] relative`}>
                <img
                  src={proj.image}
                  alt={`${proj.client} - ${proj.title}`}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300 filter contrast-[1.02]"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
              </div>

              <div className="p-6 space-y-2">
                <div className="flex justify-between items-center text-xs font-inter font-bold text-[#DE7B3D]">
                  <span className="uppercase tracking-wider">{proj.client}</span>
                  <span className="text-[#6B7280] font-normal">{proj.category}</span>
                </div>

                <h3 className="font-playfair text-2xl text-[#1F2A37] font-normal group-hover:text-[#DE7B3D] transition-colors">
                  {proj.title}
                </h3>

                <p className="font-inter text-xs text-[#6B7280] pt-1">
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
