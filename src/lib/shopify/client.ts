import 'server-only'
import type { TyreProduct } from '@/types/product'
import { demoProducts, productByHandle } from '@/data/products'

const domain = process.env.SHOPIFY_STORE_DOMAIN
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
const version = process.env.SHOPIFY_API_VERSION || '2025-01'

export const isShopifyConnected = Boolean(domain && token)

async function shopifyFetch<T>(query: string, variables = {}): Promise<T> {
  if (!domain || !token) throw new Error('Shopify is not connected')
  const response = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 },
  })
  if (!response.ok) throw new Error(`Shopify request failed: ${response.status}`)
  const payload = await response.json()
  if (payload.errors) throw new Error('Shopify returned an error')
  return payload.data
}

export async function createShopifyCart(lines: { merchandiseId: string; quantity: number }[]) {
  if (!isShopifyConnected) {
    return { ok: false as const, message: 'Connect Shopify to activate hosted checkout.' }
  }
  const data = await shopifyFetch<any>(SHOPIFY_OPERATIONS.cartCreate, { lines })
  const errors = data.cartCreate.userErrors as { message: string }[]
  if (errors.length || !data.cartCreate.cart?.checkoutUrl) {
    return { ok: false as const, message: errors[0]?.message || 'Shopify could not create a cart.' }
  }
  return { ok: true as const, checkoutUrl: data.cartCreate.cart.checkoutUrl as string }
}

export async function getProducts(): Promise<TyreProduct[]> {
  if (!isShopifyConnected) return demoProducts
  const data = await shopifyFetch<any>(`query Products {
    products(first: 48) { nodes {
      id handle title vendor productType description
      featuredImage { url }
      variants(first: 1) { nodes { id availableForSale price { amount } compareAtPrice { amount } } }
      width: metafield(namespace: "tyre", key: "width") { value }
      profile: metafield(namespace: "tyre", key: "profile") { value }
      rim: metafield(namespace: "tyre", key: "rim") { value }
      loadIndex: metafield(namespace: "tyre", key: "load_index") { value }
      speedRating: metafield(namespace: "tyre", key: "speed_rating") { value }
      terrain: metafield(namespace: "tyre", key: "terrain") { value }
    } }
  }`)
  return data.products.nodes.map((node: any) => {
    const variant = node.variants.nodes[0]
    return {
      id: node.id,
      handle: node.handle,
      brand: node.vendor,
      name: node.title,
      category: node.productType || 'Tyres',
      terrain: node.terrain?.value || 'Not specified',
      width: Number(node.width?.value || 0),
      profile: Number(node.profile?.value || 0),
      rim: Number(node.rim?.value || 0),
      loadIndex: Number(node.loadIndex?.value || 0),
      speedRating: node.speedRating?.value || '—',
      price: Number(variant?.price.amount || 0),
      compareAtPrice: variant?.compareAtPrice ? Number(variant.compareAtPrice.amount) : undefined,
      available: Boolean(variant?.availableForSale),
      image: node.featuredImage?.url || '',
      description: node.description,
      variantId: variant?.id,
    } satisfies TyreProduct
  })
}

export async function getProduct(handle: string) {
  if (!isShopifyConnected) return productByHandle(handle)
  return (await getProducts()).find((product) => product.handle === handle)
}

export const SHOPIFY_OPERATIONS = {
  cartCreate: `mutation CartCreate($lines: [CartLineInput!]) { cartCreate(input: { lines: $lines }) { cart { id checkoutUrl } userErrors { message } } }`,
  cartLinesUpdate: `mutation CartUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { id checkoutUrl } userErrors { message } } }`,
  cartLinesRemove: `mutation CartRemove($cartId: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { id checkoutUrl } userErrors { message } } }`,
}
