'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    author: 'His Highness Sheikh O. Al-Qasimi',
    title: 'Private Royal Patron',
    location: 'Dubai & Abu Dhabi',
    quote:
      'Silky has crafted my ceremonial garments and bespoke suiting for over a decade. Their standard of pure Mulberry silk and precision tailoring is unrivaled anywhere in the GCC.',
    rating: 5,
    tag: 'Bespoke Patron since 2012',
  },
  {
    id: 2,
    author: 'Elena Rostova',
    title: 'Vice President of Brand & Experience',
    company: 'Palazzo Luxury Hotel Group, Dubai',
    quote:
      'When commissioning executive uniforms for our 500+ staff across DIFC and Palm Jumeirah, Silky delivered flawless elegance, durability, and distinguished brand prestige.',
    rating: 5,
    tag: 'Hospitality Uniform Partner',
  },
  {
    id: 3,
    author: 'Marcus Vance',
    title: 'Managing Director',
    company: 'Vance & Co. Private Capital, DIFC',
    quote:
      'The 3D fitting session at their Jumeirah atelier was a masterclass in modern luxury. My double-breasted suit fits like a second skin with incredible breathability.',
    rating: 5,
    tag: 'DIFC Executive Client',
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const current = testimonials[currentIndex]

  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="text-[#00A758] text-xs uppercase tracking-[0.3em] font-semibold">
            PATRON TESTIMONIALS
          </div>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-[#1A1A1A]">
            Words from Our <span className="text-[#DE7B3D] italic font-serif">Distinguished Clientele</span>
          </h2>
        </div>

        {/* Testimonial Card: White background #FFFFFF, border #E5E7EB, hover border #DE7B3D */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-8 sm:p-12 rounded-xs border border-[#E5E7EB] hover:border-[#DE7B3D] transition-all duration-300 relative shadow-sm hover:shadow-xl space-y-8"
            >
              {/* Quote Icon & Stars */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-[#DE7B3D]/10 border border-[#DE7B3D]/20 flex items-center justify-center text-[#DE7B3D]">
                  <Quote className="w-6 h-6" />
                </div>
                {/* 5 Orange Stars */}
                <div className="flex space-x-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#DE7B3D] text-[#DE7B3D]" />
                  ))}
                </div>
              </div>

              {/* Quote Body */}
              <blockquote className="font-cormorant text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] font-light leading-relaxed italic">
                "{current.quote}"
              </blockquote>

              {/* Author Info & Secondary Green #00A758 Badge */}
              <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-sans text-base text-[#1A1A1A] font-medium tracking-wide">
                    {current.author}
                  </h4>
                  <p className="text-xs text-[#4B5563] font-sans tracking-wider uppercase">
                    {current.title} {current.company ? `• ${current.company}` : ''} ({current.location})
                  </p>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#00A758]/10 border border-[#00A758]/30 text-[#00A758] text-[10px] uppercase font-mono tracking-widest rounded-full self-start sm:self-auto font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00A758]" />
                  <span>{current.tag}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots & Buttons */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-[#DE7B3D]' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() =>
                  setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                }
                className="p-3 bg-white border border-[#E5E7EB] text-[#1A1A1A] hover:text-[#DE7B3D] rounded-full transition-colors shadow-xs"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
                className="p-3 bg-white border border-[#E5E7EB] text-[#1A1A1A] hover:text-[#DE7B3D] rounded-full transition-colors shadow-xs"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
