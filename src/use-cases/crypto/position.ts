import { BtcTransaction } from '@prisma/client'
import { BtcTransactionsRepository } from '@/repositories/transactions-repository'

interface PositionUseCaseRequest {
  userId: string
}

interface PositionUseCaseResponse {
  btcTransactions: BtcTransaction[]
}

export class PositionUseCase {
  constructor(private btcTransactionsRepository: BtcTransactionsRepository) {}

  async execute({
    userId,
  }: PositionUseCaseRequest): Promise<PositionUseCaseResponse> {
    const btcTransactions =
      await this.btcTransactionsRepository.findManyByUserId(userId)

    return { btcTransactions }
  }
}
