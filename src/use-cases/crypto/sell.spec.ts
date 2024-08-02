import { InMemoryBillingsRepository } from '@/repositories/in-memory/in-memory-billings-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { InsufficientBalanceError } from '../errors/insufficient-balance-error'
import { SellUseCase } from './sell'

// Unit test

let billingsRepository: InMemoryBillingsRepository
let btcTransactionsRepository: InMemoryTransactionsRepository
let sut: SellUseCase

describe('Sell Use Case', () => {
  beforeEach(async () => {
    billingsRepository = new InMemoryBillingsRepository()
    btcTransactionsRepository = new InMemoryTransactionsRepository()
    sut = new SellUseCase(billingsRepository, btcTransactionsRepository)

    await billingsRepository.create({
      user_id: 'user-1',
      amount: 200.5,
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
  })

  it('should be able to sell all BTC', async () => {
    const { btcTransaction } = await sut.execute({
      amount: 0.0006485,
      userId: 'user-1',
    })

    expect(btcTransaction.id).toEqual(expect.any(String))
  })

  it('should not be able to sell BTC with insufficient balance', async () => {
    await expect(() =>
      sut.execute({
        amount: 1,
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(InsufficientBalanceError)
  })

  it('should be able to sell partial BTC', async () => {
    const { btcTransaction } = await sut.execute({
      amount: 0.0006485,
      userId: 'user-1',
    })

    expect(btcTransaction.id).toEqual(expect.any(String))
  })
})
