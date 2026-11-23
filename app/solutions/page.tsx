import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, Check, Mail, MapPin, ShieldCheck, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solutions de prospection B2B et audiences opt-in',
  description: 'Découvrez les solutions Fichierlead pour cadrer votre prospection professionnelle et vos campagnes auprès d’audiences consentantes.',
}

const solutions = [
  {
    icon: Building2,
    title: 'Contacts professionnels B2B',
    description: 'Identifiez les entreprises et interlocuteurs qui correspondent réellement à votre activité. La sélection se construit autour de critères professionnels utiles à votre projet.',
    tags: ['Secteur d’activité', 'Zone géographique', 'Profil d’entreprise'],
  },
  {
    icon: Users,
    title: 'Audiences grand public opt-in',
    description: 'Envisagez une campagne auprès de personnes qui ont accepté de recevoir des communications. La finalité, les permissions et le canal sont clarifiés en amont.',
    tags: ['Consentement documenté', 'Canal adapté', 'Finalité claire'],
  },
  {
    icon: Mail,
    title: 'Conseil en activation',
    description: 'Faites le point sur votre message, votre calendrier et les canaux les plus adaptés. Nous vous aidons à cadrer une campagne sans pousser au volume pour le volume.',
    tags: ['Email', 'Téléphone professionnel', 'Courrier'],
  },
]

export default function SolutionsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumb"><Link href="/">Accueil</Link><span aria-hidden="true">/</span><span>Nos solutions</span></div>
          <span className="eyebrow"><span className="eyebrow-dot" /> Une cible, un cadre, un objectif</span>
          <h1>Des solutions pensées pour <span>vos prochaines conversations.</span></h1>
          <p>Construisez une démarche de prospection adaptée à votre activité, en partant de critères clairs et de la bonne manière de prendre contact.</p>
          <div className="hero-actions"><Link className="button button-white" href="/devis">Parler de mon besoin <ArrowRight aria-hidden="true" /></Link><Link className="hero-text-link" href="/engagements">Notre démarche de confiance <ArrowRight aria-hidden="true" /></Link></div>
        </div>
      </section>
      <section className="page-content">
        <div className="container">
          <div className="section-heading"><span className="eyebrow"><span className="eyebrow-dot" /> Nos domaines d’accompagnement</span><h2>La pertinence avant <span>la quantité.</span></h2></div>
          <div className="solution-detail-grid">
            {solutions.map((solution) => {
              const Icon = solution.icon
              return <article className="solution-detail" key={solution.title}><span className="solution-detail-icon"><Icon aria-hidden="true" /></span><h2>{solution.title}</h2><p>{solution.description}</p><div className="tag-row">{solution.tags.map((tag) => <span className="soft-tag" key={tag}>{tag}</span>)}</div></article>
            })}
          </div>
          <div className="content-narrow" style={{ marginTop: 62 }}>
            <h2>Un cadrage simple, avant tout</h2>
            <p>Chaque projet commence par une conversation sur vos objectifs, votre public et les critères dont vous avez réellement besoin. Nous précisons ensuite le cadre d’utilisation des données et les canaux compatibles avec votre campagne.</p>
            <ul>
              <li>Une sélection guidée par des critères professionnels et géographiques adaptés.</li>
              <li>Une attention particulière portée à l’origine des données et aux permissions associées.</li>
              <li>Une recommandation transparente, sans promesse de résultats irréalistes.</li>
            </ul>
            <div className="content-callout"><strong>À retenir :</strong> les règles de prospection varient selon la cible, le canal et la finalité. Il vous appartient de vérifier que votre campagne et vos usages sont conformes aux règles applicables.</div>
            <div style={{ marginTop: 25 }}><Link className="inline-link" href="/devis">Décrire mon projet <ArrowRight aria-hidden="true" /></Link></div>
          </div>
        </div>
      </section>
      <section className="final-cta-section"><div className="container final-cta"><div><span className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> À vous de jouer</span><h2>Partons de votre objectif.</h2><p>Une demande bien cadrée est le meilleur point de départ.</p></div><Link className="button button-white" href="/devis">Demander un devis <ArrowRight aria-hidden="true" /></Link></div></section>
    </>
  )
}
