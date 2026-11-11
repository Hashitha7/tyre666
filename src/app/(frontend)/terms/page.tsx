import type { Metadata } from 'next'
import ContentPage from '@/components/content/ContentPage'
export const metadata: Metadata = { title: 'Terms & conditions' }
export default function Page() {
  return (
    <ContentPage eyebrow="Legal / Draft" title="Terms & conditions.">
      <div className="rounded-2xl border border-race/25 bg-race/5 p-6 text-white">
        Draft structure only. Terms require legal and business approval before publishing.
      </div>
      <h2>Website use</h2>
      <p>
        Final terms should identify the contracting entity, acceptable website use, account
        responsibilities and intellectual property ownership.
      </p>
      <h2>Products and orders</h2>
      <p>
        Final terms should define pricing, availability, order acceptance, cancellation, fitment
        responsibility, delivery and returns.
      </p>
      <h2>Australian Consumer Law</h2>
      <p>
        Nothing in the final terms should exclude rights and guarantees that cannot legally be
        excluded.
      </p>
    </ContentPage>
  )
}
