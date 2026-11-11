import type { ReactNode } from 'react'
export default function ContentPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <main className="mx-auto min-h-[75vh] max-w-5xl px-5 pb-28 pt-36">
      <span className="text-xs font-bold tracking-[.22em] text-race uppercase">{eyebrow}</span>
      <h1 className="display mt-3 text-6xl font-black uppercase sm:text-8xl">{title}</h1>
      <div className="mt-12 space-y-8 text-sm leading-7 text-white/55 [&_h2]:display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:uppercase [&_a]:text-race">
        {children}
      </div>
    </main>
  )
}
