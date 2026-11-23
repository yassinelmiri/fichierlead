import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FaqList } from '@/components/faq-list'

export const metadata: Metadata = {
  title: 'FAQ — Prospection et données de contact',
  description: 'Les réponses de Fichierlead sur les audiences opt-in, la prospection B2B, les canaux de contact et les demandes de devis.',
}

export default function FaqPage() {
  return (
    <>
      <section className="page-hero"><div className="container page-hero-inner"><div className="breadcrumb"><Link href="/">Accueil</Link><span aria-hidden="true">/</span><span>Conseils & FAQ</span></div><span className="eyebrow"><span className="eyebrow-dot" /> Des réponses claires</span><h1>Les questions qu’on se <span>pose avant de prospecter.</span></h1><p>Comprenez notre approche, les grandes étapes et les points à vérifier avant de contacter une audience.</p></div></section>
      <section className="page-content"><div className="container faq-page-layout"><aside className="faq-page-aside"><span className="eyebrow"><span className="eyebrow-dot" /> Une question précise ?</span><h2>Votre contexte compte.</h2><p>Les règles dépendent de votre cible, du canal et de la finalité. Échangeons sur votre situation avant de choisir une approche.</p><Link className="button button-primary" href="/contact">Nous contacter <ArrowRight aria-hidden="true" /></Link></aside><div><FaqList /><div className="content-callout" style={{ marginTop: 26 }}><strong>Information générale :</strong> les réponses de cette page ne constituent pas un avis juridique. Vérifiez les règles applicables à votre campagne et à votre activité.</div></div></div></section>
    </>
  )
}
