'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export interface HeroSlideData {
  id: number
  eyebrow: string
  titleLine1: string
  titleLine2: string
  description: string
  image: string
  imageAlt: string
  primaryBtnText: string
  secondaryBtnText: string
  secondaryBtnHref: string
  statLabel?: string
  statValue?: string
}

const DEFAULT_SLIDES: HeroSlideData[] = [
  {
    id: 1,
    eyebrow: 'Bespoke Master Tailoring • Dubai Est. 1963',
    titleLine1: 'Master Craftsmanship',
    titleLine2: 'For The Modern Executive',
    description: 'Handcrafted 2-piece and 3-piece suits, luxury Kanduras, and tuxedo blazers sculpted from Italian Super 150s wools with six decades of Dubai artisan heritage.',
    image: '/images/hero_bespoke_suit.png',
    imageAlt: 'Dubai master tailor hand-stitching bespoke wool suit jacket',
    primaryBtnText: 'Request Custom Quote',
    secondaryBtnText: 'Explore Master Atelier',
    secondaryBtnHref: '#services',
    statLabel: 'Artisan Heritage',
    statValue: '60+ Years'
  },
  {
    id: 2,
    eyebrow: 'Enterprise & Luxury Uniform Solutions',
    titleLine1: 'Architecting Luxury',
    titleLine2: 'Corporate Uniform Systems',
    description: 'Turnkey apparel solutions for UAE luxury hotel chains, corporate fleets, and aviation teams crafted with precision in-house embroidery and climate-adapted fabrics.',
    image: '/images/hero_corporate_uniforms.png',
    imageAlt: 'Corporate executives and hospitality staff in tailored enterprise uniforms',
    primaryBtnText: 'Request Corporate Quote',
    secondaryBtnText: 'View Industry Sectors',
    secondaryBtnHref: '#services',
    statLabel: 'Uniforms Delivered',
    statValue: '500K+'
  },
  {
    id: 3,
    eyebrow: 'Luxury Textile & Wholesale Sourcing',
    titleLine1: 'Pure Italian Super Wools',
    titleLine2: '& Fine Egyptian Cottons',
    description: 'Direct importer of Italian Super wools, pure long-staple Egyptian cottons, and technical fire-retardant enterprise fabrics stored in our Dubai central warehouse.',
    image: '/images/hero_textile_fabrics.png',
    imageAlt: 'High-end Italian wool and cotton textile rolls in showroom',
    primaryBtnText: 'Order Fabric Swatches',
    secondaryBtnText: 'Contact Sourcing Team',
    secondaryBtnHref: '#contact',
    statLabel: 'Natural Fiber Guarantee',
    statValue: '100%'
  }
]

// Animated Counter component that counts up ONLY ONCE on initial mount
function StatNumber({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTimestamp: number | null = null
    const duration = 1600
    let animationFrameId: number

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(easeProgress * target))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    animationFrameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrameId)
  }, [target])

  return (
    <div className="flex flex-col">
      <span className="font-playfair text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
        {count}{suffix}
      </span>
      <span className="font-inter text-[11px] uppercase tracking-wider text-slate-500 font-medium mt-0.5">
        {label}
      </span>
    </div>
  )
}

