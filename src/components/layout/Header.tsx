'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, Search, ShoppingBag, X, Heart, UserRound, ChevronRight } from 'lucide-react'
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
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const pathname = usePathname()
  const count = useStorefront((state) => state.cart.reduce((sum, line) => sum + line.quantity, 0))
  const wishes = useStorefront((state) => state.wishlist.length)
  const mobileNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close mobile nav on route change
  useEffect(() => { setOpen(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      {/* ── Ambient top glow line ── */}
      <div
        className="fixed inset-x-0 top-0 z-50 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #f4d000 30%, #f4d000 70%, transparent 100%)',
          opacity: scrolled ? 0.9 : 0.4,
          transition: 'opacity 0.4s ease',
        }}
      />

      <header
        style={{
          position: 'fixed',
          inset: '0 0 auto 0',
          zIndex: 49,
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
          /* 3-D depth: a subtle bottom shadow + inner top highlight */
          boxShadow: scrolled
            ? '0 1px 0 0 rgba(244,208,0,0.12) inset, 0 8px 40px 0 rgba(0,0,0,0.7), 0 2px 0 0 rgba(244,208,0,0.06)'
            : '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 4px 20px 0 rgba(0,0,0,0.4)',
          background: scrolled
            ? 'rgba(9,10,12,0.96)'
            : 'rgba(9,10,12,0.72)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* ── perspective layer: gives the bar a slight 3-D tilt feel ── */}
        <div
          style={{ perspective: '1200px' }}
        >
          <div
            style={{
              maxWidth: 1500,
              margin: '0 auto',
              padding: '0 2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              height: scrolled ? 56 : 70,
              transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {/* ── Logo ── */}
            <Link
              href="/"
              className="display"
              style={{
                fontSize: scrolled ? '1.3rem' : '1.6rem',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                transition: 'font-size 0.4s ease',
                textDecoration: 'none',
                color: 'white',
                /* subtle 3-D text depth */
                textShadow: '0 2px 12px rgba(244,208,0,0.25), 0 1px 0 rgba(0,0,0,0.6)',
                flexShrink: 0,
              }}
            >
              TYRES<span style={{ color: '#f4d000' }}>666</span>
            </Link>

            {/* ── Desktop nav ── */}
            <nav
              style={{
                marginLeft: 'auto',
                alignItems: 'center',
                gap: '0.25rem',
              }}
              className="hidden xl:flex"
            >
              {links.map(([label, href]) => {
                const active = isActive(href)
                const isHov = hovered === href
                return (
                  <Link
                    key={href}
                    href={href}
                    onMouseEnter={() => setHovered(href)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.35rem 0.85rem',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.13em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      color: active ? '#f4d000' : isHov ? '#ffffff' : 'rgba(255,255,255,0.55)',
                      borderRadius: 6,
                      transition: 'all 0.22s ease',
                      transform: isHov && !active ? 'translateY(-2px)' : 'translateY(0)',
                      background: active
                        ? 'rgba(244,208,0,0.08)'
                        : isHov
                          ? 'rgba(255,255,255,0.05)'
                          : 'transparent',
                      /* box-shadow gives a 3-D pressed / lifted feel */
                      boxShadow: active
                        ? '0 0 0 1px rgba(244,208,0,0.3), 0 4px 16px rgba(244,208,0,0.12), inset 0 1px 0 rgba(244,208,0,0.1)'
                        : isHov
                          ? '0 0 0 1px rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)'
                          : 'none',
                    }}
                  >
                    {label}
                    {/* active underline glow */}
                    {active && (
                      <span
                        style={{
                          position: 'absolute',
                          left: '50%',
                          bottom: -1,
                          transform: 'translateX(-50%)',
                          width: '60%',
                          height: 2,
                          borderRadius: 2,
                          background: '#f4d000',
                          boxShadow: '0 0 8px 2px rgba(244,208,0,0.6)',
                        }}
                      />
                    )}
                    {/* hover shimmer top edge */}
                    {isHov && !active && (
                      <span
                        style={{
                          position: 'absolute',
                          left: '20%',
                          top: 0,
                          width: '60%',
                          height: 1,
                          borderRadius: 1,
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* ── Icon cluster ── */}
            <div
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '0.15rem',
              }}
              className="xl:ml-3"
            >
              {[
                { href: '/search', label: 'Search', icon: <Search size={17} />, always: true, badge: 0 },
                { href: '/account', label: 'Account', icon: <UserRound size={17} />, always: false, badge: 0 },
                { href: '/shop?wishlist=true', label: 'Wishlist', icon: <Heart size={17} />, always: false, badge: wishes },
                { href: '/cart', label: 'Cart', icon: <ShoppingBag size={17} />, always: true, badge: count },
              ].map(({ href, label, icon, always, badge }) => (
                <Link
                  key={href}
                  href={href}
                  aria-label={label}
                  className={always ? '' : 'hidden sm:grid'}
                  style={{
                    position: 'relative',
                    width: 38,
                    height: 38,
                    display: always ? 'grid' : undefined,
                    placeItems: 'center',
                    borderRadius: '50%',
                    color: 'rgba(255,255,255,0.75)',
                    transition: 'all 0.2s ease',
                    background: 'transparent',
                    border: '1px solid transparent',
                    cursor: 'pointer',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(244,208,0,0.1)'
                    el.style.borderColor = 'rgba(244,208,0,0.25)'
                    el.style.color = '#f4d000'
                    el.style.boxShadow = '0 4px 16px rgba(244,208,0,0.15), inset 0 1px 0 rgba(244,208,0,0.1)'
                    el.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'transparent'
                    el.style.borderColor = 'transparent'
                    el.style.color = 'rgba(255,255,255,0.75)'
                    el.style.boxShadow = 'none'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  {icon}
                  {badge > 0 && (
                    <b
                      style={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        width: 16,
                        height: 16,
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: '50%',
                        background: '#f4d000',
                        color: '#000',
                        fontSize: 9,
                        fontWeight: 800,
                        lineHeight: 1,
                        boxShadow: '0 0 8px rgba(244,208,0,0.6)',
                        animation: 'pulse 2s infinite',
                      }}
                    >
                      {badge}
                    </b>
                  )}
                </Link>
              ))}

              {/* Mobile hamburger */}
              <button
                aria-label="Toggle menu"
                onClick={() => setOpen(!open)}
                className="xl:hidden"
                style={{
                  width: 38,
                  height: 38,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: '50%',
                  border: open ? '1px solid rgba(244,208,0,0.3)' : '1px solid rgba(255,255,255,0.08)',
                  background: open ? 'rgba(244,208,0,0.1)' : 'transparent',
                  color: open ? '#f4d000' : 'rgba(255,255,255,0.75)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile slide-down nav ── */}
        <div
          ref={mobileNavRef}
          style={{
            overflowX: 'hidden',
            overflowY: open ? 'auto' : 'hidden',
            maxHeight: open ? `calc(100dvh - ${scrolled ? 56 : 70}px)` : 0,
            transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
            borderTop: open ? '1px solid rgba(255,255,255,0.07)' : 'none',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
          }}
          className="xl:hidden"
        >
          <div
            style={{
              padding: '0.75rem 1.25rem 1.5rem',
              background: 'rgba(9,10,12,0.98)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {links.map(([label, href], i) => {
              const active = isActive(href)
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.9rem 0.5rem',
                    borderBottom: i < links.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    fontFamily: 'var(--font-display, sans-serif)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    textDecoration: 'none',
                    color: active ? '#f4d000' : 'white',
                    textShadow: active ? '0 0 20px rgba(244,208,0,0.4)' : 'none',
                    transition: 'color 0.2s ease',
                  }}
                >
                  <span>{label}</span>
                  <ChevronRight
                    size={18}
                    style={{
                      color: active ? '#f4d000' : 'rgba(255,255,255,0.3)',
                      transform: active ? 'translateX(2px)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  />
                </Link>
              )
            })}

            {/* Mobile action row */}
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                marginTop: '1.25rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {[
                { href: '/account', label: 'Account', icon: <UserRound size={16} /> },
                { href: '/shop?wishlist=true', label: `Wishlist${wishes > 0 ? ` (${wishes})` : ''}`, icon: <Heart size={16} /> },
              ].map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem 0',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {icon} {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── Keyframe for badge pulse ── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 6px rgba(244,208,0,0.6); }
          50%       { box-shadow: 0 0 14px rgba(244,208,0,0.9); }
        }
      `}</style>
    </>
  )
}
