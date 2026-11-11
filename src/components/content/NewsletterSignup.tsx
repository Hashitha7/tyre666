'use client'

import { useState, useTransition } from 'react'
import { subscribeToNewsletter } from '@/lib/newsletter-actions'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<NewsletterResult | null>(null)

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        setResult(null)
        startTransition(async () => {
          const response = await subscribeToNewsletter(email)
          setResult(response)
          if (response.ok) setEmail('')
        })
      }}
      className="mt-7 flex flex-col gap-2 sm:flex-row"
    >
      <label className="min-w-0 flex-1">
        <span className="sr-only">Email address</span>
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          className="h-14 w-full rounded-full border border-white/10 bg-black/30 px-5 text-sm"
        />
      </label>
      <button
        disabled={pending}
        className="h-14 rounded-full bg-race px-6 text-xs font-black text-black disabled:opacity-50"
      >
        {pending ? 'SENDING...' : 'SUBSCRIBE'}
      </button>
      {result && (
        <p className={`text-xs sm:absolute sm:mt-16 ${result.ok ? 'text-race' : 'text-red-300'}`}>
          {result.message}
        </p>
      )}
    </form>
  )
}

type NewsletterResult = { ok: boolean; message: string }
