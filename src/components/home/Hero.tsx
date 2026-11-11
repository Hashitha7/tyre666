'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'

const TyreScene = dynamic(() => import('@/components/3d/TyreScene'), {
  ssr: false,
  loading: () => (
    <div className="size-72 animate-pulse rounded-full border-[54px] border-white/5" />
  ),
})

export default function Hero() {
  return (
    <section className="relative min-h-[860px] overflow-hidden border-b border-white/10 pt-18 lg:min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(244,208,0,.12),transparent_34%),linear-gradient(120deg,#090a0c_25%,#15171b_100%)]" />
      <div className="grid-lines absolute inset-0 opacity-30" />
      <div className="noise pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-[1500px] items-center gap-4 px-5 py-16 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 flex items-center gap-3 text-[11px] font-bold tracking-[.25em] text-race uppercase">
            <span className="h-px w-10 bg-race" /> Australian automotive performance
          </div>
          <h1 className="display max-w-3xl text-[clamp(4.5rem,9vw,9.8rem)] font-black leading-[.76] tracking-[-.055em] uppercase">
            Drive beyond <span className="text-stroke block">expectations.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-7 text-white/60 lg:text-lg">
            Premium tyres. Exceptional performance. The perfect fit for every journey.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="group inline-flex h-14 items-center gap-5 rounded-full bg-race px-7 text-xs font-black tracking-[.15em] text-black uppercase"
            >
              Shop tyres <ArrowRight size={17} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/tyre-finder"
              className="inline-flex h-14 items-center rounded-full border border-white/20 px-7 text-xs font-black tracking-[.15em] uppercase hover:bg-white hover:text-black"
            >
              Find your tyres
            </Link>
          </div>
          <div className="mt-9 flex flex-wrap gap-6 text-xs text-white/45">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-race" /> Secure Shopify checkout when connected
            </span>
            <span>Australia-wide catalogue ready</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="relative h-[430px] lg:h-[720px]"
        >
          <div className="absolute right-2 top-10 z-10 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[10px] font-bold tracking-[.2em] text-white/55 uppercase backdrop-blur">
            Drag your cursor · 3D engineered
          </div>
          <TyreScene />
          <div className="absolute bottom-4 right-4 text-right">
            <strong className="display text-6xl font-black text-race">360°</strong>
            <span className="block text-[10px] tracking-[.2em] text-white/45 uppercase">
              Interactive preview
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
