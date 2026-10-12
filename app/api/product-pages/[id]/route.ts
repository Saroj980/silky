export const dynamic = 'force-dynamic'
export const revalidate = 0
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const page = await prisma.productPage.findUnique({
      where: { id: Number(id) },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    })
    if (!page) return NextResponse.json({ message: 'Product page not found' }, { status: 404 })
    return NextResponse.json(page)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const { sections, ...data } = body

    const updated = await prisma.productPage.update({
      where: { id: Number(id) },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.heroImage !== undefined && { heroImage: data.heroImage }),
        ...(data.isPublished !== undefined && { isPublished: Boolean(data.isPublished) }),
        ...(data.metaTitle !== undefined && { metaTitle: data.metaTitle }),
        ...(data.metaDescription !== undefined && { metaDescription: data.metaDescription }),
      },
    })
    return NextResponse.json(updated)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const numId = Number(id)
    await prisma.productPageSection.deleteMany({
      where: { productPageId: numId },
    })
    await prisma.productPage.delete({
      where: { id: numId },
    })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
