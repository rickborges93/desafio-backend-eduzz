import { TBtcTransactionMapper } from '@/@types/mapper'
import { BtcTransactionsRepository } from '@/repositories/transactions-repository'

interface PositionUseCaseRequest {
  userId: string
}

interface PositionUseCaseResponse {
  btcTransactions: TBtcTransactionMapper[]
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
