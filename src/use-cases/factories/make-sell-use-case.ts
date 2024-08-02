import { PrismaBillingsRepository } from '@/repositories/prisma/prisma-billings-repository'
import { PrismaBtcTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { SellUseCase } from '../crypto/sell'

export function makeSellUseCase() {
  const btcTransactionRepository = new PrismaBtcTransactionsRepository()
  const billingsRepository = new PrismaBillingsRepository()
  const sellUseCase = new SellUseCase(
    billingsRepository,
    btcTransactionRepository,
  )

  return sellUseCase
}
