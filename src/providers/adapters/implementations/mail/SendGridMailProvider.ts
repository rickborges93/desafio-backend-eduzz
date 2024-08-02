import { env } from '@/env'
import MailProvider from '../../models/MailProvider'
import sgMail from '@sendgrid/mail'

interface Message {
  from: {
    name: string
    email: string
  }
  to: string
  subject: string
  body: string
}

class SendGridMailProvider implements MailProvider {
  async sendEmail(data: Message) {
    sgMail.setApiKey(env.SENDGRID_API_KEY)

    const msg = {
      to: data.to,
      from: data.from.email, // Use the email address or domain you verified above
      subject: data.subject,
      text: data.body,
      html: `<strong>${data.body}</strong>`,
    }

    sgMail
      .send(msg)
      .then((result) => {
        console.log('E-mail sent...')
        console.log(result)
      })
      .catch((error) => {
        console.error(error)
        if (error.response) {
          console.error(error.response.body)
        }
      })
  }
}

export default SendGridMailProvider
