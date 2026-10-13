export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const DEFAULT_FOOTER = {
  logoUrl: '/silky-logo.png',
  logoAlt: 'Silky Textiles & Garments LLC Dubai',
  description: "Dubai's premier destination for master bespoke tailoring, high-quality textiles, and corporate uniform manufacturing since 1963.",
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  linkedinUrl: 'https://linkedin.com',
  col1Title: 'Sectors',
  col1Links: [
    { label: '100% Pure Cotton Shirting', url: '/products/pure-cotton-shirts-supplier-in-uae' },
    { label: 'Corporate & Executive', url: '/products/pure-cotton-shirts-supplier-in-uae' },
    { label: 'Hospitality & Dining', url: '/products/pure-cotton-shirts-supplier-in-uae' },
    { label: 'Healthcare & Clinical', url: '/products/pure-cotton-shirts-supplier-in-uae' },
    { label: 'Embroidery Branding', url: '/products/pure-cotton-shirts-supplier-in-uae' },
  ],
  col2Title: 'Company',
  col2Links: [
    { label: 'Our Heritage', url: '/about-us' },
    { label: 'ISO Certification', url: '/about-us' },
    { label: 'Why Choose Silky', url: '/#why-silky' },
    { label: 'Dubai Showroom', url: '/contact-us' },
  ],
  contactTitle: 'Showroom Location',
  address: "Baniyas Road (D85), Deira Creek\nPO Box 792, Dubai, UAE",
  phone: '+971 4 226 1050',
  email: 'sales@silky.ae',
  trnText: 'TRN: 10000 253 930 0003',
  copyrightText: `© ${new Date().getFullYear()} Silky Textiles & Garments LLC. All rights reserved.`,
  privacyPolicyHref: '#',
  termsHref: '#',
}

export async function GET() {
  try {
    const section = await prisma.pageSection.findFirst({
      where: { type: 'FOOTER' },
    })

    if (section && section.data) {
      try {
        const parsed = JSON.parse(section.data)
        if (parsed && typeof parsed === 'object') {
          return NextResponse.json({ ...DEFAULT_FOOTER, ...parsed })
        }
      } catch {}
    }

    return NextResponse.json(DEFAULT_FOOTER)
  } catch (error: any) {
    console.error('Error fetching footer config:', error)
    return NextResponse.json(DEFAULT_FOOTER)
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const existing = await prisma.pageSection.findFirst({
      where: { type: 'FOOTER' },
    })

    let current = { ...DEFAULT_FOOTER }
    if (existing && existing.data) {
      try {
        current = { ...current, ...JSON.parse(existing.data) }
      } catch {}
    }

    const merged = { ...current, ...body }

    if (existing) {
      await prisma.pageSection.update({
        where: { id: existing.id },
        data: { data: JSON.stringify(merged) },
      })
    } else {
      await prisma.pageSection.create({
        data: {
          type: 'FOOTER',
          order: 998,
          isActive: true,
          data: JSON.stringify(merged),
        },
      })
    }

    return NextResponse.json({ message: 'Footer config updated successfully', data: merged })
  } catch (error: any) {
    console.error('Error updating footer config:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  return PUT(req)
}
