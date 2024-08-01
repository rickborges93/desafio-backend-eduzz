import { TBtcTransactionMapper } from '@/@types/mapper'
import { BtcTransaction, Prisma } from '@prisma/client'

export interface BtcTransactionsRepository {
  findManyByUserIdAndDateRange(
    userId: string,
    initialDate: Date,
    finalDate: Date,
  ): Promise<Omit<BtcTransaction, 'id' | 'user_id' | 'billing_id'>[]>
  findManyByDateRange(
    initialDate: Date,
    finalDate: Date,
  ): Promise<BtcTransaction[]>
  findManyByUserId(userId: string): Promise<TBtcTransactionMapper[]>
  create(
    data: Prisma.BtcTransactionUncheckedCreateInput,
  ): Promise<BtcTransaction>
}
