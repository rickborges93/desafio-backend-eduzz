import { makeBalanceUseCase } from '@/use-cases/factories/make-balance-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function balance(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = request.user.sub
    const balanceUseCase = makeBalanceUseCase()

    const { total } = await balanceUseCase.execute({
      userId,
    })

    return reply.status(200).send({ total })
  } catch (err) {
    return err
  }
}
