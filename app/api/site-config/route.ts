export const dynamic = 'force-dynamic'
export const revalidate = 0
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const config = await prisma.siteConfig.findFirst()
    return NextResponse.json(config || {})
  } catch (error: any) {
    console.error('Error fetching site config:', error)
    return NextResponse.json({}, { status: 200 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const first = await prisma.siteConfig.findFirst()
    const targetId = first ? first.id : 1

    const updated = await prisma.siteConfig.upsert({
      where: { id: targetId },
      update: {
        logoUrl: body.logoUrl ?? '/silky-logo.png',
        logoAlt: body.logoAlt ?? 'Silky Logo',
        topBarText: body.topBarText ?? '',
        phone: body.phone ?? '',
        phoneSecondary: body.phoneSecondary ?? '',
        email: body.email ?? '',
        emailSecondary: body.emailSecondary ?? '',
        whatsapp: body.whatsapp ?? '',
        address: body.address ?? '',
        navLinks: typeof body.navLinks === 'string' ? body.navLinks : JSON.stringify(body.navLinks || []),
        ...(body.primaryColor && { primaryColor: body.primaryColor }),
        ...(body.bgColor && { bgColor: body.bgColor }),
        ...(body.textColor && { textColor: body.textColor }),
        ...(body.headingFont && { headingFont: body.headingFont }),
        ...(body.bodyFont && { bodyFont: body.bodyFont }),
        customFontUrl: body.customFontUrl !== undefined ? body.customFontUrl : null,
        customFontFamily: body.customFontFamily !== undefined ? body.customFontFamily : null,
      },
      create: {
        id: targetId,
        logoUrl: body.logoUrl || '/silky-logo.png',
        logoAlt: body.logoAlt || 'Silky Logo',
        topBarText: body.topBarText || 'Bespoke Corporate Uniforms & Textiles',
        phone: body.phone || '+971 4 355 8453',
        phoneSecondary: body.phoneSecondary || '+971 4 226 1050',
        email: body.email || 'sales@silky.ae',
        emailSecondary: body.emailSecondary || 'info@silky.ae',
        whatsapp: body.whatsapp || '+971 4 226 1050',
        address: body.address || 'Showroom No. 1, Al Zarooni Bldg, Next to HBL, Baniyas Road (D85), Deira Creek, Dubai, UAE',
        navLinks: typeof body.navLinks === 'string' ? body.navLinks : JSON.stringify(body.navLinks || []),
        primaryColor: body.primaryColor || '#DE7B3D',
        bgColor: body.bgColor || '#F7F5F2',
        textColor: body.textColor || '#1F2A37',
        headingFont: body.headingFont || 'inter',
        bodyFont: body.bodyFont || 'inter',
        customFontUrl: body.customFontUrl || null,
        customFontFamily: body.customFontFamily || null,
      },
    })
    return NextResponse.json(updated)
  } catch (error: any) {
    console.error('Error updating site config:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
