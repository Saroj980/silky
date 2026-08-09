'use client'

import React from 'react'

const b2bTestimonials = [
  {
    quote: "Reliable supplier for our hotel uniform requirements in Dubai. Timely delivery and durable fabric stitching.",
    role: "Procurement Director",
    company: "Luxury Hospitality Group, Dubai",
  },
  {
    quote: "Express tailoring team completed 40 custom executive suits within 48 hours for our summit delegation.",
    role: "Operations Manager",
    company: "Corporate Enterprise, DIFC Dubai",
  },
  {
    quote: "High-visibility safety vests and high-quality cotton coveralls supplied with precise logo embroidery.",
    role: "Safety & HSE Lead",
    company: "Construction & Engineering Firm, UAE",
  },
]

export function Testimonials({ data }: { data?: any }) {
  const label = data?.label || 'CLIENT FEEDBACK'
  const title = data?.title || 'What Our B2B & Corporate Partners Say'
  const testimonialsList = data?.testimonials?.length > 0 ? data.testimonials : b2bTestimonials

  return (
    <section className="bg-[#FFFFFF] py-20 border-b border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="mb-12 text-left space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] font-inter font-bold text-[#DE7B3D] block">
            {label}
          </span>
          <h2 className="font-playfair text-[34px] text-[#1F2A37] font-normal leading-tight">
            {title}
          </h2>
        </div>

        {/* 3 Static B2B Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsList.map((item: any, idx: number) => (
            <div
              key={idx}
              className="p-8 bg-[#F7F5F2] border border-[#E5E7EB] rounded-xs space-y-6 flex flex-col justify-between"
            >
              <p className="font-inter text-sm text-[#2B2B2B] leading-relaxed italic">
                “{item.quote}”
              </p>
              <div className="pt-4 border-t border-[#E5E7EB] space-y-0.5">
                <p className="font-inter text-xs font-bold text-[#1F2A37]">
                  {item.role}
                </p>
                <p className="font-inter text-[11px] text-[#6B7280]">
                  {item.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
