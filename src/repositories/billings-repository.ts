import { Billing, Prisma } from '@prisma/client'

export interface BillingsRepository {
  findManyByUserIdAndDateRange(
    userId: string,
    initialDate: Date,
    finalDate: Date,
  ): Promise<Billing[]>
  findManyByUserId(userId: string): Promise<Billing[]>
  create(data: Prisma.BillingUncheckedCreateInput): Promise<Billing>
}
