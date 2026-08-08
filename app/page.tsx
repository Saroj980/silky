'use client'

import React, { useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
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

export default function HomePage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)

  return (
    <div className="bg-[#F7F5F2] text-[#2B2B2B] font-inter antialiased min-h-screen relative selection:bg-[#B38B59] selection:text-white">
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1F2A37] focus:text-white text-xs font-inter font-medium rounded-xs"
      >
        Skip to main content
      </a>

      {/* Main Sticky Header */}
      <SiteHeader onOpenQuoteModal={() => setIsQuoteOpen(true)} />

      {/* Main Page Flow */}
      <main id="main-content" className="relative z-0">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Heritage Section (1963) */}
        <BrandStory />

        {/* 3. Services Section */}
        <CategoryShowcase />

        {/* 4. Uniform Solutions Section */}
        <UniformSolutions />

        {/* 5. Our Work Section */}
        <OurWork />

        {/* 6. Why Choose Silky Section */}
        <WhySilky />

        {/* 7. Process Section */}
        <ProcessSection />

        {/* 8. Testimonials Section */}
        <Testimonials />

        {/* 9. Contact CTA Band */}
        <ContactBand />
      </main>

      {/* 10. Information-Rich Footer */}
      <SiteFooter />

      {/* Quote Form Modal */}
      <QuoteFormModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />

      {/* Floating WhatsApp Button for Direct Inquiries */}
      <a
        href="https://wa.me/97142261050"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-3.5 bg-[#25D366] hover:bg-[#1eb857] text-white rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 flex items-center justify-center"
        title="WhatsApp Direct Concierge"
        aria-label="WhatsApp Inquiry"
      >
        <FaWhatsapp className="w-6 h-6" />
      </a>
    </div>
  )
}
