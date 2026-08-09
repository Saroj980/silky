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

export function HomePageClient({ heroSlides, config, sections = [] }: { heroSlides: any[], config?: any, sections?: any[] }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)

  // Map section types to components
  const renderSection = (section: any) => {
    if (!section.isActive) return null
    
    let data = {}
    try { data = JSON.parse(section.data) } catch (e) {}

    switch (section.type) {
      case 'HERO':
        return <Hero key={section.id} slides={heroSlides} />
      case 'BRAND_STORY':
        return <BrandStory key={section.id} data={data} />
      case 'CATEGORY_SHOWCASE':
        return <CategoryShowcase key={section.id} data={data} />
      case 'UNIFORM_SOLUTIONS':
        return <UniformSolutions key={section.id} data={data} />
      case 'OUR_WORK':
        return <OurWork key={section.id} data={data} />
      case 'WHY_SILKY':
        return <WhySilky key={section.id} data={data} />
      case 'PROCESS':
        return <ProcessSection key={section.id} data={data} />
      case 'TESTIMONIALS':
        return <Testimonials key={section.id} data={data} />
      case 'CONTACT_BAND':
        return <ContactBand key={section.id} data={data} />
      default:
        return null
    }
  }

  return (
    <div className="bg-[#F7F5F2] text-[#2B2B2B] font-inter antialiased min-h-screen relative selection:bg-[#B38B59] selection:text-white" style={{
      '--color-primary': config?.primaryColor || '#DE7B3D',
      '--color-bg': config?.bgColor || '#F7F5F2',
      '--color-text': config?.textColor || '#1F2A37',
    } as React.CSSProperties}>
      
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --color-primary: ${config?.primaryColor || '#DE7B3D'};
          --color-bg: ${config?.bgColor || '#F7F5F2'};
          --color-text: ${config?.textColor || '#1F2A37'};
        }
        .bg-\\[\\#DE7B3D\\] {
          background-color: var(--color-primary) !important;
        }
        .text-\\[\\#DE7B3D\\] {
          color: var(--color-primary) !important;
        }
        .border-\\[\\#DE7B3D\\] {
          border-color: var(--color-primary) !important;
        }
        .hover\\:bg-\\[\\#C96A30\\]:hover {
          background-color: var(--color-primary) !important;
          filter: brightness(0.9);
        }
      `}} />

      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1F2A37] focus:text-white text-xs font-inter font-medium rounded-xs"
      >
        Skip to main content
      </a>

      {/* Main Sticky Header */}
      <SiteHeader onOpenQuoteModal={() => setIsQuoteOpen(true)} config={config} />

      {/* Main Page Flow */}
      <main id="main-content" className="relative z-0">
        {sections.length > 0 ? (
          sections.map(renderSection)
        ) : (
          // Fallback just in case
          <>
            <Hero slides={heroSlides} />
            <BrandStory />
            <CategoryShowcase />
            <UniformSolutions />
            <OurWork />
            <WhySilky />
            <ProcessSection />
            <Testimonials />
            <ContactBand />
          </>
        )}
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
