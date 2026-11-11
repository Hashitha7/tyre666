import Link from 'next/link'
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center overflow-hidden px-5 pt-20 text-center">
      <div>
        <div className="display text-[12rem] font-black leading-none text-stroke sm:text-[18rem]">
          404
        </div>
        <h1 className="display -mt-8 text-5xl font-black uppercase sm:text-7xl">Wrong turn.</h1>
        <p className="mt-4 text-white/45">This road doesn’t lead to a tyre.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-full border border-white/15 px-6 py-4 text-xs font-bold"
          >
            BACK HOME
          </Link>
          <Link
            href="/shop"
            className="rounded-full bg-race px-6 py-4 text-xs font-black text-black"
          >
            SHOP TYRES
          </Link>
        </div>
      </div>
    </main>
  )
}
