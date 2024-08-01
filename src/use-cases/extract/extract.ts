import { BtcTransactionsRepository } from '@/repositories/transactions-repository'
import { Billing, BtcTransaction } from '@prisma/client'
import dayjs from 'dayjs'
import { InvalidStartDateError } from '../errors/invalid-start-date-error'
import { BillingsRepository } from '@/repositories/billings-repository'

interface ExtractUseCaseRequest {
  userId: string
  initialDate?: Date
  finalDate?: Date
}

interface ExtractUseCaseResponse {
  billings: Billing[]
  btcTransactions: BtcTransaction[]
}

export class ExtractUseCase {
  constructor(
    private btcTransactionsRepository: BtcTransactionsRepository,
    private billingsRepository: BillingsRepository,
  ) {}

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

    const billings = await this.billingsRepository.findManyByUserIdAndDateRange(
      userId,
      startOfTheDay.toDate(),
      endOfTheDay.toDate(),
    )

    return { btcTransactions, billings }
  }
}
