import { Billing, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { BillingsRepository } from '../billings-repository'
import dayjs from 'dayjs'

export class InMemoryBillingsRepository implements BillingsRepository {
  public items: Billing[] = []

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

  async findManyByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId)
  }

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
