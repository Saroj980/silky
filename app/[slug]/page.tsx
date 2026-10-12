import React from 'react'
import { notFound } from 'next/navigation'
import { GeneralPageClient } from './general-page-client'
 
export const dynamicParams = false

export async function generateStaticParams() {
  return [
    { slug: 'about-us' },
    { slug: 'contact-us' },
    { slug: 'corporate-uniform-trends-uae-2026' },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  if (['admin', 'login', 'products', 'api'].includes(slug)) {
    return { title: 'Page Not Found' }
  }

  const title = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return {
    title: `${title} | Silky Textiles LLC Dubai`,
    description: `Official page for ${title} at Silky Textiles LLC, premier uniform supplier in Dubai & UAE.`,
  }
}

export default async function DynamicGeneralPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  if (['admin', 'login', 'products', 'api'].includes(slug)) {
    notFound()
  }

  return <GeneralPageClient slug={slug} />
}
