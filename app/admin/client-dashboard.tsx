'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Hero } from '@/components/hero'
import { BrandStory } from '@/components/brand-story'
import { CategoryShowcase } from '@/components/category-showcase'
import { UniformSolutions } from '@/components/uniform-solutions'
import { OurWork } from '@/components/our-work'
import { WhySilky } from '@/components/why-silky'
import { ProcessSection } from '@/components/process'
import { Testimonials } from '@/components/testimonials'
import { ContactBand } from '@/components/contact-band'
import { SiteHeader } from '@/components/site-header'
import { updateSlide, createSlide, deleteSlide, updateSiteConfig, updatePageSection, updateSectionOrder, saveProductPageSectionsAction, createProductPageAction, deleteProductPageAction } from './actions'
import { getProductPageBySlug } from '@/lib/laravel-api'
import { Plus, Trash2, Save, Layout, Settings, Image as ImageIcon, UploadCloud, Monitor, Menu, Search, Bell, HelpCircle, FileText, ShoppingBag, FolderTree, BookOpen, Briefcase, Activity, FolderOpen, Users as UsersIcon, ExternalLink, ChevronDown, ChevronLeft, ChevronRight, Check, ArrowUp, ArrowDown, Layers, Move, Sliders, LogOut, Lock, ShieldCheck, Eye, EyeOff, UserCheck, ArrowRight, ArrowLeft, Edit3, Filter, Copy, CopyCheck, Tag, Shirt, Columns, Smartphone, ZoomIn, ZoomOut, Maximize2, RotateCcw, GripVertical } from 'lucide-react'
import { CategoryShowcaseEditor, UniformSolutionsEditor, OurWorkEditor, WhySilkyEditor, ProcessEditor, TestimonialsEditor, ContactBandEditor, SpecsMatrixEditor, FaqEditor, FabricSwatchesEditor, QualityControlEditor, BulkPricingEditor, LogisticsEditor, ProductHeroEditor, CustomizationEditor } from './section-editors'
import { WordPressMenuManager } from './menu-manager'
import { UserManager, getUserList, UserItem } from './user-manager'
import { GeneralPagesCMS } from './general-pages-cms'
import { ProductSectionLiveRenderer } from '@/app/products/[slug]/product-page-client'

function DynamicSectionLiveRenderer({
  sectionType,
  data,
  isHomepage,
  slides = [],
}: {
  sectionType: string
  data: any
  isHomepage?: boolean
  slides?: any[]
}) {
  if (isHomepage) {
    switch (sectionType) {
      case 'HERO':
        return <Hero slides={slides} />
      case 'BRAND_STORY':
        return <BrandStory data={data} />
      case 'CATEGORY_SHOWCASE':
        return <CategoryShowcase data={data} />
      case 'UNIFORM_SOLUTIONS':
        return <UniformSolutions data={data} />
      case 'OUR_WORK':
        return <OurWork data={data} />
      case 'WHY_SILKY':
        return <WhySilky data={data} />
      case 'PROCESS':
        return <ProcessSection data={data} />
      case 'TESTIMONIALS':
        return <Testimonials data={data} />
      case 'CONTACT_BAND':
        return <ContactBand data={data} />
      default:
        break
    }
  }

  return <ProductSectionLiveRenderer sectionType={sectionType} data={data} />
}


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
  { 
    id: 102, 
    type: 'BRAND_STORY', 
    data: JSON.stringify({
      tagline: 'OUR HERITAGE & EXPERIENCE',
      title: 'More than six decades of tailoring expertise',
      quote: '“Master Tailoring has been satisfying the needs of customers since 1963. We believe in building personal relationships with customers and understanding their clothing needs to achieve the best outcome.”',
      description: 'From individual custom suiting to large-scale uniform supply for Dubai’s leading enterprises, Silky Textiles & Garments LLC continues to uphold strict quality control, premium fabric sourcing, and fast turnaround.',
      image: '/homepage-image/Homepage (31).png',
      imageCaption: 'Deira Master Tailoring Workshop, Dubai',
      establishedText: 'Established 1963 • Deira, Dubai'
    }), 
    isActive: true 
  },
  { 
    id: 103, 
    type: 'CATEGORY_SHOWCASE', 
    data: JSON.stringify({
      label: 'SECTOR SOLUTIONS',
      title: 'Tailored Apparel & Textile Collections',
      categories: [
        { id: 'corporate', title: 'Executive & Corporate Suiting', category: 'Corporate Identity', subtitle: 'Corporate Identity', description: 'Bespoke executive suits, blazers, dress shirts, and tailored corporate attire designed for boardrooms, luxury fleets, and financial institutions.', image: '/images/hero_luxury_uniforms.png', badge: 'Super 150s Wool', specs: ['Custom Monogramming', 'Made to Measure', '24h Express Fitting'] },
        { id: 'hospitality', title: 'Hospitality & 5-Star Hotel Wear', category: 'Luxury Hotels & Resorts', subtitle: 'Luxury Hotels & Resorts', description: 'Ergonomic chef coats, aprons, front-desk waistcoats, and housekeeping uniforms crafted for premier UAE hotels & fine dining.', image: '/images/category_hospitality.png', badge: 'Hot Sector', specs: ['Stain Resistant', 'Breathable Fabric'] },
        { id: 'healthcare', title: 'Healthcare & Clinical Wear', category: 'Medical & Wellness', subtitle: 'Medical & Wellness', description: 'Antimicrobial medical scrubs, lab coats, and clinic staff uniforms engineered for durability, comfort, and professional hygiene.', image: '/images/sector_healthcare.png', badge: 'Antimicrobial', specs: ['Fluid Repellent', 'ISO Certified'] },
        { id: 'textiles', title: 'Fine Textiles & In-House Embroidery', category: 'Bespoke Fabric Sourcing', subtitle: 'Bespoke Fabric Sourcing', description: 'Direct importer of Italian Super wool blends, 100% Egyptian cottons, linen blends, and 3D high-density brand logo embroidery.', image: '/images/hero_textile_sourcing.png', badge: 'Mill Direct', specs: ['100% Natural Fibers', 'Ready UAE Stock', 'Swatch Books Available'] }
      ]
    }), 
    isActive: true 
  },
  { 
    id: 104, 
    type: 'UNIFORM_SOLUTIONS', 
    data: JSON.stringify({
      label: 'INDUSTRIES & APPAREL CATEGORIES',
      title: 'Uniform Solutions & Fabric Supply',
      description: 'Silky Textiles manufactures and supplies bespoke commercial uniform collections for corporate enterprises, 5-star hotel fleets, medical centers, construction sites, and schools across the UAE.',
      uniforms: [
        { title: 'Corporate Executives', desc: 'Crisp white & sky blue formal shirts for boardrooms, banks, and DIFC firms.', image: '/homepage-image/Homepage (9).jpg', iconName: 'Briefcase' },
        { title: 'Luxury Hotel Front-Desk', desc: 'Elegant front-desk concierge and waiter shirts for 5-star Dubai resorts.', image: '/homepage-image/Homepage (11).jpg', iconName: 'Hotel' },
        { title: 'Medical Scrubs & Wellness', desc: 'Antimicrobial doctor coats, nursing scrubs, lab gowns, and surgical headwear for UAE clinics.', image: '/homepage-image/Homepage (8).jpg', iconName: 'Stethoscope' },
        { title: 'Construction & Safety Workwear', desc: 'High-visibility safety jackets, heavy-duty coveralls, flame-retardant vests, and site trousers.', image: '/homepage-image/Homepage (6).jpg', iconName: 'HardHat' }
      ],
      items: [
        { title: 'Corporate Executives', desc: 'Crisp white & sky blue formal shirts for boardrooms, banks, and DIFC firms.', image: '/homepage-image/Homepage (9).jpg', iconName: 'Briefcase' },
        { title: 'Luxury Hotel Front-Desk', desc: 'Elegant front-desk concierge and waiter shirts for 5-star Dubai resorts.', image: '/homepage-image/Homepage (11).jpg', iconName: 'Hotel' },
        { title: 'Medical Scrubs & Wellness', desc: 'Antimicrobial doctor coats, nursing scrubs, lab gowns, and surgical headwear for UAE clinics.', image: '/homepage-image/Homepage (8).jpg', iconName: 'Stethoscope' },
        { title: 'Construction & Safety Workwear', desc: 'High-visibility safety jackets, heavy-duty coveralls, flame-retardant vests, and site trousers.', image: '/homepage-image/Homepage (6).jpg', iconName: 'HardHat' }
      ]
    }), 
    isActive: true 
  },
  { 
    id: 105, 
    type: 'OUR_WORK', 
    data: JSON.stringify({
      label: 'PORTFOLIO & CASE STUDIES',
      title: 'Trusted By Leading UAE Enterprise Fleets',
      projects: [
        { client: 'Sharaf DG', title: 'Retail Staff Uniforms', category: 'Corporate Uniforms', image: '/homepage-image/Homepage.jpg', caption: 'Custom embroidered polo & trousers for Sharaf DG UAE outlets.' },
        { client: 'ENOC', title: 'Station & Service Attire', category: 'Workwear & Polos', image: '/homepage-image/Homepage (3).jpg', caption: 'Flame-retardant uniforms & high-visibility vests.' },
        { client: 'Coca-Cola', title: 'Promotional & Event Apparel', category: 'Screen Printing', image: '/homepage-image/Homepage (1).jpg', caption: '100% Cotton branded promotional T-shirts.' },
        { client: 'Medical Uniform Projects', title: 'Dubai Healthcare Facilities', category: 'Clinical Scrubs', image: '/homepage-image/Homepage (2).jpg', caption: 'Antimicrobial surgical gowns & hospital scrubs.' }
      ],
      images: [
        { client: 'Sharaf DG', title: 'Retail Staff Uniforms', category: 'Corporate Uniforms', image: '/homepage-image/Homepage.jpg', caption: 'Custom embroidered polo & trousers for Sharaf DG UAE outlets.' },
        { client: 'ENOC', title: 'Station & Service Attire', category: 'Workwear & Polos', image: '/homepage-image/Homepage (3).jpg', caption: 'Flame-retardant uniforms & high-visibility vests.' },
        { client: 'Coca-Cola', title: 'Promotional & Event Apparel', category: 'Screen Printing', image: '/homepage-image/Homepage (1).jpg', caption: '100% Cotton branded promotional T-shirts.' },
        { client: 'Medical Uniform Projects', title: 'Dubai Healthcare Facilities', category: 'Clinical Scrubs', image: '/homepage-image/Homepage (2).jpg', caption: 'Antimicrobial surgical gowns & hospital scrubs.' }
      ]
    }), 
    isActive: true 
  },
  { 
    id: 106, 
    type: 'WHY_SILKY', 
    data: JSON.stringify({
      label: 'THE SILKY DISTINCTION',
      title: 'Bespoke Tailoring Heritage & Industrial Scale',
      description: 'Since our founding in Dubai in 1963, Silky Textiles has combined old-world master tailoring precision with modern manufacturing capacity to supply uniforms and custom apparel for corporate fleets, luxury hospitality groups, and healthcare facilities.',
      image: '/images/craftsmanship_tailoring.png',
      points: [
        { title: 'Established in 1963', desc: 'Over six decades of master tailoring heritage in Dubai, specializing in custom suiting and enterprise textile supply.' },
        { title: '24-Hour Express Service', desc: 'Rapid express suiting and garment alterations for urgent corporate events, summits, and tight deadlines.' },
        { title: 'Bulk Uniform Production', desc: 'In-house embroidery and garment production facilities capable of delivering large corporate uniform orders across the UAE.' },
        { title: 'Deira Creek Showroom', desc: 'Visit our physical showroom on Baniyas Road in Deira Creek to view fabric swatches and meet our master tailors.' }
      ]
    }), 
    isActive: true 
  },
  { 
    id: 107, 
    type: 'PROCESS', 
    data: JSON.stringify({
      label: 'HOW WE WORK',
      title: 'Our Four-Step Tailoring & Order Process',
      btnText: 'Request Consultation',
      btnHref: '#contact',
      steps: [
        { step: '01', title: 'Consultation & Fabrics', desc: 'Fabric selection from Italian wools & Egyptian cottons, clear specification, and transparent quotation.' },
        { step: '02', title: 'Measurement & Design', desc: 'On-site measurement fitting by master tailors, pattern cutting, and sample approval.' },
        { step: '03', title: 'Production & Embroidery', desc: 'Precision cutting, expert hand-stitching, and high-density computer logo embroidery.' },
        { step: '04', title: 'Inspection & Delivery', desc: 'Quality control, steam pressing, and doorstep delivery across Dubai and all UAE Emirates.' }
      ]
    }), 
    isActive: true 
  },
  { 
    id: 108, 
    type: 'TESTIMONIALS', 
    data: JSON.stringify({
      label: 'CLIENT FEEDBACK',
      title: 'What Our B2B & Corporate Partners Say',
      testimonials: [
        { quote: "Silky Textiles supplied over 400 executive cotton shirts for our DIFC office staff. The fit and embroidery accuracy exceeded expectations.", author: "Tariq Al-Mansoor", role: "Corporate Operations Director", company: "DIFC Bank, Dubai", location: "Dubai, UAE", rating: 5 },
        { quote: "The breathability of their 100% Egyptian cotton shirts is unmatched for Dubai's climate. Our hotel front-desk team looks impeccably sharp every day.", author: "Elena Rostova", role: "Procurement Director", company: "Luxury Hospitality Group, Dubai", location: "Palm Jumeirah, Dubai", rating: 5 },
        { quote: "Fast turnarounds, excellent stitching, and personalized monogrammed cuffs. We order all our fleet uniforms directly from their Dubai atelier.", author: "Khalid Al-Hassani", role: "Safety & HSE Lead", company: "Construction & Engineering Firm, UAE", location: "Abu Dhabi, UAE", rating: 5 }
      ]
    }), 
    isActive: true 
  },
  { 
    id: 109, 
    type: 'CONTACT_BAND', 
    data: JSON.stringify({
      label: 'DUBAI SHOWROOM & ATELIER HEADQUARTERS',
      title: 'Elevate Your Corporate Identity Today',
      buildingName: 'Showroom No. 1, Al Zarooni Building',
      address: 'Next to HBL, Baniyas Road (D85), Deira Creek, Dubai, UAE',
      phone: '+971 4 355 8453',
      email: 'sales@silky.ae'
    }), 
    isActive: true 
  },
]

