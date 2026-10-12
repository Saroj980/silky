export const dynamic = 'force-dynamic'
export const revalidate = 0
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const sections = await prisma.pageSection.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(sections)
  } catch (error: any) {
    console.error('Error fetching page sections:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { type, data, isActive, order } = body
    const count = await prisma.pageSection.count()

    const section = await prisma.pageSection.create({
      data: {
        type: type || 'CUSTOM',
        data: typeof data === 'string' ? data : JSON.stringify(data || {}),
        isActive: isActive ?? true,
        order: order || count + 1,
      },
    })
    return NextResponse.json(section)
  } catch (error: any) {
    console.error('Error creating page section:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, type, data, isActive, order } = body

    const dataStr = data !== undefined 
      ? (typeof data === 'string' ? data : JSON.stringify(data)) 
      : undefined

    if (id && !isNaN(Number(id))) {
      const existing = await prisma.pageSection.findUnique({ where: { id: Number(id) } })
      if (existing) {
        const section = await prisma.pageSection.update({
          where: { id: Number(id) },
          data: {
            ...(dataStr !== undefined && { data: dataStr }),
            ...(isActive !== undefined && { isActive }),
            ...(order !== undefined && { order }),
          },
        })
        return NextResponse.json(section)
      }
    }

    if (type) {
      const existing = await prisma.pageSection.findFirst({ where: { type } })
      if (existing) {
        const section = await prisma.pageSection.update({
          where: { id: existing.id },
          data: {
            ...(dataStr !== undefined && { data: dataStr }),
            ...(isActive !== undefined && { isActive }),
            ...(order !== undefined && { order }),
          },
        })
        return NextResponse.json(section)
      } else {
        const count = await prisma.pageSection.count()
        const section = await prisma.pageSection.create({
          data: {
            type,
            data: dataStr || '{}',
            isActive: isActive ?? true,
            order: order || count + 1,
          },
        })
        return NextResponse.json(section)
      }
    }

    return NextResponse.json({ error: 'Missing section id or type' }, { status: 400 })
  } catch (error: any) {
    console.error('Error updating page section:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing section id' }, { status: 400 })

    const numId = Number(id)
    if (!isNaN(numId)) {
      await prisma.pageSection.deleteMany({
        where: { id: numId },
      })
    }
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting page section:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
