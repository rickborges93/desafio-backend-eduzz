import { FastifyInstance, FastifyReply } from 'fastify'
import { verifyJWT } from './middlewares/verify-jwt'

import { authenticate } from './controllers/authenticate'
import { register } from './controllers/account/register'
import { deposit } from './controllers/account/deposit'
import { balance } from './controllers/account/balance'
import { getBtcPrice } from './controllers/crypto/get-btc-price'
import { purchase } from './controllers/crypto/purchase'
import { position } from './controllers/crypto/position'
import { volume } from './controllers/volume/volume'
import { extract } from './controllers/extract/extract'
import { history } from './controllers/history/history'
import { sell } from './controllers/crypto/sell'

export async function appRoutes(app: FastifyInstance) {
  // default route to verify if it's working.
  app.get('/', (_, reply: FastifyReply) => {
    return reply.status(200).send('Welcome to BTC bank!')
  })

  // authenticate
  app.post('/login', authenticate)

  // account
  app.post('/account', register)
  app.post('/account/deposit', { onRequest: [verifyJWT] }, deposit)
  app.get('/account/balance', { onRequest: [verifyJWT] }, balance)

  // crypto
  app.get('/btc/price', { onRequest: [verifyJWT] }, getBtcPrice)
  app.post('/btc/purchase', { onRequest: [verifyJWT] }, purchase)
  app.get('/btc', { onRequest: [verifyJWT] }, position)
  app.post('/btc/sell', { onRequest: [verifyJWT] }, sell)

  // volume
  app.get('/volume', { onRequest: [verifyJWT] }, volume)

  // extract
  app.get('/extract', { onRequest: [verifyJWT] }, extract)

  // history
  app.get('/history', { onRequest: [verifyJWT] }, history)
}
