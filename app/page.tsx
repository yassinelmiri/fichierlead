import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Building2, Check, ChevronRight, CircleCheck, FileCheck2, Headset, LockKeyhole, Mail, MapPin, MessageCircle, ShieldCheck, Target, Users, Workflow } from 'lucide-react'
import { FaqList } from '@/components/faq-list'

const services = [
  {
    number: '01',
    icon: Building2,
    title: 'Contacts professionnels',
    text: 'Trouvez les interlocuteurs B2B pertinents selon votre secteur, votre zone et votre objectif commercial.',
    tags: ['Entreprises', 'Décideurs', 'B2B'],
  },
  {
    number: '02',
    icon: Users,
    title: 'Audiences opt-in',
    text: 'Explorez des audiences grand public qui ont choisi de recevoir des communications, avec un cadre clair.',
    tags: ['Consentement', 'Audience', 'Transparence'],
  },
  {
    number: '03',
    icon: Workflow,
    title: 'Activation de campagnes',
    text: 'Structurez votre approche et choisissez les canaux adaptés aux permissions et à votre message.',
    tags: ['Conseil', 'Canaux adaptés', 'Suivi'],
  },
]

const steps = [
  { number: '01', icon: Target, title: 'Décrivez votre objectif', text: 'Dites-nous qui vous souhaitez rencontrer et pourquoi.' },
  { number: '02', icon: FileCheck2, title: 'Cadrez votre sélection', text: 'Nous clarifions les critères, les sources et le cadre de contact.' },
  { number: '03', icon: MessageCircle, title: 'Passez à l’action', text: 'Vous recevez une proposition claire pour avancer sereinement.' },
]

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> La donnée au service du lien</span>
            <h1>La bonne rencontre change <span>tout.</span></h1>
            <p className="hero-description">Des contacts professionnels ciblés et des audiences consentantes pour donner du sens à votre prospection.</p>
            <div className="hero-actions">
              <Link className="button button-white" href="/devis">Construire mon devis <ArrowRight aria-hidden="true" /></Link>
              <Link className="hero-text-link" href="/solutions">Découvrir nos solutions <ChevronRight aria-hidden="true" /></Link>
            </div>
            <div className="hero-proof-row">
              <span><ShieldCheck aria-hidden="true" /> Consentement au cœur</span>
              <span><MapPin aria-hidden="true" /> Ciblage raisonné</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
            <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
            <Image className="hero-person" src="/images/fichierlead-hero.png" alt="Une professionnelle prépare sa prochaine campagne depuis son bureau" width={1024} height={683} priority />
            <div className="hero-note hero-note-top"><span className="hero-note-icon"><BadgeCheck aria-hidden="true" /></span><span><strong>Un cadre plus clair</strong><small>La confiance avant le volume</small></span></div>
            <div className="hero-note hero-note-bottom"><span className="hero-note-icon hero-note-icon-dark"><LockKeyhole aria-hidden="true" /></span><span><strong>Les bons critères</strong><small>Utiles, pertinents, maîtrisés</small></span></div>
            <div className="hero-decoration" aria-hidden="true"><i /><i /><i /><i /></div>
          </div>
        </div>
        <div className="container hero-bottom-row">
          <span className="hero-bottom-label">L’essentiel pour avancer</span>
          <div className="hero-bottom-points"><span><Check aria-hidden="true" /> Une approche adaptée à votre activité</span><span><Check aria-hidden="true" /> Des échanges transparents</span><span><Check aria-hidden="true" /> Un accompagnement humain</span></div>
        </div>
      </section>

      <section className="intro-section section-space">
        <div className="container intro-layout">
          <div className="section-heading">
            <span className="eyebrow"><span className="eyebrow-dot" /> Fichierlead, simplement</span>
            <h2>La prospection commence par <span>la pertinence.</span></h2>
          </div>
          <div className="intro-copy">
            <p>Une liste plus grande ne fait pas une meilleure conversation. Fichierlead vous aide à définir une cible cohérente, à choisir les bons critères et à avancer avec une attention réelle portée aux personnes contactées.</p>
            <Link className="inline-link" href="/engagements">Lire nos engagements <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="container assurance-grid">
          <article className="assurance-card"><span className="assurance-icon"><ShieldCheck aria-hidden="true" /></span><div><h3>Un cadre explicite</h3><p>Les conditions d’usage et les canaux se définissent dès le départ.</p></div></article>
          <article className="assurance-card"><span className="assurance-icon"><CircleCheck aria-hidden="true" /></span><div><h3>Une sélection utile</h3><p>Des critères reliés à votre besoin, pas à des catégories sensibles.</p></div></article>
          <article className="assurance-card"><span className="assurance-icon"><Headset aria-hidden="true" /></span><div><h3>Un interlocuteur à vos côtés</h3><p>Un échange humain pour construire une demande réaliste.</p></div></article>
        </div>
      </section>

      <section className="solutions-section section-space">
        <div className="container">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow"><span className="eyebrow-dot" /> Des solutions qui vous ressemblent</span>
            <h2>Votre prochain client est <span>à portée de conversation.</span></h2>
            <p>Commencez par votre objectif. Nous vous aidons à trouver le chemin le plus adapté.</p>
          </div>
          <div className="solution-grid">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <article className="solution-card" key={service.number}>
                  <div className="solution-card-top"><span className="solution-icon"><Icon aria-hidden="true" /></span><span className="solution-number">{service.number}</span></div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <div className="tag-row">{service.tags.map((tag) => <span className="soft-tag" key={tag}>{tag}</span>)}</div>
                  <Link className="solution-link" href="/solutions">En savoir plus <ArrowRight aria-hidden="true" /></Link>
                </article>
              )
            })}
          </div>
          <div className="section-action"><Link className="button button-outline" href="/solutions">Voir toutes les solutions <ArrowRight aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section className="process-section section-space">
        <div className="container process-layout">
          <div className="process-intro">
            <span className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> Une méthode claire</span>
            <h2>De votre idée à une action <span>bien ciblée.</span></h2>
            <p>Pas besoin d’avoir déjà tous les critères. Nous les clarifions ensemble avant de vous proposer une solution.</p>
            <Link className="button button-white" href="/devis">Parler de mon projet <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="process-list">
            {steps.map((step) => {
              const Icon = step.icon
              return <article className="process-item" key={step.number}><span className="process-step-number">{step.number}</span><span className="process-icon"><Icon aria-hidden="true" /></span><div><h3>{step.title}</h3><p>{step.text}</p></div></article>
            })}
          </div>
        </div>
      </section>

      <section className="commitment-section section-space">
        <div className="container commitment-card">
          <div className="commitment-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> La confiance n’est pas une option</span>
            <h2>Des données mieux comprises. Des échanges plus <span>respectueux.</span></h2>
            <p>Chaque projet doit être pensé selon son objectif, son canal et les attentes des personnes concernées. C’est ce niveau de clarté que nous voulons apporter à la prospection.</p>
            <Link className="inline-link" href="/engagements">Comprendre notre approche <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="commitment-visual" aria-label="Les trois principes Fichierlead">
            <div className="commitment-ring commitment-ring-outer" />
            <div className="commitment-ring commitment-ring-inner" />
            <div className="commitment-center"><span className="brand-symbol"><span>F</span></span><strong>Le lien<br />avant le lead.</strong></div>
            <span className="orbit-label orbit-label-one"><LockKeyhole aria-hidden="true" /> Transparence</span>
            <span className="orbit-label orbit-label-two"><CircleCheck aria-hidden="true" /> Pertinence</span>
            <span className="orbit-label orbit-label-three"><Users aria-hidden="true" /> Respect</span>
          </div>
        </div>
      </section>

      <section className="faq-section section-space">
        <div className="container faq-layout">
          <div className="faq-intro">
            <span className="eyebrow"><span className="eyebrow-dot" /> Besoin de précisions ?</span>
            <h2>Les questions qu’on nous <span>pose souvent.</span></h2>
            <p>La prospection soulève de bonnes questions. Voici les premières réponses.</p>
            <Link className="inline-link" href="/faq">Toutes les questions <ArrowRight aria-hidden="true" /></Link>
          </div>
          <FaqList compact />
        </div>
      </section>

      <section className="final-cta-section">
        <div className="container final-cta">
          <div><span className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> On en parle ?</span><h2>Votre prochain échange commence ici.</h2><p>Décrivez votre projet en quelques mots. Nous vous aiderons à le cadrer.</p></div>
          <Link className="button button-white" href="/devis">Construire mon devis <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  )
}
