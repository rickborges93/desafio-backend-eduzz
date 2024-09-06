import MailProvider, { Message } from '@/providers/adapters/models/MailProvider'
import QueueProvider from '@/providers/adapters/models/QueueProvider'

export default class ProcessEmailQueue {
  constructor(
    private queueProvider: QueueProvider,
    private mailProvider: MailProvider,
  ) {}

  execute(): void {
    this.queueProvider.process(async (job) => {
      const message = job.data as Message

      await this.mailProvider.sendEmail(message)
    })
  }
}
