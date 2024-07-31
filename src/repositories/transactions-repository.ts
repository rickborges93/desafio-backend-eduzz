import { BtcTransaction, Prisma } from '@prisma/client'

export interface BtcTransactionsRepository {
  create(
    data: Prisma.BtcTransactionUncheckedCreateInput,
  ): Promise<BtcTransaction>
}
