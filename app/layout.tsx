import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Fichierlead — Des contacts utiles, une prospection responsable',
    template: '%s | Fichierlead',
  },
  description: 'Fichierlead accompagne les entreprises dans la qualification de contacts professionnels et d’audiences opt-in, avec une approche transparente et responsable.',
  applicationName: 'Fichierlead',
  generator: 'Next.js',
  keywords: ['prospection B2B', 'contacts professionnels', 'audiences opt-in', 'prospection responsable'],
  icons: { icon: '/icon.svg' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1457ec',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
