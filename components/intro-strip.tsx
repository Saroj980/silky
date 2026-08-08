'use client'

import React from 'react'

export function IntroStrip() {
  return (
    <section className="bg-[#F4EEE5] pt-[22px] pb-[18px] border-y border-[#E5D9C8]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left font-inter text-xs text-[#5E5145] tracking-wide">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A06B] shrink-0" />
            <span>Breathable silk for UAE weather</span>
          </div>

          <div className="hidden sm:block w-px h-3 bg-[#E5D9C8]" />

          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A06B] shrink-0" />
            <span>Carefully selected fabrics</span>
          </div>

          <div className="hidden sm:block w-px h-3 bg-[#E5D9C8]" />

          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A06B] shrink-0" />
            <span>Gift packaging available</span>
          </div>
        </div>
      </div>
    </section>
  )
}