export function HeroSlider({
  slides,
  onOpenQuoteModal
}: {
  slides?: any[]
  onOpenQuoteModal?: () => void
}) {
  const shouldReduceMotion = useReducedMotion()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  // Map incoming dynamic slides if present, else fallback to DEFAULT_SLIDES
  const formattedSlides: HeroSlideData[] = React.useMemo(() => {
    if (!slides || slides.length === 0) return DEFAULT_SLIDES

    return slides.slice(0, 3).map((s, idx) => {
      const defaultRef = DEFAULT_SLIDES[idx % DEFAULT_SLIDES.length]
      let titleParts = (s.title || defaultRef.titleLine1 + ' ' + defaultRef.titleLine2).split(' & ')
      if (titleParts.length < 2) {
        const words = (s.title || '').split(' ')
        const mid = Math.ceil(words.length / 2)
        titleParts = [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
      }

      return {
        id: s.id || idx + 1,
        eyebrow: s.tagline || defaultRef.eyebrow,
        titleLine1: titleParts[0] || defaultRef.titleLine1,
        titleLine2: titleParts[1] || defaultRef.titleLine2,
        description: s.description || defaultRef.description,
        image: s.image || defaultRef.image,
        imageAlt: s.imageAlt || defaultRef.imageAlt,
        primaryBtnText: s.primaryBtnText || defaultRef.primaryBtnText,
        secondaryBtnText: s.secondaryBtnText || defaultRef.secondaryBtnText,
        secondaryBtnHref: s.secondaryBtnHref || defaultRef.secondaryBtnHref,
        statLabel: defaultRef.statLabel,
        statValue: defaultRef.statValue
      }
    })
  }, [slides])

  const totalSlides = formattedSlides.length

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
    setProgress(0)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    setProgress(0)
  }, [totalSlides])

  const selectSlide = (index: number) => {
    setCurrentSlide(index)
    setProgress(0)
  }

  // Auto-advance timer (6s duration) with smooth progress bar increments
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return

    const intervalTime = 40 // update every 40ms for smooth progress animation
    const totalDuration = 6000 // 6 seconds
    const increment = (intervalTime / totalDuration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide()
          return 0
        }
        return prev + increment
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [isPaused, nextSlide, shouldReduceMotion])

  // Keyboard accessibility (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only react if focus isn't inside an input/textarea
      const activeEl = document.activeElement
      if (activeEl && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName)) {
        return
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  const activeSlideData = formattedSlides[currentSlide] || formattedSlides[0]

  return (
    <section
      ref={heroRef}
      aria-label="Hero Showcase Slider"
      className="relative w-full bg-[#FAF9F6] text-slate-900 overflow-hidden border-b border-slate-200/80 pt-20 lg:pt-24 min-h-[85vh] lg:min-h-[760px] flex items-stretch select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Container split 55 / 45 */}
      <div className="w-full flex flex-col lg:flex-row items-stretch relative">
        
        {/* Left Column: 55% Content (Editorial typography, stats, CTAs) */}
        <div className="w-full lg:w-[55%] xl:w-[52%] px-6 sm:px-12 lg:pl-16 xl:pl-24 lg:pr-16 py-12 sm:py-16 lg:py-24 flex flex-col justify-between z-10">
          
          <div className="space-y-6 sm:space-y-8 max-w-xl">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#DE7B3D]" />
              <span className="font-inter text-xs font-semibold uppercase tracking-[0.2em] text-[#DE7B3D]">
                {activeSlideData.eyebrow}
              </span>
            </div>

            {/* Headline with 2-line Framer Motion Staggered Exit & Entry */}
            <div className="min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] flex flex-col justify-start overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlideData.id || currentSlide}
                  exit={{
                    opacity: 0,
                    y: -12,
                    filter: shouldReduceMotion ? 'none' : 'blur(4px)',
                    transition: { duration: shouldReduceMotion ? 0.15 : 0.35, ease: 'easeIn' }
                  }}
                  className="space-y-1 sm:space-y-2"
                >
                  {/* Line 1 */}
                  <motion.h1
                    initial={{
                      opacity: 0,
                      y: shouldReduceMotion ? 0 : 16,
                      filter: shouldReduceMotion ? 'none' : 'blur(4px)'
                    }}
                    animate={{ opacity: 1, y: 0, filter: 'none' }}
                    transition={{
                      duration: shouldReduceMotion ? 0.15 : 0.45,
                      delay: shouldReduceMotion ? 0 : 0.0,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="font-playfair text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-bold text-slate-900 tracking-tight leading-[1.1]"
                  >
                    {activeSlideData.titleLine1}
                  </motion.h1>

                  {/* Line 2 */}
                  <motion.h1
                    initial={{
                      opacity: 0,
                      y: shouldReduceMotion ? 0 : 16,
                      filter: shouldReduceMotion ? 'none' : 'blur(4px)'
                    }}
                    animate={{ opacity: 1, y: 0, filter: 'none' }}
                    transition={{
                      duration: shouldReduceMotion ? 0.15 : 0.45,
                      delay: shouldReduceMotion ? 0 : 0.08,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="font-playfair text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-bold text-[#DE7B3D] tracking-tight leading-[1.1]"
                  >
                    {activeSlideData.titleLine2}
                  </motion.h1>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description Text */}
            <div className="min-h-[70px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeSlideData.id || currentSlide}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: shouldReduceMotion ? 0.15 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="font-inter text-slate-600 text-sm sm:text-base leading-relaxed font-normal"
                >
                  {activeSlideData.description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Fill-Sweep CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* Primary CTA button with fill-sweep hover */}
              <button
                onClick={onOpenQuoteModal}
                className="relative group overflow-hidden bg-slate-900 text-white px-8 py-4 font-inter text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-3 rounded-none cursor-pointer border border-slate-900 shadow-sm"
              >
                <motion.span
                  className="absolute inset-0 bg-[#DE7B3D] z-0 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: shouldReduceMotion ? 0 : 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
                <span className="relative z-10 flex items-center gap-2 text-white">
                  {activeSlideData.primaryBtnText}
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>

              {/* Secondary CTA button with fill-sweep hover */}
              <a
                href={activeSlideData.secondaryBtnHref}
                className="relative group overflow-hidden bg-transparent text-slate-900 border border-slate-300 px-8 py-4 font-inter text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-3 rounded-none cursor-pointer"
              >
                <motion.span
                  className="absolute inset-0 bg-slate-900 z-0 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: shouldReduceMotion ? 0 : 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                  {activeSlideData.secondaryBtnText}
                </span>
              </a>
            </div>
          </div>

          {/* Stat Strip: Static container where counter counts up ONLY on initial mount */}
          <div className="mt-12 lg:mt-16 pt-8 border-t border-slate-200 grid grid-cols-3 gap-4">
            <StatNumber target={60} suffix="+ Yrs" label="Dubai Craftsmanship" />
            <StatNumber target={500} suffix="K+" label="Uniforms Delivered" />
            <StatNumber target={100} suffix="%" label="Natural Italian Fibers" />
          </div>

        </div>

        {/* Right Column: 45% Tall Image Panel (Bleeding to edge of viewport, sharp high-clarity image) */}
        <div className="w-full lg:w-[45%] xl:w-[48%] lg:absolute lg:top-0 lg:bottom-0 lg:right-0 h-[480px] lg:h-full relative overflow-hidden bg-slate-900">
          
          {/* Incoming Image with Slow Zoom-Out Scale (1.06 to 1.0) & Crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlideData.id || currentSlide}
              initial={{
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 1.06
              }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0.15 : 0.9,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute inset-0 z-0"
            >
              <img
                src={activeSlideData.image}
                alt={activeSlideData.imageAlt}
                className="w-full h-full object-cover object-center filter contrast-[1.03]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Slim Vertical Progress Rail on the left edge of the image panel */}
          <div
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-6 bg-slate-950/80 backdrop-blur-md p-4 border border-white/10 rounded-xs shadow-2xl"
            role="tablist"
            aria-label="Slide Selector Rail"
          >
            {formattedSlides.map((slide, index) => {
              const isActive = currentSlide === index
              const slideNum = (index + 1).toString().padStart(2, '0')

              return (
                <div key={slide.id} className="flex flex-col items-center gap-2 group">
                  {/* Number Label (Clickable directly) */}
                  <button
                    onClick={() => selectSlide(index)}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Select Slide ${slideNum}`}
                    className={`font-inter text-xs font-bold tracking-wider transition-colors duration-200 cursor-pointer ${
                      isActive ? 'text-[#DE7B3D]' : 'text-slate-400 group-hover:text-white'
                    }`}
                  >
                    {slideNum}
                  </button>

                  {/* Slim Vertical Line Track */}
                  <button
                    onClick={() => selectSlide(index)}
                    aria-label={`Jump to slide ${slideNum}`}
                    className="w-1 h-14 bg-white/20 relative overflow-hidden rounded-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#DE7B3D]"
                  >
                    <div
                      className="w-full bg-[#DE7B3D] absolute top-0 left-0 transition-all duration-75"
                      style={{
                        height: isActive ? `${progress}%` : index < currentSlide ? '100%' : '0%'
                      }}
                    />
                  </button>
                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
