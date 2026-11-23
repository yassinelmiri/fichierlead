import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CircleCheck, Eye, LockKeyhole, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nos engagements de prospection responsable',
  description: 'La démarche Fichierlead : transparence, pertinence des critères et respect du choix des personnes.',
}

const principles = [
  { icon: Eye, title: 'Une information claire', text: 'Vous devez comprendre la finalité d’une sélection, les critères retenus et les conditions d’utilisation avant de vous engager.' },
  { icon: ShieldCheck, title: 'Des permissions vérifiées', text: 'Pour les audiences grand public, nous privilégions les contacts opt-in et la documentation des autorisations liées au canal envisagé.' },
  { icon: CircleCheck, title: 'Des critères pertinents', text: 'Les critères sont cadrés pour répondre à votre besoin commercial. Nous ne proposons pas de ciblage basé sur des catégories sensibles.' },
  { icon: LockKeyhole, title: 'Une maîtrise des données', text: 'La collecte, la conservation et l’utilisation des coordonnées doivent rester limitées à la finalité annoncée et aux règles applicables.' },
]

export default function EngagementsPage() {
  return (
    <>
      <section className="page-hero"><div className="container page-hero-inner"><div className="breadcrumb"><Link href="/">Accueil</Link><span aria-hidden="true">/</span><span>Nos engagements</span></div><span className="eyebrow"><span className="eyebrow-dot" /> La confiance se construit</span><h1>La prospection peut être <span>plus attentive.</span></h1><p>Nous croyons qu’une bonne démarche commerciale commence par la pertinence, la transparence et le respect des choix de chacun.</p></div></section>
      <section className="page-content"><div className="container"><div className="content-narrow"><h2>Un cadre qui se comprend</h2><p>Les données de contact ne sont pas de simples lignes dans un fichier. Leur origine, leur usage et les attentes des personnes concernées doivent rester au centre de la réflexion.</p></div><div className="engagement-grid">{principles.map((item) => { const Icon = item.icon; return <article className="engagement-card" key={item.title}><span className="solution-detail-icon"><Icon aria-hidden="true" /></span><h2>{item.title}</h2><p>{item.text}</p></article> })}</div><div className="content-narrow" style={{ marginTop: 52 }}><h2>Votre rôle compte aussi</h2><p>Avant d’activer une campagne, vérifiez la base légale, la finalité et les obligations propres à votre canal. Les règles peuvent évoluer et dépendent de votre situation; les informations présentées ici ne remplacent pas un conseil juridique. Préservez vos listes, respectez les oppositions et indiquez clairement qui vous êtes lorsque vous contactez un prospect.</p><div className="content-callout"><strong>Notre engagement :</strong> vous aider à poser les bonnes questions avant de choisir une audience, et ne pas confondre volume et qualité.</div><div style={{ marginTop: 25 }}><Link className="inline-link" href="/faq">Lire nos réponses aux questions fréquentes <ArrowRight aria-hidden="true" /></Link></div></div></div></section>
      <section className="final-cta-section"><div className="container final-cta"><div><span className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> Un projet à cadrer ?</span><h2>Construisons une démarche claire.</h2><p>Faisons le point sur votre public, vos critères et vos canaux.</p></div><Link className="button button-white" href="/contact">Nous contacter <ArrowRight aria-hidden="true" /></Link></div></section>
    </>
  )
}
