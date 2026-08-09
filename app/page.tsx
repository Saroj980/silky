import { prisma } from '@/lib/prisma'
import { HomePageClient } from '@/components/home-page-client'

export default async function HomePage() {
  const slides = await prisma.heroSlide.findMany({
    orderBy: { id: 'asc' }
  })
  const heroSlides = slides.map(s => ({
    ...s,
    trustBadges: JSON.parse(s.trustBadges)
  }))

  const config = await prisma.siteConfig.findUnique({
    where: { id: 1 }
  })

  const sections = await prisma.pageSection.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  })

  return (
    <HomePageClient heroSlides={heroSlides} config={config} sections={sections} />
  )
}
