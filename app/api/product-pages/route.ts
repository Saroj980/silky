export const dynamic = 'force-dynamic'
export const revalidate = 0
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    const id = searchParams.get('id')

    if (slug || id) {
      const page = await prisma.productPage.findFirst({
        where: slug ? { slug } : { id: Number(id) },
        include: {
          sections: {
            orderBy: { order: 'asc' },
          },
        },
      })
      return NextResponse.json(page)
    }

    const pages = await prisma.productPage.findMany({
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(pages)
  } catch (error: any) {
    console.error('Error fetching product pages:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { slug, sections, ...pageData } = body

    if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })

    let productPage = await prisma.productPage.findUnique({
      where: { slug },
      include: { sections: true },
    })

    if (!productPage) {
      productPage = await prisma.productPage.create({
        data: {
          slug,
          title: pageData.title || 'Pure Cotton Shirts Supplier in UAE',
          category: pageData.category || 'Corporate Apparel',
          heroImage: pageData.heroImage || '/images/textile_fabric_rolls.png',
          isPublished: pageData.isPublished ?? true,
          metaTitle: pageData.metaTitle || null,
          metaDescription: pageData.metaDescription || null,
        },
        include: { sections: true },
      })
    } else {
      // Update page-level fields if provided
      const updateData: any = {}
      if (pageData.title !== undefined) updateData.title = pageData.title
      if (pageData.category !== undefined) updateData.category = pageData.category
      if (pageData.heroImage !== undefined) updateData.heroImage = pageData.heroImage
      if (pageData.isPublished !== undefined) updateData.isPublished = Boolean(pageData.isPublished)
      if (pageData.metaTitle !== undefined) updateData.metaTitle = pageData.metaTitle
      if (pageData.metaDescription !== undefined) updateData.metaDescription = pageData.metaDescription

      if (Object.keys(updateData).length > 0) {
        productPage = await prisma.productPage.update({
          where: { id: productPage.id },
          data: updateData,
          include: { sections: true },
        })
      }
    }

    if (Array.isArray(sections)) {
      await prisma.productPageSection.deleteMany({
        where: { productPageId: productPage.id },
      })

      for (let i = 0; i < sections.length; i++) {
        const s = sections[i]
        await prisma.productPageSection.create({
          data: {
            productPageId: productPage.id,
            type: s.type,
            data: typeof s.data === 'string' ? s.data : JSON.stringify(s.data || {}),
            isActive: s.isActive ?? true,
            order: i + 1,
          },
        })
      }
    }

    const updated = await prisma.productPage.findUnique({
      where: { slug },
      include: { sections: { orderBy: { order: 'asc' } } },
    })

    return NextResponse.json(updated)
  } catch (error: any) {
    console.error('Error saving product page:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  return POST(req)
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    const id = searchParams.get('id')

    if (!slug && !id) return NextResponse.json({ error: 'Missing slug or id' }, { status: 400 })

    const page = await prisma.productPage.findFirst({
      where: slug ? { slug } : { id: Number(id) },
    })

    if (page) {
      // First delete associated child sections to prevent foreign key errors
      await prisma.productPageSection.deleteMany({
        where: { productPageId: page.id },
      })

      await prisma.productPage.delete({
        where: { id: page.id },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting product page:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
