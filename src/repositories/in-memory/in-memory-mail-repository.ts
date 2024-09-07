import MailProvider, { Message } from '@/providers/adapters/models/MailProvider'

interface MailItems {}

export class InMemoryMailRepository implements MailProvider {
  public items: MailItems[] = []

  async sendEmail(message: Message) {
    console.log('MailRepository', message)
  }
}
