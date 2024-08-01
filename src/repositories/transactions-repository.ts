import { TBtcTransactionMapper } from '@/use-cases/crypto/position'
import { BtcTransaction, Prisma } from '@prisma/client'

export interface BtcTransactionsRepository {
  findManyByUserId(userId: string): Promise<TBtcTransactionMapper[]>
  create(
    data: Prisma.BtcTransactionUncheckedCreateInput,
  ): Promise<BtcTransaction>
}
