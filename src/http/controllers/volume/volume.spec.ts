import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Volume (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the volume', async () => {
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

    await request(app.server)
      .post('/btc/sell')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 0.00001,
      })

    const response = await request(app.server)
      .get('/volume')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        totalBought: expect.any(Number),
        totalSold: expect.any(Number),
      }),
    )
  })
})
