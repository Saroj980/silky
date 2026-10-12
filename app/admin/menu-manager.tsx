'use client'

import React, { useState, useEffect, useMemo } from 'react'
import {
  Plus, Trash2, Save, ArrowUp, ArrowDown, ChevronRight,
  ChevronDown, CornerDownRight, X, Layers, Link as LinkIcon,
  ShoppingBag, Globe, FileText, Check
} from 'lucide-react'

export interface MenuItemTree {
  id: string
  title: string
  url: string
  badge?: string
  children?: MenuItemTree[]
}

export const GENERAL_PAGE_OPTIONS = [
  { label: 'Homepage', value: '/' },
  { label: 'About Us', value: '/about-us' },
  { label: 'Contact Us', value: '/contact-us' },
  { label: 'Request Quote Form', value: '#quote-form' },
]

export const DEFAULT_PRODUCT_URL_OPTIONS = [
  { label: 'Pure Cotton Shirts Supplier in UAE', value: '/products/pure-cotton-shirts-supplier-in-uae' },
]

export const DEFAULT_MENU_ITEMS: MenuItemTree[] = [
  {
    id: 'm-home',
    title: 'HOME',
    url: '/',
  },
  {
    id: 'm-uniform-fleets',
    title: 'UNIFORM FLEETS',
    url: '/products/pure-cotton-shirts-supplier-in-uae',
  },
  {
    id: 'm-custom-apparel',
    title: 'CUSTOM APPAREL',
    url: '#',
  },
  {
    id: 'm-contact',
    title: 'CONTACT US',
    url: '/contact-us',
  },
]

