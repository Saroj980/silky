'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Scissors } from 'lucide-react'

const storyTabs = [
  {
    id: 'heritage',
    title: '1963 Heritage',
    heading: 'Six Decades of Dubai Artistry',
    content:
      'Founded in Dubai’s historic trading hub in 1963, SILKY began as an atelier dedicated to hand-crafting imperial robes and royal suiting. For over 60 years, we have preserved the sacred traditions of hand-basting, silk thread embroidery, and bespoke tailoring.',
    statNumber: '63+',
    statLabel: 'Years of Dubai Heritage',
  },
  {
    id: 'silk',
    title: 'Mulberry Silk',
    heading: 'Uncompromising Pure Silk',
    content:
      'We source exclusively grade-6A Mulberry silk cultivated in pristine high-altitude estates, woven to 22-26 Momme weight for unmatched lustre, thermoregulation in Arabian summers, and fluid editorial drape.',
    statNumber: '100%',
    statLabel: 'Grade-6A Organic Mulberry Silk',
  },
  {
    id: 'atelier',
    title: 'Master Atelier',
    heading: 'The DIFC & Jumeirah Workshops',
    content:
      'Every bespoke garment passes through over 40 meticulous hand steps in our private Dubai workshop. Master artisans spend up to 50 hours sculpting individual patterns to deliver a fit as unique as your thumbprint.',
    statNumber: '40+',
    statLabel: 'Hand Steps per Bespoke Piece',
  },
]

export function BrandStory() {
  const [activeTabId, setActiveTabId] = useState<string>('heritage')
  const activeTab = storyTabs.find((t) => t.id === activeTabId) || storyTabs[0]

  return (
    <section id="story" className="py-24 sm:py-36 bg-[#FAFAF8] relative z-10 overflow-hidden">
      {/* Decorative Subtle Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#DE7B3D]/5 rounded-full blur-3xl pointer-events-none transform -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Atelier Photography */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative h-[520px] sm:h-[620px] rounded-xs overflow-hidden border border-[#E5E7EB] shadow-lg group bg-white">
              <img
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop"
                alt="Silky Master Atelier Dubai"
                className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Floating Badge with #00A758 Green Accent */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-xs border border-[#E5E7EB] flex items-center justify-between shadow-xl">
                <div className="space-y-1">
                  <div className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#00A758] font-bold">
                    ROYAL APPOINTMENT
                  </div>
                  <div className="font-cormorant text-xl text-[#1A1A1A]">
                    Dubai Atelier & Tailoring House
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#DE7B3D] flex items-center justify-center text-white shadow-md">
                  <Scissors className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Overlapping Frame Accent */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border-r-2 border-b-2 border-[#DE7B3D]/30 pointer-events-none hidden sm:block" />
          </motion.div>

          {/* Right Column: Story & Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-3">
              <div className="text-[#00A758] text-xs uppercase tracking-[0.3em] font-semibold">
                THE MAISON & CRAFTSMANSHIP
              </div>
              <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-tight">
                Crafting Luxury <br />
                <span className="text-[#DE7B3D] italic font-serif">In Dubai Since 1963</span>
              </h2>
            </div>

            {/* Interactive Story Tabs: Active #DE7B3D, Hover #00A758 */}
            <div className="flex space-x-3 border-b border-[#E5E7EB] pb-3">
              {storyTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 relative ${
                    activeTabId === tab.id
                      ? 'text-[#DE7B3D] font-semibold'
                      : 'text-[#4B5563] hover:text-[#00A758]'
                  }`}
                >
                  {tab.title}
                  {activeTabId === tab.id && (
                    <motion.div
                      layoutId="activeStoryTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#DE7B3D]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <h3 className="font-cormorant text-2xl text-[#DE7B3D] font-light">
                  {activeTab.heading}
                </h3>
                <p className="text-sm sm:text-base text-[#4B5563] font-sans font-light leading-relaxed">
                  {activeTab.content}
                </p>

                {/* Stat Highlight Box */}
                <div className="p-6 bg-white border border-[#E5E7EB] rounded-xs flex items-center space-x-6 shadow-sm">
                  <div className="font-cormorant text-4xl sm:text-5xl text-[#DE7B3D] font-light">
                    {activeTab.statNumber}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#1A1A1A] font-sans font-medium max-w-[200px]">
                    {activeTab.statLabel}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Founder / Artisan Signature Element */}
            <div className="pt-6 border-t border-[#E5E7EB] flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs font-sans tracking-[0.2em] uppercase text-[#1A1A1A] font-medium">
                  H. Al-Mansoor
                </div>
                <div className="text-[11px] text-[#00A758] font-sans tracking-widest uppercase font-medium">
                  Master Artisan & Creative Director
                </div>
              </div>

              {/* Hand-Drawn SVG Signature Graphic */}
              <div className="opacity-90">
                <svg
                  width="160"
                  height="45"
                  viewBox="0 0 160 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-[#DE7B3D]"
                >
                  <path
                    d="M10 32C25 15 40 5 60 22C80 39 100 8 115 28C125 40 140 10 150 20"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M30 38C50 35 110 38 140 32"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
