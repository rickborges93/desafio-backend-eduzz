import { BtcTransaction, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { BtcTransactionsRepository } from '../transactions-repository'

export class InMemoryTransactionsRepository
  implements BtcTransactionsRepository
{
  public items: BtcTransaction[] = []

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
