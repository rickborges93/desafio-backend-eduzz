import { BtcTransaction } from '@prisma/client'
import { BtcTransactionsRepository } from '@/repositories/transactions-repository'

export type TBtcTransactionMapper = Omit<
  BtcTransaction,
  'id' | 'user_id' | 'billing_id'
>

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
