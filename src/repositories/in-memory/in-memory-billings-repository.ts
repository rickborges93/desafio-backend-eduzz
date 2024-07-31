import { Billing, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { BillingsRepository } from '../billings-repository'

export class InMemoryBillingsRepository implements BillingsRepository {
  public items: Billing[] = []

  async create(data: Prisma.BillingUncheckedCreateInput) {
    const billing = {
      id: randomUUID(),
      user_id: data.user_id,
      amount: new Prisma.Decimal(data.amount.toString()),
      type: data.type ?? 'deposit',
      created_at: new Date(),
    }

    this.items.push(billing)

    return billing
  }
}
