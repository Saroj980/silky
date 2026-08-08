'use client'

import React from 'react'

export function FabricBand() {
  return (
    <section className="bg-[#F4EEE5] py-16 border-y border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Close-up fabric texture image from client site */}
          <div className="lg:col-span-5">
            <div className="aspect-[4/3] w-full rounded-xs overflow-hidden border border-[#E5E7EB] bg-[#FFFFFF]">
              <img
                src="/homepage-image/Homepage (7).png"
                alt="Silk Fabric Detail Texture - Silky UAE"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Practical Content */}
          <div className="lg:col-span-7 space-y-4 lg:pl-6">
            <h3 className="font-playfair text-[24px] text-[#1F2A37] font-normal tracking-normal">
              Why customers keep coming back
            </h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-inter text-[15px] text-[#2B2B2B]">
              <li className="flex items-center space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DE7B3D] shrink-0" />
                <span>Soft against sensitive skin</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DE7B3D] shrink-0" />
                <span>Breathable during summer months</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DE7B3D] shrink-0" />
                <span>Drapes without clinging</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DE7B3D] shrink-0" />
                <span>Easy evening elegance</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
