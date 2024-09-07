import { PrismaBillingsRepository } from '@/repositories/prisma/prisma-billings-repository'
import { PurchaseUseCase } from '../crypto/purchase'
import { PrismaBtcTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import RabbitMQProvider from '@/providers/adapters/implementations/queue/RabbitMQProvider'

export function makePurchaseUseCase() {
  const billingsRepository = new PrismaBillingsRepository()
  const btcTransactionsRepository = new PrismaBtcTransactionsRepository()
  const queueProvider = new RabbitMQProvider()
  const purchaseUseCase = new PurchaseUseCase(
    billingsRepository,
    btcTransactionsRepository,
    queueProvider,
  )

  return purchaseUseCase
}
