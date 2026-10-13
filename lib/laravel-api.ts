/**
 * Laravel API client — direct PHP backend calls only.
 * No Prisma. No local DB. Single source of truth = PHP Laravel + MySQL.
 */

function getPhpApiUrl(): string {
  // Client-side: use the URL embedded at build time (injected via layout.tsx)
  if (typeof window !== 'undefined') {
    // If testing on localhost, ALWAYS use local '/api'
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return '/api'
    }
    const envUrl = (window as any).__NEXT_PUBLIC_LARAVEL_API_URL__
    if (envUrl && typeof envUrl === 'string' && envUrl.startsWith('http')) {
      try {
        const parsed = new URL(envUrl)
        if (parsed.origin === window.location.origin) {
          return '/api'
        }
      } catch (e) {}
      return envUrl
    }
    return `${window.location.origin}/api`
  }
  // Server-side (SSR/build): use env var
  return process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://localhost:3000/api'
}

const getFetchOptions = (): RequestInit | undefined => {
  if (typeof window !== 'undefined') {
    return { cache: 'no-store' }
  }
  return undefined
}

async function safeJson(res: Response) {
  if (!res.ok) return null
  const text = await res.text()
  if (!text || !text.trim()) return { success: true }
  if (text.trim().startsWith('<')) return null
  try {
    return JSON.parse(text)
  } catch {
    return { success: true, raw: text }
  }
}

// ─── Hero Slides ────────────────────────────────────────────────────────────

export async function getHeroSlides() {
  try {
    const res = await fetch(`${getPhpApiUrl()}/hero-slides`, getFetchOptions())
    const data = await safeJson(res)
    if (Array.isArray(data) && data.length > 0) return data
  } catch (err) {
    console.error('getHeroSlides error:', err)
  }
  return []
}

export async function createHeroSlide(data: any) {
  const res = await fetch(`${getPhpApiUrl()}/hero-slides`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`createHeroSlide HTTP ${res.status}`)
  return json
}

export async function updateHeroSlide(id: number, data: any) {
  // PHP route: PUT /api/hero-slides/{id}
  const res = await fetch(`${getPhpApiUrl()}/hero-slides/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`updateHeroSlide HTTP ${res.status}`)
  return json
}

export async function deleteHeroSlide(id: number) {
  // PHP route: DELETE /api/hero-slides/{id}
  const res = await fetch(`${getPhpApiUrl()}/hero-slides/${id}`, {
    method: 'DELETE',
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`deleteHeroSlide HTTP ${res.status}`)
  return json
}

// ─── Site Config ─────────────────────────────────────────────────────────────

export async function getSiteConfig() {
  try {
    const res = await fetch(`${getPhpApiUrl()}/site-config`, getFetchOptions())
    return await safeJson(res)
  } catch (err) {
    console.error('getSiteConfig error:', err)
    return null
  }
}

export async function updateSiteConfig(data: any) {
  // PHP route: PUT /api/site-config
  const res = await fetch(`${getPhpApiUrl()}/site-config`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`updateSiteConfig HTTP ${res.status}`)
  return json
}

// ─── Footer Config ───────────────────────────────────────────────────────────

export async function getFooterConfig() {
  try {
    const res = await fetch(`${getPhpApiUrl()}/footer-config`, getFetchOptions())
    return await safeJson(res)
  } catch (err) {
    console.error('getFooterConfig error:', err)
    return null
  }
}

export async function updateFooterConfig(data: any) {
  // PHP route: PUT /api/footer-config
  const res = await fetch(`${getPhpApiUrl()}/footer-config`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`updateFooterConfig HTTP ${res.status}`)
  return json
}

// ─── Page Sections (Homepage) ─────────────────────────────────────────────────

export async function getPageSections() {
  try {
    const res = await fetch(`${getPhpApiUrl()}/page-sections`, getFetchOptions())
    const data = await safeJson(res)
    return Array.isArray(data) ? data : []
  } catch (err) {
    console.error('getPageSections error:', err)
    return []
  }
}

export async function createPageSection(type: string, data: any) {
  // PHP route: POST /api/page-sections
  const res = await fetch(`${getPhpApiUrl()}/page-sections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data }),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`createPageSection HTTP ${res.status}`)
  return json
}

