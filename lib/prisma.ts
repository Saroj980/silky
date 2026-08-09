import { PrismaClient } from '@prisma/client'
import path from 'path'

const globalForPrisma = global as unknown as { prisma?: PrismaClient }

const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
const dbUrl = `file:${dbPath}`

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.VERCEL ? dbUrl : (process.env.DATABASE_URL || dbUrl),
      },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
