import type { Metadata } from 'next'
import ShopGrid from '@/components/products/ShopGrid'
import { getProducts } from '@/lib/shopify/client'
export const metadata: Metadata = {
  title: 'Shop all tyres',
  description: 'Browse tyres by brand, category, size and price.',
}
export default async function Page() {
  return (
    <main className="pt-24">
      <ShopGrid products={await getProducts()} />
    </main>
  )
}
