import { BtcTransactionsRepository } from '@/repositories/transactions-repository'
import dayjs from 'dayjs'

interface TransactionData {
  quantity: number
  totalBought: number
  totalSold: number
}

interface TransactionsGroupedBy10Min {
  [key: string]: TransactionData
}

interface HistoryUseCaseResponse {
  valuesEvery10Min: TransactionsGroupedBy10Min
}

export class HistoryUseCase {
  constructor(private btcTransactionsRepository: BtcTransactionsRepository) {}

  async execute(): Promise<HistoryUseCaseResponse> {
    const date = new Date()

    const startOfTheDay = dayjs(date).subtract(1, 'day').startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const btcTransactions =
      await this.btcTransactionsRepository.findManyByDateRange(
        startOfTheDay.toDate(),
        endOfTheDay.toDate(),
      )

    const precisionWithTenMinutes = 10 * 60 * 1000

    const valuesEvery10Min: TransactionsGroupedBy10Min = {}

    btcTransactions.forEach((item) => {
      const floor =
        Math.floor(dayjs(item.created_at).valueOf() / precisionWithTenMinutes) *
        precisionWithTenMinutes

      const dateFormatted = dayjs(floor).format('YY-MM-DD HH:mm')

      if (
        !Object.prototype.hasOwnProperty.call(valuesEvery10Min, dateFormatted)
      ) {
        valuesEvery10Min[dateFormatted] = {
          quantity: 1,
          totalBought: item.type === 'buy' ? item.bought_btc.toNumber() : 0,
          totalSold: item.type === 'sell' ? item.bought_btc.toNumber() : 0,
        }
      } else {
        valuesEvery10Min[dateFormatted].quantity++
        valuesEvery10Min[dateFormatted].totalBought +=
          item.type === 'buy' ? item.bought_btc.toNumber() : 0
        valuesEvery10Min[dateFormatted].totalSold +=
          item.type === 'sell' ? item.bought_btc.toNumber() : 0
      }
    })

    return { valuesEvery10Min }
  }
}
