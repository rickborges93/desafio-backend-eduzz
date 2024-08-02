import { InsufficientBalanceError } from '@/use-cases/errors/insufficient-balance-error'
import { makePurchaseUseCase } from '@/use-cases/factories/make-purchase-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function purchase(request: FastifyRequest, reply: FastifyReply) {
  const purchaseBodySchema = z.object({
    amount: z.coerce.number(),
  })

  const { amount } = purchaseBodySchema.parse(request.body)

  try {
    const userId = request.user.sub
    const email = request.user.iss
    const purchaseUseCase = makePurchaseUseCase()

    await purchaseUseCase.execute({
      amount,
      userId,
      email,
    })
  } catch (err) {
    if (err instanceof InsufficientBalanceError) {
      return reply.status(400).send({ message: err.message })
    }

    return err
  }

  return reply.status(201).send()
}
