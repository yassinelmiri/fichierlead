const questions = [
  {
    question: 'Qu’entendez-vous par prospection responsable ?',
    answer: 'Une démarche responsable commence par une finalité claire, une base légale adaptée au canal et une information compréhensible. Fichierlead privilégie les contacts professionnels pertinents et les audiences grand public dont le consentement peut être documenté. Les exigences varient selon le canal et le contexte : elles doivent être vérifiées avant toute campagne.',
  },
  {
    question: 'Comment les contacts sont-ils sélectionnés ?',
    answer: 'Nous échangeons d’abord sur votre activité, votre zone et votre objectif. La sélection est ensuite cadrée autour de critères professionnels ou d’audiences opt-in compatibles avec votre projet. Aucun critère sensible ni ciblage intrusif n’est proposé.',
  },
  {
    question: 'Puis-je choisir les canaux de contact ?',
    answer: 'Oui, les canaux sont définis au moment de votre demande. L’utilisation d’une adresse e-mail, d’un numéro ou d’une adresse postale répond à des règles différentes. Les coordonnées ne doivent être utilisées que pour les usages autorisés et documentés.',
  },
  {
    question: 'Combien coûte une sélection de contacts ?',
    answer: 'Le prix dépend de la cible professionnelle, de la zone, des critères et des canaux nécessaires. Nous préparons une proposition adaptée après avoir compris votre besoin, sans afficher de tarif standard trompeur.',
  },
  {
    question: 'Comment demander un devis ?',
    answer: 'Décrivez votre besoin dans le formulaire de devis. Votre messagerie prépare un e-mail que vous pourrez relire et envoyer. En l’absence de service d’envoi configuré, le site ne stocke pas les demandes et ne peut pas confirmer leur réception automatiquement.',
  },
  {
    question: 'Comment exercer mes droits ou poser une question sur mes données ?',
    answer: 'Vous pouvez nous écrire au sujet de vos données, d’une opposition ou d’une question de conformité via le formulaire de contact. Avant la mise en ligne, les coordonnées et mentions légales de l’éditeur doivent être complétées et validées.',
  },
]

type FaqListProps = { compact?: boolean }

export function FaqList({ compact = false }: FaqListProps) {
  const items = compact ? questions.slice(0, 3) : questions

  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details className="faq-item" key={item.question} open={!compact && index === 0}>
          <summary>{item.question}<span className="faq-toggle" aria-hidden="true" /></summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
