import SendGridMailProvider from './providers/adapters/implementations/mail/SendGridMailProvider'
import RabbitMQProvider from './providers/adapters/implementations/queue/RabbitMQProvider'
import { Message } from './providers/adapters/models/MailProvider'

const mailConsumer = new RabbitMQProvider()
mailConsumer.consume({
  queueName: 'email',
  callback: async (data: Message) => {
    const mailProvider = new SendGridMailProvider()
    mailProvider.sendEmail(data)
  },
})
