import type { Metadata } from 'next'
import TyreFinder from '@/components/tyre-finder/TyreFinder'
import { ShieldCheck, HelpCircle, Compass, FileCheck, Layers } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tyre Finder & Vehicle Fitment Guide | TYRES666 Australia',
  description:
    'Find tyres by size or vehicle make and model. Check exact width, profile, and rim fitment against verified Australian manufacturer specifications.',
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_70%_10%,rgba(244,208,0,.1),transparent_35%)] px-5 pb-24 pt-36 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <span className="text-xs font-bold tracking-[.25em] text-race uppercase">
          Intelligent Fitment System
        </span>
        <h1 className="display mt-3 text-7xl font-black uppercase text-white lg:text-9xl">
          Find your fit<span className="text-race">.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/60 lg:text-lg">
          Select your width, profile, and rim diameter directly from your tyre sidewall, or choose your
          vehicle for guaranteed Australian fitment.
        </p>

        {/* Tyre Finder Tool */}
        <div className="mt-10">
          <TyreFinder />
        </div>

        {/* How to Read Your Tyre Sidewall Guide */}
        <div className="mt-14">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-race uppercase">
            <HelpCircle size={15} />
            <span>How to Read Tyre Sidewall Markings</span>
          </div>
          <h2 className="display mt-2 text-3xl font-black uppercase text-white lg:text-4xl">
            Understanding Your Tyre Numbers
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-6 transition hover:border-race/40">
              <strong className="display text-5xl font-black text-race">265</strong>
              <h4 className="mt-3 text-sm font-bold uppercase text-white">Section Width</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-white/50">
                The width of the tyre tread in millimetres measured from sidewall to sidewall.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-6 transition hover:border-race/40">
              <strong className="display text-5xl font-black text-race">65</strong>
              <h4 className="mt-3 text-sm font-bold uppercase text-white">Aspect Ratio (Profile)</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-white/50">
                The height of the tyre sidewall expressed as a percentage of the section width.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-6 transition hover:border-race/40">
              <strong className="display text-5xl font-black text-race">R17</strong>
              <h4 className="mt-3 text-sm font-bold uppercase text-white">Construction & Rim</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-white/50">
                &lsquo;R&rsquo; stands for Radial construction, followed by the wheel rim diameter in inches.
              </p>
            </div>
          </div>
        </div>

        {/* Vehicle Placard Location Advice */}
        <div className="mt-10 grid gap-6 rounded-3xl border border-white/10 bg-[#12141a] p-8 md:grid-cols-2 items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-race uppercase">
              <FileCheck size={16} />
              <span>Placard Location</span>
            </div>
            <h3 className="display mt-2 text-2xl font-bold uppercase text-white">
              Where is your tyre placard?
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              In Australia, every legal vehicle has a metal or sticker tyre placard specifying the original OEM tyre size, load index, and recommended cold tyre pressures (PSI).
            </p>
            <ul className="mt-4 space-y-2 text-xs text-white/80">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-race" /> Inside the driver&apos;s door pillar / jamb (most common)
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-race" /> Under the fuel filler flap
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-race" /> Inside the glovebox compartment or owner&apos;s manual
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Need Expert Advice?
            </h4>
            <p className="mt-1 text-xs text-white/50">
              Unsure about staggered fitments, off-road lift kit clearances, or load ratings for heavy towing?
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="/contact"
                className="flex-1 flex h-11 items-center justify-center rounded-xl bg-race text-xs font-bold uppercase text-black hover:bg-white transition"
              >
                Contact Specialist
              </Link>
              <Link
                href="/shop"
                className="flex-1 flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-xs font-bold uppercase text-white hover:bg-white/10 transition"
              >
                Shop All Tyres
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
