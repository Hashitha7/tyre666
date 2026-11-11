import type { MetadataRoute } from 'next'

const publicUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: new URL('/sitemap.xml', publicUrl).toString(),
  }
}
