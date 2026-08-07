'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, ExternalLink } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa6'

const instaPosts = [
  {
    id: 1,
    likes: '1.4k',
    comments: '88',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    tag: '#SilkyCouture',
  },
  {
    id: 2,
    likes: '2.1k',
    comments: '142',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    tag: '#DIFCSuits',
  },
  {
    id: 3,
    likes: '980',
    comments: '64',
    image:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
    tag: '#DubaiSilk',
  },
  {
    id: 4,
    likes: '3.2k',
    comments: '210',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
    tag: '#BespokeAtelier',
  },
  {
    id: 5,
    likes: '1.8k',
    comments: '95',
    image:
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
    tag: '#EmiratiFashion',
  },
  {
    id: 6,
    likes: '2.7k',
    comments: '176',
    image:
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop',
    tag: '#LuxuryUniforms',
  },
]

export function SocialGallery() {
  return (
    <section className="py-24 bg-[#FAFAF8] relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="text-[#00A758] text-xs uppercase tracking-[0.3em] font-semibold">
              THE DIGITAL DIARY
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-[#1A1A1A]">
              Live From <span className="text-[#DE7B3D] italic font-serif">@silkydubai</span>
            </h2>
          </div>

          {/* Secondary Button: border #00A758, text #00A758, hover background #00A758, text white */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-3 px-6 py-3.5 bg-transparent hover:bg-[#00A758] text-[#00A758] hover:text-white border border-[#00A758] rounded-xs font-sans text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 self-start sm:self-auto shadow-sm"
          >
            <FaInstagram className="w-4 h-4" />
            <span>Follow @silkydubai</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 6 Square Grid Photos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {instaPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative aspect-square rounded-xs overflow-hidden border border-[#E5E7EB] bg-white hover:border-[#DE7B3D] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <img
                src={post.image}
                alt="Silky Dubai Instagram"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Dark Overlay with Stats */}
              <div className="absolute inset-0 bg-[#111827]/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-3 p-4 text-white">
                <FaInstagram className="w-6 h-6 text-[#DE7B3D]" />

                <div className="flex items-center space-x-4 text-xs font-sans font-medium">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-[#00A758]" />
                    {post.comments}
                  </span>
                </div>

                <span className="text-[10px] uppercase font-mono tracking-widest text-[#DE7B3D]">
                  {post.tag}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
