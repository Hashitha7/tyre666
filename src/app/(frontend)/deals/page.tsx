import type { Metadata } from 'next'
import DealsExperience from '@/components/deals/DealsExperience'
import { getProducts } from '@/lib/shopify/client'

export const metadata: Metadata = {
  title: 'Special Deals | 3D Interactive Tyre Promotions',
  description:
    'Save up to 25% on performance, 4WD, and passenger tyres across Australia. Explore interactive 3D deals, set discounts, and free metro fitting freight.',
}

export default async function Page() {
  const products = await getProducts()
  return (
    <main className="min-h-screen">
      <DealsExperience products={products} />
    </main>
  )
}
