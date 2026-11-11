'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

type NewsletterResult = { ok: boolean; message: string }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function subscribeToNewsletter(emailInput: string): Promise<NewsletterResult> {
  const email = typeof emailInput === 'string' ? emailInput.trim().toLowerCase() : ''
  if (!emailPattern.test(email) || email.length > 254) {
    return { ok: false, message: 'Enter a valid email address.' }
  }

  try {
    const payload = await getPayload({ config: await config })
    const existing = await payload.find({
      collection: 'newsletter-subscriptions' as never,
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: false,
    })

    if (existing.docs.length) {
      return { ok: true, message: 'You are already on the list.' }
    }

    await payload.create({
      collection: 'newsletter-subscriptions' as never,
      data: { email, source: 'home' } as never,
      overrideAccess: false,
    })
    return { ok: true, message: 'You are on the list. Thanks for subscribing.' }
  } catch (error) {
    console.error('Newsletter subscription failed', error)
    return { ok: false, message: 'We could not subscribe you right now. Please try again.' }
  }
}
