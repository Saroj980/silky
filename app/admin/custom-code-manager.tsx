'use client'

import React, { useState, useEffect } from 'react'
import {
  Code, Plus, Trash2, Edit3, Star, Check, X, Globe,
  Smartphone, Monitor, ShieldAlert, Sparkles, Copy,
  CheckCircle2, ArrowUpDown, Filter, Search, Terminal,
  ExternalLink, FileCode, Layers, Info
} from 'lucide-react'
import {
  CustomCodeSnippet,
  getCustomCodeSnippets,
  createCustomCodeSnippet,
  updateCustomCodeSnippet,
  toggleCustomCodeSnippet,
  deleteCustomCodeSnippet
} from '@/lib/laravel-api'

interface CustomCodeManagerProps {
  onToast?: (msg: string, type?: 'success' | 'error') => void
}

type FilterType = 'all' | 'css' | 'js' | 'html' | 'active' | 'inactive'

const CODE_TEMPLATES = {
  google_verification: `<!-- Google Search Console Verification Meta Tag -->\n<meta name="google-site-verification" content="PASTE_YOUR_VERIFICATION_CODE_HERE" />`,
  gtm_head: `<!-- Google Tag Manager -->\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>\n<!-- End Google Tag Manager -->`,
  responsive_css: `/* Mobile Header Adjustments */\n@media (max-width: 768px) {\n  .site-header {\n    padding: 10px 16px !important;\n  }\n  \n  /* Custom text sizing on mobile */\n  h1 {\n    font-size: 1.75rem !important;\n    line-height: 1.25 !important;\n  }\n}`,
  custom_js: `// Custom Event Tracking or UI Script\ndocument.addEventListener('DOMContentLoaded', function() {\n  console.log('Custom JS initialized.');\n});`
}

