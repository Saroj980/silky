'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Send, ShieldCheck, Clock, UserCheck } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'

interface QuoteFormModalProps {
  isOpen: boolean
  onClose: () => void
}

const productCategories = [
  'Pure Cotton Shirts',
  'Corporate Uniform Fleets',
  'Hotel Front-Desk Wear',
  'Medical Scrubs & Lab Coats',
  'Custom Embroidery & Monograms',
]

export function QuoteFormModal({ isOpen, onClose }: QuoteFormModalProps) {
  const [sent, setSent] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Pure Cotton Shirts'])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat))
    } else {
      setSelectedCategories([...selectedCategories, cat])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
          />

          <div className="min-h-screen px-4 py-6 sm:py-10 flex items-center justify-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: B2B Luxury Quote Form */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 text-white bg-slate-900 relative z-10">
                
                {/* Header */}
                <div className="space-y-1.5 border-b border-slate-800 pb-4">
                  <div className="inline-flex items-center space-x-2 bg-[#D97A42]/20 border border-[#D97A42]/40 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97A42] animate-ping" />
                    <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#D97A42]">
                      EXPRESS QUOTATION
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-black text-white leading-tight">
                    Get A Free Quote
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    Tell us about your needs & we will get back to you with a quote.
                  </p>
                </div>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-5"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#1C7A4C]/20 border border-[#1C7A4C]/50 text-[#1C7A4C] flex items-center justify-center mx-auto shadow-xl">
                      <Check className="w-8 h-8" />
                    </div>
                    <h4 className="font-serif text-2xl font-black text-white">Quote Request Received!</h4>
                    <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                      Thank you <span className="text-[#D97A42] font-bold">{formData.name || 'valued client'}</span>. Our Dubai sales team will prepare your quotation and contact you within 2 hours.
                    </p>
                    <div className="pt-3">
                      <button
                        onClick={() => {
                          setSent(false)
                          onClose()
                        }}
                        className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                      >
                        Return To Page
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Inputs Grid */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-sans font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                          Name *
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 rounded-xl focus:border-[#D97A42] focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-sans font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                            Email *
                          </label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Email"
                            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 rounded-xl focus:border-[#D97A42] focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-sans font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                            Work Phone Number *
                          </label>
                          <input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Work Phone Number"
                            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 rounded-xl focus:border-[#D97A42] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Product Category Selector Pills */}
                      <div>
                        <label className="block text-[10px] font-sans font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                          Select Product Requirements:
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {productCategories.map((cat) => {
                            const selected = selectedCategories.includes(cat)
                            return (
                              <button
                                type="button"
                                key={cat}
                                onClick={() => toggleCategory(cat)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-sans font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                  selected
                                    ? 'bg-[#D97A42] text-white shadow-md'
                                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${selected ? 'bg-white' : 'bg-slate-600'}`} />
                                <span>{cat}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Message Textarea */}
                      <div>
                        <label className="block text-[10px] font-sans font-extrabold uppercase tracking-wider text-slate-300 mb-1">
                          Any Additional Message:
                        </label>
                        <textarea
                          rows={2}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your needs..."
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 rounded-xl focus:border-[#D97A42] focus:outline-none transition-colors resize-none"
                        />
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full sm:w-auto px-7 py-3.5 bg-[#D97A42] hover:bg-[#c46833] text-white font-sans font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Get Quotation</span>
                        <Send className="w-3.5 h-3.5" />
                      </motion.button>

                      <a
                        href="https://wa.me/97142261050"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#25D366] font-bold hover:underline"
                      >
                        <FaWhatsapp className="w-4 h-4" />
                        <span>Instant WhatsApp Direct</span>
                      </a>
                    </div>
                  </form>
                )}

              </div>

              {/* Right Column: High-End Dubai Fleet Showcase Overlay (Unlike generic Apparel Point) */}
              <div className="hidden lg:block lg:col-span-5 relative bg-slate-950 border-l border-slate-800 overflow-hidden">
                <img
                  src="/images/hotel_uniform_luxury.png"
                  alt="Silky Textiles Dubai Uniform Fleet"
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Floating Trust Overlay Badges */}
                <div className="absolute bottom-6 left-6 right-6 space-y-3">
                  <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-2xl space-y-2 shadow-2xl">
                    <div className="flex items-center gap-2 text-[#D97A42]">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-white">
                        ISO 9001:2015 CERTIFIED
                      </span>
                    </div>
                    <p className="text-[11px] font-sans text-slate-300 font-medium leading-relaxed">
                      100% Combed Egyptian Cotton guaranteed. Free sample swatch cards delivered across Dubai within 24 hours.
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
