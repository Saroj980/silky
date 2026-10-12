'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'

export interface FullwidthHeroSlide {
  id: number
  eyebrow: string
  titleLine1: string
  titleLine2: string
  description: string
  image: string
  imageAlt: string
  primaryBtnText: string
  primaryBtnHref?: string
  secondaryBtnText: string
  secondaryBtnHref: string
  statChipText: string
}

const SILKY_SLIDES: FullwidthHeroSlide[] = [
  {
    id: 1,
    eyebrow: 'DUBAI ATELIER • EST. 1963',
    titleLine1: 'Pure Silk & Master Wool',
    titleLine2: 'Tailored For Modern Royalty',
    description: 'Direct sourcing of fine Italian Super 150s wools and mulberry silks crafted with six decades of Dubai artisan heritage.',
    image: '/images/hero_bespoke_master.png',
    imageAlt: 'Dubai master tailor crafting bespoke suit in luxury atelier',
    primaryBtnText: 'Book Private Fitting',
    secondaryBtnText: 'Explore Atelier',
    secondaryBtnHref: '#services',
    statChipText: '60+ Years Master Atelier'
  },
  {
    id: 2,
    eyebrow: 'ENTERPRISE UNIFORM SYSTEMS',
    titleLine1: 'Architecting Corporate Apparel',
    titleLine2: 'For Hospitality & Aviation',
    description: 'Turnkey uniform design and precision embroidery manufacturing for UAE luxury hotels, corporate fleets, and aviation teams.',
    image: '/images/hero_luxury_uniforms.png',
    imageAlt: 'Corporate uniform systems for luxury hotels and executive teams in Dubai',
    primaryBtnText: 'Request Bulk Quote',
    secondaryBtnText: 'View Sectors',
    secondaryBtnHref: '#services',
    statChipText: '500K+ Uniforms Delivered'
  },
  {
    id: 3,
    eyebrow: 'WHOLESALE TEXTILE IMPORTER',
    titleLine1: 'Global Fine Fabric Mills',
    titleLine2: 'Stored In Central Dubai',
    description: 'Direct importer of 100% Egyptian cottons, Italian pure silks, and industrial tech-fabrics ready for immediate dispatch.',
    image: '/images/hero_textile_sourcing.png',
    imageAlt: 'Italian pure silk and Egyptian cotton fabric rolls in Dubai showroom',
    primaryBtnText: 'Order Swatch Book',
    secondaryBtnText: 'Contact Sourcing',
    secondaryBtnHref: '#contact',
    statChipText: '100% Pure Natural Fibers'
  }
]

