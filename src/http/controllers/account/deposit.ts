import { makeDepositUseCase } from '@/use-cases/factories/make-deposit-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deposit(request: FastifyRequest, reply: FastifyReply) {
  const depositBodySchema = z.object({
    amount: z.coerce.number(),
  })

  const { amount } = depositBodySchema.parse(request.body)

  try {
    const userId = request.user.sub
    const depositUseCase = makeDepositUseCase()

    await depositUseCase.execute({
      amount,
      userId,
    })
  } catch (err) {
    return err
  }

  return reply.status(201).send()
}
