import { BtcTransaction, Prisma } from '@prisma/client'

export interface BtcTransactionsRepository {
  findManyByUserId(userId: string): Promise<BtcTransaction[]>
  create(
    data: Prisma.BtcTransactionUncheckedCreateInput,
  ): Promise<BtcTransaction>
}
