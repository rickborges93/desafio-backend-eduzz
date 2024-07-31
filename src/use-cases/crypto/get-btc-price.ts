import { getExternalRequest } from '@/utils/get-btc-current-quote'

interface TickerBTC {
  high: string
  low: string
  vol: string
  last: string
  buy: string
  sell: string
  open: string
  date: Date
  pair: string
}

interface GetBtcPriceUseCaseResponse {
  buy: string
  sell: string
  currentPrice: string
}

export class GetBtcPriceUseCase {
  async execute(): Promise<GetBtcPriceUseCaseResponse> {
    const response = await getExternalRequest(
      'https://www.mercadobitcoin.net/api/BTC/ticker/',
      [200],
    )

    const ticker: TickerBTC = response.ticker

    return {
      buy: ticker.buy,
      sell: ticker.sell,
      currentPrice: ticker.last,
    }
  }
}
