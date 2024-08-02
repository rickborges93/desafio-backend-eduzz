import { env } from '@/env'
import MailProvider from '@/providers/adapters/models/MailProvider'
import { BillingsRepository } from '@/repositories/billings-repository'
import { Billing } from '@prisma/client'

interface DepositUseCaseRequest {
  amount: number
  userId: string
  email: string
}

interface DepositUseCaseResponse {
  billing: Billing
}

export class DepositUseCase {
  constructor(
    private billingsRepository: BillingsRepository,
    private mailProvider: MailProvider,
  ) {}

  async execute({
    amount,
    userId,
    email,
  }: DepositUseCaseRequest): Promise<DepositUseCaseResponse> {
    const billing = await this.billingsRepository.create({
      amount,
      user_id: userId,
      type: 'deposit',
    })

    this.mailProvider.sendEmail({
      from: { email: env.MAIL_PROVIDER_EMAIL, name: env.MAIL_PROVIDER_NAME },
      to: email,
      subject: '[Eduzz BTC Bank] Depósito',
      body: `Você fez um depósito de R$${amount}.`,
    })

    return { billing }
  }
}
