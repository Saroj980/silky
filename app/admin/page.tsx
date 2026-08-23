import { getHeroSlides, getSiteConfig, getPageSections } from '@/lib/laravel-api'
import { prisma } from '@/lib/prisma'
import { ClientDashboard } from './client-dashboard'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminPage() {
  const slides = await getHeroSlides()
  const config = await getSiteConfig()
  const sections = await getPageSections()

  let productPages: any[] = []
  try {
    productPages = await prisma.productPage.findMany({
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    })
  } catch (e) {
    console.error('Error loading product pages for admin:', e)
  }

  return (
    <ClientDashboard
      initialSlides={slides}
      initialConfig={config}
      initialSections={sections}
      initialProductPages={productPages}
    />
  )
}
