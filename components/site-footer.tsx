import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-block">
          <Link className="brand brand-footer" href="/" aria-label="Fichierlead, accueil">
            <span className="brand-symbol" aria-hidden="true"><span>F</span></span>
            <span className="brand-word">Fichier<span>lead</span></span>
          </Link>
          <p>Des données utiles pour des conversations commerciales plus justes.</p>
          <Link className="footer-contact-link" href="/contact">Parler de votre projet <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="footer-column">
          <h2>Découvrir</h2>
          <Link href="/solutions">Nos solutions</Link>
          <Link href="/devis">Demander un devis</Link>
          <Link href="/faq">Conseils & FAQ</Link>
        </div>
        <div className="footer-column">
          <h2>Fichierlead</h2>
          <Link href="/engagements">Nos engagements</Link>
          <Link href="/contact">Nous contacter</Link>
          <Link href="/mentions-legales">Mentions légales</Link>
        </div>
        <div className="footer-note">
          <span className="footer-note-icon" aria-hidden="true">✓</span>
          <div><strong>La confiance d’abord</strong><p>Nous privilégions les données documentées, la transparence et le respect des choix de chacun.</p></div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Fichierlead</span>
        <span>Prospecter avec attention.</span>
        <Link href="/mentions-legales">Confidentialité & informations légales</Link>
      </div>
    </footer>
  )
}
