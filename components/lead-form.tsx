import { ArrowRight, Mail } from 'lucide-react'

type LeadFormProps = {
  kind: 'quote' | 'contact'
}

export function LeadForm({ kind }: LeadFormProps) {
  const isQuote = kind === 'quote'
  const subject = isQuote ? 'Demande de devis Fichierlead' : 'Prise de contact Fichierlead'

  return (
    <form
      className="lead-form"
      action={`mailto:contact@fichierlead.com?subject=${encodeURIComponent(subject)}`}
      method="post"
      encType="text/plain"
    >
      <div className="form-grid">
        <label className="form-field">
          <span>Votre nom <b aria-hidden="true">*</b></span>
          <input autoComplete="name" name="Nom" required placeholder="Camille Martin" />
        </label>
        <label className="form-field">
          <span>E-mail professionnel <b aria-hidden="true">*</b></span>
          <input autoComplete="email" name="Email professionnel" required type="email" placeholder="camille@entreprise.fr" />
        </label>
        <label className="form-field">
          <span>Entreprise</span>
          <input autoComplete="organization" name="Entreprise" placeholder="Nom de votre entreprise" />
        </label>
        {isQuote ? (
          <label className="form-field">
            <span>Votre besoin <b aria-hidden="true">*</b></span>
            <select defaultValue="" name="Type de besoin" required>
              <option disabled value="">Sélectionner une solution</option>
              <option>Contacts professionnels B2B</option>
              <option>Audience grand public opt-in</option>
              <option>Conseil et qualification de campagne</option>
            </select>
          </label>
        ) : (
          <label className="form-field">
            <span>Sujet <b aria-hidden="true">*</b></span>
            <select defaultValue="" name="Sujet" required>
              <option disabled value="">Choisir un sujet</option>
              <option>Information sur les solutions</option>
              <option>Accompagnement commercial</option>
              <option>Protection des données</option>
              <option>Autre demande</option>
            </select>
          </label>
        )}
        {isQuote && (
          <>
            <label className="form-field">
              <span>Canal envisagé</span>
              <select defaultValue="" name="Canal envisagé">
                <option value="">À définir ensemble</option>
                <option>E-mail avec consentement documenté</option>
                <option>Téléphone professionnel</option>
                <option>Courrier postal</option>
                <option>Plusieurs canaux, selon les autorisations</option>
              </select>
            </label>
            <label className="form-field">
              <span>Région ou zone ciblée</span>
              <input name="Zone ciblée" placeholder="Ex. : région, département…" />
            </label>
          </>
        )}
        <label className="form-field form-field-wide">
          <span>{isQuote ? 'Parlez-nous de votre projet' : 'Votre message'} <b aria-hidden="true">*</b></span>
          <textarea name="Message" required rows={5} placeholder={isQuote ? 'Votre objectif, votre secteur et les critères importants…' : 'Comment pouvons-nous vous aider ?'} />
        </label>
      </div>
      <label className="consent-line">
        <input name="Accord de contact" required type="checkbox" value="Oui" />
        <span>J’accepte que Fichierlead utilise ces informations pour répondre à ma demande. <a href="/mentions-legales">En savoir plus</a>.</span>
      </label>
      <div className="form-submit-row">
        <button className="button button-primary" type="submit">Préparer ma demande <ArrowRight aria-hidden="true" /></button>
        <span className="form-private"><Mail aria-hidden="true" /> L’envoi se fait depuis votre messagerie.</span>
      </div>
      <p className="form-disclaimer">Sans service d’envoi configuré, ce formulaire ouvre un e-mail prérempli dans votre application de messagerie. Vous pourrez vérifier et envoyer le message depuis celle-ci. Rien n’est enregistré sur ce site.</p>
    </form>
  )
}
