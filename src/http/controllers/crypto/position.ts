import { makePositionteUseCase } from '@/use-cases/factories/make-position-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function position(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = request.user.sub
    const positionUseCase = makePositionteUseCase()

    const transactions = await positionUseCase.execute({
      userId,
    })

    return reply.status(200).send(transactions)
  } catch (err) {
    return err
  }
}
