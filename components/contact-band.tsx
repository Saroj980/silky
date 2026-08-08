'use client'

import React from 'react'
import { Phone, MapPin, Mail, Navigation } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'

export function ContactBand() {
  return (
    <section id="contact" className="bg-[#1F2A37] text-white py-20 border-b border-gray-800">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] font-inter font-bold text-[#DE7B3D] block">
                DUBAI SHOWROOM & HEADQUARTERS
              </span>
              <h2 className="font-playfair text-[34px] text-white font-normal leading-tight">
                Visit Our Deira Creek Showroom
              </h2>
            </div>

            <div className="space-y-3 font-inter text-sm text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#DE7B3D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Showroom No. 1, Al Zarooni Building</p>
                  <p className="text-xs text-gray-400">Next to HBL, Baniyas Road (D85), Deira Creek, Dubai, UAE</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#DE7B3D] shrink-0" />
                <span>+971 4 226 1050 / +971 4 294 6754</span>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#DE7B3D] shrink-0" />
                <a href="mailto:sales@silky.ae" className="hover:text-[#DE7B3D]">sales@silky.ae</a>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center">
            <a
              href="tel:+97142261050"
              className="h-[48px] px-8 bg-[#DE7B3D] hover:bg-[#C96A30] text-white font-inter font-semibold text-xs uppercase tracking-widest rounded-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now (+971 4 226 1050)</span>
            </a>

            <a
              href="https://wa.me/97142261050"
              target="_blank"
              rel="noopener noreferrer"
              className="h-[48px] px-8 bg-[#25D366] hover:bg-[#1eb857] text-white font-inter font-semibold text-xs uppercase tracking-widest rounded-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>

            <a
              href="https://maps.google.com/?q=Baniyas+Road+Deira+Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="h-[48px] px-8 bg-transparent hover:bg-white/10 text-white border border-white/30 font-inter font-semibold text-xs uppercase tracking-widest rounded-xs transition-colors flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
