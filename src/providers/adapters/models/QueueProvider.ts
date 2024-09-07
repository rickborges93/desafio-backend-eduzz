import { Message } from './MailProvider'

export interface Publish {
  queueName: string
  data: Message
  init?: boolean
}

export interface Consume {
  queueName: string
  callback: (arg: Message) => Promise<void>
}

export default interface QueueProvider {
  publish({ queueName, data, init }: Publish): Promise<void>
  consume({ queueName, callback }: Consume): Promise<void>
}
