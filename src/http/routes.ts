import { FastifyInstance, FastifyReply } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { verifyJWT } from './middlewares/verify-jwt'
import { deposit } from './controllers/deposit'

export async function appRoutes(app: FastifyInstance) {
  // default route to verify if it's working.
  app.get('/', (_, reply: FastifyReply) => {
    return reply.status(200).send('Welcome to BTC bank!')
  })

  // system routes
  app.post('/account', register)
  app.post('/login', authenticate)

  // authenticated routes
  app.post('/account/deposit', { onRequest: [verifyJWT] }, deposit)
}
