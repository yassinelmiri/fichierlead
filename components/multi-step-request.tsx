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
const geographicRegions = [
  { name: 'Bretagne', code: 'BRE', hint: '22 · 29 · 35 · 56', position: 'bretagne' },
  { name: 'Normandie', code: 'NOR', hint: '14 · 27 · 50 · 61 · 76', position: 'normandie' },
  { name: 'Hauts-de-France', code: 'HDF', hint: '02 · 59 · 60 · 62 · 80', position: 'hauts' },
  { name: 'Île-de-France', code: 'IDF', hint: '75 · 77 · 78 · 91 · 92 · 93 · 94 · 95', position: 'idf' },
  { name: 'Pays de la Loire', code: 'PDL', hint: '44 · 49 · 53 · 72 · 85', position: 'pays' },
  { name: 'Centre-Val de Loire', code: 'CVL', hint: '18 · 28 · 36 · 37 · 41 · 45', position: 'centre' },
  { name: 'Grand Est', code: 'GES', hint: '08 · 10 · 51 · 52 · 54 · 55 · 57 · 67 · 68 · 88', position: 'est' },
  { name: 'Nouvelle-Aquitaine', code: 'NAQ', hint: '16 · 17 · 19 · 23 · 24 · 33 · 40 · 47 · 64 · 79 · 86 · 87', position: 'aquitaine' },
  { name: 'Bourgogne-Franche-Comté', code: 'BFC', hint: '21 · 25 · 39 · 58 · 70 · 71 · 89 · 90', position: 'bourgogne' },
  { name: 'Auvergne-Rhône-Alpes', code: 'ARA', hint: '01 · 03 · 07 · 15 · 26 · 38 · 42 · 43 · 63 · 69 · 73 · 74', position: 'auvergne' },
  { name: 'Occitanie', code: 'OCC', hint: '09 · 11 · 12 · 30 · 31 · 32 · 34 · 46 · 48 · 65 · 66 · 81 · 82', position: 'occitanie' },
  { name: 'Provence-Alpes-Côte d’Azur', code: 'PAC', hint: '04 · 05 · 06 · 13 · 83 · 84', position: 'paca' },
  { name: 'Corse', code: 'COR', hint: '2A · 2B', position: 'corse' },
  { name: 'Outre-mer', code: 'OM', hint: 'Guadeloupe · Martinique · Guyane · Réunion · Mayotte', position: 'outremer' },
]


function GeographicZonePicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [search, setSearch] = useState('')
  const selected = value ? value.split(',').map(item => item.trim()).filter(Boolean) : []
  const filtered = geographicRegions.filter(region => (region.name + ' ' + region.code + ' ' + region.hint).toLowerCase().includes(search.toLowerCase()))
  const toggleRegion = (name: string) => {
    const next = selected.includes(name) ? selected.filter(item => item !== name) : [...selected, name]
    onChange(next.join(', '))
  }
  return <>
    <div className="request-step-heading">
      <span className="request-step-icon"><MapPin /></span>
      <div><h2>Quelle zone géographique ?</h2><p>Sélectionnez une ou plusieurs régions sur notre carte simplifiée de France, ou recherchez une zone.</p></div>
    </div>
    <div className="geo-picker">
      <div className="geo-picker-toolbar">
        <label className="geo-search"><MapPin /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Rechercher une région, un code ou un département…" aria-label="Rechercher une zone géographique" /></label>
        <span className="geo-count">{selected.length} zone{selected.length > 1 ? 's' : ''} sélectionnée{selected.length > 1 ? 's' : ''}</span>
      </div>
      <div className="geo-map-panel">
        <div className="geo-map-caption"><span className="geo-live-dot" /> France métropolitaine & outre-mer <small>Choix multiple</small></div>
        <div className="geo-region-map" aria-label="Sélection des régions françaises">
          {filtered.map(region => <button type="button" key={region.code} onClick={() => toggleRegion(region.name)} className={`geo-region geo-${region.position} ${selected.includes(region.name) ? 'is-selected' : ''}`} aria-pressed={selected.includes(region.name)}>
            <strong>{region.name}</strong><small>{region.code}</small>
          </button>)}
          {filtered.length === 0 && <div className="geo-empty">Aucune région trouvée. Essayez un autre nom ou code.</div>}
        </div>
        <div className="geo-map-legend"><span><i className="geo-legend-dot" /> Disponible</span><span><i className="geo-legend-dot selected" /> Sélectionnée</span></div>
      </div>
      <div className="geo-region-details">
        <div className="geo-region-details-title"><strong>Choisir par région</strong><span>Appuyez pour ajouter ou retirer une région</span></div>
        <div className="geo-region-list">
          {filtered.map(region => <button type="button" key={region.code} onClick={() => toggleRegion(region.name)} className={selected.includes(region.name) ? 'geo-region-option selected' : 'geo-region-option'} aria-pressed={selected.includes(region.name)}>
            <span className="geo-option-check">{selected.includes(region.name) && <Check />}</span><span className="geo-option-copy"><strong>{region.name}</strong><small>{region.hint}</small></span>
          </button>)}
        </div>
      </div>
      {selected.length > 0 && <div className="geo-selected"><div><strong>Votre sélection</strong><span>{selected.length} zone(s) incluse(s) dans votre demande</span></div><div className="geo-chips">{selected.map(name => <button type="button" key={name} onClick={() => toggleRegion(name)} aria-label={`Retirer ${name}`}>{name}<span>×</span></button>)}</div><button type="button" className="geo-clear" onClick={() => onChange('')}>Tout effacer</button></div>}
      <p className="geo-hint">Vous pouvez sélectionner plusieurs régions. Les départements correspondants sont indiqués sous chaque région.</p>
    </div>
  </>
}

