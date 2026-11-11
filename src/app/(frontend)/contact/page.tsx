import type { Metadata } from 'next'
import ContentPage from '@/components/content/ContentPage'
import ContactForm from '@/components/content/ContactForm'
export const metadata: Metadata = { title: 'Contact us' }
export default function Page() {
  return (
    <ContentPage eyebrow="Support" title="Talk tyres.">
      <p>
        Verified phone, email, location and service hours have not yet been supplied. Add approved
        business contact information before publishing.
      </p>
      <ContactForm />
    </ContentPage>
  )
}
