import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { BtcTransactionsRepository } from '../transactions-repository'
import dayjs from 'dayjs'

export class PrismaBtcTransactionsRepository
  implements BtcTransactionsRepository
{
  async findManyByUserIdAndDateRange(
    userId: string,
    initialDate: Date,
    finalDate: Date,
  ) {
    const startOfTheDay = dayjs(initialDate).startOf('date')
    const endOfTheDay = dayjs(finalDate).endOf('date')

    const btcTransactions = await prisma.btcTransaction.findMany({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
      select: {
        current_btc: true,
        bought_btc: true,
        variation_pc: true,
        type: true,
        created_at: true,
      },
    })

    return btcTransactions
  }

  async findManyByDateRange(initialDate: Date, finalDate: Date) {
    const btcTransactions = await prisma.btcTransaction.findMany({
      where: {
        created_at: {
          gte: initialDate,
          lte: finalDate,
        },
      },
    })

    return btcTransactions
  }

  async findManyByUserId(userId: string) {
    const btcTransactions = await prisma.btcTransaction.findMany({
      where: {
        user_id: userId,
      },
      select: {
        current_btc: true,
        bought_btc: true,
        variation_pc: true,
        type: true,
        created_at: true,
      },
    })

    return btcTransactions
  }

  async create(data: Prisma.BtcTransactionUncheckedCreateInput) {
    const btcTransaction = await prisma.btcTransaction.create({
      data,
    })

    return btcTransaction
  }
}
