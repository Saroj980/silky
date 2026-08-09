'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateSlide(id: number, data: any) {
  try {
    const updatedSlide = await prisma.heroSlide.update({
      where: { id },
      data: {
        tagline: data.tagline ?? '',
        title: data.title ?? '',
        description: data.description ?? '',
        primaryBtnText: data.primaryBtnText ?? '',
        primaryBtnHref: data.primaryBtnHref ?? '',
        secondaryBtnText: data.secondaryBtnText ?? '',
        secondaryBtnHref: data.secondaryBtnHref ?? '',
        image: data.image ?? '',
        imageAlt: data.imageAlt ?? '',
        badgeText: data.badgeText ?? '',
        trustBadges: typeof data.trustBadges === 'string' ? data.trustBadges : JSON.stringify(data.trustBadges ?? []),
        textColor: data.textColor ?? '#1F2A37',
        textAlignment: data.textAlignment ?? 'Left',
        overlayEnabled: data.overlayEnabled ?? 'true',
        overlayOpacity: data.overlayOpacity ?? '60',
      },
    })

    revalidatePath('/')
    revalidatePath('/admin')
    return updatedSlide
  } catch (err) {
    console.warn('Prisma update fallback for HeroSlide:', err)
    const updatedSlide = await prisma.heroSlide.update({
      where: { id },
      data: {
        tagline: data.tagline ?? '',
        title: data.title ?? '',
        description: data.description ?? '',
        primaryBtnText: data.primaryBtnText ?? '',
        primaryBtnHref: data.primaryBtnHref ?? '',
        secondaryBtnText: data.secondaryBtnText ?? '',
        secondaryBtnHref: data.secondaryBtnHref ?? '',
        image: data.image ?? '',
        imageAlt: data.imageAlt ?? '',
        badgeText: data.badgeText ?? '',
        trustBadges: typeof data.trustBadges === 'string' ? data.trustBadges : JSON.stringify(data.trustBadges ?? []),
      },
    })

    revalidatePath('/')
    revalidatePath('/admin')
    return updatedSlide
  }
}

export async function createSlide(data: any = {}) {
  try {
    const newSlide = await prisma.heroSlide.create({
      data: {
        tagline: data.tagline || 'New Tagline',
        title: data.title || 'New Slide Title',
        description: data.description || 'Description for your new slide goes here.',
        primaryBtnText: data.primaryBtnText || 'Get Started',
        primaryBtnHref: data.primaryBtnHref || '#',
        secondaryBtnText: data.secondaryBtnText || 'Learn More',
        secondaryBtnHref: data.secondaryBtnHref || '#',
        image: data.image || '/homepage-image/Homepage (9).jpg',
        imageAlt: data.imageAlt || 'New slide image',
        badgeText: data.badgeText || 'Premium Quality',
        trustBadges: typeof data.trustBadges === 'string' ? data.trustBadges : JSON.stringify(data.trustBadges || ['Fast Delivery', 'High Quality']),
        textColor: data.textColor || '#1F2A37',
        textAlignment: data.textAlignment || 'Left',
        overlayEnabled: data.overlayEnabled || 'true',
        overlayOpacity: data.overlayOpacity || '60',
      },
    })

    revalidatePath('/')
    revalidatePath('/admin')
    return newSlide
  } catch (err) {
    console.warn('Prisma create fallback for HeroSlide:', err)
    const newSlide = await prisma.heroSlide.create({
      data: {
        tagline: data.tagline || 'New Tagline',
        title: data.title || 'New Slide Title',
        description: data.description || 'Description for your new slide goes here.',
        primaryBtnText: data.primaryBtnText || 'Get Started',
        primaryBtnHref: data.primaryBtnHref || '#',
        secondaryBtnText: data.secondaryBtnText || 'Learn More',
        secondaryBtnHref: data.secondaryBtnHref || '#',
        image: data.image || '/homepage-image/Homepage (9).jpg',
        imageAlt: data.imageAlt || 'New slide image',
        badgeText: data.badgeText || 'Premium Quality',
        trustBadges: JSON.stringify({
          badges: ['Fast Delivery', 'High Quality'],
          textColor: '#1F2A37',
          textAlignment: 'Left',
          overlayEnabled: 'true',
          overlayOpacity: '60',
          status: 'Active',
        }),
      },
    })

    revalidatePath('/')
    revalidatePath('/admin')
    return newSlide
  }
}

export async function deleteSlide(id: number) {
  await prisma.heroSlide.delete({
    where: { id },
  })

  revalidatePath('/')
  revalidatePath('/admin')
  return { success: true }
}

export async function updateSiteConfig(data: any) {
  const updatedConfig = await prisma.siteConfig.update({
    where: { id: 1 },
    data: {
      logoUrl: data.logoUrl ?? '',
      logoAlt: data.logoAlt ?? '',
      topBarText: data.topBarText ?? '',
      phone: data.phone ?? '',
      email: data.email ?? '',
      whatsapp: data.whatsapp ?? '',
      navLinks: typeof data.navLinks === 'string' ? data.navLinks : JSON.stringify(data.navLinks ?? []),
      primaryColor: data.primaryColor ?? '#DE7B3D',
      bgColor: data.bgColor ?? '#F7F5F2',
      textColor: data.textColor ?? '#1F2A37',
      headingFont: data.headingFont ?? 'inter',
      bodyFont: data.bodyFont ?? 'inter',
    },
  })

  revalidatePath('/')
  revalidatePath('/admin')
  return updatedConfig
}

export async function createPageSection(type: string, data: any) {
  // Find highest order
  const lastSection = await prisma.pageSection.findFirst({
    orderBy: { order: 'desc' }
  })
  const newOrder = lastSection ? lastSection.order + 1 : 1

  const newSection = await prisma.pageSection.create({
    data: {
      type,
      order: newOrder,
      data: JSON.stringify(data),
      isActive: true,
    }
  })

  revalidatePath('/')
  revalidatePath('/admin')
  return newSection
}

export async function updatePageSection(id: number, dataStr: string, isActive: boolean) {
  const updatedSection = await prisma.pageSection.update({
    where: { id },
    data: {
      data: dataStr,
      isActive
    }
  })

  revalidatePath('/')
  revalidatePath('/admin')
  return updatedSection
}

export async function updateSectionOrder(sections: {id: number, order: number}[]) {
  for (const s of sections) {
    await prisma.pageSection.update({
      where: { id: s.id },
      data: { order: s.order }
    })
  }

  revalidatePath('/')
  revalidatePath('/admin')
  return { success: true }
}

export async function deletePageSection(id: number) {
  await prisma.pageSection.delete({
    where: { id }
  })
  
  revalidatePath('/')
  revalidatePath('/admin')
  return { success: true }
}
