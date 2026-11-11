'use client'

import { useState, useTransition, useMemo } from 'react'
import {
  Search,
  CarFront,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShoppingCart,
  ShieldCheck,
  Compass,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { submitFitmentRequest } from '@/lib/fitment-actions'
import { demoProducts, money } from '@/data/products'
import { useStorefront } from '@/store/storefront'

interface TyreFinderProps {
  compact?: boolean
}

// Popular Australian vehicles with OEM tyre sizes
const australianVehicles = [
  { make: 'Toyota', model: 'Hilux 4x4', width: '265', profile: '65', rim: '17', category: '4WD / Ute' },
  { make: 'Ford', model: 'Ranger PX3', width: '265', profile: '65', rim: '17', category: '4WD / Ute' },
  { make: 'Toyota', model: 'RAV4 / CX-5', width: '225', profile: '65', rim: '17', category: 'Mid-SUV' },
  { make: 'Volkswagen', model: 'Golf / i30 N', width: '225', profile: '45', rim: '18', category: 'Hatch / Sport' },
  { make: 'Subaru', model: 'Forester', width: '225', profile: '55', rim: '18', category: 'AWD Wagon' },
  { make: 'Nissan', model: 'Patrol Y62', width: '285', profile: '70', rim: '17', category: 'Heavy 4WD' },
  { make: 'Tesla', model: 'Model 3 / Y', width: '235', profile: '45', rim: '18', category: 'Electric EV' },
]

export default function TyreFinder({ compact = false }: TyreFinderProps) {
  const [mode, setMode] = useState<'size' | 'vehicle'>('size')
  const [width, setWidth] = useState('265')
  const [profile, setProfile] = useState('65')
  const [rim, setRim] = useState('17')

  const [vehicle, setVehicle] = useState({
    make: '',
    model: '',
    year: '',
    variant: '',
    email: '',
    notes: '',
  })

  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  const addToCart = useStorefront((state) => state.addToCart)

  const search = () => {
    router.push(`/shop?width=${width}&profile=${profile}&rim=${rim}`)
  }

  // Find matching tyres in current catalogue in real-time
  const matchedTyres = useMemo(() => {
    return demoProducts.filter(
      (p) =>
        p.width === Number(width) &&
        p.profile === Number(profile) &&
        p.rim === Number(rim),
    )
  }, [width, profile, rim])

  const selectClass =
    'h-14 w-full cursor-pointer appearance-none rounded-xl border border-white/15 bg-[#12141a] px-4 text-sm font-semibold text-white outline-none transition focus:border-race focus:ring-1 focus:ring-race [&>option]:bg-[#12141a] [&>option]:text-white [&>option]:py-3.5'

  return (
    <div
      className={`rounded-3xl border border-white/10 bg-[#0d0f14]/95 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl ${
        compact ? 'p-5' : 'p-6 lg:p-10'
      }`}
    >
      {/* Header Mode Tabs */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-full border border-white/10 bg-black/50 p-1 backdrop-blur">
          <button
            type="button"
            onClick={() => setMode('size')}
            className={`rounded-full px-5 py-2.5 text-xs font-black tracking-wider transition ${
              mode === 'size'
                ? 'bg-race text-black shadow-[0_0_15px_rgba(244,208,0,0.3)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            BY TYRE SIZE
          </button>
          <button
            type="button"
            onClick={() => setMode('vehicle')}
            className={`rounded-full px-5 py-2.5 text-xs font-black tracking-wider transition ${
              mode === 'vehicle'
                ? 'bg-race text-black shadow-[0_0_15px_rgba(244,208,0,0.3)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            BY VEHICLE
          </button>
        </div>

        {mode === 'size' && (
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-white/80">
            <span className="text-white/40">Active Size:</span>
            <strong className="text-race font-bold">
              {width}/{profile} R{rim}
            </strong>
          </div>
        )}
      </div>

      {mode === 'size' ? (
        <>
          {/* Controls Matrix */}
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-[1fr_1fr_1fr_auto]">
            {/* WIDTH */}
            <label className="text-xs font-bold tracking-wider text-white/50 uppercase">
              WIDTH (MM)
              <div className="relative mt-2">
                <select
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className={selectClass}
                >
                  {['205', '225', '235', '245', '265', '285'].map((v) => (
                    <option key={v} value={v} className="bg-[#12141a] text-white py-2 font-medium">
                      {v} mm
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                />
              </div>
            </label>

            {/* PROFILE */}
            <label className="text-xs font-bold tracking-wider text-white/50 uppercase">
              PROFILE (ASPECT RATIO %)
              <div className="relative mt-2">
                <select
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  className={selectClass}
                >
                  {['35', '40', '45', '55', '60', '65', '70'].map((v) => (
                    <option key={v} value={v} className="bg-[#12141a] text-white py-2 font-medium">
                      {v}% profile
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                />
              </div>
            </label>

            {/* RIM */}
            <label className="text-xs font-bold tracking-wider text-white/50 uppercase">
              RIM DIAMETER (INCHES)
              <div className="relative mt-2">
                <select
                  value={rim}
                  onChange={(e) => setRim(e.target.value)}
                  className={selectClass}
                >
                  {['16', '17', '18', '19', '20'].map((v) => (
                    <option key={v} value={v} className="bg-[#12141a] text-white py-2 font-medium">
                      {v}&quot; Wheel
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                />
              </div>
            </label>

            {/* SEARCH BUTTON */}
            <div className="mt-auto sm:col-span-2 md:col-span-1">
              <button
                type="button"
                onClick={search}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-race px-8 text-xs font-black tracking-wider text-black uppercase transition hover:bg-white"
              >
                <Search size={16} /> SEARCH ALL
              </button>
            </div>
          </div>

          {/* Quick Real-Time Match Indicator */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-race" />
              <span>
                Fitment specification:{' '}
                <strong className="text-white">
                  {width}/{profile} R{rim}
                </strong>
                {matchedTyres.length > 0 ? (
                  <span className="ml-2 font-bold text-green-400">
                    ({matchedTyres.length} exact match in stock!)
                  </span>
                ) : (
                  <span className="ml-2 text-white/40">(Custom enquiry ready)</span>
                )}
              </span>
            </div>

            <Link
              href={`/shop?width=${width}&profile=${profile}&rim=${rim}`}
              className="inline-flex items-center gap-1.5 font-bold text-race hover:text-white transition"
            >
              Browse in Shop <ArrowRight size={13} />
            </Link>
          </div>

          {/* IN-PAGE REAL-TIME MATCH RESULTS */}
          {matchedTyres.length > 0 && !compact && (
            <div className="mt-6 border-t border-white/10 pt-6">
              <span className="text-[10px] font-bold tracking-wider text-race uppercase">
                Instant Fitment Results
              </span>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {matchedTyres.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-white/10 bg-[#12151b] p-4 transition hover:border-race/40"
                  >
                    <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-white/5">
                      <Image
                        src={product.image}
                        alt={`${product.brand} ${product.name}`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <span className="text-[10px] font-bold text-race uppercase">
                        {product.brand} • {product.category}
                      </span>
                      <h4 className="display text-xl font-bold uppercase text-white">
                        {product.name}
                      </h4>
                      <span className="font-mono text-xs text-white/50">
                        {product.width}/{product.profile}R{product.rim} • {product.loadIndex}{product.speedRating}
                      </span>
                    </div>

                    <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
                      <strong className="display text-2xl font-black text-white">
                        {money(product.price)}
                      </strong>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="flex items-center gap-1.5 rounded-lg bg-race px-3.5 py-1.5 text-xs font-bold text-black uppercase hover:bg-white transition"
                      >
                        <ShoppingCart size={13} />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Quick Australian Vehicle Selector Presets */}
          <div className="mb-6">
            <span className="block text-xs font-bold tracking-wider text-white/50 uppercase">
              Popular Australian Vehicle Fitments (Quick Select)
            </span>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {australianVehicles.map((v) => (
                <button
                  key={`${v.make}-${v.model}`}
                  type="button"
                  onClick={() => {
                    setWidth(v.width)
                    setProfile(v.profile)
                    setRim(v.rim)
                    setVehicle({
                      ...vehicle,
                      make: v.make,
                      model: v.model,
                      variant: v.category,
                    })
                    setMode('size')
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-left transition hover:border-race hover:bg-race/10"
                >
                  <span className="block text-[10px] font-bold text-race uppercase">{v.category}</span>
                  <strong className="block text-xs font-bold text-white">{v.make} {v.model}</strong>
                  <span className="mt-0.5 block font-mono text-[10px] text-white/50">
                    OEM: {v.width}/{v.profile} R{v.rim}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Fitment Verification Form */}
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setResult(null)
              setFieldErrors({})
              startTransition(async () => {
                const response = await submitFitmentRequest(vehicle)
                setResult({ ok: response.ok, message: response.message })
                setFieldErrors(response.ok ? {} : response.fieldErrors || {})
                if (response.ok) {
                  setVehicle({ make: '', model: '', year: '', variant: '', email: '', notes: '' })
                }
              })
            }}
            className="grid gap-4 md:grid-cols-2"
          >
            {[
              ['make', 'Make', 'e.g. Toyota'],
              ['model', 'Model', 'e.g. Hilux'],
              ['year', 'Year', 'e.g. 2022'],
              ['variant', 'Variant / Series', 'e.g. SR5 4x4'],
              ['email', 'Email for verified fitment report', 'you@example.com'],
            ].map(([name, label, placeholder]) => (
              <label key={name} className="text-xs font-bold tracking-wider text-white/50 uppercase">
                {label}
                <input
                  required={name !== 'variant'}
                  type={name === 'year' ? 'number' : name === 'email' ? 'email' : 'text'}
                  value={vehicle[name as keyof typeof vehicle]}
                  onChange={(event) => setVehicle({ ...vehicle, [name]: event.target.value })}
                  placeholder={placeholder}
                  className={`${selectClass} mt-2`}
                />
                {fieldErrors[name] && (
                  <span className="mt-1 block text-xs font-medium text-red-400">
                    {fieldErrors[name]}
                  </span>
                )}
              </label>
            ))}

            <label className="text-xs font-bold tracking-wider text-white/50 uppercase md:col-span-2">
              NOTES (OPTIONAL WHEEL MODIFICATIONS / SUSPENSION LIFT)
              <textarea
                rows={3}
                value={vehicle.notes}
                onChange={(event) => setVehicle({ ...vehicle, notes: event.target.value })}
                placeholder="Mention any aftermarket alloy rims, lift kits, or specific driving conditions..."
                className={`${selectClass} mt-2 h-auto py-3`}
              />
              {fieldErrors.notes && (
                <span className="mt-1 block text-xs font-medium text-red-400">
                  {fieldErrors.notes}
                </span>
              )}
            </label>

            <button
              disabled={pending}
              className="flex h-14 items-center justify-center gap-2 rounded-xl bg-race text-xs font-black tracking-wider text-black uppercase transition hover:bg-white disabled:opacity-50 md:col-span-2"
            >
              {pending ? 'SUBMITTING REQUEST...' : 'REQUEST OFFICIAL FITMENT VERIFICATION'}
            </button>

            {result && (
              <div
                className={`flex items-center gap-2 rounded-xl p-4 text-xs font-medium md:col-span-2 ${
                  result.ok ? 'border border-green-500/20 bg-green-500/10 text-green-400' : 'border border-red-500/20 bg-red-500/10 text-red-400'
                }`}
              >
                {result.ok ? <CheckCircle2 size={16} /> : null}
                <span>{result.message}</span>
              </div>
            )}
          </form>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 text-xs leading-5 text-white/60">
            <CarFront size={18} className="shrink-0 text-race" />
            <span>
              Every vehicle request is checked by our Australian tyre technicians against manufacturer placard
              specifications, axle load ratings, and speed symbols before confirmation.
            </span>
          </div>
        </>
      )}
    </div>
  )
}
