import type { Metadata } from 'next'
import { MultiStepRequest } from '@/components/multi-step-request'

export const metadata: Metadata = {
  title: 'Demande personnalisée',
  description: 'Choisissez votre profil et précisez votre besoin à Fichierlead en quelques étapes.',
}

export default function QuotePage() {
  return <main className="request-page"><MultiStepRequest /></main>
}
