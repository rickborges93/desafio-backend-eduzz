import { BtcTransactionsRepository } from '@/repositories/transactions-repository'
import dayjs from 'dayjs'

interface VolumeUseCaseResponse {
  totalBought: number
  totalSold: number
}

export class VolumeUseCase {
  constructor(private btcTransactionsRepository: BtcTransactionsRepository) {}

  async execute(): Promise<VolumeUseCaseResponse> {
    const date = new Date()

    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const btcTransactions =
      await this.btcTransactionsRepository.findManyByDateRange(
        startOfTheDay.toDate(),
        endOfTheDay.toDate(),
      )

    const { totalBought, totalSold } = btcTransactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'buy') {
          acc.totalBought = acc.totalBought + transaction.bought_btc.toNumber()
        } else {
          acc.totalSold = acc.totalSold + transaction.bought_btc.toNumber()
        }

        return acc
      },
      { totalBought: 0.0, totalSold: 0.0 },
    )

    return { totalBought, totalSold }
  }
}
