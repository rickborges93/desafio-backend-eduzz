import { GetBtcPriceUseCase } from '../crypto/get-btc-price'

export function makeGetBTCPriceUseCase() {
  const getBTCPriceUseCase = new GetBtcPriceUseCase()

  return getBTCPriceUseCase
}
