import { getHeroSlides, getSiteConfig, getPageSections, getProductPages } from '@/lib/laravel-api'
import { prisma } from '@/lib/prisma'
import { ClientDashboard } from './client-dashboard'

export default async function AdminPage() {
  const slides = await getHeroSlides()
  const config = await getSiteConfig()
  const sections = await getPageSections()

  // 1. Primary Source of Truth: MySQL (Laravel API)
  let productPages: any[] = []
  try {
    const apiPages = await getProductPages()
    if (Array.isArray(apiPages) && apiPages.length > 0) {
      productPages = apiPages
    }
  } catch (e) {
    console.error('Error loading product pages via Laravel API:', e)
  }

  // 2. Fallback: Prisma SQLite if API returns empty
  if (productPages.length === 0) {
    try {
      productPages = await prisma.productPage.findMany({
        include: {
          sections: {
            orderBy: { order: 'asc' },
          },
        },
      })
    } catch (e) {
      console.error('Error loading product pages for admin via Prisma:', e)
    }
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
