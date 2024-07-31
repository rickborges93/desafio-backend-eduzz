import { FastifyInstance, FastifyReply } from 'fastify'
import { register } from './controllers/register'

export async function appRoutes(app: FastifyInstance) {
  // default route to verify if it's working.
  app.get('/', (_, reply: FastifyReply) => {
    return reply.status(200).send('Welcome to BTC bank!')
  })

  // system routes
  app.post('/account', register)
}
