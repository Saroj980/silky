'use client'

import { HeroSection } from '@/components/home/hero-section'

export function Hero({ slides, onOpenQuoteModal }: { slides?: any[], onOpenQuoteModal?: () => void }) {
  return <HeroSection slides={slides} onOpenQuoteModal={onOpenQuoteModal} />
}

export { HeroSection }
