import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  Database,
  FileSpreadsheet,
  Fingerprint,
  Headphones,
  Home,
  Mail,
  MapPin,
  MessageSquareText,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Users,
  Workflow,
} from 'lucide-react'

const solutions = [
  {
    icon: Home,
    number: '01',
    title: 'Fichiers de particuliers',
    description: 'Ciblez les foyers selon vos critères : habitat, situation, zone géographique et centres d’intérêt.',
    tags: ['Propriétaires', 'Locataires', 'Habitat'],
    href: '/devis?profil=particuliers',
  },
  {
    icon: Building2,
    number: '02',
    title: 'Fichiers d’entreprises',
    description: 'Identifiez les sociétés qui correspondent à votre marché, votre activité et votre zone de prospection.',
    tags: ['Entreprises', 'Secteurs', 'Localisation'],
    href: '/devis?profil=entreprises',
  },
  {
    icon: Users,
    number: '03',
    title: 'Professionnels & décideurs',
    description: 'Structurez votre ciblage autour des métiers, fonctions et profils professionnels recherchés.',
    tags: ['Dirigeants', 'Décideurs', 'Métiers'],
    href: '/devis?profil=entreprises',
  },
  {
    icon: Mail,
    number: '04',
    title: 'Contacts email & téléphone',
    description: 'Précisez les canaux de contact souhaités selon votre campagne et votre objectif.',
    tags: ['Email', 'Téléphone', 'Canaux'],
    href: '/devis',
  },
  {
    icon: MapPin,
    number: '05',
    title: 'Ciblage géographique',
    description: 'Définissez une zone précise pour concentrer vos actions sur les territoires qui vous intéressent.',
    tags: ['Ville', 'Département', 'Région'],
    href: '/devis',
  },
  {
    icon: SlidersHorizontal,
    number: '06',
    title: 'Fichier sur mesure',
    description: 'Vous avez un besoin spécifique ? Décrivez vos critères et construisons une demande adaptée.',
    tags: ['Critères personnalisés', 'Étude du besoin'],
    href: '/devis',
  },
]

const steps = [
  { icon: Search, title: 'Décrivez votre besoin', text: 'Choisissez votre profil, votre cible et les critères importants pour votre projet.' },
  { icon: SlidersHorizontal, title: 'Précisez votre ciblage', text: 'Indiquez la zone géographique, le volume et les moyens de contact souhaités.' },
  { icon: MessageSquareText, title: 'Recevez un retour', text: 'Notre équipe étudie votre demande et revient vers vous pour la suite.' },
]

