import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { appRoutes } from './http/routes'
import { env } from './env'
import { ZodError } from 'zod'
import { appCronJobs } from './crons'

import { FastifyAdapter } from '@bull-board/fastify'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import Queue from 'bull'

export const app = fastify()

const serverAdapter = new FastifyAdapter()
const queues = ['email', 'whatsapp']

createBullBoard({
  queues: queues.map((q) => new BullAdapter(new Queue(q))),
  serverAdapter,
})

serverAdapter.setBasePath('/bull/ui')

app.register(serverAdapter.registerPlugin(), { basePath: '/bull/ui' })

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(appRoutes)

app.register(appCronJobs)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
