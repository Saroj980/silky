'use client'

import React, { useState, useEffect } from 'react'
import { Phone, Mail, Clock, Menu, X, ArrowUpRight } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'

interface SiteHeaderProps {
  onOpenQuoteModal?: () => void
  config?: any
}

export function SiteHeader({ onOpenQuoteModal, config }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Default values just in case config is not passed
  const navLinks = config?.navLinks ? JSON.parse(config.navLinks) : [
    { label: 'Home', href: '#' },
    { label: 'Tailoring', href: '#services' },
    { label: 'Textiles', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ]

  const logoUrl = config?.logoUrl || '/silky-logo.png'
  const topBarText = config?.topBarText || 'Serving Dubai Since 1963'
  const phone = config?.phone || '+971 4 226 1050'
  const email = config?.email || 'sales@silky.ae'
  const whatsapp = config?.whatsapp || '97142261050'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200">
      {/* Top Utility Bar (Dark Navy #1F2A37) */}
      <div className="bg-[#1F2A37] text-white text-xs py-2 border-b border-gray-700 font-inter hidden md:block">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 text-[#DE7B3D] font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{topBarText}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-gray-300">
              <Phone className="w-3.5 h-3.5 text-[#DE7B3D]" />
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                {phone}
              </a>
            </div>
            <div className="flex items-center space-x-1.5 text-gray-300">
              <Mail className="w-3.5 h-3.5 text-[#DE7B3D]" />
              <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                {email}
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-[#25D366] hover:text-white font-medium transition-colors"
            >
              <FaWhatsapp className="w-3.5 h-3.5" />
              <span>WhatsApp Inquiries</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div
        className={`bg-[#FFFFFF] transition-all duration-200 ${
          scrolled ? 'shadow-md py-2.5 sm:py-3 border-b border-[#E5E7EB]' : 'py-3 sm:py-4 border-b border-[#E5E7EB]'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-3.5 sm:px-6 flex items-center justify-between gap-2">
          {/* Mobile menu trigger + Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#1F2A37] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a href="#" className="flex flex-col items-start group">
              <img
                src={logoUrl}
                alt={config?.logoAlt || 'Silky Logo'}
                className="h-8 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
              />
              <span className="hidden sm:block text-[8.5px] uppercase tracking-[0.25em] text-[#DE7B3D] font-inter font-bold mt-0.5 whitespace-nowrap">
                BESPOKE TAILORS | UNIFORM SOLUTIONS
              </span>
            </a>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link: any) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-wider font-inter font-medium text-[#1F2A37] hover:text-[#DE7B3D] transition-colors nav-link-underline py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTA Button: Get a Quote */}
          <div className="flex items-center">
            <a
              href="#contact"
              onClick={onOpenQuoteModal}
              className="h-[38px] sm:h-[44px] px-3.5 sm:px-6 bg-[#DE7B3D] hover:bg-[#C96A30] text-white font-inter font-semibold text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest rounded-xs transition-colors duration-180 flex items-center justify-center gap-1 shadow-sm whitespace-nowrap"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#E5E7EB] px-6 py-6 space-y-3 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="text-xs font-inter text-[#DE7B3D] font-bold pb-2 border-b border-gray-100 flex justify-between items-center">
            <span>{topBarText}</span>
          </div>
          {navLinks.map((link: any) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs uppercase tracking-wider font-inter font-medium text-[#1F2A37] hover:text-[#DE7B3D] py-2 border-b border-gray-100"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 text-xs font-inter text-[#6B7280] space-y-1">
            <p className="font-semibold text-[#1F2A37]">Showroom Tel: {phone}</p>
          </div>
        </div>
      )}
    </header>
  )
}
