import { PrismaBtcTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { HistoryUseCase } from '../history/history'

export function makeHistoryUseCase() {
  const transactionsRepository = new PrismaBtcTransactionsRepository()
  const historyUseCase = new HistoryUseCase(transactionsRepository)

  return historyUseCase
}
