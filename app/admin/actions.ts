'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import * as laravelApi from '@/lib/laravel-api'

export async function updateSlide(id: number, data: any) {
  try {
    const updatedSlide = await laravelApi.updateHeroSlide(id, data)
    revalidatePath('/')
    revalidatePath('/admin')
    return updatedSlide
  } catch (err) {
    console.error('Error updating slide via Laravel API, trying Prisma:', err)
    const slide = await prisma.heroSlide.update({
      where: { id },
      data: {
        tagline: data.tagline,
        title: data.title,
        description: data.description,
        primaryBtnText: data.primaryBtnText,
        primaryBtnHref: data.primaryBtnHref,
        secondaryBtnText: data.secondaryBtnText,
        secondaryBtnHref: data.secondaryBtnHref,
        image: data.image,
        imageAlt: data.imageAlt || '',
        badgeText: data.badgeText || '',
        trustBadges: data.trustBadges || '[]',
        textColor: data.textColor || '#1F2A37',
        textAlignment: data.textAlignment || 'Left',
        overlayEnabled: data.overlayEnabled || 'true',
        overlayOpacity: data.overlayOpacity || '60',
      },
    })
    revalidatePath('/')
    revalidatePath('/admin')
    return slide
  }
}

export async function createSlide(data: any = {}) {
  try {
    const newSlide = await laravelApi.createHeroSlide(data)
    revalidatePath('/')
    revalidatePath('/admin')
    return newSlide
  } catch (err) {
    console.error('Error creating slide via Laravel API, trying Prisma:', err)
    const slide = await prisma.heroSlide.create({
      data: {
        tagline: data.tagline || 'NEW SLIDE',
        title: data.title || 'New Hero Banner',
        description: data.description || 'Description goes here...',
        primaryBtnText: data.primaryBtnText || 'Learn More',
        primaryBtnHref: data.primaryBtnHref || '#',
        secondaryBtnText: data.secondaryBtnText || 'Contact Us',
        secondaryBtnHref: data.secondaryBtnHref || '#contact',
        image: data.image || '/images/textile_fabric_rolls.png',
        imageAlt: data.imageAlt || 'Hero Banner Image',
        badgeText: data.badgeText || 'Special Offer',
        trustBadges: data.trustBadges || '[]',
        textColor: data.textColor || '#1F2A37',
        textAlignment: data.textAlignment || 'Left',
        overlayEnabled: data.overlayEnabled || 'true',
        overlayOpacity: data.overlayOpacity || '60',
      },
    })
    revalidatePath('/')
    revalidatePath('/admin')
    return slide
  }
}

