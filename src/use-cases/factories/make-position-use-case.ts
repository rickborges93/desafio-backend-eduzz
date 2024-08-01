import { PositionUseCase } from '../crypto/position'
import { PrismaBtcTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'

export function makePositionteUseCase() {
  const transactionsRepository = new PrismaBtcTransactionsRepository()
  const positionUseCase = new PositionUseCase(transactionsRepository)

  return positionUseCase
}
