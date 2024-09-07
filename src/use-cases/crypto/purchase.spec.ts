import { InMemoryBillingsRepository } from '@/repositories/in-memory/in-memory-billings-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { PurchaseUseCase } from './purchase'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { InsufficientBalanceError } from '../errors/insufficient-balance-error'
import { InMemoryQueueRepository } from '@/repositories/in-memory/in-memory-queue-repository'

// Unit test

let billingsRepository: InMemoryBillingsRepository
let btcTransactionsRepository: InMemoryTransactionsRepository
let queueRepository: InMemoryQueueRepository
let sut: PurchaseUseCase

describe('Purchase Use Case', () => {
  beforeEach(async () => {
    billingsRepository = new InMemoryBillingsRepository()
    btcTransactionsRepository = new InMemoryTransactionsRepository()
    queueRepository = new InMemoryQueueRepository()
    sut = new PurchaseUseCase(
      billingsRepository,
      btcTransactionsRepository,
      queueRepository,
    )

    await billingsRepository.create({
      user_id: 'user-01',
      amount: 100,
      type: 'deposit',
    })

    await billingsRepository.create({
      user_id: 'user-01',
      amount: 200,
      type: 'deposit',
    })

    await billingsRepository.create({
      user_id: 'user-01',
      amount: 50,
      type: 'withdraw',
    })
  })

  it('should be able to purchase BTC', async () => {
    const { btcTransaction } = await sut.execute({
      amount: 230,
      userId: 'user-01',
      email: 'user-01@example.com',
    })

    expect(btcTransaction.id).toEqual(expect.any(String))
  })

  it('should not be able to purchase BTC with insufficient balance', async () => {
    await expect(() =>
      sut.execute({
        amount: 500,
        userId: 'user-01',
        email: 'user-01@example.com',
      }),
    ).rejects.toBeInstanceOf(InsufficientBalanceError)
  })
})
