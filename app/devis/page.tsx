import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { LeadForm } from '@/components/lead-form'

export const metadata: Metadata = {
  title: 'Demander un devis de prospection',
  description: 'Décrivez votre besoin en prospection B2B ou en audience opt-in et préparez une demande de devis auprès de Fichierlead.',
}

export default function QuotePage() {
  return (
    <>
      <section className="page-hero"><div className="container page-hero-inner"><div className="breadcrumb"><Link href="/">Accueil</Link><span aria-hidden="true">/</span><span>Demande de devis</span></div><span className="eyebrow"><span className="eyebrow-dot" /> Votre besoin, votre cadre</span><h1>Construisez un devis <span>à votre mesure.</span></h1><p>Quelques informations suffisent pour commencer à cadrer votre demande. Vous pourrez relire le message avant de l’envoyer.</p></div></section>
      <section className="page-content"><div className="container contact-layout"><aside className="contact-aside"><span className="eyebrow"><span className="eyebrow-dot" /> Comment ça marche ?</span><h2>Une demande claire, sans engagement.</h2><p>Précisez ce que vous cherchez et nous pourrons échanger sur les critères, les permissions et les canaux appropriés à votre objectif.</p><div className="contact-info-card"><span className="assurance-icon"><Check aria-hidden="true" /></span><div><strong>Une sélection cohérente</strong><p>Nous partons de votre activité et des critères réellement utiles.</p></div></div><div className="contact-info-card"><span className="assurance-icon"><ShieldCheck aria-hidden="true" /></span><div><strong>Un cadre explicite</strong><p>Les conditions d’utilisation sont abordées avant toute proposition.</p></div></div><div className="content-callout"><strong>À noter :</strong> le site ne calcule pas de prix automatiquement et n’enregistre pas les demandes. Il prépare un e-mail que vous envoyez vous-même.</div><div style={{ marginTop: 19 }}><Link className="inline-link" href="/solutions">Comparer les solutions <ArrowRight aria-hidden="true" /></Link></div></aside><div className="form-panel"><h2>Décrivez votre projet</h2><p>Les champs marqués d’un astérisque sont obligatoires.</p><LeadForm kind="quote" /></div></div></section>
    </>
  )
}
