'use server'

import { getSupabaseServerClient } from '@/lib/supabase/server'

type NewsletterResult = { ok: boolean; message: string }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function subscribeToNewsletter(emailInput: string): Promise<NewsletterResult> {
  const email = typeof emailInput === 'string' ? emailInput.trim().toLowerCase() : ''
  if (!emailPattern.test(email) || email.length > 254) {
    return { ok: false, message: 'Enter a valid email address.' }
  }

  try {
    const client = getSupabaseServerClient()
    const { data: existing, error: lookupError } = await client
      .from('newsletter_subscriptions')
      .select('id')
      .eq('email', email)
      .maybeSingle()
    if (lookupError) throw lookupError

    if (existing) {
      return { ok: true, message: 'You are already on the list.' }
    }

    const { error } = await client
      .from('newsletter_subscriptions')
      .insert({ email, source: 'home' })
    if (error) throw error
    return { ok: true, message: 'You are on the list. Thanks for subscribing.' }
  } catch (error) {
    console.error('Newsletter subscription failed', error)
    return { ok: false, message: 'We could not subscribe you right now. Please try again.' }
  }
}
