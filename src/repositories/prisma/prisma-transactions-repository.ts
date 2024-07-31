import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { BtcTransactionsRepository } from '../transactions-repository'

export class PrismaBtcTransactionsRepository
  implements BtcTransactionsRepository
{
  async create(data: Prisma.BtcTransactionUncheckedCreateInput) {
    const btcTransaction = await prisma.btcTransaction.create({
      data,
    })

    return btcTransaction
  }
}
