import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Headphones,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import Hero from './Hero'
import TyreFinder from '@/components/tyre-finder/TyreFinder'
import ProductCard from '@/components/products/ProductCard'
import type { TyreProduct } from '@/types/product'
import NewsletterSignup from '@/components/content/NewsletterSignup'

const categories = [
  'Passenger',
  'SUV & 4WD',
  'Performance',
  'All-Terrain',
  'Mud-Terrain',
  'Highway-Terrain',
  'Light Truck',
  'Run-Flat',
]
const benefits = [
  [
    BadgeCheck,
    'Quality selection',
    'A structured catalogue prepared for verified brand and specification data.',
  ],
  [
    CreditCard,
    'Secure shopping',
    'Checkout redirects to Shopify’s hosted checkout when connected.',
  ],
  [
    Search,
    'Easy discovery',
    'Search by size, category and specification from one clear interface.',
  ],
  [Headphones, 'Customer support', 'Simple routes to contact and confirmed business information.'],
  [ShieldCheck, 'Trusted data', 'Demo and unconfirmed information is always labelled honestly.'],
  [
    Sparkles,
    'Premium experience',
    'Fast, responsive interaction across mobile, tablet and desktop.',
  ],
]

export default function HomePage({
  products,
  connected,
}: {
  products: TyreProduct[]
  connected: boolean
}) {
  return (
    <main>
      <Hero />
      <section className="relative z-10 mx-auto -mt-10 max-w-[1320px] px-5">
        <TyreFinder compact />
      </section>
      <section className="mx-auto max-w-[1500px] px-5 py-28 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold tracking-[.2em] text-race uppercase">
              Engineered for every road
            </span>
            <h2 className="display mt-2 text-5xl font-black uppercase lg:text-7xl">
              Choose your terrain.
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden items-center gap-2 text-xs font-bold tracking-widest md:flex"
          >
            VIEW ALL <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              href={`/shop?category=${encodeURIComponent(category)}`}
              key={category}
              className="group relative min-h-48 overflow-hidden rounded-2xl border border-white/10 bg-white/[.03] p-5 transition hover:border-race/40"
            >
              <span className="display text-7xl font-black text-white/[.035]">0{index + 1}</span>
              <h3 className="display absolute bottom-5 left-5 text-2xl font-bold uppercase">
                {category}
              </h3>
              <ArrowRight className="absolute bottom-5 right-5 text-race transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>
      <section className="border-y border-white/10 bg-[#0d0f12] py-24">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-[.2em] text-race uppercase">
                {connected
                  ? 'Live Shopify catalogue'
                  : 'Development catalogue — not live inventory'}
              </span>
              <h2 className="display mt-2 text-5xl font-black uppercase lg:text-7xl">
                Selected performance.
              </h2>
            </div>
            <Link
              href="/shop"
              className="rounded-full border border-white/15 px-6 py-3 text-xs font-bold"
            >
              SHOP ALL TYRES
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section className="relative min-h-[650px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1760713164476-7eb5063b3d07?auto=format&fit=crop&w=2000&q=90"
          alt="Dark performance SUV in a studio setting"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="relative mx-auto flex min-h-[650px] max-w-[1500px] items-center px-5 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-[.2em] text-race uppercase">
              No unconfirmed discount claims
            </span>
            <h2 className="display mt-4 text-6xl font-black leading-[.85] uppercase sm:text-8xl">
              The right tyres.
              <br />
              The right choice.
            </h2>
            <p className="mt-6 max-w-xl text-white/60">
              Explore products and compare specifications. Promotional pricing appears only when
              supplied by the live Shopify catalogue.
            </p>
            <Link
              href="/deals"
              className="mt-8 inline-flex items-center gap-4 rounded-full bg-race px-7 py-4 text-xs font-black text-black"
            >
              EXPLORE LATEST DEALS <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1500px] px-5 py-28 lg:px-8">
        <span className="text-xs font-bold tracking-[.2em] text-race uppercase">Why TYRES666</span>
        <h2 className="display mt-2 text-5xl font-black uppercase lg:text-7xl">
          Confidence, built in.
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map(([Icon, title, text]) => (
            <div key={title as string} className="bg-[#0d0f12] p-8">
              <Icon className="text-race" />
              <h3 className="display mt-10 text-2xl font-bold uppercase">{title as string}</h3>
              <p className="mt-3 text-sm leading-6 text-white/45">{text as string}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-y border-white/10 bg-race py-20 text-black">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-8">
          <h2 className="display text-5xl font-black uppercase lg:text-7xl">
            Three moves. Better tyres.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              ['01', 'Find your tyres'],
              ['02', 'Compare your options'],
              ['03', 'Shop with confidence'],
            ].map(([n, t]) => (
              <div key={n} className="border-t border-black/30 pt-5">
                <b className="text-xs">{n}</b>
                <h3 className="display mt-8 text-3xl font-black uppercase">{t}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1500px] gap-8 px-5 py-28 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="text-xs font-bold tracking-[.2em] text-race uppercase">
            Popular brands
          </span>
          <h2 className="display mt-2 text-5xl font-black uppercase">Driven by catalogue data.</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/50">
            Brand names shown below are development placeholders only. Live Shopify vendors replace
            them when your catalogue is connected.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {[...new Set(products.map((p) => p.brand))].map((brand) => (
              <span
                key={brand}
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[.03] p-8">
          <span className="text-xs font-bold tracking-[.2em] text-race uppercase">
            Customer reviews
          </span>
          <h3 className="display mt-3 text-4xl font-bold uppercase">
            Genuine reviews coming soon.
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/45">
            No reviews or star ratings are displayed until a genuine review source is connected.
          </p>
        </div>
      </section>
      <section className="border-t border-white/10 bg-[#111317] py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <span className="text-xs font-bold tracking-[.2em] text-race uppercase">
            Stay road-ready
          </span>
          <h2 className="display mt-3 text-5xl font-black uppercase">Join the inside line.</h2>
          <p className="mt-4 text-sm text-white/45">
            Subscribers are saved securely for the store team. Email campaign delivery can be
            connected to an approved provider later.
          </p>
          <NewsletterSignup />
        </div>
      </section>
    </main>
  )
}
