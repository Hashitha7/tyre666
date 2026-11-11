import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/products/ProductDetail'
import { demoProducts } from '@/data/products'
import { getProduct, getProducts } from '@/lib/shopify/client'
export const dynamicParams = true
export function generateStaticParams() {
  return demoProducts.map(({ handle }) => ({ handle }))
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const product = await getProduct((await params).handle)
  return product
    ? { title: `${product.brand} ${product.name}`, description: product.description }
    : { title: 'Product not found' }
}
export default async function Page({ params }: { params: Promise<{ handle: string }> }) {
  const product = await getProduct((await params).handle)
  if (!product) notFound()
  const related = (await getProducts()).filter(
    (item) => item.id !== product.id && item.category === product.category,
  )
  return <ProductDetail product={product} related={related} />
}
