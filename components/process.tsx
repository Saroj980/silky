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
  const btnText = data?.btnText || data?.ctaText || 'Request Consultation'
  const btnHref = data?.btnHref || data?.ctaHref || '#contact'
  const processSteps = data?.steps?.length > 0 ? data.steps : steps

  return (
    <section id="process" className="bg-[#FAF9F6] py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden select-none">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 space-y-10 sm:space-y-12 lg:space-y-14">
        {/* Clean Corporate Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200/80 pb-6 sm:pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] font-sans font-extrabold text-[#D97A42] block">
              {label}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-slate-900 font-black leading-[1.15]">
              {title}
            </h2>
          </div>

          <a
            href={btnHref}
            className="h-[48px] px-8 bg-transparent border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-sans font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 inline-flex items-center gap-2.5 self-start sm:self-auto hover:scale-105 shrink-0"
          >
            <span>{btnText}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 4 Clean Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {processSteps.map((item: any, idx: number) => {
            const IconComponent = item.icon || MessageSquare
            const stepNum = item.step || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`)
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 p-6 sm:p-7 rounded-2xl space-y-5 shadow-xs hover:shadow-xl hover:border-[#D97A42]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon + Step Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 bg-[#D97A42]/10 border border-[#D97A42]/30 text-[#D97A42] flex items-center justify-center rounded-xl group-hover:bg-[#D97A42] group-hover:text-white transition-all">
                      <IconComponent className="w-5 h-5 stroke-[2]" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#D97A42] uppercase tracking-wider bg-[#D97A42]/10 px-2.5 py-1 rounded-lg border border-[#D97A42]/20">
                      STEP {stepNum}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl text-slate-900 font-extrabold group-hover:text-[#D97A42] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
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
