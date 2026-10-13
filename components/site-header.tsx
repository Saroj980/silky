'use client'

import React, { useState, useEffect } from 'react'
import { Phone, ChevronDown, Menu, X, ArrowRight, CheckCircle2 } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { motion, AnimatePresence } from 'framer-motion'

export interface NavItem {
  id: string
  title: string
  url: string
  badge?: string
  children?: NavItem[]
}

interface SiteHeaderProps {
  onOpenQuoteModal?: () => void
  config?: any
}

function parseNavItems(raw: any): NavItem[] {
  if (!raw) return []
  let parsed = raw
  if (typeof raw === 'string') {
    try {
      parsed = JSON.parse(raw)
    } catch {
      return []
    }
  }
  if (Array.isArray(parsed) && parsed.length > 0) {
    return parsed.map((item: any, idx: number) => ({
      id: String(item.id || `nav-${idx}-${item.title}`),
      title: String(item.title || ''),
      url: String(item.url || '#'),
      badge: item.badge ? String(item.badge) : undefined,
      children: Array.isArray(item.children)
        ? item.children.map((child: any, cIdx: number) => ({
            id: String(child.id || `sub-${cIdx}-${child.title}`),
            title: String(child.title || ''),
            url: String(child.url || '#'),
            badge: child.badge ? String(child.badge) : undefined,
          }))
        : [],
    }))
  }
  return []
}

const DEFAULT_NAV: NavItem[] = [
  { id: 'm-home', title: 'HOME', url: '/' },
  { id: 'm-uniform-fleets', title: 'UNIFORM FLEETS', url: '/products/pure-cotton-shirts-supplier-in-uae' },
  { id: 'm-custom-apparel', title: 'CUSTOM APPAREL', url: '#' },
  { id: 'm-contact', title: 'CONTACT US', url: '/contact-us' },
]

