import { Prisma } from '@prisma/client'
import { BillingsRepository } from '../billings-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaBillingsRepository implements BillingsRepository {
  async findManyByUserIdAndDateRange(
    userId: string,
    initialDate: Date,
    finalDate: Date,
  ) {
    const startOfTheDay = dayjs(initialDate).startOf('date')
    const endOfTheDay = dayjs(finalDate).endOf('date')

    const billings = await prisma.billing.findMany({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
      select: {
        amount: true,
        type: true,
        created_at: true,
      },
    })

    return billings
  }

  async findManyByUserId(userId: string) {
    const billings = await prisma.billing.findMany({
      where: {
        user_id: userId,
      },
    })

    return billings
  }

  async create(data: Prisma.BillingUncheckedCreateInput) {
    const billing = await prisma.billing.create({
      data,
    })

    return billing
  }
}
