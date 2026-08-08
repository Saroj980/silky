'use client'

import React from 'react'
import { MapPin, Phone, Mail, FileText, ArrowUpRight } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'

export function SiteFooter() {
  return (
    <footer className="bg-[#1F2A37] text-white pt-20 pb-10 font-inter">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Top 4 Information-Rich Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-gray-700/60">
          
          {/* Column 1: Silky Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#" className="inline-block">
              <img
                src="/silky-logo.png"
                alt="Silky Textiles & Garments LLC Dubai"
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-sm">
              Dubai's premier destination for master bespoke tailoring, high-quality textiles, and corporate uniform manufacturing since 1963.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#DE7B3D] hover:text-white transition-colors">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#DE7B3D] hover:text-white transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#DE7B3D] hover:text-white transition-colors">
                <FaLinkedinIn className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="lg:col-span-2 space-y-5 lg:ml-auto">
            <h4 className="text-[13px] uppercase tracking-widest font-semibold text-white">
              Our Services
            </h4>
            <ul className="space-y-3.5 text-sm text-gray-400">
              <li><a href="#services" className="hover:text-[#DE7B3D] transition-colors inline-block">Bespoke Tailoring</a></li>
              <li><a href="#services" className="hover:text-[#DE7B3D] transition-colors inline-block">Premium Textiles</a></li>
              <li><a href="#uniforms" className="hover:text-[#DE7B3D] transition-colors inline-block">Corporate Uniforms</a></li>
              <li><a href="#uniforms" className="hover:text-[#DE7B3D] transition-colors inline-block">Hotel & Medical</a></li>
              <li><a href="#uniforms" className="hover:text-[#DE7B3D] transition-colors inline-block">Custom Embroidery</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2 space-y-5 lg:mx-auto">
            <h4 className="text-[13px] uppercase tracking-widest font-semibold text-white">
              Company
            </h4>
            <ul className="space-y-3.5 text-sm text-gray-400">
              <li><a href="#heritage" className="hover:text-[#DE7B3D] transition-colors inline-block">Our Heritage</a></li>
              <li><a href="#work" className="hover:text-[#DE7B3D] transition-colors inline-block">Portfolio</a></li>
              <li><a href="#why-silky" className="hover:text-[#DE7B3D] transition-colors inline-block">Why Choose Us</a></li>
              <li><a href="#contact" className="hover:text-[#DE7B3D] transition-colors inline-block">Contact Us</a></li>
              <li><a href="#contact" className="hover:text-[#DE7B3D] transition-colors inline-block text-[#DE7B3D] font-medium">Request Quote</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-[13px] uppercase tracking-widest font-semibold text-white">
              Visit Our Showroom
            </h4>
            <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
              <div className="flex items-start space-x-3 group cursor-pointer">
                <MapPin className="w-5 h-5 text-[#DE7B3D] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">PO Box 792, Deira Creek<br/>Dubai, United Arab Emirates</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-[#DE7B3D] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">+971 4 226 1050 / +971 4 294 6754</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-[#DE7B3D] shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:sales@silky.ae" className="hover:text-white transition-colors">sales@silky.ae</a>
              </div>
            </div>
            
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-600 hover:border-[#DE7B3D] rounded-xs text-sm font-medium hover:bg-[#DE7B3D] hover:text-white transition-all duration-200"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-gray-500">
          <div className="flex items-center space-x-1.5 text-gray-400">
            <FileText className="w-4 h-4" />
            <span>TRN: 10000 253 930 0003</span>
          </div>

          <div className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Silky Textiles & Garments LLC. All rights reserved.
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-[#DE7B3D] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#DE7B3D] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
