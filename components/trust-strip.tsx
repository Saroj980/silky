'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BadgeCheck, Store, Truck, Factory, ShieldCheck } from 'lucide-react'

const items = [
  { icon: BadgeCheck, label: 'EST. 1963 DUBAI', sub: '60+ Years Master Heritage' },
  { icon: Store, label: 'BANIYAS SHOWROOM', sub: 'Fine Fabric Stock & Samples' },
  { icon: Factory, label: 'ISO 9001 FACTORY', sub: 'In-House Embroidery & Fitting' },
  { icon: Truck, label: 'ALL 7 EMIRATES', sub: 'Doorstep Delivery & GCC Shipping' },
  { icon: ShieldCheck, label: '100% QUALITY GUARANTEE', sub: 'Color-Fast & Anti-Shrink' },
]

export function TrustStrip() {
  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <section aria-label="Silky Textiles Credentials" className="bg-[#FAF9F5] text-slate-900 border-b border-slate-200 select-none overflow-hidden">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <ul className="grid grid-cols-2 divide-y divide-slate-200 sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
          {items.map((item, i) => {
            const IconComponent = item.icon
            return (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                whileHover={{ backgroundColor: 'rgba(217, 122, 66, 0.04)' }}
                className="flex items-center gap-3.5 py-6 lg:justify-center lg:border-l lg:border-slate-200 lg:first:border-l-0 px-4 group cursor-pointer transition-all duration-200"
              >
                {/* Animated Lucide Icon Container */}
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.25 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="w-10 h-10 rounded-xl bg-[#D97A42]/10 border border-[#D97A42]/30 flex items-center justify-center shrink-0 group-hover:bg-[#D97A42] transition-colors"
                >
                  <IconComponent className="w-5 h-5 text-[#D97A42] group-hover:text-white transition-colors" />
                </motion.div>

                <div className="flex flex-col">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 group-hover:text-[#D97A42] transition-colors">
                    {item.label}
                  </span>
                  <span className="text-[9px] font-medium text-slate-500 font-sans">
                    {item.sub}
                  </span>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default TrustStrip
