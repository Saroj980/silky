import React from 'react'
import { notFound } from 'next/navigation'
import { getProductPageBySlug, getSiteConfig } from '@/lib/laravel-api'
import { prisma } from '@/lib/prisma'
import { ProductPageClient } from './product-page-client'

export const dynamicParams = false

const KNOWN_PRODUCT_SLUGS = [
  'pure-cotton-shirts-supplier-in-uae',
]

export async function generateStaticParams() {
  const slugs = new Set(KNOWN_PRODUCT_SLUGS)
  try {
    const dbPages = await prisma.productPage.findMany({
      select: { slug: true },
    })
    dbPages.forEach((p) => {
      if (p.slug) slugs.add(p.slug)
    })
  } catch (e) {
    console.error('generateStaticParams error:', e)
  }
  return Array.from(slugs).map((slug) => ({ slug }))
}

async function getProductPageData(slug: string) {
  // 1. Primary Source of Truth: MySQL (Laravel API)
  const apiPage = await getProductPageBySlug(slug)
  if (apiPage) return apiPage

  // 2. Fallback: Prisma MySQL
  try {
    const dbPage = await prisma.productPage.findUnique({
      where: { slug },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    })
    if (dbPage) return dbPage
  } catch (e) {
    console.error('Error reading product page from Prisma:', e)
  }

  const formattedTitle = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return {
    id: 1,
    slug,
    title: formattedTitle,
    category: 'Corporate Apparel & Textiles',
    heroImage: '/images/textile_fabric_rolls.png',
    sections: [],
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pageData = await getProductPageData(slug)
  if (!pageData) return { title: 'Product Page Not Found' }

  return {
    title: pageData.metaTitle || `${pageData.title} | Silky Textiles Dubai`,
    description: pageData.metaDescription || `Direct manufacturer and supplier of ${pageData.title} in Dubai, UAE.`,
  }
}

export default async function ProductIndividualPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pageData = await getProductPageData(slug)
  const config = await getSiteConfig()

  if (!pageData) {
    notFound()
  }

  return <ProductPageClient page={pageData} config={config} />
}
