'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Heart, Minus, Plus, ShoppingBag, ShieldCheck } from 'lucide-react'
import type { TyreProduct } from '@/types/product'
import { money } from '@/data/products'
import { useStorefront } from '@/store/storefront'

export default function ProductDetail({
  product,
  related,
}: {
  product: TyreProduct
  related: TyreProduct[]
}) {
  const [quantity, setQuantity] = useState(1)
  const addToCart = useStorefront((s) => s.addToCart)
  const viewProduct = useStorefront((s) => s.viewProduct)
  const toggleWishlist = useStorefront((s) => s.toggleWishlist)
  const wished = useStorefront((s) => s.wishlist.includes(product.id))
  useEffect(() => viewProduct(product.id), [product.id, viewProduct])
  return (
    <main className="mx-auto max-w-[1500px] px-5 pb-24 pt-28 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div className="relative min-h-[480px] overflow-hidden rounded-3xl bg-white/5 lg:min-h-[720px]">
          <Image
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            unoptimized={product.image.startsWith('http')}
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-[10px] font-bold tracking-wider backdrop-blur">
            PRODUCT PHOTOGRAPHY · 3D ASSET READY
          </span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs font-bold tracking-[.2em] text-race">
            {product.brand.toUpperCase()} · {product.category.toUpperCase()}
          </span>
          <h1 className="display mt-3 text-7xl font-black leading-none uppercase lg:text-8xl">
            {product.name}
          </h1>
          <p className="mt-5 text-lg text-white/55">
            {product.width}/{product.profile}R{product.rim} · {product.loadIndex}
            {product.speedRating}
          </p>
          <p className="display mt-8 text-5xl font-bold">
            {money(product.price)}{' '}
            <small className="font-sans text-xs text-white/35">AUD · DEMO PRICE</small>
          </p>
          <p className="mt-7 text-sm leading-7 text-white/45">{product.description}</p>
          <div className="mt-8 grid grid-cols-3 gap-2">
            {[
              ['WIDTH', product.width],
              ['PROFILE', product.profile],
              ['RIM', product.rim],
              ['LOAD', product.loadIndex],
              ['SPEED', product.speedRating],
              ['TERRAIN', product.terrain],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-white/10 p-4">
                <span className="text-[9px] text-white/35">{k}</span>
                <strong className="display block text-xl">{v}</strong>
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-2">
            <div className="flex h-14 items-center rounded-full border border-white/15">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="grid size-12 place-items-center"
              >
                <Minus size={16} />
              </button>
              <span className="w-6 text-center text-sm">{quantity}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQuantity(quantity + 1)}
                className="grid size-12 place-items-center"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              disabled={!product.available}
              onClick={() => addToCart(product, quantity)}
              className="flex h-14 flex-1 items-center justify-center gap-3 rounded-full bg-race text-xs font-black text-black disabled:opacity-40"
            >
              <ShoppingBag size={17} /> ADD TO CART
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className={`grid size-14 place-items-center rounded-full border ${wished ? 'border-race bg-race text-black' : 'border-white/15'}`}
            >
              <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="mt-5 flex gap-3 rounded-xl border border-white/10 p-4 text-xs leading-5 text-white/45">
            <ShieldCheck className="shrink-0 text-race" size={18} />
            Stock, delivery, returns and compatibility must be confirmed through live Shopify data
            and approved business policies before purchase.
          </div>
        </div>
      </div>
      <section className="mt-24 grid gap-6 border-t border-white/10 pt-16 lg:grid-cols-2">
        <div>
          <span className="text-xs font-bold tracking-widest text-race">PRODUCT INFORMATION</span>
          <h2 className="display mt-3 text-4xl font-black uppercase">Built for verified data.</h2>
          <p className="mt-4 text-sm leading-7 text-white/45">
            Seasonal data, warranty details, technical documents and complete descriptions will
            render from Shopify fields and metafields once supplied.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 p-7">
          <span className="text-xs font-bold tracking-widest text-race">GENUINE REVIEWS</span>
          <p className="mt-4 text-sm text-white/45">
            No reviews are shown because a genuine review provider has not been connected.
          </p>
        </div>
      </section>
      <section className="mt-20 border-t border-white/10 pt-14">
        <span className="text-xs font-bold tracking-widest text-race">RELATED TYRES</span>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {related.slice(0, 3).map((item) => (
            <a
              key={item.id}
              href={`/products/${item.handle}`}
              className="rounded-2xl border border-white/10 p-5 transition hover:border-race/40"
            >
              <span className="text-[10px] text-race">{item.brand.toUpperCase()}</span>
              <strong className="display mt-2 block text-2xl uppercase">{item.name}</strong>
              <span className="mt-2 block text-xs text-white/40">
                {item.width}/{item.profile}R{item.rim}
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
