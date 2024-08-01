import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { ExtractUseCase } from './extract'
import { InvalidStartDateError } from '../errors/invalid-start-date-error'
import { InMemoryBillingsRepository } from '@/repositories/in-memory/in-memory-billings-repository'

// Unit test

let btcTransactionsRepository: InMemoryTransactionsRepository
let billingsRepository: InMemoryBillingsRepository
let sut: ExtractUseCase

describe('Extract Use Case', () => {
  beforeEach(async () => {
    btcTransactionsRepository = new InMemoryTransactionsRepository()
    billingsRepository = new InMemoryBillingsRepository()
    sut = new ExtractUseCase(btcTransactionsRepository, billingsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to extract without pass any date', async () => {
    vi.setSystemTime(new Date(2024, 1, 20, 10, 0, 0))

    await btcTransactionsRepository.create({
      billing_id: 'billing-1',
      user_id: 'user-1',
      bought_btc: '0.0006485',
      current_btc: '700451.475',
      variation_pc: 0.21,
      type: 'buy',
    })

    await billingsRepository.create({
      user_id: 'user-1',
      amount: 200,
      type: 'deposit',
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

    await billingsRepository.create({
      user_id: 'user-1',
      amount: 500,
      type: 'deposit',
    })

    await billingsRepository.create({
      user_id: 'user-1',
      amount: 300,
      type: 'deposit',
    })

    const { btcTransactions, billings } = await sut.execute({
      userId: 'user-1',
    })

    expect(btcTransactions).toHaveLength(2)
    expect(billings).toHaveLength(2)

    expect(btcTransactions).toEqual([
      expect.objectContaining({ type: 'buy' }),
      expect.objectContaining({ type: 'sell' }),
    ])
    expect(billings).toEqual([
      expect.objectContaining({ type: 'deposit' }),
      expect.objectContaining({ type: 'deposit' }),
    ])
  })

  it('should not be able to extract passing start date greatter than end date', async () => {
    await expect(() =>
      sut.execute({
        userId: 'user-1',
        initialDate: new Date('2024-05-10'),
        finalDate: new Date('2024-05-08'),
      }),
    ).rejects.toBeInstanceOf(InvalidStartDateError)
  })

  it('should be able to extract passing start date lesser than end date', async () => {
    vi.setSystemTime(new Date(2024, 1, 20, 10, 0, 0))

    await billingsRepository.create({
      user_id: 'user-1',
      amount: 200,
      type: 'deposit',
    })

    await btcTransactionsRepository.create({
      billing_id: 'billing-1',
      user_id: 'user-1',
      bought_btc: '0.0006485',
      current_btc: '700451.475',
      variation_pc: 0.21,
      type: 'buy',
    })

    vi.setSystemTime(new Date(2024, 5, 22, 10, 0, 0))

    await btcTransactionsRepository.create({
      billing_id: 'billing-2',
      user_id: 'user-1',
      bought_btc: '0.0014521',
      current_btc: '720451.475',
      variation_pc: 0.41,
      type: 'buy',
    })

    vi.setSystemTime(new Date(2024, 5, 25, 10, 0, 0))

    await billingsRepository.create({
      user_id: 'user-1',
      amount: 1000,
      type: 'deposit',
    })

    vi.setSystemTime(new Date(2024, 6, 22, 10, 0, 0))

    await btcTransactionsRepository.create({
      billing_id: 'billing-3',
      user_id: 'user-1',
      bought_btc: '0.0011485',
      current_btc: '718451.475',
      variation_pc: 0.35,
      type: 'sell',
    })

    const { btcTransactions, billings } = await sut.execute({
      userId: 'user-1',
      initialDate: new Date('2024-05-10'),
      finalDate: new Date('2024-08-01'),
    })

    expect(btcTransactions).toHaveLength(2)
    expect(billings).toHaveLength(1)

    expect(btcTransactions).toEqual([
      expect.objectContaining({ type: 'buy' }),
      expect.objectContaining({ type: 'sell' }),
    ])

    expect(billings).toEqual([expect.objectContaining({ type: 'deposit' })])
  })
})
