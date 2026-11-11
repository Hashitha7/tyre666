import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import {
  customerCookies,
  customerAccountConfigured,
  getCustomerOrders,
  openSession,
  type CustomerOrder,
} from '@/lib/shopify/customer-account'

export const metadata: Metadata = {
  title: 'My account',
  description: 'Sign in to view your Shopify orders and account details.',
}

export const dynamic = 'force-dynamic'

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const cookieStore = await cookies()
  const sessionValue = cookieStore.get(customerCookies.sessionCookie)?.value
  const session = sessionValue ? openSession(sessionValue) : null

  if (!session) {
    return (
      <main className="mx-auto min-h-[75vh] max-w-3xl px-5 pb-24 pt-36 text-center">
        <span className="text-xs font-bold tracking-[.2em] text-race">SHOPIFY CUSTOMER ACCOUNT</span>
        <h1 className="display mt-3 text-7xl font-black uppercase">Your account.</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/50">
          Sign in to view your Shopify order history. Guest checkout remains available from the cart.
        </p>
        {error && (
          <p className="mx-auto mt-6 max-w-md rounded-xl border border-red-300/20 bg-red-300/10 p-4 text-xs text-red-200">
            Sign in could not be completed. Please try again or continue as a guest.
          </p>
        )}
        {customerAccountConfigured ? (
          <a
            href="/api/customer/login"
            className="mt-8 inline-flex rounded-full bg-race px-7 py-4 text-xs font-black text-black"
          >
            SIGN IN WITH SHOPIFY
          </a>
        ) : (
          <p className="mx-auto mt-8 max-w-md rounded-xl border border-white/10 p-4 text-xs text-white/45">
            Customer accounts are not configured yet. The store owner must add Shopify Customer Account API settings.
          </p>
        )}
      </main>
    )
  }

  let orders: CustomerOrder[] = []
  let orderError = false
  try {
    orders = await getCustomerOrders(session.accessToken)
  } catch (requestError) {
    console.error('Shopify orders could not be loaded', requestError)
    orderError = true
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 pb-24 pt-36">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="text-xs font-bold tracking-[.2em] text-race">CUSTOMER ACCOUNT</span>
          <h1 className="display mt-3 text-7xl font-black uppercase">Your orders.</h1>
        </div>
        <a href="/api/customer/logout" className="text-xs font-bold tracking-widest text-white/50 hover:text-race">
          SIGN OUT
        </a>
      </div>
      {orderError ? (
        <p className="mt-10 rounded-2xl border border-red-300/20 bg-red-300/10 p-6 text-sm text-red-200">
          Orders are temporarily unavailable. Please refresh or try again later.
        </p>
      ) : orders.length ? (
        <div className="mt-10 space-y-4">
          {orders.map((order, index) => (
            <article key={order.id || index} className="rounded-2xl border border-white/10 bg-white/[.03] p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-race">ORDER</span>
                  <h2 className="display mt-1 text-3xl font-bold uppercase">
                    #{order.number || 'Pending'}
                  </h2>
                  {order.processedAt && (
                    <p className="mt-1 text-xs text-white/40">
                      {new Intl.DateTimeFormat('en-AU', { dateStyle: 'medium' }).format(
                        new Date(order.processedAt),
                      )}
                    </p>
                  )}
                </div>
                <div className="text-right text-xs text-white/50">
                  <p>{order.financialStatus || 'Payment status unavailable'}</p>
                  <p>{order.fulfillmentStatus || 'Fulfilment status unavailable'}</p>
                  {order.totalPrice && (
                    <strong className="mt-2 block text-base text-white">
                      {order.totalPrice.currencyCode} {order.totalPrice.amount}
                    </strong>
                  )}
                </div>
              </div>
              {order.lineItems?.edges?.length ? (
                <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm text-white/55">
                  {order.lineItems.edges.map(({ node }, itemIndex) => (
                    <li key={`${node.title}-${itemIndex}`} className="flex justify-between gap-4">
                      <span>{node.title}</span>
                      <span>x{node.quantity}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-white/15 p-10 text-center text-sm text-white/45">
          No orders found. <Link href="/shop" className="text-race">Browse tyres</Link>.
        </div>
      )}
    </main>
  )
}
