export const dynamic = 'force-dynamic'
export const revalidate = 0
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const page = await prisma.productPage.findUnique({
      where: { slug },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!page) {
      return NextResponse.json({ message: 'Product page not found' }, { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error: any) {
    console.error('Error fetching product page by slug:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
