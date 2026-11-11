export default function Loading() {
  return (
    <main className="grid min-h-[75vh] place-items-center px-5 pt-24">
      <div className="text-center">
        <div className="mx-auto size-12 animate-spin rounded-full border-4 border-white/10 border-t-race" />
        <p className="mt-5 text-xs font-bold tracking-[.2em] text-white/45 uppercase">
          Loading catalogue
        </p>
      </div>
    </main>
  )
}