export async function deleteSlide(id: number) {
  try {
    await laravelApi.deleteHeroSlide(id)
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (err) {
    console.error('Error deleting slide via Laravel API, trying Prisma:', err)
    await prisma.heroSlide.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  }
}

export async function updateSiteConfig(data: any) {
  try {
    const updatedConfig = await laravelApi.updateSiteConfig(data)
    revalidatePath('/')
    revalidatePath('/admin')
    return updatedConfig
  } catch (err) {
    console.error('Error updating site config via Laravel API, trying Prisma:', err)
    const config = await prisma.siteConfig.upsert({
      where: { id: 1 },
      update: {
        logoUrl: data.logoUrl,
        logoAlt: data.logoAlt || 'Silky Logo',
        topBarText: data.topBarText || '',
        phone: data.phone || '',
        email: data.email || '',
        whatsapp: data.whatsapp || '',
        navLinks: typeof data.navLinks === 'string' ? data.navLinks : JSON.stringify(data.navLinks || []),
      },
      create: {
        id: 1,
        logoUrl: data.logoUrl || '/silky-logo.png',
        logoAlt: data.logoAlt || 'Silky Logo',
        topBarText: data.topBarText || '',
        phone: data.phone || '',
        email: data.email || '',
        whatsapp: data.whatsapp || '',
        navLinks: typeof data.navLinks === 'string' ? data.navLinks : JSON.stringify(data.navLinks || []),
      },
    })
    revalidatePath('/')
    revalidatePath('/admin')
    return config
  }
}

export async function createPageSection(type: string, data: any) {
  try {
    const newSection = await laravelApi.createPageSection(type, data)
    revalidatePath('/')
    revalidatePath('/admin')
    return newSection
  } catch (err) {
    console.error('Error creating page section via Laravel API, trying Prisma:', err)
    const count = await prisma.pageSection.count()
    const section = await prisma.pageSection.create({
      data: {
        type,
        order: count + 1,
        data: typeof data === 'string' ? data : JSON.stringify(data || {}),
        isActive: true,
      },
    })
    revalidatePath('/')
    revalidatePath('/admin')
    return section
  }
}

export async function updatePageSection(id: number, dataStr: string, isActive: boolean) {
  try {
    const updatedSection = await laravelApi.updatePageSection(id, dataStr, isActive)
    revalidatePath('/')
    revalidatePath('/admin')
    return updatedSection
  } catch (err) {
    console.error('Error updating page section via Laravel API, trying Prisma:', err)
    const section = await prisma.pageSection.update({
      where: { id },
      data: {
        data: dataStr,
        isActive,
      },
    })
    revalidatePath('/')
    revalidatePath('/admin')
    return section
  }
}

export async function updateSectionOrder(sections: { id: number; order: number }[]) {
  try {
    await laravelApi.updateSectionOrder(sections)
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (err) {
    console.error('Error reordering section via Laravel API, trying Prisma:', err)
    for (const item of sections) {
      await prisma.pageSection.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    }
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  }
}

export async function deletePageSection(id: number) {
  try {
    await laravelApi.deletePageSection(id)
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (err) {
    console.error('Error deleting section via Laravel API, trying Prisma:', err)
    await prisma.pageSection.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  }
}

// ----------------------------------------------------------------------
// PRODUCT PAGE CMS ACTIONS (Full Section & Item CRUD)
// ----------------------------------------------------------------------

export async function getProductPagesAction() {
  try {
    const pages = await prisma.productPage.findMany({
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    })
    return pages
  } catch (err) {
    console.error('Error fetching product pages via Prisma:', err)
    return []
  }
}

export async function createProductPageAction(data: { slug: string; title: string; category: string; heroImage: string }) {
  try {
    const newPage = await prisma.productPage.create({
      data: {
        slug: data.slug,
        title: data.title,
        category: data.category,
        heroImage: data.heroImage,
        isPublished: true,
      },
    })
    revalidatePath('/products/[slug]', 'page')
    revalidatePath('/admin')
    return newPage
  } catch (err) {
    console.error('Error creating product page:', err)
    throw err
  }
}

export async function saveProductPageSectionsAction(slug: string, sectionsArr: any[]) {
  try {
    let productPage = await prisma.productPage.findUnique({
      where: { slug },
      include: { sections: true },
    })

    if (!productPage) {
      productPage = await prisma.productPage.create({
        data: {
          slug,
          title: 'Pure Cotton Shirts Supplier in UAE',
          category: 'Corporate Apparel',
          heroImage: '/images/textile_fabric_rolls.png',
          isPublished: true,
        },
        include: { sections: true },
      })
    }

    // Delete existing sections for this page and re-create in exact order & data
    await prisma.productPageSection.deleteMany({
      where: { productPageId: productPage.id },
    })

    for (let i = 0; i < sectionsArr.length; i++) {
      const s = sectionsArr[i]
      await prisma.productPageSection.create({
        data: {
          productPageId: productPage.id,
          type: s.type,
          order: i + 1,
          isActive: s.isActive ?? true,
          data: typeof s.data === 'string' ? s.data : JSON.stringify(s.data || {}),
        },
      })
    }

    revalidatePath('/products/[slug]', 'page')
    revalidatePath(`/products/${slug}`, 'page')
    revalidatePath('/admin')
    return { success: true }
  } catch (err) {
    console.error('Error saving product page sections:', err)
    throw err
  }
}
