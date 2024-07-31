import { TickerBTC } from '@/use-cases/crypto/get-btc-price'
import { getExternalRequest } from './get-external-request'

export async function getCurrentBtcQuote() {
  const response = await getExternalRequest(
    'https://www.mercadobitcoin.net/api/BTC/ticker/',
    [200],
  )

  const ticker: TickerBTC = response.ticker

  return {
    buy: parseFloat(ticker.buy),
    sell: parseFloat(ticker.sell),
    currentPrice: parseFloat(ticker.last),
    open: parseFloat(ticker.open),
  }
}
