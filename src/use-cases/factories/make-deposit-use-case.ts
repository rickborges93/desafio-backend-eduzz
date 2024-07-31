import { PrismaBillingsRepository } from '@/repositories/prisma/prisma-billings-repository'
import { DepositUseCase } from '../account/deposit'

export function makeDepositUseCase() {
  const billingsRepository = new PrismaBillingsRepository()
  const depositUseCase = new DepositUseCase(billingsRepository)

  return depositUseCase
}
