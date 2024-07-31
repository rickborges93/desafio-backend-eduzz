import { Billing } from '@prisma/client'

export function getBalanceFromBillings(billings: Billing[]) {
  const { total } = billings.reduce(
    (acc, billing) => {
      if (billing.type === 'deposit') {
        acc.total = acc.total + billing.amount.toNumber()
      } else {
        acc.total = acc.total - billing.amount.toNumber()
      }

      return acc
    },
    { total: 0.0 },
  )

  return total
}
