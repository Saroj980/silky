'use client'

import React, { useState, useRef } from 'react'
import { Hero } from '@/components/hero'
import { SiteHeader } from '@/components/site-header'
import { updateSlide, createSlide, deleteSlide, updateSiteConfig, updatePageSection, updateSectionOrder, saveProductPageSectionsAction } from './actions'
import { Plus, Trash2, Save, Layout, Settings, Image as ImageIcon, UploadCloud, Monitor, Menu, Search, Bell, HelpCircle, FileText, ShoppingBag, FolderTree, BookOpen, Briefcase, Activity, FolderOpen, Users as UsersIcon, ExternalLink, ChevronDown, Check } from 'lucide-react'
import { CategoryShowcaseEditor, UniformSolutionsEditor, OurWorkEditor, WhySilkyEditor, ProcessEditor, TestimonialsEditor, ContactBandEditor, SpecsMatrixEditor, FaqEditor, FabricSwatchesEditor, QualityControlEditor, BulkPricingEditor, LogisticsEditor } from './section-editors'

const getSectionLabel = (type: string) => {
  switch (type) {
    case 'HERO': return 'Hero Banner'
    case 'BRAND_STORY': return 'Brand Story'
    case 'CATEGORY_SHOWCASE': return 'Category Showcase'
    case 'UNIFORM_SOLUTIONS': return 'Uniform Solutions'
    case 'OUR_WORK': return 'Our Work & Portfolio'
    case 'WHY_SILKY': return 'Why Silky'
    case 'PROCESS': return 'Our Process'
    case 'TESTIMONIALS': return 'Client Testimonials'
    case 'CONTACT_BAND': return 'Contact & Showroom'
    case 'SPECS_MATRIX': return 'Fabric Specs Matrix'
    case 'CUSTOMIZATION': return 'Custom Embroidery'
    case 'SECTORS': return 'Industries We Supply'
    case 'FABRIC_SWATCHES': return 'Fabric & Color Swatches'
    case 'QUALITY_CONTROL': return '4-Step Quality Control'
    case 'BULK_PRICING': return 'Wholesale Bulk Pricing'
    case 'LOGISTICS': return 'Express Logistics & GCC'
    case 'FAQ': return 'B2B Supply FAQ'
    case 'QUOTE_BAND': return 'Get Quotation Form'
    default: return type.replace(/_/g, ' ')
  }
}

const getSectionIcon = (type: string) => {
  switch (type) {
    case 'HERO': return <ImageIcon className="w-4 h-4" />
    case 'BRAND_STORY': return <BookOpen className="w-4 h-4" />
    case 'CATEGORY_SHOWCASE': return <FolderTree className="w-4 h-4" />
    case 'UNIFORM_SOLUTIONS': return <Briefcase className="w-4 h-4" />
    case 'OUR_WORK': return <FileText className="w-4 h-4" />
    case 'WHY_SILKY': return <Activity className="w-4 h-4" />
    case 'PROCESS': return <Settings className="w-4 h-4" />
    case 'TESTIMONIALS': return <UsersIcon className="w-4 h-4" />
    case 'CONTACT_BAND': return <ExternalLink className="w-4 h-4" />
    default: return <Layout className="w-4 h-4" />
  }
}


const parseSlideData = (s: any) => {
  let trustBadges: string[] = []
  let textColor = s.textColor || '#1F2A37'
  let textAlignment = s.textAlignment || 'Left'
  let overlayEnabled = s.overlayEnabled || 'true'
  let overlayOpacity = s.overlayOpacity || '60'
  let status = s.status || 'Active'

  try {
    const parsed = typeof s.trustBadges === 'string' ? JSON.parse(s.trustBadges) : s.trustBadges
    if (Array.isArray(parsed)) {
      trustBadges = parsed
    } else if (parsed && typeof parsed === 'object') {
      trustBadges = parsed.badges || []
      if (parsed.textColor) textColor = parsed.textColor
      if (parsed.textAlignment) textAlignment = parsed.textAlignment
      if (parsed.overlayEnabled) overlayEnabled = parsed.overlayEnabled
      if (parsed.overlayOpacity) overlayOpacity = parsed.overlayOpacity
      if (parsed.status) status = parsed.status
    }
  } catch (e) {}

  return {
    ...s,
    trustBadges,
    textColor,
    textAlignment,
    overlayEnabled,
    overlayOpacity,
    status,
  }
}

const DEFAULT_HOMEPAGE_SECTIONS = [
  { id: 101, type: 'HERO', data: '{}', isActive: true },
  { id: 102, type: 'BRAND_STORY', data: '{}', isActive: true },
  { id: 103, type: 'CATEGORY_SHOWCASE', data: '{}', isActive: true },
  { id: 104, type: 'UNIFORM_SOLUTIONS', data: '{}', isActive: true },
  { id: 105, type: 'OUR_WORK', data: '{}', isActive: true },
  { id: 106, type: 'WHY_SILKY', data: '{}', isActive: true },
  { id: 107, type: 'PROCESS', data: '{}', isActive: true },
  { id: 108, type: 'TESTIMONIALS', data: '{}', isActive: true },
  { id: 109, type: 'CONTACT_BAND', data: '{}', isActive: true },
]

