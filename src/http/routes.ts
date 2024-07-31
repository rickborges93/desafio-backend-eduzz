import { FastifyInstance, FastifyReply } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.get('/', (_, reply: FastifyReply) => {
    return reply.status(200).send('Welcome to BTC bank!')
  })
}
