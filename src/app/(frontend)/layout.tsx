import React from 'react'
import type { Metadata } from 'next'
import { Barlow_Condensed, Inter } from 'next/font/google'
import Script from 'next/script'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import StorefrontToaster from '@/components/ui/StorefrontToaster'
import './styles.css'

const display = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700', '800', '900'],
})
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' })

const defaultTitle = 'TYRES666 — Premium Tyres Australia'
const description =
  'Premium tyres, intelligent fitment discovery and secure Shopify checkout for Australian drivers.'
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: defaultTitle, template: '%s | TYRES666' },
  description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${sans.variable} ${display.variable} min-h-screen bg-[#090a0c] text-white antialiased`}
      >
        <div id="root" tabIndex={-1}>
          <Header />
          {children}
          <Footer />
          <StorefrontToaster />
        </div>
        {googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(googleAnalyticsId)});
`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
