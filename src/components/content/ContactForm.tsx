'use client'
import { useState, useTransition } from 'react'
import { submitContactSubmission } from '@/lib/contact-actions'

export default function ContactForm() {
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const input = {
          name: String(formData.get('name') || ''),
          email: String(formData.get('email') || ''),
          phone: String(formData.get('phone') || ''),
          message: String(formData.get('message') || ''),
        }
        setResult(null)
        setFieldErrors({})
        startTransition(async () => {
          const response = await submitContactSubmission(input)
          setResult({ ok: response.ok, message: response.message })
          setFieldErrors(response.ok ? {} : response.fieldErrors || {})
          if (response.ok) form.reset()
        })
      }}
      className="grid gap-4 rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:grid-cols-2"
    >
      {[
        ['name', 'Name', 'text', true],
        ['email', 'Email', 'email', true],
        ['phone', 'Phone (optional)', 'text', false],
      ].map(([name, label, type, required], i) => (
        <label key={name as string} className={i === 2 ? 'sm:col-span-2' : ''}>
          <span className="text-xs text-white/40">{label as string}</span>
          <input
            name={name as string}
            required={required as boolean}
            type={type as string}
            className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4"
          />
          {fieldErrors[name as string] && (
            <span className="mt-1 block text-xs text-red-300">{fieldErrors[name as string]}</span>
          )}
        </label>
      ))}
      <label className="sm:col-span-2">
        <span className="text-xs text-white/40">How can we help?</span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-4"
        />
        {fieldErrors.message && (
          <span className="mt-1 block text-xs text-red-300">{fieldErrors.message}</span>
        )}
      </label>
      <button
        disabled={pending}
        className="h-12 rounded-full bg-race px-6 text-xs font-black text-black disabled:opacity-50 sm:col-span-2"
      >
        {pending ? 'SENDING...' : 'SEND ENQUIRY'}
      </button>
      {result && (
        <p
          aria-live="polite"
          className={`sm:col-span-2 text-center text-xs ${result.ok ? 'text-race' : 'text-red-300'}`}
        >
          {result.message}
        </p>
      )}
    </form>
  )
}