const DEFAULT_PRODUCT_PAGE_SECTIONS = [
  { id: 201, type: 'HERO', data: '{}', isActive: true, order: 1 },
  { id: 202, type: 'SPECS_MATRIX', data: '{}', isActive: true, order: 2 },
  { id: 203, type: 'CUSTOMIZATION', data: '{}', isActive: true, order: 3 },
  { id: 204, type: 'SECTORS', data: '{}', isActive: true, order: 4 },
  { id: 205, type: 'FABRIC_SWATCHES', data: '{}', isActive: true, order: 5 },
  { id: 206, type: 'QUALITY_CONTROL', data: '{}', isActive: true, order: 6 },
  { id: 207, type: 'BULK_PRICING', data: '{}', isActive: true, order: 7 },
  { id: 208, type: 'LOGISTICS', data: '{}', isActive: true, order: 8 },
  { id: 209, type: 'TESTIMONIALS', data: '{}', isActive: true, order: 9 },
  { id: 210, type: 'FAQ', data: '{}', isActive: true, order: 10 },
  { id: 211, type: 'QUOTE_BAND', data: '{}', isActive: true, order: 11 },
]

export function ClientDashboard({
  initialSlides,
  initialConfig,
  initialSections = [],
  initialProductPages = [],
}: {
  initialSlides: any[]
  initialConfig: any
  initialSections?: any[]
  initialProductPages?: any[]
}) {
  const [slides, setSlides] = useState<any[]>(
    initialSlides.map(parseSlideData)
  )
  const [config, setConfig] = useState(initialConfig || {})
  
  const [homepageSections, setHomepageSections] = useState<any[]>(
    initialSections.length > 0 ? initialSections : DEFAULT_HOMEPAGE_SECTIONS
  )

  const initialProdPageSections = initialProductPages[0]?.sections?.length > 0
    ? initialProductPages[0].sections
    : DEFAULT_PRODUCT_PAGE_SECTIONS

  const [productPageSections, setProductPageSections] = useState<any[]>(initialProdPageSections)
  const [productPages, setProductPages] = useState<any[]>(initialProductPages)
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>(
    initialProductPages[0]?.slug || 'pure-cotton-shirts-supplier-in-uae'
  )

  const [activeTab, setActiveTab] = useState<'builder' | 'header' | 'product-pages'>('product-pages')

  const currentSections = activeTab === 'product-pages' ? productPageSections : homepageSections

  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(
    (activeTab === 'product-pages' ? productPageSections : homepageSections)[0]?.id || 201
  )
  const [selectedSlideId, setSelectedSlideId] = useState<number | null>(
    slides[0]?.id || null
  )

  // Sync selectedSectionId on tab switch
  const switchTab = (tab: 'builder' | 'header' | 'product-pages') => {
    setActiveTab(tab)
    if (tab === 'product-pages') {
      setSelectedSectionId(productPageSections[0]?.id || 201)
    } else if (tab === 'builder') {
      setSelectedSectionId(homepageSections[0]?.id || 101)
    }
  }

  React.useEffect(() => {
    if (!selectedSlideId && slides.length > 0) {
      setSelectedSlideId(slides[0].id)
    }
  }, [slides, selectedSlideId])
  
  const [isSaving, setIsSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const sections = currentSections
  const activeSection = sections.find(s => s.id === selectedSectionId) || sections[0] || null
  const activeSlide = slides.find(s => s.id === selectedSlideId) || null
  
  // Section Data Management
  const getSectionData = (section: any) => {
    if (!section) return {}
    try { return JSON.parse(section.data) } catch (e) { return {} }
  }
  
  const handleSectionDataChange = (field: string, value: any) => {
    if (!selectedSectionId) return
    const updateFn = activeTab === 'product-pages' ? setProductPageSections : setHomepageSections
    updateFn(prev => prev.map(s => {
      if (s.id === selectedSectionId) {
        const data = getSectionData(s)
        data[field] = value
        return { ...s, data: JSON.stringify(data) }
      }
      return s
    }))
  }

  const handleAddProductSection = (type: string) => {
    const newId = Date.now()
    const newSec = {
      id: newId,
      type,
      data: '{}',
      isActive: true,
      order: productPageSections.length + 1,
    }
    setProductPageSections((prev) => [...prev, newSec])
    setSelectedSectionId(newId)
    showToast(`Added ${getSectionLabel(type)} section to product page!`)
  }

  const handleDeleteProductSection = (id: number) => {
    if (!confirm('Are you sure you want to delete this section from the product page?')) return
    const remaining = productPageSections.filter((s) => s.id !== id)
    setProductPageSections(remaining)
    if (selectedSectionId === id) {
      setSelectedSectionId(remaining[0]?.id || null)
    }
    showToast('Section removed!')
  }

  // Hero Data Management
  const handleSlideChange = (field: string, value: string) => {
    if (!selectedSlideId) return
    setSlides(prev => prev.map(s => s.id === selectedSlideId ? { ...s, [field]: value } : s))
  }

  const handleConfigChange = (field: string, value: string) => {
    setConfig((prev: any) => ({ ...prev, [field]: value }))
  }

  // Save Handlers
  const handleSave = async () => {
    setIsSaving(true)
    try {
      if (activeTab === 'product-pages') {
        await saveProductPageSectionsAction(selectedProductSlug, productPageSections)
        showToast('Product Page sections published successfully!')
      } else {
        // 1. Save all slides
        for (const s of slides) {
          let badgesList: string[] = []
          if (Array.isArray(s.trustBadges)) {
            badgesList = s.trustBadges
          } else if (typeof s.trustBadges === 'string') {
            try {
              const p = JSON.parse(s.trustBadges)
              badgesList = Array.isArray(p) ? p : (p?.badges || [])
            } catch (e) {}
          }

          const trustBadgesPayload = JSON.stringify({
            badges: badgesList,
            textColor: s.textColor || '#1F2A37',
            textAlignment: s.textAlignment || 'Left',
            overlayEnabled: s.overlayEnabled || 'true',
            overlayOpacity: s.overlayOpacity || '60',
            status: s.status || 'Active',
          })

          await updateSlide(s.id, {
            ...s,
            trustBadges: trustBadgesPayload,
            textColor: s.textColor || '#1F2A37',
            textAlignment: s.textAlignment || 'Left',
            overlayEnabled: s.overlayEnabled || 'true',
            overlayOpacity: s.overlayOpacity || '60',
            status: s.status || 'Active',
          })
        }

        // 2. Save all homepage sections
        for (const sec of homepageSections) {
          await updatePageSection(sec.id, sec.data || '{}', sec.isActive ?? true)
        }

        // 3. Save global config
        if (config) {
          const navLinksStr = typeof config.navLinks === 'string'
            ? config.navLinks
            : JSON.stringify(config.navLinks || [])
          await updateSiteConfig({ ...config, navLinks: navLinksStr })
        }

        showToast('Website changes published successfully!')
      }
    } catch (err: any) {
      console.error(err)
      showToast('Error publishing changes', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  // Hero Handlers
  const handleCreateSlide = async () => {
    setIsSaving(true)
    try {
      const newSlide = await createSlide({})
      const newSlideParsed = parseSlideData(newSlide)
      setSlides(prev => [...prev, newSlideParsed])
      setSelectedSlideId(newSlideParsed.id)
      showToast('New slide created!')
    } catch (err: any) {
      console.error('Create slide error:', err)
      showToast('Error creating slide', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this slide?')) return
    setIsSaving(true)
    try {
      await deleteSlide(id)
      setSlides(prev => prev.filter(s => s.id !== id))
      if (selectedSlideId === id) {
        setSelectedSlideId(slides.length > 1 ? slides.find(s => s.id !== id)?.id || null : null)
      }
      showToast('Slide deleted successfully!')
    } catch (err) {
      console.error(err)
      showToast('Error deleting slide', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const data = await res.json()
    if (data.success) return data.url
    throw new Error(data.error)
  }

  const handleSlideImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
    setIsSaving(true)
    try {
      const url = await uploadFile(e.target.files[0])
      handleSlideChange('image', url)
    } catch (err) {
      alert('Upload failed')
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
    setIsSaving(true)
    try {
      const url = await uploadFile(e.target.files[0])
      handleConfigChange('logoUrl', url)
    } catch (err) {
      alert('Upload failed')
    } finally {
      setIsSaving(false)
    }
  }

  const handleBrandImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
    setIsSaving(true)
    try {
      const url = await uploadFile(e.target.files[0])
      handleSectionDataChange('image', url)
    } catch (err) {
      alert('Upload failed')
    } finally {
      setIsSaving(false)
    }
  }

  const moveSection = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === sections.length - 1) return
    
    const newSections = [...sections]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    // Swap
    const temp = newSections[index]
    newSections[index] = newSections[targetIndex]
    newSections[targetIndex] = temp
    
    // Update orders
    const mapped = newSections.map((s, i) => ({ ...s, order: i + 1 }))
    setSections(mapped)
    
    // Save to DB instantly
    await updateSectionOrder(mapped.map(s => ({ id: s.id, order: s.order })))
    showToast('Order updated!')
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-inter overflow-hidden text-[#1E293B]">
      
      {/* EXACT REFERENCE SIDEBAR */}
      <div className="w-[260px] bg-[#0B1120] text-gray-400 flex flex-col shrink-0 z-30 relative shadow-2xl">
        
        {/* Brand */}
        <div className="px-6 py-8 flex flex-col gap-4">
          <img
            src={config?.logoUrl || '/silky-logo.png'}
            alt="Silky Logo"
            className="h-10 sm:h-12 w-auto object-contain self-start"
          />
          <div className="flex items-center gap-2 bg-[#1A233A] rounded-full px-3 py-1.5 w-fit border border-white/5">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-300">System Online</span>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 space-y-1 scrollbar-hide">
          <div className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 mt-2">Main Pages</div>
          
          <button 
            onClick={() => switchTab('header')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'header' 
                ? 'bg-[#DE7B3D]/10 text-white border-l-2 border-[#DE7B3D] font-semibold' 
                : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
            }`}
          >
            <Monitor className={`w-4 h-4 ${activeTab === 'header' ? 'text-[#DE7B3D]' : ''}`} /> Theme & Header
          </button>
          
          <button 
            onClick={() => switchTab('builder')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'builder' 
                ? 'bg-[#DE7B3D]/10 text-white border-l-2 border-[#DE7B3D] font-semibold' 
                : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
            }`}
          >
            <Layout className={`w-4 h-4 ${activeTab === 'builder' ? 'text-[#DE7B3D]' : ''}`} /> Homepage
          </button>

          <button 
            onClick={() => switchTab('product-pages')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'product-pages' 
                ? 'bg-[#DE7B3D]/10 text-white border-l-2 border-[#DE7B3D] font-semibold' 
                : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
            }`}
          >
            <ShoppingBag className={`w-4 h-4 ${activeTab === 'product-pages' ? 'text-[#DE7B3D]' : ''}`} /> Product Pages CMS
          </button>

          <a 
            href={`/products/${selectedProductSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent mt-2"
          >
            <ExternalLink className="w-4 h-4 text-[#1C7A4C]" />
            <span>Preview Live Page ↗</span>
          </a>
        </div>
        
        {/* Quick Actions & User */}
        <div className="p-4 mt-auto space-y-4">
           <div className="px-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Quick Actions</div>
           <a href="/" target="_blank" className="w-full flex items-center justify-between px-4 py-3 bg-[#1A233A] hover:bg-[#25304B] rounded-xl text-sm font-semibold text-white transition-colors border border-white/5">
             <div className="flex items-center gap-2">
               <Monitor className="w-4 h-4 text-gray-400" />
               <div className="flex flex-col text-left">
                  <span>View Website</span>
                  <span className="text-[10px] text-gray-400 font-normal">Visit your live site</span>
               </div>
             </div>
             <ExternalLink className="w-4 h-4 text-gray-500" />
           </a>

           <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/5">
              <div className="flex items-center gap-3">
                 <div className="w-9 h-9 rounded-full bg-[#DE7B3D] flex items-center justify-center text-white font-bold text-sm shrink-0">NS</div>
                 <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white leading-none">Nabin Shrestha</span>
                    <span className="text-[11px] text-gray-400 mt-1">Super Admin</span>
                 </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
           </div>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all font-medium text-sm animate-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-white text-green-700 border border-green-100' : 'bg-white text-red-700 border border-red-100'
        }`}>
          {toast.type === 'success' ? (
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center"><svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg></div>
          )}
          {toast.message}
        </div>
      )}



      {/* FULL WIDTH CMS EDITOR */}
      <div className="flex-1 flex flex-col relative bg-[#F8FAFC] overflow-hidden">
        
        {/* Top Header Match */}
        <header className="h-[68px] bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-4">
             <Menu className="w-5 h-5 text-gray-500 cursor-pointer" />
             <span className="font-semibold text-gray-800 text-sm">Page Builder</span>
          </div>
          <div className="flex items-center gap-6">
             <Search className="w-4 h-4 text-gray-400 cursor-pointer" />
             <div className="relative cursor-pointer">
                <Bell className="w-4 h-4 text-gray-400" />
                <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold border border-white">3</div>
             </div>
             <HelpCircle className="w-4 h-4 text-gray-400 cursor-pointer" />
          </div>
        </header>

        {/* PRODUCT PAGES HORIZONTAL TABS */}
        {activeTab === 'product-pages' && (
          <div className="bg-white border-b border-gray-200 z-10 shrink-0 shadow-xs">
            <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Product Page:</span>
                <select
                  value={selectedProductSlug}
                  onChange={(e) => setSelectedProductSlug(e.target.value)}
                  className="px-4 py-2 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                >
                  <option value="pure-cotton-shirts-supplier-in-uae">Pure Cotton Shirts Supplier in UAE</option>
                  {productPages.map((p) => (
                    <option key={p.id} value={p.slug}>
                      {p.title} ({p.slug})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`/products/${selectedProductSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#1C7A4C]" /> Live Preview ↗
                </a>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2 bg-[#DE7B3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#c96a2e] transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" /> Publish All Changes
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between overflow-x-auto px-6 hide-scrollbar max-w-7xl mx-auto border-t border-gray-100">
              <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar">
                {sections.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSectionId(s.id)}
                    className={`whitespace-nowrap px-5 py-4 text-[11px] font-bold uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 ${
                      selectedSectionId === s.id
                        ? 'text-[#DE7B3D] border-[#DE7B3D]'
                        : 'text-gray-500 border-transparent hover:text-gray-800'
                    }`}
                  >
                    <span>{getSectionLabel(s.type)}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 py-2 shrink-0">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAddProductSection(e.target.value)
                      e.target.value = ''
                    }
                  }}
                  defaultValue=""
                  className="px-3.5 py-2 text-xs font-bold text-[#DE7B3D] bg-[#DE7B3D]/10 border border-[#DE7B3D]/30 rounded-xl focus:outline-none cursor-pointer"
                >
                  <option value="" disabled>+ Add Section to Page</option>
                  <option value="HERO">Hero Banner</option>
                  <option value="SPECS_MATRIX">Fabric Specs Matrix</option>
                  <option value="CUSTOMIZATION">Custom Embroidery & Tailoring</option>
                  <option value="SECTORS">Industries We Supply</option>
                  <option value="FABRIC_SWATCHES">Fabric Types & Swatches</option>
                  <option value="QUALITY_CONTROL">4-Step Quality Control</option>
                  <option value="BULK_PRICING">Wholesale Bulk Pricing</option>
                  <option value="LOGISTICS">Express Logistics & GCC</option>
                  <option value="TESTIMONIALS">Verified B2B Client Reviews</option>
                  <option value="FAQ">B2B Supply FAQ</option>
                  <option value="QUOTE_BAND">Get A Free Quote Form</option>
                </select>

                {selectedSectionId && (
                  <button
                    onClick={() => handleDeleteProductSection(selectedSectionId)}
                    className="p-2 text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors shrink-0"
                    title="Remove selected section from page"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* HOMEPAGE HORIZONTAL TABS */}
        {activeTab === 'builder' && (
          <div className="bg-white border-b border-gray-200 z-10 shrink-0">
             <div className="flex overflow-x-auto px-6 hide-scrollbar max-w-7xl mx-auto">
               {sections.map((s, idx) => (
                 <button
                   key={s.id}
                   onClick={() => setSelectedSectionId(s.id)}
                   className={`whitespace-nowrap px-8 py-5 text-[11px] font-bold uppercase tracking-wider transition-all border-b-2 ${
                     selectedSectionId === s.id 
                       ? 'text-[#DE7B3D] border-[#DE7B3D]' 
                       : 'text-gray-500 border-transparent hover:text-gray-800'
                   }`}
                 >
                   {s.type.replace('_', ' ')}
                 </button>
               ))}
             </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto w-full mx-auto p-8 lg:p-12 pb-32 max-w-7xl">
          
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-[28px] font-bold text-[#1E293B] tracking-tight">
                {activeTab === 'header' ? 'Theme & Settings' : (activeSection ? `${getSectionLabel(activeSection.type)} Editor` : 'Page Builder')}
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                {activeTab === 'header' ? 'Manage your global site configuration.' : 'Modify the content and layout of this section.'}
              </p>
            </div>
            {/* The Add Slide Button goes here in the header for Hero */}
            {(activeTab === 'builder' || activeTab === 'product-pages') && activeSection?.type === 'HERO' && (
              <button onClick={handleCreateSlide} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-white text-gray-700 hover:bg-gray-50 transition-all border border-gray-200 shadow-sm">
                <Plus className="w-4 h-4 text-gray-500" /> Add New Slide
              </button>
            )}
          </div>

          {/* BUILDER / PRODUCT PAGES AREA */}
          {activeTab === 'builder' || activeTab === 'product-pages' ? (
            activeSection ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* HERO EDITOR */}
                {activeSection.type === 'HERO' && (
                  <div className="space-y-6">
                     <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-2 flex-wrap">
                         {slides.map((s, idx) => (
                           <button
                             key={s.id}
                             onClick={() => setSelectedSlideId(s.id)}
                             className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border ${
                               selectedSlideId === s.id ? 'bg-[#DE7B3D] text-white border-[#DE7B3D] shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200 shadow-sm'
                             }`}
                           >
                             Slide {idx + 1}
                           </button>
                         ))}
                         <button
                           type="button"
                           onClick={handleCreateSlide}
                           disabled={isSaving}
                           className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-[#DE7B3D]/10 text-[#DE7B3D] hover:bg-[#DE7B3D]/20 border border-[#DE7B3D]/30 transition-all shadow-sm cursor-pointer"
                         >
                           <Plus className="w-4 h-4" /> Add Slide
                         </button>
                        </div>
                       
                       {activeSlide && (
                         <button 
                           onClick={() => handleDelete(activeSlide.id)}
                           className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-2 text-sm font-semibold bg-white px-5 py-2.5 rounded-lg border border-red-200 hover:bg-red-50 shadow-sm"
                         >
                           <Trash2 className="w-4 h-4" /> Delete Slide
                         </button>
                       )}
                    </div>

                    {activeSlide && (
                      <div className="flex flex-col xl:flex-row gap-8 items-start">
                        {/* LEFT COLUMN: Editor Forms */}
                        <div className="flex-1 space-y-6 w-full">
                      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                          <ImageIcon className="w-5 h-5 text-gray-400" />
                          <h3 className="font-bold text-gray-800 text-lg">Media & Content</h3>
                        </div>
                        <div className="p-8">
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                             {/* Left Column: Image */}
                             <div>
                               <label className="block text-sm font-semibold text-gray-700 mb-3">Slide Background</label>
                               <div className="w-full aspect-[16/9] rounded-xl bg-gray-100 overflow-hidden border border-gray-200 flex items-center justify-center relative mb-4">
                                 {activeSlide.image ? <img src={activeSlide.image} className="w-full h-full object-cover" /> : <ImageIcon className="w-10 h-10 text-gray-300" />}
                               </div>
                               <div className="flex items-center gap-3">
                                 <button onClick={() => fileInputRef.current?.click()} className="flex-1 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors shadow-sm">
                                    <UploadCloud className="w-4 h-4" /> Change Image
                                 </button>
                                 <button onClick={() => handleSlideChange('image', '')} className="flex-1 py-2.5 bg-white border border-red-100 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50 flex items-center justify-center gap-2 transition-colors shadow-sm">
                                    <Trash2 className="w-4 h-4" /> Remove
                                 </button>
                                 <input type="file" className="hidden" ref={fileInputRef} onChange={handleSlideImageUpload} accept="image/*" />
                               </div>
                               <p className="text-xs text-gray-500 mt-3 text-center">Recommended size: 1920x1080px</p>
                             </div>

                             {/* Right Column: Inputs */}
                             <div className="space-y-6">
                                
                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-2">Heading</label>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      value={activeSlide.title || ''}
                                      onChange={(e) => handleSlideChange('title', e.target.value)}
                                      className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white outline-none pr-16"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">{activeSlide.title?.length || 0}/100</span>
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subheading</label>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      value={activeSlide.description || ''}
                                      onChange={(e) => handleSlideChange('description', e.target.value)}
                                      className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white outline-none pr-16"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">{activeSlide.description?.length || 0}/100</span>
                                  </div>
                                </div>
                             </div>
                          </div>
                        </div>
                      </div>
                    
                      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                          <Settings className="w-5 h-5 text-gray-400" />
                          <h3 className="font-bold text-gray-800 text-lg">Content Settings</h3>
                        </div>
                        <div className="p-8">
                           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                              <div>
                               <label className="block text-sm font-semibold text-gray-700 mb-2">Text Alignment</label>
                               <select 
                                 value={activeSlide.textAlignment || 'Left'}
                                 onChange={(e) => handleSlideChange('textAlignment', e.target.value)}
                                 className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white outline-none cursor-pointer"
                               >
                                 <option value="Left">Left</option>
                                 <option value="Center">Center</option>
                                 <option value="Right">Right</option>
                               </select>
                              </div>
                              <div>
                               <label className="block text-sm font-semibold text-gray-700 mb-2">Text Color</label>
                               <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1">
                                 <input
                                   type="text"
                                   value={activeSlide.textColor || '#1F2A37'}
                                   onChange={(e) => handleSlideChange('textColor', e.target.value)}
                                   className="w-full px-3 py-1 text-sm bg-transparent border-none outline-none font-mono uppercase text-gray-700"
                                   placeholder="#1F2A37"
                                 />
                                 <label className="relative cursor-pointer px-2 py-1 flex items-center justify-center shrink-0">
                                   <div 
                                     className="w-6 h-6 rounded border border-gray-300 shadow-inner shrink-0 cursor-pointer" 
                                     style={{ backgroundColor: activeSlide.textColor || '#1F2A37' }}
                                   />
                                   <input
                                     type="color"
                                     value={activeSlide.textColor || '#1F2A37'}
                                     onChange={(e) => handleSlideChange('textColor', e.target.value)}
                                     className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                   />
                                 </label>
                               </div>
                              </div>
                              <div>
                               <label className="block text-sm font-semibold text-gray-700 mb-2">Overlay</label>
                               <div 
                                 onClick={() => handleSlideChange('overlayEnabled', activeSlide.overlayEnabled === 'false' ? 'true' : 'false')}
                                 className="flex items-center gap-3 pt-2 cursor-pointer"
                               >
                                  <div className={`w-10 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${activeSlide.overlayEnabled !== 'false' ? 'bg-[#DE7B3D] justify-end' : 'bg-gray-300 justify-start'}`}>
                                    <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">
                                    {activeSlide.overlayEnabled !== 'false' ? 'Enabled' : 'Disabled'}
                                  </span>
                               </div>
                              </div>
                              <div>
                               <label className="block text-sm font-semibold text-gray-700 mb-2">Overlay Opacity</label>
                               <div className="flex items-center gap-4 pt-2">
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={activeSlide.overlayOpacity || '60'}
                                    onChange={(e) => handleSlideChange('overlayOpacity', e.target.value)}
                                    className="flex-1 accent-[#DE7B3D] cursor-pointer"
                                  />
                                  <span className="text-sm font-medium text-gray-700">{activeSlide.overlayOpacity || '60'}%</span>
                               </div>
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                      
                      {/* RIGHT COLUMN: Previews & Settings */}
                      <div className="w-full xl:w-[320px] shrink-0 space-y-6">
                        
                        {/* Live Preview */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6">
                           <h3 className="font-bold text-gray-800 text-sm mb-4">Live Preview</h3>
                           <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-gray-100 relative group border border-gray-200">
                             {activeSlide.image ? (
                               <img src={activeSlide.image} alt="Preview" className="w-full h-full object-cover" />
                             ) : (
                               <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                             )}
                             
                             <div 
                                className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center transition-all"
                                style={{
                                  backgroundColor: activeSlide.overlayEnabled !== 'false' ? `rgba(31, 42, 55, ${(parseFloat(activeSlide.overlayOpacity || '40') / 100) * 0.6})` : 'transparent'
                                }}
                              >
                                 {activeSlide.title && <h4 className="font-playfair font-bold text-sm tracking-wider uppercase" style={{ color: activeSlide.textColor || '#FFFFFF' }}>{activeSlide.title}</h4>}
                                 {activeSlide.description && <p className="text-[10px] mt-1 line-clamp-1" style={{ color: activeSlide.textColor ? `${activeSlide.textColor}CC` : '#FFFFFF' }}>{activeSlide.description}</p>}
                              </div>
                             
                             <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                               {slides.map(s => (
                                 <div key={s.id} className={`w-1.5 h-1.5 rounded-full ${s.id === activeSlide.id ? 'bg-[#DE7B3D]' : 'bg-white/50'}`} />
                               ))}
                             </div>
                           </div>
                        </div>

                        {/* Slide Settings */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 space-y-5">
                           <h3 className="font-bold text-gray-800 text-sm">Slide Settings</h3>
                           
                           <div>
                              <label className="block text-xs font-semibold text-gray-700 mb-2">Status</label>
                              <div className="relative">
                                <select 
                                  value={activeSlide.status || 'Active'}
                                  onChange={(e) => handleSlideChange('status', e.target.value)}
                                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white outline-none appearance-none pl-8 cursor-pointer"
                                >
                                  <option value="Active">Active</option>
                                  <option value="Draft">Draft</option>
                                  <option value="Hidden">Hidden</option>
                                </select>
                                <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                                  (activeSlide.status || 'Active') === 'Active' ? 'bg-green-500' : (activeSlide.status === 'Draft' ? 'bg-amber-500' : 'bg-red-500')
                                }`} />
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                              </div>
                           </div>

                           <div>
                             <label className="block text-xs font-semibold text-gray-700 mb-2">Display Order</label>
                             <div className="flex">
                                <input type="number" value={activeSlide.order || 1} readOnly className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none" />
                             </div>
                           </div>

                           <div className="flex items-center justify-between pt-2">
                             <label className="text-xs font-semibold text-gray-700">Show on Homepage</label>
                             <button
                               type="button"
                               onClick={() => handleSlideChange('status', (activeSlide.status || 'Active') === 'Active' ? 'Hidden' : 'Active')}
                               className={`w-9 h-5 rounded-full flex items-center p-0.5 cursor-pointer transition-colors ${
                                 (activeSlide.status || 'Active') === 'Active' ? 'bg-[#DE7B3D] justify-end' : 'bg-gray-300 justify-start'
                               }`}
                             >
                                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                             </button>
                           </div>
                        </div>

                        {/* Tips */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 space-y-4">
                           <h3 className="font-bold text-gray-800 text-sm">Tips</h3>
                           <ul className="space-y-3">
                             <li className="flex items-start gap-2 text-xs text-gray-600">
                               <Check className="w-4 h-4 text-green-500 shrink-0" /> Use high-quality images for best results
                             </li>
                             <li className="flex items-start gap-2 text-xs text-gray-600">
                               <Check className="w-4 h-4 text-green-500 shrink-0" /> Recommended size: 1920x1080px
                             </li>
                             <li className="flex items-start gap-2 text-xs text-gray-600">
                               <Check className="w-4 h-4 text-green-500 shrink-0" /> Keep text short and impactful
                             </li>
                             <li className="flex items-start gap-2 text-xs text-gray-600">
                               <Check className="w-4 h-4 text-green-500 shrink-0" /> Test your slides on different devices
                             </li>
                           </ul>
                        </div>

                      </div>
                    </div>
                    )}
                  </div>
                )}

                {/* BRAND STORY EDITOR */}
                {activeSection.type === 'BRAND_STORY' && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-gray-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2"><ImageIcon className="w-4 h-4 text-slate-400" /> Section Media</h3>
                      </div>
                      <div className="p-8">
                        <div className="flex items-start gap-6">
                          <div className="w-64 h-48 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-gray-200 shadow-inner flex items-center justify-center relative group">
                            {getSectionData(activeSection).image ? <img src={getSectionData(activeSection).image} className="w-full h-full object-cover" /> : <ImageIcon className="w-10 h-10 text-slate-300" />}
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                               <label htmlFor="brandFile2" className="cursor-pointer bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-lg shadow-lg">Upload Image</label>
                               <input type="file" className="hidden" id="brandFile2" onChange={handleBrandImageUpload} accept="image/*" />
                            </div>
                          </div>
                          <div className="flex-1 space-y-4 pt-2">
                            <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Image Caption</label>
                              <input type="text" value={getSectionData(activeSection).imageCaption || ''} onChange={(e) => handleSectionDataChange('imageCaption', e.target.value)} className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-gray-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2"><Settings className="w-4 h-4 text-slate-400" /> Content Text</h3>
                      </div>
                      <div className="p-8 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Tagline</label>
                            <input type="text" value={getSectionData(activeSection).tagline || ''} onChange={(e) => handleSectionDataChange('tagline', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Established Text</label>
                            <input type="text" value={getSectionData(activeSection).establishedText || ''} onChange={(e) => handleSectionDataChange('establishedText', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Main Heading</label>
                          <input type="text" value={getSectionData(activeSection).title || ''} onChange={(e) => handleSectionDataChange('title', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-semibold text-lg" />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Featured Quote</label>
                          <textarea value={getSectionData(activeSection).quote || ''} onChange={(e) => handleSectionDataChange('quote', e.target.value)} rows={3} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 italic" />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Body Description</label>
                          <textarea value={getSectionData(activeSection).description || ''} onChange={(e) => handleSectionDataChange('description', e.target.value)} rows={4} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SPECS MATRIX EDITOR */}
                {activeSection.type === 'SPECS_MATRIX' && (
                  <SpecsMatrixEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} />
                )}

                {/* FAQ EDITOR */}
                {activeSection.type === 'FAQ' && (
                  <FaqEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} />
                )}

                {/* FABRIC SWATCHES EDITOR */}
                {activeSection.type === 'FABRIC_SWATCHES' && (
                  <FabricSwatchesEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} />
                )}

                {/* QUALITY CONTROL EDITOR */}
                {activeSection.type === 'QUALITY_CONTROL' && (
                  <QualityControlEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} onUpload={uploadFile} />
                )}

                {/* BULK PRICING EDITOR */}
                {activeSection.type === 'BULK_PRICING' && (
                  <BulkPricingEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} />
                )}

                {/* LOGISTICS EDITOR */}
                {activeSection.type === 'LOGISTICS' && (
                  <LogisticsEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} />
                )}

                {/* CUSTOMIZATION EDITOR */}
                {activeSection.type === 'CUSTOMIZATION' && (
                  <CategoryShowcaseEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} onUpload={uploadFile} />
                )}

                {/* SECTORS EDITOR */}
                {activeSection.type === 'SECTORS' && (
                  <UniformSolutionsEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} onUpload={uploadFile} />
                )}

                {/* QUOTE BAND EDITOR */}
                {activeSection.type === 'QUOTE_BAND' && (
                  <ContactBandEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} />
                )}

                {/* CATEGORY SHOWCASE EDITOR */}
                {activeSection.type === 'CATEGORY_SHOWCASE' && (
                  <CategoryShowcaseEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} onUpload={uploadFile} />
                )}

                {/* UNIFORM SOLUTIONS EDITOR */}
                {activeSection.type === 'UNIFORM_SOLUTIONS' && (
                  <UniformSolutionsEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} onUpload={uploadFile} />
                )}

                {/* OUR WORK EDITOR */}
                {activeSection.type === 'OUR_WORK' && (
                  <OurWorkEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} onUpload={uploadFile} />
                )}

                {/* WHY SILKY EDITOR */}
                {activeSection.type === 'WHY_SILKY' && (
                  <WhySilkyEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} />
                )}

                {/* PROCESS EDITOR */}
                {activeSection.type === 'PROCESS' && (
                  <ProcessEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} />
                )}

                {/* TESTIMONIALS EDITOR */}
                {activeSection.type === 'TESTIMONIALS' && (
                  <TestimonialsEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} />
                )}

                {/* CONTACT BAND EDITOR */}
                {activeSection.type === 'CONTACT_BAND' && (
                  <ContactBandEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} />
                )}

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 py-32">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                  <Layout className="w-8 h-8 text-blue-500/50" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">No Section Selected</h2>
                <p className="text-sm mt-2 text-slate-500">Choose a section from the left sidebar to start editing.</p>
              </div>
            )
          ) : (
            
            /* THEME & SETTINGS AREA */
            <div className="space-y-8 animate-in fade-in duration-300">
               
               <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  {/* THEMING SETTINGS */}
                  <div className="xl:col-span-1 bg-[#1E293B] p-8 rounded-2xl border border-slate-700 shadow-xl text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-full" />
                    
                    <h3 className="font-black text-xl mb-6 flex items-center gap-3"><Monitor className="w-5 h-5 text-blue-400" /> Brand Identity</h3>
                    
                    <div className="space-y-6 relative z-10">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Primary Accent</label>
                        <div className="flex items-center gap-4 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
                          <input type="color" value={config.primaryColor || '#DE7B3D'} onChange={(e) => handleConfigChange('primaryColor', e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0 shadow-inner" />
                          <input type="text" value={config.primaryColor || '#DE7B3D'} onChange={(e) => handleConfigChange('primaryColor', e.target.value)} className="w-full bg-transparent text-sm font-bold text-white border-0 focus:ring-0 uppercase font-mono" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Background Base</label>
                        <div className="flex items-center gap-4 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
                          <input type="color" value={config.bgColor || '#F7F5F2'} onChange={(e) => handleConfigChange('bgColor', e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0 shadow-inner" />
                          <input type="text" value={config.bgColor || '#F7F5F2'} onChange={(e) => handleConfigChange('bgColor', e.target.value)} className="w-full bg-transparent text-sm font-bold text-white border-0 focus:ring-0 uppercase font-mono" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Text Default</label>
                        <div className="flex items-center gap-4 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
                          <input type="color" value={config.textColor || '#1F2A37'} onChange={(e) => handleConfigChange('textColor', e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0 shadow-inner" />
                          <input type="text" value={config.textColor || '#1F2A37'} onChange={(e) => handleConfigChange('textColor', e.target.value)} className="w-full bg-transparent text-sm font-bold text-white border-0 focus:ring-0 uppercase font-mono" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="xl:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                      <h3 className="font-bold text-slate-800 mb-6 border-b border-gray-100 pb-4">Company Logo</h3>
                      <div className="flex items-center gap-8">
                        <div className="w-48 h-24 rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center p-4">
                           {config.logoUrl ? <img src={config.logoUrl} className="max-w-full max-h-full object-contain" /> : <ImageIcon className="w-8 h-8 text-slate-300" />}
                        </div>
                        <div className="flex-1 space-y-4">
                          <input
                            type="text"
                            value={config.logoUrl}
                            onChange={(e) => handleConfigChange('logoUrl', e.target.value)}
                            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-slate-600"
                            placeholder="https://..."
                          />
                          <div className="flex items-center gap-3">
                             <input type="file" className="hidden" ref={logoInputRef} onChange={handleLogoUpload} accept="image/*" />
                             <button onClick={() => logoInputRef.current?.click()} disabled={isSaving} className="flex items-center gap-2 text-sm font-bold text-slate-700 bg-white border border-gray-300 px-5 py-2.5 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm">
                                <UploadCloud className="w-4 h-4 text-blue-500" /> Upload File
                             </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                      <h3 className="font-bold text-slate-800 mb-6 border-b border-gray-100 pb-4">Contact Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Top Bar Notification</label>
                          <input
                            type="text"
                            value={config.topBarText}
                            onChange={(e) => handleConfigChange('topBarText', e.target.value)}
                            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                          <input
                            type="text"
                            value={config.phone}
                            onChange={(e) => handleConfigChange('phone', e.target.value)}
                            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                          <input
                            type="email"
                            value={config.email}
                            onChange={(e) => handleConfigChange('email', e.target.value)}
                            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp Direct</label>
                          <input
                            type="text"
                            value={config.whatsapp}
                            onChange={(e) => handleConfigChange('whatsapp', e.target.value)}
                            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                            placeholder="e.g. 97142261050"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* FLOATING PUBLISH BUTTON */}
        <button
           onClick={handleSave}
           disabled={isSaving}
           className="fixed bottom-8 right-8 z-50 flex items-center justify-center gap-2 bg-[#DE7B3D] text-white px-6 py-3.5 rounded-lg font-bold text-sm hover:bg-[#C96A30] transition-all shadow-xl hover:shadow-orange-900/30 active:scale-[0.98] disabled:opacity-50"
         >
           {isSaving ? (
             <>
               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
               Saving...
             </>
           ) : (
             <>
               <Check className="w-4 h-4" />
               Publish Changes
             </>
           )}
         </button>
      </div>
    </div>
  )
}
