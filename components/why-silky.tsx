'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Award, Factory, Scissors, Clock, ShieldCheck } from 'lucide-react'

const defaultPoints = [
  { title: 'Established in 1963', desc: 'Over six decades of master tailoring heritage in Dubai, specializing in custom suiting and enterprise textile supply.' },
  { title: '24-Hour Express Service', desc: 'Rapid express suiting and garment alterations for urgent corporate events, summits, and tight deadlines.' },
  { title: 'Bulk Uniform Production', desc: 'In-house embroidery and garment production facilities capable of delivering large corporate uniform orders across the UAE.' },
  { title: 'Deira Creek Showroom', desc: 'Visit our physical showroom on Baniyas Road in Deira Creek to view fabric swatches and meet our master tailors.' }
]

export function WhySilky({ data }: { data?: any }) {
  const label = data?.label || 'THE SILKY DISTINCTION'
  const title = data?.title || 'Bespoke Tailoring Heritage & Industrial Scale'
  const description = data?.description || 'Since our founding in Dubai in 1963, Silky Textiles has combined old-world master tailoring precision with modern manufacturing capacity to supply uniforms and custom apparel for corporate fleets, luxury hospitality groups, and healthcare facilities.'
  const image = data?.image || '/images/craftsmanship_tailoring.png'
  const pointsList = data?.points?.length > 0 ? data.points : defaultPoints

  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <section id="why-silky" className="bg-[#FAF9F6] text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden select-none">
      
      {/* Dynamic Animated Background Grid Pattern */}
      <motion.div
        animate={{
          backgroundPosition: ['0px 0px', '-24px 24px'],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(217, 122, 66, 0.2) 1px, transparent 1px), radial-gradient(rgba(28, 122, 76, 0.15) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          backgroundPosition: '0 0, 18px 18px',
        }}
      />

      {/* Floating Animated Ambient Glowing Orbs */}
      <motion.div
        animate={{
          x: [0, -35, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-10 w-96 h-96 bg-[#D97A42]/10 rounded-full blur-3xl pointer-events-none"
      />
      
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-[#1C7A4C]/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Image & Floating Atelier Badges (Slides in from LEFT x: -70) */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl group">
              <img
                src={image}
                alt="Master Tailoring & Fabric Craftsmanship Dubai"
                className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[0.96] group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/hero_bespoke_suit.png'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

              {/* Floating Stat Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-xl border border-slate-200 shadow-2xl space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center divide-x divide-slate-200">
                  <div>
                    <span className="block font-serif text-2xl font-black text-slate-900">60+</span>
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#D97A42] font-bold">Years Heritage</span>
                  </div>
                  <div>
                    <span className="block font-serif text-2xl font-black text-[#D97A42]">500+</span>
                    <span className="text-[10px] font-sans uppercase tracking-wider text-slate-600 font-bold">B2B Clients</span>
                  </div>
                  <div>
                    <span className="block font-serif text-2xl font-black text-slate-900">1M+</span>
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#1C7A4C] font-bold">Garments Made</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative & 4 Pillars (Slides in from RIGHT x: 70) */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2">
                <Scissors className="w-4 h-4 text-[#D97A42]" />
                <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#D97A42]">
                  {label}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-slate-900 font-extrabold leading-tight">
                {title}
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed font-medium pt-2">
                {description}
              </p>
            </div>

            {/* 4 Pillars Grid with Scissors Icon for Bespoke Tailoring */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {pointsList.map((pillar: any, idx: number) => {
                const IconComp = pillar.title.includes('Bespoke') || pillar.title.includes('Pattern') ? Scissors : (pillar.icon || ShieldCheck)
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                    className="space-y-2.5 p-5 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl hover:border-[#D97A42]/60 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.25 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        className="w-9 h-9 rounded-lg bg-[#D97A42]/10 border border-[#D97A42]/30 flex items-center justify-center text-[#D97A42] shrink-0 group-hover:bg-[#D97A42] group-hover:text-white transition-all"
                      >
                        <IconComp className="w-4 h-4" />
                      </motion.div>
                      <h3 className="font-serif text-base text-slate-900 font-bold group-hover:text-[#D97A42] transition-colors">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="font-sans text-xs text-slate-600 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  )
}

export default WhySilky
