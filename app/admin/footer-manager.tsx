'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Save, UploadCloud, Plus, Trash2, Globe, Phone, Mail,
  MapPin, FileText, Check, ExternalLink, Image as ImageIcon
} from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { getFooterConfig, updateFooterConfig } from '@/lib/laravel-api'
import { SiteFooter } from '@/components/site-footer'

export interface FooterMenuItem {
  label: string
  url: string
}

export interface FooterConfigState {
  logoUrl: string
  logoAlt: string
  description: string
  facebookUrl: string
  instagramUrl: string
  linkedinUrl: string
  col1Title: string
  col1Links: FooterMenuItem[]
  col2Title: string
  col2Links: FooterMenuItem[]
  contactTitle: string
  address: string
  phone: string
  email: string
  trnText: string
  copyrightText: string
  privacyPolicyHref: string
  termsHref: string
}

const DEFAULT_FOOTER_CONFIG: FooterConfigState = {
  logoUrl: '/silky-logo.png',
  logoAlt: 'Silky Textiles & Garments LLC Dubai',
  description: "Dubai's premier destination for master bespoke tailoring, high-quality textiles, and corporate uniform manufacturing since 1963.",
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  linkedinUrl: 'https://linkedin.com',
  col1Title: 'Sectors',
  col1Links: [
    { label: '100% Pure Cotton Shirting', url: '/products/pure-cotton-shirts-supplier-in-uae' },
    { label: 'Corporate & Executive', url: '/products/pure-cotton-shirts-supplier-in-uae' },
    { label: 'Hospitality & Dining', url: '/products/pure-cotton-shirts-supplier-in-uae' },
    { label: 'Healthcare & Clinical', url: '/products/pure-cotton-shirts-supplier-in-uae' },
    { label: 'Embroidery Branding', url: '/products/pure-cotton-shirts-supplier-in-uae' },
  ],
  col2Title: 'Company',
  col2Links: [
    { label: 'Our Heritage', url: '/about-us' },
    { label: 'ISO Certification', url: '/about-us' },
    { label: 'Why Choose Silky', url: '/#why-silky' },
    { label: 'Dubai Showroom', url: '/contact-us' },
  ],
  contactTitle: 'Showroom Location',
  address: "Baniyas Road (D85), Deira Creek\nPO Box 792, Dubai, UAE",
  phone: '+971 4 226 1050',
  email: 'sales@silky.ae',
  trnText: 'TRN: 10000 253 930 0003',
  copyrightText: '© ' + new Date().getFullYear() + ' Silky Textiles & Garments LLC. All rights reserved.',
  privacyPolicyHref: '#',
  termsHref: '#',
}

