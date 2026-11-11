import HomePage from '@/components/home/HomePage'
import { getProducts, isShopifyConnected } from '@/lib/shopify/client'

export default async function Page() {
  const products = await getProducts()
  return <HomePage products={products} connected={isShopifyConnected} />
}
