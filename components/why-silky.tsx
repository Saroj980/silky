'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Scissors,
  Feather,
  Crown,
  PackageCheck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award
} from 'lucide-react'

const features = [
  {
    icon: Feather,
    title: 'Imperial Fabric Selection',
    description:
      'Direct sourcing of grade-6A Mulberry silk (24 Momme), Super 150s Italian Merino wool, and organic Giza cotton for absolute tactile luxury.',
    tag: 'Grade 6A Certified',
    bullets: ['Pure 24-Momme Mulberry Silk', 'Super 150s Italian Wool'],
  },
  {
    icon: Scissors,
    title: 'Bespoke Architectural Fit',
    description:
      'Merging 3D laser body scanning with traditional Savile Row hand-basting. Every coat is sculpted to your exact natural posture.',
    tag: 'Hand-Basted Canvas',
    bullets: ['3D Precision Laser Scanning', '40+ Hours Master Stitching'],
  },
  {
    icon: Crown,
    title: 'Dubai Master Artisans',
    description:
      'Crafted exclusively in our DIFC & Jumeirah flagships by master tailors with over two decades of royal tailoring experience.',
    tag: 'Dubai Atelier 1963',
    bullets: ['DIFC & Jumeirah Workshops', 'Royal Appointment Since 1963'],
  },
  {
    icon: PackageCheck,
    title: 'White-Glove Concierge',
    description:
      'Express insured delivery across UAE, GCC, London, Paris, and New York with signature luxury presentation unboxing.',
    tag: 'VIP Courier Delivery',
    bullets: ['Complimentary UAE Courier', 'Luxury Gift Unboxing'],
  },
]

export function WhySilky() {
  return (
    <section className="py-24 sm:py-36 bg-[#FAFAF8] relative z-10 overflow-hidden">
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DE7B3D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A758]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center justify-center text-[#00A758] text-xs uppercase tracking-[0.3em] font-semibold px-4 py-1.5 bg-[#00A758]/10 border border-[#00A758]/30 rounded-full">
            SAVILE ROW & DUBAI ATELIER STANDARDS
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-tight">
            Why Discerning Clients <br className="hidden sm:inline" />
            <span className="text-[#DE7B3D] italic font-serif">Choose Silky</span>
          </h2>

          <p className="text-sm sm:text-base text-[#4B5563] font-sans font-light max-w-xl mx-auto leading-relaxed">
            Our unwavering commitment to textile purity, artisanal precision, and bespoke luxury service across the Middle East.
          </p>
        </div>

        {/* 4 Top-Level Bespoke Tailor Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                whileHover={{ y: -8 }}
                className="group p-8 bg-white border border-[#E5E7EB] rounded-2xl hover:border-[#DE7B3D] transition-all duration-500 shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(222,123,61,0.15)] flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Corner Watermark Highlight */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#DE7B3D]/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#DE7B3D]/20 transition-all duration-500" />

                <div className="space-y-6 relative z-10">
                  {/* Top Row: Bespoke Icon Badge & Green Seal */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-[#DE7B3D]/10 border border-[#DE7B3D]/25 flex items-center justify-center text-[#DE7B3D] group-hover:bg-[#DE7B3D] group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-[0_8px_25px_rgba(222,123,61,0.45)]">
                      <IconComponent className="w-7 h-7 stroke-[1.8]" />
                    </div>

                    <span className="inline-flex items-center gap-1 text-[9.5px] uppercase tracking-widest text-[#00A758] font-mono font-bold bg-[#00A758]/10 border border-[#00A758]/30 px-2.5 py-1 rounded-full shadow-xs">
                      <CheckCircle2 className="w-3 h-3 text-[#00A758]" />
                      {feature.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3 pt-2">
                    <h3 className="font-cormorant text-2xl text-[#1A1A1A] font-light leading-snug group-hover:text-[#DE7B3D] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4B5563] font-sans font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Feature Bullets */}
                  <div className="pt-3 space-y-2 border-t border-gray-100">
                    {feature.bullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-sans text-[#1A1A1A] font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#00A758] shrink-0" />
                        <span className="text-[11px] text-[#4B5563]">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Action Button */}
                <div className="pt-6 mt-6 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#DE7B3D] font-sans tracking-widest uppercase font-semibold relative z-10">
                  <span>Explore Standard</span>
                  <div className="w-8 h-8 rounded-full bg-[#DE7B3D]/10 group-hover:bg-[#DE7B3D] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