export function FullwidthHero({
  slides = SILKY_SLIDES,
  onOpenQuoteModal
}: {
  slides?: FullwidthHeroSlide[]
  onOpenQuoteModal?: () => void
}) {
  const shouldReduceMotion = useReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const slidesToRender = slides.length > 0 ? slides : SILKY_SLIDES
  const totalSlides = slidesToRender.length

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx)
  }

  // Temporarily pause auto-advance after manual drag / interaction
  const triggerManualPause = useCallback(() => {
    setIsPaused(true)
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 8000)
  }, [])

  // Auto advance every 6.5s
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return

    const timer = setInterval(() => {
      nextSlide()
    }, 6500)

    return () => clearInterval(timer)
  }, [isPaused, nextSlide, shouldReduceMotion])

  // Keyboard Navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement
      if (activeEl && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName)) {
        return
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        triggerManualPause()
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        triggerManualPause()
        prevSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, triggerManualPause])

  const currentSlideData = slidesToRender[currentIndex] || slidesToRender[0]

  return (
    <section
      aria-label="Silky Fullwidth Hero Carousel"
      className="relative w-full h-[88vh] min-h-[640px] max-h-[920px] bg-[var(--ink,#2B241E)] text-[var(--surface,#FBF7F2)] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        if (!pauseTimeoutRef.current) setIsPaused(false)
      }}
    >
      {/* Overarching Main Section Heading Header */}
      <div className="absolute top-24 sm:top-28 left-6 sm:left-12 lg:left-20 right-6 sm:right-12 lg:right-20 z-30 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D97A42] animate-pulse" />
          <h2 className="font-playfair text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#FBF7F2]">
            SILKY TEXTILES & GARMENTS LLC • DUBAI SINCE 1963
          </h2>
        </div>
        <span className="font-inter text-xs font-semibold uppercase tracking-widest text-[#D97A42] bg-black/40 backdrop-blur-md px-3.5 py-1.5 border border-white/10 rounded-full hidden md:inline-block">
          Bespoke Tailoring & Fine Textile Trading
        </span>
      </div>

      {/* Scroll-Snap Track container with 4-6% peek sliver on wide screens */}
      <div className="relative w-full h-full overflow-hidden">
        <motion.div
          className="flex w-full h-full cursor-grab active:cursor-grabbing"
          animate={{
            x: `-${currentIndex * 100}%`
          }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.85,
            ease: [0.65, 0, 0.35, 1]
          }}
          drag="x"
          dragConstraints={{ left: -((totalSlides - 1) * 1000), right: 0 }}
          onDragEnd={(_, info) => {
            triggerManualPause()
            const swipeThreshold = 50
            if (info.offset.x < -swipeThreshold) {
              nextSlide()
            } else if (info.offset.x > swipeThreshold) {
              prevSlide()
            }
          }}
        >
          {slidesToRender.map((slide, idx) => {
            const isActive = idx === currentIndex

            return (
              <div
                key={slide.id || idx}
                className="w-full shrink-0 h-full relative overflow-hidden"
              >
                {/* Full Bleed Image */}
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.03]"
                />

                {/* Soft Duotone Scrim Wash: Warm --ink (#2B241E) + --brand-orange tint */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(43,36,30,0.88) 0%, rgba(43,36,30,0.55) 45%, rgba(43,36,30,0.2) 78%, transparent 100%), radial-gradient(circle at 25% 85%, rgba(217,122,66,0.24) 0%, transparent 65%)'
                  }}
                />

                {/* Content Overlay (Positioned Bottom-Left) */}
                {isActive && (
                  <div className="absolute inset-0 z-20 flex items-end pb-16 sm:pb-20 lg:pb-24 px-6 sm:px-12 lg:px-20 pointer-events-none">
                    <div className="max-w-2xl space-y-6 pointer-events-auto">
                      
                      {/* Eyebrow Label with Solid Brand Orange Dot */}
                      <div className="inline-flex items-center gap-2.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: 'var(--brand-orange, #D97A42)' }}
                        />
                        <span
                          className="font-inter text-xs font-bold uppercase tracking-[0.22em]"
                          style={{ color: 'var(--brand-orange, #D97A42)' }}
                        >
                          {slide.eyebrow}
                        </span>
                      </div>

                      {/* 2-Line Headline with Overflow Mask-Reveal Effect */}
                      <div className="space-y-1 sm:space-y-2">
                        {/* Line 1 Mask Container */}
                        <div className="overflow-hidden py-1">
                          <motion.h1
                            initial={
                              shouldReduceMotion
                                ? { opacity: 0 }
                                : { y: '105%' }
                            }
                            animate={
                              shouldReduceMotion
                                ? { opacity: 1 }
                                : { y: '0%' }
                            }
                            transition={{
                              duration: shouldReduceMotion ? 0.2 : 0.6,
                              delay: shouldReduceMotion ? 0 : 0.05,
                              ease: [0.65, 0, 0.35, 1]
                            }}
                            className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--surface,#FBF7F2)] leading-[1.08]"
                          >
                            {slide.titleLine1}
                          </motion.h1>
                        </div>

                        {/* Line 2 Mask Container (100ms Stagger) */}
                        <div className="overflow-hidden py-1">
                          <motion.h1
                            initial={
                              shouldReduceMotion
                                ? { opacity: 0 }
                                : { y: '105%' }
                            }
                            animate={
                              shouldReduceMotion
                                ? { opacity: 1 }
                                : { y: '0%' }
                            }
                            transition={{
                              duration: shouldReduceMotion ? 0.2 : 0.6,
                              delay: shouldReduceMotion ? 0 : 0.15,
                              ease: [0.65, 0, 0.35, 1]
                            }}
                            className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
                            style={{ color: 'var(--brand-orange, #D97A42)' }}
                          >
                            {slide.titleLine2}
                          </motion.h1>
                        </div>
                      </div>

                      {/* One-Line Description */}
                      <motion.p
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: shouldReduceMotion ? 0.2 : 0.5,
                          delay: shouldReduceMotion ? 0 : 0.25,
                          ease: [0.65, 0, 0.35, 1]
                        }}
                        className="font-inter text-slate-200 text-sm sm:text-base leading-relaxed font-light max-w-xl"
                      >
                        {slide.description}
                      </motion.p>

                      {/* CTA Row & Inline Stat Chip with Animated Underline */}
                      <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
                        {/* Primary CTA with Brand Orange Fill-Sweep */}
                        {slide.primaryBtnHref && slide.primaryBtnHref !== '#modal' ? (
                          <a
                            href={slide.primaryBtnHref}
                            className="relative group overflow-hidden px-7 py-3.5 font-inter text-xs font-bold uppercase tracking-widest text-white rounded-none cursor-pointer border inline-flex items-center gap-2"
                            style={{
                              backgroundColor: 'var(--brand-orange, #D97A42)',
                              borderColor: 'var(--brand-orange, #D97A42)'
                            }}
                          >
                            <motion.span
                              className="absolute inset-0 bg-[#c46933] z-0 origin-left"
                              initial={{ scaleX: 0 }}
                              whileHover={{ scaleX: shouldReduceMotion ? 0 : 1 }}
                              transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                            />
                            <span className="relative z-10 flex items-center gap-2">
                              {slide.primaryBtnText}
                              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                          </a>
                        ) : (
                          <button
                            onClick={onOpenQuoteModal}
                            className="relative group overflow-hidden px-7 py-3.5 font-inter text-xs font-bold uppercase tracking-widest text-white rounded-none cursor-pointer border"
                            style={{
                              backgroundColor: 'var(--brand-orange, #D97A42)',
                              borderColor: 'var(--brand-orange, #D97A42)'
                            }}
                          >
                            <motion.span
                              className="absolute inset-0 bg-[#c46933] z-0 origin-left"
                              initial={{ scaleX: 0 }}
                              whileHover={{ scaleX: shouldReduceMotion ? 0 : 1 }}
                              transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                            />
                            <span className="relative z-10 flex items-center gap-2">
                              {slide.primaryBtnText}
                              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                          </button>
                        )}

                        {/* Secondary CTA */}
                        <a
                          href={slide.secondaryBtnHref}
                          className="relative group overflow-hidden px-7 py-3.5 font-inter text-xs font-bold uppercase tracking-widest text-[var(--surface,#FBF7F2)] border border-white/30 rounded-none cursor-pointer"
                        >
                          <motion.span
                            className="absolute inset-0 bg-white z-0 origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: shouldReduceMotion ? 0 : 1 }}
                            transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                          />
                          <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[var(--ink,#2B241E)]">
                            {slide.secondaryBtnText}
                          </span>
                        </a>

                        {/* Inline Stat Chip with Thin Animated --brand-green Underline */}
                        <div className="relative inline-flex items-center pb-1 pt-1 ml-1 sm:ml-2">
                          <span className="font-inter text-xs font-semibold uppercase tracking-wider text-slate-200">
                            {slide.statChipText}
                          </span>
                          
                          {/* Green Underline Chip Animating width 0% -> 100% after text lands */}
                          <motion.span
                            className="absolute bottom-0 left-0 h-[2px]"
                            style={{ backgroundColor: 'var(--brand-green, #1C7A4C)' }}
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{
                              duration: shouldReduceMotion ? 0.2 : 0.55,
                              delay: shouldReduceMotion ? 0 : 0.45,
                              ease: [0.65, 0, 0.35, 1]
                            }}
                          />
                        </div>

                      </div>

                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Bottom-Right Minimalist Slide Counter ("01 — 03") */}
      <div className="absolute bottom-8 right-6 sm:right-12 lg:right-16 z-30 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 border border-white/10">
        {/* Previous Button */}
        <button
          onClick={() => {
            triggerManualPause()
            prevSlide()
          }}
          className="p-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Counter Display */}
        <div className="font-inter text-xs font-bold tracking-widest flex items-center gap-1.5">
          <span style={{ color: 'var(--brand-orange, #D97A42)' }}>
            {(currentIndex + 1).toString().padStart(2, '0')}
          </span>
          <span className="text-slate-400 font-light">—</span>
          <span className="text-slate-300">
            {totalSlides.toString().padStart(2, '0')}
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={() => {
            triggerManualPause()
            nextSlide()
          }}
          className="p-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Subtle Slide Indicator Progress Rail at bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-30">
        <motion.div
          className="h-full"
          style={{ backgroundColor: 'var(--brand-orange, #D97A42)' }}
          animate={{
            width: `${((currentIndex + 1) / totalSlides) * 100}%`
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

    </section>
  )
}
