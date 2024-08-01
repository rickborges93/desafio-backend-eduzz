import { BtcTransaction, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { BtcTransactionsRepository } from '../transactions-repository'
import dayjs from 'dayjs'

export class InMemoryTransactionsRepository
  implements BtcTransactionsRepository
{
  public items: BtcTransaction[] = []

  async findManyByUserIdAndDateRange(
    userId: string,
    initialDate: Date,
    finalDate: Date,
  ) {
    return this.items.filter((item) => {
      const transactionDate = dayjs(item.created_at)
      const isOnSameDate =
        transactionDate.isAfter(initialDate) &&
        transactionDate.isBefore(finalDate)

      return isOnSameDate && userId === item.user_id
    })
  }

  async findManyByDateRange(initialDate: Date, finalDate: Date) {
    return this.items.filter((item) => {
      const transactionDate = dayjs(item.created_at)
      const isOnSameDate =
        transactionDate.isAfter(initialDate) &&
        transactionDate.isBefore(finalDate)

      return isOnSameDate
    })
  }

  async findManyByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId)
  }

  async create(data: Prisma.BtcTransactionUncheckedCreateInput) {
    const transaction = {
      id: randomUUID(),
      user_id: data.user_id,
      billing_id: data.billing_id,
      variation_pc: new Prisma.Decimal(data.variation_pc.toString()),
      bought_btc: new Prisma.Decimal(data.bought_btc.toString()),
      current_btc: new Prisma.Decimal(data.current_btc.toString()),
      created_at: new Date(),
      type: data.type ?? 'buy',
    }

    this.items.push(transaction)

    return transaction
  }
}
