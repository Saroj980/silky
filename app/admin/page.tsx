import { prisma } from '@/lib/prisma'
import { ClientDashboard } from './client-dashboard'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminPage() {
  const slides = await prisma.heroSlide.findMany({
    orderBy: { id: 'asc' }
  })

  const config = await prisma.siteConfig.findUnique({
    where: { id: 1 }
  })

  const sections = await prisma.pageSection.findMany({
    orderBy: { order: 'asc' }
  })

  return (
    <ClientDashboard initialSlides={slides} initialConfig={config} initialSections={sections} />
  )
}
