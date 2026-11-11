import type { MetadataRoute } from 'next'
import { getProducts } from '@/lib/shopify/client'

const publicUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const staticRoutes = [
  '/',
  '/about',
  '/brands',
  '/contact',
  '/deals',
  '/faq',
  '/privacy-policy',
  '/search',
  '/shipping-returns',
  '/shop',
  '/terms',
  '/tyre-finder',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route, publicUrl).toString(),
      changeFrequency: route === '/' || route === '/shop' ? 'daily' as const : 'monthly' as const,
      priority: route === '/' ? 1 : 0.7,
    })),
    ...products.map((product) => ({
      url: new URL(`/products/${product.handle}`, publicUrl).toString(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}
