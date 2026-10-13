'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { QuoteFormModal } from '@/components/quote-form'
import { ArrowUpRight, CheckCircle2, ShieldCheck, ChevronDown, Layers, Scissors, Award, Clock, ArrowRight, Shirt, Send, UserCheck, Ruler, Users, Truck, Box, Star, MapPin, Building2, PhoneCall, Check } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'

const ease: any = [0.16, 1, 0.3, 1]

// Dynamic grid class calculator so 1, 2, 3, 4, 5+ items always fill container width evenly
function getDynamicGridClass(count: number, maxCols: number = 4) {
  if (count <= 1) return 'grid grid-cols-1 max-w-2xl mx-auto'
  if (count === 2) return 'grid grid-cols-1 sm:grid-cols-2'
  if (count === 3) return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  if (maxCols === 3) return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
}

// ----------------------------------------------------------------------
// 1. PRODUCT HERO SECTION (Ultra-Smooth Slow Luxury Atelier Design)
// ----------------------------------------------------------------------
function ProductHeroSection({ data, onOpenQuote }: { data: any, onOpenQuote: () => void }) {
  const breadcrumb = data?.breadcrumb || 'Home / Products / Corporate Shirting'
  const tagline = data?.tagline || '100% EGYPTIAN COTTON • DUBAI EST. 1963'
  const title = data?.title || 'Pure Cotton Shirts Supplier in UAE'
  const description = data?.description || 'Handcrafted 100% combed cotton dress shirts and corporate uniforms tailored for Dubai executives, 5-star hotel fleets, and commercial teams. Breathable, durable, and customized with in-house logo embroidery.'
  const heroImage = data?.heroImage || '/images/textile_fabric_rolls.png'
  const badges = data?.badges || [
    { label: '100% Pure Egyptian Cotton' },
    { label: 'Dubai Direct Manufacturer' },
  ]

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.16, delayChildren: 0.08 },
    },
  }

  const itemVariants: any = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="relative bg-white text-slate-900 py-14 sm:py-18 lg:py-20 border-b border-slate-200/80 overflow-hidden select-none">
      
      {/* Dynamic Animated Ambient Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#D97A42] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.05, 0.09, 0.05],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1C7A4C] rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6 sm:space-y-7"
          >
            {/* High-Contrast Interactive Breadcrumbs */}
            <motion.div variants={itemVariants} className="flex items-center space-x-2 text-xs font-sans font-bold tracking-wider uppercase">
              <a href="/" className="text-slate-600 hover:text-[#D97A42] transition-colors">Home</a>
              <span className="text-[#D97A42] font-black">/</span>
              <span className="text-slate-600">Products</span>
              <span className="text-[#D97A42] font-black">/</span>
              <span className="text-[#0F172A] font-extrabold">{breadcrumb.split('/').pop()?.trim() || 'Corporate Shirting'}</span>
            </motion.div>

            {/* Vibrant Eyebrow Tagline & High-Impact Headline */}
            <motion.div variants={itemVariants} className="space-y-3">
              <span className="text-xs sm:text-sm font-sans font-extrabold uppercase tracking-[0.22em] text-[#D97A42] block">
                {tagline}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[56px] font-black leading-[1.1] tracking-tight text-[#0F172A]">
                {title}
              </h1>
            </motion.div>

            {/* Subtitle / Description */}
            <motion.p variants={itemVariants} className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl">
              {description}
            </motion.p>

            {/* Minimal Trendy Feature Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
              {badges.map((b: any, i: number) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 bg-white border border-slate-200/90 hover:border-[#D97A42] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-slate-800 shadow-xs cursor-pointer transition-colors"
                >
                  {i === 0 ? <UserCheck className="w-3.5 h-3.5 text-[#D97A42]" /> : <ShieldCheck className="w-3.5 h-3.5 text-[#1C7A4C]" />}
                  <span>{b.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs with Magnetic Spring physics */}
            <motion.div variants={itemVariants} className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              {data?.primaryBtnHref && data.primaryBtnHref !== '#modal' ? (
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                  href={data.primaryBtnHref}
                  className="group relative inline-flex items-center justify-center gap-3 bg-[#D97A42] hover:bg-[#c46833] px-8 sm:px-9 py-4 font-sans text-xs font-bold uppercase tracking-widest text-white rounded-xl shadow-2xl overflow-hidden cursor-pointer w-full sm:w-auto text-center"
                >
                  <div className="absolute inset-0 w-1/2 bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                  <span className="relative z-10">{data?.primaryBtnText || 'Request Bulk Quote'}</span>
                  <ArrowUpRight className="w-4.5 h-4.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-white" />
                </motion.a>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                  onClick={onOpenQuote}
                  className="group relative inline-flex items-center justify-center gap-3 bg-[#D97A42] hover:bg-[#c46833] px-8 sm:px-9 py-4 font-sans text-xs font-bold uppercase tracking-widest text-white rounded-xl shadow-2xl overflow-hidden cursor-pointer w-full sm:w-auto"
                >
                  <div className="absolute inset-0 w-1/2 bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                  <span className="relative z-10">{data?.primaryBtnText || 'Request Bulk Quote'}</span>
                  <ArrowUpRight className="w-4.5 h-4.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-white" />
                </motion.button>
              )}

              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                href={data?.secondaryBtnHref || '#specs'}
                className="inline-flex items-center justify-center gap-2 border-2 border-slate-900 hover:bg-slate-900 hover:text-white px-7 sm:px-8 py-3.5 sm:py-4 font-sans text-xs font-bold uppercase tracking-widest text-slate-900 rounded-xl transition-colors duration-300 w-full sm:w-auto text-center"
              >
                <span>{data?.secondaryBtnText || 'View Specifications'}</span>
              </motion.a>
            </motion.div>

            {/* Minimal Human Vector Trust Strip */}
            <motion.div variants={itemVariants} className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-xl">
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-[#D97A42] shrink-0" />
                <span className="text-xs font-sans font-bold text-slate-700">Custom Fit Trial</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Ruler className="w-4 h-4 text-[#1C7A4C] shrink-0" />
                <span className="text-xs font-sans font-bold text-slate-700">On-Site Sizing</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#D97A42] shrink-0" />
                <span className="text-xs font-sans font-bold text-slate-700">ISO Certified</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Column (Large Prominent Atelier Display) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            {/* 3D Glowing Ambient Halo */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#D97A42]/15 via-[#1C7A4C]/15 to-transparent rounded-[40px] blur-2xl pointer-events-none" />

            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              className="relative w-full max-w-[560px] h-[360px] sm:h-[500px] lg:h-[640px] rounded-3xl sm:rounded-[36px] overflow-hidden border-4 border-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] group cursor-pointer bg-slate-900"
            >
              {/* Main Photo */}
              <img
                src={heroImage}
                alt={title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="absolute top-6 right-6 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D97A42] animate-pulse" />
                <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-white">
                  100% Egyptian Cotton
                </span>
              </div>

              {/* Bottom Floating Studio Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-sans font-extrabold text-[#D97A42] uppercase tracking-[0.2em] block">
                      DEIRA CREEK ATELIER DIRECT
                    </span>
                    <h3 className="text-sm sm:text-base font-serif font-black text-slate-900">
                      60+ Years Master Tailoring Craftsmanship
                    </h3>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-[#1C7A4C]/10 border border-[#1C7A4C]/30 text-[#1C7A4C] flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs font-sans text-slate-600 font-medium">
                  <span>⚡ 24-Hour Quotation Response</span>
                  <span className="font-bold text-[#1C7A4C]">Direct Factory Price</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ----------------------------------------------------------------------
// 2. TECHNICAL SPECS MATRIX SECTION (Unhurried Horizontal Stagger)
// ----------------------------------------------------------------------
function SpecsMatrixSection({ data }: { data: any }) {
  const label = data?.label || 'WHY CHOOSE OUR PURE COTTON SHIRTS?'
  const title = data?.title || 'Key Fabric Features & Benefits'
  const subtitle = data?.subtitle || 'Our 100% pure combed cotton fabrics are crafted for soft hand-feel, breathability, and durability in Dubai weather.'
  const specs = data?.specs || [
    { title: 'Yarn Quality', value: '100% Fine Combed Cotton', desc: 'High-density fine yarn ensuring a smooth feel and elegant drape.' },
    { title: 'Fabric Weave', value: 'Royal Oxford & Fine Twill', desc: 'Refined texture built for executive boardrooms and daily corporate wear.' },
    { title: 'Breathability', value: 'Cool Airflow Fit', desc: 'Natural moisture-wicking properties made for the UAE summer climate.' },
    { title: 'Durability', value: 'Pre-Shrunk & Easy Iron', desc: 'Tested for 100+ commercial washes without losing shape or color.' },
  ]

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
  }

  return (
    <section id="specs" className="bg-[#FAF9F6] py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden select-none">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 space-y-10 sm:space-y-12 lg:space-y-14">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-4"
        >
          <span className="text-xs sm:text-sm font-sans font-extrabold uppercase tracking-[0.22em] text-[#D97A42] block">
            {label}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-slate-900 font-black leading-[1.12]">
            {title}
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {subtitle}
          </p>
        </motion.div>

        {/* 4 Cards Alternating Horizontal Flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className={`${getDynamicGridClass(specs.length, 4)} gap-6 sm:gap-8`}
        >
          {specs.map((spec: any, idx: number) => {
            const isEven = idx % 2 === 0
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className="bg-white border border-slate-200/80 p-8 rounded-2xl shadow-xs hover:shadow-2xl hover:border-[#D97A42]/50 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D97A42]/10 border border-[#D97A42]/30 text-[#D97A42] flex items-center justify-center font-bold text-sm overflow-hidden p-1.5">
                    {spec.iconImage ? (
                      <img src={spec.iconImage} alt={spec.title} className="w-full h-full object-contain" />
                    ) : (
                      <span>0{idx + 1}</span>
                    )}
                  </div>
                  <h3 className="font-sans text-xs font-extrabold uppercase tracking-widest text-[#1C7A4C]">
                    {spec.title}
                  </h3>
                  <div className="font-serif text-xl sm:text-2xl font-extrabold text-slate-900">
                    {spec.value}
                  </div>
                </div>

                <p className="font-sans text-xs text-slate-600 leading-relaxed font-medium pt-2 border-t border-slate-100">
                  {spec.desc}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ----------------------------------------------------------------------
// 3. CUSTOMIZATION SHOWCASE SECTION (Unhurried Left-in / Right-in Flow)
// ----------------------------------------------------------------------
function CustomizationShowcaseSection({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState(0)

  const label = data?.label || 'CUSTOM LOGO EMBROIDERY & TAILORING'
  const title = data?.title || 'Bespoke Logo Embroidery & Fitting Options'

  const defaultOptions = [
    {
      id: 0,
      title: '3D High-Definition Logo Embroidery',
      badge: '3D Chest & Collar Logos',
      desc: 'Precision computerized embroidery using gold, silver, or pantone-matched threads on chest pockets, collar tips, or sleeves.',
      image: '/images/shirt_collar_detail.png',
      icon: Scissors,
      color: '#D97A42',
      tag: 'DUBAI STUDIO DIRECT',
    },
    {
      id: 1,
      title: 'Personalized Monogrammed Cuffs',
      badge: 'Executive Monograms',
      desc: 'Custom embroidered employee initials on french cuffs or barrel cuffs for executive brand elegance.',
      image: '/images/shirt_cuff_monogram.png',
      icon: UserCheck,
      color: '#1C7A4C',
      tag: 'BESPOKE TAILORING',
    },
    {
      id: 2,
      title: 'Pearlized Buttons & Fused Collar Stays',
      badge: 'Reinforced Construction',
      desc: 'Heat-resistant mother-of-pearl buttons with fused collar stays to preserve crisp collar structure for 100+ washes.',
      image: '/images/custom_embroidery_shirt.png',
      icon: Award,
      color: '#D97A42',
      tag: 'CRAFTSMANSHIP DETAIL',
    },
    {
      id: 3,
      title: 'Executive Made-to-Measure Sizing',
      badge: 'Precision Fleet Fitting',
      desc: 'Tailored slim-fit, executive regular fit, and bespoke sizing charts tailored for entire corporate fleets.',
      image: '/images/hotel_uniform_luxury.png',
      icon: Ruler,
      color: '#1C7A4C',
      tag: 'ON-SITE FITTING',
    },
  ]

  const iconMap: Record<string, any> = {
    Scissors,
    UserCheck,
    Award,
    Ruler,
    ShieldCheck,
    Shirt,
    Layers,
    Building2,
    Truck,
    Box,
    PhoneCall,
  }

  const rawOptions = (data?.options && Array.isArray(data.options) && data.options.length > 0) ? data.options : defaultOptions
  const defaultIcons = [Scissors, UserCheck, Award, Ruler]
  const options = rawOptions.map((opt: any, idx: number) => {
    let resolvedIcon = opt.icon
    if (typeof opt.iconName === 'string' && iconMap[opt.iconName]) {
      resolvedIcon = iconMap[opt.iconName]
    } else if (typeof opt.icon === 'string' && iconMap[opt.icon]) {
      resolvedIcon = iconMap[opt.icon]
    } else if (!resolvedIcon || typeof resolvedIcon !== 'function') {
      resolvedIcon = defaultIcons[idx % defaultIcons.length] || Scissors
    }

    return {
      ...opt,
      icon: resolvedIcon,
      tag: opt.tag || opt.badge || 'CUSTOM OPTION',
    }
  })

  const activeOption = options[activeTab] || options[0] || defaultOptions[0]
  const ActiveIcon = activeOption.icon || Scissors

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden select-none">
      
      {/* Background Ambient Blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D97A42]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 relative z-10 space-y-10 sm:space-y-12 lg:space-y-14">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-3"
        >
          <span className="text-xs sm:text-sm font-sans font-extrabold uppercase tracking-[0.22em] text-[#D97A42] block">
            {label}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#0F172A] font-black leading-[1.12]">
            {title}
          </h2>
        </motion.div>

        {/* Interactive 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Side: Interactive Feature Selector Cards (Slide in from Left) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-3.5"
          >
            {options.map((opt: any, idx: number) => {
              const isActive = activeTab === idx
              const Icon = opt.icon

              return (
                <motion.div
                  key={opt.id}
                  onClick={() => setActiveTab(idx)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                    isActive
                      ? 'bg-[#FAF9F6] border-[#D97A42] shadow-md ring-1 ring-[#D97A42]/20'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-[#D97A42] text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {opt.iconImage ? (
                      <img src={opt.iconImage} alt={opt.title} className="w-5 h-5 object-contain" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-sans text-sm font-bold transition-colors ${isActive ? 'text-[#0F172A]' : 'text-slate-800'}`}>
                        {opt.title}
                      </h3>
                      {isActive && (
                        <span className="text-[10px] font-extrabold text-[#D97A42] uppercase tracking-wider bg-[#D97A42]/10 px-2.5 py-0.5 rounded-md">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-xs text-slate-600 font-medium leading-relaxed">
                      {opt.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Right Side: Single Hero Photo Visual (Slide in from Right) */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border-4 border-slate-100 shadow-2xl group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeOption.id}
                  src={activeOption.image}
                  alt={activeOption.title}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease }}
                  className="w-full h-full object-cover filter contrast-[1.02] group-hover:scale-105 transition-transform duration-700"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />

              {/* Single Clean Floating Spec Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 shadow-2xl flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-sans font-extrabold text-[#D97A42] uppercase tracking-widest block">
                    {activeOption.tag}
                  </span>
                  <span className="text-sm font-serif font-extrabold text-slate-900 block">
                    {activeOption.badge}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#D97A42]/10 border border-[#D97A42]/30 text-[#D97A42] flex items-center justify-center shrink-0">
                  {activeOption.iconImage ? (
                    <img src={activeOption.iconImage} alt={activeOption.title} className="w-5 h-5 object-contain" />
                  ) : (
                    <ActiveIcon className="w-5 h-5" />
                  )}
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Customer Value B2B Service Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-200/80"
        >
          <div className="flex items-center gap-3 bg-[#FAF9F6] p-4 rounded-xl border border-slate-200/80">
            <CheckCircle2 className="w-5 h-5 text-[#1C7A4C] shrink-0" />
            <span className="text-xs font-sans font-bold text-slate-800">Free Physical Fabric Swatch Delivery</span>
          </div>
          <div className="flex items-center gap-3 bg-[#FAF9F6] p-4 rounded-xl border border-slate-200/80">
            <CheckCircle2 className="w-5 h-5 text-[#D97A42] shrink-0" />
            <span className="text-xs font-sans font-bold text-slate-800">24-Hour Digital Logo Proofing</span>
          </div>
          <div className="flex items-center gap-3 bg-[#FAF9F6] p-4 rounded-xl border border-slate-200/80">
            <CheckCircle2 className="w-5 h-5 text-[#1C7A4C] shrink-0" />
            <span className="text-xs font-sans font-bold text-slate-800">100% Quality Stitching Guarantee</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

// ----------------------------------------------------------------------
// 4. SECTORS SECTION (Unhurried Bottom-Up Lift)
// ----------------------------------------------------------------------
function SectorsSection({ data, onOpenQuote }: { data: any, onOpenQuote: () => void }) {
  const label = data?.label || 'INDUSTRIES WE SUPPLY'
  const title = data?.title || 'Tailored Cotton Shirts for Corporate & Hotel Fleets'
  
  const defaultSectors = [
    { title: 'Corporate Executives', desc: 'Crisp white & sky blue formal shirts for boardrooms, banks, and DIFC firms.', image: '/images/hero_corporate_uniforms.png' },
    { title: 'Luxury Hotel Front-Desk', desc: 'Elegant front-desk concierge and waiter shirts for 5-star Dubai resorts.', image: '/images/hotel_uniform_luxury.png' },
    { title: 'Aviation & Valet Fleets', desc: 'Durable easy-iron uniforms designed for high-frequency daily wear.', image: '/images/sector_corporate.png' },
  ]

  const rawItems = (data?.items && Array.isArray(data.items) && data.items.length > 0)
    ? data.items
    : (data?.uniforms && Array.isArray(data.uniforms) && data.uniforms.length > 0)
    ? data.uniforms
    : defaultSectors

  const items = rawItems

  const containerVariants: any = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  }

  const cardVariants: any = {
    hidden: { opacity: 0, y: 45 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="bg-[#FAF9F6] py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden select-none">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 space-y-10 sm:space-y-12 lg:space-y-14">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-3"
        >
          <span className="text-xs sm:text-sm font-sans font-extrabold uppercase tracking-[0.22em] text-[#D97A42] block">
            {label}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#0F172A] font-black leading-[1.12]">
            {title}
          </h2>
        </motion.div>

        {/* Fleet Grid Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className={`${getDynamicGridClass(items.length, 4)} gap-6 sm:gap-8`}
        >
          {items.map((item: any, idx: number) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#D97A42]/40 transition-all duration-300 group flex flex-col justify-between cursor-pointer"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-6 sm:p-7 space-y-3">
                <h3 className="font-serif text-2xl font-extrabold text-[#0F172A] group-hover:text-[#D97A42] transition-colors">{item.title}</h3>
                <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                {item.btnHref || item.link ? (
                  <a href={item.btnHref || item.link} className="pt-2 text-xs font-bold uppercase tracking-widest text-[#D97A42] inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    <span>{item.btnText || 'Request Sector Quote'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <button onClick={onOpenQuote} className="pt-2 text-xs font-bold uppercase tracking-widest text-[#D97A42] inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform cursor-pointer">
                    <span>{item.btnText || 'Request Sector Quote'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

// ----------------------------------------------------------------------
// 5. FAQ SECTION (Unhurried Alternating Slide Animation)
// ----------------------------------------------------------------------
function ProductFaqSection({ data, openIndex, onToggle }: { data: any, openIndex: number | null, onToggle: (i: number) => void }) {
  const label = data?.label || 'FREQUENTLY ASKED QUESTIONS'
  const title = data?.title || 'B2B Purchasing & Supply FAQ'

  const defaultFaqs = [
    { q: 'What is the Minimum Order Quantity (MOQ) for custom cotton shirts?', a: 'Our standard MOQ starts from 25 pieces for custom embroidered shirts, with flexible bulk tiers for larger corporate fleets.' },
    { q: 'Can you deliver physical fabric swatches before placing an order?', a: 'Yes! We provide complimentary physical swatch cards and sample shirts directly to your office across Dubai and the UAE.' },
    { q: 'Do you offer on-site employee trial fittings?', a: 'Our master tailors provide on-site sizing fittings at your office or hotel headquarters to ensure 100% perfect fit for every staff member.' },
    { q: 'What is the standard lead time for bespoke uniform orders in Dubai?', a: 'Standard production & delivery is 5-7 business days across the UAE, with express 48-hour rush orders available for urgent corporate events.' },
  ]

  const faqs = (data?.faqs && data.faqs.length > 0) ? data.faqs : defaultFaqs

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
  }

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden select-none">
      <div className="max-w-[1000px] mx-auto px-6 sm:px-10 space-y-10 sm:space-y-12 lg:space-y-14">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <span className="text-xs sm:text-sm font-sans font-extrabold uppercase tracking-[0.22em] text-[#D97A42] block">
            {label}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0F172A] font-black leading-tight">
            {title}
          </h2>
        </motion.div>

        {/* Accordion List with Alternating Directional Slide */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq: any, idx: number) => {
            const isOpen = openIndex === idx
            const isLeft = idx % 2 === 0

            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: isLeft ? -40 : 40 },
                  visible: { opacity: 1, x: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="border border-slate-200/90 rounded-2xl overflow-hidden bg-[#FAF9F6] shadow-xs transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() => onToggle(idx)}
                  className="w-full p-6 text-left font-serif text-lg font-bold text-[#0F172A] flex items-center justify-between gap-4 hover:text-[#D97A42] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 shrink-0 text-[#D97A42] ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 font-sans text-sm text-slate-600 leading-relaxed font-medium border-t border-slate-200/60">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}

// ----------------------------------------------------------------------
// 11. QUOTE BAND & EMBEDDED FORM SECTION (Warm Human Dubai Atelier Studio)
// ----------------------------------------------------------------------
function QuoteBandSection({ data, onOpenQuote }: { data: any, onOpenQuote: () => void }) {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['100% Pure Cotton Fabrics', 'Custom Embroidered Shirts'])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const label = data?.label || 'DEIRA CREEK SHOWROOM • DUBAI EST. 1963'
  const title = data?.title || 'Request A Custom Quotation'
  const subtitle = data?.subtitle || 'Send us your quantity & custom shirt details. Our Dubai sales team will prepare your quotation within 2 hours.'
  const productsList = data?.productsList || ['Custom Embroidered Shirts', '100% Pure Cotton Fabrics', 'Hotel & Hospitality Uniforms', 'Corporate Executive Wear']
  
  const rightTag = data?.rightTag || 'DEIRA CREEK SHOWROOM • DUBAI EST. 1963'
  const rightTitle = data?.rightTitle || 'Silky Textiles & Garments LLC'
  const rightSubtitle = data?.rightSubtitle || "Dubai's trusted bespoke tailors & corporate uniform partner."
  const addressTitle = data?.addressTitle || 'Main Showroom & Atelier'
  const addressDetail = data?.addressDetail || 'Deira Creek District, Al Ras, Dubai, UAE'
  const phone = data?.phone || '+971 4 228 1234'
  const guaranteeText = data?.guaranteeText || '⚡ Average reply in under 2 hours'
  const bgImage = data?.bgImage || '/images/hotel_uniform_luxury.png'

  const toggleProduct = (item: string) => {
    if (selectedProducts.includes(item)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== item))
    } else {
      setSelectedProducts([...selectedProducts, item])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <section id="quote-form-section" className="bg-[#FAF9F6] py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden select-none">
      
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Main 2-Column Warm Human Atelier Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Left Column: Tactile Human Quote Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white text-slate-900 p-6 sm:p-10 rounded-2xl shadow-xl space-y-6 border border-slate-200/90 relative overflow-hidden"
          >
            {/* Top Warm Gold Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#D97A42]" />

            <div className="space-y-2 border-b border-slate-100 pb-5">
              <span className="text-xs sm:text-sm font-sans font-extrabold uppercase tracking-[0.22em] text-[#D97A42] block">
                {label}
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                {title}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {subtitle}
              </p>
            </div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#1C7A4C]/15 border border-[#1C7A4C]/30 text-[#1C7A4C] flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-black text-slate-900">Quotation Request Received!</h3>
                <p className="font-sans text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
                  Thank you <span className="text-[#D97A42] font-bold">{formData.name || 'valued client'}</span>. Our Dubai sales team has received your request and will contact you directly within 2 hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="pt-2 text-xs font-bold uppercase tracking-wider text-[#D97A42] hover:underline cursor-pointer"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                
                {/* Name */}
                <div>
                  <label className="block text-[10px] font-sans font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                    Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-[#FAF9F6] border border-slate-300 text-xs sm:text-sm font-sans text-slate-900 placeholder-slate-400 rounded-xl focus:border-[#D97A42] focus:bg-white focus:outline-none transition-all shadow-inner"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email Address"
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-slate-300 text-xs sm:text-sm font-sans text-slate-900 placeholder-slate-400 rounded-xl focus:border-[#D97A42] focus:bg-white focus:outline-none transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Work Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Work Phone Number"
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-slate-300 text-xs sm:text-sm font-sans text-slate-900 placeholder-slate-400 rounded-xl focus:border-[#D97A42] focus:bg-white focus:outline-none transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Product Type Requirements */}
                <div className="space-y-2 pt-1">
                  <label className="block text-[10px] font-sans font-extrabold uppercase tracking-wider text-slate-700">
                    Select Requirements:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {productsList.map((p: string) => {
                      const isChecked = selectedProducts.includes(p)
                      return (
                        <button
                          type="button"
                          key={p}
                          onClick={() => toggleProduct(p)}
                          className={`p-3 rounded-xl border text-left text-xs font-sans font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                            isChecked
                              ? 'bg-[#FAF9F6] border-[#D97A42] text-[#D97A42] shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-[#D97A42] border-[#D97A42] text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>{p}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-[10px] font-sans font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                    Any Additional Message:
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your estimated quantity or specific requirements..."
                    className="w-full px-4 py-3 bg-[#FAF9F6] border border-slate-300 text-xs sm:text-sm font-sans text-slate-900 placeholder-slate-400 rounded-xl focus:border-[#D97A42] focus:bg-white focus:outline-none transition-all resize-none shadow-inner"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-sans font-bold text-xs uppercase tracking-widest py-4 rounded-xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span>Get Quotation</span>
                  <Send className="w-4 h-4 text-[#D97A42]" />
                </motion.button>

              </form>
            )}

          </motion.div>

          {/* Right Column: Visually Rich Dubai Showroom & Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800 flex flex-col justify-between space-y-6 relative overflow-hidden group min-h-[580px]"
          >
            {/* Top Photoshoot Background Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={bgImage}
                alt="Silky Textiles Dubai Showroom & Uniform Fleet"
                className="w-full h-full object-cover filter contrast-[1.08] group-hover:scale-105 transition-transform duration-700 opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40 pointer-events-none" />
            </div>

            {/* Content Body */}
            <div className="relative z-10 p-8 sm:p-10 space-y-6">
              
              {/* Header */}
              <div className="space-y-2 border-b border-slate-800 pb-5">
                <span className="text-[10px] font-sans font-extrabold text-[#D97A42] uppercase tracking-[0.2em] bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full inline-block border border-white/10 shadow-sm">
                  {rightTag}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-white leading-tight">
                  {rightTitle}
                </h3>
                <p className="font-sans text-xs text-slate-400 font-medium">
                  {rightSubtitle}
                </p>
              </div>

              {/* 3 Floating Tactile Contact Cards */}
              <div className="space-y-3 font-sans text-xs">
                
                {/* Showroom Card */}
                <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800 p-3.5 rounded-2xl flex items-start gap-3 shadow-md hover:border-[#D97A42]/40 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-[#D97A42]/15 text-[#D97A42] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs sm:text-sm">{addressTitle}</div>
                    <div className="text-slate-400 text-[11px]">{addressDetail}</div>
                  </div>
                </div>

                {/* Direct Phone Card */}
                <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3 shadow-md hover:border-[#D97A42]/40 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-[#D97A42]/15 text-[#D97A42] flex items-center justify-center shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs sm:text-sm">Direct Sales Inquiry</div>
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-slate-300 font-semibold hover:text-[#D97A42] transition-colors text-[11px]">{phone}</a>
                  </div>
                </div>

                {/* Response Guarantee Card */}
                <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3 shadow-md hover:border-[#1C7A4C]/40 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-[#1C7A4C]/15 text-[#1C7A4C] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs sm:text-sm">Response Time Guarantee</div>
                    <div className="text-[#1C7A4C] font-semibold text-[11px]">{guaranteeText}</div>
                  </div>
                </div>

              </div>

              {/* Guarantees List */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs font-sans text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#1C7A4C] shrink-0" />
                  <span>Free Physical Fabric Swatch Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#1C7A4C] shrink-0" />
                  <span>On-Site Employee Trial Fitting Sessions</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#1C7A4C] shrink-0" />
                  <span>Direct Factory Wholesale Pricing</span>
                </div>
              </div>

            </div>

            {/* Bottom Action Bar */}
            <div className="relative z-10 p-8 pt-0">
              <a
                href="https://wa.me/97142261050"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#25D366] hover:bg-[#1eb857] text-white text-xs font-bold uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-xl cursor-pointer hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99]"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>Chat Direct on WhatsApp</span>
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}

// ----------------------------------------------------------------------
// 5. FABRIC WEAVE & COLOR PALETTE SWATCHES SECTION (Section 5)
// ----------------------------------------------------------------------
function FabricSwatchesSection({ data, onOpenQuote }: { data: any, onOpenQuote: () => void }) {
  const [selectedColor, setSelectedColor] = useState(0)

  const label = data?.label || 'FABRIC TYPES & COLOR SELECTION'
  const title = data?.title || 'Choose Your Fabric Weave & Color Palette'

  const colors = [
    { name: 'Executive White', hex: '#FFFFFF', border: 'border-slate-300', tag: 'Standard Corporate' },
    { name: 'Sky Blue', hex: '#E0F2FE', border: 'border-sky-300', tag: 'Popular DIFC Choice' },
    { name: 'Navy Blue', hex: '#1E3A8A', border: 'border-blue-900', tag: 'Executive Management' },
    { name: 'Soft Pink', hex: '#FCE7F3', border: 'border-pink-300', tag: 'Hospitality Concierge' },
    { name: 'Charcoal Gray', hex: '#334155', border: 'border-slate-700', tag: 'Modern Uniform Fleet' },
  ]

  const weaves = [
    { name: 'Royal Oxford', desc: 'Heavyweight textured basket weave with matte sheen for formal suiting.', gsm: '140 GSM' },
    { name: 'Fine Twill', desc: 'Diagonal rib weave engineered for easy ironing and wrinkle resistance.', gsm: '135 GSM' },
    { name: 'Pinpoint Cotton', desc: 'Fine breathable grid pattern tailored for hot Gulf summer climates.', gsm: '125 GSM' },
  ]

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden select-none">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 space-y-10 sm:space-y-12 lg:space-y-14">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-3"
        >
          <div className="inline-flex items-center space-x-2 bg-[#D97A42]/10 border border-[#D97A42]/25 px-3.5 py-1 rounded-full shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97A42]" />
            <span className="text-[11px] font-sans font-extrabold uppercase tracking-[0.22em] text-[#D97A42]">
              {label}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#0F172A] font-black leading-[1.12]">
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Swatch Color Selector */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="font-serif text-xl font-bold text-slate-900">Custom Dye Color Selection</h3>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
              {colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(i)}
                  className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 cursor-pointer ${
                    selectedColor === i ? 'border-[#D97A42] bg-[#FAF9F6] shadow-md scale-105' : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full border shadow-inner ${c.border}`} style={{ backgroundColor: c.hex }} />
                  <span className="text-[10px] font-sans font-bold text-slate-800 text-center leading-tight">{c.name}</span>
                </button>
              ))}
            </div>

            <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-[#D97A42] uppercase tracking-widest block">{colors[selectedColor].tag}</span>
                <span className="text-sm font-serif font-bold text-slate-900">{colors[selectedColor].name} Standard Fabric Swatch</span>
              </div>
              {data?.swatchBtnHref && data.swatchBtnHref !== '#modal' ? (
                <a href={data.swatchBtnHref} className="text-xs font-bold uppercase tracking-wider text-[#D97A42] inline-flex items-center gap-1.5 hover:underline cursor-pointer">
                  <span>{data?.swatchBtnText || data?.btnText || 'Request Sample Swatch'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button onClick={onOpenQuote} className="text-xs font-bold uppercase tracking-wider text-[#D97A42] inline-flex items-center gap-1.5 hover:underline cursor-pointer">
                  <span>{data?.swatchBtnText || data?.btnText || 'Request Sample Swatch'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Right: Fabric Weave Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-4"
          >
            <h3 className="font-serif text-xl font-bold text-slate-900">Available Premium Weaves</h3>

            <div className="space-y-3">
              {weaves.map((w, idx) => (
                <div key={idx} className="bg-[#FAF9F6] p-5 rounded-2xl border border-slate-200/80 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#D97A42]" />
                      <h4 className="font-sans text-sm font-bold text-slate-900">{w.name}</h4>
                    </div>
                    <p className="font-sans text-xs text-slate-600 font-medium">{w.desc}</p>
                  </div>
                  <span className="text-[11px] font-extrabold text-[#1C7A4C] bg-[#1C7A4C]/10 px-2.5 py-1 rounded-md shrink-0">
                    {w.gsm}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}

// ----------------------------------------------------------------------
// 6. MANUFACTURING & QUALITY CONTROL TIMELINE (Interactive Stepper Studio)
// ----------------------------------------------------------------------
function QualityCraftsmanshipSection({ data }: { data: any }) {
  const [activeStep, setActiveStep] = useState(0)

  const label = data?.label || 'ISO 9001:2015 CERTIFIED MANUFACTURING'
  const title = data?.title || '4-Step Quality Assurance Process'
  const subtitle = data?.subtitle || 'Click any step below to explore our rigorous 4-stage manufacturing standards engineered for corporate uniform durability in the Gulf climate.'

  const defaultSteps = [
    {
      num: '01',
      title: 'Combed Egyptian Yarn Sourcing',
      shortDesc: 'Extra-long staple cotton yarn from certified spinning mills.',
      fullDesc: 'Hand-picked extra-long staple combed cotton yarn imported directly from certified Egyptian spinning mills, ensuring maximum tensile strength and silk-soft hand-feel.',
      metric: '100% Extra-Long Staple',
      image: '/images/textile_fabric_rolls.png',
      badge: 'STILL YARN SOURCING',
      points: [
        'Zero synthetic blending',
        'High-density 120/2 ply yarn structure',
        'Certified OEKO-TEX STANDARD 100',
      ],
    },
    {
      num: '02',
      title: 'Pre-Shrinkage & Mercerization',
      shortDesc: 'Double mercerized bath treatment with < 1% shrinkage.',
      fullDesc: 'Sodium hydroxide bath treatment under tension (double mercerization) locks in vibrant dye fastness, enhances natural fabric lustre, and guarantees less than 1% shrinkage after 100+ commercial laundry cycles.',
      metric: '< 1% Residual Shrinkage',
      image: '/images/custom_embroidery_shirt.png',
      badge: 'MERCERIZATION BATH',
      points: [
        'Tested for 100+ industrial washes',
        'Wrinkle-resistant easy iron finish',
        'Vibrant color retention guaranteed',
      ],
    },
    {
      num: '03',
      title: '18-Stitch High-Density Sewing',
      shortDesc: 'Precision single-needle stitching at 18 stitches per inch.',
      fullDesc: 'Master tailors execute single-needle lockstitching at 18 stitches per inch with reinforced armhole seam taping, mother-of-pearl buttons, and rigid collar stays.',
      metric: '18 Stitches / Inch',
      image: '/images/shirt_collar_detail.png',
      badge: 'HIGH-DENSITY CRAFT',
      points: [
        'Reinforced armholes & side gussets',
        'Custom monogrammed cuffs & initial embroidery',
        'Non-curl collar stays built-in',
      ],
    },
    {
      num: '04',
      title: 'Final Inspection in Dubai',
      shortDesc: '100% manual quality audit at Deira atelier before dispatch.',
      fullDesc: 'Every garment undergoes a 12-point manual inspection at our Deira Creek headquarters including button tension tests, thread trimming, steam pressing, and custom polybag sealing.',
      metric: '100% Manual Audit',
      image: '/images/hotel_uniform_luxury.png',
      badge: 'DEIRA ATELIER AUDIT',
      points: [
        '12-point individual garment inspection',
        'Professional steam pressing & folding',
        'Express dispatch across Dubai & 7 Emirates',
      ],
    },
  ]

  const steps = (data?.steps && Array.isArray(data.steps) && data.steps.length > 0)
    ? data.steps
    : (data?.points && Array.isArray(data.points) && data.points.length > 0)
    ? data.points
    : defaultSteps

  const current = steps[activeStep] || steps[0]

  return (
    <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 relative overflow-hidden select-none">
      
      {/* Ambient Lighting Orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,#1C7A4C_0%,transparent_70%)] pointer-events-none"
      />

      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 relative z-10 space-y-10 sm:space-y-12 lg:space-y-14">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.0, ease }}
          className="max-w-3xl space-y-3"
        >
          <span className="text-xs sm:text-sm font-sans font-extrabold uppercase tracking-[0.22em] text-[#1C7A4C] block">
            ISO 9001:2015 CERTIFIED MANUFACTURING
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-white font-black leading-tight">
            4-Step Quality Assurance Process
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-400 font-medium leading-relaxed max-w-2xl">
            Click any step below to explore our rigorous 4-stage manufacturing standards engineered for corporate uniform durability in the Gulf climate.
          </p>
        </motion.div>

        {/* Main 2-Column Split Interactive Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Interactive Step Selector */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((s: any, idx: number) => {
              const isActive = activeStep === idx
              return (
                <motion.div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  whileHover={{ x: 4 }}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'bg-slate-900 border-[#1C7A4C] shadow-[0_10px_30px_-10px_rgba(28,122,76,0.3)]'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  {/* Left Active Accent Line */}
                  {isActive && (
                    <motion.div
                      layoutId="active-step-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#1C7A4C]"
                    />
                  )}

                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-serif text-sm font-black shrink-0 transition-colors ${
                      isActive ? 'bg-[#1C7A4C] text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}>
                      {s.num}
                    </div>

                    <div className="space-y-1">
                      <h3 className={`font-serif text-base sm:text-lg font-bold transition-colors ${
                        isActive ? 'text-white' : 'text-slate-300'
                      }`}>
                        {s.title}
                      </h3>
                      <p className="font-sans text-xs text-slate-400 font-medium leading-relaxed">
                        {s.shortDesc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Right Column: Dynamic Visual Detail Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden"
              >
                {/* Top Header & Metric Pill */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-sans font-extrabold text-[#D97A42] uppercase tracking-widest">
                      STAGE {current.num} OF 04 • {current.badge}
                    </span>
                    <h3 className="font-serif text-2xl font-black text-white">
                      {current.title}
                    </h3>
                  </div>

                  <div className="bg-[#1C7A4C]/20 border border-[#1C7A4C]/40 px-3.5 py-1.5 rounded-full">
                    <span className="text-xs font-sans font-bold text-[#1C7A4C]">
                      {current.metric}
                    </span>
                  </div>
                </div>

                {/* Imagery Preview */}
                <div className="h-56 sm:h-64 rounded-2xl overflow-hidden relative border border-slate-800">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-3 rounded-xl">
                    <p className="text-xs font-sans text-slate-300 font-medium leading-relaxed">
                      {current.fullDesc}
                    </p>
                  </div>
                </div>

                {/* Key Specification Bullets */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-sans font-extrabold uppercase tracking-wider text-slate-400">
                    STAGE AUDIT SPECIFICATIONS:
                  </span>
                  <div className={`${getDynamicGridClass(current.points.length, 3)} gap-3`}>
                    {current.points.map((pt: any, i: number) => (
                      <div key={i} className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1C7A4C] shrink-0" />
                        <span className="text-[11px] font-sans font-semibold text-slate-200 leading-tight">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}

// ----------------------------------------------------------------------
// 7. CORPORATE FLEET BULK PRICING TIERS (Section 7)
// ----------------------------------------------------------------------
function BulkPricingTiersSection({ data, onOpenQuote }: { data: any, onOpenQuote: () => void }) {
  const label = data?.label || 'WHOLESALE & BULK DISCOUNTS'
  const title = data?.title || 'Wholesale Volume Discount Tiers'
  const subtitle = data?.subtitle || 'Transparent volume tier pricing with complimentary logo embroidery, swatch delivery, and express UAE dispatch.'

  const calloutTitle = data?.calloutTitle || 'Need Custom Volume Above 1,000 Pieces?'
  const calloutDesc = data?.calloutDesc || 'Our Dubai manufacturing atelier produces over 50,000 corporate shirts annually. Contact our direct enterprise wholesale team for contract pricing & custom fabric weaving.'
  const calloutBtnText = data?.calloutBtnText || 'Contact Wholesale Director'

  const defaultTiers = [
    {
      title: 'Sample & Pilot Fleet',
      range: '25 – 50 Pieces',
      priceNote: 'Standard Wholesale Rate',
      desc: 'Ideal for small executive teams, initial trial orders, and quality verification.',
      badge: 'PILOT TIER',
      highlight: false,
      features: [
        'Complimentary Logo Digitizing Setup',
        'Physical Fabric Swatch Box Delivery',
        'Standard 5-7 Business Day UAE Dispatch',
        'Flexible Size Ratio Selection',
      ],
    },
    {
      title: 'Corporate Fleet Tier',
      range: '50 – 250 Pieces',
      priceNote: 'Most Popular • 15% Volume Discount',
      desc: 'Includes complimentary logo embroidery and free physical swatch delivery to your office.',
      badge: 'MOST POPULAR',
      highlight: true,
      features: [
        'Free 3D High-Definition Logo Embroidery',
        'On-Site Staff Sizing Trial Fittings',
        'Express 48-Hour Rush Order Option',
        'Dedicated Dubai Account Manager',
        'Complimentary Insured Shipping Across UAE',
      ],
    },
    {
      title: 'Wholesale Enterprise',
      range: '500+ Pieces',
      priceNote: 'Best Value • 25% Volume Discount',
      desc: 'Dedicated Dubai account director, custom pantone dye, and priority dispatch for regional chains.',
      badge: 'BEST VALUE',
      highlight: false,
      features: [
        'Custom Pantone Yarn & Fabric Dyeing',
        '25% Tier Wholesale Volume Discount',
        'Dedicated Senior Sales Director',
        'Priority Atelier Production Allocation',
        'Custom Woven Brand & Care Labels',
      ],
    },
  ]

  const tiers = (data?.tiers && data.tiers.length > 0) ? data.tiers : defaultTiers

  return (
    <section id="pricing" className="bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden select-none">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 space-y-10 sm:space-y-12 lg:space-y-14">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-3"
        >
          <span className="text-xs sm:text-sm font-sans font-extrabold uppercase tracking-[0.22em] text-[#D97A42] block">
            {label}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#0F172A] font-black leading-[1.12]">
            {title}
          </h2>
          {subtitle && (
            <p className="font-sans text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Tier Cards */}
        <div className={`${getDynamicGridClass(tiers.length, 4)} gap-6 sm:gap-8 items-stretch`}>
          {tiers.map((t: any, idx: number) => {
            const isHighlighted = Boolean(t.highlight || t.highlighted)
            const featureList = t.features || t.points || (idx === 0 ? defaultTiers[0].features : idx === 1 ? defaultTiers[1].features : defaultTiers[2].features)

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                className={`p-6 sm:p-7 rounded-2xl border flex flex-col justify-between space-y-6 transition-all duration-300 ${
                  isHighlighted
                    ? 'bg-[#FAF9F6] border-[#D97A42] shadow-xl ring-2 ring-[#D97A42]/20'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="space-y-6">
                  {/* Top Badge & Box Icon */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-md ${
                      isHighlighted ? 'bg-[#D97A42] text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {t.badge || 'BULK TIER'}
                    </span>
                    <Box className="w-5 h-5 text-[#D97A42]" />
                  </div>

                  {/* Title & Quantity Range */}
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-black text-slate-900">{t.title}</h3>
                    <div className="text-xl font-sans font-black text-[#D97A42]">{t.range}</div>
                    {t.priceNote && (
                      <div className="text-[11px] font-sans font-bold text-[#1C7A4C] uppercase tracking-wider">
                        {t.priceNote}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs text-slate-600 leading-relaxed font-medium border-b border-slate-100 pb-4">
                    {t.desc}
                  </p>

                  {/* Feature Bullet Points Checklist */}
                  {Array.isArray(featureList) && featureList.length > 0 && (
                    <div className="space-y-2.5 pt-1 font-sans text-xs">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Included Services & Perks:</span>
                      {featureList.map((f: string, fIdx: number) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#1C7A4C] shrink-0 mt-0.5" />
                          <span className="leading-tight">{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={onOpenQuote}
                  className={`w-full py-4 text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-md ${
                    isHighlighted ? 'bg-[#D97A42] text-white hover:bg-[#c46833]' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  Request Tier Quote
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Wholesale Enterprise Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden"
        >
          <div className="space-y-2 max-w-3xl">
            <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#D97A42] bg-[#D97A42]/10 px-3 py-1 rounded-md border border-[#D97A42]/20 inline-block">
              ENTERPRISE FLEET CONTRACTS
            </span>
            <h3 className="font-serif text-2xl font-black text-white">{calloutTitle}</h3>
            <p className="font-sans text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              {calloutDesc}
            </p>
          </div>
          {data?.calloutBtnHref && data.calloutBtnHref !== '#modal' ? (
            <a
              href={data.calloutBtnHref}
              className="px-8 py-4 bg-[#D97A42] hover:bg-[#c46833] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>{calloutBtnText}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          ) : (
            <button
              onClick={onOpenQuote}
              className="px-8 py-4 bg-[#D97A42] hover:bg-[#c46833] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>{calloutBtnText}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
        </motion.div>

      </div>
    </section>
  )
}

// ----------------------------------------------------------------------
// 8. EXPRESS LOGISTICS & UAE DISTRIBUTION (Section 8)
// ----------------------------------------------------------------------
function LogisticsCoverageSection({ data }: { data: any }) {
  const label = data?.label || 'EXPRESS LOGISTICS & GCC DISPATCH'
  const title = data?.title || 'Nationwide UAE & Regional Delivery Telemetry'
  const leftCardTitle = data?.leftCardTitle || 'Deira Direct Dispatch'
  const metric1Label = data?.metric1Label || 'Dispatch Guarantee'
  const metric1Value = data?.metric1Value || '100% On-Time'
  const metric2Label = data?.metric2Label || 'Coverage Hubs'
  const metric2Value = data?.metric2Value || 'All 7 Emirates'
  const leftCardNote = data?.leftCardNote || 'Complimentary insured shipping on all orders over 50 pieces.'

  const defaultRoutes = [
    { hub: 'Dubai Atelier & DIFC Direct', status: 'Same-Day Dispatch', time: 'Under 6 Hours', badge: 'EXPRESS VAN', icon: MapPin },
    { hub: 'Abu Dhabi, Sharjah & Al Ain', status: '24-Hour Capital Courier', time: 'Next Morning', badge: 'DAILY FREIGHT', icon: Truck },
    { hub: 'GCC Region (KSA, Oman, Qatar, Kuwait)', status: '48-Hour Air & Overland', time: '2-3 Business Days', badge: 'AIR & LAND', icon: Box },
  ]

  const routes = (data?.routes && data.routes.length > 0) ? data.routes : defaultRoutes

  return (
    <section className="bg-[#0F172A] text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800 relative overflow-hidden select-none">
      
      {/* Dynamic Ambient Glowing Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -right-32 w-[650px] h-[650px] bg-[#D97A42] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-32 -left-32 w-[550px] h-[550px] bg-[#1C7A4C] rounded-full blur-3xl pointer-events-none"
      />

      {/* Low-Transparency Geometric Radar & Telemetry SVG Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center">
        <svg className="w-full h-full text-[#D97A42]" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="500" cy="500" r="450" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="500" cy="500" r="320" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="500" cy="500" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="500" cy="500" r="60" stroke="currentColor" strokeWidth="2" />
          
          <line x1="500" y1="50" x2="500" y2="950" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" />
          <line x1="50" y1="500" x2="950" y2="500" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" />
          <line x1="180" y1="180" x2="820" y2="820" stroke="currentColor" strokeWidth="0.75" />
          <line x1="820" y1="180" x2="180" y2="820" stroke="currentColor" strokeWidth="0.75" />

          <path d="M100 100 H140 M100 100 V140" stroke="currentColor" strokeWidth="2" />
          <path d="M900 100 H860 M900 100 V140" stroke="currentColor" strokeWidth="2" />
          <path d="M100 900 H140 M100 900 V860" stroke="currentColor" strokeWidth="2" />
          <path d="M900 900 H860 M900 900 V860" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 relative z-10 space-y-10 sm:space-y-12 lg:space-y-14">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-3"
        >
          <span className="text-xs sm:text-sm font-sans font-extrabold uppercase tracking-[0.22em] text-[#D97A42] block">
            {label}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-white font-black leading-[1.12]">
            {title}
          </h2>
        </motion.div>

        {/* Split Telemetry Stepper Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Telemetry Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-6 sm:p-7 rounded-2xl space-y-6 shadow-2xl relative overflow-hidden group hover:border-[#D97A42]/60 hover:shadow-[0_0_35px_rgba(217,122,66,0.15)] transition-all duration-500"
          >
            <div className="absolute -right-12 -bottom-12 w-48 h-48 border-2 stroke-dasharray border-[#D97A42]/10 rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            <div className="flex items-center justify-between border-b border-slate-800/90 pb-5 relative z-10">
              <div>
                <span className="text-[10px] font-sans font-extrabold text-[#D97A42] uppercase tracking-widest block flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D97A42] animate-pulse" />
                  HUB TELEMETRY
                </span>
                <span className="text-lg font-serif font-black text-white">{leftCardTitle}</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-[#D97A42]/20 border border-[#D97A42]/40 text-[#D97A42] flex items-center justify-center shadow-lg">
                <Truck className="w-5 h-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 space-y-1 hover:border-[#1C7A4C]/50 transition-colors">
                <span className="text-[10px] font-sans font-bold text-slate-400 block uppercase">{metric1Label}</span>
                <span className="text-xl font-sans font-black text-[#1C7A4C]">{metric1Value}</span>
              </div>
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 space-y-1 hover:border-[#D97A42]/50 transition-colors">
                <span className="text-[10px] font-sans font-bold text-slate-400 block uppercase">{metric2Label}</span>
                <span className="text-xl font-sans font-black text-[#D97A42]">{metric2Value}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-300 font-medium relative z-10">
              <CheckCircle2 className="w-4 h-4 text-[#1C7A4C] shrink-0" />
              <span>{leftCardNote}</span>
            </div>
          </motion.div>

          {/* Right Stepper Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-4"
          >
            {routes.map((r: any, idx: number) => {
              const Icon = r.icon || (idx === 0 ? MapPin : idx === 1 ? Truck : Box)
              return (
                <motion.div
                  key={idx}
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-6 rounded-2xl flex items-center justify-between gap-4 shadow-sm hover:border-[#D97A42]/60 hover:bg-slate-900 hover:shadow-[0_0_30px_rgba(217,122,66,0.12)] transition-all duration-300 cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D97A42]/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#D97A42]/10 border border-[#D97A42]/30 text-[#D97A42] flex items-center justify-center shrink-0 shadow-xs">
                      {r.iconImage ? (
                        <img src={r.iconImage} alt={r.hub} className="w-5 h-5 object-contain" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-sans text-sm font-bold text-white">{r.hub}</h3>
                        <span className="text-[9px] font-extrabold text-[#1C7A4C] bg-[#1C7A4C]/20 border border-[#1C7A4C]/40 px-2 py-0.5 rounded uppercase">
                          {r.badge}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-slate-400 font-medium">{r.status}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-sans font-extrabold text-[#D97A42] block">{r.time}</span>
                    <span className="text-[10px] font-sans text-slate-500 font-bold uppercase">Transit Window</span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

        </div>

      </div>
    </section>
  )
}

// ----------------------------------------------------------------------
// 9. CLIENT REVIEWS & CASE STUDIES (Section 9)
// ----------------------------------------------------------------------
function ClientTestimonialsSection({ data }: { data: any }) {
  const label = data?.label || 'VERIFIED B2B CLIENT REVIEWS'
  const title = data?.title || 'Trusted by Corporate & Hotel Fleets Across UAE'
  const subtitle = data?.subtitle || 'Scroll horizontally or hover to pause the continuous client testimonial ticker.'

  const defaultReviews = [
    {
      quote: "Silky Textiles supplied over 400 executive cotton shirts for our DIFC office staff. The fit and embroidery accuracy exceeded expectations.",
      author: "Tariq Al-Mansoor",
      role: "Corporate Operations Director, DIFC Bank",
      location: "Dubai, UAE",
      rating: 5,
    },
    {
      quote: "The breathability of their 100% Egyptian cotton shirts is unmatched for Dubai's climate. Our hotel front-desk team looks impeccably sharp every day.",
      author: "Elena Rostova",
      role: "Procurement Manager, 5-Star Resort",
      location: "Palm Jumeirah, Dubai",
      rating: 5,
    },
    {
      quote: "Fast turnarounds, excellent stitching, and personalized monogrammed cuffs. We order all our fleet uniforms directly from their Dubai atelier.",
      author: "Khalid Al-Hassani",
      role: "General Manager, Executive Aviation Lounge",
      location: "Abu Dhabi, UAE",
      rating: 5,
    },
    {
      quote: "Durability is key for our valet staff. Even after 100+ industrial washes, the fabric keeps its crisp collar structure without shrinking.",
      author: "Marcus Vance",
      role: "Fleet Operations Manager, Valet Services UAE",
      location: "Dubai & Sharjah",
      rating: 5,
    },
    {
      quote: "Complimentary fabric swatches delivered right to our office, followed by an on-site trial fitting session. Supreme B2B customer service.",
      author: "Sarah Al-Zahra",
      role: "Executive Director, DIFC Wealth Management",
      location: "DIFC, Dubai",
      rating: 5,
    },
  ]

  const reviews = (data?.testimonials && data.testimonials.length > 0)
    ? data.testimonials
    : (data?.reviews && data.reviews.length > 0)
    ? data.reviews
    : defaultReviews

  // Duplicate for seamless infinite loop
  const marqueeReviews = [...reviews, ...reviews]

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200/80 relative overflow-hidden select-none">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 space-y-8 sm:space-y-10 mb-8 sm:mb-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <span className="text-xs sm:text-sm font-sans font-extrabold uppercase tracking-[0.22em] text-[#D97A42] block">
            {label}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0F172A] font-black leading-tight">
            {title}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-600 font-medium">
            {subtitle}
          </p>
        </motion.div>

      </div>

      {/* Infinite Smooth Marquee Ticker */}
      <div className="relative w-full overflow-hidden py-4 group">
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 35,
            ease: 'linear',
          }}
          className="flex items-center gap-6 w-max group-hover:[animation-play-state:paused]"
        >
          {marqueeReviews.map((r: any, idx: number) => (
            <div
              key={idx}
              className="w-[380px] sm:w-[440px] bg-[#FAF9F6] border border-slate-200/90 p-8 rounded-3xl shadow-xs hover:shadow-xl hover:border-[#D97A42]/50 transition-all duration-300 shrink-0 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#D97A42]">
                    {[...Array(r.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-sans font-extrabold text-[#1C7A4C] bg-[#1C7A4C]/10 px-2.5 py-0.5 rounded-md uppercase">
                    Verified B2B
                  </span>
                </div>
                <p className="font-serif text-sm sm:text-base text-slate-800 italic leading-relaxed">
                  "{r.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {r.avatar && (
                    <img src={r.avatar} alt={r.author} className="w-9 h-9 rounded-full object-cover border border-slate-300 shrink-0" />
                  )}
                  <div>
                    <div className="font-sans text-sm font-extrabold text-slate-900">{r.author || r.company}</div>
                    <div className="font-sans text-xs text-[#D97A42] font-bold">{r.role}</div>
                  </div>
                </div>
                <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider">{r.location || r.company}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}

// ----------------------------------------------------------------------
// MAIN PRODUCT PAGE CLIENT DISPATCHER (Placed after all 11 sections)
// ----------------------------------------------------------------------
export function ProductPageClient({ page: initialPage, config: initialConfig }: { page: any, config?: any }) {
  const [currentPage, setCurrentPage] = useState<any>(initialPage)
  const [currentConfig, setCurrentConfig] = useState<any>(initialConfig)
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  useEffect(() => {
    if (initialPage) setCurrentPage(initialPage)
  }, [initialPage])

  useEffect(() => {
    if (initialConfig) setCurrentConfig(initialConfig)
  }, [initialConfig])

  // Live client-side auto-sync to ensure changes saved in Admin reflect immediately without rebuild
  useEffect(() => {
    let isMounted = true
    const slug = initialPage?.slug
    if (!slug) return

    fetch(`/api/product-pages/slug/${slug}`, { cache: 'no-store' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (isMounted && data && data.slug) {
          setCurrentPage(data)
        }
      })
      .catch(() => {})

    fetch('/api/site-config', { cache: 'no-store' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (isMounted && data && typeof data === 'object') {
          setCurrentConfig(data)
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [initialPage?.slug])

  const sections = currentPage?.sections || []

  // Section render dispatch
  const renderSection = (section: any) => {
    if (!section.isActive) return null
    let data: any = {}
    if (typeof section.data === 'object' && section.data !== null) {
      data = section.data
    } else if (typeof section.data === 'string') {
      try { data = JSON.parse(section.data) } catch (e) {}
    }

    switch (section.type) {
      case 'HERO':
        return <ProductHeroSection key={section.id} data={data} onOpenQuote={() => setIsQuoteOpen(true)} />

      case 'SPECS_MATRIX':
        return <SpecsMatrixSection key={section.id} data={data} />

      case 'CUSTOMIZATION':
        return <CustomizationShowcaseSection key={section.id} data={data} />

      case 'SECTORS':
        return <SectorsSection key={section.id} data={data} onOpenQuote={() => setIsQuoteOpen(true)} />

      case 'FABRIC_SWATCHES':
        return <FabricSwatchesSection key={section.id} data={data} onOpenQuote={() => setIsQuoteOpen(true)} />

      case 'QUALITY_CONTROL':
        return <QualityCraftsmanshipSection key={section.id} data={data} />

      case 'BULK_PRICING':
        return <BulkPricingTiersSection key={section.id} data={data} onOpenQuote={() => setIsQuoteOpen(true)} />

      case 'LOGISTICS':
        return <LogisticsCoverageSection key={section.id} data={data} />

      case 'TESTIMONIALS':
        return <ClientTestimonialsSection key={section.id} data={data} />

      case 'FAQ':
        return (
          <ProductFaqSection
            key={section.id}
            data={data}
            openIndex={openFaqIndex}
            onToggle={(idx) => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
          />
        )

      case 'QUOTE_BAND':
        return <QuoteBandSection key={section.id} data={data} onOpenQuote={() => setIsQuoteOpen(true)} />

      default:
        return null
    }
  }

  // Render sections from database if available, sorted by section order
  const hasSections = Array.isArray(sections) && sections.length > 0

  const renderAllSections = () => {
    if (hasSections) {
      const sortedSections = [...sections].sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
      return sortedSections.map((sec: any) => renderSection(sec))
    }

    // Default 11-section canonical fallback when page has no custom sections in DB
    const canonicalTypes = [
      'HERO',
      'SPECS_MATRIX',
      'CUSTOMIZATION',
      'SECTORS',
      'FABRIC_SWATCHES',
      'QUALITY_CONTROL',
      'BULK_PRICING',
      'LOGISTICS',
      'TESTIMONIALS',
      'FAQ',
      'QUOTE_BAND',
    ]

    return canonicalTypes.map((type) => {
      switch (type) {
        case 'HERO':
          return <ProductHeroSection key="default-hero" data={{}} onOpenQuote={() => setIsQuoteOpen(true)} />
        case 'SPECS_MATRIX':
          return <SpecsMatrixSection key="default-specs" data={{}} />
        case 'CUSTOMIZATION':
          return <CustomizationShowcaseSection key="default-customization" data={{}} />
        case 'SECTORS':
          return <SectorsSection key="default-sectors" data={{}} onOpenQuote={() => setIsQuoteOpen(true)} />
        case 'FABRIC_SWATCHES':
          return <FabricSwatchesSection key="default-swatches" data={{}} onOpenQuote={() => setIsQuoteOpen(true)} />
        case 'QUALITY_CONTROL':
          return <QualityCraftsmanshipSection key="default-qc" data={{}} />
        case 'BULK_PRICING':
          return <BulkPricingTiersSection key="default-[#pricing]" data={{}} onOpenQuote={() => setIsQuoteOpen(true)} />
        case 'LOGISTICS':
          return <LogisticsCoverageSection key="default-logistics" data={{}} />
        case 'TESTIMONIALS':
          return <ClientTestimonialsSection key="default-testimonials" data={{}} />
        case 'FAQ':
          return (
            <ProductFaqSection
              key="default-faq"
              data={{}}
              openIndex={openFaqIndex}
              onToggle={(idx) => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
            />
          )
        case 'QUOTE_BAND':
          return <QuoteBandSection key="default-quote" data={{}} onOpenQuote={() => setIsQuoteOpen(true)} />
        default:
          return null
      }
    })
  }

  return (
    <div className="bg-white text-slate-900 font-sans antialiased min-h-screen relative selection:bg-[#D97A42] selection:text-white">
      <SiteHeader onOpenQuoteModal={() => setIsQuoteOpen(true)} config={currentConfig} />

      <main id="main-content" className="relative z-0">
        {renderAllSections()}
      </main>

      <SiteFooter config={currentConfig} />

      <QuoteFormModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />

      <a
        href="https://wa.me/97142261050"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 p-3.5 bg-[#25D366] hover:bg-[#1eb857] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
        title="WhatsApp Direct Concierge"
        aria-label="WhatsApp Inquiry"
      >
        <FaWhatsapp className="w-6 h-6" />
      </a>
    </div>
  )
}

// ----------------------------------------------------------------------
// EXPORT LIVE SECTION PREVIEW RENDERER FOR ADMIN CMS
// ----------------------------------------------------------------------
export function ProductSectionLiveRenderer({ sectionType, data }: { sectionType: string; data: any }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  let parsedData = data || {}
  if (typeof data === 'string') {
    try {
      parsedData = JSON.parse(data)
    } catch (e) {}
  }

  const sectionIdMap: Record<string, string> = {
    HERO: 'product-hero',
    SPECS_MATRIX: 'specs-matrix',
    CUSTOMIZATION: 'customization',
    SECTORS: 'sectors',
    UNIFORM_SOLUTIONS: 'sectors',
    FABRIC_SWATCHES: 'fabric-swatches',
    QUALITY_CONTROL: 'quality-control',
    BULK_PRICING: 'bulk-pricing',
    LOGISTICS: 'logistics',
    TESTIMONIALS: 'testimonials',
    FAQ: 'faq',
    QUOTE_BAND: 'quote-band',
  }

  const renderContent = () => {
    switch (sectionType) {
      case 'HERO':
        return <ProductHeroSection data={parsedData} onOpenQuote={() => {}} />
      case 'SPECS_MATRIX':
        return <SpecsMatrixSection data={parsedData} />
      case 'CUSTOMIZATION':
        return <CustomizationShowcaseSection data={parsedData} />
      case 'SECTORS':
      case 'UNIFORM_SOLUTIONS':
        return <SectorsSection data={parsedData} onOpenQuote={() => {}} />
      case 'FABRIC_SWATCHES':
        return <FabricSwatchesSection data={parsedData} onOpenQuote={() => {}} />
      case 'QUALITY_CONTROL':
        return <QualityCraftsmanshipSection data={parsedData} />
      case 'BULK_PRICING':
        return <BulkPricingTiersSection data={parsedData} onOpenQuote={() => {}} />
      case 'LOGISTICS':
        return <LogisticsCoverageSection data={parsedData} />
      case 'TESTIMONIALS':
        return <ClientTestimonialsSection data={parsedData} />
      case 'FAQ':
        return (
          <ProductFaqSection
            data={parsedData}
            openIndex={openFaqIndex}
            onToggle={(idx) => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
          />
        )
      case 'QUOTE_BAND':
        return <QuoteBandSection data={parsedData} onOpenQuote={() => {}} />
      default:
        return (
          <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            No live preview available for section type: {sectionType}
          </div>
        )
    }
  }

  const secId = sectionIdMap[sectionType] || sectionType.toLowerCase().replace(/_/g, '-')
  return (
    <div id={secId} data-section-type={sectionType}>
      {renderContent()}
    </div>
  )
}




