import * as laravelApi from '@/lib/laravel-api'

const safeRevalidate = (path: string, type?: string) => {
  // Revalidation handled on client side in static export
}

export async function updateSlide(id: number, data: any) {
  try {
    const updatedSlide = await laravelApi.updateHeroSlide(id, data)
    safeRevalidate('/')
    safeRevalidate('/admin')
    return updatedSlide
  } catch (err) {
    console.error('Error updating slide:', err)
    return { id, ...data }
  }
}

export async function createSlide(data: any = {}) {
  try {
    const newSlide = await laravelApi.createHeroSlide(data)
    safeRevalidate('/')
    safeRevalidate('/admin')
    return newSlide
  } catch (err) {
    console.error('Error creating slide:', err)
    return { id: Date.now(), ...data }
  }
}

export async function deleteSlide(id: number) {
  try {
    await laravelApi.deleteHeroSlide(id)
    safeRevalidate('/')
    safeRevalidate('/admin')
    return { success: true }
  } catch (err) {
    console.error('Error deleting slide:', err)
    return { success: false }
  }
}

export async function updateSiteConfig(data: any) {
  try {
    const updatedConfig = await laravelApi.updateSiteConfig(data)
    safeRevalidate('/')
    safeRevalidate('/admin')
    return updatedConfig
  } catch (err) {
    console.error('Error updating site config:', err)
    return data
  }
}

export async function createPageSection(type: string, data: any) {
  try {
    const newSection = await laravelApi.createPageSection(type, data)
    safeRevalidate('/')
    safeRevalidate('/admin')
    return newSection
  } catch (err) {
    console.error('Error creating page section:', err)
    return { id: Date.now(), type, data: JSON.stringify(data), isActive: true }
  }
}

export async function updatePageSection(id: number, dataStr: string, isActive: boolean) {
  try {
    const updatedSection = await laravelApi.updatePageSection(id, dataStr, isActive)
    safeRevalidate('/')
    safeRevalidate('/admin')
    return updatedSection
  } catch (err) {
    console.error('Error updating page section:', err)
    return { id, data: dataStr, isActive }
  }
}

export async function updateSectionOrder(sections: { id: number; order: number }[]) {
  try {
    await laravelApi.updateSectionOrder(sections)
    safeRevalidate('/')
    safeRevalidate('/admin')
    return { success: true }
  } catch (err) {
    console.error('Error reordering section:', err)
    return { success: false }
  }
}

export async function deletePageSection(id: number) {
  try {
    await laravelApi.deletePageSection(id)
    safeRevalidate('/')
    safeRevalidate('/admin')
    return { success: true }
  } catch (err) {
    console.error('Error deleting section:', err)
    return { success: false }
  }
}

// ----------------------------------------------------------------------
// PRODUCT PAGE CMS ACTIONS (Full Section & Item CRUD)
// ----------------------------------------------------------------------

export async function getProductPagesAction() {
  try {
    const apiPages = await laravelApi.getProductPages()
    if (Array.isArray(apiPages)) {
      return apiPages
    }
    return []
  } catch (err) {
    console.error('Error fetching product pages:', err)
    return []
  }
}

export async function createProductPageAction(data: { slug: string; title: string; category: string; heroImage: string }) {
  try {
    const newPage = await laravelApi.createProductPage(data)
    safeRevalidate('/products/[slug]', 'page')
    safeRevalidate('/admin')
    return newPage
  } catch (err) {
    console.error('Error creating product page:', err)
    throw err
  }
}

export async function deleteProductPageAction(slug: string) {
  try {
    await laravelApi.deleteProductPage(slug)
    safeRevalidate('/products/[slug]', 'page')
    safeRevalidate('/admin')
    return { success: true }
  } catch (err) {
    console.error('Error deleting product page:', err)
    throw err
  }
}

export async function saveProductPageSectionsAction(slug: string, sectionsArr: any[]) {
  try {
    const apiPage = await laravelApi.getProductPageBySlug(slug)
    if (apiPage && apiPage.id) {
      await laravelApi.saveProductPageSections(apiPage.id, sectionsArr)
    } else {
      // Create or update via product-pages POST endpoint
      await laravelApi.createProductPage({ slug, sections: sectionsArr })
    }
    safeRevalidate('/products/[slug]', 'page')
    safeRevalidate(`/products/${slug}`, 'page')
    safeRevalidate('/admin')
    return { success: true }
  } catch (err) {
    console.error('Error saving product page sections:', err)
    throw err
  }
}
