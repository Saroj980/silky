'use client'

import React from 'react'
import { ArrowRight, MessageSquare, Ruler, Scissors, Truck } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: MessageSquare,
    title: 'Consultation & Fabrics',
    desc: 'Fabric selection from Italian wools & Egyptian cottons, clear specification, and transparent quotation.',
  },
  {
    step: '02',
    icon: Ruler,
    title: 'Measurement & Design',
    desc: 'On-site measurement fitting by master tailors, pattern cutting, and sample approval.',
  },
  {
    step: '03',
    icon: Scissors,
    title: 'Production & Embroidery',
    desc: 'Precision cutting, expert hand-stitching, and high-density computer logo embroidery.',
  },
  {
    step: '04',
    icon: Truck,
    title: 'Inspection & Delivery',
    desc: 'Quality control, steam pressing, and doorstep delivery across Dubai and all UAE Emirates.',
  },
]

export function ProcessSection({ data }: { data?: any }) {
  const label = data?.label || 'HOW WE WORK'
  const title = data?.title || 'Our Four-Step Tailoring & Order Process'
  const btnText = data?.btnText || 'Request Consultation'
  const btnHref = data?.btnHref || '#contact'
  const processSteps = data?.steps?.length > 0 ? data.steps : steps

  return (
    <section className="bg-[#F7F5F2] py-16 border-b border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6 space-y-10">
        {/* Clean Corporate Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5E7EB] pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-inter font-bold text-[#DE7B3D] block">
              {label}
            </span>
            <h2 className="font-playfair text-[32px] text-[#1F2A37] font-normal leading-tight">
              {title}
            </h2>
          </div>

          <a
            href={btnHref}
            className="h-[42px] px-6 bg-[#DE7B3D] hover:bg-[#C96A30] text-white font-inter font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <span>{btnText}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 4 Clean Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {processSteps.map((item: any, idx: number) => {
            const IconComponent = item.icon || MessageSquare
            const stepNum = item.step || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`)
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] border border-[#E5E7EB] p-6 rounded-xs space-y-4 shadow-xs hover:border-[#DE7B3D] transition-colors duration-180 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon + Step Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-[#FDF6F0] border border-[#DE7B3D]/25 text-[#DE7B3D] flex items-center justify-center rounded-xs">
                      <IconComponent className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#DE7B3D] uppercase tracking-wider bg-[#FDF6F0] px-2 py-0.5 rounded-xs border border-[#DE7B3D]/20">
                      STEP {stepNum}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="font-playfair text-xl text-[#1F2A37] font-normal">
                      {item.title}
                    </h3>
                    <p className="font-inter text-xs text-[#6B7280] leading-relaxed">
                      {item.desc}
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
