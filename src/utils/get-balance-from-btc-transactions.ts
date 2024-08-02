import { TBtcTransactionMapper } from '@/@types/mapper'

export function getBalanceFromBtcTransactions(
  btcTransactions: TBtcTransactionMapper[],
) {
  const { total } = btcTransactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'buy') {
        acc.total = acc.total + transaction.bought_btc.toNumber()
      } else {
        acc.total = acc.total - transaction.bought_btc.toNumber()
      }

      return acc
    },
    { total: 0.0 },
  )

  return total
}
