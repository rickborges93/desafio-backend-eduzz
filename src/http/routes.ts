import { FastifyInstance, FastifyReply } from 'fastify'
import { verifyJWT } from './middlewares/verify-jwt'

import { authenticate } from './controllers/authenticate'
import { register } from './controllers/register'
import { deposit } from './controllers/deposit'
import { balance } from './controllers/balance'

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
  app.get('/account/balance', { onRequest: [verifyJWT] }, balance)
}
