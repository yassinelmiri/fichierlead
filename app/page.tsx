import Link from 'next/link'
import { ArrowRight, Building2, CheckCircle2, Home, ShieldCheck } from 'lucide-react'

export default function HomePage() {
  return <div className="request-home">
    <section className="request-home-hero">
      <span className="request-eyebrow"><ShieldCheck /> Fichierlead — Des données pour vos projets</span>
      <h1>Votre besoin. <span>Notre expertise.</span></h1>
      <p>Choisissez votre profil pour commencer une demande personnalisée, en quelques étapes simples.</p>
      <div className="request-home-cards">
        <Link href="/devis?profil=particuliers" className="request-home-card"><span className="request-home-icon"><Home /></span><h2>Particuliers</h2><p>Vous recherchez des fichiers ou des audiences dédiés aux particuliers.</p><span className="request-home-link">Je suis un particulier <ArrowRight /></span></Link>
        <Link href="/devis?profil=entreprises" className="request-home-card"><span className="request-home-icon request-home-icon-company"><Building2 /></span><h2>Entreprises</h2><p>Vous recherchez des contacts B2B, des entreprises ou des décideurs.</p><span className="request-home-link">Je suis une entreprise <ArrowRight /></span></Link>
      </div>
      <div className="request-home-trust"><span><CheckCircle2 /> Parcours guidé</span><span><CheckCircle2 /> Demande sur mesure</span><span><CheckCircle2 /> Contact humain</span></div>
    </section>
  </div>
}
