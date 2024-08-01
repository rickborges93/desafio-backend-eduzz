import { InvalidStartDateError } from '@/use-cases/errors/invalid-start-date-error'
import { makeExtractUseCase } from '@/use-cases/factories/make-extract-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function extract(request: FastifyRequest, reply: FastifyReply) {
  const extractParamsSchema = z.object({
    start: z.string().optional(),
    end: z.string().optional(),
  })

  const { start, end } = extractParamsSchema.parse(request.query)

  try {
    const userId = request.user.sub

    const extractUseCase = makeExtractUseCase()

    const data = await extractUseCase.execute({
      userId,
      initialDate: start ? new Date(start + ' 00:00:01') : undefined,
      finalDate: end ? new Date(end + ' 23:59:59') : undefined,
    })

    return reply.status(200).send(data)
  } catch (err) {
    if (err instanceof InvalidStartDateError) {
      return reply.status(422).send({ message: err.message })
    }
    return err
  }
}
