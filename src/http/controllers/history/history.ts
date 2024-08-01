import { makeHistoryUseCase } from '@/use-cases/factories/make-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function history(_: FastifyRequest, reply: FastifyReply) {
  try {
    const historyUseCase = makeHistoryUseCase()

    const data = await historyUseCase.execute()

    return reply.status(200).send(data)
  } catch (err) {
    return err
  }
}