function ensureAllHomepageSections(existingSections: any[]) {
  if (!Array.isArray(existingSections) || existingSections.length === 0) {
    return DEFAULT_HOMEPAGE_SECTIONS
  }

  const existingMap = new Map<string, any>()
  existingSections.forEach(s => {
    if (s && s.type) existingMap.set(s.type, s)
  })

  return DEFAULT_HOMEPAGE_SECTIONS.map(def => {
    if (existingMap.has(def.type)) {
      const ex = existingMap.get(def.type)
      
      let parsedExData: any = {}
      try { parsedExData = JSON.parse(ex.data) } catch (e) {}

      let parsedDefData: any = {}
      try { parsedDefData = JSON.parse(def.data) } catch (e) {}

      const mergedData = { ...parsedDefData, ...parsedExData }

      // Deep merge arrays if missing or empty in ex
      if ((!mergedData.categories || mergedData.categories.length === 0) && parsedDefData.categories) {
        mergedData.categories = parsedDefData.categories
      }
      if ((!mergedData.uniforms || mergedData.uniforms.length === 0) && parsedDefData.uniforms) {
        mergedData.uniforms = parsedDefData.uniforms
      }
      if ((!mergedData.projects || mergedData.projects.length === 0) && parsedDefData.projects) {
        mergedData.projects = parsedDefData.projects
      }
      if ((!mergedData.points || mergedData.points.length === 0) && parsedDefData.points) {
        mergedData.points = parsedDefData.points
      }
      if ((!mergedData.steps || mergedData.steps.length === 0) && parsedDefData.steps) {
        mergedData.steps = parsedDefData.steps
      }
      if ((!mergedData.testimonials || mergedData.testimonials.length === 0) && parsedDefData.testimonials) {
        mergedData.testimonials = parsedDefData.testimonials
      }

      // IMPORTANT: preserve the real DB id (ex.id), not the hardcoded default id (def.id)
      return { ...def, ...ex, id: ex.id, data: JSON.stringify(mergedData) }
    }
    // No DB record for this type yet — return default but with no id so PHP creates it fresh
    return { ...def, id: def.id }
  })
}

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

const DEFAULT_PRODUCT_PAGES_FALLBACK = [
  {
    id: 1,
    slug: 'pure-cotton-shirts-supplier-in-uae',
    title: '100% Pure Cotton Shirts Supplier in UAE',
    category: 'Corporate Uniforms & Fine Shirting',
    heroImage: '/images/textile_fabric_rolls.png',
    status: 'Active',
    isPublished: true,
    sections: DEFAULT_PRODUCT_PAGE_SECTIONS,
  },
  {
    id: 2,
    slug: 'hospitality-uniforms-supplier-in-dubai',
    title: 'Luxury Hospitality & Hotel Uniforms Supplier in Dubai',
    category: 'Hospitality & Luxury',
    heroImage: '/images/hero_corporate_uniforms.png',
    status: 'Active',
    isPublished: true,
    sections: DEFAULT_PRODUCT_PAGE_SECTIONS,
  },
  {
    id: 3,
    slug: 'industrial-workwear-supplier-in-uae',
    title: 'Industrial Safety Workwear & Coveralls Supplier in UAE',
    category: 'Industrial & Safety',
    heroImage: '/images/tailor_measuring_fabric.png',
    status: 'Active',
    isPublished: true,
    sections: DEFAULT_PRODUCT_PAGE_SECTIONS,
  },
  {
    id: 4,
    slug: 'school-uniforms-manufacturer-in-uae',
    title: 'Custom School & Educational Uniforms Manufacturer in UAE',
    category: 'Education & Schools',
    heroImage: '/images/fabric_swatch_grid.png',
    status: 'Active',
    isPublished: true,
    sections: DEFAULT_PRODUCT_PAGE_SECTIONS,
  },
]

