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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const activeOnly = searchParams.get('active_only') === '1' || searchParams.get('active_only') === 'true'

    let list = await getSnippetsList()
    if (activeOnly) {
      list = list.filter((s) => s.isActive !== false)
    }
    return NextResponse.json(list)
  } catch (error: any) {
    console.error('Error fetching custom code snippets:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const container = await getSnippetsContainer()
    const snippets = await getSnippetsList()

    const newSnippet = {
      id: body.id || `snip_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      title: body.title || 'Untitled Snippet',
      codeType: body.codeType || 'css',
      code: body.code || '',
      placement: body.placement || 'head',
      targetDevice: body.targetDevice || 'all',
      targetPage: body.targetPage || 'all',
      targetSection: body.targetSection || '',
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
      isFavorite: body.isFavorite !== undefined ? Boolean(body.isFavorite) : false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    snippets.unshift(newSnippet)
    await saveSnippetsList(container.id, snippets)

    return NextResponse.json(
      { message: 'Snippet created successfully', snippet: newSnippet },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating custom code snippet:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const container = await getSnippetsContainer()
    const snippets = await getSnippetsList()

    const targetId = body.id
    if (!targetId) {
      return NextResponse.json({ error: 'Snippet ID required' }, { status: 400 })
    }

    let found = false
    const updated = snippets.map((s) => {
      if (s.id === targetId) {
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
    console.error('Error updating custom code snippet:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Snippet ID required' }, { status: 400 })
    }

    const container = await getSnippetsContainer()
    const snippets = await getSnippetsList()
    const filtered = snippets.filter((s) => s.id !== id)

    await saveSnippetsList(container.id, filtered)
    return NextResponse.json({ message: 'Snippet deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting snippet:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
