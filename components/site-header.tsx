'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

const navigation = [
  { href: '/solutions', label: 'Nos solutions' },
  { href: '/faq', label: 'Conseils & FAQ' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <>
      <a className="skip-link" href="#main-content">Aller au contenu</a>
      <div className="announcement-bar">
        <div className="container announcement-inner">
          <span className="announcement-mark"><span aria-hidden="true">✓</span> Prospection responsable</span>
          <span className="announcement-copy">Des contacts utiles, avec le consentement au cœur de chaque échange.</span>
          <Link className="announcement-link" href="/engagements">Nos engagements <ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" href="/" aria-label="Fichierlead, accueil">
            <Image className="brand-logo" src="/images/logo.png" alt="Fichierlead" width={190} height={48} priority />
          </Link>
          <nav className="desktop-nav" aria-label="Navigation principale">
            {navigation.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'))
              return <Link aria-current={active ? 'page' : undefined} className={active ? 'nav-link nav-link-active' : 'nav-link'} href={item.href} key={item.href}>{item.label}</Link>
            })}
          </nav>
          <div className="header-actions">
            <Link className="button button-primary button-small" href="/devis">Construire mon devis <ArrowRight aria-hidden="true" /></Link>
            <details className="mobile-menu">
              <summary aria-label="Ouvrir le menu"><span className="menu-lines" aria-hidden="true"><i /><i /></span><span className="sr-only">Menu</span></summary>
              <nav className="mobile-nav" aria-label="Navigation mobile">
                {navigation.map((item) => {
                  const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'))
                  return <Link aria-current={active ? 'page' : undefined} className={active ? 'mobile-nav-active' : undefined} href={item.href} key={item.href}>{item.label}</Link>
                })}
                <Link className="mobile-nav-cta" href="/devis">Construire mon devis <ArrowRight aria-hidden="true" /></Link>
              </nav>
            </details>
          </div>
        </div>
      </header>
    </>
  )
}
