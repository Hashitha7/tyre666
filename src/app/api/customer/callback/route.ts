import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import {
  customerCookies,
  exchangeCustomerCode,
  sealSession,
} from '@/lib/shopify/customer-account'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const cookieStore = await cookies()
  const savedState = cookieStore.get(customerCookies.stateCookie)?.value
  const verifier = cookieStore.get(customerCookies.verifierCookie)?.value

  if (!code || !state || !savedState || state !== savedState || !verifier) {
    return NextResponse.redirect(new URL('/account?error=invalid-callback', request.url))
  }

  try {
    const session = await exchangeCustomerCode(code, verifier)
    cookieStore.set(customerCookies.sessionCookie, sealSession(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: Math.floor((session.expiresAt - Date.now()) / 1000),
      path: '/',
    })
    cookieStore.delete(customerCookies.stateCookie)
    cookieStore.delete(customerCookies.verifierCookie)
    return NextResponse.redirect(new URL('/account', request.url))
  } catch (error) {
    console.error('Shopify customer callback failed', error)
    return NextResponse.redirect(new URL('/account?error=login-failed', request.url))
  }
}
