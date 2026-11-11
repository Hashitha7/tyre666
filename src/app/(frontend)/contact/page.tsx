import type { Metadata } from 'next'
import ContentPage from '@/components/content/ContentPage'
import ContactForm from '@/components/content/ContactForm'
export const metadata: Metadata = { title: 'Contact us' }
export default function Page() {
  return (
    <ContentPage eyebrow="Support" title="Talk tyres.">
      <p>
        Have a question about tyres, fitment or delivery? Send us an enquiry and our support team
        will get back to you.
      </p>
      <ContactForm />
    </ContentPage>
  )
}
