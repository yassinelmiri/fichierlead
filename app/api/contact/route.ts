import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD'] as const

export async function POST(request: Request) {
  try {
    if (requiredEnv.some((key) => !process.env[key])) {
      console.error('SMTP configuration is incomplete.')
      return NextResponse.json({ error: 'Le service e-mail est momentanément indisponible.' }, { status: 503 })
    }

    const body = await request.json()
    const name = String(body.name || body['Votre nom'] || '').trim()
    const email = String(body['E-mail professionnel'] || '').trim()
    const company = String(body.Entreprise || '').trim()
    const subjectChoice = String(body.Sujet || body['Type de besoin'] || '').trim()
    const message = String(body.Message || '').trim()
    const kind = body.kind === 'quote' ? 'devis' : 'contact'

    if (!name || !email || !subjectChoice || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Merci de vérifier les champs obligatoires.' }, { status: 400 })
    }
    if (name.length > 160 || email.length > 254 || message.length > 10000 || subjectChoice.length > 200) {
      return NextResponse.json({ error: 'Certains champs dépassent la longueur autorisée.' }, { status: 400 })
    }

    const port = Number(process.env.SMTP_PORT)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    })

    await transporter.sendMail({
      from: { name: 'Fichierlead - formulaire du site', address: process.env.SMTP_USER! },
      to: 'webmaster@fichierlead.com',
      replyTo: email,
      subject: `[Fichierlead - ${kind}] ${subjectChoice}`,
      text: [
        `Type de demande : ${kind}`,
        `Nom : ${name}`,
        `E-mail : ${email}`,
        `Entreprise : ${company || 'Non renseignée'}`,
        `Sujet : ${subjectChoice}`,
        '',
        'Message :',
        message,
      ].join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact email sending failed:', error)
    return NextResponse.json({ error: 'L’envoi a échoué. Merci de réessayer plus tard.' }, { status: 500 })
  }
}
