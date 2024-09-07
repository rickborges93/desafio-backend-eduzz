import { BillingsRepository } from '@/repositories/billings-repository'
import { getBalanceFromBillings } from '@/utils/get-balance-from-billing'
import { BtcTransaction } from '@prisma/client'
import { InsufficientBalanceError } from '../errors/insufficient-balance-error'
import { BtcTransactionsRepository } from '@/repositories/transactions-repository'
import { getCurrentBtcQuote } from '@/utils/get-current-btc-quote'
import { env } from '@/env'
import QueueProvider from '@/providers/adapters/models/QueueProvider'

interface PurchaseUseCaseRequest {
  amount: number
  userId: string
  email: string
}

interface PurchaseUseCaseResponse {
  btcTransaction: BtcTransaction
}

export class PurchaseUseCase {
  constructor(
    private billingsRepository: BillingsRepository,
    private btcTransactionsRepository: BtcTransactionsRepository,
    private queueProvider: QueueProvider,
  ) {}

  async execute({
    amount,
    userId,
    email,
  }: PurchaseUseCaseRequest): Promise<PurchaseUseCaseResponse> {
    const billings = await this.billingsRepository.findManyByUserId(userId)

    const totalBalance = getBalanceFromBillings(billings)

    if (totalBalance < amount) {
      throw new InsufficientBalanceError()
    }

    const currentBtcQuote = await getCurrentBtcQuote()

    const boughtBtc = ((100 * amount) / currentBtcQuote.sell / 100).toFixed(8)

    const variationBtc = (
      (currentBtcQuote.sell / currentBtcQuote.open - 1) *
      100
    ).toFixed(8)

    const withdrawBilling = await this.billingsRepository.create({
      amount,
      type: 'withdraw',
      user_id: userId,
    })

    const btcTransaction = await this.btcTransactionsRepository.create({
      billing_id: withdrawBilling.id,
      user_id: userId,
      bought_btc: boughtBtc,
      current_btc: currentBtcQuote.currentPrice,
      variation_pc: variationBtc,
    })

    this.queueProvider.publish({
      queueName: 'email',
      data: {
        from: { email: env.MAIL_PROVIDER_EMAIL, name: env.MAIL_PROVIDER_NAME },
        to: email,
        subject: '[Eduzz BTC Bank] Compra de Bitcoin',
        body: `Você investiu R$${amount} e recebeu ${boughtBtc} BTC.`,
      },
    })

    return { btcTransaction }
  }
}
