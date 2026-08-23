'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Phone, MapPin, Mail, ArrowRight } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'

export function ContactBand({ data, onOpenQuoteModal }: { data?: any, onOpenQuoteModal?: () => void }) {
  const label = data?.label || 'DUBAI SHOWROOM & ATELIER HEADQUARTERS'
  const title = data?.title || 'Elevate Your Corporate Identity Today'
  const buildingName = data?.buildingName || 'Showroom No. 1, Al Zarooni Building'
  const address = data?.address || 'Next to HBL, Baniyas Road (D85), Deira Creek, Dubai, UAE'
  const phone = data?.phone || '+971 4 355 8453'
  const email = data?.email || 'sales@silky.ae'

  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <section id="contact" className="bg-[#FAF9F5] text-slate-900 py-20 lg:py-24 border-b border-slate-200 relative overflow-hidden select-none">
      
      {/* Subtle Ambient Brand Glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] bg-[#D97A42]/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Details (Slides in from LEFT x: -70) */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2">
                <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#D97A42]">
                  {label}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-slate-900 font-extrabold leading-tight">
                {title}
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-medium">
                Get custom fabric swatches, volume pricing, and personalized design consultation directly from our Dubai master tailoring specialists.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-sans text-xs text-slate-700">
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className="flex items-start space-x-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-[#D97A42]/50 hover:shadow-md transition-colors cursor-pointer group"
              >
                <motion.div whileHover={{ rotate: 12, scale: 1.25 }}>
                  <MapPin className="w-4 h-4 text-[#D97A42] shrink-0 mt-0.5" />
                </motion.div>
                <div>
                  <p className="font-bold text-slate-900 group-hover:text-[#D97A42] transition-colors">{buildingName}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{address}</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className="flex items-start space-x-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-[#D97A42]/50 hover:shadow-md transition-colors cursor-pointer group"
              >
                <motion.div whileHover={{ rotate: 12, scale: 1.25 }}>
                  <Phone className="w-4 h-4 text-[#D97A42] shrink-0 mt-0.5" />
                </motion.div>
                <div>
                  <p className="font-bold text-slate-900 group-hover:text-[#D97A42] transition-colors">Direct Line & Sales</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{phone} • {email}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Action Buttons (Slides in from RIGHT x: 70) */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="lg:col-span-5 flex flex-col gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenQuoteModal}
              className="h-[54px] px-8 bg-[#D97A42] hover:bg-[#c46833] text-white font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-full flex items-center justify-center gap-2.5 shadow-xl"
            >
              <span>Request Custom Quote & Swatches</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <a
              href="https://wa.me/97142261050"
              target="_blank"
              rel="noopener noreferrer"
              className="h-[54px] px-8 bg-[#25D366] hover:bg-[#1eb857] text-white font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-full flex items-center justify-center gap-2.5 shadow-xl hover:scale-105"
            >
              <FaWhatsapp className="w-4 h-4 text-white" />
              <span>WhatsApp Direct Concierge</span>
            </a>

            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="h-[54px] px-8 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-full flex items-center justify-center gap-2 text-center shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#D97A42]" />
              <span>Call Showroom ({phone})</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default ContactBand
