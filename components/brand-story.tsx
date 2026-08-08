'use client'

import React from 'react'

export function BrandStory() {
  return (
    <section id="heritage" className="bg-[#FFFFFF] py-20 border-b border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Master Tailoring Image from Client Site (Homepage (31).png) */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full rounded-xs overflow-hidden bg-[#F7F5F2] border border-[#E5E7EB] shadow-sm">
              <img
                src="/homepage-image/Homepage (31).png"
                alt="Silky Master Tailoring Heritage 1963 Dubai"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 left-3 bg-[#1F2A37]/90 text-white text-xs font-inter px-3 py-1 rounded-xs">
                Deira Master Tailoring Workshop, Dubai
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] font-inter font-bold text-[#DE7B3D] block">
                OUR HERITAGE & EXPERIENCE
              </span>
              <h2 className="font-playfair text-[34px] text-[#1F2A37] font-normal leading-tight">
                More than six decades of tailoring expertise
              </h2>
            </div>

            {/* Original Story Copy */}
            <p className="font-inter text-base text-[#2B2B2B] leading-relaxed border-l-2 border-[#DE7B3D] pl-4 italic">
              “Master Tailoring has been satisfying the needs of customers since 1963. We believe in building personal relationships with customers and understanding their clothing needs to achieve the best outcome.”
            </p>

            <p className="font-inter text-sm text-[#6B7280] leading-relaxed">
              From individual custom suiting to large-scale uniform supply for Dubai’s leading enterprises, Silky Textiles & Garments LLC continues to uphold strict quality control, premium fabric sourcing, and fast turnaround.
            </p>

            {/* Logo Terracotta Orange Line & Badge */}
            <div className="pt-4 flex items-center space-x-4">
              <span className="h-px w-12 bg-[#DE7B3D]" />
              <span className="font-inter text-xs font-bold text-[#1F2A37] uppercase tracking-wider">
                Established 1963 • Deira, Dubai
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
