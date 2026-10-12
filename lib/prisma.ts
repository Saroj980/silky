import { PrismaClient } from '@prisma/client'
import path from 'path'

const globalForPrisma = global as unknown as { prisma?: PrismaClient }

function getPrismaInstance() {
  if (typeof window !== 'undefined') {
    // Return dummy proxy in browser environment to prevent Prisma runtime errors
    const dummyHandler: ProxyHandler<any> = {
      get() {
        return () => Promise.resolve(null)
      }
    }
    return new Proxy({}, dummyHandler) as unknown as PrismaClient
  }

  const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
  const dbUrl = `file:${dbPath}`

  return (
    globalForPrisma.prisma ||
    new PrismaClient({
      datasources: {
        db: {
          url: process.env.VERCEL ? dbUrl : (process.env.DATABASE_URL || dbUrl),
        },
      },
    })
  )
}

export const prisma = getPrismaInstance()

if (process.env.NODE_ENV !== 'production' && typeof window === 'undefined') {
  globalForPrisma.prisma = prisma
}