export async function updatePageSection(id: number, type: string, dataStr: string, isActive: boolean) {
  // PHP route: PUT /api/page-sections/{id}
  // Also sends 'type' so PHP can upsert by type if ID doesn't exist in MySQL yet
  const res = await fetch(`${getPhpApiUrl()}/page-sections/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data: dataStr, isActive }),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`updatePageSection HTTP ${res.status}`)
  return json
}

export async function updateSectionOrder(sections: { id: number; order: number }[]) {
  // PHP route: POST /api/page-sections/reorder
  const res = await fetch(`${getPhpApiUrl()}/page-sections/reorder`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sections }),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`updateSectionOrder HTTP ${res.status}`)
  return json
}

export async function deletePageSection(id: number) {
  // PHP route: DELETE /api/page-sections/{id}
  const res = await fetch(`${getPhpApiUrl()}/page-sections/${id}`, {
    method: 'DELETE',
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`deletePageSection HTTP ${res.status}`)
  return json
}

// ─── Product Pages ────────────────────────────────────────────────────────────

export async function getProductPages() {
  try {
    const res = await fetch(`${getPhpApiUrl()}/product-pages`, getFetchOptions())
    const data = await safeJson(res)
    return Array.isArray(data) ? data : []
  } catch (err) {
    console.error('getProductPages error:', err)
    return []
  }
}

export async function getProductPageBySlug(slug: string) {
  try {
    const res = await fetch(`${getPhpApiUrl()}/product-pages/slug/${slug}`, getFetchOptions())
    return await safeJson(res)
  } catch (err) {
    console.error('getProductPageBySlug error:', err)
    return null
  }
}

export async function createProductPage(data: any) {
  // PHP route: POST /api/product-pages
  const res = await fetch(`${getPhpApiUrl()}/product-pages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`createProductPage HTTP ${res.status}`)
  return json
}

export async function updateProductPage(id: number, data: any) {
  // PHP route: PUT /api/product-pages/{id}
  const res = await fetch(`${getPhpApiUrl()}/product-pages/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`updateProductPage HTTP ${res.status}`)
  return json
}

export async function deleteProductPage(idOrSlug: number | string) {
  // PHP route: DELETE /api/product-pages/{id}
  const res = await fetch(`${getPhpApiUrl()}/product-pages/${idOrSlug}`, {
    method: 'DELETE',
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`deleteProductPage HTTP ${res.status}`)
  return json
}

export async function addProductPageSection(pageId: number, type: string, data: any) {
  // PHP route: POST /api/product-pages/{id}/sections
  const res = await fetch(`${getPhpApiUrl()}/product-pages/${pageId}/sections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data: JSON.stringify(data), isActive: true }),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`addProductPageSection HTTP ${res.status}`)
  return json
}

export async function updateProductPageSection(sectionId: number, dataStr: string, isActive: boolean) {
  // PHP route: PUT /api/product-pages/sections/{sectionId}
  const res = await fetch(`${getPhpApiUrl()}/product-pages/sections/${sectionId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: dataStr, isActive }),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`updateProductPageSection HTTP ${res.status}`)
  return json
}

export async function deleteProductPageSection(sectionId: number) {
  // PHP route: DELETE /api/product-pages/sections/{sectionId}
  const res = await fetch(`${getPhpApiUrl()}/product-pages/sections/${sectionId}`, {
    method: 'DELETE',
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`deleteProductPageSection HTTP ${res.status}`)
  return json
}

export async function saveProductPageSections(pageId: number, sections: any[]) {
  // PHP route: POST /api/product-pages/{id}/save-sections
  const res = await fetch(`${getPhpApiUrl()}/product-pages/${pageId}/save-sections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sections }),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`saveProductPageSections HTTP ${res.status}`)
  return json
}

// ─── General Pages ────────────────────────────────────────────────────────────

export async function getGeneralPages() {
  try {
    const res = await fetch(`${getPhpApiUrl()}/general-pages`, getFetchOptions())
    const json = await safeJson(res)
    if (json && Array.isArray(json)) return json
  } catch (err) {
    console.error('getGeneralPages error:', err)
  }
  return []
}

