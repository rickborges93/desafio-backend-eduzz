import { Billing, BtcTransaction } from '@prisma/client'

export type TBtcTransactionMapper = Omit<
  BtcTransaction,
  'id' | 'user_id' | 'billing_id'
>

export type TBillingMapper = Omit<Billing, 'id' | 'user_id'>
