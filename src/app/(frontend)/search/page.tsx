import type { Metadata } from 'next'
import SearchPage from '@/components/search/SearchPage'
import { getProducts } from '@/lib/shopify/client'
export const metadata: Metadata = { title: 'Search tyres' }
export default async function Page() {
  return <SearchPage products={await getProducts()} />
}
