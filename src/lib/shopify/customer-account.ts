import 'server-only'

import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto'

const domain = process.env.SHOPIFY_STORE_DOMAIN
const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID
const clientSecret = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_SECRET
const redirectUri = process.env.SHOPIFY_CUSTOMER_ACCOUNT_REDIRECT_URI
const sessionSecret = process.env.SHOPIFY_CUSTOMER_ACCOUNT_SESSION_SECRET

export const customerAccountConfigured = Boolean(
  domain && clientId && redirectUri && sessionSecret,
)

const sessionCookie = 'tyres666-customer-session'
const stateCookie = 'tyres666-customer-state'
const verifierCookie = 'tyres666-customer-verifier'

type Discovery = {
  authorization_endpoint: string
  token_endpoint: string
  graphql_endpoint?: string
}

type CustomerSession = {
  accessToken: string
  expiresAt: number
}

export type CustomerOrder = {
  id: string
  number?: string | number
  processedAt?: string
  financialStatus?: string
  fulfillmentStatus?: string
  totalPrice?: { amount: string; currencyCode: string }
  lineItems?: { edges: Array<{ node: { title: string; quantity: number } }> }
}

function requireConfig() {
  if (!domain || !clientId || !redirectUri || !sessionSecret) {
    throw new Error('Shopify customer accounts are not configured')
  }
}

function key() {
  requireConfig()
  return createHash('sha256').update(sessionSecret!).digest()
}

export function createPkceVerifier() {
  return randomBytes(48).toString('base64url')
}

export function createPkceChallenge(verifier: string) {
  return createHash('sha256').update(verifier).digest('base64url')
}

export async function discoverCustomerAccount(): Promise<Discovery> {
  requireConfig()
  const response = await fetch(`https://${domain}/.well-known/openid-configuration`, {
    cache: 'no-store',
  })
  if (!response.ok) throw new Error('Shopify customer account discovery failed')
  return response.json()
}

export async function createCustomerAuthorizationUrl(state: string, verifier: string) {
  const discovery = await discoverCustomerAccount()
  const url = new URL(discovery.authorization_endpoint)
  url.searchParams.set('client_id', clientId!)
  url.searchParams.set('redirect_uri', redirectUri!)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', 'openid email')
  url.searchParams.set('state', state)
  url.searchParams.set('code_challenge', createPkceChallenge(verifier))
  url.searchParams.set('code_challenge_method', 'S256')
  return url
}

export async function exchangeCustomerCode(code: string, verifier: string): Promise<CustomerSession> {
  const discovery = await discoverCustomerAccount()
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId!,
    redirect_uri: redirectUri!,
    code,
    code_verifier: verifier,
  })
  if (clientSecret) body.set('client_secret', clientSecret)
  const response = await fetch(discovery.token_endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    cache: 'no-store',
  })
  if (!response.ok) throw new Error('Shopify customer account token exchange failed')
  const token = (await response.json()) as { access_token?: string; expires_in?: number }
  if (!token.access_token) throw new Error('Shopify did not return a customer access token')
  return {
    accessToken: token.access_token,
    expiresAt: Date.now() + (token.expires_in || 3600) * 1000,
  }
}

export function sealSession(session: CustomerSession) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key(), iv)
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(session), 'utf8'),
    cipher.final(),
  ])
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString('base64url')
}

export function openSession(value: string): CustomerSession | null {
  try {
    const payload = Buffer.from(value, 'base64url')
    const decipher = createDecipheriv('aes-256-gcm', key(), payload.subarray(0, 12))
    decipher.setAuthTag(payload.subarray(12, 28))
    const session = JSON.parse(
      Buffer.concat([decipher.update(payload.subarray(28)), decipher.final()]).toString('utf8'),
    ) as CustomerSession
    return session.expiresAt > Date.now() ? session : null
  } catch {
    return null
  }
}

export const customerCookies = { sessionCookie, stateCookie, verifierCookie }

export async function getCustomerOrders(accessToken: string) {
  const discovery = await discoverCustomerAccount()
  if (!discovery.graphql_endpoint) return []
  const response = await fetch(discovery.graphql_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `query CustomerOrders {
        customer {
          orders(first: 20) {
            edges {
              node {
                id
                number
                processedAt
                financialStatus
                fulfillmentStatus
                totalPrice { amount currencyCode }
                lineItems(first: 10) { edges { node { title quantity } } }
              }
            }
          }
        }
      }`,
    }),
    cache: 'no-store',
  })
  if (!response.ok) throw new Error('Shopify order request failed')
  const payload = (await response.json()) as {
    data?: { customer?: { orders?: { edges?: Array<{ node: unknown }> } } }
    errors?: unknown[]
  }
  if (payload.errors) throw new Error('Shopify returned an order request error')
  return (payload.data?.customer?.orders?.edges?.map((edge) => edge.node) || []) as CustomerOrder[]
}