function ensureAll11ProductSections(existingSections: any[]) {
  if (!Array.isArray(existingSections) || existingSections.length === 0) {
    return DEFAULT_PRODUCT_PAGE_SECTIONS
  }

  const existingMap = new Map<string, any>()
  existingSections.forEach(s => {
    if (s && s.type) existingMap.set(s.type, s)
  })

  const merged = DEFAULT_PRODUCT_PAGE_SECTIONS.map(item => {
    if (existingMap.has(item.type)) {
      const ex = existingMap.get(item.type)
      return { ...ex, order: ex.order || item.order }
    }
    return { ...item }
  })

  return merged.sort((a, b) => (a.order || 0) - (b.order || 0))
}

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
    ensureAllHomepageSections(initialSections)
  )

  const startingProductPages = (initialProductPages && initialProductPages.length > 0)
    ? initialProductPages
    : DEFAULT_PRODUCT_PAGES_FALLBACK

  const initialProdPageSections = ensureAll11ProductSections(startingProductPages[0]?.sections || [])

  const [productPageSections, setProductPageSections] = useState<any[]>(initialProdPageSections)
  const [productPages, setProductPages] = useState<any[]>(() => {
    return [...startingProductPages].sort((a, b) => {
      if (a.slug === 'pure-cotton-shirts-supplier-in-uae') return -1
      if (b.slug === 'pure-cotton-shirts-supplier-in-uae') return 1
      return 0
    })
  })
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>(
    startingProductPages[0]?.slug || 'pure-cotton-shirts-supplier-in-uae'
  )

  // Fetch live product pages from PHP Laravel API on client mount
  useEffect(() => {
    async function fetchLiveProductPages() {
      try {
        const laravelUrl = (window as any).__NEXT_PUBLIC_LARAVEL_API_URL__ || `${window.location.origin}/api`
        const res = await fetch(`${laravelUrl}/product-pages`)
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            const sorted = [...data].sort((a, b) => {
              if (a.slug === 'pure-cotton-shirts-supplier-in-uae') return -1
              if (b.slug === 'pure-cotton-shirts-supplier-in-uae') return 1
              return 0
            })
            setProductPages(sorted)
          }
        }
      } catch (err) {
        console.warn('PHP API product-pages fetch error:', err)
      }
    }
    fetchLiveProductPages()
  }, [])

  // Fetch live slides + homepage sections from PHP Laravel API on client mount
  // This ensures we always have the real DB IDs — not the build-time Prisma IDs
  useEffect(() => {
    async function fetchLiveHomepageData() {
      try {
        const laravelUrl = (window as any).__NEXT_PUBLIC_LARAVEL_API_URL__ || `${window.location.origin}/api`

        // Fetch hero slides
        const slidesRes = await fetch(`${laravelUrl}/hero-slides`)
        if (slidesRes.ok) {
          const slidesData = await slidesRes.json()
          if (Array.isArray(slidesData) && slidesData.length > 0) {
            setSlides(slidesData.map(parseSlideData))
          }
        }

        // Fetch homepage page sections
        const sectionsRes = await fetch(`${laravelUrl}/page-sections`)
        if (sectionsRes.ok) {
          const sectionsData = await sectionsRes.json()
          if (Array.isArray(sectionsData) && sectionsData.length > 0) {
            setHomepageSections(ensureAllHomepageSections(sectionsData))
          }
        }

        // Fetch site config
        const configRes = await fetch(`${laravelUrl}/site-config`)
        if (configRes.ok) {
          const configData = await configRes.json()
          if (configData && configData.id) {
            setConfig(configData)
          }
        }
      } catch (err) {
        console.warn('PHP API homepage data fetch error:', err)
      }
    }
    fetchLiveHomepageData()
  }, [])

  const [productPageViewMode, setProductPageViewMode] = useState<'list' | 'editor'>('list')
  const [productPageSearchTerm, setProductPageSearchTerm] = useState('')
  const [productPageStatusFilter, setProductPageStatusFilter] = useState<'ALL' | 'Active' | 'Inactive'>('ALL')
  const [productPageCategoryFilter, setProductPageCategoryFilter] = useState<string>('ALL')
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  const [sectionPreviewMode, setSectionPreviewMode] = useState<'split' | 'form' | 'preview'>('split')
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [previewZoom, setPreviewZoom] = useState<'auto' | number>('auto')
  const previewContainerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const [draggedSectionIdx, setDraggedSectionIdx] = useState<number | null>(null)
  const [dragOverSectionIdx, setDragOverSectionIdx] = useState<number | null>(null)
  const sectionRailRef = useRef<HTMLDivElement>(null)

  const handleScrollSectionRail = (direction: 'left' | 'right') => {
    if (sectionRailRef.current) {
      const scrollAmount = 260
      sectionRailRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    if (!previewContainerRef.current) return
    const updateWidth = () => {
      if (previewContainerRef.current) {
        setContainerWidth(previewContainerRef.current.clientWidth)
      }
    }
    updateWidth()
    const observer = new ResizeObserver(updateWidth)
    observer.observe(previewContainerRef.current)
    return () => observer.disconnect()
  }, [sectionPreviewMode, previewDevice])

  const autoScalePercent = containerWidth > 32 
    ? Math.min(100, Math.max(25, Math.floor(((containerWidth - 32) / 1280) * 100))) 
    : 35
  const currentZoomPercent = previewZoom === 'auto' ? autoScalePercent : previewZoom


  type AdminTab = 'builder' | 'header' | 'product-pages' | 'general-pages' | 'menu-manager' | 'user-manager'

  const [activeTab, setActiveTab] = useState<AdminTab>('product-pages')

  useEffect(() => {
    try {
      const savedTab = localStorage.getItem('silky_admin_active_tab') as AdminTab | null
      if (savedTab && ['builder', 'header', 'product-pages', 'general-pages', 'menu-manager', 'user-manager'].includes(savedTab)) {
        setActiveTab(savedTab)
      }
    } catch (e) {
      console.error('Error loading active tab from storage:', e)
    }
  }, [])

  const switchTab = (tab: AdminTab) => {
    setActiveTab(tab)
    try {
      localStorage.setItem('silky_admin_active_tab', tab)
    } catch (e) {
      console.error('Error saving active tab to storage:', e)
    }
    if (tab === 'product-pages') {
      setProductPageViewMode('list')
      setSelectedSectionId(productPageSections[0]?.id || 201)
    } else if (tab === 'builder') {
      setSelectedSectionId(homepageSections[0]?.id || 101)
    }
  }

  const handleEditProductPage = (slug: string) => {
    setSelectedProductSlug(slug)
    setProductPageViewMode('editor')
  }

  const handleTogglePageStatus = (slug: string) => {
    setProductPages(prev => prev.map(p => {
      if (p.slug === slug) {
        const currentStatus = p.status || 'Active'
        const nextStatus = currentStatus === 'Inactive' ? 'Active' : 'Inactive'
        return { ...p, status: nextStatus }
      }
      return p
    }))
  }

  const handleCopyPageUrl = (slug: string) => {
    const fullUrl = `${window.location.origin}/products/${slug}`
    navigator.clipboard.writeText(fullUrl)
    setCopiedSlug(slug)
    showToast('Page URL copied to clipboard!')
    setTimeout(() => setCopiedSlug(null), 2500)
  }

  const handleDuplicateProductPage = async (pageToDuplicate: any) => {
    const newTitle = `${pageToDuplicate.title} (Copy)`
    const baseSlug = pageToDuplicate.slug.replace(/-copy(-\d+)?$/, '')
    const newSlug = `${baseSlug}-copy-${Date.now().toString().slice(-4)}`
    
    setIsSaving(true)
    try {
      const createdPage = await createProductPageAction({
        title: newTitle,
        slug: newSlug,
        category: pageToDuplicate.category || 'Corporate Uniforms & Shirting',
        heroImage: pageToDuplicate.heroImage || '/images/textile_fabric_rolls.png',
      })
      setProductPages(prev => [...prev.filter(p => p.slug !== createdPage.slug), createdPage])
      showToast(`Duplicated page: "${newTitle}"!`)
    } catch (err) {
      console.error(err)
      showToast('Failed to duplicate page', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  // Authentication & Logged In User State
  const [loggedInUser, setLoggedInUser] = useState<UserItem | null>(null)
  const [isAuthChecking, setIsAuthChecking] = useState(true)
  const [showUserDropdown, setShowUserDropdown] = useState(false)

  // Login Form State
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  React.useEffect(() => {
    try {
      const session = localStorage.getItem('silky_admin_user')
      if (session) {
        const parsed = JSON.parse(session)
        if (parsed && parsed.name) {
          setLoggedInUser(parsed)
        }
      }
    } catch (e) {}
    setIsAuthChecking(false)
  }, [])

  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setIsLoggingIn(true)

    const uInput = loginUsername.trim().toLowerCase()
    const enteredPassword = loginPassword.trim()

    try {
      let res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: uInput, password: enteredPassword })
      })

      if (res.status === 404) {
        res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: uInput, password: enteredPassword })
        })
      }

      if (res.ok) {
        const data = await res.json()
        if (data.success && data.user) {
          const sessionUser: UserItem = {
            id: data.user.id,
            name: data.user.name,
            username: data.user.username,
            email: data.user.email,
            role: data.user.role,
            status: data.user.status || 'Active',
            createdAt: data.user.createdAt || new Date().toISOString().split('T')[0]
          }
          localStorage.setItem('silky_admin_user', JSON.stringify(sessionUser))
          setLoggedInUser(sessionUser)
          setIsLoggingIn(false)
          return
        }
      } else {
        const errData = await res.json().catch(() => ({}))
        setLoginError(errData.error || 'Invalid credentials. Please try again.')
        setIsLoggingIn(false)
        return
      }
    } catch (err) {
      console.warn('API login request failed, checking offline fallback:', err)
    }

    // Offline fallback
    const users = getUserList()
    const foundUser = users.find(
      u => (
        (u.username && u.username.trim().toLowerCase() === uInput) ||
        (u.email && u.email.trim().toLowerCase() === uInput) ||
        (u.name && u.name.trim().toLowerCase() === uInput)
      ) && u.status === 'Active'
    )
    if (!foundUser) {
      setLoginError('Invalid credentials. Please try again.')
      setIsLoggingIn(false)
      return
    }
    const sessionUser: UserItem = {
      id: foundUser.id,
      name: foundUser.name,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
      status: foundUser.status,
      createdAt: foundUser.createdAt,
    }
    localStorage.setItem('silky_admin_user', JSON.stringify(sessionUser))
    setLoggedInUser(sessionUser)
    setIsLoggingIn(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('silky_admin_user')
    setLoggedInUser(null)
    setShowUserDropdown(false)
  }

  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(
    (activeTab === 'product-pages' ? productPageSections : homepageSections)[0]?.id || 201
  )
  const [selectedSlideId, setSelectedSlideId] = useState<number | null>(
    slides[0]?.id || null
  )

  // Create Product Page Modal State
  const [isCreatePageModalOpen, setIsCreatePageModalOpen] = useState(false)
  const [newPageTitle, setNewPageTitle] = useState('')
  const [newPageSlug, setNewPageSlug] = useState('')
  const [newPageCategory, setNewPageCategory] = useState('Corporate Uniforms & Shirting')
  const [newPageHeroImage, setNewPageHeroImage] = useState('/images/textile_fabric_rolls.png')

  // Auto-fetch sections when selectedProductSlug changes
  React.useEffect(() => {
    async function loadSelectedPageData() {
      if (!selectedProductSlug) return
      try {
        const data = await getProductPageBySlug(selectedProductSlug)
        if (data && data.sections && data.sections.length > 0) {
          const merged = ensureAll11ProductSections(data.sections)
          setProductPageSections(merged)
          setSelectedSectionId(merged[0]?.id || null)
          return
        }
      } catch (e) {}
      const target = productPages.find(p => p.slug === selectedProductSlug)
      if (target?.sections?.length > 0) {
        const merged = ensureAll11ProductSections(target.sections)
        setProductPageSections(merged)
        setSelectedSectionId(merged[0]?.id || null)
      } else {
        setProductPageSections(DEFAULT_PRODUCT_PAGE_SECTIONS)
        setSelectedSectionId(201)
      }
    }

    loadSelectedPageData()
  }, [selectedProductSlug])

  const handleTitleChange = (val: string) => {
    setNewPageTitle(val)
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    setNewPageSlug(generatedSlug)
  }

  const handleCreateProductPageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPageTitle.trim() || !newPageSlug.trim()) {
      showToast('Please fill in both Title and Slug', 'error')
      return
    }

    setIsSaving(true)
    try {
      const createdPage = await createProductPageAction({
        title: newPageTitle.trim(),
        slug: newPageSlug.trim(),
        category: newPageCategory,
        heroImage: newPageHeroImage,
      })

      setProductPages(prev => [...prev.filter(p => p.slug !== createdPage.slug), createdPage])
      setSelectedProductSlug(createdPage.slug)
      setIsCreatePageModalOpen(false)
      setNewPageTitle('')
      setNewPageSlug('')
      showToast(`Created product page "${createdPage.title}" successfully!`)
    } catch (err: any) {
      console.error(err)
      showToast('Error creating page. Ensure slug is unique.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteActiveProductPage = async () => {
    if (selectedProductSlug === 'pure-cotton-shirts-supplier-in-uae') {
      alert('The Master Template Product Page cannot be deleted.')
      return
    }

    if (!confirm(`Are you sure you want to delete the product page "${selectedProductSlug}"?`)) return

    setIsSaving(true)
    try {
      await deleteProductPageAction(selectedProductSlug)
      const remainingPages = productPages.filter(p => p.slug !== selectedProductSlug)
      setProductPages(remainingPages)
      setSelectedProductSlug('pure-cotton-shirts-supplier-in-uae')
      showToast('Product page deleted successfully.')
    } catch (err) {
      console.error(err)
      showToast('Error deleting page. Please try again.', 'error')
    } finally {
      setIsSaving(false)
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
  const newPageHeroFileInputRef = useRef<HTMLInputElement>(null)

  const handleNewPageHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
    setIsSaving(true)
    try {
      const url = await uploadFile(e.target.files[0])
      setNewPageHeroImage(url)
      showToast('Hero image uploaded successfully!')
    } catch (err) {
      alert('Upload failed')
    } finally {
      setIsSaving(false)
    }
  }

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const isHomepageBuilder = activeTab === 'builder'
  const currentSections = isHomepageBuilder ? homepageSections : productPageSections
  const setCurrentSections = isHomepageBuilder ? setHomepageSections : setProductPageSections

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
    const updateFn = isHomepageBuilder ? setHomepageSections : setProductPageSections
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
      order: currentSections.length + 1,
    }
    setCurrentSections((prev) => [...prev, newSec])
    setSelectedSectionId(newId)
    showToast(`Added ${getSectionLabel(type)} section to ${isHomepageBuilder ? 'homepage' : 'product page'}!`)
  }

  const handleDeleteProductSection = (id: number) => {
    if (!confirm(`Are you sure you want to delete this section from the ${isHomepageBuilder ? 'homepage' : 'product page'}?`)) return
    const remaining = currentSections.filter((s) => s.id !== id)
    setCurrentSections(remaining)
    if (selectedSectionId === id) {
      setSelectedSectionId(remaining[0]?.id || null)
    }
    showToast('Section removed successfully.')
  }

  const moveProductSectionToPosition = (fromIdx: number, targetPosition: number) => {
    const toIdx = targetPosition - 1
    if (toIdx < 0 || toIdx >= currentSections.length || fromIdx === toIdx) return
    const updated = [...currentSections]
    const [movedItem] = updated.splice(fromIdx, 1)
    updated.splice(toIdx, 0, movedItem)
    const reordered = updated.map((s, i) => ({ ...s, order: i + 1 }))
    setCurrentSections(reordered)
    showToast(`Moved ${getSectionLabel(movedItem.type)} to position #${targetPosition}!`)
  }

  const moveProductSection = (fromIdx: number, direction: 'up' | 'down') => {
    const targetPosition = direction === 'up' ? fromIdx : fromIdx + 2
    moveProductSectionToPosition(fromIdx, targetPosition)
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
        showToast('Product page published successfully!')
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
          await updatePageSection(sec.id, sec.type, sec.data || '{}', sec.isActive ?? true)
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

  const handleSaveMenuLinks = async (updatedNavLinks: any) => {
    setIsSaving(true)
    try {
      const navLinksStr = typeof updatedNavLinks === 'string' ? updatedNavLinks : JSON.stringify(updatedNavLinks)
      const updatedConfig = { ...config, navLinks: navLinksStr }
      setConfig(updatedConfig)
      await updateSiteConfig(updatedConfig)
      showToast('Menu structure saved successfully!')
    } catch (err) {
      console.error(err)
      showToast('Error saving menu layout. Please try again.', 'error')
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
      showToast('New slide created successfully!')
    } catch (err: any) {
      console.error('Create slide error:', err)
      showToast('Error creating slide. Please try again.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this slide?')) return
    setIsSaving(true)
    try {
      const res = await deleteSlide(id)
      if (res && res.success === false) {
        showToast('Error deleting slide. Please try again.', 'error')
        return
      }
      setSlides(prev => prev.filter(s => s.id !== id))
      if (selectedSlideId === id) {
        setSelectedSlideId(slides.length > 1 ? slides.find(s => s.id !== id)?.id || null : null)
      }
      showToast('Slide deleted successfully!')
    } catch (err) {
      console.error(err)
      showToast('Error deleting slide. Please try again.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('image', file)
    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const data = await res.json()
    if (data.success && (data.url || data.path)) return data.url || data.path
    if (data.url || data.path) return data.url || data.path
    throw new Error(data.error || 'Upload failed')
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
    if (direction === 'down' && index === homepageSections.length - 1) return
    
    const newSections = [...homepageSections]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    // Swap
    const temp = newSections[index]
    newSections[index] = newSections[targetIndex]
    newSections[targetIndex] = temp
    
    // Update orders
    const mapped = newSections.map((s, i) => ({ ...s, order: i + 1 }))
    setHomepageSections(mapped)
    
    // Save to DB instantly
    await updateSectionOrder(mapped.map(s => ({ id: s.id, order: s.order })))
    showToast('Order updated!')
  }

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#DE7B3D] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!loggedInUser) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4 sm:p-6 relative font-inter overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#DE7B3D]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#111827] border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
          
          {/* Brand Header with Silky Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img
                src={config?.logoUrl || '/silky-logo.png'}
                alt="Silky Textiles Logo"
                className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-md"
              />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Portal</h1>
            <p className="text-xs text-slate-400 mt-1 font-medium">Bespoke Tailoring & Enterprise Uniform Management</p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs font-semibold text-center animate-in fade-in duration-200">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Username or Email *</label>
              <div className="relative flex items-center">
                <UsersIcon className="w-5 h-5 text-[#DE7B3D] absolute left-4 pointer-events-none z-10" />
                <input
                  type="text"
                  required
                  placeholder="e.g. admin"
                  value={loginUsername}
                  onChange={e => setLoginUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#1E293B] border border-slate-700/80 rounded-xl text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#DE7B3D] focus:ring-2 focus:ring-[#DE7B3D]/30 transition-all shadow-inner"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Password *</label>
              <div className="relative flex items-center">
                <Lock className="w-5 h-5 text-[#DE7B3D] absolute left-4 pointer-events-none z-10" />
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-[#1E293B] border border-slate-700/80 rounded-xl text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#DE7B3D] focus:ring-2 focus:ring-[#DE7B3D]/30 transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer z-10"
                  title={showLoginPassword ? 'Hide password' : 'Show password'}
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#DE7B3D] to-amber-600 hover:from-[#c96a2e] hover:to-amber-700 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#DE7B3D]/25 flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {isLoggingIn ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Admin</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white/90" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-800/80 pt-4">
            <p className="text-[11px] font-medium text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DE7B3D]" />
              Silky Textiles & Garments LLC • Dubai, UAE
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-inter overflow-hidden text-[#1E293B]">
      
      {/* EXACT REFERENCE SIDEBAR */}
      {/* EXACT REFERENCE SIDEBAR */}
      <div className="w-[260px] bg-[#0B1120] text-gray-400 flex flex-col shrink-0 z-30 relative shadow-2xl h-screen overflow-hidden">
        
        {/* Brand */}
        <div className="px-5 py-5 flex flex-col gap-3.5 shrink-0 border-b border-white/5">
          <img
            src={config?.logoUrl || '/silky-logo.png'}
            alt="Silky Logo"
            className="h-10 sm:h-11 w-auto object-contain self-start"
          />
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 hide-scrollbar sidebar-scroll">
          <div className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 mt-1">Main Pages</div>
          
          <button 
            onClick={() => switchTab('user-manager')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'user-manager' 
                ? 'bg-[#DE7B3D] text-white shadow-lg shadow-[#DE7B3D]/30' 
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <UsersIcon className={`w-4 h-4 ${activeTab === 'user-manager' ? 'text-white' : 'text-slate-400'}`} /> User Management
          </button>

          <button 
            onClick={() => switchTab('header')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'header' 
                ? 'bg-[#DE7B3D] text-white shadow-lg shadow-[#DE7B3D]/30' 
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Monitor className={`w-4 h-4 ${activeTab === 'header' ? 'text-white' : 'text-slate-400'}`} /> Theme & Header
          </button>
          
          <button 
            onClick={() => switchTab('builder')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'builder' 
                ? 'bg-[#DE7B3D] text-white shadow-lg shadow-[#DE7B3D]/30' 
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Layout className={`w-4 h-4 ${activeTab === 'builder' ? 'text-white' : 'text-slate-400'}`} /> Homepage
          </button>

          <button 
            onClick={() => switchTab('product-pages')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'product-pages' 
                ? 'bg-[#DE7B3D] text-white shadow-lg shadow-[#DE7B3D]/30' 
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <ShoppingBag className={`w-4 h-4 ${activeTab === 'product-pages' ? 'text-white' : 'text-slate-400'}`} /> Product Pages CMS
          </button>

          <button 
            onClick={() => switchTab('general-pages')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'general-pages' 
                ? 'bg-[#DE7B3D] text-white shadow-lg shadow-[#DE7B3D]/30' 
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className={`w-4 h-4 ${activeTab === 'general-pages' ? 'text-white' : 'text-slate-400'}`} /> General Pages & Blogs
          </button>

          <button 
            onClick={() => switchTab('menu-manager')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'menu-manager' 
                ? 'bg-[#DE7B3D] text-white shadow-lg shadow-[#DE7B3D]/30' 
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sliders className={`w-4 h-4 ${activeTab === 'menu-manager' ? 'text-white' : 'text-slate-400'}`} /> Menu Manager
          </button>
        </div>
        
        {/* Quick Actions & User */}
        <div className="p-3.5 mt-auto space-y-3 shrink-0 border-t border-white/5">
           <div className="px-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Quick Actions</div>
           <a href="/" target="_blank" className="w-full flex items-center justify-between px-3.5 py-2.5 bg-[#1A233A] hover:bg-[#25304B] rounded-xl text-xs font-semibold text-white transition-colors border border-white/5">
             <div className="flex items-center gap-2">
               <Monitor className="w-4 h-4 text-gray-400" />
               <div className="flex flex-col text-left">
                  <span>View Website</span>
                  <span className="text-[10px] text-gray-400 font-normal">Visit your live site</span>
               </div>
             </div>
             <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
           </a>

           <div className="relative">
             <div 
               onClick={() => setShowUserDropdown(!showUserDropdown)}
               className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/5"
             >
                <div className="flex items-center gap-2.5">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#DE7B3D] to-amber-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md">
                     {(loggedInUser?.name || 'Admin').split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                   </div>
                   <div className="flex flex-col text-left overflow-hidden">
                      <span className="text-xs font-bold text-white leading-none truncate">{loggedInUser?.name || 'Admin'}</span>
                      <span className="text-[10px] text-amber-400 font-semibold mt-1 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> {loggedInUser?.role || 'Master Admin'}
                      </span>
                   </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
             </div>

             {showUserDropdown && (
               <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#162032] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                 <div className="px-3 py-2 border-b border-white/5 mb-1">
                   <p className="text-xs font-bold text-white">@{loggedInUser?.username || 'admin'}</p>
                   <p className="text-[11px] text-gray-400 truncate">{loggedInUser?.email || 'admin@silkytextiles.com'}</p>
                 </div>
                 <button
                   onClick={() => { switchTab('user-manager'); setShowUserDropdown(false); }}
                   className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
                 >
                   <UsersIcon className="w-4 h-4 text-[#DE7B3D]" /> User Settings
                 </button>
                 <button
                   onClick={handleLogout}
                   className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors mt-1 cursor-pointer"
                 >
                   <LogOut className="w-4 h-4" /> Sign Out
                 </button>
               </div>
             )}
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
             <span className="font-semibold text-gray-800 text-sm">
               {activeTab === 'general-pages'
                 ? 'General Pages & Blogs CMS'
                 : activeTab === 'menu-manager'
                 ? 'Header & Navigation Menu Manager'
                 : activeTab === 'product-pages'
                 ? 'Product Pages CMS'
                 : activeTab === 'header'
                 ? 'Theme & Header Settings'
                 : activeTab === 'user-manager'
                 ? 'User Management'
                 : 'Homepage Page Builder'}
             </span>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-700">{loggedInUser?.name || 'Admin'}</span>
             </div>

             <button
               onClick={handleLogout}
               className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition-all border border-red-200 cursor-pointer"
               title="Log out of admin panel"
             >
               <LogOut className="w-3.5 h-3.5" />
               <span>Log Out</span>
             </button>
          </div>
        </header>

        {/* SECTION EDITOR SUB-HEADER (FOR HOMEPAGE BUILDER & PRODUCT PAGES EDITOR) */}
        {(activeTab === 'builder' || (activeTab === 'product-pages' && productPageViewMode === 'editor')) && (
          <div className="bg-white border-b border-gray-200 z-10 shrink-0 shadow-xs">
            <div className="w-full px-6 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                {activeTab === 'product-pages' ? (
                  <>
                    <button
                      onClick={() => setProductPageViewMode('list')}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-extrabold transition-all border border-slate-200 cursor-pointer shadow-2xs"
                      title="Return to Product Pages Table List"
                    >
                      <ArrowLeft className="w-4 h-4 text-[#DE7B3D]" /> Back to Pages List
                    </button>

                    <span className="text-xs font-bold text-slate-300">|</span>

                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Editing Page:</span>
                    
                    {(() => {
                      const currentPage = productPages.find(p => p.slug === selectedProductSlug) || productPages[0]
                      const isMaster = selectedProductSlug === 'pure-cotton-shirts-supplier-in-uae'
                      return (
                        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 border border-slate-200/80 rounded-xl">
                          <span className="text-xs font-extrabold text-slate-900">
                            {currentPage?.title || 'Pure Cotton Shirts Supplier in UAE'}
                          </span>
                          {isMaster && (
                            <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 rounded-md border border-amber-200">
                              Master Template
                            </span>
                          )}
                        </div>
                      )
                    })()}

                    {selectedProductSlug !== 'pure-cotton-shirts-supplier-in-uae' && (
                      <button
                        onClick={handleDeleteActiveProductPage}
                        className="p-1.5 text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors"
                        title="Delete active product page"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Editing Page:</span>
                    <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 border border-slate-200/80 rounded-xl">
                      <span className="text-xs font-extrabold text-slate-900">Homepage</span>
                      <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-900 rounded-md border border-emerald-200">
                        Live Website
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* SECTION EDITOR PREVIEW MODE SEGMENTED TOGGLE */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setSectionPreviewMode('split')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                      sectionPreviewMode === 'split' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Split View: Form Editor + Live Section Preview"
                  >
                    <Columns className="w-3.5 h-3.5 text-[#DE7B3D]" />
                    <span>Split View</span>
                  </button>
                  <button
                    onClick={() => setSectionPreviewMode('form')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                      sectionPreviewMode === 'form' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Form Editor Only"
                  >
                    <Sliders className="w-3.5 h-3.5 text-slate-600" />
                    <span>Form Only</span>
                  </button>
                  <button
                    onClick={() => setSectionPreviewMode('preview')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                      sectionPreviewMode === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Live Section Preview Only"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Live Preview</span>
                  </button>
                </div>

                <a
                  href={activeTab === 'builder' ? '/' : `/products/${selectedProductSlug}`}
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

            {/* SECTION NAVIGATOR & ACTION CONTROLS */}
            <div className="px-6 py-2.5 bg-slate-50/70 border-t border-gray-200/80 flex items-center gap-4 w-full">
              {/* DEDICATED SECTION PILLS RAIL CONTAINER (INDEPENDENT SMOOTH HORIZONTAL SCROLL WITH ARROWS) */}
              <div className="flex-1 min-w-0 bg-white border border-slate-200/90 rounded-2xl p-1.5 shadow-2xs flex items-center gap-1.5 overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleScrollSectionRail('left')}
                  className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all shrink-0 cursor-pointer border border-slate-200/80 shadow-2xs hover:shadow-xs active:scale-95"
                  title="Scroll Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div
                  ref={sectionRailRef}
                  className="flex-1 min-w-0 flex items-center gap-2 overflow-x-auto hide-scrollbar scroll-smooth px-1 py-0.5"
                >
                  {sections.map((s, idx) => {
                    const isSelected = selectedSectionId === s.id
                    const isDragging = draggedSectionIdx === idx
                    const isDragOver = dragOverSectionIdx === idx && draggedSectionIdx !== idx

                    return (
                      <div
                        key={s.id}
                        draggable
                        onDragStart={(e) => {
                          setDraggedSectionIdx(idx)
                          e.dataTransfer.effectAllowed = 'move'
                          e.dataTransfer.setData('text/plain', idx.toString())
                        }}
                        onDragOver={(e) => {
                          e.preventDefault()
                          e.dataTransfer.dropEffect = 'move'
                          if (dragOverSectionIdx !== idx) {
                            setDragOverSectionIdx(idx)
                          }
                        }}
                        onDragLeave={() => {
                          if (dragOverSectionIdx === idx) {
                            setDragOverSectionIdx(null)
                          }
                        }}
                        onDrop={(e) => {
                          e.preventDefault()
                          if (draggedSectionIdx !== null && draggedSectionIdx !== idx) {
                            moveProductSectionToPosition(draggedSectionIdx, idx + 1)
                          }
                          setDraggedSectionIdx(null)
                          setDragOverSectionIdx(null)
                        }}
                        onDragEnd={() => {
                          setDraggedSectionIdx(null)
                          setDragOverSectionIdx(null)
                        }}
                        onClick={() => setSelectedSectionId(s.id)}
                        className={`whitespace-nowrap px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider transition-all rounded-xl border flex items-center gap-2 cursor-grab active:cursor-grabbing select-none shrink-0 group ${
                          isSelected
                            ? 'bg-[#DE7B3D] text-white border-[#DE7B3D] shadow-sm shadow-[#DE7B3D]/25'
                            : 'bg-slate-50/70 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-white'
                        } ${
                          isDragging ? 'opacity-40 scale-95 border-dashed border-[#DE7B3D]' : ''
                        } ${
                          isDragOver ? 'ring-2 ring-[#DE7B3D] ring-offset-1 bg-[#DE7B3D]/10 border-[#DE7B3D]' : ''
                        }`}
                        title="Click to edit section, or drag to reorder"
                      >
                        <GripVertical className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white/70' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-white border border-slate-200 text-slate-600'
                        }`}>
                          #{idx + 1}
                        </span>
                        <span>{getSectionLabel(s.type)}</span>
                      </div>
                    )
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => handleScrollSectionRail('right')}
                  className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all shrink-0 cursor-pointer border border-slate-200/80 shadow-2xs hover:shadow-xs active:scale-95"
                  title="Scroll Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* DEDICATED SEPARATE CONTAINER: ADD NEW SECTION & DELETE ACTIONS */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-1.5 shadow-2xs flex items-center gap-2 shrink-0">
                <div className="relative">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleAddProductSection(e.target.value)
                        e.target.value = ''
                      }
                    }}
                    defaultValue=""
                    className="appearance-none pl-3.5 pr-8 py-2 text-xs font-bold text-[#DE7B3D] bg-orange-50/70 hover:bg-orange-100/60 border border-orange-200/90 rounded-xl focus:outline-none cursor-pointer transition-colors"
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
                  <ChevronDown className="w-3.5 h-3.5 text-[#DE7B3D] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {selectedSectionId && (
                  <button
                    onClick={() => handleDeleteProductSection(selectedSectionId)}
                    className="p-2 text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors shrink-0 cursor-pointer"
                    title="Remove selected section from page"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}



        <div className="flex-1 overflow-y-auto w-full min-w-0 p-6 lg:p-8 pb-32">
          
          {activeTab !== 'user-manager' && activeTab !== 'general-pages' && activeTab !== 'menu-manager' && !(activeTab === 'product-pages' && productPageViewMode === 'list') && (
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-[28px] font-bold text-[#1E293B] tracking-tight">
                  {activeTab === 'header' ? 'Theme & Settings' : activeTab === 'menu-manager' ? 'Menu Manager' : (activeSection ? `${getSectionLabel(activeSection.type)} Editor` : 'Page Builder')}
                </h1>
                <p className="text-gray-500 mt-1 text-sm">
                  {activeTab === 'header' ? 'Manage your global site configuration.' : activeTab === 'menu-manager' ? 'Manage navigation tabs, sub-columns, links & spotlight image cards.' : 'Modify content, layout, and position of this section.'}
                </p>
              </div>

              {/* SECTION REORDER CONTROLS */}
              {(activeTab === 'builder' || (activeTab === 'product-pages' && productPageViewMode === 'editor')) && activeSection && (
                <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-sm">
                  <Layers className="w-4 h-4 text-[#DE7B3D]" />
                  <span className="text-xs font-bold text-slate-700">Section Position:</span>
                  <select
                    value={sections.findIndex(s => s.id === selectedSectionId) + 1}
                    onChange={(e) => moveProductSectionToPosition(
                      sections.findIndex(s => s.id === selectedSectionId),
                      parseInt(e.target.value)
                    )}
                    className="px-3 py-1.5 text-xs font-extrabold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none cursor-pointer"
                  >
                    {sections.map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Position #{i + 1} {i === 0 ? '(Top of Page)' : (i === sections.length - 1 ? '(Bottom of Page)' : '')}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
                    <button
                      onClick={() => moveProductSection(sections.findIndex(s => s.id === selectedSectionId), 'up')}
                      disabled={sections.findIndex(s => s.id === selectedSectionId) === 0}
                      className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 rounded-xl transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
                      title="Move 1 position up (earlier on page)"
                    >
                      <ArrowUp className="w-4 h-4" /> Move Up
                    </button>
                    <button
                      onClick={() => moveProductSection(sections.findIndex(s => s.id === selectedSectionId), 'down')}
                      disabled={sections.findIndex(s => s.id === selectedSectionId) === sections.length - 1}
                      className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 rounded-xl transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
                      title="Move 1 position down (later on page)"
                    >
                      <ArrowDown className="w-4 h-4" /> Move Down
                    </button>
                  </div>
                </div>
              )}

              {/* The Add Slide Button goes here in the header for Hero */}
              {activeTab === 'builder' && activeSection?.type === 'HERO' && (
                <button onClick={handleCreateSlide} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-white text-gray-700 hover:bg-gray-50 transition-all border border-gray-200 shadow-sm">
                  <Plus className="w-4 h-4 text-gray-500" /> Add New Slide
                </button>
              )}
            </div>
          )}

          {/* PRODUCT PAGES TABULATED LIST VIEW */}
          {activeTab === 'product-pages' && productPageViewMode === 'list' && (
            <div className="space-y-6 animate-in fade-in duration-300 pb-16">
              {/* TOP PROFESSIONAL CMS HEADER CARD */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Product Pages Catalog</h1>
                  <p className="text-slate-500 text-sm mt-0.5">
                    Manage, organize, and edit live landing pages across product categories.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setIsCreatePageModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#DE7B3D] hover:bg-[#c96a2e] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" /> Create New Page
                  </button>
                </div>
              </div>

              {/* EXECUTIVE METRIC CARDS (KPI BOXES) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Total Pages */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <FileText className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">Total Pages</span>
                    <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{productPages.length}</span>
                  </div>
                </div>

                {/* Published / Active */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600/80 block">Active & Live</span>
                    <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      {productPages.filter(p => (p.status || 'Active') === 'Active').length}
                    </span>
                  </div>
                </div>

                {/* Inactive / Drafts */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                    <EyeOff className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">Drafts</span>
                    <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      {productPages.filter(p => p.status === 'Inactive').length}
                    </span>
                  </div>
                </div>

                {/* Total Categories */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#DE7B3D] shrink-0">
                    <Tag className="w-5 h-5 text-[#DE7B3D]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">Categories</span>
                    <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      {Array.from(new Set(productPages.map(p => p.category || 'Corporate Shirting'))).length}
                    </span>
                  </div>
                </div>
              </div>

              {/* SEARCH & FILTERS CONTROLS BAR */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={productPageSearchTerm}
                    onChange={(e) => setProductPageSearchTerm(e.target.value)}
                    placeholder="Search by page title..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#DE7B3D] transition-all"
                  />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
                  {/* CATEGORY FILTER */}
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#DE7B3D]" />
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Category:</span>
                    <select
                      value={productPageCategoryFilter}
                      onChange={(e) => setProductPageCategoryFilter(e.target.value)}
                      className="text-xs font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
                    >
                      <option value="ALL">All Categories</option>
                      {Array.from(new Set(productPages.map(p => p.category || (p.slug === 'pure-cotton-shirts-supplier-in-uae' ? 'Master Blueprint' : 'Custom Product')))).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* STATUS FILTER */}
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Status:</span>
                    <select
                      value={productPageStatusFilter}
                      onChange={(e) => setProductPageStatusFilter(e.target.value as any)}
                      className="text-xs font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {(productPageSearchTerm || productPageCategoryFilter !== 'ALL' || productPageStatusFilter !== 'ALL') && (
                    <button
                      onClick={() => {
                        setProductPageSearchTerm('')
                        setProductPageCategoryFilter('ALL')
                        setProductPageStatusFilter('ALL')
                      }}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 underline px-2 cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>

              {/* TABULATED LIST OF PRODUCT PAGES */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                        <th className="py-3.5 px-6">Page Title</th>
                        <th className="py-3.5 px-6 text-center">Status</th>
                        <th className="py-3.5 px-6 text-center">Sections</th>
                        <th className="py-3.5 px-6 text-center">Category</th>
                        <th className="py-3.5 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-medium">
                      {productPages
                        .filter(p => {
                          const matchesSearch = p.title.toLowerCase().includes(productPageSearchTerm.toLowerCase()) || p.slug.toLowerCase().includes(productPageSearchTerm.toLowerCase())
                          const status = p.status || 'Active'
                          const matchesStatus = productPageStatusFilter === 'ALL' || status === productPageStatusFilter
                          const categoryName = p.category || (p.slug === 'pure-cotton-shirts-supplier-in-uae' ? 'Master Blueprint' : 'Custom Product')
                          const matchesCategory = productPageCategoryFilter === 'ALL' || categoryName === productPageCategoryFilter
                          return matchesSearch && matchesStatus && matchesCategory
                        })
                        .sort((a, b) => {
                          const aIsMaster = a.slug === 'pure-cotton-shirts-supplier-in-uae'
                          const bIsMaster = b.slug === 'pure-cotton-shirts-supplier-in-uae'
                          if (aIsMaster && !bIsMaster) return -1
                          if (!aIsMaster && bIsMaster) return 1
                          return 0
                        })
                        .map((p) => {
                          const isMaster = p.slug === 'pure-cotton-shirts-supplier-in-uae'
                          const status = p.status || 'Active'
                          const isActive = status === 'Active'
                          const sectionCount = p.sections?.length || 11
                          const categoryName = isMaster ? 'Master Blueprint' : (p.category || 'Corporate Shirting')

                          return (
                            <tr key={p.id || p.slug} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                              {/* PAGE DETAILS */}
                              <td className="py-4 px-6" onClick={() => handleEditProductPage(p.slug)}>
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#DE7B3D] font-extrabold text-sm shrink-0 overflow-hidden">
                                    {p.heroImage ? (
                                      <img src={p.heroImage} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                      p.title.charAt(0)
                                    )}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="font-bold text-slate-900 text-sm group-hover:text-[#DE7B3D] transition-colors">
                                        {p.title}
                                      </span>
                                      {isMaster && (
                                        <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 rounded-md border border-amber-200">
                                          Master Template
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* STATUS */}
                              <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={() => handleTogglePageStatus(p.slug)}
                                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                                    isActive
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                      : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                                  }`}
                                  title="Click to toggle Active (Live) / Inactive (Draft)"
                                >
                                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                                  {isActive ? 'Active' : 'Draft'}
                                </button>
                              </td>

                              {/* SECTIONS */}
                              <td className="py-4 px-6 text-center" onClick={() => handleEditProductPage(p.slug)}>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs">
                                  <Layers className="w-3.5 h-3.5 text-[#DE7B3D]" /> {sectionCount} Sections
                                </span>
                              </td>

                              {/* CATEGORY */}
                              <td className="py-4 px-6 text-center" onClick={() => handleEditProductPage(p.slug)}>
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                                  isMaster 
                                    ? 'bg-amber-50 text-amber-900 border-amber-200' 
                                    : categoryName.includes('T-Shirt')
                                    ? 'bg-purple-50 text-purple-800 border-purple-200'
                                    : categoryName.includes('Workwear') || categoryName.includes('Industrial')
                                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                                    : 'bg-slate-100 text-slate-700 border-slate-200'
                                }`}>
                                  {categoryName}
                                </span>
                              </td>

                              {/* ACTIONS - PERFECTLY ALIGNED COLUMNS */}
                              <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => handleEditProductPage(p.slug)}
                                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#DE7B3D] hover:bg-[#c96a2e] text-white rounded-xl text-xs font-extrabold shadow-2xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" /> Edit Page
                                  </button>

                                  <a
                                    href={`/products/${p.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200 shrink-0"
                                    title="View Live Page"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>

                                  {!isMaster ? (
                                    <button
                                      onClick={() => {
                                        setSelectedProductSlug(p.slug)
                                        handleDeleteActiveProductPage()
                                      }}
                                      className="p-2 text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors border border-red-200 cursor-pointer shrink-0"
                                      title="Delete page"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  ) : (
                                    <div className="w-[34px] h-[34px] shrink-0" />
                                  )}
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* BUILDER / PRODUCT PAGES EDITOR AREA */}
          {activeTab === 'builder' || (activeTab === 'product-pages' && productPageViewMode === 'editor') ? (
            activeSection ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* HOMEPAGE HERO SLIDES CAROUSEL EDITOR (for Homepage Builder) */}
                {activeTab === 'builder' && activeSection.type === 'HERO' && (
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

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                                  <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Primary Button Text</label>
                                    <input
                                      type="text"
                                      value={activeSlide.primaryBtnText || ''}
                                      onChange={(e) => handleSlideChange('primaryBtnText', e.target.value)}
                                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white outline-none font-semibold"
                                      placeholder="Request Quote"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Primary Button Link / Action</label>
                                    <input
                                      type="text"
                                      value={activeSlide.primaryBtnHref || ''}
                                      onChange={(e) => handleSlideChange('primaryBtnHref', e.target.value)}
                                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white outline-none"
                                      placeholder="e.g. #contact or leave blank for Modal"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Secondary Button Text</label>
                                    <input
                                      type="text"
                                      value={activeSlide.secondaryBtnText || ''}
                                      onChange={(e) => handleSlideChange('secondaryBtnText', e.target.value)}
                                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white outline-none font-semibold"
                                      placeholder="Learn More"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Secondary Button Link / URL</label>
                                    <input
                                      type="text"
                                      value={activeSlide.secondaryBtnHref || ''}
                                      onChange={(e) => handleSlideChange('secondaryBtnHref', e.target.value)}
                                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white outline-none"
                                      placeholder="e.g. #services or /products"
                                    />
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

                  {/* DYNAMIC SECTION EDITOR & LIVE PREVIEW CONTAINER */}
                  <div className={
                    sectionPreviewMode === 'split' 
                      ? 'grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 items-start' 
                      : 'w-full'
                  }>

                  {/* FORM EDITOR COLUMN (60-65% width in Split View for clutter-free editing) */}
                  <div className={
                    sectionPreviewMode === 'split' 
                      ? 'xl:col-span-7 2xl:col-span-8 space-y-6' 
                      : sectionPreviewMode === 'form' 
                      ? 'w-full space-y-6' 
                      : 'hidden'
                  }>
                {/* HERO EDITOR */}
                {activeSection.type === 'HERO' && (
                  activeTab === 'builder' ? (
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
                        <div className="flex items-center justify-between gap-4 flex-wrap border-b border-gray-100 pb-4">
                          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-[#DE7B3D]" />
                            <span>Homepage Hero Slides ({slides.length})</span>
                          </h3>
                          <button
                            type="button"
                            onClick={handleCreateSlide}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#DE7B3D]/10 text-[#DE7B3D] hover:bg-[#DE7B3D]/20 border border-[#DE7B3D]/30 transition-all cursor-pointer shadow-2xs"
                          >
                            <Plus className="w-4 h-4" /> Add Slide
                          </button>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap pt-2">
                          {slides.map((s, idx) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => setSelectedSlideId(s.id)}
                              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border cursor-pointer ${
                                selectedSlideId === s.id 
                                  ? 'bg-[#DE7B3D] text-white border-[#DE7B3D] shadow-xs' 
                                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                              }`}
                            >
                              Slide #{idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>

                      {activeSlide && (
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
                          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <h4 className="font-bold text-slate-800 text-sm">Editing Slide Details</h4>
                            <button 
                              type="button"
                              onClick={() => handleDelete(activeSlide.id)}
                              className="text-red-500 hover:text-red-700 flex items-center gap-1.5 text-xs font-bold bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg border border-red-200 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete Slide
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Slide Image</label>
                              <div className="flex items-center gap-4">
                                <div className="w-36 h-24 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0 relative group">
                                  {activeSlide.image ? <img src={activeSlide.image} alt="Slide" className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-slate-300 mx-auto my-7" />}
                                </div>
                                <div className="space-y-2">
                                  <label className="cursor-pointer bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-2 border border-slate-800 transition-all shadow-xs">
                                    <UploadCloud className="w-3.5 h-3.5 text-[#DE7B3D]" /> Upload Slide Image
                                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleSlideImageUpload} accept="image/*" />
                                  </label>
                                  <p className="text-[11px] text-slate-400 font-medium">Recommended size: 1920 x 1080px (PNG, JPG, WebP)</p>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                              <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Eyebrow / Tagline</label>
                                <input type="text" value={activeSlide.tagline || ''} onChange={(e) => handleSlideChange('tagline', e.target.value)} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-bold" placeholder="e.g. 100% EGYPTIAN COTTON" />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Headline</label>
                                <input type="text" value={activeSlide.title || ''} onChange={(e) => handleSlideChange('title', e.target.value)} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-bold text-slate-900" placeholder="e.g. Pure Cotton Shirts Supplier in UAE" />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Description / Subtitle</label>
                              <textarea value={activeSlide.description || ''} onChange={(e) => handleSlideChange('description', e.target.value)} rows={3} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white leading-relaxed" placeholder="Enter slide description..." />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                              <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Primary Button Text</label>
                                <input type="text" value={activeSlide.primaryBtnText || ''} onChange={(e) => handleSlideChange('primaryBtnText', e.target.value)} className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-bold" placeholder="e.g. Request Quote" />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Primary Button Link / Action</label>
                                <input type="text" value={activeSlide.primaryBtnHref || ''} onChange={(e) => handleSlideChange('primaryBtnHref', e.target.value)} className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white" placeholder="e.g. #contact, /contact, or leave blank for Modal" />
                                <span className="text-[10px] text-slate-400 mt-1 block">Leave empty or '#modal' to trigger the Request Quote popup modal</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                              <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Secondary Button Text</label>
                                <input type="text" value={activeSlide.secondaryBtnText || ''} onChange={(e) => handleSlideChange('secondaryBtnText', e.target.value)} className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-bold" placeholder="e.g. Learn More" />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Secondary Button Link / URL</label>
                                <input type="text" value={activeSlide.secondaryBtnHref || ''} onChange={(e) => handleSlideChange('secondaryBtnHref', e.target.value)} className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white" placeholder="e.g. #services, /products, or /about" />
                                <span className="text-[10px] text-slate-400 mt-1 block">Destination anchor or page URL</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <ProductHeroEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} onUpload={uploadFile} />
                  )
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

                        <div className="grid grid-cols-2 gap-6 pt-1">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Optional Button Text</label>
                            <input type="text" value={getSectionData(activeSection).btnText || ''} onChange={(e) => handleSectionDataChange('btnText', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold" placeholder="e.g. Discover Our Story" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Optional Button Link / URL</label>
                            <input type="text" value={getSectionData(activeSection).btnHref || ''} onChange={(e) => handleSectionDataChange('btnHref', e.target.value)} className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono text-slate-700" placeholder="e.g. #contact or /about" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SPECS MATRIX EDITOR */}
                {activeSection.type === 'SPECS_MATRIX' && (
                  <SpecsMatrixEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} onUpload={uploadFile} />
                )}

                {/* FAQ EDITOR */}
                {activeSection.type === 'FAQ' && (
                  <FaqEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} />
                )}

                {/* FABRIC SWATCHES EDITOR */}
                {activeSection.type === 'FABRIC_SWATCHES' && (
                  <FabricSwatchesEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} onUpload={uploadFile} />
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
                  <LogisticsEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} onUpload={uploadFile} />
                )}

                {/* CUSTOMIZATION EDITOR */}
                {activeSection.type === 'CUSTOMIZATION' && (
                  <CustomizationEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} onUpload={uploadFile} />
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
                  <WhySilkyEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} onUpload={uploadFile} />
                )}

                {/* PROCESS EDITOR */}
                {activeSection.type === 'PROCESS' && (
                  <ProcessEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} onUpload={uploadFile} />
                )}

                {/* TESTIMONIALS EDITOR */}
                {activeSection.type === 'TESTIMONIALS' && (
                  <TestimonialsEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} onUpload={uploadFile} />
                )}

                {/* CONTACT BAND EDITOR */}
                {activeSection.type === 'CONTACT_BAND' && (
                  <ContactBandEditor data={getSectionData(activeSection)} onChange={handleSectionDataChange} />
                )}
                  </div>

                  {/* STICKY LIVE PREVIEW COLUMN */}
                  <div className={
                    sectionPreviewMode === 'split' 
                      ? 'xl:col-span-5 2xl:col-span-4 sticky top-4 z-20 space-y-3' 
                      : sectionPreviewMode === 'preview' 
                      ? 'w-full space-y-3' 
                      : 'hidden'
                  }>
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden">
                      {/* PREVIEW TOOLBAR HEADER */}
                      <div className="px-4 py-3 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
                            Live Section Preview
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-extrabold bg-[#DE7B3D] text-white rounded-md uppercase">
                            #{sections.findIndex(s => s.id === selectedSectionId) + 1} {getSectionLabel(activeSection.type)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          {/* ZOOM CONTROLS (Only visible in Desktop Mode) */}
                          {previewDevice === 'desktop' && (
                            <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-lg border border-slate-700/60">
                              <button
                                type="button"
                                onClick={() => setPreviewZoom(prev => {
                                  const curr = prev === 'auto' ? autoScalePercent : prev
                                  return Math.max(25, curr - 10)
                                })}
                                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                                title="Zoom Out"
                              >
                                <ZoomOut className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => setPreviewZoom('auto')}
                                className={`px-1.5 py-0.5 text-[10px] font-extrabold rounded transition-all cursor-pointer ${
                                  previewZoom === 'auto' 
                                    ? 'bg-[#DE7B3D] text-white shadow-xs' 
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                                }`}
                                title="Auto Fit Window Width"
                              >
                                Auto ({autoScalePercent}%)
                              </button>

                              {[35, 45, 60, 100].map(z => (
                                <button
                                  key={z}
                                  type="button"
                                  onClick={() => setPreviewZoom(z)}
                                  className={`px-1.5 py-0.5 text-[10px] font-extrabold rounded transition-all cursor-pointer ${
                                    previewZoom === z 
                                      ? 'bg-[#DE7B3D] text-white shadow-xs' 
                                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                                  }`}
                                  title={`Set Zoom to ${z}%`}
                                >
                                  {z === 100 ? '100% (Full)' : `${z}%`}
                                </button>
                              ))}

                              <button
                                type="button"
                                onClick={() => setPreviewZoom(prev => {
                                  const curr = prev === 'auto' ? autoScalePercent : prev
                                  return Math.min(120, curr + 10)
                                })}
                                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                                title="Zoom In"
                              >
                                <ZoomIn className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}

                          {/* DEVICE SWITCHER */}
                          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
                            <button
                              type="button"
                              onClick={() => setPreviewDevice('desktop')}
                              className={`px-2 py-1 rounded text-[11px] font-extrabold flex items-center gap-1 transition-all cursor-pointer ${
                                previewDevice === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                              }`}
                              title="Desktop View"
                            >
                              <Monitor className="w-3.5 h-3.5" />
                              <span>Desktop</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setPreviewDevice('mobile')}
                              className={`px-2 py-1 rounded text-[11px] font-extrabold flex items-center gap-1 transition-all cursor-pointer ${
                                previewDevice === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                              }`}
                              title="Mobile View"
                            >
                              <Smartphone className="w-3.5 h-3.5" />
                              <span>Mobile</span>
                            </button>
                          </div>

                          {/* COLLAPSE PREVIEW BUTTON */}
                          <button
                            type="button"
                            onClick={() => setSectionPreviewMode('form')}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-all cursor-pointer border border-slate-700"
                            title="Collapse Preview (Expand Form Editor to Full Width)"
                          >
                            <EyeOff className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* PREVIEW CONTAINER CANVAS */}
                      <div 
                        ref={previewContainerRef}
                        className="bg-slate-900/90 p-3 sm:p-4 max-h-[820px] overflow-y-auto hide-scrollbar overflow-x-auto"
                      >
                        {previewDevice === 'desktop' ? (
                          /* UNCROPPED SCALED DESKTOP VIEWPORT FRAME */
                          <div className="w-full flex justify-center items-start">
                            <div 
                              className="shrink-0 transition-all duration-300"
                              style={{
                                width: `${(1280 * currentZoomPercent) / 100}px`,
                                maxWidth: '100%',
                              }}
                            >
                              <div 
                                className="rounded-xl overflow-hidden shadow-2xl bg-white border border-slate-300/80 origin-top-left transition-all duration-300"
                                style={{
                                  width: '1280px',
                                  zoom: currentZoomPercent / 100,
                                }}
                              >
                                {/* BROWSER TOP BAR MOCKUP */}
                                <div className="bg-slate-200 border-b border-slate-300 px-3 py-1.5 flex items-center justify-between text-xs text-slate-500 select-none">
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400 border border-red-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-500/20" />
                                  </div>
                                  <div className="bg-white rounded-md px-3 py-0.5 text-[11px] font-mono text-slate-600 flex items-center justify-center gap-1 border border-slate-300/80 shadow-2xs max-w-md w-full">
                                    <span className="text-slate-400">https://</span>silkytextiles.com/products/<span className="font-bold text-[#DE7B3D]">{selectedProductSlug || 'preview'}</span>#{activeSection?.type?.toLowerCase()}
                                  </div>
                                  <div className="text-[10px] font-extrabold text-slate-500 bg-slate-300/70 px-2 py-0.5 rounded uppercase">
                                    Desktop {currentZoomPercent}% {previewZoom === 'auto' ? '(Auto Fit)' : ''}
                                  </div>
                                </div>

                                {/* LIVE COMPONENT RENDERER */}
                                <div className="bg-white text-slate-900">
                                  <DynamicSectionLiveRenderer sectionType={activeSection.type} data={getSectionData(activeSection)} isHomepage={isHomepageBuilder} slides={slides} />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* SCALED MOBILE PHONE FRAME */
                          <div className="max-w-[375px] mx-auto border-4 border-slate-800 rounded-[36px] overflow-hidden shadow-2xl bg-white my-4 relative">
                            {/* MOBILE NOTCH */}
                            <div className="bg-slate-900 h-5 w-full flex items-center justify-center">
                              <div className="w-24 h-3.5 bg-black rounded-b-xl flex items-center justify-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-slate-800" />
                                <div className="w-8 h-1 rounded-full bg-slate-800" />
                              </div>
                            </div>
                            <DynamicSectionLiveRenderer sectionType={activeSection.type} data={getSectionData(activeSection)} isHomepage={isHomepageBuilder} slides={slides} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
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
          ) : activeTab === 'general-pages' ? (
            <GeneralPagesCMS />
          ) : activeTab === 'menu-manager' ? (
            <WordPressMenuManager
              initialNavLinks={config?.navLinks}
              onSave={handleSaveMenuLinks}
              onUploadImage={uploadFile}
              productPages={productPages}
              isSaving={isSaving}
            />
          ) : activeTab === 'user-manager' ? (
            <UserManager currentUserRole={loggedInUser?.role || 'Master Admin'} />
          ) : activeTab === 'header' ? (
            
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
                      <h3 className="font-bold text-slate-800 mb-6 border-b border-gray-100 pb-4">
                        Contact Details & Showroom Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Top Bar Announcement</label>
                          <input
                            type="text"
                            value={config.topBarText || ''}
                            onChange={(e) => handleConfigChange('topBarText', e.target.value)}
                            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            placeholder="e.g. Free Corporate Fitting Across 7 Emirates"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Primary Phone Number</label>
                          <input
                            type="text"
                            value={config.phone || ''}
                            onChange={(e) => handleConfigChange('phone', e.target.value)}
                            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                            placeholder="+971 4 355 8453"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Secondary Phone / Landline</label>
                          <input
                            type="text"
                            value={config.phoneSecondary || ''}
                            onChange={(e) => handleConfigChange('phoneSecondary', e.target.value)}
                            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                            placeholder="+971 4 226 1050"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp Direct Number</label>
                          <input
                            type="text"
                            value={config.whatsapp || ''}
                            onChange={(e) => handleConfigChange('whatsapp', e.target.value)}
                            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                            placeholder="+971 4 226 1050"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Primary Corporate Email</label>
                          <input
                            type="email"
                            value={config.email || ''}
                            onChange={(e) => handleConfigChange('email', e.target.value)}
                            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                            placeholder="sales@silky.ae"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Secondary / Support Email</label>
                          <input
                            type="email"
                            value={config.emailSecondary || ''}
                            onChange={(e) => handleConfigChange('emailSecondary', e.target.value)}
                            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                            placeholder="info@silky.ae"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-slate-700 mb-2">Showroom & Headquarters Address</label>
                          <textarea
                            rows={2}
                            value={config.address || ''}
                            onChange={(e) => handleConfigChange('address', e.target.value)}
                            placeholder="Showroom No. 1, Al Zarooni Bldg, Next to HBL, Baniyas Road (D85), Deira Creek, Dubai, UAE"
                            className="w-full px-4 py-3 text-sm bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          ) : null}
        </div>

        {!(activeTab === 'product-pages' && productPageViewMode === 'list') && activeTab !== 'user-manager' && activeTab !== 'general-pages' && (
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
        )}

        {/* CREATE NEW PRODUCT PAGE MODAL */}
        {isCreatePageModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DE7B3D] block">MASTER TEMPLATE CLONE</span>
                  <h3 className="text-xl font-extrabold text-slate-900">Create New Product Page</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreatePageModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 text-lg font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateProductPageSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                    Product Page Title *
                  </label>
                  <input
                    required
                    type="text"
                    value={newPageTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Luxury Linen Fabrics Supplier in UAE"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#DE7B3D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                    URL Slug *
                  </label>
                  <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-600">
                    <span className="text-slate-400 font-sans mr-1">/products/</span>
                    <input
                      required
                      type="text"
                      value={newPageSlug}
                      onChange={(e) => setNewPageSlug(e.target.value)}
                      placeholder="luxury-linen-fabrics-supplier-in-uae"
                      className="w-full bg-transparent border-none text-xs font-bold text-slate-900 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={newPageCategory}
                    onChange={(e) => setNewPageCategory(e.target.value)}
                    placeholder="e.g. Corporate Uniforms & Fine Shirting"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#DE7B3D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                    Hero Image
                  </label>
                  <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <div className="w-20 h-14 rounded-xl bg-slate-200 overflow-hidden shrink-0 border border-slate-300 relative flex items-center justify-center">
                      {newPageHeroImage ? (
                        <img src={newPageHeroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-slate-400" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => newPageHeroFileInputRef.current?.click()}
                          disabled={isSaving}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                        >
                          <UploadCloud className="w-4 h-4 text-[#DE7B3D]" /> Upload Image File
                        </button>
                        {newPageHeroImage && (
                          <button
                            type="button"
                            onClick={() => setNewPageHeroImage('')}
                            className="p-2 text-slate-400 hover:text-red-500 rounded-lg"
                            title="Remove image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <input
                        type="file"
                        ref={newPageHeroFileInputRef}
                        onChange={handleNewPageHeroUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <p className="text-[11px] text-slate-500 font-medium">Upload image file directly from your computer</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF9F6] border border-amber-200/80 p-4 rounded-2xl text-xs text-amber-900 space-y-1">
                  <span className="font-extrabold block">✨ Master Template Features:</span>
                  <p className="text-amber-800 leading-relaxed font-medium">
                    This new page will instantly clone all 11 master template sections (Hero, Specs Matrix, Custom Embroidery, Sectors, Swatches, Quality Control, Bulk Pricing, Logistics, Reviews, FAQ, Quote Form) as editable components!
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsCreatePageModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 bg-[#DE7B3D] hover:bg-[#c96a2e] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Create Product Page
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