const faqs = [
  { q: 'Puis-je demander un fichier qui ne figure pas dans vos catégories ?', a: 'Oui. Le formulaire vous permet de décrire un besoin spécifique. Indiquez votre cible, votre secteur et vos critères : votre demande sera étudiée sur mesure.' },
  { q: 'Puis-je choisir une zone géographique précise ?', a: 'Oui. Vous pouvez préciser une ville, un département, une région ou toute autre zone utile à votre projet.' },
  { q: 'Comment obtenir un devis ?', a: 'Cliquez sur « Construire mon devis », choisissez Particuliers ou Entreprises, puis complétez les étapes du formulaire. Votre demande sera transmise à notre équipe.' },
  { q: 'Quels moyens de contact puis-je demander ?', a: 'Vous pouvez préciser les canaux qui vous intéressent, par exemple l’adresse postale, le téléphone ou l’email, selon la cible et la disponibilité des données.' },
]

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> FICHIERLEAD · DONNÉES & PROSPECTION</span>
            <h1>Trouvez les bons contacts. <span>Développez vos projets.</span></h1>
            <p className="hero-description">Des fichiers de prospection adaptés à vos objectifs, avec un ciblage clair et une demande simple à configurer.</p>
            <div className="hero-actions">
              <Link className="button button-white" href="/devis">Construire mon devis <ArrowRight aria-hidden="true" /></Link>
              <Link className="hero-text-link" href="/solutions">Découvrir nos solutions <ChevronRight aria-hidden="true" /></Link>
            </div>
            <div className="hero-proof-row">
              <span><CheckCircle2 /> Demande personnalisée</span>
              <span><CheckCircle2 /> Parcours simple et guidé</span>
              <span><CheckCircle2 /> Accompagnement humain</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Aperçu d'un tableau de ciblage de contacts">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="hero-dashboard">
              <div className="hero-dashboard-head"><span className="hero-dashboard-dots"><i /><i /><i /></span><span>Votre ciblage</span><span className="hero-dashboard-status"><i /> En préparation</span></div>
              <div className="hero-dashboard-title"><span>Votre prochain fichier</span><strong>Un ciblage qui vous ressemble.</strong></div>
              <div className="hero-dashboard-search"><Search /><span>Rechercher une cible ou un secteur</span><SlidersHorizontal /></div>
              <div className="hero-dashboard-metrics">
                <div><span className="hero-metric-icon"><Home /></span><small>Profil</small><strong>Particuliers</strong></div>
                <div><span className="hero-metric-icon hero-metric-green"><MapPin /></span><small>Zone</small><strong>À définir</strong></div>
              </div>
              <div className="hero-dashboard-list">
                <div><span className="hero-list-icon"><Building2 /></span><span><strong>Entreprises</strong><small>Secteur & activité</small></span><BadgeCheck /></div>
                <div><span className="hero-list-icon hero-list-icon-green"><Mail /></span><span><strong>Canaux de contact</strong><small>Email · Téléphone · Postal</small></span><BadgeCheck /></div>
              </div>
              <div className="hero-dashboard-footer"><ShieldCheck /><span>Une demande structurée, étape par étape</span><ArrowRight /></div>
            </div>
            <div className="hero-note hero-note-top"><span className="hero-note-icon"><Target /></span><span><strong>Ciblage précis</strong><small>Selon vos critères</small></span></div>
            <div className="hero-note hero-note-bottom"><span className="hero-note-icon hero-note-icon-dark"><Headphones /></span><span><strong>Équipe à votre écoute</strong><small>Un accompagnement humain</small></span></div>
            <div className="hero-decoration" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
        </div>
        <div className="container hero-bottom-row">
          <span className="hero-bottom-label">Fichierlead vous accompagne</span>
          <div className="hero-bottom-points"><span><Check /> Particuliers & entreprises</span><span><Check /> Ciblage personnalisé</span><span><Check /> Demande en quelques étapes</span></div>
        </div>
      </section>

      <section className="intro-section section-space">
        <div className="container">
          <div className="intro-layout">
            <div className="section-heading"><span className="eyebrow"><span className="eyebrow-dot" /> UNE APPROCHE SIMPLE</span><h2>La bonne donnée commence par <span>le bon ciblage.</span></h2></div>
            <div className="intro-copy"><p>Chaque projet de prospection est différent. Fichierlead vous aide à préciser votre audience, à sélectionner les critères utiles et à formuler une demande cohérente avec vos objectifs.</p><Link className="inline-link" href="/engagements">En savoir plus sur nos engagements <ArrowRight /></Link></div>
          </div>
          <div className="assurance-grid">
            <div className="assurance-card"><span className="assurance-icon"><Fingerprint /></span><div><h3>Une demande claire</h3><p>Vous définissez les critères qui comptent pour votre activité.</p></div></div>
            <div className="assurance-card"><span className="assurance-icon"><Database /></span><div><h3>Des besoins structurés</h3><p>Votre demande est organisée pour faciliter son étude.</p></div></div>
            <div className="assurance-card"><span className="assurance-icon"><Headphones /></span><div><h3>Un échange humain</h3><p>Notre équipe reste disponible pour comprendre votre projet.</p></div></div>
          </div>
        </div>
      </section>

      <section className="solutions-section section-space">
        <div className="container">
          <div className="section-heading section-heading-centered"><span className="eyebrow"><span className="eyebrow-dot" /> NOS SOLUTIONS</span><h2>Quel fichier recherchez-vous <span>aujourd’hui ?</span></h2><p>Explorez nos principales possibilités de ciblage ou décrivez directement votre besoin.</p></div>
          <div className="solution-grid">
            {solutions.map((solution) => {
              const Icon = solution.icon
              return <article className="solution-card" key={solution.number}><div className="solution-card-top"><span className="solution-icon"><Icon /></span><span className="solution-number">{solution.number}</span></div><h3>{solution.title}</h3><p>{solution.description}</p><div className="tag-row">{solution.tags.map(tag => <span className="soft-tag" key={tag}>{tag}</span>)}</div><Link className="solution-link" href={solution.href}>Découvrir cette solution <ArrowRight /></Link></article>
            })}
          </div>
          <div className="section-action"><Link className="button button-primary" href="/devis">Décrire mon besoin <ArrowRight /></Link></div>
        </div>
      </section>

      <section className="process-section section-space">
        <div className="container process-layout">
          <div className="process-intro"><span className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> COMMENT ÇA MARCHE ?</span><h2>Votre demande, <span>en trois étapes.</span></h2><p>Pas besoin de connaître tous les détails dès le départ. Le formulaire vous guide pour préciser votre besoin progressivement.</p><Link className="button button-white" href="/devis">Commencer ma demande <ArrowRight /></Link></div>
          <div className="process-list">{steps.map((step, index) => { const Icon = step.icon; return <div className="process-item" key={step.title}><span className="process-step-number">0{index + 1}</span><span className="process-icon"><Icon /></span><div><h3>{step.title}</h3><p>{step.text}</p></div></div> })}</div>
        </div>
      </section>

      <section className="commitment-section section-space">
        <div className="container"><div className="commitment-card"><div className="commitment-copy"><span className="eyebrow"><span className="eyebrow-dot" /> NOTRE ENGAGEMENT</span><h2>La confiance et la transparence au cœur de <span>votre prospection.</span></h2><p>La qualité d'une démarche commence par des informations compréhensibles et un usage responsable des données. Nous privilégions la clarté sur le besoin, les critères et les modalités de votre projet.</p><Link className="inline-link" href="/engagements">Consulter nos engagements <ArrowRight /></Link></div><div className="commitment-visual"><div className="commitment-ring commitment-ring-outer" /><div className="commitment-ring commitment-ring-inner" /><span className="orbit-label orbit-label-one"><ShieldCheck /> Transparence</span><span className="orbit-label orbit-label-two"><BadgeCheck /> Confiance</span><span className="orbit-label orbit-label-three"><Fingerprint /> Respect des données</span><div className="commitment-center"><span className="brand-symbol"><span>F</span></span><strong>La donnée<br />avec attention</strong></div></div></div></div>
      </section>

      <section className="faq-section section-space">
        <div className="container faq-layout"><div className="faq-intro"><span className="eyebrow"><span className="eyebrow-dot" /> BESOIN D’AIDE ?</span><h2>Vos questions, <span>nos réponses.</span></h2><p>Quelques informations pour vous aider à préparer votre demande.</p><Link className="inline-link" href="/faq">Voir toutes les questions <ArrowRight /></Link></div><div className="faq-list">{faqs.map(item => <details className="faq-item" key={item.q}><summary>{item.q}<span className="faq-toggle" /></summary><p>{item.a}</p></details>)}</div></div>
      </section>

      <section className="final-cta-section"><div className="container final-cta"><div><span className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> À VOUS DE JOUER</span><h2>Parlons de votre prochain fichier.</h2><p>Particuliers, entreprises ou besoin spécifique : démarrez votre demande en ligne.</p></div><Link className="button button-white" href="/devis">Construire mon devis <ArrowRight /></Link></div></section>
    </div>
  )
}