export function FooterManager({ onToast }: { onToast?: (msg: string, type?: 'success' | 'error') => void }) {
  const [footer, setFooter] = useState<FooterConfigState>(DEFAULT_FOOTER_CONFIG)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getFooterConfig()
      .then((data) => {
        if (data) {
          setFooter((prev) => ({
            ...prev,
            ...data,
            col1Links: Array.isArray(data.col1Links) ? data.col1Links : prev.col1Links,
            col2Links: Array.isArray(data.col2Links) ? data.col2Links : prev.col2Links,
          }))
        }
      })
      .catch((err) => console.error('Error loading footer config:', err))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (field: keyof FooterConfigState, val: any) => {
    setFooter((prev) => ({ ...prev, [field]: val }))
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      setIsSaving(true)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const json = await res.json()
      if (json && (json.url || json.path)) {
        handleChange('logoUrl', json.url || json.path)
        onToast?.('Footer logo uploaded successfully!')
      } else {
        onToast?.('Failed to upload logo', 'error')
      }
    } catch (err) {
      console.error(err)
      onToast?.('Error uploading logo file', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateFooterConfig(footer)
      onToast?.('Footer configuration saved and published live!')
    } catch (err) {
      console.error('Error saving footer:', err)
      onToast?.('Failed to save footer settings', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  // Column 1 link helpers
  const addCol1Link = () => {
    setFooter((prev) => ({
      ...prev,
      col1Links: [...prev.col1Links, { label: 'New Link', url: '#' }],
    }))
  }

  const updateCol1Link = (index: number, field: 'label' | 'url', value: string) => {
    setFooter((prev) => {
      const next = [...prev.col1Links]
      next[index] = { ...next[index], [field]: value }
      return { ...prev, col1Links: next }
    })
  }

  const removeCol1Link = (index: number) => {
    setFooter((prev) => ({
      ...prev,
      col1Links: prev.col1Links.filter((_, i) => i !== index),
    }))
  }

  // Column 2 link helpers
  const addCol2Link = () => {
    setFooter((prev) => ({
      ...prev,
      col2Links: [...prev.col2Links, { label: 'New Link', url: '#' }],
    }))
  }

  const updateCol2Link = (index: number, field: 'label' | 'url', value: string) => {
    setFooter((prev) => {
      const next = [...prev.col2Links]
      next[index] = { ...next[index], [field]: value }
      return { ...prev, col2Links: next }
    })
  }

  const removeCol2Link = (index: number) => {
    setFooter((prev) => ({
      ...prev,
      col2Links: prev.col2Links.filter((_, i) => i !== index),
    }))
  }

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 font-sans">
        <div className="w-8 h-8 border-2 border-[#DE7B3D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        Loading Footer Settings...
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Footer Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Customize footer logo, description, social links, column navigation menus, and showroom details.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 bg-[#DE7B3D] hover:bg-[#c9692e] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-[#DE7B3D]/25 disabled:opacity-50 cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Publishing...' : 'Save Footer Settings'}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Column 1: Brand & Socials */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 text-base border-b border-gray-100 pb-4 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#DE7B3D]" />
            Brand Logo & About Description
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Footer Logo
            </label>
            <div className="flex items-center gap-6">
              <div className="w-36 h-20 rounded-xl bg-slate-900 p-3 flex items-center justify-center border border-slate-800 shrink-0">
                <img
                  src={footer.logoUrl || '/silky-logo.png'}
                  alt={footer.logoAlt || 'Footer Logo'}
                  className="max-h-full max-w-full object-contain brightness-110"
                />
              </div>
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  value={footer.logoUrl}
                  onChange={(e) => handleChange('logoUrl', e.target.value)}
                  placeholder="https://... or /silky-logo.png"
                  className="w-full px-3.5 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DE7B3D]"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-[#DE7B3D]" />
                  Upload New Logo
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Description Under Logo
            </label>
            <textarea
              rows={4}
              value={footer.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DE7B3D] leading-relaxed"
              placeholder="Brief description about Silky Textiles..."
            />
          </div>

          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Social Media Links</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <FaFacebookF className="w-4 h-4 text-blue-600" />
                </div>
                <input
                  type="text"
                  value={footer.facebookUrl}
                  onChange={(e) => handleChange('facebookUrl', e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DE7B3D]"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <FaInstagram className="w-4 h-4 text-pink-600" />
                </div>
                <input
                  type="text"
                  value={footer.instagramUrl}
                  onChange={(e) => handleChange('instagramUrl', e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DE7B3D]"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <FaLinkedinIn className="w-4 h-4 text-blue-700" />
                </div>
                <input
                  type="text"
                  value={footer.linkedinUrl}
                  onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/..."
                  className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DE7B3D]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Showroom & Contact Details */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 text-base border-b border-gray-100 pb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#DE7B3D]" />
            Showroom Location & Contact Info
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Contact Column Title
            </label>
            <input
              type="text"
              value={footer.contactTitle}
              onChange={(e) => handleChange('contactTitle', e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DE7B3D]"
              placeholder="Showroom Location"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Showroom Physical Address
            </label>
            <textarea
              rows={3}
              value={footer.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DE7B3D] leading-relaxed"
              placeholder="Baniyas Road (D85), Deira Creek&#10;PO Box 792, Dubai, UAE"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <input
                type="text"
                value={footer.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-2.5 text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DE7B3D]"
                placeholder="+971 4 226 1050"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={footer.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-2.5 text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DE7B3D]"
                placeholder="sales@silky.ae"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Bottom Legal & Copyright</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">TRN / Tax Registration Number</label>
                <input
                  type="text"
                  value={footer.trnText}
                  onChange={(e) => handleChange('trnText', e.target.value)}
                  placeholder="TRN: 10000 253 930 0003"
                  className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DE7B3D]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Copyright Line</label>
                <input
                  type="text"
                  value={footer.copyrightText}
                  onChange={(e) => handleChange('copyrightText', e.target.value)}
                  placeholder="© 2026 Silky Textiles LLC"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DE7B3D]"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Privacy Policy URL</label>
                <input
                  type="text"
                  value={footer.privacyPolicyHref}
                  onChange={(e) => handleChange('privacyPolicyHref', e.target.value)}
                  placeholder="/privacy-policy or #"
                  className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DE7B3D]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Terms of Service URL</label>
                <input
                  type="text"
                  value={footer.termsHref}
                  onChange={(e) => handleChange('termsHref', e.target.value)}
                  placeholder="/terms or #"
                  className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DE7B3D]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Columns Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Menu Column 1 */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Menu Column 1</h3>
              <p className="text-xs text-slate-500">First list of navigation links in the footer</p>
            </div>
            <button
              type="button"
              onClick={addCol1Link}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DE7B3D] bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Link
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Column Title
            </label>
            <input
              type="text"
              value={footer.col1Title}
              onChange={(e) => handleChange('col1Title', e.target.value)}
              className="w-full px-4 py-2.5 text-sm font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DE7B3D]"
              placeholder="e.g. Sectors"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Links ({footer.col1Links.length})
            </label>
            {footer.col1Links.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => updateCol1Link(idx, 'label', e.target.value)}
                  placeholder="Link Label"
                  className="w-1/2 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DE7B3D]"
                />
                <input
                  type="text"
                  value={item.url}
                  onChange={(e) => updateCol1Link(idx, 'url', e.target.value)}
                  placeholder="/products/..."
                  className="flex-1 px-3 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DE7B3D]"
                />
                <button
                  type="button"
                  onClick={() => removeCol1Link(idx)}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove link"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Column 2 */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Menu Column 2</h3>
              <p className="text-xs text-slate-500">Second list of navigation links in the footer</p>
            </div>
            <button
              type="button"
              onClick={addCol2Link}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DE7B3D] bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Link
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Column Title
            </label>
            <input
              type="text"
              value={footer.col2Title}
              onChange={(e) => handleChange('col2Title', e.target.value)}
              className="w-full px-4 py-2.5 text-sm font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DE7B3D]"
              placeholder="e.g. Company"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Links ({footer.col2Links.length})
            </label>
            {footer.col2Links.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => updateCol2Link(idx, 'label', e.target.value)}
                  placeholder="Link Label"
                  className="w-1/2 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DE7B3D]"
                />
                <input
                  type="text"
                  value={item.url}
                  onChange={(e) => updateCol2Link(idx, 'url', e.target.value)}
                  placeholder="/about-us"
                  className="flex-1 px-3 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DE7B3D]"
                />
                <button
                  type="button"
                  onClick={() => removeCol2Link(idx)}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove link"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-Time Live Preview */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#DE7B3D]" />
            Live Footer Preview
          </h3>
          <span className="text-[11px] text-emerald-600 bg-emerald-50 font-bold px-2.5 py-1 rounded-full">
            Real-Time Output
          </span>
        </div>
        <div className="rounded-2xl overflow-hidden border border-slate-800">
          <SiteFooter config={footer} />
        </div>
      </div>
    </div>
  )
}
