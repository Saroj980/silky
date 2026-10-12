'use client'

import React from 'react'
import { MapPin, Phone, Mail, FileText, ArrowUpRight } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'

export function SiteFooter() {
  return (
    <footer className="bg-[#0A0F1D] text-slate-300 pt-16 sm:pt-20 pb-10 sm:pb-12 font-inter border-t border-slate-800">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
        
        {/* Top 4 Information Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-slate-800/80">
          
          {/* Column 1: Silky Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#" className="inline-block">
              <img
                src="/silky-logo.png"
                alt="Silky Textiles & Garments LLC Dubai"
                className="h-14 sm:h-16 w-auto object-contain brightness-110"
              />
            </a>
            <p className="text-xs text-slate-400 font-normal leading-relaxed max-w-sm">
              Dubai's premier destination for master bespoke tailoring, high-quality textiles, and corporate uniform manufacturing since 1963.
            </p>
            <div className="flex items-center space-x-3 pt-1">
              <a href="#" className="w-8 h-8 rounded-none bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#B38B59] hover:text-white transition-colors">
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-none bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#B38B59] hover:text-white transition-colors">
                <FaInstagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-none bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#B38B59] hover:text-white transition-colors">
                <FaLinkedinIn className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Sectors */}
          <div className="lg:col-span-2 space-y-5 lg:ml-auto">
            <h4 className="text-[11px] uppercase tracking-widest font-semibold text-white">
              Sectors
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li><a href="/products/pure-cotton-shirts-supplier-in-uae" className="hover:text-[#B38B59] transition-colors inline-block">100% Pure Cotton Shirting</a></li>
              <li><a href="/products/pure-cotton-shirts-supplier-in-uae" className="hover:text-[#B38B59] transition-colors inline-block">Corporate & Executive</a></li>
              <li><a href="/products/pure-cotton-shirts-supplier-in-uae" className="hover:text-[#B38B59] transition-colors inline-block">Hospitality & Dining</a></li>
              <li><a href="/products/pure-cotton-shirts-supplier-in-uae" className="hover:text-[#B38B59] transition-colors inline-block">Healthcare & Clinical</a></li>
              <li><a href="/products/pure-cotton-shirts-supplier-in-uae" className="hover:text-[#B38B59] transition-colors inline-block">Embroidery Branding</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2 space-y-5 lg:mx-auto">
            <h4 className="text-[11px] uppercase tracking-widest font-semibold text-white">
              Company
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li><a href="/" className="hover:text-[#B38B59] transition-colors inline-block">Our Heritage</a></li>
              <li><a href="/" className="hover:text-[#B38B59] transition-colors inline-block">ISO Certification</a></li>
              <li><a href="/" className="hover:text-[#B38B59] transition-colors inline-block">Why Choose Silky</a></li>
              <li><a href="/products/pure-cotton-shirts-supplier-in-uae" className="hover:text-[#B38B59] transition-colors inline-block">Dubai Showroom</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-[11px] uppercase tracking-widest font-semibold text-white">
              Showroom Location
            </h4>
            <div className="space-y-3.5 text-xs text-slate-400 leading-relaxed">
              <div className="flex items-start space-x-3 group">
                <MapPin className="w-4 h-4 text-[#B38B59] shrink-0 mt-0.5" />
                <span>Baniyas Road (D85), Deira Creek<br/>PO Box 792, Dubai, UAE</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone className="w-4 h-4 text-[#B38B59] shrink-0" />
                <span>+971 4 226 1050</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="w-4 h-4 text-[#B38B59] shrink-0" />
                <a href="mailto:sales@silky.ae" className="hover:text-white transition-colors">sales@silky.ae</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2 text-slate-400">
            <FileText className="w-3.5 h-3.5 text-[#B38B59]" />
            <span>TRN: 10000 253 930 0003</span>
          </div>

          <div className="text-center md:text-left text-slate-400">
            &copy; {new Date().getFullYear()} Silky Textiles & Garments LLC. All rights reserved.
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-[#B38B59] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#B38B59] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

