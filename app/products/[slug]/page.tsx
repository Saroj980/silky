import React from 'react'
import { notFound } from 'next/navigation'
import { getProductPageBySlug, getSiteConfig } from '@/lib/laravel-api'
import { prisma } from '@/lib/prisma'
import { ProductPageClient } from './product-page-client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getProductPageData(slug: string) {
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

  const apiPage = await getProductPageBySlug(slug)
  if (apiPage) return apiPage

  if (slug === 'pure-cotton-shirts-supplier-in-uae') {
    return {
      id: 1,
      slug: 'pure-cotton-shirts-supplier-in-uae',
      title: '100% Pure Cotton Shirts Supplier in UAE',
      category: 'Corporate Apparel',
      heroImage: '/images/textile_fabric_rolls.png',
      sections: [],
    }
  }

  return null
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
