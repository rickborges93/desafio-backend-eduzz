import { BillingsRepository } from '@/repositories/billings-repository'
import { BtcTransaction } from '@prisma/client'
import { InsufficientBalanceError } from '../errors/insufficient-balance-error'
import { BtcTransactionsRepository } from '@/repositories/transactions-repository'
import { getCurrentBtcQuote } from '@/utils/get-current-btc-quote'
import { getBalanceFromBtcTransactions } from '@/utils/get-balance-from-btc-transactions'
import MailProvider from '@/providers/adapters/models/MailProvider'
import { env } from '@/env'

interface SellUseCaseRequest {
  amount: number
  userId: string
  email: string
}

interface SellUseCaseResponse {
  btcTransaction: BtcTransaction
}

export class SellUseCase {
  constructor(
    private billingsRepository: BillingsRepository,
    private btcTransactionsRepository: BtcTransactionsRepository,
    private mailProvider: MailProvider,
  ) {}

  async execute({
    amount,
    userId,
    email,
  }: SellUseCaseRequest): Promise<SellUseCaseResponse> {
    const btcTransactions =
      await this.btcTransactionsRepository.findManyByUserId(userId)

    const totalBalance = getBalanceFromBtcTransactions(btcTransactions)

    if (totalBalance < amount) {
      throw new InsufficientBalanceError()
    }

    const currentBtcQuote = await getCurrentBtcQuote()

    const variationBtc = (
      (currentBtcQuote.sell / currentBtcQuote.open - 1) *
      100
    ).toFixed(8)

    if (totalBalance === amount) {
      const currentMoney = (totalBalance * currentBtcQuote.buy).toFixed(2)
      const boughtBtc = ((100 * amount) / currentBtcQuote.buy / 100).toFixed(8)

      const withdrawBilling = await this.billingsRepository.create({
        amount: currentMoney,
        type: 'deposit',
        user_id: userId,
      })

      const btcTransaction = await this.btcTransactionsRepository.create({
        billing_id: withdrawBilling.id,
        user_id: userId,
        bought_btc: boughtBtc,
        current_btc: currentBtcQuote.currentPrice,
        variation_pc: variationBtc,
        type: 'sell',
      })

      this.mailProvider.sendEmail({
        from: { email: env.MAIL_PROVIDER_EMAIL, name: env.MAIL_PROVIDER_NAME },
        to: email,
        subject: '[Eduzz BTC Bank] Venda de Bitcoin',
        body: `Você vendeu ${boughtBtc} BTC e recebeu R$${currentMoney}.`,
      })

      return { btcTransaction }
    }

    const differenceOfBtcBoughtAndWantToSell = (totalBalance - amount).toFixed(
      8,
    )

    const currencyBtcSold = (totalBalance * currentBtcQuote.buy).toFixed(2)

    const withdrawBillingSell = await this.billingsRepository.create({
      amount: currencyBtcSold,
      type: 'deposit',
      user_id: userId,
    })

    await this.btcTransactionsRepository.create({
      billing_id: withdrawBillingSell.id,
      user_id: userId,
      bought_btc: totalBalance,
      current_btc: currentBtcQuote.currentPrice,
      variation_pc: variationBtc,
      type: 'sell',
    })

    const newAmountToBuyBtc = (
      (totalBalance - amount) *
      currentBtcQuote.buy
    ).toFixed(2)

    const withdrawBilling = await this.billingsRepository.create({
      amount: newAmountToBuyBtc,
      type: 'withdraw',
      user_id: userId,
    })

    const btcTransaction = await this.btcTransactionsRepository.create({
      billing_id: withdrawBilling.id,
      user_id: userId,
      bought_btc: differenceOfBtcBoughtAndWantToSell,
      current_btc: currentBtcQuote.currentPrice,
      variation_pc: variationBtc,
    })

    const recievedMoney = (
      Number(currencyBtcSold) - Number(newAmountToBuyBtc)
    ).toFixed(2)

    this.mailProvider.sendEmail({
      from: { email: env.MAIL_PROVIDER_EMAIL, name: env.MAIL_PROVIDER_NAME },
      to: email,
      subject: '[Eduzz BTC Bank] Venda de Bitcoin',
      body: `Você vendeu ${amount} BTC e recebeu R$${recievedMoney}.`,
    })

    return { btcTransaction }
  }
}