export function SiteHeader({ onOpenQuoteModal, config: initialConfig }: SiteHeaderProps) {
  const [config, setConfig] = useState<any>(initialConfig)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null)
  const [hoveredMenuId, setHoveredMenuId] = useState<string | null>(null)
  const [navItems, setNavItems] = useState<NavItem[]>(() => {
    const initial = parseNavItems(initialConfig?.navLinks)
    return initial.length > 0 ? initial : DEFAULT_NAV
  })

  // Synchronize when initialConfig prop changes
  useEffect(() => {
    if (initialConfig) {
      setConfig(initialConfig)
      if (initialConfig.navLinks) {
        const parsed = parseNavItems(initialConfig.navLinks)
        if (parsed.length > 0) {
          setNavItems(parsed)
        }
      }
    }
  }, [initialConfig])

  // Client-side auto-sync to ensure changes saved in Admin reflect in real-time
  useEffect(() => {
    fetch('/api/site-config', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setConfig(data)
          if (data.navLinks) {
            const parsed = parseNavItems(data.navLinks)
            if (parsed.length > 0) {
              setNavItems(parsed)
            }
          }
        }
      })
      .catch(() => {})
  }, [])

  const logoUrl = config?.logoUrl || '/silky-logo.png'
  const phone = config?.phone || '+971 4 355 8453'
  const whatsapp = config?.whatsapp || '97142261050'

  // Active mega menu parent
  const activeParent = hoveredMenuId ? navItems.find((n) => n.id === hoveredMenuId && n.children && n.children.length > 0) : null

  // Featured Spotlight dynamically based on active item
  const firstChild = activeParent?.children?.[0]
  const featuredTitle = activeParent?.title || 'UNIFORM FLEETS'
  const featuredHref = firstChild?.url || activeParent?.url || '/products/pure-cotton-shirts-supplier-in-uae'
  const featuredImage = activeParent?.title?.toLowerCase().includes('apparel')
    ? '/images/slide-polo.png'
    : '/images/textile_fabric_rolls.png'

  return (
    <header
      className="sticky top-0 left-0 right-0 z-50 w-full font-sans select-none"
      onMouseLeave={() => setHoveredMenuId(null)}
    >
      {/* Executive Top Announcement & Credentials Bar (#141414) */}
      <div className="bg-[#141414] text-gray-300 text-xs py-2 px-4 sm:px-8 border-b border-[#262626]">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          {/* Left Trust Statement */}
          <div className="flex items-center space-x-2 text-gray-300 font-medium overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-[#1C7A4C] animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">
              {config?.topBarText || 'Dubai Master Atelier (Est. 1963) • ISO 9001:2015 Certified'}
            </span>
          </div>

          {/* Right Direct Contacts & WhatsApp Pill */}
          <div className="flex items-center space-x-3 sm:space-x-5 shrink-0">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="hidden md:flex items-center space-x-1.5 text-xs text-gray-300 hover:text-[#D97A42] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#D97A42]" />
              <span>{phone}</span>
            </a>

            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366]/10 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white px-2.5 sm:px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-all shadow-xs"
            >
              <FaWhatsapp className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar (#1A1A1A) */}
      <div className="bg-[#1A1A1A]/95 backdrop-blur-xl text-white border-b border-[#292929] py-3.5 px-4 sm:px-8 shadow-2xl relative">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-6">
          {/* Mobile Menu Toggle & Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-gray-300 hover:text-[#D97A42] focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Pure Logo Image Only */}
            <a href="/" className="flex items-center group">
              <img
                src={logoUrl}
                alt={config?.logoAlt || 'Silky Logo'}
                className="h-10 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Master Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-3 xl:space-x-5 text-xs font-black tracking-widest uppercase">
            {navItems.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0)
              const isOpen = hoveredMenuId === item.id

              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => {
                    if (hasChildren) setHoveredMenuId(item.id)
                    else setHoveredMenuId(null)
                  }}
                >
                  <a
                    href={hasChildren && item.url === '#' ? '#' : item.url}
                    onClick={(e) => {
                      if (hasChildren && item.url === '#') {
                        e.preventDefault()
                        setHoveredMenuId(isOpen ? null : item.id)
                      }
                    }}
                    className={`relative cursor-pointer transition-all duration-200 flex items-center gap-1.5 ${
                      isOpen
                        ? 'bg-[#D97A42] text-white px-5 py-2 rounded-full font-bold shadow-md'
                        : 'text-gray-200 hover:text-[#D97A42] py-2 px-3.5 font-bold'
                    }`}
                  >
                    <span>{item.title}</span>
                    {hasChildren && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-white' : 'text-gray-400'
                        }`}
                      />
                    )}
                  </a>
                </div>
              )
            })}
          </nav>

          {/* Right Action: Request Quote Button */}
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenQuoteModal}
              className="bg-[#D97A42] hover:bg-[#c46833] text-white font-bold text-xs uppercase tracking-widest px-6 sm:px-7 py-3 rounded-full shadow-lg shadow-[#D97A42]/20 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

        {/* Full-Width Luxury Executive Mega-Menu Popover */}
        <AnimatePresence>
          {activeParent && activeParent.children && activeParent.children.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 top-full bg-[#FAF9F5] border-t-4 border-[#D97A42] border-b border-slate-300 shadow-2xl z-50 text-slate-900"
            >
              <div className="max-w-[1400px] mx-auto p-8 lg:p-10">
                {/* 2-Column Main Structure: 70% Sub-Items, 30% Featured Card */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pb-8 border-b border-slate-200">
                  {/* Left Section (70%): Dynamic sub-items from CMS Menu Manager (Zero Fake Items) */}
                  <div className="flex-1 min-w-0 pr-0 lg:pr-10 lg:border-r border-slate-200">
                    <div className="flex items-center gap-2 mb-8">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1C7A4C]" />
                      <h3 className="text-xs font-black uppercase tracking-widest text-[#D97A42] font-sans">
                        {activeParent.title}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                      {activeParent.children.map((sub) => (
                        <a
                          key={sub.id}
                          href={sub.url}
                          className="group flex items-center justify-between text-sm font-extrabold text-slate-900 hover:text-[#D97A42] transition-colors py-1.5"
                        >
                          <span className="truncate">{sub.title}</span>
                          {sub.badge && (
                            <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#1C7A4C] text-white rounded-full ml-2 shrink-0">
                              {sub.badge}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Right Section (30%): Featured Spotlight Card */}
                  <div className="w-full lg:w-80 shrink-0">
                    <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200 p-6 group shadow-md hover:shadow-xl transition-all flex flex-col justify-between h-full min-h-[320px]">
                      <div>
                        <div className="absolute top-4 left-4 z-10">
                          <span className="text-[9px] font-black uppercase tracking-wider bg-[#D97A42] text-white px-3 py-1 rounded-full shadow-sm">
                            FEATURED
                          </span>
                        </div>

                        {/* Spotlight Image */}
                        <div className="w-full h-44 rounded-xl overflow-hidden mb-4 relative bg-slate-100">
                          <img
                            src={featuredImage}
                            alt={featuredTitle}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none'
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>

                        <h4 className="text-base font-extrabold text-slate-900 group-hover:text-[#D97A42] transition-colors font-serif">
                          {featuredTitle}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1.5 font-sans leading-relaxed">
                          Enterprise uniform solutions.
                        </p>
                      </div>

                      <a
                        href={featuredHref}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D97A42] mt-4 group-hover:translate-x-1 transition-transform"
                      >
                        <span>Explore Collection</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom Trust Strip */}
                <div className="pt-4 flex items-center justify-between text-xs text-slate-600 font-sans flex-wrap gap-4">
                  <div className="flex items-center space-x-6 flex-wrap gap-y-2">
                    <span className="flex items-center gap-1.5 font-bold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#1C7A4C]" />
                      <span>60+ Years Master Atelier Heritage</span>
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#1C7A4C]" />
                      <span>Free Fabric Swatch Book Available</span>
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#1C7A4C]" />
                      <span>Doorstep Employee Fitting Across 7 Emirates</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenQuoteModal}
                    className="font-bold text-[#D97A42] hover:underline uppercase text-[11px] tracking-wider cursor-pointer"
                  >
                    VISIT DUBAI SHOWROOM →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#141414] border-b border-[#292929] text-white px-6 py-6 space-y-4"
          >
            <div className="space-y-2">
              {navItems.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0)
                const isExpanded = mobileExpandedId === item.id

                return (
                  <div key={item.id} className="border-b border-[#262626] pb-2">
                    <div className="flex items-center justify-between">
                      <a
                        href={hasChildren && item.url === '#' ? '#' : item.url}
                        onClick={(e) => {
                          if (hasChildren && item.url === '#') {
                            e.preventDefault()
                            setMobileExpandedId(isExpanded ? null : item.id)
                          } else {
                            setMobileMenuOpen(false)
                          }
                        }}
                        className="text-sm font-bold text-gray-200 hover:text-[#D97A42] flex-1 py-1"
                      >
                        {item.title}
                      </a>
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => setMobileExpandedId(isExpanded ? null : item.id)}
                          className="p-1.5 text-gray-400 hover:text-[#D97A42] cursor-pointer"
                          aria-label={`Toggle ${item.title}`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[#D97A42]' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Accordion Sub-items */}
                    <AnimatePresence>
                      {hasChildren && isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 pl-3 space-y-1.5 border-l-2 border-[#D97A42]/50"
                        >
                          {item.children!.map((child) => (
                            <a
                              key={child.id}
                              href={child.url}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block text-xs font-semibold text-gray-300 hover:text-[#D97A42] py-1.5 transition-colors"
                            >
                              {child.title}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false)
                if (onOpenQuoteModal) onOpenQuoteModal()
              }}
              className="w-full py-3.5 bg-[#D97A42] hover:bg-[#c46833] text-white font-bold text-xs uppercase tracking-widest rounded-full flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default SiteHeader
