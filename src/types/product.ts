export type TyreProduct = {
  id: string
  handle: string
  brand: string
  name: string
  category: string
  terrain: string
  width: number
  profile: number
  rim: number
  loadIndex: number
  speedRating: string
  price: number
  compareAtPrice?: number
  available: boolean
  image: string
  description: string
  variantId: string
}

export type CartLine = { product: TyreProduct; quantity: number }
