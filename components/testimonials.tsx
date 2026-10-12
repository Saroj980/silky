'use client'

import React from 'react'
import { Star } from 'lucide-react'

const b2bTestimonials = [
  {
    quote: "Silky Textiles supplied over 400 executive cotton shirts for our DIFC office staff. The fit and embroidery accuracy exceeded expectations.",
    author: "Tariq Al-Mansoor",
    role: "Corporate Operations Director",
    company: "DIFC Bank, Dubai",
    location: "Dubai, UAE",
    rating: 5,
  },
  {
    quote: "The breathability of their 100% Egyptian cotton shirts is unmatched for Dubai's climate. Our hotel front-desk team looks impeccably sharp every day.",
    author: "Elena Rostova",
    role: "Procurement Director",
    company: "Luxury Hospitality Group, Dubai",
    location: "Palm Jumeirah, Dubai",
    rating: 5,
  },
  {
    quote: "Fast turnarounds, excellent stitching, and personalized monogrammed cuffs. We order all our fleet uniforms directly from their Dubai atelier.",
    author: "Khalid Al-Hassani",
    role: "Safety & HSE Lead",
    company: "Construction & Engineering Firm, UAE",
    location: "Abu Dhabi, UAE",
    rating: 5,
  },
]

export function Testimonials({ data }: { data?: any }) {
  const label = data?.label || 'CLIENT FEEDBACK'
  const title = data?.title || 'What Our B2B & Corporate Partners Say'
  const testimonialsList = (data?.testimonials && data.testimonials.length > 0)
    ? data.testimonials
    : (data?.reviews && data.reviews.length > 0)
    ? data.reviews
    : b2bTestimonials

  return (
    <section id="testimonials" className="bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden select-none">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="mb-10 sm:mb-12 lg:mb-14 text-left space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-extrabold text-[#D97A42] block">
            {label}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-slate-900 font-black leading-[1.15]">
            {title}
          </h2>
        </div>

        {/* 3 Static B2B Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonialsList.map((item: any, idx: number) => {
            const authorName = item.author || item.authorName || item.name || ''
            const ratingCount = typeof item.rating === 'number' ? item.rating : parseInt(item.rating || '5', 10) || 5

            return (
              <div
                key={idx}
                className="p-6 sm:p-7 bg-[#FAF9F6] border border-slate-200/80 rounded-2xl space-y-6 shadow-xs hover:shadow-xl hover:border-[#D97A42]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-[#D97A42]">
                    {[...Array(ratingCount)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D97A42] text-[#D97A42]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed italic font-medium">
                    “{item.quote}”
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-200/80 space-y-1">
                  {authorName && (
                    <p className="font-serif text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-[#D97A42] transition-colors">
                      {authorName}
                    </p>
                  )}
                  {item.role && (
                    <p className="font-sans text-xs font-bold text-[#D97A42]">
                      {item.role}
                    </p>
                  )}
                  {(item.company || item.location) && (
                    <p className="font-sans text-xs text-slate-500 font-medium">
                      {item.company || item.location}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
