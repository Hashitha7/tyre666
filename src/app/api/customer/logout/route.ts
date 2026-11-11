import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { customerCookies } from '@/lib/shopify/customer-account'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  cookieStore.delete(customerCookies.sessionCookie)
  return NextResponse.redirect(new URL('/account', request.url))
}
