'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShieldCheck,
  Compass,
  Cpu,
  Layers,
  Award,
  Truck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Clock,
  Gauge,
  Flame,
  Users,
  Check,
} from 'lucide-react'

// 3D Tilt Card component
function AboutTiltCard({
  title,
  subtitle,
  description,
  icon: Icon,
  badge,
}: {
  title: string
  subtitle: string
  description: string
  icon: any
  badge: string
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
        className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f14] p-8 transition-all duration-300 hover:border-race/40 hover:shadow-[0_20px_45px_rgba(244,208,0,0.1)]"
      >
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(244,208,0,0.25), transparent 60%)`,
            opacity: glarePos.opacity,
          }}
        />

        <div>
          <div className="flex items-center justify-between">
            <div className="grid size-12 place-items-center rounded-xl bg-race/10 text-race">
              <Icon size={24} />
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] font-bold text-white/50 uppercase">
              {badge}
            </span>
          </div>

          <h3 className="display mt-6 text-2xl font-black uppercase text-white lg:text-3xl">
            {title}
          </h3>
          <span className="block mt-1 text-xs font-semibold text-race">{subtitle}</span>
          <p className="mt-3 text-sm leading-relaxed text-white/60">{description}</p>
        </div>
      </div>
    </div>
  )
}

// 5 Technical Anatomy Layers with Real Photographs
const tyreAnatomy = [
  {
    id: 'silica',
    name: 'Nano-Silica Compound',
    layer: 'Tread Layer',
    accent: '#f4d000',
    description:
      'High-dispersion silica compound delivering razor-sharp wet braking, reduced rolling resistance, and heat endurance under blistering Australian tarmac conditions.',
    specs: '60,000+ km longevity · Wet Grip Rating: A',
    image: '/images/hero-tyre.webp',
    tag: 'Macro Tread Grip & Compound',
  },
  {
    id: 'steel',
    name: 'Twin Steel Belts',
    layer: 'Carcass Core',
    accent: '#00e5ff',
    description:
      'Dual high-tensile brass-coated steel belts providing structural rigidity, high-speed centrifugal resistance, and puncture shielding against road debris.',
    specs: 'High Lateral G-Stability · Y-Speed Rated (300 km/h)',
    image: '/images/brand-velocity.webp',
    tag: 'High-Tensile Steel Radial Structure',
  },
  {
    id: 'sidewall',
    name: '3-Ply Armor Sidewall',
    layer: 'Sidewall Structure',
    accent: '#ef4444',
    description:
      'Reinforced multi-ply casing engineered to absorb heavy outback potholes, gutter rash, and rugged gravel impacts without internal ply separation.',
    specs: 'Cut & Chip Resistant Rubber · Anti-Pinch Shielding',
    image: '/images/brand-grit.webp',
    tag: 'Rugged Anti-Puncture Sidewall',
  },
  {
    id: 'nylon',
    name: 'Jointless Nylon Cap',
    layer: 'Speed Band',
    accent: '#10b981',
    description:
      'Spiral-wound continuous nylon wrap keeping the tyre contour perfectly round at autobahn and highway speeds for an ultra-quiet, vibration-free ride.',
    specs: 'Acoustic Noise Damping · Uniform Contact Patch',
    image: '/images/brand-summit.webp',
    tag: 'Silent Highway Contour Wrap',
  },
  {
    id: 'bead',
    name: 'High-Tensile Bead Bundle',
    layer: 'Rim Interface',
    accent: '#a855f7',
    description:
      'Engineered steel wire bead with firm rubber apex filler, locking the tyre bead securely to the alloy rim even under aggressive lateral track loads.',
    specs: 'Air-Tight Bead Seat · Zero Wheel Slippage',
    image: '/images/brand-nocturne.webp',
    tag: 'Forged Rim & Bead Lock Interface',
  },
]

// Metro Hubs
const metroHubs = [
  { city: 'Sydney', state: 'NSW', hubs: '140+ Partner Hubs', dispatch: 'Same-day Dispatch', address: 'Alexandria & Western Sydney Logistics Hub' },
  { city: 'Melbourne', state: 'VIC', hubs: '120+ Partner Hubs', dispatch: 'Same-day Dispatch', address: 'Port Melbourne & Dandenong Network' },
  { city: 'Brisbane', state: 'QLD', hubs: '95+ Partner Hubs', dispatch: '1-2 Business Days', address: 'Eagle Farm & Yatala Distribution' },
  { city: 'Perth', state: 'WA', hubs: '70+ Partner Hubs', dispatch: '2 Business Days', address: 'Kewdale & Canning Vale Hub' },
  { city: 'Adelaide', state: 'SA', hubs: '50+ Partner Hubs', dispatch: '1-2 Business Days', address: 'Wingfield Regional Gateway' },
]

export default function AboutExperience() {
  const [selectedLayer, setSelectedLayer] = useState(tyreAnatomy[0])
  const [activeCity, setActiveCity] = useState(metroHubs[0])

  const stageCardRef = useRef<HTMLDivElement>(null)
  const [stageTilt, setStageTilt] = useState({ x: 0, y: 0 })

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageCardRef.current) return
    const rect = stageCardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotX = -((y - centerY) / centerY) * 7
    const rotY = ((x - centerX) / centerX) * 7
    setStageTilt({ x: rotX, y: rotY })
  }

  const handleStageMouseLeave = () => {
    setStageTilt({ x: 0, y: 0 })
  }

  return (
    <div className="relative">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(244,208,0,0.06),transparent_50%)]" />

      {/* HERO SECTION WITH REAL ANATOMY PHOTOGRAPHY LAB */}
      <section className="relative mx-auto max-w-[1500px] px-5 pt-32 pb-16 lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-race/30 bg-race/10 px-4 py-1 text-xs font-bold tracking-[.2em] text-race uppercase">
            <Sparkles size={14} />
            <span>Brand / Australia • Precision Engineering</span>
          </div>
          <h1 className="display text-6xl font-black uppercase tracking-tight text-white lg:text-9xl">
            Built for <span className="text-race">the drive.</span>
          </h1>
          <p className="max-w-3xl text-base text-white/60 lg:text-xl leading-relaxed">
            TYRES666 was founded to transform tyre buying into a transparent, high-precision digital
            experience for Australian drivers. Combining verified engineering compound photography,
            guaranteed OEM fitment, and an Australia-wide network of certified fitting hubs.
          </p>
        </div>

        {/* REAL TYRE ANATOMY PHOTOGRAPHY STAGE */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-[#090b0e] shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left Real Photography Viewport */}
            <div
              ref={stageCardRef}
              onMouseMove={handleStageMouseMove}
              onMouseLeave={handleStageMouseLeave}
              style={{ perspective: '1200px' }}
              className="relative min-h-[480px] border-b border-white/10 bg-[#08090c] lg:min-h-[600px] lg:border-b-0 lg:border-r overflow-hidden select-none"
            >
              {/* Badges */}
              <div className="absolute left-6 top-6 z-20 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/15 bg-black/70 px-3.5 py-1.5 text-[11px] font-bold tracking-wider text-white uppercase backdrop-blur">
                  Tyre Engineering Lab
                </span>
                <span
                  className="rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase backdrop-blur"
                  style={{
                    backgroundColor: `${selectedLayer.accent}25`,
                    color: selectedLayer.accent,
                    border: `1px solid ${selectedLayer.accent}50`,
                  }}
                >
                  Active: {selectedLayer.layer}
                </span>
              </div>

              <div className="absolute right-6 top-6 z-20 rounded-full border border-white/15 bg-black/70 px-3.5 py-1.5 text-xs font-mono text-white/70 backdrop-blur">
                {selectedLayer.tag}
              </div>

              {/* REAL PHOTOGRAPHY SHOWCASE WITH 3D DEPTH */}
              <div
                style={{
                  transform: `rotateX(${stageTilt.x}deg) rotateY(${stageTilt.y}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className="relative h-[480px] w-full lg:h-[600px]"
              >
                <Image
                  key={selectedLayer.id}
                  src={selectedLayer.image}
                  alt={selectedLayer.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />

                {/* Dark Vignettes & Layer Accent Ambient Glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090b0e] via-transparent to-black/40" />
                <div
                  className="pointer-events-none absolute inset-0 transition-all duration-700"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, transparent 45%, ${selectedLayer.accent}25 100%)`,
                  }}
                />
              </div>

              {/* Controls Footer */}
              <div className="absolute bottom-6 inset-x-6 z-20 flex items-center justify-between text-xs text-white/60">
                <span className="bg-black/60 px-3 py-1 rounded-md backdrop-blur">
                  Precision Tyre Engineering Specimen
                </span>
                <span className="font-mono text-xs font-bold bg-black/60 px-3 py-1 rounded-md backdrop-blur" style={{ color: selectedLayer.accent }}>
                  {selectedLayer.specs}
                </span>
              </div>
            </div>

            {/* Interactive Anatomy Layers Selector */}
            <div className="flex flex-col justify-between p-8 lg:p-12">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-race uppercase">
                  Tyre Engineering Breakdown
                </span>
                <h2 className="display mt-2 text-4xl font-black uppercase text-white lg:text-5xl">
                  {selectedLayer.name}
                </h2>
                <span className="inline-block mt-1 font-mono text-xs text-white/50 uppercase">
                  Structure: {selectedLayer.layer}
                </span>

                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  {selectedLayer.description}
                </p>

                {/* Layer Selector Tabs */}
                <div className="mt-8 space-y-2">
                  <span className="block text-[10px] font-bold tracking-wider text-white/40 uppercase">
                    Select Structural Layer
                  </span>
                  <div className="grid gap-2">
                    {tyreAnatomy.map((item) => {
                      const isActive = selectedLayer.id === item.id
                      return (
                        <button
                          key={item.id}
                          onClick={() => setSelectedLayer(item)}
                          className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition ${
                            isActive
                              ? 'border-race bg-white/5 text-white shadow-[0_0_15px_rgba(244,208,0,0.15)]'
                              : 'border-white/10 bg-transparent text-white/60 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="size-2.5 rounded-full"
                              style={{ backgroundColor: item.accent }}
                            />
                            <div>
                              <strong className="block text-xs font-bold uppercase">{item.name}</strong>
                              <span className="text-[10px] text-white/40">{item.layer}</span>
                            </div>
                          </div>
                          <span
                            className="font-mono text-[10px] uppercase font-bold"
                            style={{ color: item.accent }}
                          >
                            {isActive ? '● Inspecting' : 'View'}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
                <Link
                  href="/shop"
                  className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-race px-5 text-xs font-black tracking-wider text-black uppercase transition hover:bg-white"
                >
                  Explore Catalogue <ArrowRight size={14} />
                </Link>
                <Link
                  href="/brands"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 text-xs font-bold tracking-wider text-white uppercase backdrop-blur transition hover:border-white hover:bg-white hover:text-black"
                >
                  View Brands
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRIC COUNTERS */}
      <section className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-6 text-center">
            <strong className="display block text-5xl font-black text-race">500+</strong>
            <span className="mt-2 block text-xs font-bold uppercase text-white">Certified Fitting Hubs</span>
            <span className="mt-1 block text-[11px] text-white/40">Across all Australian states & territories</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-6 text-center">
            <strong className="display block text-5xl font-black text-white">100%</strong>
            <span className="mt-2 block text-xs font-bold uppercase text-white">Genuine Australian Stock</span>
            <span className="mt-1 block text-[11px] text-white/40">Direct manufacturer-backed warranties</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-6 text-center">
            <strong className="display block text-5xl font-black text-race">85K+</strong>
            <span className="mt-2 block text-xs font-bold uppercase text-white">Tyres Fitted Nationwide</span>
            <span className="mt-1 block text-[11px] text-white/40">From track day sedans to outback 4x4s</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-6 text-center">
            <strong className="display block text-5xl font-black text-white">4.9 / 5</strong>
            <span className="mt-2 block text-xs font-bold uppercase text-white">Driver Satisfaction</span>
            <span className="mt-1 block text-[11px] text-white/40">Verified Australian motorist reviews</span>
          </div>
        </div>
      </section>

      {/* CORE PILLARS WITH 3D TILT CARDS */}
      <section className="mx-auto max-w-[1500px] px-5 py-16 lg:px-8">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold tracking-[.2em] text-race uppercase">
            Our Guiding Philosophy
          </span>
          <h2 className="display text-4xl font-black uppercase text-white lg:text-6xl">
            The TYRES666 Pillars
          </h2>
          <p className="max-w-2xl text-sm text-white/60">
            Eliminating guesswork with transparent data, real photography visualization, and unmatched logistics speed.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <AboutTiltCard
            title="Clarity Over Clutter"
            subtitle="Transparent Fitment & Pricing"
            description="No deceptive disclaimers or surprise fitting fees at the counter. Every tyre shows confirmed dimensions, load index, and exact prices upfront."
            icon={Cpu}
            badge="Pillar 01"
          />

          <AboutTiltCard
            title="Performance with Purpose"
            subtitle="Australian Climate Engineered"
            description="Tested for blistering 40°C highway heat, sudden flash-flood wet grip, and rugged gravel outback corrugations across regional routes."
            icon={Gauge}
            badge="Pillar 02"
          />

          <AboutTiltCard
            title="Trust Through Data"
            subtitle="100% Fitment Guarantee"
            description="We cross-reference OEM rim widths, brake caliper clearances, and wheel offsets to guarantee your new set fits your vehicle seamlessly."
            icon={ShieldCheck}
            badge="Pillar 03"
          />
        </div>
      </section>

      {/* AUSTRALIA-WIDE FITTING NETWORK INTERACTIVE HUB */}
      <section className="mx-auto max-w-[1500px] px-5 pb-24 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#12141a] via-[#0d0f14] to-[#12141a] p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] items-center">
            <div>
              <span className="text-xs font-bold tracking-[.2em] text-race uppercase">
                Nationwide Logistics & Installation
              </span>
              <h3 className="display mt-2 text-3xl font-black uppercase text-white lg:text-5xl">
                Australia-Wide Fitting Network
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Order your tyres online and have them delivered directly to one of over 500 certified fitting
                partners across Australia. We coordinate mounting, computer balancing, and disposal of old tyres.
              </p>

              {/* City Selector Pills */}
              <div className="mt-8">
                <span className="block text-xs font-bold text-white/70 uppercase">
                  Select Metro Distribution Hub
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {metroHubs.map((hub) => (
                    <button
                      key={hub.city}
                      onClick={() => setActiveCity(hub)}
                      className={`rounded-xl px-4 py-2.5 text-xs font-bold uppercase transition ${
                        activeCity.city === hub.city
                          ? 'bg-race text-black font-extrabold shadow-[0_0_15px_rgba(244,208,0,0.3)]'
                          : 'border border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {hub.city} ({hub.state})
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected City Info Card */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="flex items-center gap-2 text-sm font-bold text-white">
                    <MapPin size={16} className="text-race" /> {activeCity.city} Metro Network
                  </span>
                  <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-[10px] font-bold text-green-400">
                    Active Freight Hub
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-white/40">Local Fitting Partners</span>
                    <strong className="block mt-0.5 text-sm font-semibold text-white">
                      {activeCity.hubs}
                    </strong>
                  </div>
                  <div>
                    <span className="text-white/40">Delivery Speed</span>
                    <strong className="block mt-0.5 text-sm font-semibold text-race">
                      {activeCity.dispatch}
                    </strong>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-white/50">
                  <span className="font-semibold text-white/70">Main Distribution:</span> {activeCity.address}
                </div>
              </div>
            </div>

            {/* Quick Actions & Contact Connection */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur">
              <div>
                <span className="text-xs font-bold text-race uppercase tracking-wider">
                  Ready to upgrade your journey?
                </span>
                <h4 className="display mt-2 text-2xl font-bold uppercase text-white lg:text-3xl">
                  Connect with our technical team
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-white/60">
                  Need custom fitment advice for staggered alloy wheels, off-road lift kit clearances, or track day alignments? Our Australian tyre specialists are ready to help.
                </p>

                <div className="mt-6 space-y-3 text-xs text-white/70">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-race" /> Exact vehicle fitment verification
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-race" /> Free freight to metro installation centers
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-race" /> 100% manufacturer warranty backed
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/tyre-finder"
                  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-race text-xs font-black tracking-wider text-black uppercase transition hover:bg-white"
                >
                  Launch Vehicle Fitment Finder <ArrowRight size={14} />
                </Link>
                <div className="flex gap-2">
                  <Link
                    href="/deals"
                    className="flex-1 flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-xs font-bold text-white uppercase hover:bg-white/10 transition"
                  >
                    View Deals
                  </Link>
                  <Link
                    href="/contact"
                    className="flex-1 flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-xs font-bold text-white uppercase hover:bg-white/10 transition"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
