import { BillingsRepository } from '@/repositories/billings-repository'
import { getBalanceFromBillings } from '@/utils/get-balance-from-billing'

interface BalanceUseCaseRequest {
  userId: string
}

interface BalanceUseCaseResponse {
  total: number
}

export class BalanceUseCase {
  constructor(private billingsRepository: BillingsRepository) {}

  async execute({
    userId,
  }: BalanceUseCaseRequest): Promise<BalanceUseCaseResponse> {
    const billings = await this.billingsRepository.findManyByUserId(userId)

    const total = getBalanceFromBillings(billings)

    return { total }
  }
}
