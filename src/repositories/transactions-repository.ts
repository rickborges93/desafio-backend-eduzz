import { TBtcTransactionMapper } from '@/use-cases/crypto/position'
import { BtcTransaction, Prisma } from '@prisma/client'

export interface BtcTransactionsRepository {
  findManyByUserIdAndDateRange(
    userId: string,
    initialDate: Date,
    finalDate: Date,
  ): Promise<BtcTransaction[]>
  findManyByDateRange(
    initialDate: Date,
    finalDate: Date,
  ): Promise<BtcTransaction[]>
  findManyByUserId(userId: string): Promise<TBtcTransactionMapper[]>
  create(
    data: Prisma.BtcTransactionUncheckedCreateInput,
  ): Promise<BtcTransaction>
}
