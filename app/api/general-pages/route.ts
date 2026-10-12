export const dynamic = 'force-dynamic'
export const revalidate = 0
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')

    if (slug) {
      const page = await prisma.generalPage.findUnique({
        where: { slug },
      })
      if (!page) {
        return NextResponse.json({ message: 'Page not found' }, { status: 404 })
      }
      return NextResponse.json(page)
    }

    const pages = await prisma.generalPage.findMany({
      orderBy: { id: 'asc' },
    })
    return NextResponse.json(pages)
  } catch (error: any) {
    console.error('Error fetching general pages:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      title,
      slug,
      subtitle,
      pageType,
      status,
      isActive,
      featuredImage,
      content,
      seoTitle,
      seoDescription,
      seoKeywords,
      ogImage,
      allowIndexing,
      author,
    } = body

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and Slug are required' }, { status: 400 })
    }

    const cleanSlug = slug.replace(/^\//, '').trim().toLowerCase()

    const page = await prisma.generalPage.upsert({
      where: { slug: cleanSlug },
      update: {
        title,
        subtitle: subtitle || null,
        pageType: pageType || 'General Page',
        status: status || 'Published',
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        featuredImage: featuredImage || null,
        content: content || null,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        seoKeywords: seoKeywords || null,
        ogImage: ogImage || null,
        allowIndexing: allowIndexing !== undefined ? Boolean(allowIndexing) : true,
        author: author || 'Silky Team',
      },
      create: {
        title,
        slug: cleanSlug,
        subtitle: subtitle || null,
        pageType: pageType || 'General Page',
        status: status || 'Published',
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        featuredImage: featuredImage || null,
        content: content || null,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        seoKeywords: seoKeywords || null,
        ogImage: ogImage || null,
        allowIndexing: allowIndexing !== undefined ? Boolean(allowIndexing) : true,
        author: author || 'Silky Team',
      },
    })

    return NextResponse.json(page, { status: 201 })
  } catch (error: any) {
    console.error('Error creating/updating general page:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const slug = searchParams.get('slug')

    if (id && !isNaN(Number(id))) {
      await prisma.generalPage.delete({ where: { id: Number(id) } })
      return NextResponse.json({ message: 'Deleted successfully' })
    } else if (slug) {
      await prisma.generalPage.delete({ where: { slug } })
      return NextResponse.json({ message: 'Deleted successfully' })
    }

    return NextResponse.json({ error: 'ID or slug required' }, { status: 400 })
  } catch (error: any) {
    console.error('Error deleting general page:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
