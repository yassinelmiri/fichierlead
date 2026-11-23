'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Building2, Check, CheckCircle2, ChevronRight, Home, Loader2, Mail, MapPin, Send, ShieldCheck, Users } from 'lucide-react'

type Audience = 'particuliers' | 'entreprises'
type FormState = {
  category: string
  criteria: string[]
  sectors: string[]
  zones: string
  quantity: string
  channels: string[]
  firstName: string
  lastName: string
  company: string
  email: string
  phone: string
  message: string
}
const initial: FormState = { category: '', criteria: [], sectors: [], zones: '', quantity: '', channels: [], firstName: '', lastName: '', company: '', email: '', phone: '', message: '' }
const individualCategories = ['Fichier de particuliers', 'Propriétaires', 'Locataires', 'Maisons / appartements', 'Potentiel photovoltaïque', 'Jardin / piscine', 'Seniors', 'Autre besoin']
const companyCategories = ['Fichier d’entreprises', 'Dirigeants / décideurs', 'Indépendants', 'PME / TPE', 'Créations d’entreprises', 'E-commerce', 'Emails professionnels', 'Fichier sur mesure']
const criteriaOptions = ['Propriétaire', 'Type de logement', 'Maison individuelle', 'Appartement', 'Équipement / projet', 'Autre critère']
const sectorsOptions = ['BTP / Construction', 'Commerce / Distribution', 'Santé', 'Immobilier', 'Informatique / Tech', 'Restauration', 'Transport / Logistique', 'Services', 'Formation', 'Industrie', 'Autre secteur']
const channelOptions = ['E-mail', 'Téléphone', 'Courrier postal', 'À définir ensemble']

