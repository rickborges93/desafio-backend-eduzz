import { PrismaBillingsRepository } from '@/repositories/prisma/prisma-billings-repository'
import { PrismaBtcTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { ExtractUseCase } from '../extract/extract'

export function makeExtractUseCase() {
  const btcTransactionRepository = new PrismaBtcTransactionsRepository()
  const billingsRepository = new PrismaBillingsRepository()
  const depositUseCase = new ExtractUseCase(
    btcTransactionRepository,
    billingsRepository,
  )

  return depositUseCase
}
