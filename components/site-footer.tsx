'use client'

import React from 'react'
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  FileText
} from 'lucide-react'
import { FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp } from 'react-icons/fa6'

export function SiteFooter() {
  return (
    <footer id="footer" className="bg-[#111827] text-white pt-20 pb-12 border-t border-gray-800 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-gray-800">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#" className="inline-flex flex-col items-start group">
              <img
                src="/silky-logo.png"
                alt="Silky Textiles & Garments LLC Dubai"
                className="h-11 sm:h-13 w-auto object-contain group-hover:scale-105 transition-all duration-300"
              />
              <span className="text-[9px] uppercase tracking-[0.4em] text-[#DE7B3D] block font-bold mt-1">
                DUBAI • ESTABLISHED 1963
              </span>
            </a>

            <p className="text-xs sm:text-sm text-[#D1D5DB] font-light leading-relaxed max-w-sm">
              Silky Textiles & Garments LLC has provided master bespoke tailoring, premium suit fabrics, kanduras, and enterprise uniform solutions across Dubai and the UAE since 1963.
            </p>

            {/* Direct WhatsApp Concierge Button */}
            <a
              href="https://api.whatsapp.com/send?phone=97142261050"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2.5 px-5 py-3 bg-transparent hover:bg-[#00A758] text-[#00A758] hover:text-white border border-[#00A758] rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>WhatsApp Direct Ordering (+971 4 226 1050)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Core Categories */}
          <div className="space-y-4">
            <h4 className="font-cormorant text-xl text-white font-light">
              Bespoke & Textiles
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D1D5DB]">
              <li>
                <a href="#story" className="hover:text-[#DE7B3D] transition-colors">
                  Bespoke Men's Suits Dubai
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#DE7B3D] transition-colors">
                  Women's Tailored Suits
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#DE7B3D] transition-colors">
                  Italian Suit & Tuxedo Fabrics
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#DE7B3D] transition-colors">
                  Kandura & Safari Suit Fabrics
                </a>
              </li>
              <li>
                <a href="#new-arrivals" className="hover:text-[#DE7B3D] transition-colors">
                  Custom Shirts, Cuffs & Collars
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#DE7B3D] transition-colors">
                  24 Hours Express Tailoring
                </a>
              </li>
            </ul>
          </div>

          {/* Enterprise & Uniforms */}
          <div className="space-y-4">
            <h4 className="font-cormorant text-xl text-white font-light">
              Uniform Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D1D5DB]">
              <li>
                <a href="#categories" className="hover:text-[#DE7B3D] transition-colors">
                  Hotel & Restaurant Chef Uniforms
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#DE7B3D] transition-colors">
                  Corporate & Pilot Polo Shirts
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#DE7B3D] transition-colors">
                  Security, Army & Workwear Coveralls
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-[#DE7B3D] transition-colors">
                  Digital Printing & Sublimation
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-[#DE7B3D] transition-colors">
                  Custom Embroidery Services Dubai
                </a>
              </li>
              <li>
                <a href="#why-silky" className="hover:text-[#DE7B3D] transition-colors">
                  Sustainable Organic Recycled Fabrics
                </a>
              </li>
            </ul>
          </div>

          {/* Showroom & Real Contact Details from Silky.ae */}
          <div className="space-y-4">
            <h4 className="font-cormorant text-xl text-white font-light">
              Dubai Headquarters
            </h4>
            <div className="space-y-3 text-xs text-[#D1D5DB] leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00A758] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Silky Textiles & Garments LLC</strong><br />
                  P.O. Box 792, Dubai, United Arab Emirates
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00A758] shrink-0" />
                <span>+971 4 226 1050 / +971 4 294 6754</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaWhatsapp className="w-4 h-4 text-[#00A758] shrink-0" />
                <span>Bulk Inquiry: +971 50 7499 310</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00A758] shrink-0" />
                <a href="mailto:sales@silky.ae" className="hover:text-[#DE7B3D]">
                  sales@silky.ae / uniforms@silky.ae
                </a>
              </div>
              <div className="flex items-center gap-2.5 pt-1 text-[11px] text-[#00A758]">
                <FileText className="w-3.5 h-3.5 text-[#00A758] shrink-0" />
                <span>TRN: 10000 253 930 0003</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Socials, Payments, and Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400 font-sans">
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a
              href="https://facebook.com/Silkytex"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-gray-900 border border-gray-800 text-gray-300 hover:text-[#DE7B3D] rounded-full transition-colors"
              aria-label="Facebook"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-gray-900 border border-gray-800 text-gray-300 hover:text-[#DE7B3D] rounded-full transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-gray-900 border border-gray-800 text-gray-300 hover:text-[#DE7B3D] rounded-full transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright Line */}
          <div className="text-center md:text-left text-gray-400">
            © {new Date().getFullYear()} SILKY TEXTILES & GARMENTS LLC. All rights reserved. Registered trademark in Dubai, UAE.
          </div>

          {/* Official Payment Method Icon Badges */}
          <div className="flex items-center space-x-2.5">
            {/* VISA */}
            <div
              className="h-8 px-2.5 bg-white rounded-sm flex items-center justify-center border border-gray-700 shadow-xs"
              title="Visa"
            >
              <svg className="h-4 w-auto" viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.882 0.386L9.08 11.53H6.012L3.642 2.454C3.504 1.894 3.09 1.48 2.538 1.182C1.664 0.7 0.446 0.354 0 0.238L0.068 0.386H5.064C5.73 0.386 6.304 0.826 6.442 1.54L7.682 8.162L10.742 0.386H13.882ZM25.438 8.278C25.46 5.674 21.848 5.534 21.87 3.966C21.892 3.486 22.352 2.97 23.364 2.836C23.864 2.766 25.26 2.716 26.792 3.424L27.42 0.518C26.554 0.208 25.438 0 24.036 0C21.116 0 19.046 1.548 19.024 3.734C19.002 5.372 20.474 6.284 21.584 6.828C22.72 7.378 23.104 7.732 23.098 8.228C23.092 8.986 22.188 9.324 21.344 9.336C19.824 9.358 18.956 8.932 18.236 8.602L17.586 11.602C18.42 11.986 19.96 12.316 21.554 12.338C24.664 12.338 26.688 10.8 26.716 8.442M34.336 11.53H37L34.674 0.386H32.328C31.754 0.386 31.272 0.718 31.06 1.228L26.544 11.53H29.742L30.38 9.774H34.304L34.674 11.53M31.272 7.316L32.882 2.89L33.792 7.316H31.272ZM18.72 0.386L16.272 11.53H13.238L15.686 0.386H18.72Z"
                  fill="#1A1F71"
                />
              </svg>
            </div>

            {/* MASTERCARD */}
            <div
              className="h-8 px-2 bg-white rounded-sm flex items-center justify-center border border-gray-700 shadow-xs"
              title="Mastercard"
            >
              <svg className="h-5 w-auto" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="7" fill="#EB001B" />
                <circle cx="16" cy="8" r="7" fill="#F79E1B" />
                <path
                  d="M12 2.378a6.974 6.974 0 00-2.585 5.622A6.974 6.974 0 0012 13.622a6.974 6.974 0 002.585-5.622A6.974 6.974 0 0012 2.378z"
                  fill="#FF5F00"
                />
              </svg>
            </div>

            {/* AMERICAN EXPRESS */}
            <div
              className="h-8 px-2 bg-[#006FCF] text-white font-bold text-[10px] tracking-tighter rounded-sm flex items-center justify-center border border-gray-700 shadow-xs"
              title="American Express"
            >
              AMEX
            </div>

            {/* APPLE PAY */}
            <div
              className="h-8 px-2.5 bg-black text-white rounded-sm flex items-center justify-center space-x-1 border border-gray-700 shadow-xs"
              title="Apple Pay"
            >
              <svg className="h-3.5 w-auto fill-current text-white" viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.82.25-9.75-1.78-14.78-6.1-3.32-2.88-7.27-7.65-11.85-14.33-6.57-9.58-11.64-20.2-15.22-31.86-3.58-11.66-5.37-22.86-5.37-33.6 0-14.28 3.52-25.86 10.56-34.74 7.04-8.88 15.93-13.41 26.67-13.59 4.82 0 9.94 1.18 15.36 3.54 5.42 2.36 9.17 3.63 11.25 3.82 2.45 0 6.4-1.34 11.85-4.02 5.45-2.68 10.37-3.9 14.76-3.67 11.58.74 20.81 4.96 27.69 12.67-10.29 6.25-15.35 15.01-15.17 26.28.18 8.87 3.55 16.27 10.11 22.2 6.56 5.93 14.41 9.25 23.55 9.96-2.52 7.54-5.9 14.93-10.14 22.17zM119.22 31.84c0-6.84 2.53-13.42 7.58-19.74 5.06-6.32 11.51-10.42 19.37-12.3 0.61 6.84-1.84 13.51-7.34 20.01-5.5 6.5-12.01 10.42-19.61 12.03z" />
              </svg>
              <span className="font-semibold text-xs tracking-tight text-white">Pay</span>
            </div>

            {/* TABBY */}
            <div
              className="h-8 px-2.5 bg-[#3BFFC3] text-black font-extrabold text-xs tracking-tight rounded-sm flex items-center justify-center border border-gray-700 shadow-xs"
              title="Tabby - Buy Now Pay Later"
            >
              tabby
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
