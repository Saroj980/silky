const LARAVEL_API_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://127.0.0.1:8000/api'

export async function getHeroSlides() {
  try {
    const res = await fetch(`${LARAVEL_API_URL}/hero-slides`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Laravel API getHeroSlides error:', error)
    return []
  }
}

export async function createHeroSlide(data: any) {
  const res = await fetch(`${LARAVEL_API_URL}/hero-slides`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function updateHeroSlide(id: number, data: any) {
  const res = await fetch(`${LARAVEL_API_URL}/hero-slides/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function deleteHeroSlide(id: number) {
  const res = await fetch(`${LARAVEL_API_URL}/hero-slides/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function getSiteConfig() {
  try {
    const res = await fetch(`${LARAVEL_API_URL}/site-config`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  } catch (error) {
    console.error('Laravel API getSiteConfig error:', error)
    return null
  }
}

export async function updateSiteConfig(data: any) {
  const res = await fetch(`${LARAVEL_API_URL}/site-config`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function getPageSections() {
  try {
    const res = await fetch(`${LARAVEL_API_URL}/page-sections`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Laravel API getPageSections error:', error)
    return []
  }
}

export async function createPageSection(type: string, data: any) {
  const res = await fetch(`${LARAVEL_API_URL}/page-sections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function updatePageSection(id: number, dataStr: string, isActive: boolean) {
  const res = await fetch(`${LARAVEL_API_URL}/page-sections/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: dataStr, isActive }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function updateSectionOrder(sections: { id: number; order: number }[]) {
  const res = await fetch(`${LARAVEL_API_URL}/page-sections/reorder`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sections }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function deletePageSection(id: number) {
  const res = await fetch(`${LARAVEL_API_URL}/page-sections/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

// Product Pages API (MySQL)
export async function getProductPages() {
  try {
    const res = await fetch(`${LARAVEL_API_URL}/product-pages`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  } catch (error) {
    console.error('Laravel API getProductPages error:', error)
    return []
  }
}

export async function getProductPageBySlug(slug: string) {
  try {
    const res = await fetch(`${LARAVEL_API_URL}/product-pages/slug/${slug}`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  } catch (error) {
    console.error('Laravel API getProductPageBySlug error:', error)
    return null
  }
}

export async function createProductPage(data: any) {
  const res = await fetch(`${LARAVEL_API_URL}/product-pages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function updateProductPage(id: number, data: any) {
  const res = await fetch(`${LARAVEL_API_URL}/product-pages/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function deleteProductPage(id: number) {
  const res = await fetch(`${LARAVEL_API_URL}/product-pages/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function addProductPageSection(pageId: number, type: string, data: any) {
  const res = await fetch(`${LARAVEL_API_URL}/product-pages/${pageId}/sections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data: JSON.stringify(data), isActive: true }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function updateProductPageSection(sectionId: number, dataStr: string, isActive: boolean) {
  const res = await fetch(`${LARAVEL_API_URL}/product-pages/sections/${sectionId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: dataStr, isActive }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function deleteProductPageSection(sectionId: number) {
  const res = await fetch(`${LARAVEL_API_URL}/product-pages/sections/${sectionId}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
