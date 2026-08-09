'use client'

import React from 'react'
import { Building, Clock, Factory, Store } from 'lucide-react'

const whyPoints = [
  {
    icon: Building,
    title: 'Established in 1963',
    desc: 'Over six decades of master tailoring heritage in Dubai, specializing in custom suiting and enterprise textile supply.',
  },
  {
    icon: Clock,
    title: '24-Hour Express Service',
    desc: 'Rapid express suiting and garment alterations for urgent corporate events, summits, and tight deadlines.',
  },
  {
    icon: Factory,
    title: 'Bulk Uniform Production',
    desc: 'In-house embroidery and garment production facilities capable of delivering large corporate uniform orders across the UAE.',
  },
  {
    icon: Store,
    title: 'Deira Creek Showroom',
    desc: 'Visit our physical showroom on Baniyas Road in Deira Creek to view fabric swatches and meet our master tailors.',
  },
]

export function WhySilky({ data }: { data?: any }) {
  const label = data?.label || 'DUBAI TAILORING & UNIFORM ADVANTAGE'
  const title = data?.title || 'Why Leading UAE Businesses Choose Silky'
  const pointsList = data?.points?.length > 0 ? data.points : whyPoints

  return (
    <section id="why-silky" className="bg-[#FFFFFF] py-16 border-b border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6 space-y-10">
        {/* Clean Corporate Section Header */}
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest font-inter font-bold text-[#DE7B3D] block">
            {label}
          </span>
          <h2 className="font-playfair text-[32px] text-[#1F2A37] font-normal leading-tight">
            {title}
          </h2>
          <div className="w-16 h-0.5 bg-[#DE7B3D] mt-2" />
        </div>

        {/* 4 Practical Human-Designed Business Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pointsList.map((point: any, idx: number) => {
            const IconComponent = point.icon || Building
            return (
              <div
                key={idx}
                className="p-6 bg-[#F7F5F2] border border-[#E5E7EB] rounded-xs space-y-4 hover:border-[#DE7B3D] transition-colors duration-180"
              >
                <div className="w-11 h-11 bg-[#FDF6F0] border border-[#DE7B3D]/25 text-[#DE7B3D] flex items-center justify-center rounded-xs">
                  <IconComponent className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-playfair text-xl text-[#1F2A37] font-normal">
                    {point.title}
                  </h3>
                  <p className="font-inter text-xs text-[#6B7280] leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
