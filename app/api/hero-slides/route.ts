export const dynamic = 'force-dynamic'
export const revalidate = 0
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { id: 'asc' },
    })
    return NextResponse.json(slides)
  } catch (error: any) {
    console.error('Error fetching hero slides:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const slide = await prisma.heroSlide.create({
      data: {
        tagline: body.tagline || 'NEW SLIDE',
        title: body.title || 'New Hero Banner',
        description: body.description || 'Enter slide description here...',
        primaryBtnText: body.primaryBtnText || 'Request Quote',
        primaryBtnHref: body.primaryBtnHref || '#contact',
        secondaryBtnText: body.secondaryBtnText || 'Learn More',
        secondaryBtnHref: body.secondaryBtnHref || '#services',
        image: body.image || '/images/hero_corporate_uniforms.png',
        imageAlt: body.imageAlt || 'Hero Banner Image',
        badgeText: body.badgeText || 'Dubai Tailoring',
        trustBadges: typeof body.trustBadges === 'string' ? body.trustBadges : JSON.stringify(body.trustBadges || []),
      },
    })
    return NextResponse.json(slide)
  } catch (error: any) {
    console.error('Error creating hero slide:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, ...data } = body
    const numId = Number(id)

    const slideData = {
      ...(data.tagline !== undefined && { tagline: data.tagline }),
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.primaryBtnText !== undefined && { primaryBtnText: data.primaryBtnText }),
      ...(data.primaryBtnHref !== undefined && { primaryBtnHref: data.primaryBtnHref }),
      ...(data.secondaryBtnText !== undefined && { secondaryBtnText: data.secondaryBtnText }),
      ...(data.secondaryBtnHref !== undefined && { secondaryBtnHref: data.secondaryBtnHref }),
      ...(data.image !== undefined && { image: data.image }),
      ...(data.imageAlt !== undefined && { imageAlt: data.imageAlt }),
      ...(data.badgeText !== undefined && { badgeText: data.badgeText }),
      ...(data.trustBadges !== undefined && {
        trustBadges: typeof data.trustBadges === 'string' ? data.trustBadges : JSON.stringify(data.trustBadges || [])
      }),
    }

    if (numId && !isNaN(numId)) {
      const existing = await prisma.heroSlide.findUnique({ where: { id: numId } })
      if (existing) {
        const updated = await prisma.heroSlide.update({
          where: { id: numId },
          data: slideData,
        })
        return NextResponse.json(updated)
      }
    }

    const created = await prisma.heroSlide.create({
      data: {
        tagline: data.tagline || 'NEW SLIDE',
        title: data.title || 'New Hero Banner',
        description: data.description || 'Enter slide description here...',
        primaryBtnText: data.primaryBtnText || 'Request Quote',
        primaryBtnHref: data.primaryBtnHref || '#contact',
        secondaryBtnText: data.secondaryBtnText || 'Learn More',
        secondaryBtnHref: data.secondaryBtnHref || '#services',
        image: data.image || '/images/hero_corporate_uniforms.png',
        imageAlt: data.imageAlt || 'Hero Banner Image',
        badgeText: data.badgeText || 'Dubai Tailoring',
        trustBadges: typeof data.trustBadges === 'string' ? data.trustBadges : JSON.stringify(data.trustBadges || []),
      },
    })
    return NextResponse.json(created)
  } catch (error: any) {
    console.error('Error updating hero slide:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing slide id' }, { status: 400 })

    const numId = Number(id)
    if (!isNaN(numId)) {
      await prisma.heroSlide.deleteMany({
        where: { id: numId },
      })
    }
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting hero slide:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
