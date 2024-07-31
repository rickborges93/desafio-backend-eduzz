import { BillingsRepository } from '@/repositories/billings-repository'

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

    const { total } = billings.reduce(
      (acc, billing) => {
        if (billing.type === 'deposit') {
          acc.total = acc.total + billing.amount.toNumber()
        } else {
          acc.total = acc.total - billing.amount.toNumber()
        }

        return acc
      },
      { total: 0.0 },
    )

    return { total }
  }
}
