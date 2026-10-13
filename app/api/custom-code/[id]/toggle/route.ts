export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

async function getSnippetsContainer() {
  let section = await prisma.pageSection.findFirst({
    where: { type: 'CUSTOM_CODE_SNIPPETS' },
  })
  if (!section) {
    section = await prisma.pageSection.create({
      data: {
        type: 'CUSTOM_CODE_SNIPPETS',
        order: 999,
        isActive: true,
        data: JSON.stringify([]),
      },
    })
  }
  return section
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const container = await getSnippetsContainer()
    let list: any[] = []
    if (container.data) {
      try { list = JSON.parse(container.data) } catch {}
    }

    let found = false
    let newStatus = true
    const updated = list.map((s) => {
      if (s.id === id) {
        found = true
        newStatus = !s.isActive
        return {
          ...s,
          isActive: newStatus,
          updatedAt: new Date().toISOString(),
        }
      }
      return s
    })

    if (!found) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 })
    }

    await prisma.pageSection.update({
      where: { id: container.id },
      data: { data: JSON.stringify(updated) },
    })

    return NextResponse.json({ message: 'Snippet status toggled', isActive: newStatus })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
