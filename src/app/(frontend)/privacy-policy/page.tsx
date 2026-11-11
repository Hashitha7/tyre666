import type { Metadata } from 'next'
import ContentPage from '@/components/content/ContentPage'
export const metadata: Metadata = { title: 'Privacy policy' }
export default function Page() {
  return (
    <ContentPage eyebrow="Legal / Draft" title="Privacy policy.">
      <div className="rounded-2xl border border-race/25 bg-race/5 p-6 text-white">
        Draft structure only. Obtain legal review and insert the business entity, contact details,
        data processors and retention practices before publishing.
      </div>
      <h2>Information collection</h2>
      <p>
        The final policy should explain information collected through account, checkout, contact,
        analytics and newsletter interactions.
      </p>
      <h2>Use and disclosure</h2>
      <p>
        The final policy should identify how information is used, which service providers receive
        it, and how Shopify and other processors handle data.
      </p>
      <h2>Your choices</h2>
      <p>
        The final policy should explain access, correction, marketing preferences, complaints and
        applicable Australian privacy rights.
      </p>
    </ContentPage>
  )
}
