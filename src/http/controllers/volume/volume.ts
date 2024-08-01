import { makeVolumeUseCase } from '@/use-cases/factories/make-volume-repository'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function volume(_: FastifyRequest, reply: FastifyReply) {
  try {
    const volumeUseCase = makeVolumeUseCase()

    const data = await volumeUseCase.execute()

    return reply.status(200).send(data)
  } catch (err) {
    return err
  }
}
