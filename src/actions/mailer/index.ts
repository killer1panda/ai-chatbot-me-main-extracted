'use server'
import nodemailer from 'nodemailer'

export const onMailer = async (email: string) => {
  const smtpUser = process.env.NODE_MAILER_EMAIL
  const smtpPass = process.env.NODE_MAILER_GMAIL_APP_PASSWORD

  if (!smtpUser || !smtpPass) {
    return {
      status: 500,
      error:
        'Mailer is not configured. NODE_MAILER_EMAIL and NODE_MAILER_GMAIL_APP_PASSWORD are required.',
    }
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const mailOptions = {
    to: email,
    subject: 'Realtime Support',
    text: 'One of your customers on Corinna, just switched to realtime mode',
  }

  try {
    await transporter.sendMail(mailOptions)
    return { status: 200, message: 'Email sent' }
  } catch (error) {
    console.log(error)
    return { status: 500, error: 'Failed to send email' }
  }
}