export function normalizeMenuTree(raw: any): MenuItemTree[] {
  if (!raw) return DEFAULT_MENU_ITEMS
  let parsed = raw
  if (typeof raw === 'string') {
    try {
      parsed = JSON.parse(raw)
    } catch (e) {
      return DEFAULT_MENU_ITEMS
    }
  }

  if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.title) {
    return parsed
  }

  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    const keys = Object.keys(parsed).filter((k) => isNaN(Number(k)))
    if (keys.length > 0) {
      const result: MenuItemTree[] = [{ id: 'm-home', title: 'HOME', url: '/' }]
      keys.forEach((key) => {
        const item = parsed[key]
        const children: MenuItemTree[] = []
        if (Array.isArray(item?.subColumns)) {
          item.subColumns.forEach((col: any) => {
            if (Array.isArray(col.items)) {
              col.items.forEach((sub: any, sIdx: number) => {
                children.push({
                  id: `sub-${sIdx}-${Date.now()}`,
                  title: sub.name || sub.title || 'Link Item',
                  url: sub.href || sub.url || '/products/pure-cotton-shirts-supplier-in-uae',
                })
              })
            }
          })
        }
        result.push({
          id: `top-${key.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          title: key,
          url: item.href || '/products/pure-cotton-shirts-supplier-in-uae',
          children: children.length > 0 ? children : undefined,
        })
      })
      result.push({ id: 'm-contact', title: 'CONTACT US', url: '#quote-form' })
      return result
    }
  }

  return DEFAULT_MENU_ITEMS
}

export function normalizeMegaMenus(raw: any): Record<string, any> {
  const tree = normalizeMenuTree(raw)
  const dict: Record<string, any> = {}

  tree.forEach((top) => {
    const hasSubItems = Boolean(top.children && top.children.length > 0)
    if (!hasSubItems) {
      dict[top.title] = {
        title: top.title,
        hasDropdown: false,
        href: top.url || '#',
      }
      return
    }

    const subCols: any[] = [
      { title: '', hideTitle: true, items: [] },
      { title: '', hideTitle: true, items: [] },
      { title: '', hideTitle: true, items: [] },
    ]

    top.children!.forEach((child, idx) => {
      const colIndex = idx % 3
      subCols[colIndex].items.push({
        name: child.title,
        href: child.url || '#',
      })
    })

    dict[top.title] = {
      title: top.title,
      hasDropdown: true,
      href: top.url || '#',
      subColumns: subCols,
      featured: {
        title: top.title,
        subtitle: 'Enterprise uniform solutions.',
        image: '/images/textile_fabric_rolls.png',
        badge: 'Featured',
        href: top.url && top.url !== '#' ? top.url : '/products/pure-cotton-shirts-supplier-in-uae',
      },
    }
  })

  return dict
}

export function WordPressMenuManager({
  initialNavLinks,
  onSave,
  onUploadImage,
  productPages = [],
  config,
  onUpdateConfig,
  isSaving = false,
}: {
  initialNavLinks: any
  onSave: (updated: MenuItemTree[]) => void
  onUploadImage?: (file: File) => Promise<string>
  productPages?: any[]
  config?: any
  onUpdateConfig?: (field: string, val: string) => void
  isSaving?: boolean
}) {
  const [menuTree, setMenuTree] = useState<MenuItemTree[]>(() => normalizeMenuTree(initialNavLinks))
  const [openTopId, setOpenTopId] = useState<string | null>(menuTree[1]?.id || null)

  // React Modal State for Add Menu Item / Sub-Item
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [addItemTitle, setAddItemTitle] = useState('')
  const [addItemUrl, setAddItemUrl] = useState('/products/pure-cotton-shirts-supplier-in-uae')
  const [addItemParentId, setAddItemParentId] = useState<string>('root')
  const [linkCategory, setLinkCategory] = useState<'product' | 'general' | 'custom'>('product')

  // Dynamic General Pages from MySQL / API / Storage
  const [generalPages, setGeneralPages] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/general-pages', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setGeneralPages(data)
        }
      })
      .catch(() => {})
  }, [])

  const combinedProductOptions = (productPages && productPages.length > 0)
    ? productPages.map((p) => ({
        label: p.title || p.slug,
        value: `/products/${p.slug}`,
      }))
    : DEFAULT_PRODUCT_URL_OPTIONS

  const dynamicGeneralOptions = useMemo(() => {
    const list = [...GENERAL_PAGE_OPTIONS]
    if (Array.isArray(generalPages)) {
      generalPages.forEach((p) => {
        const slug = (p.slug || '').replace(/^\//, '').trim()
        if (slug) {
          const path = `/${slug}`
          if (!list.some((item) => item.value === path)) {
            list.push({ label: p.title || slug, value: path })
          }
        }
      })
    }
    return list
  }, [generalPages])

  // Helper to detect category of a menu item based on its URL
  const getItemCategory = (url: string = ''): 'product' | 'general' | 'custom' => {
    if (!url) return 'general'
    if (url.startsWith('/products/') || combinedProductOptions.some((p) => p.value === url)) {
      return 'product'
    }
    if (url === '#' || url.startsWith('http://') || url.startsWith('https://')) {
      return 'custom'
    }
    if (dynamicGeneralOptions.some((g) => g.value === url) || url === '/' || url.startsWith('/about') || url.startsWith('/contact')) {
      return 'general'
    }
    return 'custom'
  }

  // Open Modal Handler
  const handleOpenAddModal = (parentId: string = 'root') => {
    setAddItemParentId(parentId)
    setAddItemTitle('')
    setLinkCategory('product')
    setAddItemUrl(combinedProductOptions[0]?.value || '/products/pure-cotton-shirts-supplier-in-uae')
    setIsAddModalOpen(true)
  }

  // Add Item Submit Handler
  const handleCreateMenuItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!addItemTitle.trim()) return

    const newItem: MenuItemTree = {
      id: `item-${Date.now()}`,
      title: addItemParentId === 'root' ? addItemTitle.trim().toUpperCase() : addItemTitle.trim(),
      url: addItemUrl.trim() || '/',
      children: addItemParentId === 'root' ? [] : undefined,
    }

    let updatedTree: MenuItemTree[] = []
    if (addItemParentId === 'root') {
      updatedTree = [...menuTree, newItem]
      setOpenTopId(newItem.id)
    } else {
      updatedTree = menuTree.map((top) => {
        if (top.id === addItemParentId) {
          return { ...top, children: [...(top.children || []), newItem] }
        }
        return top
      })
      setOpenTopId(addItemParentId)
    }

    setMenuTree(updatedTree)
    setIsAddModalOpen(false)
    onSave(updatedTree)
  }

  const handleDeleteItem = (id: string) => {
    const updated = menuTree
      .filter((top) => top.id !== id)
      .map((top) => ({
        ...top,
        children: (top.children || []).filter((sub) => sub.id !== id),
      }))
    setMenuTree(updated)
    onSave(updated)
  }

  const handleMoveTop = (idx: number, dir: 'up' | 'down') => {
    const targetIdx = dir === 'up' ? idx - 1 : idx + 1
    if (targetIdx < 0 || targetIdx >= menuTree.length) return
    const updated = [...menuTree]
    const temp = updated[idx]
    updated[idx] = updated[targetIdx]
    updated[targetIdx] = temp
    setMenuTree(updated)
    onSave(updated)
  }

  const handleMoveSub = (topIdx: number, subIdx: number, dir: 'up' | 'down') => {
    const top = menuTree[topIdx]
    if (!top.children) return
    const targetIdx = dir === 'up' ? subIdx - 1 : subIdx + 1
    if (targetIdx < 0 || targetIdx >= top.children.length) return
    const updatedChildren = [...top.children]
    const temp = updatedChildren[subIdx]
    updatedChildren[subIdx] = updatedChildren[targetIdx]
    updatedChildren[targetIdx] = temp
    const updatedTree = menuTree.map((t, i) => (i === topIdx ? { ...t, children: updatedChildren } : t))
    setMenuTree(updatedTree)
    onSave(updatedTree)
  }

  const handleUpdateTop = (id: string, field: 'title' | 'url', val: string) => {
    const updatedTree = menuTree.map((t) => (t.id === id ? { ...t, [field]: val } : t))
    setMenuTree(updatedTree)
    onSave(updatedTree)
  }

  const handleUpdateSub = (topId: string, subId: string, field: 'title' | 'url', val: string) => {
    const updatedTree = menuTree.map((top) => {
      if (top.id === topId && top.children) {
        const updatedSub = top.children.map((s) => (s.id === subId ? { ...s, [field]: val } : s))
        return { ...top, children: updatedSub }
      }
      return top
    })
    setMenuTree(updatedTree)
    onSave(updatedTree)
  }

  return (
    <div className="w-full space-y-5 font-sans pb-24">
      {/* UNIFIED HIGH-CONTRAST TOOLBAR & CARD */}
      <div className="bg-white rounded-2xl border border-slate-300/90 shadow-sm p-6 space-y-5">
        {/* HEADER BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Navigation Menu Items</h2>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-900 text-white shadow-2xs">
                {menuTree.length} Items
              </span>
            </div>
            <p className="text-slate-600 text-xs font-medium mt-1">Configure your main website navigation tabs, categories, and sub-menu links.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOpenAddModal('root')}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm hover:shadow"
            >
              <Plus className="w-4 h-4 text-[#DE7B3D]" /> Add Menu Item
            </button>

            <button
              onClick={() => onSave(menuTree)}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#DE7B3D] hover:bg-[#c96a2e] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> Save All Changes
            </button>
          </div>
        </div>

        {/* LIST OF TOP-LEVEL ITEMS */}
        <div className="space-y-3.5">
          {menuTree.map((top, topIdx) => {
            const isExpanded = openTopId === top.id
            const hasChildren = top.children && top.children.length > 0
            const topCat = getItemCategory(top.url)

            return (
              <div
                key={top.id}
                className="border border-slate-300 rounded-xl bg-white shadow-xs hover:border-slate-400 transition-all overflow-hidden"
              >
                {/* ROW: COMPACT & BALANCED (SINGLE LINE ON DESKTOP) */}
                <div className="p-3.5 bg-white flex flex-wrap items-center justify-between gap-3">
                  {/* LEFT SIDE: TOGGLE + TITLE + BADGE */}
                  <div className="flex items-center gap-2.5 flex-wrap min-w-0">
                    <button
                      type="button"
                      onClick={() => setOpenTopId(isExpanded ? null : top.id)}
                      className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors shrink-0"
                      title={isExpanded ? 'Collapse Sub-Items' : 'Expand Sub-Items'}
                    >
                      {isExpanded ? <ChevronDown className="w-4 h-4 text-[#DE7B3D] stroke-[2.5]" /> : <ChevronRight className="w-4 h-4 text-slate-600 stroke-[2.5]" />}
                    </button>

                    {/* MENU TITLE INPUT */}
                    <input
                      type="text"
                      value={top.title}
                      onChange={(e) => handleUpdateTop(top.id, 'title', e.target.value)}
                      className="font-bold text-sm text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#DE7B3D] focus:ring-2 focus:ring-[#DE7B3D]/20 w-44 shadow-2xs transition-all"
                      placeholder="Menu Label..."
                    />

                    {/* SUB-ITEM COUNT BADGE */}
                    {hasChildren ? (
                      <span className="text-[11px] font-black text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-2.5 py-0.5 rounded-full shrink-0">
                        {top.children?.length} sub-item{top.children?.length === 1 ? '' : 's'}
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full shrink-0">
                        Direct Link
                      </span>
                    )}
                  </div>

                  {/* MIDDLE: CATEGORY PILLS + TARGET URL */}
                  <div className="flex items-center gap-2 flex-wrap flex-1 max-w-xl min-w-[280px]">
                    {/* Category Pills */}
                    <div className="flex items-center gap-0.5 bg-slate-100 p-1 rounded-lg border border-slate-300/80 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          const def = combinedProductOptions[0]?.value || '/products/pure-cotton-shirts-supplier-in-uae'
                          handleUpdateTop(top.id, 'url', def)
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                          topCat === 'product'
                            ? 'bg-[#DE7B3D] text-white shadow-xs'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                        title="Link to Product Page"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Product</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const def = dynamicGeneralOptions[0]?.value || '/'
                          handleUpdateTop(top.id, 'url', def)
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                          topCat === 'general'
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                        title="Link to General Page"
                      >
                        <Globe className="w-3.5 h-3.5 text-sky-400" />
                        <span>General</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (topCat !== 'custom') {
                            handleUpdateTop(top.id, 'url', '#')
                          }
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                          topCat === 'custom'
                            ? 'bg-slate-800 text-white shadow-xs'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                        title="Custom URL"
                      >
                        <LinkIcon className="w-3.5 h-3.5 text-amber-300" />
                        <span>Custom</span>
                      </button>
                    </div>

                    {/* Target selector */}
                    <div className="flex-1 min-w-[200px]">
                      {topCat === 'product' && (
                        <select
                          value={top.url}
                          onChange={(e) => handleUpdateTop(top.id, 'url', e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-[#DE7B3D] focus:ring-2 focus:ring-[#DE7B3D]/20 cursor-pointer shadow-2xs"
                        >
                          {combinedProductOptions.map((opt) => (
                            <option key={`top-p-${opt.value}`} value={opt.value}>
                              🛍️ {opt.label} ({opt.value})
                            </option>
                          ))}
                        </select>
                      )}

                      {topCat === 'general' && (
                        <select
                          value={top.url}
                          onChange={(e) => handleUpdateTop(top.id, 'url', e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-[#DE7B3D] focus:ring-2 focus:ring-[#DE7B3D]/20 cursor-pointer shadow-2xs"
                        >
                          {dynamicGeneralOptions.map((opt) => (
                            <option key={`top-g-${opt.value}`} value={opt.value}>
                              🌐 {opt.label} ({opt.value})
                            </option>
                          ))}
                        </select>
                      )}

                      {topCat === 'custom' && (
                        <input
                          type="text"
                          value={top.url}
                          onChange={(e) => handleUpdateTop(top.id, 'url', e.target.value)}
                          placeholder="e.g. /custom or https://example.com or #"
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-[#DE7B3D] focus:ring-2 focus:ring-[#DE7B3D]/20 shadow-2xs"
                        />
                      )}
                    </div>
                  </div>

                  {/* RIGHT CONTROLS */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleOpenAddModal(top.id)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#DE7B3D]" /> Sub-Item
                    </button>

                    <div className="flex items-center gap-0.5 pl-1.5 border-l border-slate-300">
                      <button
                        onClick={() => handleMoveTop(topIdx, 'up')}
                        disabled={topIdx === 0}
                        className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-20 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveTop(topIdx, 'down')}
                        disabled={topIdx === menuTree.length - 1}
                        className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-20 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(top.id)}
                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* SUB-ITEMS ACCORDION BODY */}
                {isExpanded && (
                  <div className="p-3.5 bg-slate-50/90 space-y-2.5 border-t border-slate-200">
                    {!hasChildren ? (
                      <div className="text-center py-4 bg-white rounded-lg border border-dashed border-slate-300">
                        <p className="text-xs text-slate-600 font-semibold">No sub-menu items yet.</p>
                        <button
                          onClick={() => handleOpenAddModal(top.id)}
                          className="mt-1.5 text-xs font-bold text-[#DE7B3D] hover:underline cursor-pointer"
                        >
                          + Add Sub-Item to {top.title}
                        </button>
                      </div>
                    ) : (
                      top.children!.map((sub, subIdx) => {
                        const subCat = getItemCategory(sub.url)
                        return (
                          <div
                            key={sub.id}
                            className="p-3 bg-white rounded-xl border border-slate-300 shadow-2xs hover:border-slate-400 flex flex-wrap items-center justify-between gap-3 transition-all"
                          >
                            {/* SUB TITLE */}
                            <div className="flex items-center gap-2 min-w-0">
                              <CornerDownRight className="w-4 h-4 text-[#DE7B3D] shrink-0 stroke-[2.5]" />
                              <input
                                type="text"
                                value={sub.title}
                                onChange={(e) => handleUpdateSub(top.id, sub.id, 'title', e.target.value)}
                                className="font-bold text-xs text-slate-900 bg-white px-2.5 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#DE7B3D] focus:ring-2 focus:ring-[#DE7B3D]/20 w-44 shadow-2xs"
                                placeholder="Sub-Item Title..."
                              />
                            </div>

                            {/* SUB CATEGORY + TARGET */}
                            <div className="flex items-center gap-2 flex-wrap flex-1 max-w-xl min-w-[260px]">
                              <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-300/80 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const def = combinedProductOptions[0]?.value || '/products/pure-cotton-shirts-supplier-in-uae'
                                    handleUpdateSub(top.id, sub.id, 'url', def)
                                  }}
                                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                                    subCat === 'product'
                                      ? 'bg-[#DE7B3D] text-white shadow-xs'
                                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                                  }`}
                                  title="Product Page Link"
                                >
                                  <ShoppingBag className="w-3 h-3" />
                                  <span>Product</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    const def = dynamicGeneralOptions[0]?.value || '/'
                                    handleUpdateSub(top.id, sub.id, 'url', def)
                                  }}
                                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                                    subCat === 'general'
                                      ? 'bg-slate-900 text-white shadow-xs'
                                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                                  }`}
                                  title="General Page Link"
                                >
                                  <Globe className="w-3 h-3 text-sky-400" />
                                  <span>General</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (subCat !== 'custom') {
                                      handleUpdateSub(top.id, sub.id, 'url', '#')
                                    }
                                  }}
                                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                                    subCat === 'custom'
                                      ? 'bg-slate-800 text-white shadow-xs'
                                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                                  }`}
                                  title="Custom URL"
                                >
                                  <LinkIcon className="w-3 h-3 text-amber-300" />
                                  <span>Custom</span>
                                </button>
                              </div>

                              <div className="flex-1 min-w-[180px]">
                                {subCat === 'product' && (
                                  <select
                                    value={sub.url}
                                    onChange={(e) => handleUpdateSub(top.id, sub.id, 'url', e.target.value)}
                                    className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-[#DE7B3D] cursor-pointer shadow-2xs"
                                  >
                                    {combinedProductOptions.map((opt) => (
                                      <option key={`sub-p-${opt.value}`} value={opt.value}>
                                        🛍️ {opt.label} ({opt.value})
                                      </option>
                                    ))}
                                  </select>
                                )}

                                {subCat === 'general' && (
                                  <select
                                    value={sub.url}
                                    onChange={(e) => handleUpdateSub(top.id, sub.id, 'url', e.target.value)}
                                    className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-[#DE7B3D] cursor-pointer shadow-2xs"
                                  >
                                    {dynamicGeneralOptions.map((opt) => (
                                      <option key={`sub-g-${opt.value}`} value={opt.value}>
                                        🌐 {opt.label} ({opt.value})
                                      </option>
                                    ))}
                                  </select>
                                )}

                                {subCat === 'custom' && (
                                  <input
                                    type="text"
                                    value={sub.url}
                                    onChange={(e) => handleUpdateSub(top.id, sub.id, 'url', e.target.value)}
                                    placeholder="e.g. /custom or #"
                                    className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-[#DE7B3D] shadow-2xs"
                                  />
                                )}
                              </div>
                            </div>

                            {/* REORDER & DELETE */}
                            <div className="flex items-center gap-0.5 shrink-0">
                              <button
                                onClick={() => handleMoveSub(topIdx, subIdx, 'up')}
                                disabled={subIdx === 0}
                                className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-20 hover:bg-slate-100 rounded-md"
                                title="Move Up"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleMoveSub(topIdx, subIdx, 'down')}
                                disabled={subIdx === top.children!.length - 1}
                                className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-20 hover:bg-slate-100 rounded-md"
                                title="Move Down"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(sub.id)}
                                className="p-1 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                title="Delete Sub-Item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* BOTTOM ADD BUTTON */}
        <div className="pt-2">
          <button
            onClick={() => handleOpenAddModal('root')}
            className="w-full py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 border-2 border-dashed border-slate-300 hover:border-[#DE7B3D] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#DE7B3D]" /> Add New Header Menu Item
          </button>
        </div>
      </div>

      {/* REACT ADD MENU ITEM MODAL UI */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DE7B3D] block">
                  Header Navigation
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {addItemParentId === 'root' ? 'Add Top-Level Menu Item' : 'Add Sub-Menu Item'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 text-base font-bold cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMenuItem} className="space-y-4">
              
              {/* ITEM TITLE LABEL */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                  Menu Item Label *
                </label>
                <input
                  required
                  type="text"
                  value={addItemTitle}
                  onChange={(e) => setAddItemTitle(e.target.value)}
                  placeholder={addItemParentId === 'root' ? 'e.g. WORKWEAR FLEETS' : 'e.g. Pure Cotton Shirts'}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-[#DE7B3D] transition-all"
                />
              </div>

              {/* LINK TYPE / CATEGORY TAB SELECTOR */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                  Select Page Link Category
                </label>
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => {
                      setLinkCategory('product')
                      const defaultProd = combinedProductOptions[0]?.value || '/products/pure-cotton-shirts-supplier-in-uae'
                      setAddItemUrl(defaultProd)
                      if (!addItemTitle.trim() && combinedProductOptions[0]?.label) {
                        setAddItemTitle(combinedProductOptions[0].label)
                      }
                    }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      linkCategory === 'product'
                        ? 'bg-[#DE7B3D] text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Product Pages</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLinkCategory('general')
                      const defaultGen = GENERAL_PAGE_OPTIONS[0]?.value || '/'
                      setAddItemUrl(defaultGen)
                      if (!addItemTitle.trim() && GENERAL_PAGE_OPTIONS[0]?.label) {
                        setAddItemTitle(GENERAL_PAGE_OPTIONS[0].label)
                      }
                    }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      linkCategory === 'general'
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 text-sky-400" />
                    <span>General Pages</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLinkCategory('custom')
                    }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      linkCategory === 'custom'
                        ? 'bg-slate-700 text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>Custom</span>
                  </button>
                </div>
              </div>

              {/* DYNAMIC CATEGORY INPUT / DROPDOWN */}
              {linkCategory === 'product' && (
                <div className="bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-amber-900">
                      Choose Product Page CMS ({combinedProductOptions.length})
                    </label>
                    <span className="text-[10px] font-bold bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded-full">
                      CMS Catalog
                    </span>
                  </div>
                  <select
                    value={addItemUrl}
                    onChange={(e) => {
                      const selectedVal = e.target.value
                      setAddItemUrl(selectedVal)
                      const matchOpt = combinedProductOptions.find(o => o.value === selectedVal)
                      if (matchOpt && (!addItemTitle.trim() || combinedProductOptions.some(o => o.label.toLowerCase() === addItemTitle.trim().toLowerCase()))) {
                        setAddItemTitle(matchOpt.label)
                      }
                    }}
                    className="w-full px-3.5 py-2.5 bg-white border border-amber-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#DE7B3D]/30 cursor-pointer shadow-2xs"
                  >
                    {combinedProductOptions.map((opt) => (
                      <option key={`cat-prod-${opt.value}`} value={opt.value}>
                        {opt.label} — ({opt.value})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {linkCategory === 'general' && (
                <div className="bg-sky-50/50 p-3.5 rounded-2xl border border-sky-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-sky-900">
                      Choose General / System Page
                    </label>
                    <span className="text-[10px] font-bold bg-sky-200/70 text-sky-900 px-2 py-0.5 rounded-full">
                      Standard Pages
                    </span>
                  </div>
                  <select
                    value={addItemUrl}
                    onChange={(e) => {
                      const selectedVal = e.target.value
                      setAddItemUrl(selectedVal)
                      const matchOpt = dynamicGeneralOptions.find(o => o.value === selectedVal)
                      if (matchOpt && (!addItemTitle.trim() || dynamicGeneralOptions.some(o => o.label.toLowerCase() === addItemTitle.trim().toLowerCase()))) {
                        setAddItemTitle(matchOpt.label)
                      }
                    }}
                    className="w-full px-3.5 py-2.5 bg-white border border-sky-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30 cursor-pointer shadow-2xs"
                  >
                    {dynamicGeneralOptions.map((opt) => (
                      <option key={`cat-gen-${opt.value}-${opt.label}`} value={opt.value}>
                        {opt.label} — ({opt.value})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {linkCategory === 'custom' && (
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                    Custom Page Link Path or External URL
                  </label>
                  <input
                    type="text"
                    value={addItemUrl}
                    onChange={(e) => setAddItemUrl(e.target.value)}
                    placeholder="e.g. /custom-page or https://..."
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-[#DE7B3D]"
                  />
                </div>
              )}

              {/* TARGET PATH PREVIEW */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                  Target Link Path Preview
                </label>
                <div className="px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono text-slate-600 flex items-center gap-2">
                  <LinkIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{addItemUrl || '/'}</span>
                </div>
              </div>

              {/* PARENT MENU POSITION */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                  Parent Menu Position
                </label>
                <select
                  value={addItemParentId}
                  onChange={(e) => setAddItemParentId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none cursor-pointer"
                >
                  <option value="root">Top-Level Menu Header (No Parent)</option>
                  {menuTree.map((top) => (
                    <option key={top.id} value={top.id}>
                      Under Parent: {top.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#DE7B3D] hover:bg-[#c96a2e] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Menu Item
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  )
}
