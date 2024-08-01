import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { HistoryUseCase } from './history'

// Unit test

let btcTransactionsRepository: InMemoryTransactionsRepository
let sut: HistoryUseCase

describe('History Use Case', () => {
  beforeEach(async () => {
    btcTransactionsRepository = new InMemoryTransactionsRepository()
    sut = new HistoryUseCase(btcTransactionsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be possible to see the history of the bought/sold value of BTC grouping by 10 minutes about last 24 hours', async () => {
    vi.setSystemTime(new Date(2024, 7, 21, 23, 35, 0))

    await btcTransactionsRepository.create({
      billing_id: 'billing-2',
      user_id: 'user-1',
      bought_btc: '0.0014521',
      current_btc: '720451.475',
      variation_pc: 0.41,
      type: 'buy',
    })

    vi.setSystemTime(new Date(2024, 7, 21, 23, 42, 0))

    await btcTransactionsRepository.create({
      billing_id: 'billing-2',
      user_id: 'user-1',
      bought_btc: '0.0014521',
      current_btc: '720451.475',
      variation_pc: 0.41,
      type: 'buy',
    })

    vi.setSystemTime(new Date(2024, 7, 21, 23, 51, 0))

    await btcTransactionsRepository.create({
      billing_id: 'billing-2',
      user_id: 'user-1',
      bought_btc: '0.0014521',
      current_btc: '720451.475',
      variation_pc: 0.41,
      type: 'buy',
    })
    vi.setSystemTime(new Date(2024, 7, 21, 23, 53, 0))

    await btcTransactionsRepository.create({
      billing_id: 'billing-3',
      user_id: 'user-1',
      bought_btc: '0.0014521',
      current_btc: '720451.475',
      variation_pc: 0.41,
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

    vi.setSystemTime(new Date(2024, 7, 22, 10, 5, 0))

    await btcTransactionsRepository.create({
      billing_id: 'billing-3',
      user_id: 'user-1',
      bought_btc: '0.0011485',
      current_btc: '718451.475',
      variation_pc: 0.35,
      type: 'sell',
    })

    vi.setSystemTime(new Date(2024, 7, 22, 10, 11, 0))

    await btcTransactionsRepository.create({
      billing_id: 'billing-3',
      user_id: 'user-1',
      bought_btc: '0.0011485',
      current_btc: '718451.475',
      variation_pc: 0.35,
      type: 'sell',
    })

    vi.setSystemTime(new Date(2024, 7, 22, 11, 18, 0))

    await btcTransactionsRepository.create({
      billing_id: 'billing-3',
      user_id: 'user-1',
      bought_btc: '0.0011485',
      current_btc: '718451.475',
      variation_pc: 0.35,
      type: 'sell',
    })

    const { valuesEvery10Min } = await sut.execute()

    expect(valuesEvery10Min['24-08-21 23:50'].quantity).toEqual(2)
    expect(valuesEvery10Min['24-08-22 10:00'].totalSold).toEqual(0.0011485)
    expect(valuesEvery10Min['24-08-22 11:10'].totalBought).toEqual(0)
  })
})