export function MultiStepRequest() {
  const [audience, setAudience] = useState<Audience | null>(null)
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(initial)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [consent, setConsent] = useState(false)
  const options = audience === 'particuliers' ? individualCategories : companyCategories
  const progress = audience ? Math.round(((step + 1) / 5) * 100) : 0
  const update = (key: keyof FormState, value: FormState[keyof FormState]) => setForm(old => ({ ...old, [key]: value }))
  const toggle = (key: 'criteria' | 'sectors' | 'channels', value: string) => setForm(old => ({ ...old, [key]: old[key].includes(value) ? old[key].filter(v => v !== value) : [...old[key], value] }))
  const canContinue = useMemo(() => {
    if (step === 0) return !!form.category
    if (step === 1) return audience === 'particuliers' ? form.criteria.length > 0 : form.sectors.length > 0
    if (step === 2) return form.zones.trim().length > 0
    if (step === 3) return form.quantity.trim().length > 0 && form.channels.length > 0
    return form.firstName.trim() && form.lastName.trim() && form.email.trim() && consent && /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(form.email)
  }, [step, form, audience, consent])
  const reset = () => { setAudience(null); setStep(0); setForm(initial); setSent(false); setError(''); setConsent(false) }
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
        {step === 2 && <GeographicZonePicker value={form.zones} onChange={value => update('zones', value)} />}
        {step === 3 && <><div className="request-step-heading"><span className="request-step-icon"><ShieldCheck /></span><div><h2>Volume et canaux souhaités</h2><p>Ces informations nous aideront à préparer une proposition adaptée.</p></div></div><label className="request-label">Nombre de contacts souhaité<input value={form.quantity} onChange={e => update('quantity', e.target.value)} placeholder="Ex. : 1 000, 5 000, à définir…" /></label><div className="request-label"><span>Canaux envisagés</span><div className="request-choice-grid request-choice-grid-compact">{channelOptions.map(c => { const checked = form.channels.includes(c); return <button key={c} className={checked ? 'request-choice selected' : 'request-choice'} onClick={() => toggle('channels', c)}>{c}{checked && <Check />}</button> })}</div></div></>}
        {step === 4 && <><div className="request-step-heading"><span className="request-step-icon"><Mail /></span><div><h2>Vos coordonnées</h2><p>Pour que notre équipe puisse revenir vers vous.</p></div></div><div className="request-fields-grid"><label className="request-label">Prénom *<input required value={form.firstName} onChange={e => update('firstName', e.target.value)} placeholder="Votre prénom" /></label><label className="request-label">Nom *<input required value={form.lastName} onChange={e => update('lastName', e.target.value)} placeholder="Votre nom" /></label><label className="request-label">E-mail *<input type="email" required value={form.email} onChange={e => update('email', e.target.value)} placeholder="vous@exemple.fr" /></label><label className="request-label">Téléphone<input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+33…" /></label><label className="request-label request-field-wide">Entreprise (facultatif)<input value={form.company} onChange={e => update('company', e.target.value)} placeholder="Nom de votre entreprise" /></label><label className="request-label request-field-wide">Informations complémentaires<textarea rows={3} value={form.message} onChange={e => update('message', e.target.value)} placeholder="Décrivez votre projet ou précisez vos critères…" /></label></div><label className="request-consent"><input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} /><span>J’accepte que Fichierlead utilise mes informations pour répondre à cette demande.</span></label></>}
        {error && <p className="request-error" role="alert">{error}</p>}
        <div className="request-actions">{step > 0 ? <button className="request-button request-button-secondary" onClick={() => setStep(s => s - 1)}><ArrowLeft /> Retour</button> : <button className="request-button request-button-secondary" onClick={() => {setAudience(null); setStep(0)}}>Changer de profil</button>}{step < 4 ? <button className="request-button request-button-primary" disabled={!canContinue} onClick={() => setStep(s => s + 1)}>Continuer <ArrowRight /></button> : <button className="request-button request-button-primary" disabled={!canContinue || sending} onClick={submit}>{sending ? <><Loader2 className="request-spinner" /> Envoi…</> : <>Envoyer ma demande <Send /></>}</button>}</div>
      </div>
      <p className="request-privacy"><ShieldCheck /> Vos informations sont utilisées uniquement pour traiter votre demande.</p>
    </>}
  </section>
}
