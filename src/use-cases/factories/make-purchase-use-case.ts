import { PrismaBillingsRepository } from '@/repositories/prisma/prisma-billings-repository'
import { PurchaseUseCase } from '../crypto/purchase'
import { PrismaBtcTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import SendGridMailProvider from '@/providers/adapters/implementations/mail/SendGridMailProvider'

export function makePurchaseUseCase() {
  const billingsRepository = new PrismaBillingsRepository()
  const btcTransactionsRepository = new PrismaBtcTransactionsRepository()
  const mailProvider = new SendGridMailProvider()
  const purchaseUseCase = new PurchaseUseCase(
    billingsRepository,
    btcTransactionsRepository,
    mailProvider,
  )

  return purchaseUseCase
}
