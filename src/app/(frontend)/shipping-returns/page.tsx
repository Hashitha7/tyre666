import type { Metadata } from 'next'
import ContentPage from '@/components/content/ContentPage'
export const metadata: Metadata = { title: 'Shipping & returns' }
export default function Page() {
  return (
    <ContentPage eyebrow="Customer care" title="Shipping & returns.">
      <div className="rounded-2xl border border-race/25 bg-race/5 p-6 text-white">
        <strong>Policy awaiting business approval</strong>
        <p className="mt-2 text-white/55">
          No shipping timeframes, fees, service areas, return windows or eligibility rules are
          claimed in this preview.
        </p>
      </div>
      <h2>Delivery information</h2>
      <p>
        Confirmed delivery methods, rates and estimated timeframes will be displayed here and at
        checkout when supplied by the business and Shopify configuration.
      </p>
      <h2>Returns</h2>
      <p>
        Confirmed return eligibility, condition requirements, process, costs and consumer guarantee
        information must be approved before this page is published.
      </p>
    </ContentPage>
  )
}
