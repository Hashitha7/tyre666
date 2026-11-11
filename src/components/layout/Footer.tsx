import Link from 'next/link'
import { Camera, Users, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#07080a]">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <div className="display text-4xl font-black">
            TYRES<span className="text-race">666</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/50">
            A next-generation Australian tyre shopping experience. Live products, availability and
            checkout are supplied by Shopify when connected.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              aria-label="Instagram"
              href="#"
              className="grid size-10 place-items-center rounded-full border border-white/10"
            >
              <Camera size={17} />
            </a>
            <a
              aria-label="Facebook"
              href="#"
              className="grid size-10 place-items-center rounded-full border border-white/10"
            >
              <Users size={17} />
            </a>
          </div>
        </div>
        {[
          [
            'SHOP',
            [
              ['All tyres', '/shop'],
              ['Tyre finder', '/tyre-finder'],
              ['Brands', '/brands'],
              ['Deals', '/deals'],
            ],
          ],
          [
            'SUPPORT',
            [
              ['Contact', '/contact'],
              ['FAQ', '/faq'],
              ['Shipping & returns', '/shipping-returns'],
              ['Cart', '/cart'],
            ],
          ],
          [
            'LEGAL',
            [
              ['Privacy', '/privacy-policy'],
              ['Terms', '/terms'],
              ['About', '/about'],
              ['Admin', '/admin'],
            ],
          ],
        ].map(([title, items]) => (
          <div key={title as string}>
            <h3 className="text-xs font-bold tracking-[.2em] text-race">{title as string}</h3>
            <ul className="mt-5 space-y-3">
              {(items as string[][]).map(([label, href]) => (
                <li key={href}>
                  <Link
                    className="inline-flex items-center gap-1 text-sm text-white/55 hover:text-white"
                    href={href}
                  >
                    {label}
                    <ArrowUpRight size={12} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-[11px] tracking-wider text-white/35 uppercase">
        © {new Date().getFullYear()} TYRES666 · Australia · Prices shown in AUD
      </div>
    </footer>
  )
}
