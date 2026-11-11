'use client'
import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import type { TyreProduct } from '@/types/product'
import ProductCard from '@/components/products/ProductCard'
export default function SearchPage({ products }: { products: TyreProduct[] }) {
  const [q, setQ] = useState('')
  const result = useMemo(
    () =>
      q
        ? products.filter((p) =>
            `${p.brand} ${p.name} ${p.width}/${p.profile}R${p.rim}`
              .toLowerCase()
              .includes(q.toLowerCase()),
          )
        : [],
    [q, products],
  )
  return (
    <main className="mx-auto min-h-screen max-w-[1500px] px-5 pb-24 pt-36 lg:px-8">
      <h1 className="display text-7xl font-black uppercase">Search.</h1>
      <label className="relative mt-8 block max-w-3xl">
        <Search className="absolute left-5 top-5 text-white/35" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Brand, product or size…"
          className="h-16 w-full rounded-full border border-white/15 bg-white/5 pl-14 pr-6 text-lg"
        />
      </label>
      <p className="mt-4 text-xs text-white/35">
        {q
          ? `${result.length} matching development product(s)`
          : 'Start typing to search the catalogue.'}
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {result.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  )
}
