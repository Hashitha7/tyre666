'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function FrontendError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="grid min-h-[75vh] place-items-center px-5 pt-24 text-center">
      <div>
        <span className="display text-8xl font-black text-white/5">500</span>
        <h1 className="display text-5xl font-black uppercase">Something went wrong.</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/45">
          Please try again. If the problem continues, return to the storefront.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-full bg-race px-7 py-4 text-xs font-black text-black"
          >
            TRY AGAIN
          </button>
          <Link
            href="/"
            className="rounded-full border border-white/15 px-7 py-4 text-xs font-black"
          >
            HOME
          </Link>
        </div>
      </div>
    </main>
  )
}
