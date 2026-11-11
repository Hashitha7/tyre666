'use client'

import { useMemo, useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import {
  Flame,
  Clock,
  Sparkles,
  Tag,
  ArrowRight,
  Check,
  Copy,
  ShoppingCart,
  Heart,
  Percent,
  Truck,
  ShieldCheck,
  Wrench,
  Award,
  Filter,
  ExternalLink,
} from 'lucide-react'
import type { TyreProduct } from '@/types/product'
import { money } from '@/data/products'
import { useStorefront } from '@/store/storefront'

const TyreScene = dynamic(() => import('@/components/3d/TyreScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="size-64 animate-pulse rounded-full border-[36px] border-white/5 border-t-red-500/60" />
    </div>
  ),
})

interface DealsExperienceProps {
  products: TyreProduct[]
}

// 3D Tilt Deal Card
function DealTiltCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWished,
}: {
  product: TyreProduct
  onAddToCart: (qty: number) => void
  onToggleWishlist: () => void
  isWished: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })

  const discountAmount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? product.compareAtPrice - product.price
      : 0
  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round((discountAmount / product.compareAtPrice) * 100)
      : 0

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotX = -((y - centerY) / centerY) * 10
    const rotY = ((x - centerX) / centerX) * 10

    setRotateX(rotX)
    setRotateY(rotY)
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
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
      style={{ perspective: '1000px' }}
      className="group relative select-none"
    >
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.18s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f14] transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_20px_45px_rgba(239,68,68,0.15)]"
      >
        {/* Dynamic 3D Glare */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(244,208,0,0.3), transparent 60%)`,
            opacity: glarePos.opacity,
          }}
        />

        {/* Top Badges & Image */}
        <div className="relative aspect-[1.12] w-full overflow-hidden bg-white/5">
          <Image
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-transparent" />

          {/* Deal Percentage Badge */}
          {discountPercent > 0 && (
            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-[10px] font-black tracking-wider text-white uppercase shadow-[0_0_15px_rgba(220,38,38,0.6)]">
              <Flame size={12} fill="currentColor" />
              <span>SAVE {discountPercent}%</span>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={onToggleWishlist}
            aria-label="Wishlist"
            className={`absolute right-4 top-4 grid size-9 place-items-center rounded-full backdrop-blur transition ${
              isWished ? 'bg-race text-black' : 'bg-black/50 text-white/70 hover:text-white'
            }`}
          >
            <Heart size={16} fill={isWished ? 'currentColor' : 'none'} />
          </button>

          <span className="absolute bottom-3 left-4 rounded-md bg-black/70 px-2.5 py-1 font-mono text-[10px] text-white/70 backdrop-blur">
            {product.width}/{product.profile} R{product.rim}
          </span>
        </div>

        {/* Body */}
        <div className="p-5">
          <div className="flex items-center justify-between text-[10px] font-bold tracking-wider uppercase text-white/40">
            <span className="text-race">{product.brand}</span>
            <span>{product.category}</span>
          </div>

          <Link
            href={`/products/${product.handle}`}
            className="mt-1.5 block display text-2xl font-bold uppercase text-white transition hover:text-race"
          >
            {product.name}
          </Link>

          <p className="mt-1 text-xs text-white/50 line-clamp-1">{product.description}</p>

          {/* Price & Savings */}
          <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-white/40 uppercase">Promotional Price</span>
                <div className="flex items-baseline gap-2">
                  <strong className="display text-3xl font-black text-white">
                    {money(product.price)}
                  </strong>
                  {product.compareAtPrice && (
                    <span className="text-sm font-semibold text-white/40 line-through">
                      {money(product.compareAtPrice)}
                    </span>
                  )}
                </div>
              </div>

              {discountAmount > 0 && (
                <div className="text-right">
                  <span className="rounded-md bg-green-500/10 px-2 py-0.5 text-[10px] font-bold text-green-400">
                    Instant -{money(discountAmount)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex items-center gap-2">
            <button
              onClick={() => onAddToCart(1)}
              disabled={!product.available}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-race text-xs font-black tracking-wider text-black uppercase transition hover:bg-white disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
            >
              <ShoppingCart size={15} />
              <span>Add 1 Tyre</span>
            </button>

            <button
              onClick={() => onAddToCart(4)}
              disabled={!product.available}
              className="flex h-11 items-center justify-center gap-1.5 rounded-xl border border-race/40 bg-race/10 px-3.5 text-xs font-bold text-race uppercase transition hover:bg-race hover:text-black disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/30"
              title="Add Full Set of 4 Tyres"
            >
              <span>Set of 4</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DealsExperience({ products }: DealsExperienceProps) {
  // Products with actual discounts
  const dealProducts = useMemo(() => {
    return products.filter(
      (p) => p.compareAtPrice && p.compareAtPrice > p.price,
    )
  }, [products])

  const [activeCategory, setActiveCategory] = useState('All')
  const [sortOption, setSortOption] = useState<'discount' | 'price-low' | 'price-high'>('discount')

  // Featured Hero Deal
  const featuredDeal = dealProducts[0] || products[0]

  // Countdown timer simulation for flash deals (ticks down in real-time)
  const [timeLeft, setTimeLeft] = useState({ hours: 18, minutes: 42, seconds: 15 })
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 24, minutes: 0, seconds: 0 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Cart & Wishlist hooks
  const addToCart = useStorefront((state) => state.addToCart)
  const toggleWishlist = useStorefront((state) => state.toggleWishlist)
  const wishlist = useStorefront((state) => state.wishlist)
  const setNotice = useStorefront((state) => state.setNotice)

  // Interactive Package Calculator state
  const [calcQty, setCalcQty] = useState<number>(4)
  const [calcTyre, setCalcTyre] = useState<TyreProduct>(featuredDeal)

  const calcUnitPrice = calcTyre.price
  const calcTotalOriginal = (calcTyre.compareAtPrice || calcTyre.price) * calcQty
  const calcSubtotal = calcUnitPrice * calcQty
  // 4 tyres get extra 5% bundle discount
  const calcBundleDiscount = calcQty >= 4 ? Math.round(calcSubtotal * 0.05) : 0
  const calcFinalTotal = calcSubtotal - calcBundleDiscount
  const calcTotalSavings = calcTotalOriginal - calcFinalTotal

  // Coupon code copy state
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null)
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCoupon(code)
    setNotice(`Coupon "${code}" copied to clipboard!`)
    setTimeout(() => setCopiedCoupon(null), 3000)
  }

  // Filter & Sort
  const filteredDeals = useMemo(() => {
    const list = dealProducts.filter((p) => {
      if (activeCategory === 'All') return true
      return p.category.toLowerCase().includes(activeCategory.toLowerCase())
    })

    return [...list].sort((a, b) => {
      const discountA = (a.compareAtPrice || a.price) - a.price
      const discountB = (b.compareAtPrice || b.price) - b.price
      if (sortOption === 'discount') return discountB - discountA
      if (sortOption === 'price-low') return a.price - b.price
      return b.price - a.price
    })
  }, [dealProducts, activeCategory, sortOption])

  return (
    <div className="relative">
      {/* Dynamic Ambient Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(239,68,68,0.08),transparent_50%)]" />

      {/* HERO SECTION WITH 3D FLASH DEAL SHOWCASE */}
      <section className="relative mx-auto max-w-[1500px] px-5 pt-32 pb-16 lg:px-8">
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-4 py-1 text-xs font-bold tracking-[.2em] text-red-400 uppercase">
            <Flame size={14} className="animate-pulse" />
            <span>Exclusive Australian Specials & Factory Promotions</span>
          </div>
          <h1 className="display text-6xl font-black uppercase tracking-tight text-white lg:text-9xl">
            Special Deals<span className="text-red-500">.</span>
          </h1>
          <p className="max-w-2xl text-base text-white/60 lg:text-lg">
            Save up to 25% on Australia&apos;s leading motorsport, all-terrain, and passenger tyres.
            Verified discounts, bundle promotions, and free fitting freight nationwide.
          </p>
        </div>

        {/* 3D Flash Deal Stage */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-[#090b0e] shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left 3D Stage */}
            <div className="relative min-h-[460px] border-b border-white/10 bg-gradient-to-b from-[#141014] to-[#090a0d] lg:min-h-[580px] lg:border-b-0 lg:border-r">
              {/* Flash Deal Badges */}
              <div className="absolute left-6 top-6 z-10 flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-red-600 px-3.5 py-1.5 text-[11px] font-black tracking-wider text-white uppercase shadow-[0_0_15px_rgba(220,38,38,0.7)]">
                  <Flame size={13} fill="currentColor" /> Deal of the Week
                </span>
                <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[11px] font-bold text-race uppercase backdrop-blur">
                  Save ${((featuredDeal.compareAtPrice || 0) - featuredDeal.price).toFixed(0)} Instant
                </span>
              </div>

              {/* Countdown Timer HUD */}
              <div className="absolute right-6 top-6 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-1.5 text-xs font-mono text-white/90 backdrop-blur">
                <Clock size={14} className="text-red-400" />
                <span>
                  Ends in {String(timeLeft.hours).padStart(2, '0')}:
                  {String(timeLeft.minutes).padStart(2, '0')}:
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>

              {/* 3D Canvas */}
              <div className="h-[460px] w-full lg:h-[580px]">
                <TyreScene
                  accentColor="#ef4444"
                  rimColor="#1b1c22"
                  interactiveControls={true}
                  autoRotate={true}
                  rotationSpeed={0.35}
                  scale={1.35}
                />
              </div>

              <div className="absolute bottom-6 inset-x-6 z-10 flex items-center justify-between text-xs text-white/40">
                <span>360° Drag & Rotate 3D Alloy Wheel</span>
                <span className="font-mono text-race">{featuredDeal.brand} {featuredDeal.name}</span>
              </div>
            </div>

            {/* Right Deal Info */}
            <div className="flex flex-col justify-between p-8 lg:p-12">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-red-400 uppercase">
                  <span>Factory Clearance Special</span>
                  <span>•</span>
                  <span>{featuredDeal.category}</span>
                </div>

                <h2 className="display mt-3 text-5xl font-black uppercase text-white lg:text-7xl">
                  {featuredDeal.brand} {featuredDeal.name}
                </h2>
                <p className="mt-2 text-xs font-mono text-white/50">
                  Size: {featuredDeal.width}/{featuredDeal.profile} R{featuredDeal.rim} • Load {featuredDeal.loadIndex}{featuredDeal.speedRating}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  {featuredDeal.description}
                </p>

                {/* Price Matrix */}
                <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-950/20 p-6 backdrop-blur">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-white/50 uppercase">
                        Promotional Deal Price
                      </span>
                      <div className="flex items-baseline gap-3">
                        <strong className="display text-4xl font-black text-white lg:text-5xl">
                          {money(featuredDeal.price)}
                        </strong>
                        {featuredDeal.compareAtPrice && (
                          <span className="text-lg font-bold text-white/40 line-through">
                            {money(featuredDeal.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block rounded-lg bg-green-500/20 px-3 py-1 font-mono text-xs font-bold text-green-400">
                        SAVE {money((featuredDeal.compareAtPrice || 0) - featuredDeal.price)}
                      </span>
                      <span className="block mt-1 text-[10px] text-white/40">per tyre saving</span>
                    </div>
                  </div>

                  {/* 4-Tyre Bundle Callout */}
                  <div className="mt-4 border-t border-white/10 pt-4 text-xs text-white/80">
                    <span className="text-race font-bold">Special 4-Tyre Package:</span> Get 4 tyres for{' '}
                    <strong className="text-white">{money(featuredDeal.price * 4 * 0.95)}</strong>{' '}
                    (Includes Extra 5% Set Bonus + Free Metro Delivery!)
                  </div>
                </div>

                {/* Guarantees */}
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-white/70">
                  <div className="flex items-center gap-2">
                    <Truck size={14} className="text-race" /> Free Metro Freight
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-race" /> 5-Year Tyre Warranty
                  </div>
                  <div className="flex items-center gap-2">
                    <Wrench size={14} className="text-race" /> Fitting Network Support
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-race" /> 100% Genuine Australian Stock
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => addToCart(featuredDeal, 1)}
                  className="flex h-13 flex-1 items-center justify-center gap-2 rounded-xl bg-race px-6 text-xs font-black tracking-wider text-black uppercase transition hover:bg-white"
                >
                  <ShoppingCart size={16} /> Buy 1 Tyre ({money(featuredDeal.price)})
                </button>

                <button
                  onClick={() => addToCart(featuredDeal, 4)}
                  className="flex h-13 flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 text-xs font-black tracking-wider text-white uppercase shadow-[0_0_20px_rgba(220,38,38,0.4)] transition hover:bg-red-500"
                >
                  <Flame size={16} /> Buy Set of 4 ({money(featuredDeal.price * 4 * 0.95)})
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROMOTIONAL COUPON VOUCHERS */}
      <section className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Coupon 1 */}
          <div className="relative overflow-hidden rounded-2xl border border-dashed border-race/40 bg-race/[0.03] p-5">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-race/20 px-2.5 py-0.5 text-[10px] font-bold text-race uppercase">
                Free Freight
              </span>
              <Tag size={16} className="text-race" />
            </div>
            <h4 className="mt-2 text-base font-bold text-white">Free Metro Shipping & Balancing</h4>
            <p className="mt-1 text-xs text-white/50">Apply on any set of 4 tyres across capital cities.</p>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-black/60 px-3 py-2">
              <code className="font-mono text-xs font-bold text-race">SET4-FREESHIP</code>
              <button
                onClick={() => copyToClipboard('SET4-FREESHIP')}
                className="flex items-center gap-1 text-[11px] font-bold text-white/70 hover:text-white"
              >
                {copiedCoupon === 'SET4-FREESHIP' ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                <span>{copiedCoupon === 'SET4-FREESHIP' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Coupon 2 */}
          <div className="relative overflow-hidden rounded-2xl border border-dashed border-red-500/40 bg-red-500/[0.03] p-5">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-[10px] font-bold text-red-400 uppercase">
                $50 Cashback
              </span>
              <Percent size={16} className="text-red-400" />
            </div>
            <h4 className="mt-2 text-base font-bold text-white">Motorsport & 4WD Cashback</h4>
            <p className="mt-1 text-xs text-white/50">Extra $50 instant discount on orders over $1,000.</p>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-black/60 px-3 py-2">
              <code className="font-mono text-xs font-bold text-red-400">AUSSIE-CASH50</code>
              <button
                onClick={() => copyToClipboard('AUSSIE-CASH50')}
                className="flex items-center gap-1 text-[11px] font-bold text-white/70 hover:text-white"
              >
                {copiedCoupon === 'AUSSIE-CASH50' ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                <span>{copiedCoupon === 'AUSSIE-CASH50' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Coupon 3 */}
          <div className="relative overflow-hidden rounded-2xl border border-dashed border-cyan-500/40 bg-cyan-500/[0.03] p-5">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-[10px] font-bold text-cyan-400 uppercase">
                Twin Axle Pack
              </span>
              <Sparkles size={16} className="text-cyan-400" />
            </div>
            <h4 className="mt-2 text-base font-bold text-white">10% Off Front/Rear Axle Pair</h4>
            <p className="mt-1 text-xs text-white/50">Save 10% when purchasing any 2 matching tyres.</p>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-black/60 px-3 py-2">
              <code className="font-mono text-xs font-bold text-cyan-400">TWINPACK10</code>
              <button
                onClick={() => copyToClipboard('TWINPACK10')}
                className="flex items-center gap-1 text-[11px] font-bold text-white/70 hover:text-white"
              >
                {copiedCoupon === 'TWINPACK10' ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                <span>{copiedCoupon === 'TWINPACK10' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ALL DEALS PRODUCT GRID */}
      <section className="mx-auto max-w-[1500px] px-5 py-16 lg:px-8">
        <div className="flex flex-col gap-6 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-[.2em] text-race uppercase">
              Current Special Offers ({filteredDeals.length})
            </span>
            <h3 className="display mt-1 text-3xl font-black uppercase text-white lg:text-5xl">
              Verified Discounted Tyres
            </h3>
          </div>

          {/* Filter and Sort Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-1 rounded-full border border-white/10 bg-white/5 p-1">
              {['All', 'Performance', 'SUV & 4WD', 'Passenger', 'Run-Flat'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold uppercase transition ${
                    activeCategory === cat ? 'bg-race text-black' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="h-10 rounded-full border border-white/15 bg-black/60 px-4 text-xs font-medium text-white focus:border-race focus:outline-none"
            >
              <option value="discount">Highest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* 3D Deal Cards Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDeals.map((product) => (
            <DealTiltCard
              key={product.id}
              product={product}
              onAddToCart={(qty) => addToCart(product, qty)}
              onToggleWishlist={() => toggleWishlist(product.id)}
              isWished={wishlist.includes(product.id)}
            />
          ))}
        </div>
      </section>

      {/* INTERACTIVE 4-TYRE PACKAGE SAVINGS CALCULATOR */}
      <section className="mx-auto max-w-[1500px] px-5 pb-24 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#12141a] via-[#0d0f14] to-[#14121a] p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="text-xs font-bold tracking-[.2em] text-race uppercase">
                Interactive Savings Simulator
              </span>
              <h3 className="display mt-2 text-3xl font-black uppercase text-white lg:text-5xl">
                Custom Set & Bundle Calculator
              </h3>
              <p className="mt-3 text-sm text-white/60">
                Choose your tyre and vehicle set size to calculate instant bundle savings, free wheel balancing vouchers, and metro delivery bonus.
              </p>

              {/* Tyre Selector */}
              <div className="mt-6">
                <label className="block text-xs font-bold text-white/70 uppercase">Select Tyre Model</label>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {dealProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setCalcTyre(p)}
                      className={`rounded-xl border p-3 text-left transition ${
                        calcTyre.id === p.id
                          ? 'border-race bg-race/10 text-white'
                          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20'
                      }`}
                    >
                      <span className="block text-[10px] font-bold text-race uppercase">{p.brand}</span>
                      <strong className="block text-xs font-bold truncate">{p.name}</strong>
                      <span className="text-[11px] text-white/50">{money(p.price)}/ea</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-6">
                <label className="block text-xs font-bold text-white/70 uppercase">Select Quantity</label>
                <div className="mt-2 flex gap-3">
                  {[
                    { qty: 1, label: 'Single Tyre (Spare / Replacement)' },
                    { qty: 2, label: 'Pair of 2 (Front or Rear Axle)' },
                    { qty: 4, label: 'Full Set of 4 (Best Value ⭐️)' },
                  ].map((opt) => (
                    <button
                      key={opt.qty}
                      onClick={() => setCalcQty(opt.qty)}
                      className={`flex-1 rounded-xl border p-3 text-center transition ${
                        calcQty === opt.qty
                          ? 'border-race bg-race text-black font-extrabold'
                          : 'border-white/10 bg-white/5 text-white hover:border-white/20'
                      }`}
                    >
                      <span className="block text-lg font-black">{opt.qty}</span>
                      <span className="block text-[10px] uppercase">{opt.qty === 4 ? 'Set of 4' : opt.qty === 2 ? 'Pair' : 'Single'}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Calculation Receipt */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur lg:p-8">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">Deal Summary</h4>
                  <span className="font-mono text-xs text-race">Package Deal Active</span>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex justify-between text-white/60">
                    <span>{calcTyre.brand} {calcTyre.name} × {calcQty}</span>
                    <span className="font-mono text-white">{money(calcSubtotal)}</span>
                  </div>

                  {calcTyre.compareAtPrice && (
                    <div className="flex justify-between text-green-400 font-semibold">
                      <span>Factory Discount Saving</span>
                      <span className="font-mono">
                        -{money(((calcTyre.compareAtPrice || calcTyre.price) - calcTyre.price) * calcQty)}
                      </span>
                    </div>
                  )}

                  {calcBundleDiscount > 0 && (
                    <div className="flex justify-between text-green-400 font-semibold">
                      <span>Set of 4 Bonus Discount (5%)</span>
                      <span className="font-mono">-{money(calcBundleDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-white/60">
                    <span>Metro Hub Freight</span>
                    <span className="font-mono text-race font-bold">FREE ($0.00)</span>
                  </div>

                  <div className="flex justify-between text-white/60">
                    <span>Fitting & Balancing Voucher</span>
                    <span className="font-mono text-race font-bold">INCLUDED</span>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold uppercase text-white/70">Total Package Price</span>
                    <div className="text-right">
                      <strong className="display text-4xl font-black text-white">{money(calcFinalTotal)}</strong>
                      {calcTotalSavings > 0 && (
                        <span className="block text-xs font-bold text-green-400">
                          Total Saved: {money(calcTotalSavings)}!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() => addToCart(calcTyre, calcQty)}
                  className="w-full flex h-13 items-center justify-center gap-2 rounded-xl bg-race text-xs font-black tracking-wider text-black uppercase transition hover:bg-white"
                >
                  <ShoppingCart size={16} /> Add Bundle to Cart ({money(calcFinalTotal)})
                </button>

                <div className="flex items-center justify-between text-[11px] text-white/40">
                  <Link href="/tyre-finder" className="hover:text-white transition">Check Vehicle Fitment →</Link>
                  <Link href="/cart" className="hover:text-race transition">Proceed to Checkout →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
