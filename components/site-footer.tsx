'use client'

import React, { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, FileText, ArrowUpRight } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'

export interface FooterMenuItem {
  label: string
  url: string
}

export interface FooterData {
  logoUrl?: string
  logoAlt?: string
  description?: string
  facebookUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  col1Title?: string
  col1Links?: FooterMenuItem[]
  col2Title?: string
  col2Links?: FooterMenuItem[]
  contactTitle?: string
  address?: string
  phone?: string
  email?: string
  trnText?: string
  copyrightText?: string
  privacyPolicyHref?: string
  termsHref?: string
}

const DEFAULT_COL1_LINKS: FooterMenuItem[] = [
  { label: '100% Pure Cotton Shirting', url: '/products/pure-cotton-shirts-supplier-in-uae' },
  { label: 'Corporate & Executive', url: '/products/pure-cotton-shirts-supplier-in-uae' },
  { label: 'Hospitality & Dining', url: '/products/pure-cotton-shirts-supplier-in-uae' },
  { label: 'Healthcare & Clinical', url: '/products/pure-cotton-shirts-supplier-in-uae' },
  { label: 'Embroidery Branding', url: '/products/pure-cotton-shirts-supplier-in-uae' },
]

const DEFAULT_COL2_LINKS: FooterMenuItem[] = [
  { label: 'Our Heritage', url: '/about-us' },
  { label: 'ISO Certification', url: '/about-us' },
  { label: 'Why Choose Silky', url: '/#why-silky' },
  { label: 'Dubai Showroom', url: '/contact-us' },
]

export function SiteFooter({ config: initialConfig }: { config?: any } = {}) {
  const [config, setConfig] = useState<any>(initialConfig)
  const [footerData, setFooterData] = useState<FooterData | null>(null)

  useEffect(() => {
    if (initialConfig) setConfig(initialConfig)
  }, [initialConfig])

  useEffect(() => {
    // 1. Fetch live footer config
    fetch('/api/footer-config', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setFooterData(data)
      })
      .catch(() => {})

    // 2. Fallback site config sync
    fetch('/api/site-config', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setConfig(data)
      })
      .catch(() => {})
  }, [])

  const logoUrl = footerData?.logoUrl || config?.logoUrl || '/silky-logo.png'
  const logoAlt = footerData?.logoAlt || config?.logoAlt || 'Silky Textiles & Garments LLC Dubai'
  const description = footerData?.description || "Dubai's premier destination for master bespoke tailoring, high-quality textiles, and corporate uniform manufacturing since 1963."
  
  const facebookUrl = footerData?.facebookUrl || 'https://facebook.com'
  const instagramUrl = footerData?.instagramUrl || 'https://instagram.com'
  const linkedinUrl = footerData?.linkedinUrl || 'https://linkedin.com'

  const col1Title = footerData?.col1Title || 'Sectors'
  const col1Links = (footerData?.col1Links && footerData.col1Links.length > 0) ? footerData.col1Links : DEFAULT_COL1_LINKS

  const col2Title = footerData?.col2Title || 'Company'
  const col2Links = (footerData?.col2Links && footerData.col2Links.length > 0) ? footerData.col2Links : DEFAULT_COL2_LINKS

  const contactTitle = footerData?.contactTitle || 'Showroom Location'
  const address = footerData?.address || config?.address || "Baniyas Road (D85), Deira Creek\nPO Box 792, Dubai, UAE"
  const phone = footerData?.phone || config?.phone || '+971 4 226 1050'
  const email = footerData?.email || config?.email || 'sales@silky.ae'

  const trnText = footerData?.trnText || 'TRN: 10000 253 930 0003'
  const copyrightText = footerData?.copyrightText || `© ${new Date().getFullYear()} Silky Textiles & Garments LLC. All rights reserved.`
  const privacyPolicyHref = footerData?.privacyPolicyHref || '#'
  const termsHref = footerData?.termsHref || '#'

  return (
    <footer className="bg-[#0A0F1D] text-slate-300 pt-16 sm:pt-20 pb-10 sm:pb-12 font-inter border-t border-slate-800">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10">
        
        {/* Top 4 Information Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-slate-800/80">
          
          {/* Column 1: Silky Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <a href="/" className="inline-block">
              <img
                src={logoUrl}
                alt={logoAlt}
                className="h-14 sm:h-16 w-auto object-contain brightness-110"
              />
            </a>
            <p className="text-xs text-slate-400 font-normal leading-relaxed max-w-sm whitespace-pre-line">
              {description}
            </p>
            <div className="flex items-center space-x-3 pt-1">
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-none bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#B38B59] hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-3.5 h-3.5" />
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-none bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#B38B59] hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-3.5 h-3.5" />
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-none bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#B38B59] hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Menu Column 1 (Sectors) */}
          <div className="lg:col-span-2 space-y-5 lg:ml-auto">
            <h4 className="text-[11px] uppercase tracking-widest font-semibold text-white">
              {col1Title}
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              {col1Links.map((item, idx) => (
                <li key={idx}>
                  <a href={item.url || '#'} className="hover:text-[#B38B59] transition-colors inline-block">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Menu Column 2 (Company) */}
          <div className="lg:col-span-2 space-y-5 lg:mx-auto">
            <h4 className="text-[11px] uppercase tracking-widest font-semibold text-white">
              {col2Title}
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              {col2Links.map((item, idx) => (
                <li key={idx}>
                  <a href={item.url || '#'} className="hover:text-[#B38B59] transition-colors inline-block">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info & Showroom */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-[11px] uppercase tracking-widest font-semibold text-white">
              {contactTitle}
            </h4>
            <div className="space-y-3.5 text-xs text-slate-400 leading-relaxed">
              <div className="flex items-start space-x-3 group">
                <MapPin className="w-4 h-4 text-[#B38B59] shrink-0 mt-0.5" />
                <span className="whitespace-pre-line">{address}</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone className="w-4 h-4 text-[#B38B59] shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{phone}</a>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="w-4 h-4 text-[#B38B59] shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2 text-slate-400">
            <FileText className="w-3.5 h-3.5 text-[#B38B59]" />
            <span>{trnText}</span>
          </div>

          <div className="text-center md:text-left text-slate-400">
            {copyrightText}
          </div>

          <div className="flex items-center space-x-4">
            <a href={privacyPolicyHref} className="hover:text-[#B38B59] transition-colors">Privacy Policy</a>
            <a href={termsHref} className="hover:text-[#B38B59] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}


