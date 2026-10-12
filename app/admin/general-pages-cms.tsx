'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  FileText, Files, Search, Plus, Trash2, Edit3, Eye, Check, CheckCircle2, Newspaper,
  ExternalLink, Share2, Heading1, Heading2, Heading3,
  Bold, Italic, Underline, Highlighter, Code2,
  List, ListOrdered, Quote, Info, Minus, Table, Image as ImageIcon, Link as LinkIcon,
  ArrowLeft, Save, X, ToggleLeft, ToggleRight, Code, Eye as EyeIcon,
  Smartphone, Monitor, Clock, Split, Globe, Wand2, Upload, RefreshCw
} from 'lucide-react'

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
  
  // SEO Metadata
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  ogImage?: string
  allowIndexing: boolean
  
  author: string
  createdAt: string
  updatedAt: string
}

const DEFAULT_GENERAL_PAGES: GeneralPageItem[] = [
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
<blockquote class="border-l-4 border-[#DE7B3D] pl-4 py-2 my-4 bg-orange-50/50 rounded-r-xl font-medium text-slate-800 italic">"Crafted for performance, tailored for distinction."</blockquote>`,
    seoTitle: 'About Silky Textiles LLC | Premier Uniform Supplier Dubai & UAE',
    seoDescription: 'Discover Silky Textiles LLC — Dubai’s top corporate uniform and garment manufacturer. Delivering high-quality custom apparel across the UAE and GCC.',
    seoKeywords: 'silky textiles about, uniform manufacturer dubai, uae textile company, custom corporate apparel',
    ogImage: '/images/textile_fabric_rolls.png',
    allowIndexing: true,
    author: 'Silky Executive Team',
    createdAt: '2026-01-15',
    updatedAt: '2026-10-08',
  },
  {
    id: 'page-contact',
    title: 'Contact Us',
    subtitle: 'Get in touch with our uniform consultants or visit our Dubai headquarters.',
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
    seoKeywords: 'contact silky textiles, uniform showroom dubai, uniform quote uae',
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
    seoKeywords: 'corporate uniform trends uae 2026, workwear guide dubai, breathable uniform fabrics',
    ogImage: '/images/corporate_executive_shirts.png',
    allowIndexing: true,
    author: 'Editorial Desk',
    createdAt: '2026-09-10',
    updatedAt: '2026-10-05',
  }
]

const PRESET_COVER_IMAGES = [
  { label: 'Fabric Rolls', url: '/images/textile_fabric_rolls.png' },
  { label: 'Textile Factory', url: '/images/hero_textiles_factory.png' },
  { label: 'Executive Apparel', url: '/images/corporate_executive_shirts.png' },
  { label: 'Chef & Hospitality', url: '/images/hospitality_uniform_chef.png' },
]

const LOCAL_STORAGE_KEY = 'silky_cms_general_pages'

// Auto-generates clean URL slug from title string
const generateSlugFromTitle = (text: string = '') => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// Unescapes raw HTML text like &lt;h2&gt; into real HTML elements
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

export function GeneralPagesCMS() {
  const [pages, setPages] = useState<GeneralPageItem[]>([])
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('ALL')
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Editor Form State
  const [formData, setFormData] = useState<GeneralPageItem | null>(null)
  const [editorMode, setEditorMode] = useState<'visual' | 'split' | 'code'>('visual')
  const [googlePreviewDevice, setGooglePreviewDevice] = useState<'desktop' | 'mobile'>('desktop')
  
  // File Input Refs
  const visualEditorRef = useRef<HTMLDivElement>(null)
  const coverFileInputRef = useRef<HTMLInputElement>(null)
  const bodyFileInputRef = useRef<HTMLInputElement>(null)

  // Helper to filter out duplicate slugs automatically
  const deduplicateBySlug = (list: GeneralPageItem[]) => {
    const seenSlugs = new Set<string>()
    const uniqueList: GeneralPageItem[] = []
    
    // Sort so most recently updated pages come first
    const sorted = [...list].sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
    
    for (const page of sorted) {
      const cleanSlug = (page.slug || '').replace(/^\//, '').toLowerCase().trim()
      if (!cleanSlug) continue
      if (!seenSlugs.has(cleanSlug)) {
        seenSlugs.add(cleanSlug)
        uniqueList.push(page)
      }
    }
    return uniqueList
  }

  // Load Pages From Database (with local cache fallback)
  useEffect(() => {
    let isMounted = true

    const fetchPages = async () => {
      try {
        const res = await fetch('/api/general-pages', { cache: 'no-store' })
        if (res.ok) {
          const dbPages = await res.json()
          if (Array.isArray(dbPages) && dbPages.length > 0) {
            const formatted: GeneralPageItem[] = dbPages.map((p: any) => ({
              id: String(p.id),
              title: p.title || '',
              subtitle: p.subtitle || '',
              slug: p.slug || '',
              pageType: (p.pageType as any) || 'General Page',
              status: (p.status as any) || 'Published',
              isActive: Boolean(p.isActive),
              featuredImage: p.featuredImage || undefined,
              content: p.content || '',
              seoTitle: p.seoTitle || '',
              seoDescription: p.seoDescription || '',
              seoKeywords: p.seoKeywords || '',
              ogImage: p.ogImage || undefined,
              allowIndexing: Boolean(p.allowIndexing),
              author: p.author || 'Silky Team',
              createdAt: p.createdAt ? String(p.createdAt).split('T')[0] : '',
              updatedAt: p.updatedAt ? String(p.updatedAt).split('T')[0] : '',
            }))
            const cleaned = deduplicateBySlug(formatted)
            if (isMounted) {
              setPages(cleaned)
              try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleaned))
              } catch (e) {}
            }
            return
          }
        }
      } catch (e) {
        console.warn('Could not fetch from /api/general-pages, falling back to local storage:', e)
      }

      // Fallback to localStorage
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed) && parsed.length > 0) {
            const cleaned = deduplicateBySlug(parsed)
            if (isMounted) setPages(cleaned)
            return
          }
        }
      } catch (e) {
        console.error('Error loading general pages from storage:', e)
      }

      // Default fallback
      if (isMounted) {
        const defaultCleaned = deduplicateBySlug(DEFAULT_GENERAL_PAGES)
        setPages(defaultCleaned)
      }
    }

    fetchPages()
    return () => {
      isMounted = false
    }
  }, [])

  // Keyboard shortcut Ctrl+S to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        if (formData && viewMode === 'editor') {
          const formEl = document.querySelector('form')
          if (formEl) formEl.requestSubmit()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [formData, viewMode])

  // Sync Visual Mode ContentEditable DOM cleanly with unescaped HTML
  useEffect(() => {
    if ((editorMode === 'visual' || editorMode === 'split') && visualEditorRef.current && formData) {
      const cleanContent = cleanAndUnescapeHtml(formData.content || '')
      if (visualEditorRef.current.innerHTML !== cleanContent) {
        visualEditorRef.current.innerHTML = cleanContent
      }
    }
  }, [editorMode, formData?.id])

  // Metrics calculation
  const getWordCount = (contentHtml?: string) => {
    if (!contentHtml) return 0
    const plainText = contentHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    return plainText ? plainText.split(' ').length : 0
  }

  const getReadingTime = (words: number) => {
    return Math.max(1, Math.ceil(words / 200))
  }

  const getSeoScore = (item: GeneralPageItem | null) => {
    if (!item) return 0
    let score = 0
    if (item.seoTitle && item.seoTitle.length >= 35 && item.seoTitle.length <= 65) score += 25
    else if (item.seoTitle) score += 15
    
    if (item.seoDescription && item.seoDescription.length >= 90 && item.seoDescription.length <= 165) score += 25
    else if (item.seoDescription) score += 15
    
    if (item.seoKeywords && item.seoKeywords.trim().length > 3) score += 25
    if (item.allowIndexing) score += 25
    return score
  }

  // Save Pages
  const savePagesToStorage = (updatedList: GeneralPageItem[]) => {
    setPages(updatedList)
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList))
    } catch (e) {
      console.error('Error saving general pages to storage:', e)
    }
  }

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message: msg, type })
    setTimeout(() => setNotification(null), 3000)
  }

  // Handle Title Change & Auto-Generate Slug
  const handleTitleChange = (newTitle: string) => {
    if (!formData) return
    const autoSlug = generateSlugFromTitle(newTitle)
    setFormData((prev) => (prev ? {
      ...prev,
      title: newTitle,
      slug: autoSlug || prev.slug,
      seoTitle: !prev.seoTitle || prev.seoTitle.startsWith(prev.title) || prev.seoTitle.includes('Silky Textiles')
        ? `${newTitle} | Silky Textiles UAE`
        : prev.seoTitle
    } : null))
  }

  // Handle Cover Image Upload from Local Device
  const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !formData) return

    if (file.size > 12 * 1024 * 1024) {
      showToast('Image file size must be under 12MB', 'error')
      return
    }

    const reader = new FileReader()
    reader.onload = (evt) => {
      const dataUrl = evt.target?.result as string
      if (dataUrl) {
        setFormData((prev) => (prev ? { ...prev, featuredImage: dataUrl } : null))
        showToast('Cover image uploaded successfully!')
      }
    }
    reader.readAsDataURL(file)
  }

  // Handle Body Image Upload from Local Device
  const handleBodyImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !formData) return

    const reader = new FileReader()
    reader.onload = (evt) => {
      const dataUrl = evt.target?.result as string
      if (dataUrl) {
        const snippet = `<img src="${dataUrl}" alt="${file.name}" class="rounded-xl my-4 w-full object-cover shadow-sm" />`
        if ((editorMode === 'visual' || editorMode === 'split') && visualEditorRef.current) {
          visualEditorRef.current.focus()
          document.execCommand('insertHTML', false, snippet)
          handleVisualInput()
        } else {
          setFormData((prev) => (prev ? { ...prev, content: prev.content + '\n' + snippet } : null))
        }
        showToast('Image inserted successfully!')
      }
    }
    reader.readAsDataURL(file)
  }

  // Open Editor for Creating Page
  const handleCreateNewPage = () => {
    const initialTitle = 'New Page'
    const newPage: GeneralPageItem = {
      id: `page-${Date.now()}`,
      title: initialTitle,
      subtitle: 'Short subtitle summary...',
      slug: generateSlugFromTitle(initialTitle),
      pageType: 'General Page',
      status: 'Published',
      isActive: true,
      featuredImage: '/images/textile_fabric_rolls.png',
      content: `<h2>Section Heading</h2>\n<p>Start typing your content here directly...</p>`,
      seoTitle: `${initialTitle} | Silky Textiles UAE`,
      seoDescription: 'Add a compelling meta description for search engines...',
      seoKeywords: 'silky textiles, uae',
      allowIndexing: true,
      author: 'Admin Editor',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    }
    setFormData(newPage)
    setEditorMode('visual')
    setViewMode('editor')
  }

  // Open Editor for Existing Page
  const handleEditPage = (page: GeneralPageItem) => {
    setFormData({
      ...page,
      content: cleanAndUnescapeHtml(page.content)
    })
    setEditorMode('visual')
    setViewMode('editor')
  }

  // Save Page Changes to Database
  const handleSaveEditor = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    if (!formData.title.trim()) {
      showToast('Page Title is required.', 'error')
      return
    }

    const cleanSlug = formData.slug.trim().toLowerCase().replace(/[^a-z0-9\/-]+/g, '-').replace(/^-+|-+$/g, '')
    if (!cleanSlug) {
      showToast('A valid slug is required.', 'error')
      return
    }

    const updatedItem: GeneralPageItem = {
      ...formData,
      slug: cleanSlug,
      content: visualEditorRef.current && (editorMode === 'visual' || editorMode === 'split') 
        ? visualEditorRef.current.innerHTML 
        : formData.content,
      updatedAt: new Date().toISOString().split('T')[0],
    }

    // 1. Optimistic state update & local backup
    let updatedList: GeneralPageItem[] = []
    const exists = pages.some((p) => p.id === updatedItem.id || p.slug === updatedItem.slug)
    if (exists) {
      updatedList = pages.map((p) => (p.id === updatedItem.id || p.slug === updatedItem.slug ? updatedItem : p))
    } else {
      updatedList = [updatedItem, ...pages]
    }

    savePagesToStorage(updatedList)

    // 2. Persist directly to MySQL Database API
    try {
      const res = await fetch('/api/general-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      })
      if (res.ok) {
        const saved = await res.json()
        if (saved && saved.id) {
          const finalSynced = updatedList.map((p) => (p.slug === updatedItem.slug ? { ...p, id: String(saved.id) } : p))
          savePagesToStorage(finalSynced)
        }
        showToast(`Page "${updatedItem.title}" saved successfully!`)
      } else {
        showToast('Failed to save page. Please try again.', 'error')
      }
    } catch (err) {
      console.error('Error saving page to database:', err)
      showToast('Failed to save page. Please check your connection.', 'error')
    }

    setViewMode('list')
  }

  // Handle Input in Visual ContentEditable Canvas
  const handleVisualInput = () => {
    if (visualEditorRef.current && formData) {
      const html = visualEditorRef.current.innerHTML
      setFormData((prev) => (prev ? { ...prev, content: html } : null))
    }
  }

  // Format HTML unescape
  const handleFormatCleanHtml = () => {
    if (visualEditorRef.current && formData) {
      const cleaned = cleanAndUnescapeHtml(visualEditorRef.current.innerHTML)
      visualEditorRef.current.innerHTML = cleaned
      setFormData((prev) => (prev ? { ...prev, content: cleaned } : null))
      showToast('Cleaned HTML formatting!')
    }
  }

  // Toggle Page Active & Publish Status (Synced with MySQL)
  const handleToggleActive = async (id: string) => {
    let newStatus = 'Published'
    let updatedTarget: GeneralPageItem | null = null
    const updated = pages.map((p) => {
      if (p.id === id) {
        newStatus = p.status === 'Published' ? 'Draft' : 'Published'
        updatedTarget = {
          ...p,
          status: newStatus as 'Published' | 'Draft',
          isActive: newStatus === 'Published',
          updatedAt: new Date().toISOString().split('T')[0],
        }
        return updatedTarget
      }
      return p
    })
    savePagesToStorage(updated)
    showToast(`Page status changed to ${newStatus}.`)

    if (updatedTarget) {
      try {
        await fetch('/api/general-pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTarget),
        })
      } catch (e) {
        console.error('Error syncing status toggle to database:', e)
      }
    }
  }

  // Delete Page (Synced with MySQL)
  const handleDeletePage = async (id: string) => {
    const target = pages.find((p) => p.id === id)
    if (!target) return
    if (confirm(`Are you sure you want to delete "${target.title || 'this page'}"?`)) {
      const updated = pages.filter((p) => p.id !== id)
      savePagesToStorage(updated)

      try {
        const res = await fetch(`/api/general-pages?id=${id}&slug=${target.slug}`, { method: 'DELETE' })
        if (res.ok) {
          showToast(`Page "${target.title}" deleted successfully.`)
        } else {
          showToast('Failed to delete page. Please try again.', 'error')
        }
      } catch (e) {
        console.error('Error deleting page from database:', e)
      }
    }
  }

  // Extended Rich Text Editor Insert Tools & WordPress Block Templates
  const handleInsertHtmlTag = (tagType: string) => {
    if (!formData) return

    if ((editorMode === 'visual' || editorMode === 'split') && visualEditorRef.current) {
      visualEditorRef.current.focus()
      let handled = false
      switch (tagType) {
        case 'bold':
          document.execCommand('bold', false)
          handled = true
          break
        case 'italic':
          document.execCommand('italic', false)
          handled = true
          break
        case 'underline':
          document.execCommand('underline', false)
          handled = true
          break
        case 'h1':
          document.execCommand('formatBlock', false, '<h1>')
          handled = true
          break
        case 'h2':
          document.execCommand('formatBlock', false, '<h2>')
          handled = true
          break
        case 'h3':
          document.execCommand('formatBlock', false, '<h3>')
          handled = true
          break
        case 'ul':
          document.execCommand('insertUnorderedList', false)
          handled = true
          break
        case 'ol':
          document.execCommand('insertOrderedList', false)
          handled = true
          break
      }

      if (handled) {
        handleVisualInput()
        return
      }
    }

    let snippet = ''
    switch (tagType) {
      case 'h2':
        snippet = '<h2>Section Heading</h2>'
        break
      case 'h3':
        snippet = '<h3>Subheading Title</h3>'
        break
      case 'bold':
        snippet = '<strong>Bold text</strong>'
        break
      case 'italic':
        snippet = '<em>Emphasized text</em>'
        break
      case 'underline':
        snippet = '<u>Underlined text</u>'
        break
      case 'highlight':
        snippet = '<mark class="bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-bold">Highlighted text</mark>'
        break
      case 'quote':
        snippet = '<blockquote class="border-l-4 border-[#DE7B3D] pl-4 py-2.5 my-4 bg-orange-50/60 rounded-r-xl font-medium italic">"Featured quote or corporate highlight."</blockquote>'
        break
      case 'callout':
        snippet = '<div class="p-4 my-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl font-semibold text-xs">💡 Note: Add key details or advice here.</div>'
        break
      case 'ul':
        snippet = '<ul class="list-disc pl-5 space-y-1 my-3"><li>Bullet point 1</li><li>Bullet point 2</li></ul>'
        break
      case 'ol':
        snippet = '<ol class="list-decimal pl-5 space-y-1 my-3"><li>Step 1</li><li>Step 2</li></ol>'
        break
      case 'table':
        snippet = '<table class="w-full my-4 border-collapse border border-slate-200 text-xs"><thead><tr class="bg-slate-100 font-bold"><th class="p-2 border">Item</th><th class="p-2 border">Specification</th></tr></thead><tbody><tr><td class="p-2 border">Fabric</td><td class="p-2 border">100% Cotton</td></tr></tbody></table>'
        break
      case 'button':
        snippet = '<div class="my-4"><a href="/contact-us" class="inline-block px-5 py-2.5 bg-[#DE7B3D] text-white rounded-xl font-bold text-xs hover:bg-[#c96a2e]">Request Quote ↗</a></div>'
        break
      case 'link':
        const linkHref = prompt('Link URL:', '/products/pure-cotton-shirts-supplier-in-uae')
        const linkText = prompt('Link Text:', 'View Product')
        if (linkHref && linkText) {
          snippet = `<a href="${linkHref}" class="text-[#DE7B3D] font-bold underline">${linkText}</a>`
        }
        break

      // WordPress-Style Pre-Built Visual Block Templates
      case 'block-cards':
        snippet = `
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
  <div class="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
    <div class="w-10 h-10 rounded-xl bg-orange-100 text-[#DE7B3D] flex items-center justify-center font-bold text-base">01</div>
    <h4 class="font-extrabold text-slate-900 text-base">Custom Corporate Tailoring</h4>
    <p class="text-xs text-slate-600 leading-relaxed">Engineered specifically for UAE executive fleets with wrinkle-resistant finish.</p>
  </div>
  <div class="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
    <div class="w-10 h-10 rounded-xl bg-orange-100 text-[#DE7B3D] flex items-center justify-center font-bold text-base">02</div>
    <h4 class="font-extrabold text-slate-900 text-base">Express 48h Fitting Service</h4>
    <p class="text-xs text-slate-600 leading-relaxed">Mobile master tailors visit your offices across Dubai and Abu Dhabi.</p>
  </div>
  <div class="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
    <div class="w-10 h-10 rounded-xl bg-orange-100 text-[#DE7B3D] flex items-center justify-center font-bold text-base">03</div>
    <h4 class="font-extrabold text-slate-900 text-base">Zero-Defect Guaranteed</h4>
    <p class="text-xs text-slate-600 leading-relaxed">ISO 9001 certified colorfastness, double-stitch seams, and breathable weave.</p>
  </div>
</div>`
        break

      case 'block-cta':
        snippet = `
<div class="my-8 p-8 bg-slate-950 text-white rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 not-prose">
  <div class="space-y-1">
    <h4 class="text-xl font-extrabold text-white">Need Customized Fabric Swatches in UAE?</h4>
    <p class="text-xs text-slate-400">Our corporate uniform specialists deliver physical fabric books directly to your office.</p>
  </div>
  <a href="/contact-us" class="px-6 py-3 bg-[#DE7B3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 hover:bg-[#c96a2e] transition-colors">Request Free Swatch Box ↗</a>
</div>`
        break

      case 'block-faq':
        snippet = `
<div class="space-y-4 my-8 not-prose">
  <div class="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
    <h4 class="font-bold text-slate-900 text-sm">What is the minimum bulk order quantity?</h4>
    <p class="text-xs text-slate-600 mt-2 leading-relaxed">Our standard minimum bulk order starts at 50 pcs for tailored garments, with scalable volume tiers for up to 5,000+ pcs fleets.</p>
  </div>
  <div class="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
    <h4 class="font-bold text-slate-900 text-sm">Do you offer on-site sizing and mobile tailoring in Dubai?</h4>
    <p class="text-xs text-slate-600 mt-2 leading-relaxed">Yes, our mobile tailors visit client headquarters across Dubai, Abu Dhabi, Sharjah, and the GCC with physical sample garments.</p>
  </div>
</div>`
        break

      case 'block-comparison':
        snippet = `
<div class="overflow-x-auto my-8 not-prose">
  <table class="w-full border-collapse border border-slate-200 text-xs rounded-2xl overflow-hidden shadow-xs">
    <thead>
      <tr class="bg-slate-100 text-slate-900 font-bold">
        <th class="p-3.5 border border-slate-200 text-left">Quality Metric</th>
        <th class="p-3.5 border border-slate-200 text-left">Standard Market Apparel</th>
        <th class="p-3.5 border border-slate-200 text-left text-[#DE7B3D]">Silky Textiles™ Guaranteed</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="p-3.5 border border-slate-200 font-semibold text-slate-900">Cotton Quality</td>
        <td class="p-3.5 border border-slate-200 text-slate-600">Standard Poly-Cotton</td>
        <td class="p-3.5 border border-slate-200 font-bold text-slate-900">100% Long-Staple Egyptian Cotton</td>
      </tr>
      <tr>
        <td class="p-3.5 border border-slate-200 font-semibold text-slate-900">Quality Inspection</td>
        <td class="p-3.5 border border-slate-200 text-slate-600">Random Sampling</td>
        <td class="p-3.5 border border-slate-200 font-bold text-slate-900">4-Step 100% Zero-Defect Testing</td>
      </tr>
      <tr>
        <td class="p-3.5 border border-slate-200 font-semibold text-slate-900">Doorstep Sizing</td>
        <td class="p-3.5 border border-slate-200 text-slate-600">Not Available</td>
        <td class="p-3.5 border border-slate-200 font-bold text-emerald-600">Included Across 7 Emirates</td>
      </tr>
    </tbody>
  </table>
</div>`
        break
    }

    if (snippet) {
      if ((editorMode === 'visual' || editorMode === 'split') && visualEditorRef.current) {
        visualEditorRef.current.focus()
        const sel = window.getSelection()
        if (sel && sel.rangeCount > 0 && visualEditorRef.current.contains(sel.getRangeAt(0).commonAncestorContainer)) {
          document.execCommand('insertHTML', false, snippet)
        } else {
          visualEditorRef.current.innerHTML += snippet
        }
        handleVisualInput()
      } else {
        setFormData({ ...formData, content: formData.content + '\n' + snippet })
      }
    }
  }

  // Filtered List
  const filteredPages = pages.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.seoKeywords.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'ALL' || p.pageType === filterType || p.status === filterType
    return matchesSearch && matchesFilter
  })

  const currentWords = getWordCount(formData?.content)
  const currentReadTime = getReadingTime(currentWords)
  const seoScore = getSeoScore(formData)

  return (
    <div className="w-full font-sans text-slate-900 pb-20">
      
      {/* HIDDEN FILE INPUTS */}
      <input
        type="file"
        ref={coverFileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleCoverFileUpload}
      />
      <input
        type="file"
        ref={bodyFileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleBodyImageUpload}
      />

      {/* TOAST NOTIFICATION */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 transition-all font-bold text-sm ${
            notification.type === 'success'
              ? 'bg-slate-900 text-emerald-400 border border-emerald-500/30'
              : 'bg-red-950 text-red-200 border border-red-500/30'
          }`}
        >
          {notification.type === 'success' ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-red-400" />}
          {notification.message}
        </div>
      )}

      {/* VIEW MODE 1: PAGES TABLE LIST */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          
          {/* HEADER HERO CARD */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#DE7B3D]/10 rounded-2xl border border-[#DE7B3D]/20 shrink-0">
                <FileText className="w-6 h-6 text-[#DE7B3D]" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  General Pages & Blogs
                </h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Manage static pages, blog posts & SEO tags.
                </p>
              </div>
            </div>

            <button
              onClick={handleCreateNewPage}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#DE7B3D] hover:bg-[#c96a2e] text-white rounded-xl font-bold text-xs tracking-wide transition-all shadow-sm cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Create Page / Blog</span>
            </button>
          </div>

          {/* SEARCH & FILTER BAR */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#DE7B3D]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar w-full md:w-auto">
              {['ALL', 'General Page', 'Blog Article', 'Published', 'Draft'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterType(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    filterType === tab
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE LIST */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-[34%]">Page Title & Type</th>
                  <th className="py-3.5 px-4 w-[26%]">URL Slug</th>
                  <th className="py-3.5 px-4 w-[16%]">Status</th>
                  <th className="py-3.5 px-4 w-[11%]">Updated</th>
                  <th className="py-3.5 px-4 w-[13%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredPages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 font-semibold">
                      No pages found.
                    </td>
                  </tr>
                ) : (
                  filteredPages.map((page) => (
                    <tr key={page.id} className="hover:bg-slate-50/90 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                            {page.pageType === 'Blog Article' ? (
                              <Newspaper className="w-4 h-4 text-indigo-600" />
                            ) : (
                              <FileText className="w-4 h-4 text-sky-600" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-slate-900 text-xs truncate">{page.title}</div>
                            <span className="text-[10px] font-bold text-slate-400">{page.pageType}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                        <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-bold truncate inline-block max-w-full">
                          /{page.slug}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleActive(page.id)}
                            className="cursor-pointer text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1.5"
                            title="Click to toggle Published / Draft"
                          >
                            {page.status === 'Published' ? (
                              <ToggleRight className="w-5 h-5 text-emerald-500" />
                            ) : (
                              <ToggleLeft className="w-5 h-5 text-amber-500" />
                            )}
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                                page.status === 'Published'
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300/60'
                                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300/60'
                              }`}
                            >
                              {page.status}
                            </span>
                          </button>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-xs text-slate-500 font-medium">{page.updatedAt}</td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleEditPage(page)}
                            className="px-2.5 py-1.5 bg-[#DE7B3D] hover:bg-[#c96a2e] text-white rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit
                          </button>

                          <a
                            href={`/${page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => handleDeletePage(page.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* VIEW MODE 2: CLEAN 3-SECTION UNCLUTTERED EDITOR */}
      {viewMode === 'editor' && formData && (
        <form onSubmit={handleSaveEditor} className="space-y-6 animate-in fade-in duration-200">
          
          {/* STICKY TOP HEADER BAR */}
          <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3.5 px-6 lg:px-8 -mx-6 lg:-mx-8 -mt-6 lg:-mt-8 mb-6 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-900 truncate max-w-xs">{formData.title || 'Untitled Page'}</span>
                
                <select
                  value={formData.status}
                  onChange={(e) => {
                    const newSt = e.target.value as 'Published' | 'Draft'
                    setFormData({ ...formData, status: newSt, isActive: newSt === 'Published' })
                  }}
                  className={`text-xs font-extrabold px-3 py-1 rounded-xl border cursor-pointer shadow-2xs ${
                    formData.status === 'Published'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}
                >
                  <option value="Published">🟢 Published</option>
                  <option value="Draft">🟡 Draft</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {formData.pageType === 'Blog Article' && (
                <span className="hidden md:inline-block text-xs font-semibold text-slate-500">
                  {currentWords} words • ~{currentReadTime}m read
                </span>
              )}

              <a
                href={`/${formData.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-500" /> Preview
              </a>

              <button
                type="submit"
                className="px-5 py-1.5 bg-[#DE7B3D] hover:bg-[#c96a2e] text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" /> Save
              </button>
            </div>
          </div>

          {/* MAIN CLEAN DOCUMENT BODY CONTAINER */}
          <div className="w-full space-y-6">
            
            {/* ============================================================ */}
            {/* SECTION 1: PAGE DETAILS & COVER BANNER */}
            {/* ============================================================ */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-[#DE7B3D]">
                  01. Page Details & Cover
                </span>
                <span className="text-xs font-bold text-slate-400 font-mono">/{formData.slug}</span>
              </div>

              {/* TITLE */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Page Title *
                </label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. About Us"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xl font-extrabold text-slate-900 focus:bg-white focus:outline-none focus:border-[#DE7B3D]"
                />
              </div>

              {/* SUBTITLE */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Subtitle / Summary
                </label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Enter short tagline summary..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:border-[#DE7B3D]"
                />
              </div>

              {/* TYPE & SLUG SUBSECTION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Page Type
                  </label>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    {(['General Page', 'Blog Article', 'Landing Page'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, pageType: type })}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          formData.pageType === type ? 'bg-[#DE7B3D] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {type === 'General Page' && 'Standard'}
                        {type === 'Blog Article' && 'Blog'}
                        {type === 'Landing Page' && 'Landing'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                      URL Slug Path
                    </label>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, slug: generateSlugFromTitle(formData.title) })}
                      className="text-[10px] font-bold text-[#DE7B3D] hover:underline flex items-center gap-1 cursor-pointer"
                      title="Sync slug with current title"
                    >
                      <RefreshCw className="w-3 h-3" /> Auto-Sync
                    </button>
                  </div>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-600">
                    <span className="text-slate-400 font-bold mr-1">/</span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="bg-transparent border-none outline-none w-full font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* COVER IMAGE SUBSECTION */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Cover Image Banner
                  </label>

                  {/* LOCAL DEVICE UPLOAD BUTTON */}
                  <button
                    type="button"
                    onClick={() => coverFileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-[#DE7B3D] hover:bg-[#c96a2e] text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                  </button>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-full sm:w-56 aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative group shrink-0 shadow-2xs">
                    <img
                      src={formData.featuredImage || '/images/textile_fabric_rolls.png'}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => coverFileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/40 text-white font-bold text-xs flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Upload className="w-4 h-4" /> Change Image
                    </button>
                  </div>

                  <div className="flex-1 w-full space-y-2.5">
                    <input
                      type="text"
                      value={formData.featuredImage || ''}
                      onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                      placeholder="Image URL or local upload data..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 outline-none focus:bg-white focus:border-[#DE7B3D]"
                    />

                    {/* PRESETS */}
                    <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pt-0.5">
                      <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0">Presets:</span>
                      {PRESET_COVER_IMAGES.map((preset) => (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => setFormData({ ...formData, featuredImage: preset.url })}
                          className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold cursor-pointer shrink-0 transition-all ${
                            formData.featuredImage === preset.url
                              ? 'bg-[#DE7B3D] text-white border-[#DE7B3D]'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* ============================================================ */}
            {/* SECTION 2: PAGE CONTENT & VISUAL WYSIWYG CANVAS */}
            {/* ============================================================ */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-[#DE7B3D]">
                  02. Content Editor Canvas
                </span>

                {/* VIEW MODE TOGGLE */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setEditorMode('visual')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      editorMode === 'visual' ? 'bg-white text-[#DE7B3D] shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    <EyeIcon className="w-3.5 h-3.5" /> Visual
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode('split')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      editorMode === 'split' ? 'bg-slate-900 text-amber-400 shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    <Split className="w-3.5 h-3.5" /> Split
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode('code')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      editorMode === 'code' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    <Code className="w-3.5 h-3.5" /> Code
                  </button>
                </div>
              </div>

              {/* MINIMAL FORMATTING TOOLBAR */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-200">
                
                {/* HEADINGS */}
                <div className="flex items-center gap-0.5 bg-white p-1 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleInsertHtmlTag('h2')}
                    className="px-2 py-1 hover:bg-orange-50 hover:text-[#DE7B3D] rounded text-xs font-bold cursor-pointer"
                    title="Insert H2 Heading"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertHtmlTag('h3')}
                    className="px-2 py-1 hover:bg-sky-50 hover:text-sky-600 rounded text-xs font-bold cursor-pointer"
                    title="Insert H3 Heading"
                  >
                    H3
                  </button>
                </div>

                {/* FORMATTING */}
                <div className="flex items-center gap-0.5 bg-white p-1 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleInsertHtmlTag('bold')}
                    className="p-1 hover:bg-slate-100 rounded text-slate-800 cursor-pointer"
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertHtmlTag('italic')}
                    className="p-1 hover:bg-slate-100 rounded text-slate-800 cursor-pointer"
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertHtmlTag('underline')}
                    className="p-1 hover:bg-slate-100 rounded text-slate-800 cursor-pointer"
                    title="Underline"
                  >
                    <Underline className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertHtmlTag('highlight')}
                    className="p-1 hover:bg-amber-50 text-amber-600 rounded cursor-pointer"
                    title="Highlight"
                  >
                    <Highlighter className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* LISTS & BLOCKS */}
                <div className="flex items-center gap-0.5 bg-white p-1 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleInsertHtmlTag('ul')}
                    className="p-1 hover:bg-slate-100 rounded text-slate-800 cursor-pointer"
                    title="Bullet List"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertHtmlTag('ol')}
                    className="p-1 hover:bg-slate-100 rounded text-slate-800 cursor-pointer"
                    title="Numbered List"
                  >
                    <ListOrdered className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertHtmlTag('quote')}
                    className="p-1 hover:bg-orange-50 text-[#DE7B3D] rounded cursor-pointer"
                    title="Quote"
                  >
                    <Quote className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertHtmlTag('callout')}
                    className="p-1 hover:bg-sky-50 text-sky-600 rounded cursor-pointer"
                    title="Callout Box"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* MEDIA & BUTTONS */}
                <div className="flex items-center gap-0.5 bg-white p-1 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => bodyFileInputRef.current?.click()}
                    className="px-2 py-1 hover:bg-emerald-50 text-emerald-700 rounded text-xs font-bold cursor-pointer flex items-center gap-1"
                    title="Upload Image into Content"
                  >
                    <Upload className="w-3.5 h-3.5 text-emerald-600" /> + Image
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertHtmlTag('table')}
                    className="p-1 hover:bg-slate-100 rounded text-slate-800 cursor-pointer"
                    title="Table"
                  >
                    <Table className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertHtmlTag('link')}
                    className="p-1 hover:bg-slate-100 rounded text-sky-600 cursor-pointer"
                    title="Link"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertHtmlTag('button')}
                    className="px-2 py-0.5 bg-[#DE7B3D] text-white rounded text-[10px] font-bold cursor-pointer"
                  >
                    + Button
                  </button>
                </div>

                {/* WORDPRESS BLOCK TEMPLATES */}
                <div className="flex items-center gap-1 bg-amber-50/80 p-1 rounded-lg border border-amber-200/80">
                  <span className="text-[10px] font-extrabold uppercase text-[#DE7B3D] px-1">Blocks:</span>
                  <button
                    type="button"
                    onClick={() => handleInsertHtmlTag('block-cards')}
                    className="px-2 py-0.5 bg-white hover:bg-orange-100 text-slate-800 rounded text-[10px] font-bold border border-slate-200 cursor-pointer"
                    title="Insert 3-Card Grid Block"
                  >
                    + 3 Cards
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertHtmlTag('block-cta')}
                    className="px-2 py-0.5 bg-white hover:bg-orange-100 text-slate-800 rounded text-[10px] font-bold border border-slate-200 cursor-pointer"
                    title="Insert CTA Banner Block"
                  >
                    + CTA Banner
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertHtmlTag('block-faq')}
                    className="px-2 py-0.5 bg-white hover:bg-orange-100 text-slate-800 rounded text-[10px] font-bold border border-slate-200 cursor-pointer"
                    title="Insert FAQ Q&A Block"
                  >
                    + FAQ
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertHtmlTag('block-comparison')}
                    className="px-2 py-0.5 bg-white hover:bg-orange-100 text-slate-800 rounded text-[10px] font-bold border border-slate-200 cursor-pointer"
                    title="Insert Comparison Table Block"
                  >
                    + Comparison
                  </button>
                </div>

                {/* UNESCAPE TOOL */}
                <button
                  type="button"
                  onClick={handleFormatCleanHtml}
                  className="ml-auto px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-[11px] font-bold cursor-pointer flex items-center gap-1"
                  title="Clean HTML formatting"
                >
                  <Wand2 className="w-3 h-3 text-purple-600" /> Clean HTML
                </button>
              </div>

              {/* VISUAL CANAL */}
              {editorMode === 'visual' && (
                <div
                  ref={visualEditorRef}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onInput={handleVisualInput}
                  onBlur={handleVisualInput}
                  className="w-full min-h-[460px] p-6 bg-white border border-slate-200 rounded-xl text-slate-900 leading-relaxed focus:outline-none focus:border-[#DE7B3D] shadow-2xs overflow-y-auto [&_h1]:text-2xl [&_h1]:font-black [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:my-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:my-2 [&_p]:my-2 [&_p]:text-slate-800 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-[#DE7B3D] [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:bg-orange-50/60 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_a]:text-[#DE7B3D] [&_a]:underline [&_img]:rounded-xl [&_img]:my-3 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:p-2 [&_th]:bg-slate-100 [&_td]:border [&_td]:p-2"
                />
              )}

              {/* SPLIT VIEW */}
              {editorMode === 'split' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div
                    ref={visualEditorRef}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onInput={handleVisualInput}
                    onBlur={handleVisualInput}
                    className="w-full min-h-[460px] p-4 bg-white border border-slate-200 rounded-xl text-slate-900 overflow-y-auto [&_h2]:text-xl [&_h2]:font-bold [&_p]:my-2 [&_blockquote]:border-l-4 [&_blockquote]:border-[#DE7B3D] [&_blockquote]:pl-4"
                  />
                  <textarea
                    rows={18}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-emerald-300 leading-relaxed focus:outline-none focus:border-[#DE7B3D]"
                  />
                </div>
              )}

              {/* CODE MODE */}
              {editorMode === 'code' && (
                <textarea
                  rows={20}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-emerald-300 leading-relaxed focus:outline-none focus:border-[#DE7B3D]"
                />
              )}

            </div>

            {/* ============================================================ */}
            {/* SECTION 3: SEO & SOCIAL META ENGINE */}
            {/* ============================================================ */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-[#DE7B3D]">
                  03. SEO & Social Meta
                </span>
                <span className="text-xs font-bold text-slate-600">SEO Score: {seoScore}/100</span>
              </div>

              {/* SEO TAGS */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold uppercase text-slate-600">SEO Meta Title</label>
                    <span className="text-[10px] font-mono text-slate-400">{formData.seoTitle.length}/60</span>
                  </div>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-[#DE7B3D]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold uppercase text-slate-600">SEO Meta Description</label>
                    <span className="text-[10px] font-mono text-slate-400">{formData.seoDescription.length}/160</span>
                  </div>
                  <textarea
                    rows={2}
                    value={formData.seoDescription}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-[#DE7B3D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Target Keywords</label>
                  <input
                    type="text"
                    value={formData.seoKeywords}
                    onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#DE7B3D]"
                  />
                </div>
              </div>

              {/* PREVIEWS & INDEXING */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                
                {/* GOOGLE SEARCH MOCK PREVIEW */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase text-slate-500">Google Search Preview</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setGooglePreviewDevice('desktop')}
                        className={`p-1 rounded text-xs ${googlePreviewDevice === 'desktop' ? 'bg-slate-900 text-white' : 'text-slate-400'}`}
                      >
                        <Monitor className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setGooglePreviewDevice('mobile')}
                        className={`p-1 rounded text-xs ${googlePreviewDevice === 'mobile' ? 'bg-slate-900 text-white' : 'text-slate-400'}`}
                      >
                        <Smartphone className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                    <div className="text-[10px] text-slate-500 truncate">https://silkytextiles.com › {formData.slug}</div>
                    <div className="text-xs text-blue-800 font-extrabold truncate">{formData.seoTitle || formData.title}</div>
                    <div className="text-[11px] text-slate-600 line-clamp-2">{formData.seoDescription}</div>
                  </div>
                </div>

                {/* SOCIAL OG CARD MOCK PREVIEW */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase text-slate-500">Social Open Graph Preview</span>
                    <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden border border-slate-200">
                    <div className="aspect-video bg-slate-100 h-20">
                      <img
                        src={formData.ogImage || formData.featuredImage || '/images/textile_fabric_rolls.png'}
                        alt="OG Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 bg-slate-50 space-y-0.5">
                      <div className="text-[9px] uppercase font-bold text-slate-400">SILKYTEXTILES.COM</div>
                      <div className="text-xs font-bold text-slate-900 truncate">{formData.seoTitle || formData.title}</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* INDEXING TOGGLE */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700">Allow Search Engine Indexing</span>
                <input
                  type="checkbox"
                  checked={formData.allowIndexing}
                  onChange={(e) => setFormData({ ...formData, allowIndexing: e.target.checked })}
                  className="w-4 h-4 text-[#DE7B3D] rounded border-slate-300 focus:ring-[#DE7B3D] cursor-pointer"
                />
              </div>

            </div>

          </div>

        </form>
      )}

    </div>
  )
}
