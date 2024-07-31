import { PrismaBillingsRepository } from '@/repositories/prisma/prisma-billings-repository'
import { PurchaseUseCase } from '../crypto/purchase'
import { PrismaBtcTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'

export function makePurchaseUseCase() {
  const billingsRepository = new PrismaBillingsRepository()
  const btcTransactionsRepository = new PrismaBtcTransactionsRepository()
  const purchaseUseCase = new PurchaseUseCase(
    billingsRepository,
    btcTransactionsRepository,
  )

  return purchaseUseCase
}
