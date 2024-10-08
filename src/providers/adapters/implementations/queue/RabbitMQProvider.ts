import { env } from '@/env'
import QueueProvider, { Consume, Publish } from '../../models/QueueProvider'
import amqp, { Channel, Connection } from 'amqplib'

export default class RabbitMQProvider implements QueueProvider {
  private connection?: Connection
  private channel?: Channel
  private readonly rabbitMQUrl: string

  constructor() {
    this.rabbitMQUrl = env.RABBITMQ_URL
  }

  private async connectQueue(queueName: string): Promise<void> {
    if (!this.connection) this.connection = await amqp.connect(this.rabbitMQUrl)
    this.channel = await this.connection.createChannel()
    await this.channel.assertQueue(queueName, { durable: true })
  }

  private async close(): Promise<void> {
    if (this.channel) await this.channel.close()
    this.channel = undefined
    if (this.connection) await this.connection.close()
    this.connection = undefined
  }

  async publish({ queueName, data, init = true }: Publish): Promise<void> {
    if (init) await this.connectQueue(queueName)
    this.channel!.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))
    if (init) await this.close()
  }

  async consume({ queueName, callback }: Consume): Promise<void> {
    await this.connectQueue(queueName)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await this.channel!.consume(queueName, async (msg: any) => {
      const input = JSON.parse(msg.content.toString())
      await callback(input)
      this.channel!.ack(msg)
    })
  }
}
