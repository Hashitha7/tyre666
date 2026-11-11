'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartLine, TyreProduct } from '@/types/product'

type StorefrontState = {
  cart: CartLine[]
  wishlist: string[]
  recentlyViewed: string[]
  notice: string | null
  addToCart: (product: TyreProduct, quantity?: number) => void
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  toggleWishlist: (id: string) => void
  viewProduct: (id: string) => void
  setNotice: (message: string | null) => void
}

export const useStorefront = create<StorefrontState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      recentlyViewed: [],
      notice: null,
      addToCart: (product, quantity = 1) =>
        set((state) => ({
          cart: state.cart.some((line) => line.product.id === product.id)
            ? state.cart.map((line) =>
                line.product.id === product.id
                  ? { ...line, quantity: line.quantity + quantity }
                  : line,
              )
            : [...state.cart, { product, quantity }],
          notice: `${product.name} added to cart`,
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart:
            quantity < 1
              ? state.cart.filter((line) => line.product.id !== id)
              : state.cart.map((line) => (line.product.id === id ? { ...line, quantity } : line)),
        })),
      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((line) => line.product.id !== id) })),
      toggleWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((item) => item !== id)
            : [...state.wishlist, id],
        })),
      viewProduct: (id) =>
        set((state) => ({
          recentlyViewed: [id, ...state.recentlyViewed.filter((item) => item !== id)].slice(0, 8),
        })),
      setNotice: (notice) => set({ notice }),
    }),
    {
      name: 'tyres666-storefront',
      partialize: ({ cart, wishlist, recentlyViewed }) => ({ cart, wishlist, recentlyViewed }),
    },
  ),
)
