'use client'

import React, { useState } from 'react'
import { Phone, ChevronDown, Menu, X, ArrowRight, Scissors, Ruler, Award, ChevronRight, Clock, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { motion, AnimatePresence } from 'framer-motion'

interface MegaMenuData {
  title: string
  subCategories: Array<{ name: string; tag?: string; href: string }>
  popularItems: Array<{ name: string; detail: string; href: string; icon: React.ElementType }>
  featured: {
    title: string
    subtitle: string
    image: string
    badge: string
    href: string
  }
}

// Exactly 3 Master Pillar Categories consolidating ALL product sectors & tailoring services
const MEGA_MENUS: Record<string, MegaMenuData> = {
  'UNIFORM FLEETS': {
    title: 'Commercial & Fleet Uniform Solutions',
    subCategories: [
      { name: '100% Pure Cotton Shirts', tag: 'Egyptian Cotton', href: '/products/pure-cotton-shirts-supplier-in-uae' },
      { name: 'Oxford Button-Down Shirts', tag: 'Pinpoint Weave', href: '/products/oxford-shirts-supplier-in-uae' },
      { name: 'Poly Cotton Shirts', tag: 'Easy Care', href: '/products/poly-cotton-shirts-supplier-in-uae' },
      { name: 'Twill Shirts', tag: 'Durable Weave', href: '/products/twill-shirts-supplier-in-uae' },
      { name: 'Corporate Uniforms', tag: 'Executive Fleets', href: '/products/corporate-uniforms-supplier-in-uae' },
      { name: 'Healthcare Uniforms', tag: 'Medical Scrubs', href: '/products/healthcare-uniforms-supplier-in-uae' },
      { name: 'F&B & Restaurant Apparel', tag: 'Stain Resistant', href: '/products/fb-uniforms-supplier-in-uae' },
      { name: 'Hospitality & Hotel Fleets', tag: '5-Star Resort', href: '/products/hospitality-uniforms-supplier-in-uae' },
      { name: 'Logistics Workwear', tag: 'Heavy Duty', href: '/products/logistics-uniforms-supplier-in-uae' },
      { name: 'Industrial Safety Wear', tag: 'High-Vis Safety', href: '/products/industrial-safety-wear-supplier-in-uae' },
    ],
    popularItems: [
      { name: 'On-Site Staff Fitting', detail: 'Available across all 7 Emirates', href: '/products/pure-cotton-shirts-supplier-in-uae', icon: Ruler },
      { name: '24-Hour Express Fitting', detail: 'For VIP executive suites', href: '/products/oxford-shirts-supplier-in-uae', icon: Clock },
      { name: 'Custom Logo Embroidery', detail: '3D high-density stitching', href: '/products/custom-polo-tshirts-supplier-dubai', icon: Scissors },
    ],
    featured: {
      title: '100% Pure Cotton Shirting Fleet',
      subtitle: 'Handcrafted luxury staff uniforms with Italian fabric options.',
      image: '/images/textile_fabric_rolls.png',
      badge: 'Individual Product Page',
      href: '/products/pure-cotton-shirts-supplier-in-uae',
    },
  },
  'CUSTOM APPAREL': {
    title: 'Enterprise T-Shirts, Polos & Winter Wear',
    subCategories: [
      { name: 'Custom Polo T-Shirts', tag: 'Best Seller', href: '/products/custom-polo-tshirts-supplier-dubai' },
      { name: 'Round Neck T-Shirts', tag: 'Combed Cotton', href: '/products/round-neck-tshirt-supplier-in-uae' },
      { name: 'V-Neck T-Shirts', tag: 'Soft Cotton', href: '/products/v-neck-tshirt-supplier-in-uae' },
      { name: 'Hooded T-Shirts', tag: 'Modern Fit', href: '/products/hooded-tshirt-supplier-in-uae' },
      { name: 'Long Sleeve T-Shirts', tag: 'Full Coverage', href: '/products/long-sleeve-tshirt-supplier-in-uae' },
      { name: 'Sports T-Shirts', tag: 'Dri-Fit Mesh', href: '/products/sports-tshirt-supplier-in-uae' },
      { name: '300 GSM Heavyweight Hoodies', tag: 'Premium Fleece', href: '/products/300-gsm-hoodies-supplier-in-uae' },
      { name: 'Fleece & Cotton Hoodies', tag: 'Winter Fleets', href: '/products/fleece-hoodies-supplier-in-uae' },
      { name: 'Zipper & Oversized Hoodies', tag: 'Streetwear Fit', href: '/products/hoodies-with-zipper-supplier-in-uae' },
    ],
    popularItems: [
      { name: 'Screen Printing & DTG', detail: 'Vibrant multi-color prints', href: '/products/round-neck-tshirt-supplier-in-uae', icon: Scissors },
      { name: '3D Rubberized Badges', detail: 'Durable corporate logos', href: '/products/custom-polo-tshirts-supplier-dubai', icon: Award },
      { name: 'Volume Order Discounts', detail: 'Direct mill wholesale pricing', href: '/products/oxford-shirts-supplier-in-uae', icon: ShieldCheck },
    ],
    featured: {
      title: 'Custom Polo T-Shirts',
      subtitle: 'Color-fast, anti-shrink pique cotton for corporate teams.',
      image: '/images/slide-polo.png',
      badge: 'Bulk Supply',
      href: '/products/custom-polo-tshirts-supplier-dubai',
    },
  },
  'TROUSERS & TAILORING': {
    title: 'Executive Trousers & Textile Sourcing',
    subCategories: [
      { name: 'Chino Trousers', tag: 'Best Seller', href: '/products/chino-pants-supplier-uae' },
      { name: 'Formal Corporate Trousers', tag: 'Executive Fit', href: '/products/formal-trousers-supplier-in-uae' },
      { name: 'Cargo Trousers & Shorts', tag: 'Workwear', href: '/products/cargo-pants-supplier-in-uae' },
      { name: 'Chef Trousers', tag: 'Kitchen Workwear', href: '/products/chef-trousers-supplier-in-uae' },
      { name: 'Premium Active Joggers', tag: 'Athleisure', href: '/products/premium-joggers-supplier-in-uae' },
      { name: '100% Egyptian Cotton Shirting', tag: 'Custom Mill', href: '/products/pure-cotton-shirts-supplier-in-uae' },
      { name: 'Pinpoint Oxford Fabrics', tag: 'Textured Weave', href: '/products/oxford-shirts-supplier-in-uae' },
    ],
    popularItems: [
      { name: 'Free Swatch Book Delivery', detail: 'Delivered to your office in UAE', href: '/products/pure-cotton-shirts-supplier-in-uae', icon: Award },
      { name: 'Bespoke Master Tailoring', detail: 'Hand-cut by Dubai master tailors', href: '/products/oxford-shirts-supplier-in-uae', icon: Scissors },
      { name: 'Showroom Consultation', detail: 'Baniyas Road, Deira Creek', href: '/products/custom-polo-tshirts-supplier-dubai', icon: Ruler },
    ],
    featured: {
      title: 'Oxford Button-Down Shirting',
      subtitle: 'Six decades of Dubai master tailoring craftsmanship.',
      image: '/homepage-image/Homepage (9).jpg',
      badge: 'Master Atelier',
      href: '/products/oxford-shirts-supplier-in-uae',
    },
  },
}

interface SiteHeaderProps {
  onOpenQuoteModal?: () => void
  config?: any
}

export function SiteHeader({ onOpenQuoteModal, config }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const logoUrl = config?.logoUrl || '/silky-logo.png'
  const phone = config?.phone || '+971 4 355 8453'
  const whatsapp = config?.whatsapp || '97142261050'

  // Master Navigation Tabs (HOME + 3 Master Mega Categories + CONTACT US)
  const categories = [
    { label: 'HOME', hasDropdown: false, href: '/' },
    { label: 'UNIFORM FLEETS', hasDropdown: true },
    { label: 'CUSTOM APPAREL', hasDropdown: true },
    { label: 'TROUSERS & TAILORING', hasDropdown: true },
    { label: 'CONTACT US', hasDropdown: false, href: '/products/pure-cotton-shirts-supplier-in-uae' },
  ]

  const megaData = activeCategory ? MEGA_MENUS[activeCategory] || null : null

  return (
    <header
      className="sticky top-0 left-0 right-0 z-50 w-full font-sans select-none"
      onMouseLeave={() => setActiveCategory(null)}
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
      <div className="bg-[#1A1A1A]/95 backdrop-blur-xl text-white border-b border-[#292929] py-3.5 px-4 sm:px-8 shadow-2xl">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-6">
          
          {/* Mobile Menu Toggle & Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-gray-300 hover:text-[#D97A42] focus:outline-none"
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
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-black tracking-widest uppercase">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.label
              return (
                <a
                  key={cat.label}
                  href={cat.href || '#'}
                  className={`relative cursor-pointer py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all duration-200 ${
                    isActive
                      ? 'text-[#D97A42] bg-white/10 shadow-sm'
                      : 'text-gray-200 hover:text-[#D97A42] hover:bg-white/5'
                  }`}
                  onMouseEnter={() => cat.hasDropdown ? setActiveCategory(cat.label) : setActiveCategory(null)}
                >
                  <span>{cat.label}</span>
                  {cat.hasDropdown && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isActive ? 'rotate-180 text-[#D97A42]' : 'text-gray-400'
                      }`}
                    />
                  )}

                  {/* Active Indicator Underline */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#D97A42] rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Right Action: Request Quote Button */}
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenQuoteModal}
              className="bg-[#D97A42] hover:bg-[#c46833] text-white font-bold text-xs uppercase tracking-widest px-7 py-3 rounded-full shadow-lg shadow-[#D97A42]/20 transition-all duration-300 flex items-center gap-2"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

        </div>

        {/* 3-Column Luxury Light Executive Mega-Menu Popover */}
        <AnimatePresence>
          {activeCategory && megaData && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 top-full bg-[#FAF9F5] border-t-4 border-[#D97A42] border-b border-slate-300 shadow-2xl z-50 text-slate-900"
            >
              <div className="max-w-[1400px] mx-auto p-8 lg:p-10">
                
                <div className="grid grid-cols-12 gap-8 pb-8 border-b border-slate-200">
                  
                  {/* Column 1: Sub-Categories */}
                  <div className="col-span-5 border-r border-slate-200 pr-8">
                    <div className="flex items-center gap-2 mb-5">
                      <span className="w-2 h-2 rounded-full bg-[#1C7A4C]" />
                      <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#D97A42] font-sans">
                        {megaData.title}
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      {megaData.subCategories.map((sub) => (
                        <li key={sub.name}>
                          <a
                            href={sub.href}
                            className="group flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 hover:text-[#D97A42] transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-100/80"
                          >
                            <span className="flex items-center gap-2.5">
                              <ChevronRight className="w-3.5 h-3.5 text-[#D97A42] group-hover:translate-x-1.5 transition-transform" />
                              <span>{sub.name}</span>
                            </span>

                            {sub.tag && (
                              <span className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 bg-[#1C7A4C] text-white rounded-full shadow-xs">
                                {sub.tag}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2: Atelier Services */}
                  <div className="col-span-3 border-r border-slate-200 pr-8">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-5 flex items-center gap-2 font-sans">
                      <Scissors className="w-4 h-4 text-[#D97A42]" />
                      <span>Specialized Services</span>
                    </h3>

                    <div className="space-y-3.5">
                      {megaData.popularItems.map((item) => {
                        const ItemIcon = item.icon || Scissors
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#D97A42]/60 hover:shadow-md transition-all group"
                          >
                            <div className="text-xs font-extrabold text-slate-900 group-hover:text-[#D97A42] transition-colors flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <ItemIcon className="w-4 h-4 text-[#D97A42] shrink-0" />
                                <span>{item.name}</span>
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#D97A42] group-hover:translate-x-1 transition-transform" />
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1 font-sans pl-6">{item.detail}</p>
                          </a>
                        )
                      })}
                    </div>
                  </div>

                  {/* Column 3: Featured Spotlight Card */}
                  <div className="col-span-4 pl-2">
                    <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200 p-6 group shadow-lg">
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-[9px] font-black uppercase tracking-wider bg-[#D97A42] text-white px-3 py-1 rounded-full shadow-md">
                          {megaData.featured.badge}
                        </span>
                      </div>

                      <div className="w-full h-40 rounded-xl overflow-hidden mb-4 relative bg-slate-100">
                        <img
                          src={megaData.featured.image}
                          alt={megaData.featured.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02]"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      </div>

                      <h4 className="text-base font-extrabold text-slate-900 group-hover:text-[#D97A42] transition-colors font-serif">
                        {megaData.featured.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 font-sans leading-relaxed">
                        {megaData.featured.subtitle}
                      </p>

                      <a
                        href={megaData.featured.href}
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
                  <div className="flex items-center space-x-6">
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

                  <a
                    href="#contact"
                    className="font-bold text-[#D97A42] hover:underline uppercase text-[11px] tracking-wider"
                  >
                    Visit Dubai Showroom →
                  </a>
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
            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat.label} className="border-b border-[#262626] pb-2">
                  <div className="flex items-center justify-between text-sm font-bold text-gray-200">
                    <span>{cat.label}</span>
                    {cat.hasDropdown && <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false)
                if (onOpenQuoteModal) onOpenQuoteModal()
              }}
              className="w-full py-3.5 bg-[#D97A42] hover:bg-[#c46833] text-white font-bold text-xs uppercase tracking-widest rounded-full flex items-center justify-center gap-2 shadow-lg"
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
