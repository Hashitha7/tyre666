'use client'

import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, Sparkles, RotateCcw, Camera, Box } from 'lucide-react'
import { motion } from 'motion/react'

const TyreScene = dynamic(() => import('@/components/3d/TyreScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="size-64 animate-pulse rounded-full border-[36px] border-white/5 border-t-race/50" />
    </div>
  ),
})

export default function Hero() {
  const [viewMode, setViewMode] = useState<'image' | '3d'>('image')
  const heroCardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroCardRef.current || viewMode === '3d') return
    const rect = heroCardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotX = -((y - centerY) / centerY) * 8
    const rotY = ((x - centerX) / centerX) * 8
    setTilt({ x: rotX, y: rotY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <section className="relative min-h-[860px] overflow-hidden border-b border-white/10 pt-18 lg:min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(244,208,0,.14),transparent_38%),linear-gradient(120deg,#090a0c_25%,#15171b_100%)]" />
      <div className="grid-lines absolute inset-0 opacity-30" />
      <div className="noise pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-[1500px] items-center gap-6 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 flex items-center gap-3 text-[11px] font-bold tracking-[.25em] text-race uppercase">
            <span className="h-px w-10 bg-race" /> Australian automotive performance
          </div>

          <h1 className="display max-w-3xl text-[clamp(4.2rem,8.5vw,9.5rem)] font-black leading-[.78] tracking-[-.055em] uppercase">
            Drive beyond <span className="text-stroke block">expectations.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-7 text-white/60 lg:text-lg">
            Precision engineered tyres. Unmatched grip and stability across Australian roads,
            track days, and outback expeditions.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="group inline-flex h-14 items-center gap-5 rounded-full bg-race px-7 text-xs font-black tracking-[.15em] text-black uppercase transition hover:bg-white"
            >
              Shop tyres <ArrowRight size={17} className="transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/tyre-finder"
              className="inline-flex h-14 items-center rounded-full border border-white/20 bg-white/5 px-7 text-xs font-black tracking-[.15em] uppercase backdrop-blur transition hover:bg-white hover:text-black"
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

        {/* Right Hero Visual Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="relative h-[460px] sm:h-[540px] lg:h-[720px]"
        >
          {/* View Mode Switcher */}
          <div className="absolute right-4 top-4 z-20 flex items-center gap-1 rounded-full border border-white/15 bg-black/70 p-1 backdrop-blur">
            <button
              onClick={() => setViewMode('image')}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase transition ${
                viewMode === 'image'
                  ? 'bg-race text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Camera size={12} />
              <span>Studio View</span>
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase transition ${
                viewMode === '3d'
                  ? 'bg-race text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Box size={12} />
              <span>3D Interactive</span>
            </button>
          </div>

          {/* Left Top Badge */}
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3.5 py-1.5 text-[10px] font-bold tracking-widest text-white/70 uppercase backdrop-blur">
            <Sparkles size={12} className="text-race" />
            <span>Apex RS One • Edition 666</span>
          </div>

          {/* Container with 3D Tilt */}
          <div
            ref={heroCardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1200px' }}
            className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#12141a] via-[#0b0c10] to-[#08090b] shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
          >
            {viewMode === 'image' ? (
              <div
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className="relative h-full w-full select-none"
              >
                <Image
                  src="/images/hero-tyre.jpg"
                  alt="TYRES666 Ultra Performance Racing Tyre & Forged Alloy Rim"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center"
                />

                {/* Subtle vignette & bottom gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-black/30" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

                {/* Floating Technical HUD specs */}
                <div className="absolute bottom-6 left-6 z-10 max-w-xs rounded-xl border border-white/10 bg-black/60 p-3.5 backdrop-blur">
                  <span className="font-mono text-[9px] font-bold text-race uppercase tracking-widest">
                    Specification
                  </span>
                  <strong className="block text-sm font-bold text-white uppercase">
                    Forged Monoblock Alloy & Dual-Compound Tyre
                  </strong>
                  <span className="block mt-1 font-mono text-[10px] text-white/50">
                    265/35 R19 • Speed Y (300 km/h) • Wet Grip A
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative h-full w-full">
                <TyreScene
                  accentColor="#f4d000"
                  rimColor="#1d1f25"
                  interactiveControls={true}
                  autoRotate={true}
                  rotationSpeed={0.3}
                  scale={1.2}
                />
                <div className="absolute bottom-6 left-6 z-10 text-xs text-white/50 flex items-center gap-2">
                  <RotateCcw size={13} className="text-race" /> Drag cursor to rotate 3D wheel
                </div>
              </div>
            )}

            {/* Bottom Right 360 Badge */}
            <div className="absolute bottom-6 right-6 z-10 text-right pointer-events-none">
              <strong className="display text-5xl font-black text-race leading-none">360°</strong>
              <span className="block text-[10px] tracking-[.2em] text-white/50 uppercase mt-0.5">
                Precision Design
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
