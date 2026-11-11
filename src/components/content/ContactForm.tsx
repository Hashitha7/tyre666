'use client'
import { useState } from 'react'
export default function ContactForm() {
  const [sent, setSent] = useState(false)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
      className="grid gap-4 rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:grid-cols-2"
    >
      {['Name', 'Email', 'Phone (optional)'].map((x, i) => (
        <label key={x} className={i === 2 ? 'sm:col-span-2' : ''}>
          <span className="text-xs text-white/40">{x}</span>
          <input
            required={i < 2}
            type={i === 1 ? 'email' : 'text'}
            className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4"
          />
        </label>
      ))}
      <label className="sm:col-span-2">
        <span className="text-xs text-white/40">How can we help?</span>
        <textarea
          required
          rows={5}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-4"
        />
      </label>
      <button className="h-12 rounded-full bg-race px-6 text-xs font-black text-black sm:col-span-2">
        SEND ENQUIRY
      </button>
      {sent && (
        <p className="sm:col-span-2 text-center text-xs text-race">
          Form captured for preview only. Connect an email or CRM provider before publishing.
        </p>
      )}
    </form>
  )
}
