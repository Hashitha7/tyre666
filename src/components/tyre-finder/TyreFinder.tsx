'use client'

import { useState, useTransition } from 'react'
import { Search, CarFront } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { submitFitmentRequest } from '@/lib/fitment-actions'

export default function TyreFinder({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<'size' | 'vehicle'>('size')
  const [width, setWidth] = useState('265')
  const [profile, setProfile] = useState('65')
  const [rim, setRim] = useState('17')
  const [vehicle, setVehicle] = useState({ make: '', model: '', year: '', variant: '', email: '', notes: '' })
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  const search = () =>
    mode === 'size' ? router.push(`/shop?width=${width}&profile=${profile}&rim=${rim}`) : undefined
  const selectClass =
    'h-14 w-full rounded-xl border border-white/10 bg-white/[.05] px-4 text-sm text-white outline-none focus:border-race'
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-[#14161a]/95 p-5 shadow-2xl backdrop-blur-xl ${compact ? '' : 'p-6 lg:p-10'}`}
    >
      <div className="mb-6 inline-flex rounded-full border border-white/10 bg-black/30 p-1">
        <button
          onClick={() => setMode('size')}
          className={`rounded-full px-5 py-2.5 text-xs font-bold transition ${mode === 'size' ? 'bg-race text-black' : 'text-white/50'}`}
        >
          BY TYRE SIZE
        </button>
        <button
          onClick={() => setMode('vehicle')}
          className={`rounded-full px-5 py-2.5 text-xs font-bold transition ${mode === 'vehicle' ? 'bg-race text-black' : 'text-white/50'}`}
        >
          BY VEHICLE
        </button>
      </div>
      {mode === 'size' ? (
        <>
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
            <label className="text-xs text-white/45">
              WIDTH
              <select
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className={`${selectClass} mt-2`}
              >
                {['205', '225', '235', '245', '265', '285'].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label className="text-xs text-white/45">
              PROFILE
              <select
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                className={`${selectClass} mt-2`}
              >
                {['35', '40', '45', '55', '60', '65', '70'].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label className="text-xs text-white/45">
              RIM
              <select
                value={rim}
                onChange={(e) => setRim(e.target.value)}
                className={`${selectClass} mt-2`}
              >
                {['16', '17', '18', '19', '20'].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <button
              onClick={search}
              className="mt-auto flex h-14 items-center justify-center gap-2 rounded-xl bg-race px-7 text-xs font-black text-black"
            >
              <Search size={17} /> SEARCH
            </button>
          </div>
          <p className="mt-4 text-xs text-white/35">
            Example result: {width}/{profile}R{rim} · Searches connected Shopify tyre metafields
            when available.
          </p>
        </>
      ) : (
        <>
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
            className="grid gap-3 md:grid-cols-2"
          >
            {[
              ['make', 'Make', 'e.g. Toyota'],
              ['model', 'Model', 'e.g. Hilux'],
              ['year', 'Year', 'e.g. 2022'],
              ['variant', 'Variant / Series', 'e.g. SR5 4x4'],
              ['email', 'Email for verified result', 'you@example.com'],
            ].map(([name, label, placeholder]) => (
              <label key={name} className="text-xs text-white/45">
                {label.toUpperCase()}
                <input
                  required={name !== 'variant'}
                  type={name === 'year' ? 'number' : name === 'email' ? 'email' : 'text'}
                  value={vehicle[name as keyof typeof vehicle]}
                  onChange={(event) => setVehicle({ ...vehicle, [name]: event.target.value })}
                  placeholder={placeholder}
                  className={`${selectClass} mt-2`}
                />
                {fieldErrors[name] && <span className="mt-1 block text-red-300">{fieldErrors[name]}</span>}
              </label>
            ))}
            <label className="text-xs text-white/45 md:col-span-2">
              NOTES (OPTIONAL)
              <textarea
                rows={3}
                value={vehicle.notes}
                onChange={(event) => setVehicle({ ...vehicle, notes: event.target.value })}
                placeholder="Anything else about your vehicle or current tyres?"
                className={`${selectClass} mt-2 h-auto py-3`}
              />
              {fieldErrors.notes && <span className="mt-1 block text-red-300">{fieldErrors.notes}</span>}
            </label>
            <button
              disabled={pending}
              className="h-14 rounded-xl bg-race text-xs font-black text-black disabled:opacity-50 md:col-span-2"
            >
              {pending ? 'SENDING REQUEST...' : 'REQUEST VERIFIED FITMENT'}
            </button>
            {result && (
              <p className={`text-xs leading-5 md:col-span-2 ${result.ok ? 'text-race' : 'text-red-300'}`}>
                {result.message}
              </p>
            )}
          </form>
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-race/20 bg-race/5 p-4 text-xs leading-5 text-white/55">
            <CarFront size={18} className="shrink-0 text-race" />
            <span>
              We do not guess vehicle compatibility. Submit your details and a verified fitment
              response can be provided by the team. An approved fitment data provider can be
              connected later for instant results.
            </span>
          </div>
        </>
      )}
    </div>
  )
}
