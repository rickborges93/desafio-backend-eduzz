import { expect, describe, it, beforeEach } from 'vitest'
import { GetBtcPriceUseCase } from './get-btc-price'

// Unit test

let sut: GetBtcPriceUseCase

describe('Get BTC Price Use Case', () => {
  beforeEach(() => {
    sut = new GetBtcPriceUseCase()
  })

  it('should be able to get btc price', async () => {
    const data = await sut.execute()

    expect(data.buy).toEqual(expect.any(String))
    expect(data.sell).toEqual(expect.any(String))
    expect(data.currentPrice).toEqual(expect.any(String))
  })
})
