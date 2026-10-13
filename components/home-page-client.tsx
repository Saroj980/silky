'use client'

import React, { useState, useEffect } from 'react'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { TrustStrip } from '@/components/trust-strip'
import { BrandStory } from '@/components/brand-story'
import { CategoryShowcase } from '@/components/category-showcase'
import { UniformSolutions } from '@/components/uniform-solutions'
import { OurWork } from '@/components/our-work'
import { WhySilky } from '@/components/why-silky'
import { ProcessSection } from '@/components/process'
import { Testimonials } from '@/components/testimonials'
import { ContactBand } from '@/components/contact-band'
import { SiteFooter } from '@/components/site-footer'
import { QuoteFormModal } from '@/components/quote-form'
import { FaWhatsapp } from 'react-icons/fa6'

export function HomePageClient({ heroSlides, config, sections = [] }: { heroSlides: any[], config?: any, sections?: any[] }) {
  const [slides, setSlides] = useState<any[]>(heroSlides || [])
  const [siteConfig, setSiteConfig] = useState<any>(config || null)
  const [activeSections, setActiveSections] = useState<any[]>(sections || [])
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)

  // Synchronize when initial props change
  useEffect(() => {
    if (heroSlides && heroSlides.length > 0) setSlides(heroSlides)
  }, [heroSlides])

  useEffect(() => {
    if (config) setSiteConfig(config)
  }, [config])

  useEffect(() => {
    if (sections && sections.length > 0) setActiveSections(sections)
  }, [sections])

  // Live client-side auto-sync to ensure changes saved in Admin reflect immediately without rebuild
  useEffect(() => {
    let isMounted = true
    // 1. Fetch live hero slides
    fetch('/api/hero-slides', { cache: 'no-store' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const parsed = data.map((s: any) => ({
            ...s,
            trustBadges: typeof s.trustBadges === 'string' ? JSON.parse(s.trustBadges || '[]') : s.trustBadges,
          }))
          setSlides(parsed)
        }
      })
      .catch(() => {})

    // 2. Fetch live site config
    fetch('/api/site-config', { cache: 'no-store' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (isMounted && data && typeof data === 'object') {
          setSiteConfig(data)
        }
      })
      .catch(() => {})

    // 3. Fetch live page sections
    fetch('/api/page-sections', { cache: 'no-store' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const active = data.filter((s: any) => s.isActive)
          if (active.length > 0) {
            setActiveSections(active)
          }
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  // Track rendered section types to guarantee ZERO duplicates on homepage
  const renderedTypes = new Set<string>()

  // Section renderer guaranteeing clean 1-to-1 section rendering without duplicates
  const renderSection = (section: any) => {
    if (!section || !section.isActive) return null

    let data = {}
    if (typeof section.data === 'object' && section.data !== null) {
      data = section.data
    } else if (typeof section.data === 'string') {
      try { data = JSON.parse(section.data) } catch (e) {}
    }

    switch (section.type) {
      case 'HERO':
        if (renderedTypes.has('HERO')) return null
        renderedTypes.add('HERO')
        return <Hero key={section.id} slides={slides} onOpenQuoteModal={() => setIsQuoteOpen(true)} />
      
      case 'BRAND_STORY':
        if (renderedTypes.has('BRAND_STORY')) return null
        renderedTypes.add('BRAND_STORY')
        return <BrandStory key={section.id} data={data} />

      case 'CATEGORY_SHOWCASE':
        if (renderedTypes.has('CATEGORY_SHOWCASE')) return null
        renderedTypes.add('CATEGORY_SHOWCASE')
        return <CategoryShowcase key={section.id} data={data} onOpenQuoteModal={() => setIsQuoteOpen(true)} />
      
      case 'UNIFORM_SOLUTIONS':
        if (renderedTypes.has('UNIFORM_SOLUTIONS')) return null
        renderedTypes.add('UNIFORM_SOLUTIONS')
        return <UniformSolutions key={section.id} data={data} />

      case 'OUR_WORK':
        if (renderedTypes.has('OUR_WORK')) return null
        renderedTypes.add('OUR_WORK')
        return <OurWork key={section.id} data={data} />

      case 'WHY_SILKY':
        if (renderedTypes.has('WHY_SILKY')) return null
        renderedTypes.add('WHY_SILKY')
        return <WhySilky key={section.id} data={data} />

      case 'PROCESS':
        if (renderedTypes.has('PROCESS')) return null
        renderedTypes.add('PROCESS')
        return <ProcessSection key={section.id} data={data} />

      case 'TESTIMONIALS':
        if (renderedTypes.has('TESTIMONIALS')) return null
        renderedTypes.add('TESTIMONIALS')
        return <Testimonials key={section.id} data={data} />

      case 'CONTACT_BAND':
        if (renderedTypes.has('CONTACT_BAND')) return null
        renderedTypes.add('CONTACT_BAND')
        return <ContactBand key={section.id} data={data} onOpenQuoteModal={() => setIsQuoteOpen(true)} />
      
      default:
        return null
    }
  }

  return (
    <div className="bg-[#FAF9F6] text-slate-800 font-sans antialiased min-h-screen relative selection:bg-[#D97A42] selection:text-white">
      
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#141414] focus:text-white text-xs font-sans font-medium"
      >
        Skip to main content
      </a>

      {/* Main Navigation Header */}
      <SiteHeader onOpenQuoteModal={() => setIsQuoteOpen(true)} config={siteConfig} />

      {/* Main Page Flow (Guaranteed Non-Duplicated Sections) */}
      <main id="main-content" className="relative z-0">
        {activeSections && activeSections.length > 0 ? (
          <>
            {activeSections.map(renderSection)}
          </>
        ) : (
          <>
            <Hero slides={slides} onOpenQuoteModal={() => setIsQuoteOpen(true)} />
            <TrustStrip />
            <BrandStory />
            <CategoryShowcase onOpenQuoteModal={() => setIsQuoteOpen(true)} />
            <UniformSolutions />
            <OurWork />
            <WhySilky />
            <ProcessSection />
            <Testimonials />
            <ContactBand onOpenQuoteModal={() => setIsQuoteOpen(true)} />
          </>
        )}
      </main>

      {/* Site Footer */}
      <SiteFooter config={siteConfig} />

      {/* Quote Request Modal */}
      <QuoteFormModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />

      {/* Floating WhatsApp Concierge Button */}
      <a
        href="https://wa.me/97142261050"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 p-3.5 bg-[#25D366] hover:bg-[#1eb857] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
        title="WhatsApp Direct Concierge"
        aria-label="WhatsApp Inquiry"
      >
        <FaWhatsapp className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 border-2 border-white rounded-full animate-pulse" />
      </a>
    </div>
  )
}

export default HomePageClient
