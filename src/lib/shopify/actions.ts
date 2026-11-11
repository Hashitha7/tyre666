'use server'

import { createShopifyCart } from './client'

type CheckoutLine = { merchandiseId: string; quantity: number }

export async function startShopifyCheckout(lines: CheckoutLine[]) {
  const validLines = lines
    .filter(
      (line) =>
        typeof line.merchandiseId === 'string' &&
        line.merchandiseId.length > 0 &&
        Number.isInteger(line.quantity) &&
        line.quantity > 0 &&
        line.quantity <= 24,
    )
    .slice(0, 50)

  if (!validLines.length) return { ok: false as const, message: 'Your cart is empty.' }

  try {
    return await createShopifyCart(validLines)
  } catch {
    return { ok: false as const, message: 'Checkout is temporarily unavailable. Please try again.' }
  }
}
