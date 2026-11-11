'use server'

import { getSupabaseServerClient } from '@/lib/supabase/server'

type ContactSubmission = {
  name: string
  email: string
  phone?: string
  message: string
}

type ContactResult =
  | { ok: true; message: string }
  | { ok: false; fieldErrors?: Partial<Record<keyof ContactSubmission, string>>; message: string }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitContactSubmission(input: ContactSubmission): Promise<ContactResult> {
  const name = typeof input.name === 'string' ? input.name.trim() : ''
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : ''
  const phone = typeof input.phone === 'string' ? input.phone.trim() : ''
  const message = typeof input.message === 'string' ? input.message.trim() : ''
  const fieldErrors: Partial<Record<keyof ContactSubmission, string>> = {}

  if (name.length < 2 || name.length > 100) fieldErrors.name = 'Enter your name.'
  if (!emailPattern.test(email) || email.length > 254) fieldErrors.email = 'Enter a valid email.'
  if (phone.length > 40) fieldErrors.phone = 'Enter a shorter phone number.'
  if (message.length < 10 || message.length > 4000) {
    fieldErrors.message = 'Please enter between 10 and 4000 characters.'
  }
  if (Object.keys(fieldErrors).length) {
    return { ok: false, fieldErrors, message: 'Please check the highlighted fields.' }
  }

  try {
    const { error } = await getSupabaseServerClient().from('contact_submissions').insert({
      name,
      email,
      phone: phone || null,
      message,
    })
    if (error) throw error
    return { ok: true, message: 'Thanks. Your enquiry has been sent.' }
  } catch (error) {
    console.error('Contact submission failed', error)
    return { ok: false, message: 'We could not send your enquiry. Please try again.' }
  }
}