export function CustomCodeManager({ onToast }: CustomCodeManagerProps) {
  const [snippets, setSnippets] = useState<CustomCodeSnippet[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Editor Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSnippetId, setEditingSnippetId] = useState<string | null>(null)
  const [formTitle, setFormTitle] = useState('')
  const [formCodeType, setFormCodeType] = useState<'css' | 'js' | 'html'>('css')
  const [formCode, setFormCode] = useState('')
  const [formPlacement, setFormPlacement] = useState<'head' | 'body_start' | 'footer'>('head')
  const [formTargetDevice, setFormTargetDevice] = useState<'all' | 'desktop' | 'mobile'>('all')
  const [formIsActive, setFormIsActive] = useState(true)
  const [formIsFavorite, setFormIsFavorite] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Delete Confirm State
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const loadSnippets = async () => {
    try {
      setLoading(true)
      const data = await getCustomCodeSnippets(false)
      setSnippets(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
      onToast?.('Failed to load code snippets', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSnippets()
  }, [])

  const handleOpenAdd = (type: 'css' | 'js' | 'html' = 'css') => {
    setEditingSnippetId(null)
    setFormCodeType(type)
    setFormTitle(
      type === 'html'
        ? 'Google Tags / Verification Header'
        : type === 'css'
        ? 'Custom CSS Styles'
        : 'Custom JavaScript Script'
    )
    setFormCode(
      type === 'html'
        ? CODE_TEMPLATES.google_verification
        : type === 'css'
        ? '/* Add custom CSS rules here */\n'
        : CODE_TEMPLATES.custom_js
    )
    setFormPlacement(type === 'js' ? 'footer' : 'head')
    setFormTargetDevice('all')
    setFormIsActive(true)
    setFormIsFavorite(false)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (snip: CustomCodeSnippet) => {
    setEditingSnippetId(snip.id)
    setFormTitle(snip.title)
    setFormCodeType(snip.codeType)
    setFormCode(snip.code)
    setFormPlacement(snip.placement || 'head')
    setFormTargetDevice(snip.targetDevice || 'all')
    setFormIsActive(snip.isActive ?? true)
    setFormIsFavorite(snip.isFavorite ?? false)
    setIsModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formTitle.trim()) {
      onToast?.('Please enter a snippet title', 'error')
      return
    }

    try {
      setIsSubmitting(true)
      if (editingSnippetId) {
        await updateCustomCodeSnippet(editingSnippetId, {
          title: formTitle,
          codeType: formCodeType,
          code: formCode,
          placement: formPlacement,
          targetDevice: formTargetDevice,
          isActive: formIsActive,
          isFavorite: formIsFavorite,
        })
        onToast?.('Snippet updated successfully!')
      } else {
        await createCustomCodeSnippet({
          title: formTitle,
          codeType: formCodeType,
          code: formCode,
          placement: formPlacement,
          targetDevice: formTargetDevice,
          isActive: formIsActive,
          isFavorite: formIsFavorite,
        })
        onToast?.('New snippet added successfully!')
      }
      setIsModalOpen(false)
      loadSnippets()
    } catch (err) {
      console.error(err)
      onToast?.('Failed to save snippet', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleActive = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await toggleCustomCodeSnippet(id)
      setSnippets((prev) =>
        prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
      )
      onToast?.('Snippet status updated')
    } catch (err) {
      console.error(err)
      onToast?.('Failed to toggle status', 'error')
    }
  }

  const handleToggleFavorite = async (snip: CustomCodeSnippet, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const nextFav = !snip.isFavorite
      await updateCustomCodeSnippet(snip.id, { isFavorite: nextFav })
      setSnippets((prev) =>
        prev.map((s) => (s.id === snip.id ? { ...s, isFavorite: nextFav } : s))
      )
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCustomCodeSnippet(id)
      setSnippets((prev) => prev.filter((s) => s.id !== id))
      setDeletingId(null)
      onToast?.('Snippet deleted successfully')
    } catch (err) {
      console.error(err)
      onToast?.('Failed to delete snippet', 'error')
    }
  }

  // Filter & Search Logic
  const filteredSnippets = snippets.filter((s) => {
    if (filter === 'css' && s.codeType !== 'css') return false
    if (filter === 'js' && s.codeType !== 'js') return false
    if (filter === 'html' && s.codeType !== 'html') return false
    if (filter === 'active' && !s.isActive) return false
    if (filter === 'inactive' && s.isActive) return false

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (
        s.title.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.codeType.toLowerCase().includes(q)
      )
    }
    return true
  })

  const countCss = snippets.filter((s) => s.codeType === 'css').length
  const countJs = snippets.filter((s) => s.codeType === 'js').length
  const countHtml = snippets.filter((s) => s.codeType === 'html').length
  const countActive = snippets.filter((s) => s.isActive).length
  const countInactive = snippets.filter((s) => !s.isActive).length

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* TOP HERO BANNER */}
      <div className="bg-[#1E293B] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden border border-slate-700 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/20 via-orange-500/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              <span>WordPress-Style Code Snippets</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-3">
              Custom CSS, JS & HTML
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Inject custom CSS to control mobile and desktop design, add Google Search Console verification meta tags, Google Tag Manager, Facebook Pixel, and third-party API activation scripts across your entire website.
            </p>
          </div>

          {/* QUICK ADD BUTTONS */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleOpenAdd('css')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Custom CSS
            </button>
            <button
              onClick={() => handleOpenAdd('js')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Custom JS
            </button>
            <button
              onClick={() => handleOpenAdd('html')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E44D26] hover:bg-[#D03C15] text-white font-bold text-xs shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Custom HTML
            </button>
          </div>
        </div>
      </div>

      {/* FILTER TABS & SEARCH BAR */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* TABS */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Code', count: snippets.length },
            { id: 'css', label: 'CSS', count: countCss, color: 'text-blue-600' },
            { id: 'js', label: 'JS', count: countJs, color: 'text-amber-600' },
            { id: 'html', label: 'HTML', count: countHtml, color: 'text-[#E44D26]' },
            { id: 'active', label: 'Active', count: countActive, color: 'text-emerald-600' },
            { id: 'inactive', label: 'Inactive', count: countInactive, color: 'text-slate-400' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id as FilterType)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                filter === t.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span>{t.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                filter === t.id ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-600'
              }`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* SEARCH */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search snippets..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* SNIPPETS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3 text-slate-400">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-semibold">Loading custom snippets...</p>
          </div>
        ) : filteredSnippets.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Code className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">No code snippets found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {searchQuery
                  ? 'No snippets matched your search query. Try clearing the filter.'
                  : 'Get started by creating your first custom CSS style or Google HTML verification snippet.'}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => handleOpenAdd('html')}
                className="px-4 py-2 rounded-xl bg-orange-50 text-[#E44D26] hover:bg-orange-100 font-bold text-xs transition-colors cursor-pointer"
              >
                + Google Verification HTML
              </button>
              <button
                onClick={() => handleOpenAdd('css')}
                className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs transition-colors cursor-pointer"
              >
                + Custom CSS Style
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-12 text-center">★</th>
                  <th className="py-3.5 px-4 w-20">Type</th>
                  <th className="py-3.5 px-4">Title & Details</th>
                  <th className="py-3.5 px-4 w-32">Device</th>
                  <th className="py-3.5 px-4 w-32">Placement</th>
                  <th className="py-3.5 px-4 w-28 text-center">Status</th>
                  <th className="py-3.5 px-4 w-28 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredSnippets.map((snip) => (
                  <tr
                    key={snip.id}
                    onClick={() => handleOpenEdit(snip)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    {/* STAR / FAVORITE */}
                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={(e) => handleToggleFavorite(snip, e)}
                        className={`p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer ${
                          snip.isFavorite ? 'text-amber-500' : 'text-slate-300 hover:text-slate-400'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${snip.isFavorite ? 'fill-amber-400' : ''}`} />
                      </button>
                    </td>

                    {/* TYPE BADGE */}
                    <td className="py-4 px-4">
                      {snip.codeType === 'css' ? (
                        <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-blue-600 text-white shadow-sm shadow-blue-600/30">
                          css
                        </span>
                      ) : snip.codeType === 'js' ? (
                        <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-amber-500 text-white shadow-sm shadow-amber-500/30">
                          js
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-[#E44D26] text-white shadow-sm shadow-orange-600/30">
                          html
                        </span>
                      )}
                    </td>

                    {/* TITLE & CODE PREVIEW */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                        <span>{snip.title}</span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-400 truncate max-w-md mt-1">
                        {snip.code.trim().split('\n')[0] || '// Empty code snippet'}
                      </p>
                    </td>

                    {/* DEVICE TARGET */}
                    <td className="py-4 px-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-semibold text-[11px]">
                        {snip.targetDevice === 'mobile' ? (
                          <>
                            <Smartphone className="w-3.5 h-3.5 text-orange-500" />
                            <span>Mobile Only</span>
                          </>
                        ) : snip.targetDevice === 'desktop' ? (
                          <>
                            <Monitor className="w-3.5 h-3.5 text-blue-500" />
                            <span>Desktop Only</span>
                          </>
                        ) : (
                          <>
                            <Globe className="w-3.5 h-3.5 text-emerald-500" />
                            <span>All Devices</span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* PLACEMENT */}
                    <td className="py-4 px-4">
                      <span className="text-[11px] font-medium text-slate-600">
                        {snip.placement === 'footer' ? 'Footer (</body>)' : snip.placement === 'body_start' ? 'Body Start' : 'Header (<head>)'}
                      </span>
                    </td>

                    {/* STATUS TOGGLE */}
                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={(e) => handleToggleActive(snip.id, e)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                          snip.isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${snip.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        {snip.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>

                    {/* ACTIONS */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpenEdit(snip)
                          }}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Code"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setDeletingId(snip.id)
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Snippet"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* QUICK TEMPLATES GUIDE CARD */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3 text-amber-400 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Quick Code Presets & Examples</span>
        </div>
        <p className="text-xs text-slate-300">
          Click any preset below to quickly create a Google verification snippet or a mobile responsive CSS block:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div
            onClick={() => {
              handleOpenAdd('html')
              setFormTitle('Google Search Console Verification')
              setFormCode(CODE_TEMPLATES.google_verification)
            }}
            className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-orange-500/50 hover:bg-slate-800 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-orange-400 mb-1">
              <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-[10px] font-mono">HTML</span>
              <span>Google Verification Tag</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Instantly add the Google HTML meta tag for Search Console domain activation.
            </p>
          </div>

          <div
            onClick={() => {
              handleOpenAdd('css')
              setFormTitle('Mobile Responsive Styling Tweaks')
              setFormTargetDevice('mobile')
              setFormCode(CODE_TEMPLATES.responsive_css)
            }}
            className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-blue-500/50 hover:bg-slate-800 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-1">
              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-[10px] font-mono">CSS</span>
              <span>Mobile-Only Scoped CSS</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Target screens under 768px for fixing mobile font sizes, padding, and alignments.
            </p>
          </div>

          <div
            onClick={() => {
              handleOpenAdd('html')
              setFormTitle('Google Tag Manager (GTM)')
              setFormCode(CODE_TEMPLATES.gtm_head)
            }}
            className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-amber-500/50 hover:bg-slate-800 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[10px] font-mono">HTML</span>
              <span>Google Tag Manager (GTM)</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Container for Google Analytics GA4, Meta Pixel, and conversion tracking.
            </p>
          </div>
        </div>
      </div>

      {/* EDITOR MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* MODAL HEADER */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase text-white ${
                  formCodeType === 'css' ? 'bg-blue-600' : formCodeType === 'js' ? 'bg-amber-500' : 'bg-[#E44D26]'
                }`}>
                  {formCodeType}
                </span>
                <h3 className="font-bold text-slate-800 text-base">
                  {editingSnippetId ? 'Edit Code Snippet' : 'Add New Custom Code'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* MODAL FORM */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TITLE & TYPE */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Snippet Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Google Search Console Verification, Mobile Font Sizes..."
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Code Type
                  </label>
                  <select
                    value={formCodeType}
                    onChange={(e) => setFormCodeType(e.target.value as any)}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-semibold"
                  >
                    <option value="css">CSS (Stylesheets)</option>
                    <option value="js">JavaScript (Scripts)</option>
                    <option value="html">HTML (Meta / Verification)</option>
                  </select>
                </div>
              </div>

              {/* TARGET DEVICE & PLACEMENT */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Target Device
                  </label>
                  <select
                    value={formTargetDevice}
                    onChange={(e) => setFormTargetDevice(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-semibold"
                  >
                    <option value="all">All Devices (Global)</option>
                    <option value="mobile">Mobile Only (≤ 768px)</option>
                    <option value="desktop">Desktop Only (&gt; 768px)</option>
                  </select>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {formCodeType === 'css' && formTargetDevice === 'mobile'
                      ? 'Automatically scoped with @media (max-width: 768px).'
                      : 'Choose screen size where this applies.'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Injection Location
                  </label>
                  <select
                    value={formPlacement}
                    onChange={(e) => setFormPlacement(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-semibold"
                  >
                    <option value="head">Header (&lt;head&gt;) — Recommended</option>
                    <option value="body_start">Body Start (Top)</option>
                    <option value="footer">Footer (&lt;/body&gt;) — Scripts/Chat</option>
                  </select>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Google verification & CSS must be in &lt;head&gt;.
                  </p>
                </div>

                <div className="flex flex-col justify-center">
                  <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Status
                  </span>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsActive}
                      onChange={(e) => setFormIsActive(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 relative"></div>
                    <span className="text-xs font-bold text-slate-700">
                      {formIsActive ? 'Active (Live)' : 'Inactive'}
                    </span>
                  </label>
                </div>
              </div>

              {/* CODE EDITOR */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <Code className="w-4 h-4 text-blue-600" />
                    <span>Code Editor ({formCodeType.toUpperCase()})</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {formCodeType === 'html' && (
                      <button
                        type="button"
                        onClick={() => setFormCode(CODE_TEMPLATES.google_verification)}
                        className="text-[11px] text-orange-600 hover:text-orange-700 font-bold px-2 py-1 rounded bg-orange-50 hover:bg-orange-100 transition-colors"
                      >
                        + Insert Google Verification Tag
                      </button>
                    )}
                    {formCodeType === 'css' && (
                      <button
                        type="button"
                        onClick={() => setFormCode(CODE_TEMPLATES.responsive_css)}
                        className="text-[11px] text-blue-600 hover:text-blue-700 font-bold px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        + Insert Mobile CSS Template
                      </button>
                    )}
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-[#0F172A]">
                  <div className="h-8 bg-[#1E293B] px-4 flex items-center justify-between text-[11px] text-slate-400 font-mono border-b border-slate-700/60">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 font-semibold text-slate-300">
                        {formTitle || 'snippet'}.{formCodeType}
                      </span>
                    </div>
                    <span>UTF-8</span>
                  </div>

                  <textarea
                    rows={12}
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    placeholder={
                      formCodeType === 'css'
                        ? '/* Add CSS styles here */\n.btn { color: #fff; }'
                        : formCodeType === 'html'
                        ? '<meta name="google-site-verification" content="..." />'
                        : '// Add JS scripts here\nconsole.log("Hello World");'
                    }
                    className="w-full p-4 font-mono text-xs sm:text-sm bg-transparent text-slate-200 focus:outline-none resize-y leading-relaxed"
                    spellCheck={false}
                  />
                </div>
              </div>

              {/* MODAL ACTIONS */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 font-bold text-xs text-slate-600 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#DE7B3D] hover:bg-[#C96A30] text-white font-bold text-xs shadow-lg shadow-orange-900/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingSnippetId ? 'Update Snippet' : 'Publish Snippet'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-slate-800 text-base">Delete Snippet?</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to delete this custom code snippet? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deletingId)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-colors cursor-pointer shadow-lg shadow-red-600/30"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
