import { Prisma } from '@prisma/client'
import { BillingsRepository } from '../billings-repository'
import { prisma } from '@/lib/prisma'

export class PrismaBillingsRepository implements BillingsRepository {
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
