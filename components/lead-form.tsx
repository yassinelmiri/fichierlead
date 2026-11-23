'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

type LeadFormProps = {
  kind: 'quote' | 'contact'
}

export function LeadForm({ kind }: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')
  const isQuote = kind === 'quote'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formElement = event.currentTarget
    if (status === 'sending') return

    if (!formElement.checkValidity()) {
      formElement.classList.add('has-errors')
      setFeedback('Veuillez corriger les champs obligatoires indiqués en rouge.')
      setStatus('error')
      const firstInvalid = formElement.querySelector<HTMLElement>(':invalid')
      firstInvalid?.focus()
      firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    formElement.classList.remove('has-errors')
    setStatus('sending')
    setFeedback('')
    const formData = new FormData(formElement)
    const payload = Object.fromEntries(formData.entries())
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, kind }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Impossible d’envoyer votre message.')
      setStatus('success')
      setFeedback('Votre message a bien été envoyé. Notre équipe vous répondra dès que possible.')
      formElement.reset()
    } catch (error) {
      setStatus('error')
      setFeedback(error instanceof Error ? error.message : 'Une erreur est survenue. Réessayez dans quelques instants.')
    }
  }

  return (
    <form
      className="lead-form"
      noValidate
      onSubmit={handleSubmit}
      onInput={(event) => {
        const field = event.target
        if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
          if (field.checkValidity()) field.removeAttribute('aria-invalid')
          else field.setAttribute('aria-invalid', 'true')
        }
      }}
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
        <button className={`button button-primary${status === 'sending' ? ' is-sending' : ''}`} aria-busy={status === 'sending'} type="submit">{status === 'sending' ? <><Loader2 className="animate-spin" aria-hidden="true" /> Envoi en cours…</> : <>Envoyer ma demande <ArrowRight aria-hidden="true" /></>}</button>
        <span className="form-private"><Mail aria-hidden="true" /> Envoi sécurisé via le serveur Fichierlead.</span>
      </div>
      {feedback && <p role="status" aria-live="polite" className={status === 'success' ? 'form-feedback form-feedback-success' : 'form-feedback form-feedback-error'}>{status === 'success' ? <CheckCircle2 aria-hidden="true" /> : <AlertCircle aria-hidden="true" />}{feedback}</p>}
    </form>
  )
}
