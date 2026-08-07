'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Shield, Mail } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section id="newsletter" className="py-24 bg-[#FAFAF8] text-[#1A1A1A] relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative rounded-xs border border-[#E5E7EB] p-8 sm:p-16 lg:p-20 overflow-hidden bg-white shadow-xl">
          {/* Subtle Decorative Lines */}
          <div className="absolute top-0 right-0 w-96 h-96 border-r-2 border-t-2 border-[#DE7B3D]/10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 border-l-2 border-b-2 border-[#00A758]/10 pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
            {/* Tagline Badge: Secondary Green #00A758 */}
            <div className="inline-flex items-center justify-center text-[#00A758] text-xs font-semibold uppercase tracking-[0.3em] px-4 py-1.5 bg-[#00A758]/10 border border-[#00A758]/30 rounded-full">
              PRIVATE CLIENT MEMBERSHIP
            </div>

            {/* Headline */}
            <h2 className="font-cormorant text-4xl sm:text-6xl font-light text-[#1A1A1A] leading-tight">
              Join the <span className="italic font-serif text-[#DE7B3D]">Silky Circle</span>
            </h2>

            {/* Subheadline */}
            <p className="text-sm sm:text-base text-[#4B5563] font-sans font-light max-w-xl mx-auto leading-relaxed">
              Receive private invitations to seasonal trunk shows, bespoke tailoring pop-ups in DIFC, and early access to handcrafted Mulberry silk capsule editions.
            </p>

            {/* Subscription Form */}
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-[#FAFAF8] text-[#1A1A1A] rounded-xs border border-[#00A758] max-w-md mx-auto space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-center space-x-2 text-[#00A758]">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-cormorant text-xl font-light text-[#1A1A1A]">Welcome to the Circle</span>
                </div>
                <p className="text-xs text-[#4B5563] font-sans">
                  A private welcome invitation has been dispatched to <span className="text-[#DE7B3D] font-medium">{email}</span>.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#DE7B3D]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your VIP email address..."
                    className="w-full pl-11 pr-4 py-4 bg-white text-[#1A1A1A] border border-[#D1D5DB] focus:border-[#DE7B3D] focus:ring-2 focus:ring-[rgba(222,123,61,0.2)] rounded-xs text-xs sm:text-sm font-sans placeholder:text-[#6B7280] transition-all outline-none"
                  />
                </div>

                {/* Primary Button: background #DE7B3D, text white, hover #C96A30 */}
                <button
                  type="submit"
                  className="group px-8 py-4 bg-[#DE7B3D] hover:bg-[#C96A30] text-white font-sans font-medium text-xs uppercase tracking-[0.25em] rounded-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

            {/* Fine Print */}
            <div className="flex items-center justify-center gap-6 text-[11px] text-[#6B7280] font-sans">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#00A758]" /> Strictly Confidential
              </span>
              <span>•</span>
              <span>No Spam Guarantee</span>
              <span>•</span>
              <span>Unsubscribe Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
