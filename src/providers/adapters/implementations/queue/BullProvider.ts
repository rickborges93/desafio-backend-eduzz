import Bull, { Queue, QueueOptions, ProcessPromiseFunction } from 'bull'

import QueueProvider from '../../models/QueueProvider'

export type TQueueName = 'email' | 'whatspp'

class BullProvider implements QueueProvider {
  private queue: Queue

  constructor(queueName: TQueueName, queueConfig: QueueOptions) {
    this.queue = new Bull(queueName, queueConfig)
  }

  async add(data: object): Promise<void> {
    await this.queue.add(data)
  }

  process(processFunction: ProcessPromiseFunction<object>): void {
    this.queue.process(processFunction)
  }
}

export default BullProvider
