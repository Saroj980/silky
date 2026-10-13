import React from 'react'
import { notFound } from 'next/navigation'
import { getProductPageBySlug, getProductPages, getSiteConfig } from '@/lib/laravel-api'
import { ProductPageClient } from './product-page-client'

export const dynamicParams = false

const KNOWN_PRODUCT_SLUGS = [
  'pure-cotton-shirts-supplier-in-uae',
]

export async function generateStaticParams() {
  const slugs = new Set(KNOWN_PRODUCT_SLUGS)
  try {
    const apiPages = await getProductPages()
    if (Array.isArray(apiPages)) {
      apiPages.forEach((p: any) => {
        if (p?.slug) slugs.add(p.slug)
      })
    }
  } catch (e) {
    console.error('generateStaticParams error:', e)
  }
  return Array.from(slugs).map((slug) => ({ slug }))
}

async function getProductPageData(slug: string) {
  // Direct Laravel API
  const apiPage = await getProductPageBySlug(slug)
  if (apiPage) return apiPage

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
