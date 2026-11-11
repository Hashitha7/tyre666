'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, Search, ShoppingBag, X, Heart, UserRound } from 'lucide-react'
import { useStorefront } from '@/store/storefront'

const links = [
  ['Home', '/'],
  ['Shop Tyres', '/shop'],
  ['Brands', '/brands'],
  ['Tyre Finder', '/tyre-finder'],
  ['Deals', '/deals'],
  ['About', '/about'],
  ['Contact', '/contact'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const count = useStorefront((state) => state.cart.reduce((sum, line) => sum + line.quantity, 0))
  const wishes = useStorefront((state) => state.wishlist.length)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090a0c]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-[1500px] items-center gap-6 px-5 lg:px-8">
        <Link href="/" className="display text-2xl font-black tracking-[-.04em]">
          TYRES<span className="text-race">666</span>
        </Link>
        <nav className="ml-auto hidden items-center gap-6 xl:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-[11px] font-bold tracking-[.14em] text-white/60 uppercase transition hover:text-race"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1 xl:ml-4">
          <Link
            href="/search"
            aria-label="Search"
            className="grid size-10 place-items-center rounded-full hover:bg-white/10"
          >
            <Search size={18} />
          </Link>
          <Link
            href="/account"
            aria-label="Customer account"
            className="hidden size-10 place-items-center rounded-full hover:bg-white/10 sm:grid"
          >
            <UserRound size={18} />
          </Link>
          <Link
            href="/shop?wishlist=true"
            aria-label="Wishlist"
            className="relative hidden size-10 place-items-center rounded-full hover:bg-white/10 sm:grid"
          >
            <Heart size={18} />
            {wishes > 0 && (
              <b className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-race text-[9px] text-black">
                {wishes}
              </b>
            )}
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative grid size-10 place-items-center rounded-full hover:bg-white/10"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <b className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-race text-[9px] text-black">
                {count}
              </b>
            )}
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="grid size-10 place-items-center rounded-full hover:bg-white/10 xl:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-white/10 bg-[#090a0c] px-5 py-6 xl:hidden">
          {links.map(([label, href]) => (
            <Link
              onClick={() => setOpen(false)}
              key={href}
              href={href}
              className="display block border-b border-white/10 py-3 text-2xl font-bold uppercase"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
