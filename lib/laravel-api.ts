function getApiUrl(): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api`
  }
  return process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://localhost:3000/api'
}

// For WRITE operations (POST/PUT/DELETE), always use the explicit Laravel API URL
// to ensure they hit the PHP backend and not a stale static file on shared hosting.
function getLaravelWriteUrl(): string {
  if (typeof window !== 'undefined') {
    // Prefer the env var embedded at build time; fall back to same-origin
    const envUrl = (window as any).__NEXT_PUBLIC_LARAVEL_API_URL__
    if (envUrl) return envUrl
    return `${window.location.origin}/api`
  }
  return process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://localhost:3000/api'
}

const LARAVEL_API_URL = getApiUrl()

async function safeJson(res: Response) {
  if (!res.ok) return null
  const text = await res.text()
  if (!text || !text.trim()) {
    return { success: true }
  }
  if (text.trim().startsWith('<')) {
    return null
  }
  try {
    return JSON.parse(text)
  } catch (err) {
    return { success: true, raw: text }
  }
}

export async function getHeroSlides() {
  if (typeof window === 'undefined') {
    try {
      const { prisma } = await import('@/lib/prisma')
      const slides = await prisma.heroSlide.findMany({ orderBy: { id: 'asc' } })
      if (slides && slides.length > 0) return slides
    } catch (err) {
      console.error('Prisma getHeroSlides error:', err)
    }
  }
  try {
    const res = await fetch(`${getApiUrl()}/hero-slides`)
    const data = await safeJson(res)
    if (Array.isArray(data) && data.length > 0) return data
  } catch (error) {
    console.error('Laravel API getHeroSlides error:', error)
  }
  return []
}

export async function createHeroSlide(data: any) {
  if (typeof window === 'undefined') {
    try {
      const { prisma } = await import('@/lib/prisma')
      const created = await prisma.heroSlide.create({
        data: {
          tagline: data.tagline || 'NEW SLIDE',
          title: data.title || 'New Hero Banner',
          description: data.description || '',
          primaryBtnText: data.primaryBtnText || 'Request Quote',
          primaryBtnHref: data.primaryBtnHref || '#contact',
          secondaryBtnText: data.secondaryBtnText || 'Learn More',
          secondaryBtnHref: data.secondaryBtnHref || '#services',
          image: data.image || '/images/hero_corporate_uniforms.png',
          imageAlt: data.imageAlt || 'Hero Banner Image',
          badgeText: data.badgeText || 'Dubai Tailoring',
          trustBadges: typeof data.trustBadges === 'string' ? data.trustBadges : JSON.stringify(data.trustBadges || []),
        }
      })
      return created
    } catch (err) {
      console.error('Prisma createHeroSlide error:', err)
    }
  }
  const res = await fetch(`${getLaravelWriteUrl()}/hero-slides`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`HTTP ${res.status}`)
  return json
}

export async function updateHeroSlide(id: number, data: any) {
  if (typeof window === 'undefined') {
    try {
      const { prisma } = await import('@/lib/prisma')
      const numId = Number(id)
      const existing = await prisma.heroSlide.findUnique({ where: { id: numId } })
      if (existing) {
        const updated = await prisma.heroSlide.update({
          where: { id: numId },
          data: {
            ...(data.tagline !== undefined && { tagline: data.tagline }),
            ...(data.title !== undefined && { title: data.title }),
            ...(data.description !== undefined && { description: data.description }),
            ...(data.primaryBtnText !== undefined && { primaryBtnText: data.primaryBtnText }),
            ...(data.primaryBtnHref !== undefined && { primaryBtnHref: data.primaryBtnHref }),
            ...(data.secondaryBtnText !== undefined && { secondaryBtnText: data.secondaryBtnText }),
            ...(data.secondaryBtnHref !== undefined && { secondaryBtnHref: data.secondaryBtnHref }),
            ...(data.image !== undefined && { image: data.image }),
            ...(data.imageAlt !== undefined && { imageAlt: data.imageAlt }),
            ...(data.badgeText !== undefined && { badgeText: data.badgeText }),
            ...(data.trustBadges !== undefined && {
              trustBadges: typeof data.trustBadges === 'string' ? data.trustBadges : JSON.stringify(data.trustBadges || [])
            }),
          }
        })
        return updated
      }
    } catch (err) {
      console.error('Prisma updateHeroSlide error:', err)
    }
  }
  // PHP route: PUT /api/hero-slides/{id}
  const res = await fetch(`${getLaravelWriteUrl()}/hero-slides/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`HTTP ${res.status}`)
  return json
}

