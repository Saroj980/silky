'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'

export interface HeroSlide {
  id: number
  tagline: string
  titleLine1: string
  highlightText: string
  description: string
  image: string
  primaryBtnText: string
  secondaryBtnText: string
  secondaryBtnHref: string
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    tagline: 'DUBAI MASTER ATELIER • SINCE 1963',
    titleLine1: 'Bespoke Suiting &',
    highlightText: 'Executive Tailoring',
    description: 'Handcrafted 2 & 3-piece suits, blazers, tuxedos, and traditional Kanduras cut with six decades of Dubai atelier heritage.',
    image: '/images/hero_bespoke_suit.png',
    primaryBtnText: 'Request Custom Quote',
    secondaryBtnText: 'Visit Showroom',
    secondaryBtnHref: '#contact',
  },
  {
    id: 2,
    tagline: '5-STAR HOSPITALITY & FLEET SUPPLY',
    titleLine1: 'Corporate Uniforms &',
    highlightText: 'Luxury Hotel Solutions',
    description: 'Turnkey uniform manufacturing for UAE hotels, corporate fleets, medical clinics, and retail teams with precision in-house embroidery.',
    image: '/images/hero_corporate_uniforms.png',
    primaryBtnText: 'Get Bulk Quote',
    secondaryBtnText: 'Explore Sectors',
    secondaryBtnHref: '#services',
  },
  {
    id: 3,
    tagline: 'WHOLESALE TEXTILE IMPORTER',
    titleLine1: 'Fine Italian Silks &',
    highlightText: 'Egyptian Cotton Mills',
    description: 'Direct import of 100% Egyptian cottons, Italian pure silks, and performance workwear textiles stocked in Dubai for immediate dispatch.',
    image: '/images/hero_textile_fabrics.png',
    primaryBtnText: 'Order Swatch Book',
    secondaryBtnText: 'Contact Sourcing',
    secondaryBtnHref: '#contact',
  },
  {
    id: 4,
    tagline: 'CUSTOM PROMOTIONAL APPAREL',
    titleLine1: 'Enterprise Polos &',
    highlightText: 'Branded T-Shirts',
    description: 'Heavyweight 220 GSM pique cotton polos, dry-fit athletic tees, and customized merchandise printed for corporate events.',
    image: '/images/slide-polo.png',
    primaryBtnText: 'Order Custom Polos',
    secondaryBtnText: 'View Merchandise',
    secondaryBtnHref: '#services',
  },
  {
    id: 5,
    tagline: 'INDUSTRIAL SAFETY & WORKWEAR',
    titleLine1: 'EN ISO Certified PPE &',
    highlightText: 'High-Vis Safety Gear',
    description: 'Flame retardant coveralls, certified high-vis jackets, and protective workwear engineered for heavy construction & engineering fleets.',
    image: '/images/sector_healthcare.png',
    primaryBtnText: 'Get PPE Specs',
    secondaryBtnText: 'Safety Catalogs',
    secondaryBtnHref: '#services',
  },
]

const AUTOPLAY_MS = 6500

