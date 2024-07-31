import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryBillingsRepository } from '@/repositories/in-memory/in-memory-billings-repository'
import { DepositUseCase } from './deposit'

// Unit test

let billingsRepository: InMemoryBillingsRepository
let sut: DepositUseCase

describe('Deposit Use Case', () => {
  beforeEach(() => {
    billingsRepository = new InMemoryBillingsRepository()
    sut = new DepositUseCase(billingsRepository)
  })

  it('should be able to deposit', async () => {
    const { billing } = await sut.execute({
      amount: 200,
      userId: 'user-01',
    })

    expect(billing.id).toEqual(expect.any(String))
  })
})
