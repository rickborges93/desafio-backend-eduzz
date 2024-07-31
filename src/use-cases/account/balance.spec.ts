import { InMemoryBillingsRepository } from '@/repositories/in-memory/in-memory-billings-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { BalanceUseCase } from './balance'

// Unit test

let billingsRepository: InMemoryBillingsRepository
let sut: BalanceUseCase

describe('Balance Use Case', () => {
  beforeEach(async () => {
    billingsRepository = new InMemoryBillingsRepository()
    sut = new BalanceUseCase(billingsRepository)
  })

  it('should be able to get the balance of the customers account', async () => {
    await billingsRepository.create({
      user_id: 'user-01',
      amount: 200.5,
      type: 'deposit',
    })

    await billingsRepository.create({
      user_id: 'user-01',
      amount: 300,
      type: 'deposit',
    })

    await billingsRepository.create({
      user_id: 'user-01',
      amount: 100,
      type: 'withdraw',
    })

    const { total } = await sut.execute({
      userId: 'user-01',
    })

    expect(total).toEqual(400.5)
  })
})
