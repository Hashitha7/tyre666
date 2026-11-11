'use client'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
const items = [
  [
    'How do I find the correct tyre size?',
    'Check the sequence printed on your tyre sidewall or the tyre placard inside your vehicle. A format such as 265/65R17 means width, profile and rim diameter.',
  ],
  [
    'How do I know which tyres fit my vehicle?',
    'Use verified fitment data, your vehicle placard, and advice from a qualified tyre specialist. Vehicle lookup remains labelled as demo until a fitment provider is connected.',
  ],
  [
    'What payment methods are accepted?',
    'Supported methods will be shown accurately by Shopify hosted checkout once the store is connected.',
  ],
  [
    'How is delivery handled?',
    'The business delivery policy has not yet been confirmed. Delivery rates and availability must be supplied before publishing.',
  ],
  [
    'Can I return a product?',
    'The returns policy has not yet been confirmed. Do not rely on this preview for purchasing decisions.',
  ],
  [
    'How can I contact customer support?',
    'Approved phone, email and service hours will appear on the Contact page once provided.',
  ],
]
export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map(([q, a], i) => (
        <div key={q}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-center justify-between gap-4 py-6 text-left font-semibold"
          >
            <span>{q}</span>
            {open === i ? <Minus size={18} /> : <Plus size={18} />}
          </button>
          {open === i && <p className="pb-6 pr-10 text-sm leading-7 text-white/45">{a}</p>}
        </div>
      ))}
    </div>
  )
}
