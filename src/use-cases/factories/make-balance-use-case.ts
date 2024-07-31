import { PrismaBillingsRepository } from '@/repositories/prisma/prisma-billings-repository'
import { BalanceUseCase } from '../account/balance'

export function makeBalanceUseCase() {
  const billingsRepository = new PrismaBillingsRepository()
  const balanceUseCase = new BalanceUseCase(billingsRepository)

  return balanceUseCase
}
