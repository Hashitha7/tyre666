'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Plus, ArrowUpRight } from 'lucide-react'
import type { TyreProduct } from '@/types/product'
import { money } from '@/data/products'
import { useStorefront } from '@/store/storefront'

export default function ProductCard({ product }: { product: TyreProduct }) {
  const addToCart = useStorefront((state) => state.addToCart)
  const toggleWishlist = useStorefront((state) => state.toggleWishlist)
  const wished = useStorefront((state) => state.wishlist.includes(product.id))
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111317] transition duration-500 hover:-translate-y-1 hover:border-race/40">
      <div className="relative aspect-[1.08] overflow-hidden bg-white/5">
        <Image
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized={product.image.startsWith('http')}
          className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-transparent to-transparent" />
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
          className={`absolute right-4 top-4 grid size-10 place-items-center rounded-full backdrop-blur ${wished ? 'bg-race text-black' : 'bg-black/50'}`}
        >
          <Heart size={17} fill={wished ? 'currentColor' : 'none'} />
        </button>
        <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-[9px] font-bold tracking-[.15em] uppercase">
          {product.available ? 'Available' : 'Demo stock unavailable'}
        </span>
      </div>
      <div className="p-5">
        <div className="text-[10px] font-bold tracking-[.2em] text-race uppercase">
          {product.brand} · {product.category}
        </div>
        <Link
          href={`/products/${product.handle}`}
          className="mt-2 flex items-center justify-between"
        >
          <h3 className="display text-3xl font-bold uppercase">{product.name}</h3>
          <ArrowUpRight className="text-white/30 transition group-hover:text-race" />
        </Link>
        <div className="mt-2 text-xs text-white/45">
          {product.width}/{product.profile}R{product.rim} · {product.loadIndex}
          {product.speedRating} · {product.terrain}
        </div>
        <div className="mt-6 flex items-end justify-between">
          <div>
            <span className="text-[10px] text-white/35 uppercase">Demo price AUD</span>
            <strong className="display block text-3xl">{money(product.price)}</strong>
          </div>
          <button
            disabled={!product.available}
            onClick={() => addToCart(product)}
            aria-label="Add to cart"
            className="grid size-12 place-items-center rounded-full bg-race text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
          >
            <Plus />
          </button>
        </div>
        <Link
          href={`/products/${product.handle}`}
          className="mt-5 block border-t border-white/10 pt-4 text-center text-[10px] font-bold tracking-[.16em] text-white/45 uppercase hover:text-race"
        >
          Quick view specifications
        </Link>
      </div>
    </article>
  )
}
