import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { VolumeUseCase } from './volume'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'

// Unit test

let btcTransactionsRepository: InMemoryTransactionsRepository
let sut: VolumeUseCase

describe('Volume Use Case', () => {
  beforeEach(async () => {
    btcTransactionsRepository = new InMemoryTransactionsRepository()
    sut = new VolumeUseCase(btcTransactionsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to get the volume of boght and sold BTC on same day', async () => {
    vi.setSystemTime(new Date(2024, 7, 20, 10, 0, 0))

    await btcTransactionsRepository.create({
      billing_id: 'billing-1',
      user_id: 'user-1',
      bought_btc: '0.0006485',
      current_btc: '700451.475',
      variation_pc: 0.21,
      type: 'buy',
    })

    vi.setSystemTime(new Date(2024, 7, 22, 10, 0, 0))

    await btcTransactionsRepository.create({
      billing_id: 'billing-2',
      user_id: 'user-1',
      bought_btc: '0.0014521',
      current_btc: '720451.475',
      variation_pc: 0.41,
      type: 'buy',
    })

    await btcTransactionsRepository.create({
      billing_id: 'billing-3',
      user_id: 'user-1',
      bought_btc: '0.0011485',
      current_btc: '718451.475',
      variation_pc: 0.35,
      type: 'sell',
    })

    const { totalBought, totalSold } = await sut.execute()

    expect(totalBought).toEqual(0.0014521)
    expect(totalSold).toEqual(0.0011485)
  })
})
