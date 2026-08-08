'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'

interface QuoteFormModalProps {
  isOpen: boolean
  onClose: () => void
}

const industries = [
  'Corporate Enterprise',
  'Hotel & Hospitality',
  'Medical & Healthcare',
  'Construction & Engineering',
  'School & Education',
  'Retail & Supermarket',
  'Individual Tailoring',
  'Other Inquiries',
]

export function QuoteFormModal({ isOpen, onClose }: QuoteFormModalProps) {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto font-inter">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1F2A37]/60 backdrop-blur-xs"
          />

          <div className="min-h-screen px-4 py-8 flex items-center justify-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-2xl bg-[#FFFFFF] border border-[#E5E7EB] rounded-xs shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 bg-[#1F2A37] text-white flex items-center justify-between">
                <div>
                  <h3 className="font-playfair text-2xl font-normal">Request Bulk & Tailoring Quote</h3>
                  <p className="text-xs text-gray-300 font-inter pt-1">Silky Textiles & Garments LLC • Deira Creek, Dubai</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-300 hover:text-white rounded-full transition-colors"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Body Form */}
              <div className="p-6 sm:p-8 space-y-6">
                {sent ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#DE7B3D] text-white flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="font-playfair text-2xl text-[#1F2A37]">Quote Inquiry Received</h4>
                    <p className="text-sm font-inter text-[#6B7280] max-w-md mx-auto">
                      Thank you. Our Dubai account manager will review your specs and contact you within 24 hours. For urgent orders, please call +971 4 226 1050 directly.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false)
                        onClose()
                      }}
                      className="px-6 py-2.5 bg-[#1F2A37] text-white text-xs uppercase font-bold tracking-wider rounded-xs"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-inter font-bold uppercase tracking-wider text-[#1F2A37] mb-1">
                          Full Name *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Your name"
                          className="w-full px-3.5 py-2.5 bg-[#F7F5F2] border border-[#E5E7EB] text-sm text-[#2B2B2B] focus:border-[#DE7B3D] focus:outline-none rounded-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-inter font-bold uppercase tracking-wider text-[#1F2A37] mb-1">
                          Company / Organization *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Company name"
                          className="w-full px-3.5 py-2.5 bg-[#F7F5F2] border border-[#E5E7EB] text-sm text-[#2B2B2B] focus:border-[#DE7B3D] focus:outline-none rounded-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-inter font-bold uppercase tracking-wider text-[#1F2A37] mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+971 50 000 0000"
                          className="w-full px-3.5 py-2.5 bg-[#F7F5F2] border border-[#E5E7EB] text-sm text-[#2B2B2B] focus:border-[#DE7B3D] focus:outline-none rounded-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-inter font-bold uppercase tracking-wider text-[#1F2A37] mb-1">
                          Service Category *
                        </label>
                        <select
                          required
                          defaultValue=""
                          className="w-full px-3.5 py-2.5 bg-[#F7F5F2] border border-[#E5E7EB] text-sm text-[#2B2B2B] focus:border-[#DE7B3D] focus:outline-none rounded-xs"
                        >
                          <option value="" disabled>
                            Select category
                          </option>
                          {industries.map((ind) => (
                            <option key={ind} value={ind}>
                              {ind}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-inter font-bold uppercase tracking-wider text-[#1F2A37] mb-1">
                        Requirements & Quantity Details
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Garment types, quantities, fabric preferences, deadlines..."
                        className="w-full px-3.5 py-2.5 bg-[#F7F5F2] border border-[#E5E7EB] text-sm text-[#2B2B2B] focus:border-[#DE7B3D] focus:outline-none rounded-xs"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="submit"
                        className="h-[46px] px-8 bg-[#DE7B3D] hover:bg-[#C96A30] text-white font-inter font-bold text-xs uppercase tracking-widest rounded-xs transition-colors"
                      >
                        Submit Quotation Request
                      </button>

                      <a
                        href="https://wa.me/97142261050"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs text-[#DE7B3D] font-bold"
                      >
                        <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
                        <span>Instant WhatsApp Quote</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
