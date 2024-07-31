import { getCurrentBtcQuote } from '@/utils/get-current-btc-quote'

export interface TickerBTC {
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
  buy: number
  sell: number
  currentPrice: number
  open: number
}

export class GetBtcPriceUseCase {
  async execute(): Promise<GetBtcPriceUseCaseResponse> {
    const data = getCurrentBtcQuote()

    return data
  }
}
