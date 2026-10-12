import { getHeroSlides, getSiteConfig, getPageSections } from '@/lib/laravel-api'
import { HomePageClient } from '@/components/home-page-client'

export default async function HomePage() {
  const slidesData = await getHeroSlides()
  const heroSlides = slidesData.map((s: any) => ({
    ...s,
    trustBadges: typeof s.trustBadges === 'string' ? JSON.parse(s.trustBadges || '[]') : s.trustBadges,
  }))

  const configData = await getSiteConfig()

  const sectionsData = await getPageSections()
  const activeSections = sectionsData.filter((s: any) => s.isActive)

  return (
    <HomePageClient heroSlides={heroSlides} config={configData} sections={activeSections} />
  )
}
