export const dynamic = 'force-dynamic'
export const revalidate = 0
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const numId = Number(id)
    if (isNaN(numId)) {
      return NextResponse.json({ error: 'Invalid product page ID' }, { status: 400 })
    }

    const body = await req.json()
    const sections = body.sections || []

    const productPage = await prisma.productPage.findUnique({
      where: { id: numId },
    })

    if (!productPage) {
      return NextResponse.json({ error: 'Product page not found' }, { status: 404 })
    }

    if (Array.isArray(sections)) {
      await prisma.productPageSection.deleteMany({
        where: { productPageId: numId },
      })

      for (let i = 0; i < sections.length; i++) {
        const s = sections[i]
        await prisma.productPageSection.create({
          data: {
            productPageId: numId,
            type: s.type,
            data: typeof s.data === 'string' ? s.data : JSON.stringify(s.data || {}),
            isActive: s.isActive ?? true,
            order: i + 1,
          },
        })
      }
    }

    const updated = await prisma.productPage.findUnique({
      where: { id: numId },
      include: { sections: { orderBy: { order: 'asc' } } },
    })

    return NextResponse.json({ success: true, page: updated })
  } catch (error: any) {
    console.error('Error saving product page sections:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
