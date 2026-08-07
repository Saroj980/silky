'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowRight
} from 'lucide-react'

interface SiteHeaderProps {
  cartCount?: number
  wishlistCount?: number
  onOpenSearch?: () => void
  onOpenCart?: () => void
  onOpenWishlist?: () => void
}

export function SiteHeader({
  cartCount = 2,
  wishlistCount = 3,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Exact 9 heading menu items from original website
  const navLinksLeft = [
    { label: 'HOME', href: '#' },
    { label: 'BESPOKE TAILORS', href: '#story' },
    { label: 'TEXTILES', href: '#categories' },
    { label: 'TAILORING', href: '#story' },
    { label: 'GARMENTS', href: '#new-arrivals' },
  ]

  const navLinksRight = [
    { label: 'UNIFORMS', href: '#categories' },
    { label: 'CATALOG', href: '#new-arrivals' },
    { label: 'OUR WORK', href: '#lookbook' },
    { label: 'CONTACT US', href: '#footer' },
  ]

  const allNavLinks = [...navLinksLeft, ...navLinksRight]

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'top-0 sm:top-3 px-0 sm:px-4 lg:px-8'
          : 'top-0 sm:top-4 px-0 sm:px-4 lg:px-8'
      }`}
    >
      <div
        className={`max-w-[1600px] mx-auto transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-2xl border-b sm:border border-[#E5E7EB] sm:rounded-full px-3 sm:px-8 py-2 sm:py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.09)]'
            : 'bg-[#FAFAF8]/92 backdrop-blur-xl border-b sm:border border-[#E5E7EB]/90 sm:rounded-full px-3 sm:px-8 py-2.5 sm:py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
        }`}
      >
        <div className="flex items-center justify-between gap-1 sm:gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#1A1A1A] hover:text-[#00A758] transition-colors rounded-full hover:bg-gray-100/80 focus:outline-none shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>

          {/* Desktop Left Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-5 2xl:space-x-7">
            {navLinksLeft.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-[11px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] hover:text-[#00A758] transition-colors duration-300 group py-1 whitespace-nowrap"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#DE7B3D] transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </nav>

          {/* Center Logo with Responsive Height */}
          <div className="flex flex-col items-center justify-center text-center shrink-0 mx-1 sm:mx-2">
            <a href="#" className="group inline-flex flex-col items-center justify-center">
              <img
                src="/silky-logo.png"
                alt="SILKY DUBAI"
                className="h-8 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-xs"
              />
              <span className="text-[7.5px] sm:text-[8px] uppercase tracking-[0.35em] text-[#DE7B3D] block mt-0.5 font-sans font-bold whitespace-nowrap">
                DUBAI • ATELIER 1963
              </span>
            </a>
          </div>

          {/* Right Navigation Links & Responsive Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-5 2xl:space-x-7">
            <nav className="hidden xl:flex items-center space-x-5 2xl:space-x-7">
              {navLinksRight.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative text-[11px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] hover:text-[#00A758] transition-colors duration-300 group py-1 whitespace-nowrap"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#DE7B3D] transition-all duration-300 group-hover:w-full rounded-full" />
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-1.5 sm:space-x-3.5 pl-1.5 sm:pl-3 border-l border-gray-200/80">
              {/* Search Button */}
              <button
                onClick={onOpenSearch}
                className="p-2 sm:p-2.5 text-[#DE7B3D] hover:text-[#00A758] hover:bg-gray-100/80 rounded-full transition-all duration-300 relative group"
                title="Search Collections"
              >
                <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[2]" />
                <span className="sr-only">Search</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={onOpenWishlist}
                className="p-2 sm:p-2.5 text-[#DE7B3D] hover:text-[#00A758] hover:bg-gray-100/80 rounded-full transition-all duration-300 relative group"
                title="View Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[2]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 bg-[#00A758] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                    {wishlistCount}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={onOpenCart}
                className="px-2.5 py-1.5 sm:px-4 sm:py-2.5 bg-gradient-to-r from-[#DE7B3D] to-[#C96A30] hover:from-[#C96A30] hover:to-[#DE7B3D] text-white border border-[#DE7B3D]/30 rounded-full transition-all duration-300 flex items-center gap-1.5 sm:gap-2 group shadow-[0_4px_16px_rgba(222,123,61,0.38)] hover:shadow-[0_6px_24px_rgba(222,123,61,0.5)] active:scale-95"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[11px] sm:text-xs font-bold tracking-wider">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Touch-optimized Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="xl:hidden bg-white/98 backdrop-blur-2xl text-[#1A1A1A] border-b border-[#E5E7EB] shadow-2xl overflow-hidden mt-2 rounded-b-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="px-6 py-6 space-y-6 max-w-lg mx-auto">
              <div className="space-y-2 border-b border-gray-200 pb-5">
                {allNavLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-sm sm:text-base font-sans tracking-widest uppercase font-bold text-[#1A1A1A] hover:text-[#00A758] transition-colors py-2 active:bg-gray-50 px-2 rounded-xs"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#00A758]" />
                  </a>
                ))}
              </div>

              <div className="space-y-3 pt-1 text-xs text-[#4B5563] font-sans">
                <div className="flex justify-between items-center text-[#DE7B3D]">
                  <span className="font-bold">Dubai DIFC Flagship Atelier</span>
                  <span>Gate Avenue, Villa 14</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Showroom Phone & WhatsApp</span>
                  <a href="tel:+97142261050" className="underline hover:text-[#DE7B3D] font-bold">
                    +971 4 226 1050
                  </a>
                </div>
                <div className="pt-3 flex gap-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      onOpenCart?.()
                    }}
                    className="flex-1 py-3 bg-[#DE7B3D] hover:bg-[#C96A30] text-white font-bold uppercase tracking-widest text-xs rounded-full text-center font-sans shadow-lg active:scale-98 transition-transform"
                  >
                    View Shopping Bag ({cartCount})
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