export function HeroSection({
  slides = HERO_SLIDES,
  onOpenQuoteModal,
}: {
  slides?: any[]
  onOpenQuoteModal?: () => void
}) {
  const shouldReduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const rawSlides = slides && slides.length > 0 ? slides : HERO_SLIDES
  const activeSlides = rawSlides.map((s: any) => {
    let titleLine1 = s.titleLine1 || ''
    let highlightText = s.highlightText || ''

    if (!titleLine1 && s.title) {
      const parts = s.title.split('&')
      if (parts.length > 1) {
        titleLine1 = parts[0].trim() + ' &'
        highlightText = parts.slice(1).join('&').trim()
      } else {
        titleLine1 = s.title
        highlightText = ''
      }
    }

    return {
      id: s.id,
      tagline: s.tagline || 'DUBAI MASTER ATELIER • SINCE 1963',
      titleLine1: titleLine1 || 'Bespoke Suiting &',
      highlightText: highlightText || '',
      description: s.description || '',
      image: s.image || '/images/hero_bespoke_suit.png',
      primaryBtnText: s.primaryBtnText || 'Request Custom Quote',
      primaryBtnHref: s.primaryBtnHref || '',
      secondaryBtnText: s.secondaryBtnText || 'Visit Showroom',
      secondaryBtnHref: s.secondaryBtnHref || '#contact',
    }
  })

  const total = activeSlides.length
  const currentSlide = activeSlides[index] || activeSlides[0]

  const goTo = useCallback((i: number) => setIndex(((i % total) + total) % total), [total])
  const next = useCallback(() => setIndex((p) => (p + 1) % total), [total])
  const prev = useCallback(() => setIndex((p) => (p - 1 + total) % total), [total])

  useEffect(() => {
    if (isPaused || total <= 1) return
    const timer = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [isPaused, next, total])

  const ease = [0.16, 1, 0.3, 1] as const

  const contentContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08, delayChildren: 0.1 },
    },
  }

  const childItem = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
  }

  return (
    <section
      id="hero"
      aria-label="Silky Textiles Hero Slider"
      className="relative w-full min-h-[380px] sm:min-h-[460px] md:min-h-[78vh] lg:min-h-[84vh] max-h-[420px] sm:max-h-[500px] md:max-h-none overflow-hidden bg-[#181818] select-none flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Full-Width Background Photography Canvas with Cross-Dissolve & Ken-Burns Zoom */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0 z-0 h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 1.1, ease }}
        >
          <motion.img
            src={currentSlide.image}
            alt={currentSlide.titleLine1}
            className="h-full w-full object-cover object-center"
            initial={{ scale: shouldReduceMotion ? 1 : 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : AUTOPLAY_MS / 1000 + 1, ease: 'linear' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Elegant Atmospheric Overlay Scrim (Ensures Crisp Text Contrast) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg, rgba(24,24,24,0.92) 0%, rgba(24,24,24,0.75) 45%, rgba(24,24,24,0.3) 75%, rgba(24,24,24,0.08) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 90% at 15% 90%, rgba(217,122,66,0.2) 0%, transparent 60%), linear-gradient(to top, rgba(24,24,24,0.6) 0%, transparent 40%)',
        }}
      />

      {/* Outer Circular Navigation Button (<) */}
      <button
        onClick={prev}
        aria-label="Previous Slide"
        className="absolute left-1.5 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-12 sm:h-12 bg-[#D97A42]/90 hover:bg-[#c46833] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
      >
        <ChevronLeft className="w-4 h-4 sm:w-7 sm:h-7 stroke-[2.5]" />
      </button>

      {/* Outer Circular Navigation Button (>) */}
      <button
        onClick={next}
        aria-label="Next Slide"
        className="absolute right-1.5 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-12 sm:h-12 bg-[#D97A42]/90 hover:bg-[#c46833] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
      >
        <ChevronRight className="w-4 h-4 sm:w-7 sm:h-7 stroke-[2.5]" />
      </button>

      {/* Minimal, Spacious Editorial Content Overlay */}
      <div className="relative z-20 max-w-[1380px] mx-auto px-9 sm:px-14 lg:px-16 w-full py-6 sm:py-20 lg:py-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={contentContainer}
            initial="hidden"
            animate="visible"
            className="max-w-2xl text-left"
          >
            {/* Eyebrow Tagline */}
            <motion.div variants={childItem} className="mb-1.5 sm:mb-4">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.16em] sm:tracking-[0.25em] text-[#D97A42] font-sans">
                {currentSlide.tagline}
              </span>
            </motion.div>

            {/* Breathtaking Headline */}
            <motion.h1
              variants={childItem}
              className="text-xl sm:text-4xl md:text-5xl lg:text-[62px] font-black leading-[1.12] sm:leading-[1.06] tracking-tight text-white font-sans"
            >
              {currentSlide.titleLine1}
              <span className="block text-[#D97A42] text-xl sm:text-4xl md:text-5xl lg:text-[62px] font-black mt-0.5 sm:mt-1 drop-shadow-md">
                {currentSlide.highlightText}
              </span>
            </motion.h1>

            {/* Description (2 lines, clean & readable) */}
            <motion.p
              variants={childItem}
              className="mt-2 sm:mt-5 text-[11px] sm:text-base font-medium leading-snug sm:leading-relaxed text-gray-200/90 max-w-xl font-sans line-clamp-2 sm:line-clamp-none"
            >
              {currentSlide.description}
            </motion.p>

            {/* CTAs - Single row side-by-side on mobile */}
            <motion.div variants={childItem} className="mt-3.5 sm:mt-9 flex items-center gap-2 sm:gap-4 flex-nowrap">
              {currentSlide.primaryBtnHref && currentSlide.primaryBtnHref !== '#modal' && currentSlide.primaryBtnHref !== '#quote' ? (
                <a
                  href={currentSlide.primaryBtnHref}
                  className="group inline-flex items-center justify-center gap-1.5 bg-[#D97A42] hover:bg-[#c46833] px-3.5 py-2 sm:px-8 sm:py-4 font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-white shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap shrink-0"
                >
                  <span>{currentSlide.primaryBtnText}</span>
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : (
                <button
                  onClick={onOpenQuoteModal}
                  className="group inline-flex items-center justify-center gap-1.5 bg-[#D97A42] hover:bg-[#c46833] px-3.5 py-2 sm:px-8 sm:py-4 font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-white shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap shrink-0"
                >
                  <span>{currentSlide.primaryBtnText}</span>
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              )}

              <a
                href={currentSlide.secondaryBtnHref || '#services'}
                className="group inline-flex items-center justify-center gap-1 border border-white/40 hover:border-[#D97A42] hover:bg-[#D97A42] px-3 py-2 sm:px-7 sm:py-4 font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-white backdrop-blur-sm transition-all whitespace-nowrap shrink-0"
              >
                <span>{currentSlide.secondaryBtnText}</span>
              </a>
            </motion.div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation Dots & Auto-Play Progress Bar (Bottom Left Gutter) */}
      {total > 1 && (
        <div className="absolute bottom-2.5 sm:bottom-8 left-9 sm:left-12 lg:left-16 z-30 flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {activeSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="group relative h-1.5 sm:h-2.5 overflow-hidden rounded-full transition-all duration-300"
                style={{ width: i === index ? 24 : 6 }}
              >
                <span className="absolute inset-0 rounded-full bg-white/30" />
                {i === index && (
                  <motion.span
                    key={`fill-${index}-${isPaused}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-[#D97A42]"
                    initial={{ width: shouldReduceMotion ? '100%' : '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: shouldReduceMotion || isPaused ? 0 : AUTOPLAY_MS / 1000,
                      ease: 'linear',
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 font-sans hidden sm:inline">
            0{index + 1} / 0{total}
          </span>
        </div>
      )}

    </section>
  )
}

export default HeroSection
