import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryBillingsRepository } from '@/repositories/in-memory/in-memory-billings-repository'
import { DepositUseCase } from './deposit'
import { InMemoryQueueRepository } from '@/repositories/in-memory/in-memory-queue-repository'

// Unit test

let billingsRepository: InMemoryBillingsRepository
let queueRepository: InMemoryQueueRepository
let sut: DepositUseCase

describe('Deposit Use Case', () => {
  beforeEach(() => {
    billingsRepository = new InMemoryBillingsRepository()
    queueRepository = new InMemoryQueueRepository()
    sut = new DepositUseCase(billingsRepository, queueRepository)
  })

  it('should be able to deposit', async () => {
    const { billing } = await sut.execute({
      amount: 200,
      userId: 'user-01',
      email: 'user-01@example.com',
    })

    expect(billing.id).toEqual(expect.any(String))
  })
})
