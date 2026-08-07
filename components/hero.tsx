'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause, ArrowUpRight } from 'lucide-react'

const heroSlides = [
  {
    id: 1,
    tagline: 'AUTUMN / WINTER 2026 COUTURE',
    title: 'Elegance Woven in Silk & Gold',
    subtitle:
      'Immerse in the pinnacle of Dubai haute couture. Hand-tailored Mulberry silk gowns, bespoke coats, and royal evening attire.',
    primaryCta: 'Shop Collection',
    primaryHref: '#new-arrivals',
    secondaryCta: 'Book Tailoring',
    secondaryHref: '#story',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop',
    accentBadge: 'High Couture 2026',
  },
  {
    id: 2,
    tagline: 'DIFC & JUMEIRAH BESPOKE ATELIER',
    title: 'The Art of Imperial Suiting',
    subtitle:
      'Crafted with Super 150s Italian wool, custom hand-stitched lapels, and tailored perfection for GCC executives and gentlemen.',
    primaryCta: 'Explore Menswear',
    primaryHref: '#categories',
    secondaryCta: 'Reserve Private Fitting',
    secondaryHref: '#story',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop',
    accentBadge: 'Master Suiting',
  },
  {
    id: 3,
    tagline: 'EXECUTIVE UNIFORMS & HOSPITALITY',
    title: 'Distinguished Uniform Identity',
    subtitle:
      'Designing bespoke apparel for Dubai’s finest 5-star hotels, luxury aviation fleets, and prestigious corporate houses since 1963.',
    primaryCta: 'Uniform Catalogue',
    primaryHref: '#categories',
    secondaryCta: 'Request Corporate Pitch',
    secondaryHref: '#newsletter',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop',
    accentBadge: 'Corporate Elite',
  },
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      nextSlide()
    }, 5500)
    return () => clearInterval(timer)
  }, [isPlaying, nextSlide])

  const slide = heroSlides[currentSlide]

  return (
    <section className="relative w-full h-screen min-h-[750px] overflow-hidden bg-[#111827] flex items-center justify-center">
      {/* Background Slideshow with Ken Burns Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 z-0"
        >
          {/* Ken Burns Zoom Effect */}
          <motion.div
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 7, ease: 'linear' }}
            className="w-full h-full relative"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-[0.68] contrast-[1.08]"
            />
          </motion.div>

          {/* Warm Subtle Overlay rgba(222,123,61,0.08) & Dark Gradients */}
          <div className="absolute inset-0 bg-[rgba(222,123,61,0.08)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-[#111827]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/80 via-[#111827]/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Main Editorial Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-20 sm:pt-28">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Badge & Tagline: Secondary Green #00A758 Badge */}
              <div className="flex items-center space-x-3">
                <span className="px-3.5 py-1 bg-[#00A758]/20 border border-[#00A758]/40 text-[#00A758] text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase rounded-full backdrop-blur-md">
                  {slide.accentBadge}
                </span>
                <span className="h-px w-12 bg-[#DE7B3D]/40 hidden sm:inline-block" />
                <span className="text-xs sm:text-sm font-sans tracking-[0.25em] uppercase text-gray-200">
                  {slide.tagline}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-cormorant text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[1.05] tracking-tight">
                {slide.title.split(' ').map((word, i) => (
                  <span
                    key={i}
                    className={
                      word.toLowerCase() === 'silk' || word.toLowerCase() === 'suiting' || word.toLowerCase() === 'uniform'
                        ? 'text-[#DE7B3D] italic font-serif'
                        : 'inline-block mr-3'
                    }
                  >
                    {word}{' '}
                  </span>
                ))}
              </h1>

              {/* Subheadline Description */}
              <p className="text-sm sm:text-lg text-gray-200 font-sans font-light max-w-2xl leading-relaxed tracking-wide">
                {slide.subtitle}
              </p>

              {/* Action Buttons: Primary #DE7B3D (hover #C96A30), Secondary Border #00A758 (hover #00A758 text white) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2 sm:pt-4 max-w-md sm:max-w-none">
                <a
                  href={slide.primaryHref}
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#DE7B3D] hover:bg-[#C96A30] text-white font-sans font-medium text-xs sm:text-sm uppercase tracking-[0.25em] transition-all duration-300 rounded-sm shadow-xl hover:-translate-y-0.5"
                >
                  <span>{slide.primaryCta}</span>
                  <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>

                <a
                  href={slide.secondaryHref}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-[#00A758] text-[#00A758] hover:text-white border border-[#00A758] font-sans font-medium text-xs sm:text-sm uppercase tracking-[0.25em] transition-all duration-300 rounded-sm backdrop-blur-sm shadow-md"
                >
                  <span>{slide.secondaryCta}</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls & Progress Indicator Bar */}
      <div className="absolute bottom-10 left-0 right-0 z-30 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Animated Progress Indicators */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {heroSlides.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentSlide(index)}
              className="group py-2 flex items-center focus:outline-none"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className="relative h-1 w-16 sm:w-24 bg-white/20 rounded-full overflow-hidden transition-all duration-300 group-hover:bg-white/40">
                {currentSlide === index && (
                  <motion.div
                    layoutId="heroProgress"
                    className="absolute inset-y-0 left-0 bg-[#DE7B3D] rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: isPlaying ? 5.5 : 0.3,
                      ease: 'linear',
                    }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Play/Pause & Arrow Navigation */}
        <div className="flex items-center space-x-4 bg-[#111827]/70 backdrop-blur-md px-4 py-2 rounded-full border border-gray-700">
          <span className="text-xs font-mono text-[#DE7B3D] tracking-wider mr-2 font-semibold">
            0{currentSlide + 1} / 0{heroSlides.length}
          </span>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 text-gray-300 hover:text-[#DE7B3D] transition-colors"
            title={isPlaying ? 'Pause auto-slide' : 'Play auto-slide'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <div className="h-4 w-px bg-white/20" />

          <button
            onClick={prevSlide}
            className="p-2 text-gray-300 hover:text-[#DE7B3D] transition-colors"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="p-2 text-gray-300 hover:text-[#DE7B3D] transition-colors"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
