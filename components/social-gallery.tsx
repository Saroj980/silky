'use client'

import React from 'react'
import { FaInstagram } from 'react-icons/fa6'

const lifestyleImages = [
  {
    id: 1,
    image: '/homepage-image/Homepage (1).png',
    cropClass: 'aspect-[3/4]',
  },
  {
    id: 2,
    image: '/homepage-image/Homepage (2).png',
    cropClass: 'aspect-[1/1]',
  },
  {
    id: 3,
    image: '/homepage-image/Homepage (3).png',
    cropClass: 'aspect-[4/5]',
  },
  {
    id: 4,
    image: '/homepage-image/Homepage (4).png',
    cropClass: 'aspect-[3/4]',
  },
  {
    id: 5,
    image: '/homepage-image/Homepage (5).png',
    cropClass: 'aspect-[1/1]',
  },
]

export function SocialGallery() {
  return (
    <section id="instagram" className="bg-[#F7F5F2] pt-[58px] pb-[52px] border-t border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6 space-y-8">
        {/* Inline Header & Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="font-playfair text-[28px] text-[#1F2A37] font-normal tracking-normal">
            Follow @silkyae for everyday styling
          </h2>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 font-inter text-xs text-[#1F2A37] hover:text-[#DE7B3D] border-b border-[#1F2A37] hover:border-[#DE7B3D] pb-0.5 transition-colors"
          >
            <FaInstagram className="w-3.5 h-3.5" />
            <span>Follow on Instagram</span>
          </a>
        </div>

        {/* 5 Real Client Gallery Images Strip */}
        <div className="flex overflow-x-auto no-scrollbar gap-4 sm:gap-5 pb-2 lg:pb-0 items-center justify-start lg:justify-between max-w-full">
          {lifestyleImages.map((img) => (
            <a
              key={img.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`shrink-0 w-44 sm:w-48 lg:w-1/5 ${img.cropClass} rounded-xs overflow-hidden border border-[#E5E7EB] bg-[#FFFFFF] hover:opacity-90 transition-opacity shadow-xs`}
            >
              <img
                src={img.image}
                alt="Silky Dubai Work & Apparel Gallery"
                className="w-full h-full object-cover object-center"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
