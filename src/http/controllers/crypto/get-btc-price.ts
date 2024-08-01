import { BadRequestError } from '@/use-cases/errors/bad-request-error'
import { makeGetBTCPriceUseCase } from '@/use-cases/factories/make-get-btc-price-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getBtcPrice(_: FastifyRequest, reply: FastifyReply) {
  try {
    const getBtcPriceUseCase = makeGetBTCPriceUseCase()

    const data = await getBtcPriceUseCase.execute()

    return reply.status(200).send(data)
  } catch (err) {
    if (err instanceof BadRequestError) {
      return reply.status(500).send({ message: err.message })
    }
    return err
  }
}
