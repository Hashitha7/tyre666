import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { randomBytes } from 'node:crypto'
import {
  createCustomerAuthorizationUrl,
  createPkceVerifier,
  customerAccountConfigured,
  customerCookies,
} from '@/lib/shopify/customer-account'

export async function GET(request: Request) {
  if (!customerAccountConfigured) {
    return NextResponse.redirect(new URL('/account?error=not-configured', request.url))
  }
  const state = randomBytes(32).toString('base64url')
  const verifier = createPkceVerifier()
  const cookieStore = await cookies()
  cookieStore.set(customerCookies.stateCookie, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  })
  cookieStore.set(customerCookies.verifierCookie, verifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  })
  const authorizationUrl = await createCustomerAuthorizationUrl(state, verifier)
  return NextResponse.redirect(authorizationUrl)
}
