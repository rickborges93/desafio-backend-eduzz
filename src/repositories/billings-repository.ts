import { Billing, Prisma } from '@prisma/client'

export interface BillingsRepository {
  findManyByUserId(userId: string): Promise<Billing[]>
  create(data: Prisma.BillingUncheckedCreateInput): Promise<Billing>
}
