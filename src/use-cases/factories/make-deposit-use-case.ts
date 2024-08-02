import { PrismaBillingsRepository } from '@/repositories/prisma/prisma-billings-repository'
import { DepositUseCase } from '../account/deposit'
import SendGridMailProvider from '@/providers/adapters/implementations/mail/SendGridMailProvider'

export function makeDepositUseCase() {
  const billingsRepository = new PrismaBillingsRepository()
  const mailProvider = new SendGridMailProvider()
  const depositUseCase = new DepositUseCase(billingsRepository, mailProvider)

  return depositUseCase
}
