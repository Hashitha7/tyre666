'use client'

import { useMemo, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Compass,
  Gauge,
  Layers,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ShoppingCart,
  SlidersHorizontal,
  ExternalLink,
} from 'lucide-react'
import type { TyreProduct } from '@/types/product'
import { brandDetails, getBrandData, type BrandInfo } from '@/data/brands'
import { money } from '@/data/products'
import { useStorefront } from '@/store/storefront'

const TyreScene = dynamic(() => import('@/components/3d/TyreScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="size-64 animate-pulse rounded-full border-[36px] border-white/5 border-t-race/50" />
    </div>
  ),
})

interface BrandsDirectoryProps {
  products: TyreProduct[]
  isLiveShopify?: boolean
}

// 3D Card with interactive tilt physics
function BrandTiltCard({
  brand,
  brandInfo,
  index,
  isActive,
  productCount,
  startingPrice,
  onSelect,
}: {
  brand: string
  brandInfo: BrandInfo
  index: number
  isActive: boolean
  productCount: number
  startingPrice?: number
  onSelect: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max 14 deg tilt
    const rotX = -((y - centerY) / centerY) * 12
    const rotY = ((x - centerX) / centerX) * 12

    setRotateX(rotX)
    setRotateY(rotY)
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setGlarePos((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        perspective: '1000px',
      }}
      className="group relative cursor-pointer select-none"
    >
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isActive ? 'translateZ(18px)' : 'translateZ(0px)'}`,
          transition: 'transform 0.18s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
          boxShadow: isActive
            ? `0 20px 40px -15px ${brandInfo.accentColor}33, 0 0 25px ${brandInfo.accentColor}22`
            : undefined,
        }}
        className={`relative flex min-h-[290px] flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${
          isActive
            ? 'border-race bg-[#13161c]'
            : 'border-white/10 bg-[#0d0f13] hover:border-white/30 hover:bg-[#12141a]'
        }`}
      >
        {/* Dynamic 3D Glare sheen */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${brandInfo.accentColor}, transparent 60%)`,
            opacity: glarePos.opacity,
          }}
        />

        {/* Ambient Top Glow Line */}
        <div
          className="absolute inset-x-0 top-0 h-1 transition-all duration-300"
          style={{
            backgroundColor: isActive ? brandInfo.accentColor : 'transparent',
            boxShadow: isActive ? `0 0 16px ${brandInfo.accentColor}` : 'none',
          }}
        />

        {/* Top Header */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold tracking-widest text-white/40">
            0{index + 1}
          </span>
          <div className="flex items-center gap-2">
            <span
              className="rounded-full px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase"
              style={{
                backgroundColor: `${brandInfo.accentColor}1a`,
                color: brandInfo.accentColor,
                border: `1px solid ${brandInfo.accentColor}40`,
              }}
            >
              {brandInfo.category}
            </span>
            {isActive && (
              <span className="flex size-2 rounded-full bg-race shadow-[0_0_8px_#f4d000]" />
            )}
          </div>
        </div>

        {/* Center Brand Identity */}
        <div className="my-auto py-4">
          <h3 className="display text-4xl font-black uppercase tracking-tight text-white transition-colors group-hover:text-race lg:text-5xl">
            {brand}
          </h3>
          <p className="mt-1.5 text-xs text-white/60 line-clamp-1">{brandInfo.tagline}</p>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-white/40">
            <Compass size={13} className="text-race" />
            <span>{brandInfo.origin}</span>
            <span className="text-white/20">•</span>
            <span>{brandInfo.terrain}</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-[10px] tracking-wider text-white/40 uppercase">
                Inventory
              </span>
              <strong className="text-xs font-semibold text-white">
                {productCount} model(s) {startingPrice ? `• From ${money(startingPrice)}` : ''}
              </strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect()
                }}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase transition ${
                  isActive
                    ? 'bg-race text-black font-extrabold'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <span>3D View</span>
              </button>

              <Link
                href={`/shop?brand=${brand}`}
                onClick={(e) => e.stopPropagation()}
                className="grid size-8 place-items-center rounded-full border border-white/10 text-white/60 transition hover:border-race hover:bg-race hover:text-black"
                title={`Shop ${brand} tyres`}
              >
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BrandsDirectory({ products, isLiveShopify }: BrandsDirectoryProps) {
  const allBrands = useMemo(() => {
    return [...new Set(products.map((p) => p.brand))].sort()
  }, [products])

  const [activeBrand, setActiveBrand] = useState<string>(allBrands[0] || 'Apex')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const addToCart = useStorefront((state) => state.addToCart)

  const activeBrandData = useMemo(() => {
    return getBrandData(activeBrand)
  }, [activeBrand])

  const brandProducts = useMemo(() => {
    return products.filter((p) => p.brand.toLowerCase() === activeBrand.toLowerCase())
  }, [products, activeBrand])

  const filteredBrands = useMemo(() => {
    return allBrands.filter((brand) => {
      const info = getBrandData(brand)
      const matchesSearch =
        brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        info.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        info.terrain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        info.tagline.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        categoryFilter === 'All' ||
        info.category.toLowerCase() === categoryFilter.toLowerCase()

      return matchesSearch && matchesCategory
    })
  }, [allBrands, searchQuery, categoryFilter])

  const categories = ['All', 'Performance', 'SUV & 4WD', 'Passenger', 'Light Truck', 'Run-Flat']

  return (
    <div className="relative">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(244,208,0,0.07),transparent_50%)]" />

      {/* Hero Header */}
      <section className="relative mx-auto max-w-[1500px] px-5 pt-32 pb-12 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-race/30 bg-race/10 px-3.5 py-1 text-[11px] font-bold tracking-[.2em] text-race uppercase">
              <Sparkles size={13} />
              <span>
                {isLiveShopify ? 'Live Shopify Approved Directory' : 'Australian Tyre Brand Directory'}
              </span>
            </div>
            <h1 className="display mt-4 text-6xl font-black uppercase tracking-tight text-white lg:text-9xl">
              Brands<span className="text-race">.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/60 lg:text-lg">
              Explore world-class tyre manufacturers engineered for Australian terrain. Select a brand to
              inspect its bespoke 3D engineered tyre, explore verified specifications, and find your exact vehicle fitment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-race px-6 text-xs font-black tracking-wider text-black uppercase transition hover:bg-white"
            >
              Shop All Tyres <ArrowRight size={15} />
            </Link>
            <Link
              href="/tyre-finder"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-xs font-bold tracking-wider text-white uppercase backdrop-blur transition hover:border-white hover:bg-white hover:text-black"
            >
              Vehicle Fitment Finder
            </Link>
          </div>
        </div>

        {/* 3D Brand Interactive Stage */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-[#090b0e] shadow-[0_30px_90px_rgba(0,0,0,0.8)]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            {/* 3D Canvas Stage */}
            <div className="relative min-h-[460px] border-b border-white/10 bg-gradient-to-b from-[#11141a] to-[#090a0d] lg:min-h-[580px] lg:border-b-0 lg:border-r">
              {/* Dynamic 3D Top Badges */}
              <div className="absolute left-6 top-6 z-10 flex items-center gap-2">
                <span className="rounded-full border border-white/15 bg-black/50 px-3.5 py-1.5 text-[10px] font-bold tracking-widest text-white/80 uppercase backdrop-blur">
                  Interactive 3D Stage
                </span>
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase backdrop-blur"
                  style={{
                    backgroundColor: `${activeBrandData.accentColor}25`,
                    color: activeBrandData.accentColor,
                    border: `1px solid ${activeBrandData.accentColor}50`,
                  }}
                >
                  {activeBrandData.name} Edition
                </span>
              </div>

              <div className="absolute right-6 top-6 z-10 rounded-full border border-white/10 bg-black/50 px-3.5 py-1.5 text-[10px] font-mono text-white/50 backdrop-blur">
                360° Drag & Inspect
              </div>

              {/* 3D Scene */}
              <div className="h-[460px] w-full lg:h-[580px]">
                <TyreScene
                  key={activeBrandData.name}
                  accentColor={activeBrandData.accentColor}
                  rimColor={activeBrandData.rimColor}
                  interactiveControls={true}
                  autoRotate={true}
                  rotationSpeed={0.32}
                  scale={1.35}
                />
              </div>

              {/* Bottom 3D Scene Controls / Hint */}
              <div className="absolute bottom-6 inset-x-6 z-10 flex items-center justify-between text-[11px] text-white/40">
                <span className="flex items-center gap-2">
                  <RotateCcw size={13} className="text-race" /> Left-click & drag to spin 3D tyre
                </span>
                <span className="font-mono text-xs font-bold" style={{ color: activeBrandData.accentColor }}>
                  {activeBrandData.popularSizes[0]} Specification
                </span>
              </div>
            </div>

            {/* Active Brand Information HUD */}
            <div className="flex flex-col justify-between p-8 lg:p-12">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-widest text-white/40 uppercase">
                    Brand Showcase · Selected
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-black tracking-wider uppercase"
                    style={{
                      backgroundColor: `${activeBrandData.accentColor}20`,
                      color: activeBrandData.accentColor,
                    }}
                  >
                    {activeBrandData.category}
                  </span>
                </div>

                <h2 className="display mt-4 text-5xl font-black uppercase tracking-tight text-white lg:text-7xl">
                  {activeBrandData.name}
                </h2>
                <p className="mt-2 text-sm font-semibold text-race lg:text-base">
                  {activeBrandData.tagline}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  {activeBrandData.description}
                </p>

                {/* Technical Specs Grid */}
                <div className="mt-8 grid grid-cols-2 gap-4 border-y border-white/10 py-6">
                  <div>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white/40 uppercase">
                      <Compass size={12} className="text-race" /> Headquarters
                    </span>
                    <strong className="mt-1 block text-sm font-medium text-white">
                      {activeBrandData.origin}
                    </strong>
                  </div>

                  <div>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white/40 uppercase">
                      <Gauge size={12} className="text-race" /> Speed Rating
                    </span>
                    <strong className="mt-1 block text-sm font-medium text-white">
                      {activeBrandData.speedRange}
                    </strong>
                  </div>

                  <div>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white/40 uppercase">
                      <ShieldCheck size={12} className="text-race" /> Warranty
                    </span>
                    <strong className="mt-1 block text-sm font-medium text-white">
                      {activeBrandData.warranty}
                    </strong>
                  </div>

                  <div>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white/40 uppercase">
                      <Layers size={12} className="text-race" /> Primary Terrain
                    </span>
                    <strong className="mt-1 block text-sm font-medium text-white">
                      {activeBrandData.terrain}
                    </strong>
                  </div>
                </div>

                {/* Key Engineering Features */}
                <div className="mt-6">
                  <span className="block text-[10px] font-bold tracking-wider text-white/40 uppercase">
                    Engineering Highlights
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {activeBrandData.keyFeatures.map((feat) => (
                      <span
                        key={feat}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80"
                      >
                        <CheckCircle2 size={12} className="text-race" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
                <Link
                  href={`/shop?brand=${activeBrandData.name}`}
                  className="inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-xl bg-race px-6 text-xs font-black tracking-wider text-black uppercase transition hover:bg-white"
                >
                  Shop {activeBrandData.name} Tyres ({brandProducts.length}) <ArrowRight size={15} />
                </Link>

                <Link
                  href={`/tyre-finder`}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 text-xs font-bold tracking-wider text-white uppercase backdrop-blur transition hover:border-white hover:bg-white hover:text-black"
                >
                  Check Vehicle Fitment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In-Page Quick View of Current Selected Brand Models */}
      {brandProducts.length > 0 && (
        <section className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-[#0d0f14] p-6 lg:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-[.2em] text-race uppercase">
                  Available in Catalogue
                </span>
                <h3 className="display text-3xl font-black uppercase text-white lg:text-4xl">
                  {activeBrandData.name} Tyres In Stock
                </h3>
              </div>

              <Link
                href={`/shop?brand=${activeBrandData.name}`}
                className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-race uppercase transition hover:text-white"
              >
                View all in shop <ExternalLink size={14} />
              </Link>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {brandProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#12151b] transition duration-300 hover:border-race/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                >
                  <div className="relative aspect-[1.1] w-full overflow-hidden bg-white/5">
                    <Image
                      src={product.image}
                      alt={`${product.brand} ${product.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12151b] via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[9px] font-bold tracking-wider text-white uppercase backdrop-blur">
                      {product.available ? 'In Stock' : 'Demo stock'}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="text-[10px] font-bold tracking-wider text-race uppercase">
                        {product.brand} · {product.category}
                      </div>
                      <Link
                        href={`/products/${product.handle}`}
                        className="mt-1 block display text-2xl font-bold uppercase text-white hover:text-race transition-colors"
                      >
                        {product.name}
                      </Link>
                      <div className="mt-2 font-mono text-xs text-white/50">
                        {product.width}/{product.profile}R{product.rim} • {product.loadIndex}{product.speedRating}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                      <div>
                        <span className="block text-[9px] text-white/40 uppercase">AUD Price</span>
                        <strong className="display text-2xl font-bold text-white">
                          {money(product.price)}
                        </strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={!product.available}
                          onClick={() => addToCart(product)}
                          className="grid size-10 place-items-center rounded-xl bg-race text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
                          title="Add to Cart"
                        >
                          <ShoppingCart size={16} />
                        </button>
                        <Link
                          href={`/products/${product.handle}`}
                          className="grid size-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:border-white hover:bg-white hover:text-black"
                          title="View Details"
                        >
                          <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Directory Search & Filter Controls */}
      <section className="mx-auto max-w-[1500px] px-5 pt-12 pb-24 lg:px-8">
        <div className="flex flex-col gap-6 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-[.2em] text-race uppercase">
              Brand Directory Catalog
            </span>
            <h2 className="display mt-1 text-3xl font-black uppercase text-white lg:text-5xl">
              All Tyre Manufacturers
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={16} />
            <input
              type="text"
              placeholder="Search brand, category, terrain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 w-full rounded-full border border-white/15 bg-white/5 pl-11 pr-4 text-xs font-medium text-white placeholder-white/40 backdrop-blur transition focus:border-race focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase transition ${
                categoryFilter === cat
                  ? 'bg-race text-black'
                  : 'border border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Cards Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredBrands.map((brand, i) => {
            const info = getBrandData(brand)
            const count = products.filter((p) => p.brand === brand).length
            const brandProds = products.filter((p) => p.brand === brand)
            const minPrice = brandProds.length > 0 ? Math.min(...brandProds.map((p) => p.price)) : undefined

            return (
              <BrandTiltCard
                key={brand}
                brand={brand}
                brandInfo={info}
                index={i}
                isActive={activeBrand.toLowerCase() === brand.toLowerCase()}
                productCount={count}
                startingPrice={minPrice}
                onSelect={() => {
                  setActiveBrand(brand)
                  // Smoothly scroll towards the 3D Stage if needed
                  window.scrollTo({ top: 350, behavior: 'smooth' })
                }}
              />
            )
          })}
        </div>

        {filteredBrands.length === 0 && (
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
            <p className="text-sm text-white/50">No brands found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setCategoryFilter('All')
              }}
              className="mt-4 rounded-full bg-race px-5 py-2 text-xs font-bold text-black uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Australian Trust & Fitment Guarantee Banner */}
        <div className="mt-16 grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-r from-[#12151b] via-[#0d0f14] to-[#12151b] p-8 md:grid-cols-3">
          <div className="flex items-start gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-race/10 text-race">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="display text-xl font-bold uppercase text-white">100% Genuine Brands</h4>
              <p className="mt-1 text-xs leading-relaxed text-white/50">
                Direct authorized distribution across Australia with manufacturer-backed warranties.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-race/10 text-race">
              <Compass size={24} />
            </div>
            <div>
              <h4 className="display text-xl font-bold uppercase text-white">Australia-Wide Fitting</h4>
              <p className="mt-1 text-xs leading-relaxed text-white/50">
                Direct freight to certified metro fitting hubs across Sydney, Melbourne, Brisbane, Perth & Adelaide.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-race/10 text-race">
              <SlidersHorizontal size={24} />
            </div>
            <div>
              <h4 className="display text-xl font-bold uppercase text-white">Guaranteed Fitment</h4>
              <p className="mt-1 text-xs leading-relaxed text-white/50">
                Verify tyre size, profile, and load rating against OEM specifications with our Tyre Finder.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
