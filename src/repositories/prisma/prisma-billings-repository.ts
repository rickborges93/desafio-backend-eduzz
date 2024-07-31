import { Prisma } from '@prisma/client'
import { BillingsRepository } from '../billings-repository'
import { prisma } from '@/lib/prisma'

export class PrismaBillingsRepository implements BillingsRepository {
  async create(data: Prisma.BillingUncheckedCreateInput) {
    const billing = await prisma.billing.create({
      data,
    })

    return billing
  }
}
