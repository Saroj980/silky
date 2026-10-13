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

async function getSnippetsList(): Promise<any[]> {
  const container = await getSnippetsContainer()
  if (!container.data) return []
  try {
    const list = JSON.parse(container.data)
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

async function saveSnippetsList(containerId: number, snippets: any[]) {
  return await prisma.pageSection.update({
    where: { id: containerId },
    data: { data: JSON.stringify(snippets) },
  })
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const snippets = await getSnippetsList()
    const snip = snippets.find((s) => s.id === id)
    if (!snip) {
      return NextResponse.json({ message: 'Snippet not found' }, { status: 404 })
    }
    return NextResponse.json(snip)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const body = await req.json()
    const container = await getSnippetsContainer()
    const snippets = await getSnippetsList()

    let found = false
    const updated = snippets.map((s) => {
      if (s.id === id) {
        found = true
        return {
          ...s,
          title: body.title !== undefined ? body.title : s.title,
          codeType: body.codeType !== undefined ? body.codeType : s.codeType,
          code: body.code !== undefined ? body.code : s.code,
          placement: body.placement !== undefined ? body.placement : s.placement,
          targetDevice: body.targetDevice !== undefined ? body.targetDevice : s.targetDevice,
          targetPage: body.targetPage !== undefined ? body.targetPage : (s.targetPage || 'all'),
          targetSection: body.targetSection !== undefined ? body.targetSection : (s.targetSection || ''),
          isActive: body.isActive !== undefined ? Boolean(body.isActive) : s.isActive,
          isFavorite: body.isFavorite !== undefined ? Boolean(body.isFavorite) : s.isFavorite,
          updatedAt: new Date().toISOString(),
        }
      }
      return s
    })

    if (!found) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 })
    }

    await saveSnippetsList(container.id, updated)
    return NextResponse.json({ message: 'Snippet updated successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const container = await getSnippetsContainer()
    const snippets = await getSnippetsList()
    const filtered = snippets.filter((s) => s.id !== id)

    await saveSnippetsList(container.id, filtered)
    return NextResponse.json({ message: 'Snippet deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