export async function deleteHeroSlide(id: number) {
  if (typeof window === 'undefined') {
    try {
      const { prisma } = await import('@/lib/prisma')
      await prisma.heroSlide.deleteMany({ where: { id: Number(id) } })
      return { success: true }
    } catch (err) {
      console.error('Prisma deleteHeroSlide error:', err)
    }
  }
  // PHP route: DELETE /api/hero-slides/{id}
  const res = await fetch(`${getLaravelWriteUrl()}/hero-slides/${id}`, {
    method: 'DELETE',
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`HTTP ${res.status}`)
  return json
}

export async function getSiteConfig() {
  if (typeof window === 'undefined') {
    try {
      const { prisma } = await import('@/lib/prisma')
      const cfg = await prisma.siteConfig.findFirst()
      if (cfg) return cfg
    } catch (err) {
      console.error('Prisma getSiteConfig error:', err)
    }
  }
  try {
    const res = await fetch(`${getApiUrl()}/site-config`)
    return await safeJson(res)
  } catch (error) {
    console.error('Laravel API getSiteConfig error:', error)
    return null
  }
}

export async function updateSiteConfig(data: any) {
  // PHP route: PUT /api/site-config
  const res = await fetch(`${getLaravelWriteUrl()}/site-config`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`HTTP ${res.status}`)
  return json
}

export async function getPageSections() {
  if (typeof window === 'undefined') {
    try {
      const { prisma } = await import('@/lib/prisma')
      const sections = await prisma.pageSection.findMany({ orderBy: { order: 'asc' } })
      if (sections && sections.length > 0) return sections
    } catch (err) {
      console.error('Prisma getPageSections error:', err)
    }
  }
  try {
    const res = await fetch(`${getApiUrl()}/page-sections`)
    const data = await safeJson(res)
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Laravel API getPageSections error:', error)
    return []
  }
}

export async function createPageSection(type: string, data: any) {
  const res = await fetch(`${getLaravelWriteUrl()}/page-sections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data }),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`HTTP ${res.status}`)
  return json
}

export async function updatePageSection(id: number, dataStr: string, isActive: boolean) {
  // PHP route: PUT /api/page-sections/{id}
  const res = await fetch(`${getLaravelWriteUrl()}/page-sections/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: dataStr, isActive }),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`HTTP ${res.status}`)
  return json
}

export async function updateSectionOrder(sections: { id: number; order: number }[]) {
  const res = await fetch(`${getLaravelWriteUrl()}/page-sections/reorder`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sections }),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`HTTP ${res.status}`)
  return json
}

