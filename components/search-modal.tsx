'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const popularSearches = [
  'Mulberry Silk Gowns',
  'Super 150s Suits',
  'Hotel Executive Uniforms',
  'Bespoke Abayas',
  'Linen Jackets',
]

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-2xl bg-[#111827] border border-gray-800 rounded-xs shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 text-white"
        >
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div className="flex items-center space-x-3 flex-1">
              <Search className="w-6 h-6 text-[#DE7B3D]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Mulberry silks, bespoke tailoring, corporate uniforms..."
                className="w-full bg-transparent text-white font-cormorant text-xl sm:text-2xl placeholder:text-gray-400 outline-none"
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-[#DE7B3D] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.2em] text-[#00A758] font-mono font-bold">
              Popular Searches in Dubai:
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 bg-gray-900 border border-gray-800 hover:border-[#DE7B3D] text-xs font-sans text-gray-300 hover:text-[#DE7B3D] rounded-full transition-all"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
