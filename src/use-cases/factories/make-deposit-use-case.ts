import { PrismaBillingsRepository } from '@/repositories/prisma/prisma-billings-repository'
import { DepositUseCase } from '../account/deposit'
import BullProvider from '@/providers/adapters/implementations/queue/BullProvider'
import RedisConfig from '@/config/redis'

export function makeDepositUseCase() {
  const billingsRepository = new PrismaBillingsRepository()
  const queueProvider = new BullProvider('email', { redis: RedisConfig })
  const depositUseCase = new DepositUseCase(billingsRepository, queueProvider)

  return depositUseCase
}
