import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Sell (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to sell', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/account/deposit')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 100,
      })

    await request(app.server)
      .post('/btc/purchase')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 100,
      })

    const response = await request(app.server)
      .post('/btc/sell')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 0.00001,
      })

    expect(response.statusCode).toEqual(201)
  })
})
