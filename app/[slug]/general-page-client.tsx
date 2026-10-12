'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { QuoteFormModal } from '@/components/quote-form'
import {
  FileText, Newspaper, Calendar, User, Clock, ArrowLeft, ExternalLink,
  Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, ShieldCheck,
  Building2, Sparkles, PhoneCall, Check, Globe, Award, Scissors, Layers,
  Users, Truck, ChevronRight, ArrowRight, Star
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { getSiteConfig } from '@/lib/laravel-api'

export interface GeneralPageItem {
  id: string
  title: string
  subtitle?: string
  slug: string
  pageType: 'General Page' | 'Blog Article' | 'Landing Page'
  status: 'Published' | 'Draft' | 'Scheduled'
  isActive: boolean
  featuredImage?: string
  content: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  ogImage?: string
  allowIndexing: boolean
  author: string
  createdAt: string
  updatedAt: string
}

const DEFAULT_PAGES: GeneralPageItem[] = [
  {
    id: 'page-about',
    title: 'About Us',
    subtitle: 'Leading enterprise uniform manufacturer & textile solutions provider in Dubai, UAE.',
    slug: 'about-us',
    pageType: 'General Page',
    status: 'Published',
    isActive: true,
    featuredImage: '/images/textile_fabric_rolls.png',
    content: `<h2>Empowering GCC Enterprises With Superior Apparel</h2>
<p>Silky Textiles LLC is a premier manufacturer and supplier of customized corporate uniforms, medical scrubs, hospitality apparel, and industrial safety wear across Dubai, Abu Dhabi, and the entire GCC region.</p>
<h3>Our Commitment to Quality</h3>
<p>We source only high-grade long-staple cotton, performance poly-blends, and certified flame-retardant safety fabrics. Every garment undergoes rigorous 4-step quality testing to ensure longevity and corporate elegance.</p>
<blockquote class="border-l-4 border-[#DE7B3D] pl-4 py-2.5 my-4 bg-orange-50/60 rounded-r-xl font-medium text-slate-800 italic">"Crafted for performance, tailored for distinction."</blockquote>`,
    seoTitle: 'About Silky Textiles LLC | Premier Uniform Supplier Dubai & UAE',
    seoDescription: 'Discover Silky Textiles LLC — Dubai’s top corporate uniform and garment manufacturer. Delivering high-quality custom apparel across the UAE and GCC.',
    seoKeywords: 'silky textiles about, uniform manufacturer dubai',
    allowIndexing: true,
    author: 'Silky Executive Team',
    createdAt: '2026-01-15',
    updatedAt: '2026-10-08',
  },
  {
    id: 'page-contact',
    title: 'Contact Us',
    subtitle: 'Get in touch with our uniform advisory team or visit our Dubai headquarters.',
    slug: 'contact-us',
    pageType: 'General Page',
    status: 'Published',
    isActive: true,
    featuredImage: '/images/hero_textiles_factory.png',
    content: `<h2>Get In Touch With Our Corporate Advisory Team</h2>
<p>Whether you require 50 bespoke executive suits or 5,000 industrial safety sets, our expert advisors are ready to assist you with fabric selection, sizing specs, and quote estimation.</p>
<h3>Dubai Office & Showroom</h3>
<p>Silky Textiles & Garments LLC<br/>Industrial Area 3, Al Quoz, Dubai, United Arab Emirates<br/>Phone: +971 4 333 4455 | Email: sales@silkytextiles.com</p>`,
    seoTitle: 'Contact Silky Textiles Dubai | Uniform Quotes & Showroom Address',
    seoDescription: 'Contact Silky Textiles LLC in Dubai, UAE. Request custom bulk uniform quotes, schedule sample presentations, or visit our showroom.',
    seoKeywords: 'contact silky textiles, uniform showroom dubai',
    allowIndexing: true,
    author: 'Sales Desk',
    createdAt: '2026-01-20',
    updatedAt: '2026-10-08',
  },
  {
    id: 'blog-uniform-trends-2026',
    title: 'Corporate Workwear Trends 2026',
    subtitle: 'Explore modern breathable fabrics, eco-friendly textiles, and smart corporate apparel designs.',
    slug: 'blog/corporate-uniform-trends-uae-2026',
    pageType: 'Blog Article',
    status: 'Published',
    isActive: true,
    featuredImage: '/images/corporate_executive_shirts.png',
    content: `<h2>Modern Workwear Trends Shaping the GCC Workplace</h2>
<p>As business environments across Dubai and Saudi Arabia evolve, workplace apparel is shifting toward breathable high-performance textiles that maintain a sharp executive posture in high-heat climates.</p>
<h3>1. Moisture-Wicking 100% Egyptian & Pima Cotton</h3>
<p>Natural cotton weaves remain the gold standard for executive shirt fleets, delivering unmatched breathability during peak UAE summers.</p>
<h3>2. Antimicrobial Healthcare & Hospitality Fabrics</h3>
<p>Modern medical scrubs and chef coats now incorporate silvadur silver-ion technology to eliminate odours and prevent bacterial buildup.</p>`,
    seoTitle: 'Corporate Uniform Trends in UAE 2026 | Silky Textiles Blog',
    seoDescription: 'Read the latest 2026 guide on corporate uniform trends, high-performance fabrics, and sustainable workwear designs in the UAE and Dubai.',
    seoKeywords: 'corporate uniform trends uae 2026',
    allowIndexing: true,
    author: 'Editorial Desk',
    createdAt: '2026-09-10',
    updatedAt: '2026-10-05',
  }
]

const ease: any = [0.16, 1, 0.3, 1]

const FABRIC_SPECS = [
  {
    name: '100% Egyptian Shirting Cotton',
    badge: '120/2 Ply Compact',
    desc: 'Luxurious long-staple weave engineered specifically for UAE corporate executive shirt fleets.',
    specs: ['220 GSM Weave', 'Pre-Shrunk Bio Finish', 'High Heat Breathable'],
    image: '/images/textile_fabric_rolls.png',
  },
  {
    name: 'Oxford Pinpoint Cotton Weave',
    badge: 'Classic Executive Suiting',
    desc: 'Crisp, structured weave providing impeccable drape and durability for daily office wear.',
    specs: ['Wrinkle-Resistant', 'Colorfast 50+ Washes', 'Custom Dyed Colors'],
    image: '/homepage-image/Homepage (9).jpg',
  },
  {
    name: 'Silvadur™ Antimicrobial Weave',
    badge: 'Silver-Ion Protected',
    desc: 'Infused silver-ion technology permanently eliminating bacteria and odors in medical scrubs & chef coats.',
    specs: ['99.9% Antibacterial Rate', 'Odor-Free Shielding', 'Autoclave Wash Safe'],
    image: '/images/corporate_executive_shirts.png',
  },
  {
    name: 'Flame-Retardant Safety Twill',
    badge: 'ISO 11612 Certified',
    desc: 'Heavy-duty industrial twill tailored for oilfield, logistics, and high-visibility safety jackets.',
    specs: ['EN ISO 20471 High-Vis', 'Triple Stitched Seams', 'Stain & Oil Repellent'],
    image: '/images/hero_textiles_factory.png',
  },
]

const QC_STEPS = [
  {
    step: '01',
    title: 'Tensile & Wear Stress Test',
    desc: 'Every fabric batch undergoes 15,000-rub Martindale abrasion testing to ensure extreme durability under high-friction GCC work environments.',
    badge: '15K Rub Rating',
  },
  {
    step: '02',
    title: 'Colorfastness & Wash Chamber',
    desc: 'Tested against 50+ industrial washes under 60°C thermal cycles without shade fading or shrinkage exceeding 0.5%.',
    badge: 'Grade 5 Colorfastness',
  },
  {
    step: '03',
    title: '3D Computerized Monogramming',
    desc: 'Japanese Tajima multi-head machines produce crisp 3D embroidered brand crests at 1,000 stitches per minute.',
    badge: 'High-Density Stitching',
  },
  {
    step: '04',
    title: 'Laser Hem & Ergonomic Inspection',
    desc: 'Hand-inspected by master tailors with double-needle safety seams and custom shoulder padding for executive posture.',
    badge: 'Master Tailor Sign-Off',
  },
]

const TIMELINE_EVENTS = [
  {
    year: '1963',
    era: 'Foundations & Deira Merchant Era',
    title: 'Founded in Deira Creek, Dubai',
    desc: 'Established as a specialized merchant of 100% Egyptian long-staple cotton bolts serving maritime trading dhows and founding Dubai merchant families.',
    location: 'Baniyas Road, Deira Creek, Dubai',
    stat: '1,000+ Cotton Bolts Delivered',
    badge: 'DEIRA HERITAGE',
    highlights: ['100% Long-Staple Egyptian Shirting', 'Deira Creek Maritime Dhow Supply', 'Bespoke Family Suiting'],
    image: '/homepage-image/Homepage (9).jpg',
  },
  {
    year: '1990',
    era: 'Expansion into Corporate Fleets',
    title: 'Custom Uniform Fleet Manufacturing',
    desc: 'Pioneered full-scale custom uniform production for luxury 5-star hotel chains, commercial airlines, and government healthcare networks.',
    location: 'Deira Master Atelier & Fitting Suite',
    stat: '50+ Corporate Fleets Outfitted',
    badge: 'CORPORATE FLEETS',
    highlights: ['5-Star Hotel Front Desk Suits', 'Hospital & Airline Uniform Fleets', 'On-Site Employee Measuring'],
    image: '/images/textile_fabric_rolls.png',
  },
  {
    year: '2010',
    era: 'Automated Industrial Production',
    title: 'Al Quoz 50,000 sq.ft Manufacturing Hub',
    desc: 'Commissioned automated Japanese Tajima embroidery systems, laser-guided hem cutters, and an ISO 9001:2015 certified textile testing laboratory.',
    location: 'Al Quoz Industrial Area 3, Dubai',
    stat: '50,000 sq.ft Automated Facility',
    badge: 'JAPANESE EMBROIDERY',
    highlights: ['3D Computerized Monogramming', 'ISO 9001:2015 Quality Testing Lab', 'Flame-Retardant Safety Weaves'],
    image: '/images/hero_textiles_factory.png',
  },
  {
    year: '2026',
    era: 'GCC Digital Fleet Fulfillment',
    title: 'GCC Digital Fleet Customization',
    desc: 'Delivering end-to-end bespoke workwear across all 7 UAE Emirates, Saudi Arabia, and Qatar with 24-48h express fitting and mobile tailors.',
    location: 'UAE & GCC Express Logistics Network',
    stat: '500,000+ Garments Made',
    badge: '7 EMIRATES 24H SLA',
    highlights: ['Doorstep Fitting Teams Across 7 Emirates', 'Silvadur™ Anti-Bacterial Tech', 'Physical Swatch Box Express Delivery'],
    image: '/images/slide-polo.png',
  },
]

const cleanAndUnescapeHtml = (htmlString: string = '') => {
  if (!htmlString) return ''
  if (htmlString.includes('&lt;') || htmlString.includes('&gt;')) {
    if (typeof window !== 'undefined') {
      const textarea = document.createElement('textarea')
      textarea.innerHTML = htmlString
      return textarea.value
    }
  }
  return htmlString
}

export function GeneralPageClient({ slug }: { slug: string }) {
  const [page, setPage] = useState<GeneralPageItem | null>(null)
  const [config, setConfig] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [selectedFabric, setSelectedFabric] = useState(0)
  const [activeQcStep, setActiveQcStep] = useState(0)
  const [activeTimelineYear, setActiveTimelineYear] = useState(0)
  const [timelineAutoPlay, setTimelineAutoPlay] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  useEffect(() => {
    getSiteConfig()
      .then((cfg) => {
        if (cfg) setConfig(cfg)
      })
      .catch((err) => console.error('Error fetching site config:', err))
  }, [])

  useEffect(() => {
    if (!timelineAutoPlay) return
    const timer = setInterval(() => {
      setActiveTimelineYear((prev) => (prev + 1) % TIMELINE_EVENTS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [timelineAutoPlay])
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: 'Corporate Uniform Fleets',
    quantity: '100 - 500 pcs',
    message: '',
  })

  useEffect(() => {
    let isMounted = true
    const normSlug = (slug || '').replace(/^\//, '').toLowerCase().trim()

    const matchPage = (items: GeneralPageItem[]) => {
      return items.find((p) => {
        const pSlug = (p.slug || '').replace(/^\//, '').toLowerCase().trim()
        if (pSlug === normSlug) return true
        if (pSlug === `blog/${normSlug}` || normSlug === `blog/${pSlug}`) return true
        if ((normSlug === 'about-us' || normSlug === 'about') && (pSlug === 'about-us' || pSlug === 'about')) return true
        if ((normSlug === 'contact-us' || normSlug === 'contact') && (pSlug === 'contact-us' || pSlug === 'contact')) return true
        return false
      })
    }

    const loadPage = async () => {
      // 1. Fetch live page data directly from MySQL database API
      try {
        const res = await fetch(`/api/general-pages?slug=${encodeURIComponent(normSlug)}`, { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          if (data && data.slug) {
            const formattedPage: GeneralPageItem = {
              id: String(data.id),
              title: data.title || '',
              subtitle: data.subtitle || '',
              slug: data.slug || normSlug,
              pageType: (data.pageType as any) || 'General Page',
              status: (data.status as any) || 'Published',
              isActive: Boolean(data.isActive),
              featuredImage: data.featuredImage || undefined,
              content: data.content || '',
              seoTitle: data.seoTitle || '',
              seoDescription: data.seoDescription || '',
              seoKeywords: data.seoKeywords || '',
              ogImage: data.ogImage || undefined,
              allowIndexing: Boolean(data.allowIndexing),
              author: data.author || 'Silky Team',
              createdAt: data.createdAt ? String(data.createdAt).split('T')[0] : '',
              updatedAt: data.updatedAt ? String(data.updatedAt).split('T')[0] : '',
            }
            if (isMounted) {
              setPage(formattedPage)
              setLoading(false)
            }
            return
          }
        }
      } catch (err) {
        console.warn('API fetch failed, checking local backup:', err)
      }

      // 2. Fallback to localStorage backup
      try {
        const stored = localStorage.getItem('silky_cms_general_pages')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed) && parsed.length > 0) {
            const found = matchPage(parsed)
            if (found && isMounted) {
              setPage(found)
              setLoading(false)
              return
            }
          }
        }
      } catch (e) {
        console.error('Error reading pages from storage:', e)
      }

      // 3. Fallback to default pages
      const defaultFound = matchPage(DEFAULT_PAGES)
      if (isMounted) {
        setPage(defaultFound || null)
        setLoading(false)
      }
    }

    loadPage()
    return () => {
      isMounted = false
    }
  }, [slug])

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setContactSubmitted(true)
    setTimeout(() => {
      setContactSubmitted(false)
      setContactForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        category: 'Corporate Uniform Fleets',
        quantity: '100 - 500 pcs',
        message: '',
      })
    }, 4000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#DE7B3D]"></div>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] flex flex-col justify-between">
        <SiteHeader onOpenQuoteModal={() => setIsQuoteOpen(true)} config={config} />
        <main className="max-w-2xl mx-auto px-6 py-24 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-100 flex items-center justify-center text-[#DE7B3D]">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Page Not Found</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The requested page <code className="bg-slate-200 px-2 py-0.5 rounded font-mono">/{slug}</code> is not available.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#DE7B3D] text-white rounded-xl font-bold text-sm hover:bg-[#c96a2e] transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Homepage
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const normSlug = (slug || '').replace(/^\//, '').toLowerCase().trim()
  const pageSlug = (page.slug || '').replace(/^\//, '').toLowerCase().trim()

  const isContactPage = normSlug === 'contact-us' || normSlug === 'contact' || pageSlug === 'contact-us' || pageSlug === 'contact'
  const isAboutPage = normSlug === 'about-us' || normSlug === 'about' || pageSlug === 'about-us' || pageSlug === 'about'
  const isBlog = page.pageType === 'Blog Article'
  const wordCount = page.content.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))
  const cleanHtml = cleanAndUnescapeHtml(page.content)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 font-sans flex flex-col justify-between overflow-x-hidden">
      <SiteHeader onOpenQuoteModal={() => setIsQuoteOpen(true)} config={config} />

      <main className="flex-1 pb-16 sm:pb-24">
        
        {/* ============================================================ */}
        {/* 1. DEDICATED INTERACTIVE ABOUT US PAGE LAYOUT */}
        {/* ============================================================ */}
        {isAboutPage ? (
          <div className="space-y-16 sm:space-y-24">
            
            {/* ASYMMETRIC LUXURY HERO HEADER WITH DYNAMIC FABRIC SWITCHER */}
            <section className="relative bg-[#141414] text-white py-16 sm:py-24 overflow-hidden border-b border-slate-800">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <img
                  src={page.featuredImage || '/images/textile_fabric_rolls.png'}
                  alt={page.title || 'Silky Textiles Heritage'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-[#141414]/95 to-[#141414]/70" />
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative max-w-[1380px] mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* LEFT HERO CONTENT */}
                <div className="lg:col-span-7 space-y-6">
                  <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#DE7B3D]/20 border border-[#DE7B3D]/40 text-[#DE7B3D] rounded-full text-xs font-extrabold uppercase tracking-widest">
                    <Building2 className="w-3.5 h-3.5 text-[#DE7B3D]" />
                    <span>DUBAI EST. 1963 • LEADING GCC TEXTILE MANUFACTURER</span>
                  </motion.div>

                  <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    {!page.title || page.title.toLowerCase() === 'about-us' || page.title.toLowerCase() === 'about'
                      ? 'Empowering GCC Enterprises With Superior Apparel'
                      : page.title}
                  </motion.h1>

                  <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                    {page.subtitle || 'Silky Textiles LLC is a premier manufacturer and supplier of customized corporate uniforms, medical scrubs, hospitality apparel, and industrial safety wear across Dubai, Abu Dhabi, and the entire GCC region.'}
                  </motion.p>

                  {/* METRIC COUNTER GRID */}
                  <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
                    <div className="p-3 bg-slate-900/60 rounded-2xl border border-slate-800">
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#DE7B3D]">62+</div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">Years Heritage</div>
                    </div>
                    <div className="p-3 bg-slate-900/60 rounded-2xl border border-slate-800">
                      <div className="text-2xl sm:text-3xl font-extrabold text-white">500K+</div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">Garments Made</div>
                    </div>
                    <div className="p-3 bg-slate-900/60 rounded-2xl border border-slate-800">
                      <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">4-Step</div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">Quality Control</div>
                    </div>
                    <div className="p-3 bg-slate-900/60 rounded-2xl border border-slate-800">
                      <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">99.4%</div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">Client Retention</div>
                    </div>
                  </motion.div>
                </div>

                {/* RIGHT INTERACTIVE FABRIC PREVIEW CARD */}
                <motion.div variants={itemVariants} className="lg:col-span-5 relative">
                  <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 shadow-2xl space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-xs font-bold text-[#DE7B3D] uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-4 h-4" /> Interactive Textile Selector
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                        Click Swatch Below
                      </span>
                    </div>

                    {/* Active Fabric Display */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedFabric}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-4"
                      >
                        <div className="relative rounded-2xl overflow-hidden aspect-16/9 border border-slate-700">
                          <img
                            src={FABRIC_SPECS[selectedFabric].image}
                            alt={FABRIC_SPECS[selectedFabric].name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3 bg-[#DE7B3D] text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md">
                            {FABRIC_SPECS[selectedFabric].badge}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-base font-extrabold text-white">
                            {FABRIC_SPECS[selectedFabric].name}
                          </h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            {FABRIC_SPECS[selectedFabric].desc}
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                          {FABRIC_SPECS[selectedFabric].specs.map((spec, i) => (
                            <div key={i} className="flex items-center gap-1 text-slate-300 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span className="truncate">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Fabric Swatch Selector Buttons */}
                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800">
                      {FABRIC_SPECS.map((fab, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedFabric(idx)}
                          className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all text-center border cursor-pointer ${
                            selectedFabric === idx
                              ? 'bg-[#DE7B3D] text-white border-[#DE7B3D] shadow-md shadow-[#DE7B3D]/30'
                              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                          }`}
                        >
                          Swatch {idx + 1}
                        </button>
                      ))}
                    </div>

                  </div>
                </motion.div>

              </motion.div>
            </section>

            {/* DYNAMIC CMS RICH TEXT BODY CONTENT (FROM ADMIN) */}
            {cleanHtml && (
              <section className="max-w-[1380px] mx-auto px-6 sm:px-10">
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-12 space-y-6">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#DE7B3D] uppercase tracking-widest border-b border-slate-100 pb-4">
                    <FileText className="w-4 h-4" />
                    <span>CMS Overview & Corporate Statement</span>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: cleanHtml }}
                    className="prose prose-slate max-w-none text-slate-800 leading-relaxed [&_h1]:text-3xl [&_h1]:font-black [&_h1]:text-slate-900 [&_h1]:my-4 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_h2]:my-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:my-3 [&_p]:my-3 [&_p]:text-slate-700 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-[#DE7B3D] [&_blockquote]:pl-5 [&_blockquote]:py-3 [&_blockquote]:bg-orange-50/50 [&_blockquote]:rounded-r-2xl [&_blockquote]:italic [&_a]:text-[#DE7B3D] [&_a]:font-bold [&_a]:underline [&_img]:rounded-2xl [&_img]:my-6 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:p-3 [&_th]:bg-slate-100 [&_td]:border [&_td]:p-3"
                  />
                </div>
              </section>
            )}

            {/* CRAFTSMANSHIP & BENTO GRID */}
            <section className="max-w-[1380px] mx-auto px-6 sm:px-10 space-y-10">
              
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#DE7B3D]">
                  CRAFT & MANUFACTURING STANDARDS
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Built for Distinction, Tailored for GCC Climate
                </h2>
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* BENTO CARD 1 (FEATURED LARGE 2-SPAN) */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease }}
                  className="md:col-span-2 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden"
                >
                  <div className="space-y-3 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#DE7B3D] border border-orange-100 flex items-center justify-center">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      100% Long-Staple Egyptian & Pima Cotton Fabrics
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                      We source high-grade long-staple cotton, performance poly-blends, and certified flame-retardant safety fabrics. Every garment undergoes rigorous 4-step quality testing to ensure longevity and corporate elegance.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs font-bold text-slate-700">
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 220 GSM Weave</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Pre-Shrunk Fit</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Colorfast Tested</div>
                  </div>
                </motion.div>

                {/* BENTO CARD 2 */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease }}
                  className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center">
                      <Scissors className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      In-House Precision Monogramming
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Japanese computerized embroidery machinery delivering crisp 3D logo stitching across executive shirts, chef coats & polo fleets.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsQuoteOpen(true)}
                    className="text-xs font-bold text-[#DE7B3D] flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    Explore Embroidery Specs <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>

                {/* BENTO CARD 3 */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease }}
                  className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      Anti-Bacterial Silver-Ion Weave
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Healthcare scrubs and hospitality uniforms treated with Silvadur™ technology for permanent odor elimination and antibacterial shielding.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsQuoteOpen(true)}
                    className="text-xs font-bold text-[#DE7B3D] flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    Medical & Hotel Fabrics <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>

                {/* BENTO CARD 4 (2-SPAN) */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease }}
                  className="md:col-span-2 bg-[#141414] text-white p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">FAST GCC FULFILLMENT</span>
                    <h3 className="text-xl font-extrabold text-white">Direct Warehouse & Logistics Fleet in Dubai</h3>
                    <p className="text-xs text-slate-300 max-w-md">
                      Free UAE sample presentation and fast 48-hour delivery across Abu Dhabi, Dubai, Sharjah, Saudi Arabia, and Qatar.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsQuoteOpen(true)}
                    className="px-6 py-3 bg-[#DE7B3D] hover:bg-[#c96a2e] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all shrink-0 cursor-pointer"
                  >
                    Request Free Samples ↗
                  </button>
                </motion.div>

              </motion.div>

            </section>

            {/* INTERACTIVE 4-STEP QUALITY CONTROL SIMULATOR */}
            <section className="bg-slate-900 text-white py-16 sm:py-24 border-y border-slate-800">
              <div className="max-w-[1380px] mx-auto px-6 sm:px-10 space-y-10">
                
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#DE7B3D]">
                    ZERO-DEFECT GUARANTEE
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    4-Step Precision Quality Testing Protocol
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Step Buttons Column */}
                  <div className="lg:col-span-5 space-y-3">
                    {QC_STEPS.map((qc, idx) => (
                      <button
                        key={qc.step}
                        onClick={() => setActiveQcStep(idx)}
                        className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border cursor-pointer flex items-center justify-between ${
                          activeQcStep === idx
                            ? 'bg-[#DE7B3D] border-[#DE7B3D] text-white shadow-lg shadow-[#DE7B3D]/20'
                            : 'bg-slate-800/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                            activeQcStep === idx ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'
                          }`}>
                            {qc.step}
                          </span>
                          <span className="text-sm font-bold">{qc.title}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform ${activeQcStep === idx ? 'translate-x-1' : 'opacity-40'}`} />
                      </button>
                    ))}
                  </div>

                  {/* Active Step Specs Box */}
                  <div className="lg:col-span-7">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeQcStep}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-slate-950 p-8 rounded-3xl border border-slate-800 space-y-6 relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                          <span className="text-xs font-extrabold text-[#DE7B3D] uppercase tracking-wider">
                            INSPECTION STAGE {QC_STEPS[activeQcStep].step}
                          </span>
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                            {QC_STEPS[activeQcStep].badge}
                          </span>
                        </div>

                        <h3 className="text-2xl font-extrabold text-white">
                          {QC_STEPS[activeQcStep].title}
                        </h3>

                        <p className="text-sm text-slate-300 leading-relaxed">
                          {QC_STEPS[activeQcStep].desc}
                        </p>

                        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                          <span>ISO 9001:2015 Verified</span>
                          <span className="text-emerald-400 flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-4 h-4" /> 100% Pass Metric
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                </div>

              </div>
            </section>

            {/* INTERACTIVE LEGACY TIMELINE (1963 - PRESENT) */}
            <section className="max-w-[1380px] mx-auto px-6 sm:px-10 space-y-10">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
                <div className="space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#DE7B3D] flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> SIX DECADES OF EXCELLENCE
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Our Evolution in the UAE
                  </h2>
                </div>

                {/* Timeline Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTimelineAutoPlay(!timelineAutoPlay)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                      timelineAutoPlay
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    <span>{timelineAutoPlay ? 'Auto-Playing' : 'Auto Play'}</span>
                  </button>

                  <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-slate-200 shadow-xs">
                    <button
                      onClick={() => setActiveTimelineYear((prev) => (prev > 0 ? prev - 1 : TIMELINE_EVENTS.length - 1))}
                      className="p-2 text-slate-600 hover:text-[#DE7B3D] hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                      title="Previous Era"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono font-bold text-slate-400 px-1">
                      0{activeTimelineYear + 1}/0{TIMELINE_EVENTS.length}
                    </span>
                    <button
                      onClick={() => setActiveTimelineYear((prev) => (prev + 1) % TIMELINE_EVENTS.length)}
                      className="p-2 text-slate-600 hover:text-[#DE7B3D] hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                      title="Next Era"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Bar & Connecting Track */}
              <div className="relative pt-6 pb-2">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 rounded-full" />
                <motion.div
                  className="absolute top-1/2 left-0 h-1 bg-[#DE7B3D] -translate-y-1/2 rounded-full"
                  animate={{ width: `${(activeTimelineYear / (TIMELINE_EVENTS.length - 1)) * 100}%` }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  {TIMELINE_EVENTS.map((item, idx) => {
                    const isActive = activeTimelineYear === idx
                    return (
                      <button
                        key={item.year}
                        onClick={() => setActiveTimelineYear(idx)}
                        className="group flex flex-col items-center cursor-pointer focus:outline-none"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xs transition-all duration-300 border-2 ${
                            isActive
                              ? 'bg-[#DE7B3D] text-white border-[#DE7B3D] ring-4 ring-orange-100 shadow-lg scale-110'
                              : 'bg-white text-slate-700 border-slate-300 group-hover:border-[#DE7B3D] group-hover:text-[#DE7B3D]'
                          }`}
                        >
                          {item.year}
                        </div>
                        <span className={`text-[11px] font-bold mt-2 hidden sm:block transition-colors ${
                          isActive ? 'text-[#DE7B3D]' : 'text-slate-500 group-hover:text-slate-900'
                        }`}>
                          {item.badge}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Active Timeline Era Spotlight Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTimelineYear}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden"
                >
                  {/* Left Column Image & Stat Badge */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative rounded-2xl overflow-hidden aspect-4/3 border border-slate-200 shadow-md group">
                      <img
                        src={TIMELINE_EVENTS[activeTimelineYear].image}
                        alt={TIMELINE_EVENTS[activeTimelineYear].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 bg-[#DE7B3D] text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md">
                        {TIMELINE_EVENTS[activeTimelineYear].badge}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700 text-xs text-white flex items-center justify-between">
                        <span className="font-bold text-amber-400">{TIMELINE_EVENTS[activeTimelineYear].stat}</span>
                        <span className="text-[10px] text-slate-400">{TIMELINE_EVENTS[activeTimelineYear].year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Era Narrative & Highlights */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-orange-50 border border-orange-200 text-[#DE7B3D] text-xs font-mono font-bold rounded-full">
                        {TIMELINE_EVENTS[activeTimelineYear].year} MILESTONE
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        {TIMELINE_EVENTS[activeTimelineYear].era}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {TIMELINE_EVENTS[activeTimelineYear].title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {TIMELINE_EVENTS[activeTimelineYear].desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs font-bold text-slate-700">
                      {TIMELINE_EVENTS[activeTimelineYear].highlights.map((hl, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <MapPin className="w-4 h-4 text-[#DE7B3D]" />
                        <span>{TIMELINE_EVENTS[activeTimelineYear].location}</span>
                      </div>

                      <button
                        onClick={() => setIsQuoteOpen(true)}
                        className="px-5 py-2.5 bg-[#141414] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
                      >
                        <span>Explore Era Specs</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#DE7B3D]" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* 4 Mini Preview Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {TIMELINE_EVENTS.map((item, idx) => (
                  <button
                    key={item.year}
                    onClick={() => setActiveTimelineYear(idx)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer space-y-2 ${
                      activeTimelineYear === idx
                        ? 'bg-white border-[#DE7B3D] shadow-md ring-2 ring-orange-100'
                        : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-extrabold font-mono ${activeTimelineYear === idx ? 'text-[#DE7B3D]' : 'text-slate-900'}`}>
                        {item.year}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">{item.badge}</span>
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-900 truncate">
                      {item.title}
                    </h4>
                  </button>
                ))}
              </div>

            </section>

            {/* EMIRATES LOGISTICS & FITTING SLA STRIP */}
            <section className="max-w-[1380px] mx-auto px-6 sm:px-10">
              <div className="bg-gradient-to-br from-slate-900 to-[#141414] text-white p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
                
                <div className="space-y-3 max-w-xl">
                  <span className="text-xs font-extrabold text-[#DE7B3D] uppercase tracking-widest">
                    EMIRATES-WIDE DOORSTEP SERVICE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Need Fitters or Fabric Samples at Your Dubai Office?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Our mobile tailoring team visits corporate offices across Dubai, Abu Dhabi, Sharjah, Ajman, RAK, and Fujairah with physical fabric swatch books and sizing master garments.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                  <button
                    onClick={() => setIsQuoteOpen(true)}
                    className="px-8 py-4 bg-[#DE7B3D] hover:bg-[#c96a2e] text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-[#DE7B3D]/30 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Request Swatch Book</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https://wa.me/97142261050"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center gap-2"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    <span>WhatsApp Concierge</span>
                  </a>
                </div>

              </div>
            </section>

          </div>
        ) : isContactPage ? (
          /* ============================================================ */
          /* 2. DEDICATED ENTERPRISE CONTACT US PAGE LAYOUT */
          /* ============================================================ */
          <div className="space-y-16 sm:space-y-24">
            
            {/* CONTACT HERO HEADER */}
            <section className="relative bg-slate-900 text-white py-16 sm:py-24 overflow-hidden border-b border-slate-800">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <img src="/images/hero_textiles_factory.png" alt="Contact Silky Textiles" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
              </div>

              <div className="relative max-w-[1380px] mx-auto px-6 sm:px-10 text-center space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#DE7B3D]/20 border border-[#DE7B3D]/40 text-[#DE7B3D] rounded-full text-xs font-extrabold uppercase tracking-widest">
                  <Building2 className="w-3.5 h-3.5" /> Dubai Showroom & Advisory Desk
                </span>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Contact Our Uniform Specialists
                </h1>

                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
                  Have questions about bulk uniform orders, bespoke fabric sourcing, embroidery specs, or showroom visits? Our Dubai consultants are ready to assist.
                </p>
              </div>
            </section>

            {/* 4 CONTACT PILLAR CARDS */}
            <section className="max-w-[1380px] mx-auto px-6 sm:px-10 -mt-24 sm:-mt-28 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* PHONE */}
                <a
                  href={`tel:${(config?.phone || '+971 4 355 8453').replace(/[^0-9+]/g, '')}`}
                  className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:border-[#DE7B3D] hover:shadow-md transition-all group space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#DE7B3D] group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Phone Hotline</h3>
                    <p className="text-xs text-slate-600 font-semibold mt-1">{config?.phone || '+971 4 355 8453'}</p>
                    <p className="text-xs text-slate-500 font-medium">{config?.phoneSecondary || '+971 4 226 1050'}</p>
                  </div>
                </a>

                {/* WHATSAPP */}
                <a
                  href={`https://wa.me/${(config?.whatsapp || '+971 4 226 1050').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all group space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                    <FaWhatsapp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">WhatsApp Desk</h3>
                    <p className="text-xs text-slate-600 font-semibold mt-1">{config?.whatsapp || '+971 4 226 1050'}</p>
                    <span className="inline-block mt-2 text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      Direct Advisory ↗
                    </span>
                  </div>
                </a>

                {/* EMAIL */}
                <a
                  href={`mailto:${config?.email || 'sales@silky.ae'}`}
                  className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:border-sky-500 hover:shadow-md transition-all group space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Corporate Email</h3>
                    <p className="text-xs text-slate-600 font-semibold mt-1">{config?.email || 'sales@silky.ae'}</p>
                    <p className="text-xs text-slate-500 font-medium">{config?.emailSecondary || 'info@silky.ae'}</p>
                  </div>
                </a>

                {/* LOCATION */}
                <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Showroom Address</h3>
                    <p className="text-xs text-slate-600 font-medium mt-1 leading-snug">
                      {config?.address || 'Showroom No. 1, Al Zarooni Bldg, Next to HBL, Baniyas Road (D85), Deira Creek, Dubai, UAE'}
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* DYNAMIC CMS RICH TEXT BODY CONTENT IF CONFIGURED */}
            {cleanHtml && (
              <section className="max-w-[1380px] mx-auto px-6 sm:px-10">
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-10 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#DE7B3D] uppercase tracking-widest border-b border-slate-100 pb-3">
                    <FileText className="w-4 h-4" />
                    <span>Advisory Notes & Inquiries Guide</span>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: cleanHtml }}
                    className="prose prose-slate max-w-none text-slate-800 leading-relaxed [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-slate-800 [&_p]:my-2 [&_p]:text-slate-700"
                  />
                </div>
              </section>
            )}

            {/* MAIN CONTACT INQUIRY FORM & MAP */}
            <section className="max-w-[1380px] mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* CONTACT FORM */}
              <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Request a Bulk Quote or Consultation</h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Fill out the form below and our corporate uniform specialist will respond within 2 business hours.
                  </p>
                </div>

                {contactSubmitted ? (
                  <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h3 className="text-lg font-extrabold text-slate-900">Inquiry Received!</h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto">
                      Thank you for contacting Silky Textiles LLC. Our Dubai showroom team has received your request and is preparing sizing & fabric specifications.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name *</label>
                        <input
                          required
                          type="text"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Mohammad Al-Zaabi"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#DE7B3D]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Company / Organization *</label>
                        <input
                          required
                          type="text"
                          value={contactForm.company}
                          onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                          placeholder="Grand Resort & Hospitality"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#DE7B3D]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address *</label>
                        <input
                          required
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="procurement@company.ae"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#DE7B3D]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone / WhatsApp *</label>
                        <input
                          required
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="+971 50 123 4567"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#DE7B3D]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Uniform Category</label>
                        <select
                          value={contactForm.category}
                          onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none cursor-pointer"
                        >
                          <option value="Corporate Uniform Fleets">Corporate Executive Shirts & Suits</option>
                          <option value="Hospitality & Chef Apparel">Hospitality & Chef Apparel</option>
                          <option value="Medical Scrubs & Lab Coats">Medical Scrubs & Lab Coats</option>
                          <option value="Industrial Safety Workwear">Industrial Safety Workwear (EN/ISO)</option>
                          <option value="School Uniform Fleets">School Uniform Fleets</option>
                          <option value="Bespoke Fabric Sourcing">Bespoke Fabric Sourcing / Rolls</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Estimated Quantity</label>
                        <select
                          value={contactForm.quantity}
                          onChange={(e) => setContactForm({ ...contactForm, quantity: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none cursor-pointer"
                        >
                          <option value="50 - 100 pcs">50 - 100 pcs (Sample / Initial Trial)</option>
                          <option value="100 - 500 pcs">100 - 500 pcs (Standard Bulk Order)</option>
                          <option value="500 - 2000 pcs">500 - 2,000 pcs (Commercial Fleet)</option>
                          <option value="2000+ pcs">2,000+ pcs (Enterprise GCC Fleet)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Message / Specifications</label>
                      <textarea
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tell us about your fabric preferences, embroidery requirements, sizing specs, or target delivery date..."
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#DE7B3D]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#DE7B3D] hover:bg-[#c96a2e] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Send Inquiry & Request Quote
                    </button>
                  </form>
                )}
              </div>

              {/* MAP & WORKING HOURS SIDEBAR */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* MAP CARD */}
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-3">
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 relative">
                    <iframe
                      title="Silky Textiles Dubai Deira Creek Location"
                      src="https://maps.google.com/maps?q=Baniyas%20Road,%20Deira%20Creek,%20Dubai,%20UAE&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full border-0"
                      allowFullScreen={false}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* SHOWROOM HOURS & GUARANTEE */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#DE7B3D]" />
                    Showroom Hours & Facilities
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-slate-600">Saturday – Thursday</span>
                      <span className="text-slate-900 font-bold">9:00 AM – 1:30 PM & 4:30 PM – 9:00 PM</span>
                    </div>

                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-slate-600">Friday</span>
                      <span className="text-amber-600 font-bold">Closed</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Physical Fabric Swatches & Fitting Samples in Showroom</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-[#DE7B3D] shrink-0" />
                      <span>Free UAE Doorstep Tailoring & Sizing Consultation</span>
                    </div>
                  </div>
                </div>

              </div>

            </section>

          </div>
        ) : (
          /* ============================================================ */
          /* 3. STANDARD / CUSTOM GENERAL PAGE & BLOG LAYOUT */
          /* ============================================================ */
          <div className="space-y-12">
            
            {/* HERO BANNER */}
            <section className="relative bg-slate-900 text-white pt-16 sm:pt-20 pb-20 sm:pb-24 overflow-hidden border-b border-slate-800">
              {page.featuredImage && (
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <img src={page.featuredImage} alt={page.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
                </div>
              )}

              <div className="relative max-w-[1380px] mx-auto px-6 sm:px-10 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest px-3.5 py-1 bg-[#DE7B3D] text-white rounded-full">
                    {page.pageType}
                  </span>
                  <span className="text-xs text-slate-400">
                    Silky Textiles UAE
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  {page.title}
                </h1>

                {page.subtitle && (
                  <p className="text-base sm:text-xl text-slate-300 font-medium leading-relaxed max-w-3xl">
                    {page.subtitle}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-4 border-t border-slate-800">
                  <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-[#DE7B3D]" /> {page.author || 'Silky Advisory Desk'}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> {page.updatedAt || page.createdAt || '2026'}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> ~{readTime} min read</span>
                </div>
              </div>
            </section>

            {/* MAIN CONTENT SHEET */}
            <div className="max-w-[1380px] mx-auto px-6 sm:px-10 -mt-10 sm:-mt-14 relative z-10">
              <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-14 space-y-8">
                
                <div
                  dangerouslySetInnerHTML={{ __html: cleanHtml }}
                  className="prose prose-slate max-w-none text-slate-800 leading-relaxed [&_h1]:text-3xl [&_h1]:font-black [&_h1]:text-slate-900 [&_h1]:my-6 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_h2]:my-5 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:my-4 [&_p]:my-4 [&_p]:text-slate-700 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-[#DE7B3D] [&_blockquote]:pl-5 [&_blockquote]:py-3 [&_blockquote]:bg-orange-50/50 [&_blockquote]:rounded-r-2xl [&_blockquote]:italic [&_a]:text-[#DE7B3D] [&_a]:font-bold [&_a]:underline [&_img]:rounded-2xl [&_img]:my-6 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:p-3 [&_th]:bg-slate-100 [&_td]:border [&_td]:p-3"
                />

                {/* BOTTOM CALL TO ACTION FOR ALL GENERAL PAGES */}
                <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-slate-900">Need Custom Uniform Solutions in UAE?</h3>
                    <p className="text-xs text-slate-600">Contact our corporate advisory team for bulk pricing, doorstep fitting & sample fabric swatches.</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => setIsQuoteOpen(true)}
                      className="px-6 py-3 bg-[#DE7B3D] hover:bg-[#c96a2e] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                    >
                      Request Bulk Quote ↗
                    </button>
                    <a
                      href="https://wa.me/97142261050"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-sm transition-all flex items-center justify-center"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </main>

      <SiteFooter />

      <QuoteFormModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  )
}
