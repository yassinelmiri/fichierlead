import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentions légales et confidentialité',
  description: 'Informations éditeur, hébergement et traitement des demandes sur le site Fichierlead.',
  robots: { index: false, follow: true },
}

export default function LegalPage() {
  return (
    <>
      <section className="page-hero"><div className="container page-hero-inner"><div className="breadcrumb"><Link href="/">Accueil</Link><span aria-hidden="true">/</span><span>Mentions légales</span></div><span className="eyebrow"><span className="eyebrow-dot" /> Informations du site</span><h1>Mentions légales & <span>confidentialité.</span></h1><p>Les informations ci-dessous doivent être complétées et validées par l’éditeur avant la mise en ligne publique.</p></div></section>
      <section className="page-content"><div className="container content-narrow"><div className="legal-warning"><strong>À compléter avant publication :</strong> l’identité légale de l’éditeur, son adresse, son numéro d’immatriculation et les coordonnées de l’hébergeur ne nous ont pas été fournis. Ces mentions ne doivent pas être inventées.</div><h2>Éditeur du site</h2><ul className="legal-list"><li><strong>Nom commercial</strong><span>Fichierlead</span></li><li><strong>Raison sociale</strong><span>À renseigner par l’éditeur</span></li><li><strong>Adresse du siège</strong><span>À renseigner par l’éditeur</span></li><li><strong>Immatriculation</strong><span>SIREN / SIRET et registre à renseigner</span></li><li><strong>Directeur de publication</strong><span>À renseigner par l’éditeur</span></li><li><strong>Hébergeur</strong><span>À confirmer avant publication</span></li></ul><h2>Formulaires et données personnelles</h2><p>Dans cette version, les formulaires utilisent la fonction de votre navigateur pour préparer un e-mail. Le site ne transmet pas lui-même les réponses à un serveur et ne conserve pas les champs saisis. L’envoi du message dépend de votre application de messagerie; les informations seront alors traitées selon les conditions de votre fournisseur de courrier et par le destinataire.</p><p>Les informations demandées sont limitées à la préparation d’une réponse. N’inscrivez pas de données sensibles dans les formulaires. Avant d’activer un service d’envoi, une base de données, des cookies non essentiels ou une mesure d’audience, l’éditeur devra actualiser cette notice et mettre en place les obligations applicables.</p><h2>Vos droits et demandes</h2><p>Pour une question relative à la protection des données ou pour exercer vos droits, vous pouvez préparer une demande via notre <Link className="inline-link" href="/contact">formulaire de contact <span className="sr-only">(prépare un e-mail)</span></Link>. Les coordonnées du responsable de traitement devront être précisées avant le lancement commercial du site.</p><h2>Propriété intellectuelle</h2><p>Les textes, le nom et les éléments graphiques de Fichierlead sont destinés à ce site. Toute réutilisation doit être autorisée par leurs titulaires respectifs.</p><h2>Dernière mise à jour</h2><p>23 novembre 2026.</p></div></section>
    </>
  )
}
