import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { PositionUseCase } from './position'

// Unit test

let btcTransactionsRepository: InMemoryTransactionsRepository
let sut: PositionUseCase

describe('Position Use Case', () => {
  beforeEach(async () => {
    btcTransactionsRepository = new InMemoryTransactionsRepository()
    sut = new PositionUseCase(btcTransactionsRepository)
  })

  it('should be able to see all the transactions', async () => {
    await btcTransactionsRepository.create({
      billing_id: 'billing-1',
      user_id: 'user-1',
      bought_btc: '0.0006485',
      current_btc: '700451.475',
      variation_pc: 0.21,
    })

    await btcTransactionsRepository.create({
      billing_id: 'billing-2',
      user_id: 'user-1',
      bought_btc: '0.0014521',
      current_btc: '720451.475',
      variation_pc: 0.41,
    })

    await btcTransactionsRepository.create({
      billing_id: 'billing-3',
      user_id: 'user-1',
      bought_btc: '0.0011485',
      current_btc: '718451.475',
      variation_pc: 0.35,
    })

    const { btcTransactions } = await sut.execute({ userId: 'user-1' })

    expect(btcTransactions).toHaveLength(3)
    expect(btcTransactions).toEqual([
      expect.objectContaining({ billing_id: 'billing-1' }),
      expect.objectContaining({ billing_id: 'billing-2' }),
      expect.objectContaining({ billing_id: 'billing-3' }),
    ])
  })
})
