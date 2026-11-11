import type { Metadata } from 'next'
import ContentPage from '@/components/content/ContentPage'
import Faq from '@/components/content/Faq'
export const metadata: Metadata = { title: 'Frequently asked questions' }
export default function Page() {
  return (
    <ContentPage eyebrow="Help centre" title="Questions, answered.">
      <Faq />
    </ContentPage>
  )
}
