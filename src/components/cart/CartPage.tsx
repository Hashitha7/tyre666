'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTransition } from 'react'
import { Minus, Plus, Trash2, ArrowRight, LockKeyhole } from 'lucide-react'
import { useStorefront } from '@/store/storefront'
import { money } from '@/data/products'
import { startShopifyCheckout } from '@/lib/shopify/actions'

export default function CartPage() {
  const [pending, startTransition] = useTransition()
  const cart = useStorefront((s) => s.cart)
  const update = useStorefront((s) => s.updateQuantity)
  const remove = useStorefront((s) => s.removeFromCart)
  const setNotice = useStorefront((s) => s.setNotice)
  const subtotal = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0)
  const checkout = () =>
    startTransition(async () => {
      const result = await startShopifyCheckout(
        cart.map((line) => ({
          merchandiseId: line.product.variantId,
          quantity: line.quantity,
        })),
      )
      if (result.ok) {
        window.location.assign(result.checkoutUrl)
      } else {
        setNotice(result.message)
      }
    })
  if (!cart.length)
    return (
      <main className="grid min-h-[75vh] place-items-center px-5 pt-24 text-center">
        <div>
          <span className="display text-8xl font-black text-white/5">0</span>
          <h1 className="display text-5xl font-black uppercase">Your cart is empty.</h1>
          <p className="mt-3 text-sm text-white/45">Find the right size and add your first set.</p>
          <Link
            href="/shop"
            className="mt-7 inline-flex rounded-full bg-race px-7 py-4 text-xs font-black text-black"
          >
            SHOP TYRES
          </Link>
        </div>
      </main>
    )
  return (
    <main className="mx-auto min-h-screen max-w-[1300px] px-5 pb-24 pt-36">
      <h1 className="display text-7xl font-black uppercase">Your cart.</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-3">
          {cart.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="grid grid-cols-[90px_1fr] gap-4 rounded-2xl border border-white/10 p-3 sm:grid-cols-[120px_1fr_auto]"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="120px"
                  unoptimized={product.image.startsWith('http')}
                  className="object-cover"
                />
              </div>
              <div className="py-2">
                <span className="text-[10px] font-bold tracking-wider text-race">
                  {product.brand}
                </span>
                <h2 className="display text-2xl font-bold uppercase">{product.name}</h2>
                <p className="text-xs text-white/40">
                  {product.width}/{product.profile}R{product.rim} · {product.loadIndex}
                  {product.speedRating}
                </p>
                <button
                  onClick={() => remove(product.id)}
                  className="mt-4 flex items-center gap-2 text-[10px] text-white/40"
                >
                  <Trash2 size={13} /> REMOVE
                </button>
              </div>
              <div className="col-span-2 flex items-center justify-between sm:col-span-1 sm:flex-col sm:items-end sm:py-3">
                <strong>{money(product.price * quantity)}</strong>
                <div className="flex items-center rounded-full border border-white/10">
                  <button
                    onClick={() => update(product.id, quantity - 1)}
                    className="grid size-9 place-items-center"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-6 text-center text-xs">{quantity}</span>
                  <button
                    onClick={() => update(product.id, quantity + 1)}
                    className="grid size-9 place-items-center"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside className="h-fit rounded-3xl border border-white/10 bg-white/[.04] p-7">
          <h2 className="display text-3xl font-bold uppercase">Order summary</h2>
          <div className="mt-7 flex justify-between border-b border-white/10 pb-5 text-sm">
            <span className="text-white/45">Subtotal</span>
            <strong>{money(subtotal)}</strong>
          </div>
          <p className="mt-4 text-xs leading-5 text-white/35">
            Shipping and taxes are calculated by Shopify checkout when configured.
          </p>
          <button
            onClick={checkout}
            disabled={pending}
            className="mt-7 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-race text-xs font-black text-black"
          >
            <LockKeyhole size={16} /> SECURE CHECKOUT <ArrowRight size={16} />
          </button>
          <Link href="/shop" className="mt-5 block text-center text-xs text-white/45">
            Continue shopping
          </Link>
        </aside>
      </div>
    </main>
  )
}
