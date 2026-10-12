import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword, hashPassword, isHashedPassword } from '@/lib/password'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
    }

    const uInput = username.trim().toLowerCase()
    const enteredPassword = password.trim()

    // Query active user from DB matching username, email, or name
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: uInput },
          { email: uInput },
          { name: uInput }
        ]
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    if (user.status && user.status.toLowerCase() !== 'active') {
      return NextResponse.json({ error: 'This user account is inactive' }, { status: 403 })
    }

    // Verify password
    const isValid = await verifyPassword(enteredPassword, user.password)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Auto-upgrade legacy plaintext password to PBKDF2 hash if needed
    if (!isHashedPassword(user.password)) {
      try {
        const hashedPassword = await hashPassword(enteredPassword)
        await prisma.user.update({
          where: { id: user.id },
          data: { password: hashedPassword }
        })
      } catch (upgradeErr) {
        console.error('Failed to auto-upgrade password hash:', upgradeErr)
      }
    }

    // Return sanitized user object (never return password)
    return NextResponse.json({
      success: true,
      user: {
        id: String(user.id),
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status
      }
    })
  } catch (error: any) {
    console.error('Login authentication error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
