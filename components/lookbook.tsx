'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, X, ArrowUpRight, Camera } from 'lucide-react'

const lookbookItems = [
  {
    id: 1,
    title: 'The Desert Dunes Sunset Edit',
    season: 'SS26 Couture',
    location: 'Bab Al Shams, Dubai',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    aspect: 'h-[440px]',
  },
  {
    id: 2,
    title: 'DIFC Executive Evening Gala',
    season: 'Winter Capsule',
    location: 'Gate Avenue, Dubai',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
    aspect: 'h-[560px]',
  },
  {
    id: 3,
    title: 'Royal Silk Resortwear',
    season: 'High Summer',
    location: 'Bulgari Resort Dubai',
    image:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop',
    aspect: 'h-[480px]',
  },
  {
    id: 4,
    title: 'Bespoke Velvet Suiting',
    season: 'Autunno Haute',
    location: 'Silky Jumeirah Atelier',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop',
    aspect: 'h-[520px]',
  },
  {
    id: 5,
    title: 'Modern Emirati Couture',
    season: 'Signature Line',
    location: 'Al Fahidi Heritage Quarter',
    image:
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
    aspect: 'h-[440px]',
  },
  {
    id: 6,
    title: 'Aviation & Concierge Elegance',
    season: 'Uniform Identity',
    location: 'Private Aviation Hangar, Dubai',
    image:
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
    aspect: 'h-[480px]',
  },
]

export function Lookbook() {
  const [activeItem, setActiveItem] = useState<(typeof lookbookItems)[0] | null>(null)

  return (
    <section id="lookbook" className="py-24 sm:py-36 bg-[#FAFAF8] relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="text-[#00A758] text-xs uppercase tracking-[0.3em] font-semibold">
              EDITORIAL ARCHIVE
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A]">
              The Dubai <span className="text-[#DE7B3D] italic font-serif">Lookbook '26</span>
            </h2>
          </div>
          <p className="text-sm text-[#4B5563] font-sans max-w-md leading-relaxed">
            Captured across Dubai’s iconic architectural landmarks—from private yachts in Dubai Marina to the tranquil dunes of Al Maha.
          </p>
        </div>

        {/* Asymmetrical Masonry Grid: Card border #E5E7EB, hover border #DE7B3D */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {lookbookItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              onClick={() => setActiveItem(item)}
              className={`relative ${item.aspect} break-inside-avoid rounded-xs overflow-hidden border border-[#E5E7EB] group cursor-pointer hover:border-[#DE7B3D] transition-all duration-500 shadow-sm hover:shadow-xl`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05] transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Dark Overlay for Overlay Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Top Details: Secondary Green #00A758 Badge */}
              <div className="absolute top-5 left-5 right-5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-3 py-1 bg-[#00A758] text-white text-[10px] uppercase font-mono tracking-widest rounded-xs shadow-sm">
                  {item.season}
                </span>
                <div className="w-9 h-9 rounded-full bg-[#DE7B3D] flex items-center justify-center text-white shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-6 left-6 right-6 space-y-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-1.5 text-[11px] text-[#00A758] font-sans tracking-widest uppercase font-semibold">
                  <Camera className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
                <h3 className="font-cormorant text-2xl sm:text-3xl text-white font-light">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full max-h-[85vh] bg-white border border-[#E5E7EB] rounded-xs overflow-hidden flex flex-col md:flex-row shadow-2xl text-[#1A1A1A]"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-white/80 backdrop-blur-md text-[#1A1A1A] hover:text-[#DE7B3D] rounded-full border border-[#E5E7EB]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="md:w-2/3 h-96 md:h-auto bg-[#FAFAF8]">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:w-1/3 p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#00A758] font-mono font-bold">
                    {activeItem.season}
                  </span>
                  <h3 className="font-cormorant text-3xl text-[#1A1A1A] font-light">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs text-[#4B5563] font-sans leading-relaxed">
                    Location: {activeItem.location}. Styled with Silky 2026 Haute Couture Mulberry silk.
                  </p>
                </div>

                <a
                  href="#story"
                  onClick={() => setActiveItem(null)}
                  className="py-3 bg-[#DE7B3D] hover:bg-[#C96A30] text-white text-xs font-sans uppercase font-medium tracking-[0.2em] rounded-xs text-center flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Request Lookbook Stylist</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
