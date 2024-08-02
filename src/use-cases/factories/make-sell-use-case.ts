import { PrismaBillingsRepository } from '@/repositories/prisma/prisma-billings-repository'
import { PrismaBtcTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { SellUseCase } from '../crypto/sell'
import SendGridMailProvider from '@/providers/adapters/implementations/mail/SendGridMailProvider'

export function makeSellUseCase() {
  const btcTransactionRepository = new PrismaBtcTransactionsRepository()
  const billingsRepository = new PrismaBillingsRepository()
  const mailProvider = new SendGridMailProvider()
  const sellUseCase = new SellUseCase(
    billingsRepository,
    btcTransactionRepository,
    mailProvider,
  )

  return sellUseCase
}