export async function deletePageSection(id: number) {
  // PHP route: DELETE /api/page-sections/{id}
  const res = await fetch(`${getLaravelWriteUrl()}/page-sections/${id}`, {
    method: 'DELETE',
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`HTTP ${res.status}`)
  return json
}

// Product Pages API (MySQL)
export async function getProductPages() {
  try {
    const res = await fetch(`${getApiUrl()}/product-pages`)
    const data = await safeJson(res)
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Laravel API getProductPages error:', error)
    return []
  }
}

export async function getProductPageBySlug(slug: string) {
  try {
    const res = await fetch(`${getApiUrl()}/product-pages/slug/${slug}`)
    return await safeJson(res)
  } catch (error) {
    console.error('Laravel API getProductPageBySlug error:', error)
    return null
  }
}

export async function createProductPage(data: any) {
  const res = await fetch(`${getLaravelWriteUrl()}/product-pages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`HTTP ${res.status}`)
  return json
}

export async function updateProductPage(id: number, data: any) {
  const res = await fetch(`${getLaravelWriteUrl()}/product-pages/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`HTTP ${res.status}`)
  return json
}

export async function deleteProductPage(idOrSlug: number | string) {
  if (typeof window === 'undefined') {
    try {
      const { prisma } = await import('@/lib/prisma')
      const isNum = typeof idOrSlug === 'number' || !isNaN(Number(idOrSlug))
      const page = await prisma.productPage.findFirst({
        where: isNum ? { id: Number(idOrSlug) } : { slug: String(idOrSlug) },
      })
      if (page) {
        await prisma.productPageSection.deleteMany({ where: { productPageId: page.id } })
        await prisma.productPage.delete({ where: { id: page.id } })
      }
      return { success: true }
    } catch (err) {
      console.error('Prisma deleteProductPage error:', err)
    }
  }

  const isNum = typeof idOrSlug === 'number' || (!isNaN(Number(idOrSlug)) && typeof idOrSlug !== 'string')
  const query = isNum ? `id=${idOrSlug}` : `slug=${encodeURIComponent(String(idOrSlug))}`
  const res = await fetch(`${getApiUrl()}/product-pages?${query}`, {
    method: 'DELETE',
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`HTTP ${res.status}`)
  return json
}

export async function addProductPageSection(pageId: number, type: string, data: any) {
  const res = await fetch(`${getApiUrl()}/product-pages/${pageId}/sections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data: JSON.stringify(data), isActive: true }),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`HTTP ${res.status}`)
  return json
}

export async function updateProductPageSection(sectionId: number, dataStr: string, isActive: boolean) {
  const res = await fetch(`${getApiUrl()}/product-pages/sections/${sectionId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: dataStr, isActive }),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`HTTP ${res.status}`)
  return json
}

export async function deleteProductPageSection(sectionId: number) {
  const res = await fetch(`${getApiUrl()}/product-pages/sections/${sectionId}`, {
    method: 'DELETE',
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`HTTP ${res.status}`)
  return json
}

export async function saveProductPageSections(pageId: number, sections: any[]) {
  if (typeof window === 'undefined') {
    try {
      const { prisma } = await import('@/lib/prisma')
      const numId = Number(pageId)
      await prisma.productPageSection.deleteMany({ where: { productPageId: numId } })
      for (let i = 0; i < sections.length; i++) {
        const s = sections[i]
        await prisma.productPageSection.create({
          data: {
            productPageId: numId,
            type: s.type,
            data: typeof s.data === 'string' ? s.data : JSON.stringify(s.data || {}),
            isActive: s.isActive ?? true,
            order: i + 1,
          },
        })
      }
      return { success: true }
    } catch (err) {
      console.error('Prisma saveProductPageSections error:', err)
    }
  }

  // PHP route: POST /api/product-pages/{id}/save-sections
  const res = await fetch(`${getLaravelWriteUrl()}/product-pages/${pageId}/save-sections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sections }),
  })
  const json = await safeJson(res)
  if (!json) throw new Error(`HTTP ${res.status}`)
  return json
}

// ----------------------------------------------------
// General Pages API (MySQL + Prisma + Laravel)
// ----------------------------------------------------
export async function getGeneralPages() {
  if (typeof window === 'undefined') {
    try {
      const { prisma } = await import('@/lib/prisma')
      return await prisma.generalPage.findMany({ orderBy: { id: 'asc' } })
    } catch (e) {
      console.error('Error fetching general pages with prisma:', e)
    }
  }

  try {
    const res = await fetch(`${getApiUrl()}/general-pages`, { cache: 'no-store' })
    const json = await safeJson(res)
    if (json && Array.isArray(json)) return json
  } catch (e) {}

  try {
    const res = await fetch('/api/general-pages', { cache: 'no-store' })
    const json = await safeJson(res)
    if (json && Array.isArray(json)) return json
  } catch (e) {}

  return []
}

export async function getGeneralPageBySlug(slug: string) {
  const cleanSlug = slug.replace(/^\//, '').trim().toLowerCase()
  if (typeof window === 'undefined') {
    try {
      const { prisma } = await import('@/lib/prisma')
      return await prisma.generalPage.findUnique({ where: { slug: cleanSlug } })
    } catch (e) {
      console.error('Error fetching general page with prisma:', e)
    }
  }

  try {
    const res = await fetch(`${getApiUrl()}/general-pages/slug/${cleanSlug}`, { cache: 'no-store' })
    const json = await safeJson(res)
    if (json && json.slug) return json
  } catch (e) {}

  try {
    const res = await fetch(`/api/general-pages?slug=${cleanSlug}`, { cache: 'no-store' })
    const json = await safeJson(res)
    if (json && json.slug) return json
  } catch (e) {}

  return null
}

export async function saveGeneralPage(pageData: any) {
  // PHP route: POST /api/general-pages
  try {
    const res = await fetch(`${getLaravelWriteUrl()}/general-pages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pageData),
    })
    const json = await safeJson(res)
    if (json) return json
  } catch (e) {}

  return null
}

export async function deleteGeneralPage(idOrSlug: string | number) {
  // PHP route: DELETE /api/general-pages/{id}
  try {
    const res = await fetch(`${getLaravelWriteUrl()}/general-pages/${idOrSlug}`, {
      method: 'DELETE',
    })
    const json = await safeJson(res)
    if (json) return json
  } catch (e) {}

  return null
}

