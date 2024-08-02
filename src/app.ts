import fastify from 'fastify'
import { appRoutes } from './http/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { ZodError } from 'zod'
import { appCronJobs } from './crons'

export const app = fastify()

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
