'use client'

import React from 'react'

export function BrandStory({ data }: { data?: any }) {
  // Use data from CMS or fallback to defaults
  const title = data?.title || "More than six decades of tailoring expertise"
  const tagline = data?.tagline || "OUR HERITAGE & EXPERIENCE"
  const quote = data?.quote || "“Master Tailoring has been satisfying the needs of customers since 1963. We believe in building personal relationships with customers and understanding their clothing needs to achieve the best outcome.”"
  const description = data?.description || "From individual custom suiting to large-scale uniform supply for Dubai’s leading enterprises, Silky Textiles & Garments LLC continues to uphold strict quality control, premium fabric sourcing, and fast turnaround."
  const image = data?.image || "/homepage-image/Homepage (31).png"
  const imageCaption = data?.imageCaption || "Deira Master Tailoring Workshop, Dubai"
  const establishedText = data?.establishedText || "Established 1963 • Deira, Dubai"

  return (
    <section id="heritage" className="bg-[#FFFFFF] py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden select-none">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Master Tailoring Image from Client Site (Homepage (31).png) */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xl group">
              <img
                src={image}
                alt="Silky Master Tailoring Heritage 1963 Dubai"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm text-white text-xs font-sans font-bold px-4 py-2 rounded-lg shadow-md">
                {imageCaption}
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] font-inter font-bold text-[var(--color-primary)] block">
                {tagline}
              </span>
              <h2 className="font-playfair text-[34px] text-[var(--color-text)] font-normal leading-tight">
                {title}
              </h2>
            </div>

            {/* Original Story Copy */}
            <p className="font-inter text-base text-[#2B2B2B] leading-relaxed border-l-2 border-[var(--color-primary)] pl-4 italic whitespace-pre-line">
              {quote}
            </p>

            <p className="font-inter text-sm text-[#6B7280] leading-relaxed whitespace-pre-line">
              {description}
            </p>

            {/* Logo Terracotta Orange Line & Badge */}
            <div className="pt-4 flex items-center space-x-4">
              <span className="h-px w-12 bg-[var(--color-primary)]" />
              <span className="font-inter text-xs font-bold text-[var(--color-text)] uppercase tracking-wider">
                {establishedText}
              </span>
            </div>

            {data?.btnText && (
              <div className="pt-2">
                <a
                  href={data?.btnHref || '#contact'}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#D97A42] hover:bg-[#c46833] text-white font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md"
                >
                  <span>{data.btnText}</span>
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
