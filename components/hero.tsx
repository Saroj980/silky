'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'

export function Hero({ slides }: { slides: any[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Filter out slides marked as Hidden or Draft
  const activeSlides = (slides || []).filter((s: any) => {
    let status = s.status || 'Active'
    try {
      const parsed = typeof s.trustBadges === 'string' ? JSON.parse(s.trustBadges) : s.trustBadges
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && parsed.status) {
        status = parsed.status
      }
    } catch (e) {}
    return status === 'Active'
  })

  const slidesToRender = activeSlides.length > 0 ? activeSlides : slides

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slidesToRender.length)
  }, [slidesToRender.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slidesToRender.length) % slidesToRender.length)
  }, [slidesToRender.length])

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const rawSlide = slidesToRender?.[currentSlide] || slidesToRender?.[0]
  if (!rawSlide) return null

  let trustBadges: string[] = []
  let textColor = rawSlide.textColor || '#1F2A37'
  let textAlignment = rawSlide.textAlignment || 'Left'
  let overlayEnabled = rawSlide.overlayEnabled || 'true'
  let overlayOpacity = rawSlide.overlayOpacity || '60'

  try {
    const parsed = typeof rawSlide.trustBadges === 'string' ? JSON.parse(rawSlide.trustBadges) : rawSlide.trustBadges
    if (Array.isArray(parsed)) {
      trustBadges = parsed
    } else if (parsed && typeof parsed === 'object') {
      trustBadges = parsed.badges || []
      if (parsed.textColor) textColor = parsed.textColor
      if (parsed.textAlignment) textAlignment = parsed.textAlignment
      if (parsed.overlayEnabled) overlayEnabled = parsed.overlayEnabled
      if (parsed.overlayOpacity) overlayOpacity = parsed.overlayOpacity
    }
  } catch (e) {}

  const slide = {
    ...rawSlide,
    trustBadges,
    textColor,
    textAlignment,
    overlayEnabled,
    overlayOpacity,
  }

  const alignmentClass = textAlignment === 'Center' ? 'text-center items-center' : textAlignment === 'Right' ? 'text-right items-end' : 'text-left items-start'
  const isOverlayOn = overlayEnabled !== 'false'
  // Soft dim opacity cap (max 60%) so background images are never pitch-black
  const opacityVal = (parseFloat(overlayOpacity || '40') / 100) * 0.6

  return (
    <section className="bg-[#F7F5F2] pt-24 sm:pt-36 pb-16 sm:pb-20 min-h-[80vh] flex items-center border-b border-[#E5E7EB] relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center">
          
          {/* Prominent Image Block */}
          <div className="order-1 lg:order-2 lg:col-span-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative aspect-[4/3] sm:aspect-[16/10.5] w-full min-h-[280px] sm:min-h-[440px] lg:min-h-[480px] rounded-xs overflow-hidden bg-[#FFFFFF] border border-[#E5E7EB] shadow-xl"
              >
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[0.98]"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
                
                {isOverlayOn && (
                  <div 
                    className="absolute inset-0 bg-[#1F2A37] pointer-events-none transition-opacity" 
                    style={{ opacity: opacityVal }}
                  />
                )}

                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-[#1F2A37]/90 text-white text-[11px] sm:text-sm font-inter font-medium px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xs backdrop-blur-xs shadow-md max-w-[90%] truncate">
                  {slide.badgeText}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 sm:-left-4 sm:-right-4 flex justify-between pointer-events-none z-20">
              <button
                onClick={prevSlide}
                className="pointer-events-auto w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#1F2A37]/90 hover:bg-[#DE7B3D] text-white flex items-center justify-center transition-colors duration-180 shadow-lg"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
              </button>

              <button
                onClick={nextSlide}
                className="pointer-events-auto w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#1F2A37]/90 hover:bg-[#DE7B3D] text-white flex items-center justify-center transition-colors duration-180 shadow-lg"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
              </button>
            </div>
          </div>

          {/* Left Text Block */}
          <div className={`order-2 lg:order-1 lg:col-span-5 space-y-5 sm:space-y-6 flex flex-col ${alignmentClass}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className={`space-y-5 sm:space-y-6 flex flex-col ${alignmentClass}`}
              >
                {/* Tagline Badge */}
                <div className="inline-flex items-center space-x-2 px-3 py-0.5 sm:px-3.5 sm:py-1 bg-[#DE7B3D] text-white rounded-full text-[11px] sm:text-xs font-inter font-semibold shadow-xs">
                  <span>{slide.tagline}</span>
                </div>

                {/* Main Heading & Copy */}
                <div className="space-y-3 sm:space-y-4">
                  <h1 
                    className="font-playfair text-[28px] sm:text-[40px] lg:text-[44px] font-normal leading-[1.18] tracking-tight"
                    style={{ color: textColor }}
                  >
                    {slide.title}
                  </h1>

                  <p 
                    className="font-inter text-xs sm:text-base leading-relaxed"
                    style={{ color: textColor === '#1F2A37' ? '#2B2B2B' : textColor }}
                  >
                    {slide.description}
                  </p>
                </div>

                {/* Call To Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                  <a
                    href={slide.primaryBtnHref}
                    className="h-[46px] sm:h-[48px] px-6 sm:px-8 bg-[#DE7B3D] hover:bg-[#C96A30] text-white font-inter font-semibold text-xs uppercase tracking-widest rounded-xs transition-colors duration-180 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>{slide.primaryBtnText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href={slide.secondaryBtnHref}
                    className="h-[46px] sm:h-[48px] px-6 sm:px-8 bg-transparent hover:bg-white text-[#1F2A37] border border-[#1F2A37] font-inter font-semibold text-xs uppercase tracking-widest rounded-xs transition-colors duration-180 flex items-center justify-center"
                  >
                    <span>{slide.secondaryBtnText}</span>
                  </a>
                </div>

                {/* Trust Badges Bar */}
                <div className="pt-5 sm:pt-6 border-t border-[#E5E7EB] grid grid-cols-2 gap-2.5 sm:gap-3 text-left">
                  {slide.trustBadges?.map((badge: any, idx: number) => (
                    <div key={idx} className="flex items-center space-x-1.5 text-[11px] sm:text-xs font-inter text-[#2B2B2B]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DE7B3D] shrink-0" />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Indicators */}
            {slidesToRender.length > 1 && (
              <div className="flex items-center space-x-2 pt-2">
                {slidesToRender.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentSlide === index
                        ? 'w-8 h-2.5 bg-[#DE7B3D]'
                        : 'w-2.5 h-2.5 bg-gray-300 hover:bg-[#1F2A37]'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
