'use client'

import { useEffect, useMemo, useState } from 'react'
import { SlidersHorizontal, Search } from 'lucide-react'
import type { TyreProduct } from '@/types/product'
import ProductCard from './ProductCard'
import { useStorefront } from '@/store/storefront'

export default function ShopGrid({
  products,
  title = 'All tyres',
  initialWishlist = false,
}: {
  products: TyreProduct[]
  title?: string
  initialWishlist?: boolean
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [size, setSize] = useState({ width: '', profile: '', rim: '' })
  const [brand, setBrand] = useState('')
  const [wishlistOnly, setWishlistOnly] = useState(initialWishlist)
  const wishlist = useStorefront((state) => state.wishlist)
  const categories = ['All', ...new Set(products.map((product) => product.category))]
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setSize({
      width: params.get('width') || '',
      profile: params.get('profile') || '',
      rim: params.get('rim') || '',
    })
    setBrand(params.get('brand') || '')
    if (params.get('category') && categories.includes(params.get('category')!)) {
      setCategory(params.get('category')!)
    }
    setWishlistOnly(params.get('wishlist') === 'true' || initialWishlist)
    if ([...params.keys()].length) setShowFilters(true)
  }, [initialWishlist])
  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category
      const matchesQuery =
        `${product.brand} ${product.name} ${product.width}/${product.profile}R${product.rim}`
          .toLowerCase()
          .includes(query.toLowerCase())
      const matchesSize =
        (!size.width || product.width === Number(size.width)) &&
        (!size.profile || product.profile === Number(size.profile)) &&
        (!size.rim || product.rim === Number(size.rim))
      const matchesBrand = !brand || product.brand === brand
      const matchesWishlist = !wishlistOnly || wishlist.includes(product.id)
      return matchesCategory && matchesQuery && matchesSize && matchesBrand && matchesWishlist
    })
    return [...result].sort((a, b) =>
      sort === 'low'
        ? a.price - b.price
        : sort === 'high'
          ? b.price - a.price
          : a.name.localeCompare(b.name),
    )
  }, [products, query, category, sort, size, brand, wishlistOnly, wishlist])
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-12 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="text-xs font-bold tracking-[.2em] text-race uppercase">
            Catalogue / Australia
          </span>
          <h1 className="display mt-2 text-6xl font-black uppercase lg:text-8xl">{title}</h1>
          <p className="mt-3 text-sm text-white/45">
            {wishlistOnly
              ? 'Your saved products are stored on this device.'
              : `${filtered.length} development products · Connect Shopify for live catalogue data.`}
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex h-12 items-center gap-2 rounded-full border border-white/15 px-5 text-xs font-bold"
        >
          <SlidersHorizontal size={16} /> FILTERS
        </button>
      </div>
      <div
        className={`mb-8 grid gap-3 overflow-hidden transition-all ${showFilters ? 'max-h-96 opacity-100 md:grid-cols-3' : 'max-h-0 opacity-0'}`}
      >
        <label className="relative">
          <Search size={16} className="absolute left-4 top-4 text-white/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brand, product or size"
            className="h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm"
          />
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-12 rounded-xl border border-white/10 bg-[#15171b] px-4 text-sm"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        {(size.width || brand || wishlistOnly) && (
          <button
            onClick={() => {
              setSize({ width: '', profile: '', rim: '' })
              setBrand('')
              setWishlistOnly(false)
            }}
            className="h-12 rounded-xl border border-race/30 px-4 text-xs font-bold text-race"
          >
            CLEAR URL FILTERS
          </button>
        )}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-12 rounded-xl border border-white/10 bg-[#15171b] px-4 text-sm"
        >
          <option value="featured">Sort: Featured</option>
          <option value="low">Price: Low to high</option>
          <option value="high">Price: High to low</option>
        </select>
      </div>
      {filtered.length ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/15 py-24 text-center text-white/40">
          No products match these filters.
        </div>
      )}
    </section>
  )
}
