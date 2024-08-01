import { BtcTransactionsRepository } from '@/repositories/transactions-repository'
import { BtcTransaction } from '@prisma/client'
import dayjs from 'dayjs'
import { InvalidStartDateError } from '../errors/invalid-start-date-error'

interface ExtractUseCaseRequest {
  userId: string
  initialDate?: Date
  finalDate?: Date
}

interface ExtractUseCaseResponse {
  btcTransactions: BtcTransaction[]
}

export class ExtractUseCase {
  constructor(private btcTransactionsRepository: BtcTransactionsRepository) {}

  async execute({
    userId,
    initialDate,
    finalDate,
  }: ExtractUseCaseRequest): Promise<ExtractUseCaseResponse> {
    const startDate = initialDate
      ? new Date(initialDate)
      : dayjs(new Date()).subtract(90, 'day')

    const endDate = finalDate ? new Date(finalDate) : dayjs(new Date())

    const startOfTheDay = dayjs(startDate).startOf('date')
    const endOfTheDay = dayjs(endDate).endOf('date')

    if (dayjs(endOfTheDay).isBefore(startOfTheDay)) {
      throw new InvalidStartDateError()
    }

    const btcTransactions =
      await this.btcTransactionsRepository.findManyByUserIdAndDateRange(
        userId,
        startOfTheDay.toDate(),
        endOfTheDay.toDate(),
      )

    return { btcTransactions }
  }
}
