import type { Metadata } from 'next'
import BrandsDirectory from '@/components/brands/BrandsDirectory'
import { getProducts, isShopifyConnected } from '@/lib/shopify/client'

export const metadata: Metadata = {
  title: 'Tyre Brands | 3D Interactive Directory',
  description:
    'Explore premium tyre brands in interactive 3D. Inspect tread patterns, compare specifications, and find genuine Australian fitments.',
}

export default async function Page() {
  const products = await getProducts()
  return (
    <main className="min-h-screen">
      <BrandsDirectory products={products} isLiveShopify={isShopifyConnected} />
    </main>
  )
}