export function MultiStepRequest() {
  const [audience, setAudience] = useState<Audience | null>(null)
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(initial)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const options = audience === 'particuliers' ? individualCategories : companyCategories
  const progress = audience ? Math.round(((step + 1) / 5) * 100) : 0
  const update = (key: keyof FormState, value: FormState[keyof FormState]) => setForm(old => ({ ...old, [key]: value }))
  const toggle = (key: 'criteria' | 'sectors' | 'channels', value: string) => setForm(old => ({ ...old, [key]: old[key].includes(value) ? old[key].filter(v => v !== value) : [...old[key], value] }))
  const canContinue = useMemo(() => {
    if (step === 0) return !!form.category
    if (step === 1) return audience === 'particuliers' ? form.criteria.length > 0 : form.sectors.length > 0
    if (step === 2) return form.zones.trim().length > 0
    if (step === 3) return form.quantity.trim().length > 0 && form.channels.length > 0
    return form.firstName.trim() && form.lastName.trim() && form.email.trim() && /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(form.email)
  }, [step, form, audience])
  const reset = () => { setAudience(null); setStep(0); setForm(initial); setSent(false); setError('') }
  async function submit() {
    setError('')
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (!serviceId || !templateId || !publicKey) {
      setError('L’envoi automatique n’est pas encore configuré. Merci de réessayer ultérieurement.')
      return
    }
    setSending(true)
    const params = {
      to_email: 'webmaster@fichierlead.com',
      customer_type: audience === 'particuliers' ? 'Particuliers' : 'Entreprises',
      category: form.category,
      criteria: form.criteria.join(', '),
      sectors: form.sectors.join(', '),
      zones: form.zones,
      quantity: form.quantity,
      channels: form.channels.join(', '),
      first_name: form.firstName,
      last_name: form.lastName,
      company: form.company || '—',
      email: form.email,
      phone: form.phone || '—',
      message: form.message || '—',
      request_date: new Date().toLocaleString('fr-FR'),
    }
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_id: serviceId, template_id: templateId, user_id: publicKey, template_params: params }),
      })
      if (!response.ok) throw new Error('EmailJS response not OK')
      setSent(true)
    } catch {
      setError('Impossible d’envoyer votre demande pour le moment. Vérifiez votre connexion puis réessayez.')
    } finally {
      setSending(false)
    }
  }
  if (sent) return <section className="request-success"><span className="request-success-icon"><CheckCircle2 /></span><span className="request-eyebrow">Demande envoyée</span><h1>Merci, votre demande est bien partie !</h1><p>Votre demande a été transmise à notre équipe. Nous reviendrons vers vous dès que possible.</p><button className="request-button request-button-primary" onClick={reset}>Faire une autre demande</button></section>
  return <section className="request-shell">
    <div className="request-top"><span className="request-eyebrow">Votre demande personnalisée</span><h1>{audience ? 'Construisons votre demande' : 'Vous êtes…'}</h1><p>{audience ? 'Quelques étapes simples pour nous permettre de comprendre votre besoin.' : 'Choisissez votre profil pour accéder à un parcours adapté.'}</p></div>
    {!audience ? <div className="request-audience-grid">
      <button className="request-audience-card" onClick={() => { setAudience('particuliers'); setStep(0) }}><span className="request-card-icon"><Home /></span><h2>Particuliers</h2><p>Vous recherchez des données ou une audience liée au grand public.</p><span className="request-card-cta">Commencer <ChevronRight /></span></button>
      <button className="request-audience-card" onClick={() => { setAudience('entreprises'); setStep(0) }}><span className="request-card-icon request-card-icon-business"><Building2 /></span><h2>Entreprises</h2><p>Vous recherchez des contacts professionnels, entreprises ou décideurs.</p><span className="request-card-cta">Commencer <ChevronRight /></span></button>
    </div> : <>
      <div className="request-progress"><div className="request-progress-track"><span style={{ width: progress + '%' }} /></div><div className="request-progress-label"><span>Étape {step + 1} sur 5</span><span>{progress}%</span></div></div>
      <div className="request-step-card">
        {step === 0 && <><div className="request-step-heading"><span className="request-step-icon"><Users /></span><div><h2>Quel type de fichier recherchez-vous ?</h2><p>Sélectionnez l’offre ou le besoin qui correspond à votre projet.</p></div></div><div className="request-choice-grid">{options.map(item => <button key={item} className={form.category === item ? 'request-choice selected' : 'request-choice'} onClick={() => update('category', item)}>{item}{form.category === item && <Check />}</button>)}</div></>}
        {step === 1 && <><div className="request-step-heading"><span className="request-step-icon">{audience === 'particuliers' ? <Home /> : <Building2 />}</span><div><h2>{audience === 'particuliers' ? 'Affinez votre sélection' : 'Quel secteur ciblez-vous ?'}</h2><p>Choisissez un ou plusieurs critères pour préciser votre besoin.</p></div></div><div className="request-choice-grid">{(audience === 'particuliers' ? criteriaOptions : sectorsOptions).map(item => { const key = audience === 'particuliers' ? 'criteria' : 'sectors'; const checked = form[key].includes(item); return <button key={item} className={checked ? 'request-choice selected' : 'request-choice'} onClick={() => toggle(key, item)}>{item}{checked && <Check />}</button> })}</div></>}
        {step === 2 && <><div className="request-step-heading"><span className="request-step-icon"><MapPin /></span><div><h2>Quelle zone géographique ?</h2><p>Indiquez les villes, départements, régions ou pays concernés.</p></div></div><label className="request-label">Zone de recherche<textarea rows={4} value={form.zones} onChange={e => update('zones', e.target.value)} placeholder="Ex. : Île-de-France, Lyon et alentours, départements 33 et 40…" /></label></>}
        {step === 3 && <><div className="request-step-heading"><span className="request-step-icon"><ShieldCheck /></span><div><h2>Volume et canaux souhaités</h2><p>Ces informations nous aideront à préparer une proposition adaptée.</p></div></div><label className="request-label">Nombre de contacts souhaité<input value={form.quantity} onChange={e => update('quantity', e.target.value)} placeholder="Ex. : 1 000, 5 000, à définir…" /></label><div className="request-label"><span>Canaux envisagés</span><div className="request-choice-grid request-choice-grid-compact">{channelOptions.map(c => { const checked = form.channels.includes(c); return <button key={c} className={checked ? 'request-choice selected' : 'request-choice'} onClick={() => toggle('channels', c)}>{c}{checked && <Check />}</button> })}</div></div></>}
        {step === 4 && <><div className="request-step-heading"><span className="request-step-icon"><Mail /></span><div><h2>Vos coordonnées</h2><p>Pour que notre équipe puisse revenir vers vous.</p></div></div><div className="request-fields-grid"><label className="request-label">Prénom *<input required value={form.firstName} onChange={e => update('firstName', e.target.value)} placeholder="Votre prénom" /></label><label className="request-label">Nom *<input required value={form.lastName} onChange={e => update('lastName', e.target.value)} placeholder="Votre nom" /></label><label className="request-label">E-mail *<input type="email" required value={form.email} onChange={e => update('email', e.target.value)} placeholder="vous@exemple.fr" /></label><label className="request-label">Téléphone<input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+33…" /></label><label className="request-label request-field-wide">Entreprise (facultatif)<input value={form.company} onChange={e => update('company', e.target.value)} placeholder="Nom de votre entreprise" /></label><label className="request-label request-field-wide">Informations complémentaires<textarea rows={3} value={form.message} onChange={e => update('message', e.target.value)} placeholder="Décrivez votre projet ou précisez vos critères…" /></label></div><label className="request-consent"><input type="checkbox" required defaultChecked /><span>J’accepte que Fichierlead utilise mes informations pour répondre à cette demande.</span></label></>}
        {error && <p className="request-error" role="alert">{error}</p>}
        <div className="request-actions">{step > 0 ? <button className="request-button request-button-secondary" onClick={() => setStep(s => s - 1)}><ArrowLeft /> Retour</button> : <button className="request-button request-button-secondary" onClick={() => {setAudience(null); setStep(0)}}>Changer de profil</button>}{step < 4 ? <button className="request-button request-button-primary" disabled={!canContinue} onClick={() => setStep(s => s + 1)}>Continuer <ArrowRight /></button> : <button className="request-button request-button-primary" disabled={!canContinue || sending} onClick={submit}>{sending ? <><Loader2 className="request-spinner" /> Envoi…</> : <>Envoyer ma demande <Send /></>}</button>}</div>
      </div>
      <p className="request-privacy"><ShieldCheck /> Vos informations sont utilisées uniquement pour traiter votre demande.</p>
    </>}
  </section>
}
