import type { Metadata } from 'next'
import AboutExperience from '@/components/about/AboutExperience'

export const metadata: Metadata = {
  title: 'About Us | Built for the Drive • TYRES666 Australia',
  description:
    'Discover the TYRES666 story. Precision 3D tyre engineering, transparent specifications, and our nationwide certified fitting network across Australia.',
}

export default function Page() {
  return (
    <main className="min-h-screen">
      <AboutExperience />
    </main>
  )
}
