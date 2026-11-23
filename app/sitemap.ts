import type { MetadataRoute } from 'next'

const siteUrl = 'https://fichierlead.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/solutions', '/engagements', '/devis', '/contact', '/faq', '/mentions-legales']
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
}
