import { PrismaBillingsRepository } from '@/repositories/prisma/prisma-billings-repository'
import { PrismaBtcTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { SellUseCase } from '../crypto/sell'
import RabbitMQProvider from '@/providers/adapters/implementations/queue/RabbitMQProvider'

export function makeSellUseCase() {
  const btcTransactionRepository = new PrismaBtcTransactionsRepository()
  const billingsRepository = new PrismaBillingsRepository()
  const queueProvider = new RabbitMQProvider()
  const sellUseCase = new SellUseCase(
    billingsRepository,
    btcTransactionRepository,
    queueProvider,
  )

  return sellUseCase
}
