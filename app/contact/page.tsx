import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock3, MessageCircle, ShieldCheck } from 'lucide-react'
import { LeadForm } from '@/components/lead-form'

export const metadata: Metadata = {
  title: 'Contacter Fichierlead',
  description: 'Une question sur votre projet de prospection ? Échangez avec Fichierlead et décrivez votre besoin.',
}

export default function ContactPage() {
  return (
    <>
      <section className="page-hero"><div className="container page-hero-inner"><div className="breadcrumb"><Link href="/">Accueil</Link><span aria-hidden="true">/</span><span>Contact</span></div><span className="eyebrow"><span className="eyebrow-dot" /> Parlons de votre projet</span><h1>Une question ? <span>On vous écoute.</span></h1><p>Précisez votre besoin, votre cible ou votre question. Nous vous aiderons à trouver la prochaine étape.</p></div></section>
      <section className="page-content"><div className="container contact-layout"><aside className="contact-aside"><span className="eyebrow"><span className="eyebrow-dot" /> Un échange sans pression</span><h2>Les bons projets commencent par les bonnes questions.</h2><p>Pour mieux vous orienter, indiquez votre activité, votre objectif et ce que vous souhaitez clarifier. Les champs obligatoires servent uniquement à préparer votre demande.</p><div className="contact-info-card"><span className="assurance-icon"><MessageCircle aria-hidden="true" /></span><div><strong>Un interlocuteur humain</strong><p>Votre demande est préparée dans votre messagerie afin que vous puissiez la relire avant envoi.</p></div></div><div className="contact-info-card"><span className="assurance-icon"><ShieldCheck aria-hidden="true" /></span><div><strong>Vos informations restent sous votre contrôle</strong><p>Ce site ne stocke pas vos réponses. L’envoi dépend de votre application e-mail.</p></div></div><div className="contact-info-card"><span className="assurance-icon"><Clock3 aria-hidden="true" /></span><div><strong>Besoin d’un devis ?</strong><p>Le formulaire dédié permet de préciser votre public, votre zone et les canaux envisagés.</p></div></div><div style={{ marginTop: 19 }}><Link className="inline-link" href="/devis">Accéder au formulaire de devis <ArrowRight aria-hidden="true" /></Link></div></aside><div className="form-panel"><h2>Écrivez-nous</h2><p>Les champs marqués d’un astérisque sont obligatoires.</p><LeadForm kind="contact" /></div></div></section>
    </>
  )
}
