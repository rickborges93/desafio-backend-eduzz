import { Billing, Prisma } from '@prisma/client'

export interface BillingsRepository {
  create(data: Prisma.BillingUncheckedCreateInput): Promise<Billing>
}
