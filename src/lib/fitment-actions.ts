'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

type FitmentRequest = {
  make: string
  model: string
  year: string
  variant: string
  email: string
  notes: string
}

type FitmentResult =
  | { ok: true; message: string }
  | {
      ok: false
      fieldErrors?: Partial<Record<keyof FitmentRequest, string>>
      message: string
    }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitFitmentRequest(input: FitmentRequest): Promise<FitmentResult> {
  const make = typeof input.make === 'string' ? input.make.trim() : ''
  const model = typeof input.model === 'string' ? input.model.trim() : ''
  const year = typeof input.year === 'string' ? input.year.trim() : ''
  const variant = typeof input.variant === 'string' ? input.variant.trim() : ''
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : ''
  const notes = typeof input.notes === 'string' ? input.notes.trim() : ''
  const fieldErrors: Partial<Record<keyof FitmentRequest, string>> = {}
  const yearNumber = Number(year)
  const currentYear = new Date().getFullYear() + 1

  if (make.length < 2 || make.length > 80) fieldErrors.make = 'Enter the vehicle make.'
  if (model.length < 1 || model.length > 80) fieldErrors.model = 'Enter the vehicle model.'
  if (!Number.isInteger(yearNumber) || yearNumber < 1950 || yearNumber > currentYear) {
    fieldErrors.year = `Enter a year from 1950 to ${currentYear}.`
  }
  if (variant.length > 100) fieldErrors.variant = 'Enter a shorter variant.'
  if (!emailPattern.test(email) || email.length > 254) fieldErrors.email = 'Enter a valid email.'
  if (notes.length > 1000) fieldErrors.notes = 'Enter fewer than 1000 characters.'

  if (Object.keys(fieldErrors).length) {
    return { ok: false, fieldErrors, message: 'Please check the highlighted fields.' }
  }

  try {
    const payload = await getPayload({ config: await config })
    await payload.create({
      collection: 'fitment-requests' as never,
      data: { make, model, year: yearNumber, variant: variant || undefined, email, notes: notes || undefined } as never,
      overrideAccess: false,
    })
    return {
      ok: true,
      message: 'Request received. Our team will verify the fitment before recommending a tyre.',
    }
  } catch (error) {
    console.error('Fitment request failed', error)
    return { ok: false, message: 'We could not submit your request. Please try again.' }
  }
}
