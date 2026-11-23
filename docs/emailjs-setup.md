# Configuration EmailJS — Fichierlead

Le formulaire multi-étapes utilise EmailJS côté navigateur. Il n'enregistre pas les demandes dans une base de données.

## 1. Créer le service et le template EmailJS

Dans EmailJS, créez/connectez un service e-mail puis un template de réception.

Dans le template :
- **To email** : `webmaster@fichierlead.com` (destinataire fixe dans la configuration EmailJS, ne le laissez pas contrôlé par un champ utilisateur)
- **Reply-To** : `{{reply_to}}`
- **Subject** : `Nouvelle demande Fichierlead — {{customer_type}} — {{category}}`

Dans le corps du message, incluez les paramètres :
`customer_type`, `category`, `criteria`, `sectors`, `zones`, `quantity`, `channels`, `first_name`, `last_name`, `company`, `email`, `phone`, `message`, `request_date`.

## 2. Variables à ajouter

Dans les paramètres de projet (localement dans `.env.local`, puis dans Vercel > Settings > Environment Variables), ajoutez :

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Ces valeurs sont des identifiants publics EmailJS destinés à être utilisés dans le navigateur. **N'ajoutez jamais de clé privée/secrète dans les variables NEXT_PUBLIC_**.

## 3. Protection anti-spam

Dans EmailJS, activez les protections anti-spam disponibles (captcha / limites de quota / restrictions de domaine si disponibles) et surveillez le quota. Pour une protection plus robuste, prévoir ensuite un endpoint serveur avec validation et rate-limiting.

## 4. Déploiement

Après avoir ajouté les variables dans Vercel, redéployez le projet. Sans ces trois valeurs, le formulaire affiche un message d'envoi non configuré.
