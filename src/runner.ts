import ProcessEmailQueue from './consumer/ProcessEmailQueue'

import RedisConfig from '@/config/redis'

import SendGridMailProvider from './providers/adapters/implementations/mail/SendGridMailProvider'
import BullProvider from './providers/adapters/implementations/queue/BullProvider'

// 'email'
const queueProvider = new BullProvider('email', { redis: RedisConfig })
const emailProvider = new SendGridMailProvider()

const consumer = new ProcessEmailQueue(queueProvider, emailProvider)

consumer.execute()