export async function getGeneralPageBySlug(slug: string) {
  const cleanSlug = slug.replace(/^\//, '').trim().toLowerCase()
  try {
    const res = await fetch(`${getPhpApiUrl()}/general-pages/slug/${cleanSlug}`, getFetchOptions())
    const json = await safeJson(res)
    if (json && json.slug) return json
  } catch (err) {
    console.error('getGeneralPageBySlug error:', err)
  }
  return null
}

export async function saveGeneralPage(pageData: any) {
  // PHP route: POST /api/general-pages
  try {
    const res = await fetch(`${getPhpApiUrl()}/general-pages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pageData),
    })
    const json = await safeJson(res)
    if (json) return json
  } catch (err) {
    console.error('saveGeneralPage error:', err)
  }
  return null
}

export async function deleteGeneralPage(idOrSlug: string | number) {
  // PHP route: DELETE /api/general-pages/{id}
  try {
    const res = await fetch(`${getPhpApiUrl()}/general-pages/${idOrSlug}`, {
      method: 'DELETE',
    })
    const json = await safeJson(res)
    if (json) return json
  } catch (err) {
    console.error('deleteGeneralPage error:', err)
  }
  return null
}

// ─── Custom CSS, JS & HTML Code Snippets ──────────────────────────────────────

export interface CustomCodeSnippet {
  id: string
  title: string
  codeType: 'css' | 'js' | 'html'
  code: string
  placement: 'head' | 'body_start' | 'footer'
  targetDevice: 'all' | 'desktop' | 'mobile'
  targetPage?: string
  targetSection?: string
  isActive: boolean
  isFavorite?: boolean
  createdAt?: string
  updatedAt?: string
}

export async function getCustomCodeSnippets(activeOnly: boolean = false): Promise<CustomCodeSnippet[]> {
  try {
    const query = activeOnly ? '?active_only=1' : ''
    const primaryUrl = `${getPhpApiUrl()}/custom-code${query}`
    let res = await fetch(primaryUrl, getFetchOptions())
    if (res.status === 404 && primaryUrl !== `/api/custom-code${query}`) {
      res = await fetch(`/api/custom-code${query}`, getFetchOptions())
    }
    const json = await safeJson(res)
    if (json && Array.isArray(json)) return json
  } catch (err) {
    console.error('getCustomCodeSnippets error:', err)
  }
  return []
}

export async function createCustomCodeSnippet(snippet: Partial<CustomCodeSnippet>) {
  const primaryUrl = `${getPhpApiUrl()}/custom-code`
  let res = await fetch(primaryUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(snippet),
  })
  if (res.status === 404 && primaryUrl !== '/api/custom-code') {
    res = await fetch('/api/custom-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(snippet),
    })
  }
  const json = await safeJson(res)
  if (!json) throw new Error(`createCustomCodeSnippet HTTP ${res.status}`)
  return json
}

export async function updateCustomCodeSnippet(id: string, snippet: Partial<CustomCodeSnippet>) {
  const primaryUrl = `${getPhpApiUrl()}/custom-code/${id}`
  let res = await fetch(primaryUrl, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(snippet),
  })
  if (res.status === 404 && primaryUrl !== `/api/custom-code/${id}`) {
    res = await fetch(`/api/custom-code/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(snippet),
    })
  }
  const json = await safeJson(res)
  if (!json) throw new Error(`updateCustomCodeSnippet HTTP ${res.status}`)
  return json
}

export async function toggleCustomCodeSnippet(id: string) {
  const primaryUrl = `${getPhpApiUrl()}/custom-code/${id}/toggle`
  let res = await fetch(primaryUrl, {
    method: 'PATCH',
  })
  if (res.status === 404 && primaryUrl !== `/api/custom-code/${id}/toggle`) {
    res = await fetch(`/api/custom-code/${id}/toggle`, {
      method: 'PATCH',
    })
  }
  const json = await safeJson(res)
  if (!json) throw new Error(`toggleCustomCodeSnippet HTTP ${res.status}`)
  return json
}

export async function deleteCustomCodeSnippet(id: string) {
  const primaryUrl = `${getPhpApiUrl()}/custom-code/${id}`
  let res = await fetch(primaryUrl, {
    method: 'DELETE',
  })
  if (res.status === 404 && primaryUrl !== `/api/custom-code/${id}`) {
    res = await fetch(`/api/custom-code/${id}`, {
      method: 'DELETE',
    })
  }
  const json = await safeJson(res)
  if (!json) throw new Error(`deleteCustomCodeSnippet HTTP ${res.status}`)
  return json
}

export async function saveAllCustomCodeSnippets(snippets: CustomCodeSnippet[]) {
  const res = await fetch(`${getPhpApiUrl()}/custom-code/save-all`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ snippets }),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`saveAllCustomCodeSnippets HTTP ${res.status}`)
  return json
}
