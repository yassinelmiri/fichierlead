'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Building2, Check, CheckCircle2, ChevronRight, Home, Loader2, Mail, MapPin, Plus, Search, Send, ShieldCheck, Users } from 'lucide-react'

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
  { name: 'Auvergne-Rhône-Alpes', code: 'ARA', departments: ['01','03','07','15','26','38','42','43','63','69','73','74'] },
  { name: 'Bourgogne-Franche-Comté', code: 'BFC', departments: ['21','25','39','58','70','71','89','90'] },
  { name: 'Bretagne', code: 'BRE', departments: ['22','29','35','56'] },
  { name: 'Centre-Val de Loire', code: 'CVL', departments: ['18','28','36','37','41','45'] },
  { name: 'Corse', code: 'COR', departments: ['2A','2B'] },
  { name: 'Grand Est', code: 'GES', departments: ['08','10','51','52','54','55','57','67','68','88'] },
  { name: 'Hauts-de-France', code: 'HDF', departments: ['02','59','60','62','80'] },
  { name: 'Normandie', code: 'NOR', departments: ['14','27','50','61','76'] },
  { name: 'Nouvelle-Aquitaine', code: 'NAQ', departments: ['16','17','19','23','24','33','40','47','64','79','86','87'] },
  { name: 'Occitanie', code: 'OCC', departments: ['09','11','12','30','31','32','34','46','48','65','66','81','82'] },
  { name: 'Pays de la Loire', code: 'PDL', departments: ['44','49','53','72','85'] },
  { name: 'Provence-Alpes-Côte d’Azur', code: 'PAC', departments: ['04','05','06','13','83','84'] },
  { name: 'Île-de-France', code: 'IDF', departments: ['75','77','78','91','92','93','94','95'] },
]
type Department = { code: string; name: string; path: string }
function geometryPath(geometry: any) {
  const project = (point: number[]) => {
    const [lon, lat] = point
    return [((lon + 5.6) / 15.9) * 600, ((51.4 - lat) / 10.3) * 590]
  }
  const ringPath = (ring: number[][]) => ring.map((point, index) => {
    const [x, y] = project(point)
    return `${index ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ') + 'Z'
  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates
  return polygons.map((polygon: number[][][]) => polygon.map(ringPath).join(' ')).join(' ')
}

function GeographicZonePicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [search, setSearch] = useState('')
  const [openSection, setOpenSection] = useState('departements')
  const [departments, setDepartments] = useState<Department[]>([])
  const [loadingMap, setLoadingMap] = useState(true)
  const [mapError, setMapError] = useState(false)
  const [customValue, setCustomValue] = useState('')
  const selected = value ? value.split('|').map(item => item.trim()).filter(Boolean) : []
  const selectedDepartments = selected.filter(item => item.startsWith('Département:')).map(item => item.split(':')[1]?.trim().split(' ')[0])
  const selectedRegions = selected.filter(item => item.startsWith('Région:')).map(item => item.replace('Région:', '').trim())
  const filteredDepartments = departments.filter(department => (department.code + ' ' + department.name).toLowerCase().includes(search.toLowerCase()))
  const filteredRegions = geographicRegions.filter(region => (region.name + ' ' + region.code).toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    let active = true
    fetch('https://geo.api.gouv.fr/departements?fields=nom,code&format=geojson&geometry=contour')
      .then(response => { if (!response.ok) throw new Error('Map unavailable'); return response.json() })
      .then(data => {
        if (!active) return
        const items = (data.features || []).filter((feature: any) => /^(0[1-9]|[1-8][0-9]|9[0-5]|2A|2B)$/.test(feature.properties.code))
          .map((feature: any) => ({ code: feature.properties.code, name: feature.properties.nom, path: geometryPath(feature.geometry) }))
        setDepartments(items)
        setLoadingMap(false)
      })
      .catch(() => { if (active) { setLoadingMap(false); setMapError(true) } })
    return () => { active = false }
  }, [])

  const toggleItem = (item: string) => {
    const next = selected.includes(item) ? selected.filter(entry => entry !== item) : [...selected, item]
    onChange(next.join(' | '))
  }
  const toggleDepartment = (department: Department) => {
    const parentRegion = geographicRegions.find(region => region.departments.includes(department.code) && selectedRegions.includes(region.name))
    if (parentRegion) {
      const withoutRegion = selected.filter(item => item !== `Région: ${parentRegion.name}`)
      const remaining = parentRegion.departments.filter(code => code !== department.code && !withoutRegion.some(item => item.startsWith(`Département: ${code} -`)))
      const names = new Map(departments.map(item => [item.code, item.name]))
      onChange([...withoutRegion, ...remaining.map(code => `Département: ${code} - ${names.get(code) || code}`)].join(' | '))
      return
    }
    toggleItem(`Département: ${department.code} - ${department.name}`)
  }
  const toggleRegion = (region: typeof geographicRegions[number]) => toggleItem(`Région: ${region.name}`)
  const isDepartmentSelected = (department: Department) => selectedDepartments.includes(department.code) || geographicRegions.some(region => selectedRegions.includes(region.name) && region.departments.includes(department.code))
  const addCustom = (label: string) => {
    const trimmed = customValue.trim()
    if (!trimmed) return
    toggleItem(`${label}: ${trimmed}`)
    setCustomValue('')
  }
  const sections = [
    { id: 'regions', title: 'Régions' },
    { id: 'departements', title: 'Départements' },
    { id: 'villes', title: 'Villes' },
    { id: 'postal', title: 'Code postal' },
    { id: 'cantons', title: 'Canton' },
    { id: 'adresse', title: 'Autour d’une adresse' },
  ]
  return <>
    <div className="request-step-heading">
      <span className="request-step-icon"><MapPin /></span>
      <div><h2>Quelle zone géographique ?</h2><p>Sélectionnez vos zones directement sur la carte ou dans la liste.</p></div>
    </div>
    <div className="geo-picker">
      <div className="geo-selection-summary">
        <span className="geo-summary-icon"><MapPin /></span>
        <span>{selected.length ? `${selected.length} zone(s) choisie(s)` : 'Choisir mes critères géographiques'}</span>
        {selected.length > 0 && <button type="button" onClick={() => onChange('')}>Tout effacer</button>}
        <span className="geo-summary-edit"><Check /></span>
      </div>
      <div className="geo-accordions">
        {sections.map(section => <section className="geo-section" key={section.id}>
          <button type="button" className={openSection === section.id ? 'geo-section-trigger active' : 'geo-section-trigger'} onClick={() => setOpenSection(openSection === section.id ? '' : section.id)} aria-expanded={openSection === section.id}>
            <ChevronRight className="geo-section-chevron" /><span>{section.title}</span>{section.id === 'departements' && selectedDepartments.length > 0 && <small>{selectedDepartments.length} sélectionné(s)</small>}
          </button>
          {openSection === section.id && <div className="geo-section-content">
            {(section.id === 'regions' || section.id === 'departements') && <>
              <div className="geo-browser">
                <div className="geo-list-pane">
                  <label className="geo-search"><Search /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Rechercher dans la liste" aria-label="Rechercher une région ou un département" /></label>
                  {section.id === 'regions' ? <div className="geo-check-list">
                    <label className="geo-check-row"><input type="checkbox" checked={geographicRegions.every(region => selectedRegions.includes(region.name))} onChange={() => onChange(geographicRegions.every(region => selectedRegions.includes(region.name)) ? selected.filter(item => !item.startsWith('Région:')).join(' | ') : [...selected.filter(item => !item.startsWith('Région:')), ...geographicRegions.map(region => `Région: ${region.name}`)].join(' | '))} /><span>Toutes les régions</span></label>
                    {filteredRegions.map(region => <label className="geo-check-row" key={region.code}><input type="checkbox" checked={selectedRegions.includes(region.name)} onChange={() => toggleRegion(region)} /><span>{region.name}</span><small>{region.departments.length} dép.</small></label>)}
                  </div> : <div className="geo-check-list">
                    <label className="geo-check-row"><input type="checkbox" checked={departments.length > 0 && departments.every(department => isDepartmentSelected(department))} onChange={() => onChange(departments.length > 0 && departments.every(department => isDepartmentSelected(department)) ? selected.filter(item => !item.startsWith('Département:') && !item.startsWith('Région:')).join(' | ') : departments.map(department => `Département: ${department.code} - ${department.name}`).join(' | '))} /><span>Tous les départements</span></label>
                    {filteredDepartments.map(department => <label className="geo-check-row" key={department.code}><input type="checkbox" checked={isDepartmentSelected(department)} onChange={() => toggleDepartment(department)} /><span>{department.code} - {department.name}</span></label>)}
                  </div>}
                </div>
                <div className="geo-map-pane">
                  <div className="geo-map-controls"><span>France métropolitaine</span><span className="geo-map-zoom"><Plus /></span></div>
                  {loadingMap ? <div className="geo-map-loading">Chargement de la carte…</div> : mapError ? <div className="geo-map-loading">La carte n’a pas pu être chargée. Utilisez la liste à gauche.</div> : <svg className="geo-france-map" viewBox="0 0 600 590" role="img" aria-label="Carte interactive des départements français">
                    {departments.map(department => <path key={department.code} d={department.path} className={isDepartmentSelected(department) ? 'geo-department-shape selected' : 'geo-department-shape'} onClick={() => toggleDepartment(department)} role="button" tabIndex={0} aria-label={`${department.code} - ${department.name}`} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleDepartment(department) } }} />)}
                  </svg>}
                  <div className="geo-map-footer">{selected.length ? `${selected.length} zone(s) sélectionnée(s)` : 'Cliquez sur un département pour le sélectionner'}</div>
                </div>
              </div>
            </>}
            {['villes','postal','cantons','adresse'].includes(section.id) && <div className="geo-custom-entry">
              <p>{section.id === 'villes' ? 'Ajoutez une ou plusieurs villes à cibler.' : section.id === 'postal' ? 'Saisissez un ou plusieurs codes postaux.' : section.id === 'cantons' ? 'Précisez le ou les cantons souhaités.' : 'Indiquez une adresse et le rayon de prospection souhaité.'}</p>
              <div className="geo-custom-input"><input value={customValue} onChange={event => setCustomValue(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') addCustom(section.title) }} placeholder={section.id === 'villes' ? 'Ex. : Lyon, Bordeaux…' : section.id === 'postal' ? 'Ex. : 75015, 69000…' : section.id === 'cantons' ? 'Nom du canton…' : 'Adresse complète…'} /><button type="button" onClick={() => addCustom(section.title)} disabled={!customValue.trim()}>Ajouter</button></div>
              {section.id === 'adresse' && <select className="geo-radius-select" aria-label="Rayon autour de l’adresse"><option>Rayon : 5 km</option><option>Rayon : 10 km</option><option>Rayon : 20 km</option><option>Rayon : 30 km</option><option>Rayon : 50 km</option></select>}
            </div>}
          </div>}
        </section>)}
      </div>
      {selected.length > 0 && <div className="geo-selected"><strong>Votre sélection</strong><div className="geo-chips">{selected.map(item => <button type="button" key={item} onClick={() => toggleItem(item)}>{item.replace(/^(Région|Département): /, '')}<span>×</span></button>)}</div></div>}
      <p className="geo-hint">Vous pouvez combiner plusieurs régions, départements, villes et codes postaux.</p>
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
