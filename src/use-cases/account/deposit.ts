import { BillingsRepository } from '@/repositories/billings-repository'
import { Billing } from '@prisma/client'

interface DepositUseCaseRequest {
  amount: number
  userId: string
}

interface DepositUseCaseResponse {
  billing: Billing
}

export class DepositUseCase {
  constructor(private billingsRepository: BillingsRepository) {}

  async execute({
    amount,
    userId,
  }: DepositUseCaseRequest): Promise<DepositUseCaseResponse> {
    const billing = await this.billingsRepository.create({
      amount,
      user_id: userId,
      type: 'deposit',
    })

    return { billing }
  }
}
