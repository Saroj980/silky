import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, isHashedPassword } from '@/lib/password'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    let users = await prisma.user.findMany({
      orderBy: { createdAt: 'asc' }
    })
    
    if (users.length === 0) {
      try {
        const hashedAdminPassword = await hashPassword('admin')
        const hashedEditorPassword = await hashPassword('editor')

        const defaultMaster = await prisma.user.create({
          data: {
            name: 'Admin',
            username: 'admin',
            email: 'admin@silkytextiles.com',
            role: 'Master Admin',
            status: 'Active',
            password: hashedAdminPassword
          }
        })
        const defaultEditor = await prisma.user.create({
          data: {
            name: 'Content Manager',
            username: 'editor',
            email: 'editor@silkytextiles.com',
            role: 'Editor',
            status: 'Active',
            password: hashedEditorPassword
          }
        })
        users = [defaultMaster, defaultEditor]
      } catch (e) {
        console.error('Seeding default users error:', e)
      }
    }

    const formatted = users.map(u => ({
      id: String(u.id),
      name: u.name,
      username: u.username,
      email: u.email,
      role: u.role,
      status: u.status,
      createdAt: u.createdAt ? u.createdAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      // Note: password field is explicitly excluded for security
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    console.error('Error fetching users from DB:', error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, username, email, role, status, password } = body

    if (!name || !username || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username.trim() },
          { email: email.trim().toLowerCase() }
        ]
      }
    })

    if (existing) {
      // Update existing user password/role if re-sent
      let updatedPassword = existing.password
      if (password && password.trim()) {
        const pTrim = password.trim()
        updatedPassword = isHashedPassword(pTrim) ? pTrim : await hashPassword(pTrim)
      }

      const updated = await prisma.user.update({
        where: { id: existing.id },
        data: {
          name: name.trim(),
          role: role || existing.role,
          status: status || existing.status,
          password: updatedPassword
        }
      })

      return NextResponse.json({
        id: String(updated.id),
        name: updated.name,
        username: updated.username,
        email: updated.email,
        role: updated.role,
        status: updated.status,
        createdAt: updated.createdAt ? updated.createdAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      })
    }

    if (!password) {
      return NextResponse.json({ error: 'Password is required for new users' }, { status: 400 })
    }

    const pTrim = password.trim()
    const hashedPassword = isHashedPassword(pTrim) ? pTrim : await hashPassword(pTrim)

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        username: username.trim(),
        email: email.trim().toLowerCase(),
        role: role || 'Admin',
        status: status || 'Active',
        password: hashedPassword
      }
    })

    return NextResponse.json({
      id: String(user.id),
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt ? user.createdAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    })
  } catch (error: any) {
    console.error('Error creating user in DB:', error)
    return NextResponse.json({ error: error?.message || 'Failed to create user' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const idStr = searchParams.get('id')
    if (!idStr) return NextResponse.json({ error: 'Missing user id' }, { status: 400 })

    const id = parseInt(idStr, 10)
    if (isNaN(id)) {
      // Delete by username or email if non-numeric id
      await prisma.user.deleteMany({
        where: {
          OR: [{ username: idStr }, { email: idStr }]
        }
      })
    } else {
      await prisma.user.delete({ where: { id } })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting user in DB:', error)
    return NextResponse.json({ error: error?.message || 'Failed to delete user' }, { status: 500 })
  }
}
