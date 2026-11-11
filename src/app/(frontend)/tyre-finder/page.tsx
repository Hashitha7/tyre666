import type { Metadata } from 'next'
import TyreFinder from '@/components/tyre-finder/TyreFinder'
export const metadata: Metadata = {
  title: 'Tyre finder',
  description: 'Find tyres by size or prepare a vehicle fitment search.',
}
export default function Page() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_70%_10%,rgba(244,208,0,.12),transparent_30%)] px-5 pb-24 pt-36">
      <div className="mx-auto max-w-5xl">
        <span className="text-xs font-bold tracking-[.2em] text-race">INTELLIGENT FITMENT</span>
        <h1 className="display mt-3 text-7xl font-black uppercase lg:text-9xl">Find your fit.</h1>
        <p className="mt-5 max-w-2xl text-white/50">
          Read the size from your tyre sidewall, then enter width, profile and rim diameter. Always
          confirm final fitment against the vehicle placard or a qualified tyre specialist.
        </p>
        <div className="mt-10">
          <TyreFinder />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ['265', 'Width in millimetres'],
            ['65', 'Sidewall profile percentage'],
            ['R17', 'Radial construction and rim diameter'],
          ].map(([a, b]) => (
            <div key={a} className="rounded-2xl border border-white/10 p-6">
              <strong className="display text-5xl text-race">{a}</strong>
              <p className="mt-2 text-xs text-white/45">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
