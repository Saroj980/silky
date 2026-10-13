import { ClientDashboard } from './client-dashboard'

/**
 * Admin page — all data is loaded client-side from the PHP Laravel API.
 * No Prisma, no SSR data fetching. Static export compatible.
 */
export default function AdminPage() {
  return (
    <ClientDashboard
      initialSlides={[]}
      initialConfig={null}
      initialSections={[]}
      initialProductPages={[]}
    />
  )
}
