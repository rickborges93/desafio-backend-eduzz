import { PrismaBillingsRepository } from '@/repositories/prisma/prisma-billings-repository'
import { DepositUseCase } from '../account/deposit'
import RabbitMQAdapter from '@/providers/adapters/implementations/queue/RabbitMQProvider'

export function makeDepositUseCase() {
  const billingsRepository = new PrismaBillingsRepository()
  const queueProvider = new RabbitMQAdapter()
  const depositUseCase = new DepositUseCase(billingsRepository, queueProvider)

  return depositUseCase
}
