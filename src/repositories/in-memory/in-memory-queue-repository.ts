import QueueProvider, {
  Consume,
  Publish,
} from '@/providers/adapters/models/QueueProvider'

interface QueueItems {}

export class InMemoryQueueRepository implements QueueProvider {
  public items: QueueItems[] = []

  async publish({ queueName, data, init }: Publish) {
    console.log('QueueRepository', { queueName, data, init })
  }

  async consume({ queueName, callback }: Consume) {
    console.log('QueueRepository', { queueName, callback })
  }
}
